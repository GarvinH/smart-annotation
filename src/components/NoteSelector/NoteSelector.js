import React, { Fragment } from "react";
import {
  Accordion,
  Card,
  Button,
  Col,
  Row,
  Form,
  FormControl,
} from "react-bootstrap";
import _ from "lodash";

const toggle_list = (arr, val) =>
  _.includes(arr, val) ? _.without(arr, val) : _.concat(arr, val);

export default class NoteSelector extends React.Component {
  state = {
    topicNameInput: "",
    connectingNotes: false,
    showConnectedNotes: false, //for viewing connected notes ONLY (ie no changing if notes are connecting)
    connectedNotes: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { topicIndex, noteIndex, notes } = this.props;
    if (topicIndex !== -1 && noteIndex !== -1) {
      const newNote = notes[topicIndex].notes[noteIndex];

      if (newNote.connectedNotes !== prevState.connectedNotes) {
        this.setState({ connectedNotes: newNote.connectedNotes });
      }
    }
  }

  connectNote = (topicIndex, noteIndex) => {
    const { selectNote } = this.props;
    selectNote(topicIndex, noteIndex);
    this.setState({ connectingNotes: true });
  };

  finalizeNote = (id) => {
    const { topicIndex, connectNotes } = this.props;
    const { connectedNotes } = this.state;
    this.setState({ connectingNotes: false, connectedNotes: [] });
    connectNotes(id, connectedNotes, topicIndex);
  };

  toggleNote = (id) =>
    this.setState((prevState) => ({
      connectedNotes: toggle_list(prevState.connectedNotes, id),
    }));

  render() {
    const { notes, addNote, setNoteEditor, topicIndex, noteIndex } = this.props;
    const {
      topicNameInput,
      connectedNotes,
      connectingNotes,
      showConnectedNotes,
    } = this.state;

    const accordion_children = _.map(notes, (topic, topicIdx) => (
      <Card key={topicIdx}>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Accordion.Toggle as={Button} variant="link" eventKey={`${topicIdx}`}>
            {topic.topic}
          </Accordion.Toggle>

          <Button variant="dark" onClick={() => addNote(topicIdx)}>
            Add Note
          </Button>
        </Card.Header>
        <Accordion.Collapse eventKey={`${topicIdx}`}>
          <Card.Body>
            {_.map(topic.notes, (note, noteIdx) => (
              <Fragment key={noteIdx}>
                <Row style={{ margin: "1rem 0" }}>
                  <Col style={{ display: "flex", alignItems: "center" }}>
                    {note.title}
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      onClick={() => setNoteEditor(topicIdx, noteIdx, true)}
                      style={{
                        visibility:
                          topicIdx === -1 && noteIdx === -1 && "hidden",
                      }}
                    >
                      Edit Note
                    </Button>
                  </Col>
                  <Col style={{ display: "flex", alignItems: "center" }}>
                    {new Date(note.date).toDateString()}
                  </Col>
                  {!connectingNotes &&
                    (topicIndex === -1 && noteIndex === -1 ? (
                      <Button style={{ margin: "0 1rem" }} variant="dark">
                        View Connected Notes
                      </Button>
                    ) : topicIndex === topicIdx && noteIndex === noteIdx ? (
                      <Button>Done Viewing</Button>
                    ) : null)}
                  <Col>
                    {!showConnectedNotes &&
                      (topicIndex === -1 && noteIndex === -1 ? (
                        <Button
                          variant="dark"
                          onClick={() => this.connectNote(topicIdx, noteIdx)}
                        >
                          Add Connections
                        </Button>
                      ) : topicIndex === topicIdx && noteIndex === noteIdx ? (
                        <Button
                          variant="light"
                          style={{
                            borderColor: "black",
                          }}
                          onClick={() => this.finalizeNote(note.id)}
                        >
                          Finalize
                        </Button>
                      ) : _.includes(connectedNotes, note.id) ? (
                        <Button onClick={() => this.toggleNote(note.id)}>
                          Disconnect
                        </Button>
                      ) : (
                        <Button
                          variant="dark"
                          onClick={() => this.toggleNote(note.id)}
                        >
                          Connect
                        </Button>
                      ))}
                  </Col>
                </Row>
              </Fragment>
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    ));

    return (
      <Fragment>
        <h1 style={{ textAlign: "center" }}>Topic/Note Selector</h1>
        <br />
        <Accordion>{accordion_children}</Accordion>
        <br />
        <Form className="mr-auto">
          <Form.Row>
            <Col>
              <FormControl
                placeholder="Topic name"
                style={{ display: "inline-block" }}
                value={topicNameInput}
                onChange={(e) =>
                  this.setState({ topicNameInput: e.target.value })
                }
              />
            </Col>
            <Col>
              <Button
                variant="dark"
                style={{ marginLeft: "1rem" }}
                onClick={this.addTopic}
              >
                Create new topic
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Fragment>
    );
  }
}

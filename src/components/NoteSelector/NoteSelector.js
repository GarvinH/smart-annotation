import React, { Fragment } from "react";
import {
  Accordion,
  Card,
  Button,
  Col,
  Row,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import _ from "lodash";

const sortDateOldNew = (notes) => _.sortBy(notes, (note) => note.id); //actual notes within a topic

const sorting = [
  {
    text: "Sort by Date (Old to New)",
    func: sortDateOldNew,
  },
  {
    text: "Sort by Date (New to Old)",
    func: (notes) => {
      return _.reverse(sortDateOldNew(notes));
    },
  },
];

const toggle_list = (arr, val) =>
  _.includes(arr, val) ? _.without(arr, val) : _.concat(arr, val);

export default class NoteSelector extends React.Component {
  state = {
    topicNameInput: "",
    connectingNotes: false,
    showConnectedNotes: false, //for viewing connected notes ONLY (ie no changing if notes are connecting)
    connectedNotes: [],
    keywordFilter: "",
    sortOption: 0, //refer to variable above "sorting" to find corresponding sorting/index
  };

  componentDidUpdate(prevProps, prevState) {
    const { topicIndex, note} = this.props;
    if (topicIndex !== -1 && !_.isNil(note)) {
      const newNote = note;
      console.log(this.state.connectedNotes);

      if (
        newNote.connectedNotes !== prevState.connectedNotes &&
        prevProps.topicIndex !== topicIndex &&
        prevProps.note.id !== note.id
      ) {
        this.setState({ connectedNotes: newNote.connectedNotes });
      }
    }
  }

  showConnectedNotes = (topicIndex, noteId) => {
    const { selectNote } = this.props;
    this.setState({ showConnectedNotes: true });
    selectNote(topicIndex, noteId);
  };

  hideConnectedNotes = () => {
    const { selectNote } = this.props;
    this.setState({ showConnectedNotes: false });
    selectNote(-1, -1);
  };

  connectNote = (topicIndex, noteId) => {
    const { selectNote } = this.props;
    selectNote(topicIndex, noteId);
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
    const {
      notes,
      addNote,
      setNoteEditor,
      topicIndex,
      note: noteObject,
      addTopic,
    } = this.props;
    const {
      topicNameInput,
      connectedNotes,
      connectingNotes,
      showConnectedNotes,
      keywordFilter,
      sortOption,
    } = this.state;

    const filteredNotes = keywordFilter
      ? _.map(notes, (topic) => ({
          ...topic,
          notes: _.filter(topic.notes, (note) =>
            _.some(note.keywords, (keyword) =>
              _.includes(_.toLower(keyword), _.toLower(keywordFilter))
            )
          ),
        }))
      : notes;

    const sortedNotes = _.map(filteredNotes, (topic) => ({
      ...topic,
      notes: sorting[sortOption].func(topic.notes),
    }));

    const accordion_children = _.map(sortedNotes, (topic, topicIdx) => (
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
                <Row
                  style={{
                    margin: "1rem 0",
                    border:
                      (showConnectedNotes || connectingNotes) &&
                      ((topicIndex === topicIdx && note.id === noteObject.id) ||
                        _.includes(connectedNotes, note.id)) &&
                      "1px black solid",
                  }}
                >
                  <Col style={{ display: "flex", alignItems: "center" }}>
                    {note.title}
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      onClick={() => setNoteEditor(topicIdx, note.id, true)}
                      style={{
                        visibility:
                          topicIndex !== -1 &&
                          noteObject.id !== -1 &&
                          connectingNotes &&
                          "hidden",
                      }}
                    >
                      Edit Note
                    </Button>
                  </Col>
                  <Col style={{ display: "flex", alignItems: "center" }}>
                    {new Date(note.date).toDateString()}
                  </Col>
                  {!connectingNotes &&
                    (topicIndex === -1 && noteObject.id === -1 ? (
                      <Button
                        style={{ margin: "0 1rem" }}
                        variant="dark"
                        onClick={() =>
                          this.showConnectedNotes(topicIdx, note.id)
                        }
                      >
                        View Connected Notes
                      </Button>
                    ) : topicIndex === topicIdx && note.id === noteObject.id ? (
                      <Button onClick={this.hideConnectedNotes}>
                        Done Viewing
                      </Button>
                    ) : null)}
                  <Col>
                    {!showConnectedNotes &&
                      (topicIndex === -1 && noteObject.id === -1 ? (
                        <Button
                          variant="dark"
                          onClick={() => this.connectNote(topicIdx, note.id)}
                        >
                          Add Connections
                        </Button>
                      ) : topicIndex === topicIdx && note.id === noteObject.id ? (
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
        <Form>
          <Form.Row>
            <Col>
              <FormControl
                placeholder="Filter by keyword"
                value={keywordFilter}
                onChange={(e) =>
                  this.setState({ keywordFilter: e.target.value })
                }
              />
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="dark">
                  Change sort order
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {_.map(sorting, (option, index) => (
                    <Dropdown.Item
                      key={index}
                      active={index === sortOption}
                      onClick={() => this.setState({ sortOption: index })}
                    >
                      {option.text}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Row>
        </Form>
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
                onClick={() => addTopic(topicNameInput)}
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

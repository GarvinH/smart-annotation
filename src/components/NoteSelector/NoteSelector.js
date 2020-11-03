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

export default class NoteSelector extends React.Component {
  state = {
    topicNameInput: "",
  };

  addTopic = () => {
    const { addTopic } = this.props;
    const { topicNameInput } = this.state;
    addTopic(topicNameInput);
    this.setState({ topicNameInput: "" });
  };

  render() {
    const { notes, addNote, setNoteEditor } = this.props;
    const { topicNameInput } = this.state;

    const accordion_children = _.map(notes, (topic, topicIndex) => (
      <Card key={topicIndex}>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey={`${topicIndex}`}
          >
            {topic.topic}
          </Accordion.Toggle>

          <Button variant="dark" onClick={() => addNote(topicIndex)}>
            Add Note
          </Button>
        </Card.Header>
        <Accordion.Collapse eventKey={`${topicIndex}`}>
          <Card.Body>
            {_.map(topic.notes, (note, noteIndex) => (
              <Fragment key={noteIndex}>
                <Row>
                  <Col style={{ display: "flex", alignItems: "center" }}>
                    {note.title}
                  </Col>
                  <Button
                    variant="dark"
                    onClick={() => setNoteEditor(topicIndex, noteIndex)}
                  >
                    Edit Note
                  </Button>
                  <Col>{new Date(note.date).toDateString()}</Col>
                  <Button style={{ margin: "0 1rem" }} variant="dark">
                    View Connected Notes
                  </Button>
                  <Button variant="dark">Add Connections</Button>
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

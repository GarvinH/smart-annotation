import React, { Fragment } from "react";
import {
  Modal,
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
  hideModal = () => {
    const { controlShow } = this.props;

    controlShow(false);
  };

  render() {
    const { show, notes } = this.props;

    const accordion_children = _.map(notes, (topic, index) => (
      <Card key={index}>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Accordion.Toggle as={Button} variant="link" eventKey={`${index}`}>
            {topic.topic}
          </Accordion.Toggle>

          <Button variant="dark">Add Note</Button>
        </Card.Header>
        <Accordion.Collapse eventKey={`${index}`}>
          <Card.Body>
            {_.map(topic.notes, (note) => (
              <Fragment>
                {console.log(note)}
                <Row>
                  <Col>{note.title}</Col>
                  <Col>{new Date(note.date).toDateString()}</Col>
                </Row>
              </Fragment>
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    ));

    return (
      <Modal show={show} onHide={this.hideModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Topic/Note Selector</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion>{accordion_children}</Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Form className="mr-auto">
            <Form.Row>
              <Col>
                <FormControl
                  placeholder="Topic name"
                  style={{ display: "inline-block" }}
                />
              </Col>
              <Col>
                <Button variant="dark" style={{ marginLeft: "1rem" }}>
                  Create new topic
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Modal.Footer>
      </Modal>
    );
  }
}

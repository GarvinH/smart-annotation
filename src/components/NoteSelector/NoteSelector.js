import React from "react";
import { Modal } from "react-bootstrap";

export default class NoteSelector extends React.Component {
  hideModal = () => {
    const { controlShow } = this.props;

    controlShow(false);
  };

  render() {
    const { show } = this.props;

    return (
      <Modal show={show} onHide={this.hideModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Topic/Note Selector</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
    );
  }
}

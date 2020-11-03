import React from "react";
import { InputGroup, FormControl, Card } from "react-bootstrap";
import { MediaHandler } from "../MediaHandler/MediaHandler.js";

export default class NoteEditor extends React.Component {
  state = {
    id: 0,
    noteTitle: "",
    noteInfo: "",
    noteKeywords: "",
    noteMedia: "",
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const note = nextProps.note;

    if (note.id !== prevState.id) {
      return {
        noteTitle: note.title,
        noteInfo: note.info,
        noteKeywords: note.keywords,
        noteMedia: note.media,
      };
    }

    return null;
  }

  noteSaved = () => {
    const { noteTitle, noteInfo, noteKeywords, noteMedia } = this.state;
    this.setState({
      noteTitle: noteTitle,
      noteInfo: noteInfo,
      noteKeywords: noteKeywords,
      noteMedia: noteMedia,
    });
  };

  titleChange = (event) => this.setState({ noteTitle: event.target.value });

  infoChange = (event) => this.setState({ noteInfo: event.target.value });

  keywordsChange = (event) =>
    this.setState({ noteKeywords: event.target.value });

  render() {
    const { noteTitle, noteInfo, noteKeywords, noteMedia } = this.state;

    return (
      <div style={{ textAlign: "left" }}>
        <header>
          <h2 style={{ paddingLeft: "30px" }}>{noteTitle}</h2>
        </header>
        <div style={{ wordWrap: "break-word", overflow: "hidden" }}>
          <div className="note-editor">
            <Card>
              <MediaHandler mediaLocation={noteMedia} />
              <Card.Body>
                <Card.Title>
                  <InputGroup>
                    <FormControl
                      aria-label="Type your note title here"
                      placeholder="Untitled Note"
                      value={noteTitle}
                      onChange={this.titleChange}
                    />
                  </InputGroup>
                </Card.Title>
                <InputGroup>
                  <FormControl
                    style={{ height: 200 }}
                    as="textarea"
                    aria-label="Type your note here"
                    placeholder="Type your note here"
                    value={noteInfo}
                    onChange={this.infoChange}
                  />
                </InputGroup>
                <InputGroup>
                  <FormControl
                    as="textarea"
                    aria-label="Type your keywords here"
                    placeholder="Add keywords..."
                    value={noteKeywords}
                    onChange={this.keywordsChange}
                  />
                </InputGroup>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

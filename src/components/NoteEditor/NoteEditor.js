import React from "react";
import { InputGroup, FormControl, Card } from "react-bootstrap";
import { MediaHandler } from "../MediaHandler/MediaHandler.js";

export default class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    const note = props.note;
    const title = note.title;
    const info = note.info;
    const keywords = note.keywords;
    const media = note.media;
    this.state = {
      noteTitle: title,
      noteInfo: info,
      noteKeywords: keywords,
      noteMedia: media,
    };
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

  keywordsChange = (event) => this.setState({ noteKeywords: event.target.value });

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
                      defaultValue={noteTitle}
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
                    defaultValue={noteInfo}
                    onChange={this.infoChange}
                  />
                </InputGroup>
                <InputGroup>
                  <FormControl
                    as="textarea"
                    aria-label="Type your keywords here"
                    placeholder="Add keywords..."
                    defaultValue={noteKeywords}
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

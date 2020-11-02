import React from "react";
import { InputGroup, FormControl, Card } from "react-bootstrap";
import { MediaHandler } from "../MediaHandler/MediaHandler.js";

export default class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    const title = props.title;
    const info = props.info;
    const keyword = props.keyword;
    const media = props.media;
    this.state = {
      noteTitle: title,
      noteInfo: info,
      noteKeyword: keyword,
      noteMedia: media,
    };
  }

  noteSaved = () => {
    const { noteTitle, noteInfo, noteKeyword, noteMedia } = this.state;
    this.setState({
      noteTitle: noteTitle,
      noteInfo: noteInfo,
      noteKeyword: noteKeyword,
      noteMedia: noteMedia,
    });
  };

  titleChange = (event) => this.setState({ noteTitle: event.target.value });

  infoChange = (event) => this.setState({ noteInfo: event.target.value });

  keywordChange = (event) => this.setState({ noteKeyword: event.target.value });

  render() {
    const { noteTitle, noteInfo, noteKeyword, noteMedia } = this.state;

    return (
      console.log(
        "\n\nNote title: ",
        noteTitle,
        "\nNote Info: ",
        noteInfo,
        "\nNoteKeyword: ",
        noteKeyword
      ),
      (
        <div style={{ textAlign: "left" }}>
          <header>
            <h2 style={{ paddingLeft: "30px" }}>{noteTitle}</h2>
          </header>
          <body style={{ wordWrap: "break-word", overflow: "hidden" }}>
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
                      defaultValue={noteKeyword}
                      onChange={this.keywordChange}
                    />
                  </InputGroup>
                </Card.Body>
              </Card>
            </div>
          </body>
        </div>
      )
    );
  }
}

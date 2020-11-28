import React from "react";
import {
  InputGroup,
  FormControl,
  Card,
  Button,
  Form,
  Col,
  Dropdown,
} from "react-bootstrap";
import _ from "lodash";

import { MediaHandler } from "../MediaHandler/MediaHandler.js";
import { TagInput } from "../TagInput/TagInput.js";
import { importance_markers } from "../ImportanceMarkers/ImportanceMarkers.js";

export default class NoteEditor extends React.Component {
  state = {
    id: 0,
    noteTitle: "",
    noteInfo: "",
    noteKeywords: "",
    noteMedia: "",
    noteDate: null,
    topicIndex: -1,
    importanceValue: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const note = nextProps.note;

    if (note.id !== prevState.id) {
      return {
        id: note.id,
        noteTitle: note.title,
        noteInfo: note.info,
        noteKeywords: note.keywords,
        noteMedia: note.media,
        noteDate: note.date,
        topicIndex: nextProps.topicIndex,
        importanceValue: note.importanceValue || 0,
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

  addKeyword = async (tagText) => {
    const { noteKeywords } = this.state;
    if (
      !_.some(
        noteKeywords,
        (keyword) => _.toLower(keyword) === _.toLower(tagText)
      )
    ) {
      this.setState({ noteKeywords: [...noteKeywords, tagText] });
    }
  };

  mediaChanged = (location) => this.setState({ noteMedia: location });

  deleteKeyword = (tagText) => {
    const { noteKeywords } = this.state;
    const newKeywordList = _.without(noteKeywords, tagText);
    this.setState({ noteKeywords: newKeywordList });
  };

  updateImportanceValue = (value) => {
    this.setState({ importanceValue: value });
  };

  render() {
    const {
      id,
      noteTitle,
      noteInfo,
      noteKeywords,
      noteMedia,
      noteDate,
      topicIndex,
      noteIndex,
      importanceValue,
    } = this.state;
    const { updateNotes } = this.props;

    return (
      <div style={{ textAlign: "left" }}>
        <header style={{ marginBottom: "1rem" }}>
          <Button
            style={{ float: "right" }}
            variant="dark"
            onClick={() =>
              updateNotes(
                {
                  id: id,
                  title: noteTitle,
                  date: noteDate,
                  info: noteInfo,
                  media: noteMedia,
                  keywords: noteKeywords,
                },
                topicIndex,
                noteIndex
              )
            }
          >
            Save
          </Button>
          <h2 style={{ paddingLeft: "30px" }}>{noteTitle}</h2>
          <Form>
            <Form.Row>
              <Col>
                <Form.Label
                  style={{
                    width: "fit-content",
                    marginLeft: "auto",
                    display: "block",
                  }}
                >
                  Set Importance:
                </Form.Label>
              </Col>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="dark">
                    {
                      _.find(importance_markers, { value: importanceValue })
                        .html
                    }
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {_.map(importance_markers, (importance_object) => (
                      <Dropdown.Item
                        key={importance_object.value}
                        active={importanceValue === importance_object.value}
                        onClick={() =>
                          this.updateImportanceValue(importance_object.value)
                        }
                      >
                        {importance_object.html}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Form.Row>
          </Form>
        </header>
        <div style={{ wordWrap: "break-word", overflow: "hidden" }}>
          <div className="note-editor">
            <Card>
              <MediaHandler
                mediaLocation={noteMedia}
                mediaChanged={this.mediaChanged}
              />
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
                <TagInput
                  tags={noteKeywords}
                  addKeyword={this.addKeyword}
                  deleteKeyword={this.deleteKeyword}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    const { updateNotes, setShowNoteSelector } = this.props;
    const {
      id,
      noteTitle,
      noteDate,
      noteInfo,
      noteMedia,
      noteKeywords,
      topicIndex,
      importanceValue,
    } = this.state;
    updateNotes(
      {
        id: id,
        title: noteTitle,
        date: noteDate,
        info: noteInfo,
        media: noteMedia,
        keywords: noteKeywords,
        importanceValue,
      },
      topicIndex,
      id
    );
    setShowNoteSelector(true);
  }
}

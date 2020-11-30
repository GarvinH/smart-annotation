import React from "react";
import _ from "lodash";
import { Button } from "react-bootstrap";
import IdleTimer from "react-idle-timer"

import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";
import NoteEditor from "./components/NoteEditor/NoteEditor.js";
import { ipcRenderer } from "electron";

class App extends React.Component {
  constructor(props) {
    super(props);
    const notes = Notes.getNotes();
    this.state = {
      notes: notes,
      showNoteSelector: true,
      showNoteEditor: false,
      selectedNote: {
        topicIndex: -1,
        noteId: -1,
      },
    };
  }

  selectNote = (
    topicIndex,
    noteId //selecting note for connections
  ) => this.setState({ selectedNote: { topicIndex, noteId } });

  saveNotes = (newNotes) => {
    this.setState({ notes: newNotes });
    Notes.setNotes(newNotes);
  };

  updateNotes = (updatedNote, topicIndex, noteId) => {
    const { notes } = this.state;
    const newNotes = _.map(notes, (topic, topicIdx) => {
      if (topicIdx !== topicIndex) {
        return { ...topic };
      } else {
        return {
          topic: topic.topic,
          notes: _.map(topic.notes, (note) => {
            if (noteId !== note.id) {
              return { ...note };
            } else {
              return updatedNote;
            }
          }),
        };
      }
    });
    this.saveNotes(newNotes);
  };

  connectNotes = (id, connectedNotes, topicIndex) => {
    const { notes } = this.state;
    const newNotes = _.map(notes, (topic, topicIdx) => {
      if (topicIdx !== topicIndex) {
        return { ...topic };
      } else {
        return {
          topic: topic.topic,
          notes: _.map(topic.notes, (note) => {
            if (note.id === id) {
              return { ...note, connectedNotes: connectedNotes };
            } else if (_.includes(connectedNotes, note.id)) {
              return {
                ...note,
                connectedNotes: _.union(note.connectedNotes, [id]),
              };
            } else {
              return {
                ...note,
                connectedNotes: _.without(note.connectedNotes, id),
              };
            }
          }),
        };
      }
    });
    this.saveNotes(newNotes);
    this.selectNote(-1, -1);
  };

  setNoteEditor = (topicIndex, noteId, showNoteEditor) => {
    this.setState({
      selectedNote: { topicIndex: topicIndex, noteId: noteId },
      showNoteSelector: false,
      showNoteEditor: showNoteEditor,
    });
  };

  setShowNoteSelector = (showNoteSelector) =>
    this.setState({ showNoteSelector: showNoteSelector });

  addNote = (topicIndex) => {
    const { notes } = this.state;
    const newNotes = _.map(notes, (topic, index) => {
      if (index !== topicIndex) {
        return { ...topic };
      } else {
        return {
          topic: topic.topic,
          notes: [
            ...topic.notes,
            {
              id: Date.now(),
              title: `Note ${topic.notes.length + 1}`,
              date: new Date(),
              info: "",
              media: null,
              keywords: "",
              connectedNotes: [], //reference by id
              importanceValue: 0,
            },
          ],
        };
      }
    });

    this.setState({ notes: newNotes });
  };

  addTopic = (topicName) => {
    const { notes } = this.state;
    const newTopic = {
      topic: topicName || `Topic #${notes.length + 1}`,
      notes: [],
    };
    this.setState({ notes: [...notes, newTopic] });
  };

  deleteNote = (selectedNote) => {
    const { notes } = this.state;
    const newNotes = _.map(notes, (topic, topicIdx) => {
      if (topicIdx !== selectedNote.topicIndex) {
        return { ...topic };
      } else {
        const afterDeletion = _.filter(topic.notes, (note) => {
          return selectedNote.noteId !== note.id;
        });
        return {
          topic: topic.topic,
          notes: afterDeletion,
        };
      }
    });
    this.saveNotes(newNotes);
    this.setNoteEditor(-1, -1, false);
  };

  handleOnIdle = () => {
    ipcRenderer.send('send-notification')
  }

  render() {
    const {
      notes,
      showNoteSelector,
      selectedNote,
      showNoteEditor,
    } = this.state;
    const { topicIndex, noteId } = selectedNote;

    const selectedNoteObject =
      topicIndex >= 0
        ? _.find(notes[topicIndex].notes, (note) => note.id === noteId)
        : { id: -1 };

    return (
      <div>
        <IdleTimer
          ref={ref => {this.idleTimer=ref}}
          //timeout={21600000} six hours
          timeout={10000} //10 s
          onIdle={this.handleOnIdle}
        />

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {showNoteEditor && (
            <Button
              variant="dark"
              onClick={() => this.setNoteEditor(-1, -1, false)}
            >
              Save and Close
            </Button>
          )}
          {showNoteEditor && (
            <Button
              variant="dark"
              onClick={() => this.deleteNote(selectedNote)}
            >
              Delete Note
            </Button>
          )}
        </div>

        {showNoteEditor && (
          <NoteEditor
            note={selectedNoteObject}
            updateNotes={this.updateNotes}
            topicIndex={topicIndex}
            setShowNoteSelector={this.setShowNoteSelector}
          />
        )}
        {showNoteSelector && (
          <NoteSelector
            notes={notes}
            addNote={this.addNote}
            addTopic={this.addTopic}
            setNoteEditor={this.setNoteEditor}
            topicIndex={topicIndex}
            note={selectedNoteObject}
            selectNote={this.selectNote}
            connectNotes={this.connectNotes}
          />
        )}
      </div>
    );
  }
}

export default App;

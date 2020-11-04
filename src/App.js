import React from "react";
import _ from "lodash";
import { Button } from "react-bootstrap";

import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";
import NoteEditor from "./components/NoteEditor/NoteEditor.js";

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
        noteIndex: -1,
      },
    };
  }

  saveNotes = (newNotes) => {
    this.setState({ notes: newNotes });
    Notes.setNotes(newNotes);
  };

  updateNotes = (updatedNote, topicIndex, noteIndex) => {
    const { notes } = this.state;
    const newNotes = _.map(notes, (topic, topicIdx) => {
      if (topicIdx !== topicIndex) {
        return { ...topic };
      } else {
        return {
          topic: topic.topic,
          notes: _.map(topic.notes, (note, noteIdx) => {
            if (noteIdx !== noteIndex) {
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

  setNoteEditor = (topicIndex, noteIndex, showNoteEditor) => {
    this.setState({
      selectedNote: { topicIndex: topicIndex, noteIndex: noteIndex },
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

  render() {
    const {
      notes,
      showNoteSelector,
      selectedNote,
      showNoteEditor,
    } = this.state;
    const { topicIndex, noteIndex } = selectedNote;
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {showNoteEditor && (
            <Button
              variant="dark"
              onClick={() => this.setNoteEditor(-1, -1, false)}
            >
              Save and Close
            </Button>
          )}
        </div>
        {showNoteEditor && (
          <NoteEditor
            note={notes[topicIndex].notes[noteIndex]}
            updateNotes={this.updateNotes}
            topicIndex={topicIndex}
            noteIndex={noteIndex}
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
            noteIndex={noteIndex}
          />
        )}
      </>
    );
  }
}

export default App;

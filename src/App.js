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
      selectedNote: {
        topicIndex: -1,
        noteIndex: -1,
      },
    };
  }

  saveNotes = () => Notes.setNotes(this.state.notes);

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
    console.log(newNotes, notes);
    this.setState({ notes: newNotes });
    Notes.setNotes(newNotes);
  };

  setNoteEditor = (topicIndex, noteIndex) => {
    this.setState({
      selectedNote: { topicIndex: topicIndex, noteIndex: noteIndex },
      showNoteSelector: false,
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
      note: [],
    };
    this.setState({ notes: [...notes, newTopic] });
  };

  render() {
    const { notes, showNoteSelector, selectedNote } = this.state;
    const { topicIndex, noteIndex } = selectedNote;
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {topicIndex >= 0 && noteIndex >= 0 && (
            <Button variant="dark" onClick={() => this.setNoteEditor(-1, -1)}>
              Save and Close
            </Button>
          )}
        </div>
        {topicIndex >= 0 && noteIndex >= 0 && (
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
          />
        )}
      </>
    );
  }
}

export default App;

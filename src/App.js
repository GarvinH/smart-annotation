import React from "react";
import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";
import { MediaHandler } from "./components/MediaHandler/MediaHandler";
import _ from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);
    const notes = Notes.getNotes();
    console.log(notes);
    this.state = {
      notes: notes,
      showNoteSelctor: true,
    };
  }

  setShowNoteSelector = (showNoteSelctor) =>
    this.setState({ showNoteSelctor: showNoteSelctor });

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
              title: `Note ${topic.notes.length + 1}`,
              date: new Date(),
              info: "",
              media: "",
              keywords: "",
            },
          ],
        };
      }
    });

    this.setState({ notes: newNotes });
  };

  render() {
    const { notes, showNoteSelctor } = this.state;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{ position: "absolute" }}
          onClick={() => this.setShowNoteSelector(true)}
        >
          Select Topic/Note
        </button>
        <MediaHandler />
        <NoteSelector
          show={showNoteSelctor}
          controlShow={this.setShowNoteSelector}
          notes={notes}
          addNote={this.addNote}
        />
      </div>
    );
  }
}

export default App;

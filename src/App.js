import React from "react";
import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";
import NoteEditor from "./components/NoteEditor/NoteEditor.js";
import { MediaHandler } from "./components/MediaHandler/MediaHandler";

class App extends React.Component {
  constructor(props) {
    super(props);
    const notes = Notes.getNotes();
    console.log(notes);
    this.state = {
      notes: notes,
      showNoteSelctor: true,
      showNote: false,
    };
  }

  setShowNoteSelector = (showNoteSelctor) =>
    this.setState({ showNoteSelctor: showNoteSelctor });

  setShowNote = (showNote) => this.setState({ showNote: showNote });

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
        <button
          style={{ textAlign: "center" }}
          onClick={() => this.setShowNote(true)}
        >
          Open note
        </button>
        <NoteEditor
          show={this.state.showNote}
          controlShow={this.setShowNote}
          title="Untitled note"
          info="Info"
          keyword="Enter keywords"
          media="C:\Users\carin\Pictures\Taobao\harry-potter-note-pad-01.jpg"
        />
        <NoteSelector
          show={showNoteSelctor}
          controlShow={this.setShowNoteSelector}
          notes={notes}
        />
      </div>
    );
  }
}

export default App;

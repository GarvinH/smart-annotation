import React from "react";
import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";
import { MediaHandler } from "./components/MediaHandler/MediaHandler";

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
        />
      </div>
    );
  }
}

export default App;

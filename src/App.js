import React from "react";
import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";

class App extends React.Component {
  state = {
    showNoteSelctor: true,
  };

  setShowNoteSelector = (showNoteSelctor) =>
    this.setState({ showNoteSelctor: showNoteSelctor });

  render() {
    console.log(Notes.getNotes())
    return (
      <div style={{ textAlign: "center" }}>
        <button
          style={{ position: "absolute" }}
          onClick={() => this.setShowNoteSelector(true)}
        >
          Select Topic/Note
        </button>
        <NoteSelector
          show={this.state.showNoteSelctor}
          controlShow={this.setShowNoteSelector}
        />
      </div>
    );
  }
}

export default App;

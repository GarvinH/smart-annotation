import React from "react";
import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";
import FileInterface from "./backend/FileSystem/fileio";

class App extends React.Component {
  state = {
    showNoteSelctor: true,
  };

  setShowNoteSelector = (showNoteSelctor) =>
    this.setState({ showNoteSelctor: showNoteSelctor });

  render() {
    console.log(Notes.getNotes())
    Notes.setNotes([
      { topic: "topic1", notes: [] },
      { topic: "topic2", notes: [] },
    ])
    return (
      <div style={{ textAlign: "center" }}>
        <button
          style={{ position: "absolute" }}
          onClick={() => this.setShowNoteSelector(true)}
        >
          Select Topic/Note
        </button>
        <button style={{marginTop: "10rem"}}onClick={FileInterface.saveMedia}>test</button>
        <NoteSelector
          show={this.state.showNoteSelctor}
          controlShow={this.setShowNoteSelector}
        />
      </div>
    );
  }
}

export default App;

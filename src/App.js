import React from "react";
import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";
import FileInterface from "./backend/FileSystem/fileio";
import NoteEditor from "./components/NoteEditor/NoteEditor.js";

class App extends React.Component {
  state = {
    showNoteSelctor: true,
    showNote: false,
  };

  setShowNoteSelector = (showNoteSelctor) =>
    this.setState({ showNoteSelctor: showNoteSelctor });

  setShowNote = (showNote) => this.setState({showNote: showNote});

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
        <button style={{marginTop: "50%"}} onClick={FileInterface.saveMedia}>Test</button>
        <NoteSelector
          show={this.state.showNoteSelctor}
          controlShow={this.setShowNoteSelector}
        />
        <button
          style={{textAlign: "center"}}
          onClick={() => this.setShowNote(true)}>Open note</button>
        <NoteEditor show={this.state.showNote} controlShow={this.setShowNote}/>
      </div>
    );
  }
}

export default App;

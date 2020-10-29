import React from "react";
import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";
import FileInterface from "./backend/FileSystem/fileio";
import NoteEditor from "./components/NoteEditor/NoteEditor.js";
import { MediaHandler } from "./components/MediaHandler/MediaHandler";

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
        <NoteEditor show={this.state.showNoteSelctor} controlShow={this.setShowNoteSelector} title="Test title" info="Test info" keyword="Test keywords" media="pdf file link"/>
        <button style={{marginTop: "50%"}} onClick={FileInterface.saveMedia}>Test</button>
        {/* <NoteSelector
        <MediaHandler />
        <NoteSelector
          show={this.state.showNoteSelctor}
          controlShow={this.setShowNoteSelector}
        /> */}
      </div>
    );
  }
}

export default App;

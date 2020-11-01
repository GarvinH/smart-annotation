import React from "react";
import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";
import NoteEditor from "./components/NoteEditor/NoteEditor.js";
import { MediaHandler } from "./components/MediaHandler/MediaHandler";

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
        {/* <button
          style={{ position: "absolute" }}
          onClick={() => this.setShowNoteSelector(true)}
        >
          Select Topic/Note
        </button>
        <MediaHandler mediaLocation="C:\Users\carin\Pictures\Taobao\harry-potter-note-pad-01.jpg"/> */}
        <button
          style={{textAlign: "center"}}
          onClick={() => this.setShowNote(true)}>Open note</button>
        <NoteEditor show={this.state.showNote} controlShow={this.setShowNote} title= "Untitled note" info="Info" keyword="Enter keywords" media="C:\Users\carin\Pictures\Taobao\harry-potter-note-pad-01.jpg"/>
        <NoteSelector
          show={this.state.showNoteSelctor}
          controlShow={this.setShowNoteSelector}
        />
        
      </div>
    );
  }
}

export default App;

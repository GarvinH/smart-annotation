import React from "react";
import NoteSelector from "./components/NoteSelector/NoteSelector";
import Notes from "./backend/Notes/notes";
import NoteEditor from "./components/NoteEditor/NoteEditor.js";
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
      showNote: false,
    };
  }

  setShowNoteSelector = (showNoteSelctor) =>
    this.setState({ showNoteSelctor: showNoteSelctor });

  setShowNote = (showNote) => this.setState({ showNote: showNote });

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

  addTopic = (topicName) => {
    const { notes } = this.state;
    const newTopic = {topic: topicName || `Topic #${notes.length+1}`, note:[]}
    this.setState({notes: [...notes, newTopic]})
  }

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
          addNote={this.addNote}
          addTopic={this.addTopic}
        />
      </div>
    );
  }
}

export default App;

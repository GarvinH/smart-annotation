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

  addTopic = (topicName) => {
    const { notes } = this.state;
    const newTopic = {
      topic: topicName || `Topic #${notes.length + 1}`,
      note: [],
    };
    this.setState({ notes: [...notes, newTopic] });
  };

  render() {
    const { notes, showNoteSelctor } = this.state;
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="dark"
            onClick={() => this.setShowNoteSelector(true)}
          >
            Select Topic/Note
          </Button>
        </div>

        <NoteEditor
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
      </>
    );
  }
}

export default App;

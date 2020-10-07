import FileInterface from "../FileSystem/fileio";

export default class Notes {
  static notes = [
    { topic: "Topic 1", notes: [{title: "Note 1", date: new Date()}, {title: "Note 2", date: new Date()}] },
    { topic: "Topic 2", notes: [{title: "Note 1", date: new Date()}] },
  ];
  static initiated = false;

  static getNotes() {
    if (this.initiated) {
      return this.notes;
    } else {
      try {
        this.notes = FileInterface.getNotes();
      } catch {
        this.notes = [];
      }
      this.initiated = true;

      return this.notes;
    }
  }
  
  static setNotes(notes) {
    this.notes = notes;
    this.saveNotes();
  }

  static saveNotes() {
    //use this internally only
    FileInterface.saveNotes(this.notes);
  }
}

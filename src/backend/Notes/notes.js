import fileInterface from "../FileSystem/fileio"

export default class Notes {
  static notes = [
    { topic: "topic1", notes: [] },
    { topic: "topic2", notes: [] },
  ];
  static initiated = true;

  static getNotes() {
    if (this.initiated) {
      fileInterface.saveNotes(this.notes)
      return this.notes;
    } else {
      return [];
    }
  }


}

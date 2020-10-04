export default class Notes {
  static notes = [
    { topic: "topic1", notes: [] },
    { topic: "topic2", notes: [] },
  ];
  static initiated = false;

  static getNotes() {
    if (this.initiated) {
      return this.notes;
    } else {
      return [];
    }
  }
}

import path from "path";
import fs from "fs";
const electron = require("electron").remote;
const dialog = electron.dialog;

export default class FileInterface {
  static userDataPath = (electron.app || electron.remote.app).getPath(
    "userData"
  );
  static notePath = path.join(this.userDataPath, "notes.json");

  static saveNotes(notes) {
    fs.writeFileSync(this.notePath, JSON.stringify(notes));
  }

  static getNotes() {
    const notes = JSON.parse(fs.readFileSync(this.notePath));
    return notes;
  }

  static async saveMedia() {
    const media= await dialog.showOpenDialog({ properties: ["openFile"] });
    const mediaPath = media.filePaths[0]
    console.log(mediaPath)
    const mediaName = path.basename(mediaPath);
    console.log(mediaName);
  }
}

import path from "path";
import fs from "fs";
const electron = require("electron").remote;
const dialog = electron.dialog;

export default class FileInterface {
  static userDataPath = (electron.app || electron.remote.app).getPath(
    "userData"
  );
  static notePath = path.join(this.userDataPath, "notes.json");
  static mediaPath = path.join(this.userDataPath, "/media/");

  static saveNotes(notes) {
    console.log(this.notePath);
    fs.writeFileSync(this.notePath, JSON.stringify(notes));
  }

  static getNotes() {
    const notes = JSON.parse(fs.readFileSync(this.notePath));
    return notes;
  }

  static saveMedia = async () => {
    try {
      console.log(this.notePath);
      const userMedia = await dialog.showOpenDialog({
        properties: ["openFile"],
      });
      const userMediaPath = userMedia.filePaths[0];
      const userMediaName = path.basename(userMediaPath);
      if (!fs.existsSync(this.mediaPath)) {
        fs.mkdirSync(this.mediaPath);
      }
      const storedMediaLocation = path.join(this.mediaPath, userMediaName)
      fs.copyFileSync(userMediaPath, storedMediaLocation);
      return storedMediaLocation;
    } catch {
      throw new Error("No received media files.");
    }
  };
}

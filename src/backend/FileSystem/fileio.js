import electron from "electron";
import path from "path";
import fs from "fs";

export default class fileInterface {
    static userDataPath = (electron.app || electron.remote.app).getPath("userData")
    static notePath = path.join(this.userDataPath, "notes.json")

    static saveNotes(notes) {
        fs.writeFileSync(this.notePath, JSON.stringify(notes))
    }
}

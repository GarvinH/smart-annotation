import React from "react";
import _ from "lodash";
import FileInterface from "../../backend/FileSystem/fileio";
import FileType from "file-type";
import fs from "fs";

export class MediaHandler extends React.Component {
  state = {
    mime: null,
    error: false,
  };

  obtainMedia = async () => {
    try {
      const location = await FileInterface.saveMedia();
      //update note location here
    } catch {}
  };

  readMediaType = async (mediaLocation) => {
    const stream = fs.createReadStream(mediaLocation);
    const mime = (await FileType.fromStream(stream)).mime;
    console.log(mime);
    return mime;
  };

  loadMedia = () => {
    const { mediaLocation } = this.props;
    if (!_.isNil(mediaLocation)) {
      this.readMediaType(mediaLocation)
        .then((mime) => {
          this.setState({ mime: mime, error: false });
        })
        .catch(() => this.setState({ mime: "error", error: true }));
    }
  };

  render() {
    const { mediaLocation } = this.props;

    if (_.isNil(mediaLocation)) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <button onClick={this.obtainMedia}>Add Media</button>
        </div>
      );
    } else {
      const { mime, error } = this.state;
      const fileLocation = `file://${mediaLocation}`;

      try {
        if (_.isNil(mime)) {
          return null;
        } else if (error) {
          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h4>Failed to read file, try again</h4>
              <button onClick={this.obtainMedia}>Add Media</button>
            </div>
          );
        } else if (_.includes(mime, "image")) {
          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img src={fileLocation} alt="note" />
            </div>
          );
        } else if (_.includes(mime, "audio")) {
          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <audio controls>
                <source src={fileLocation} type={mime} />
              </audio>
            </div>
          );
        } else if (_.includes(mime, "video")) {
          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <video controls>
                <source src={fileLocation} type={mime} />
              </video>
            </div>
          );
        }
      } catch {
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h4>Failed to read file, try again</h4>
            <button onClick={this.obtainMedia}>Add Media</button>
          </div>
        );
      }
    }
  }

  componentDidMount() {
    this.loadMedia();
  }

  componentDidUpdate() {
    this.loadMedia();
  }
}

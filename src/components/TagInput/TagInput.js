import React from "react";
import { Badge, Button } from "react-bootstrap";
import _ from "lodash";

import classes from "./TagInput.module.css";

export class TagInput extends React.Component {
  state = {
    inputText: "",
  };

  inputKeyDown = async (e) => {
    const { addKeyword } = this.props;
    const tagText = e.target.value;
    if (e.key === "Enter") {
      if (tagText) {
        await addKeyword(tagText);
      }
      this.setState({ inputText: "" });
    }
  };

  render() {
    const { inputText } = this.state;
    const { tags, deleteKeyword } = this.props;

    return (
      <div className={classes["input-tag"]}>
        <ul className={classes["input-tag__tags"]}>
          {_.map(tags, (tag, i) => (
            <li key={tag} style={{ marginRight: "0.5rem" }}>
              <h1>
                <Badge variant="dark">
                  <Button
                    variant="light"
                    size="sm"
                    style={{ marginRight: "0.5rem" }}
                    onClick={() => deleteKeyword(tag)}
                  >
                    X
                  </Button>
                  {tag}
                </Badge>
              </h1>
            </li>
          ))}
          <li className={classes["input-tag__tags__input"]}>
            <input
              style={{ height: "100%", fontSize: "2rem", paddingLeft: "1rem " }}
              type="text"
              aria-label="Add Keywords here. Press enter to save the tag."
              placeholder="Add Keywords..."
              onChange={(e) => this.setState({ inputText: e.target.value })}
              onKeyDown={this.inputKeyDown}
              value={inputText}
            />
          </li>
        </ul>
      </div>
    );
  }
}

import React from "react";
import {
  Badge,
  Button,
} from "react-bootstrap";
import _ from "lodash";

import classes from "./TagInput.module.css";

export class TagInput extends React.Component {
  render() {
    const { tags } = this.props;

    return (
      <div className={classes["input-tag"]}>
        <ul className={classes["input-tag__tags"]}>
          {_.map(tags, (tag, i) => (
            <li key={tag}>
              <h1>
                <Badge variant="dark">
                  {tag}
                  <Button
                    variant="light"
                    size="sm"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    X
                  </Button>
                </Badge>
              </h1>
            </li>
          ))}
          <li className={classes["input-tag__tags__input"]}>
            <input
              style={{ height: "100%", fontSize: "2rem" }}
              type="textarea"
              onKeyDown={this.inputKeyDown}
              ref={(c) => {
                this.tagInput = c;
              }}
            />
          </li>
        </ul>
      </div>
    );
  }
}

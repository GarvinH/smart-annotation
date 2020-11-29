import React from "react";

const Emoji = (props) => (
  <span
  role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
);

export const importance_markers = [
  {
    value: 0,
    html: "None",
  },
  {
    value: 1,
    html: <Emoji symbol="❗️" label="Moderately important" />,
  },
  {
    value: 2,
    html: <Emoji symbol="❗️❗️" label="Important" />,
  },
  {
    value: 3,
    html: <Emoji symbol="❗️❗️❗️" label="Urgent" />,
  },
];

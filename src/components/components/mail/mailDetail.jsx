import React from "react";

const moment = require("moment");
export const MailDetail = (props) => {
  const truncateString = (string, length) => {
    return string.substring(0, length) + "...";
  };

  return (
    <div className="email-item" onClick={props.handleClick}>
      <div className="email-item__name">{props.email.from}</div>
      <div className="email-item__subject">
        <strong>{props.email.subject}</strong>
      </div>
      <div className="email-item__read" data-read={props.email.read}></div>

      <div className="email-item__time">
        {moment(props.email.date).format("h:mm:ss a")}
      </div>
      <div className="email-item__message">
        <p>{truncateString(props.email.content, 85)}</p>
      </div>
    </div>
  );
};

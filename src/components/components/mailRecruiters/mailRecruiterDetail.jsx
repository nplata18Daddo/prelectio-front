import React from "react";

const moment = require("moment");
export const MailRecruiterDetail = (props) => {
  const truncateString = (string, length) => {
    return string.substring(0, length) + "...";
  };

  return (
    <div className="email-item" onClick={props.handleClick}>
      <div className="email-item__name">
        {props.email.usuario_para.nombre_usuario}
      </div>
      <div className="email-item__subject">
        <strong>{props.email.subject_mensaje}</strong>
      </div>
      {/* <div
        className="email-item__read"
        data-read={props.email.leido_mensaje}
      ></div> */}

      <div className="email-item__time">
        {moment(props.email.fecha_envio).format("h:mm:ss a")}
      </div>
      <div className="email-item__message">
        <p>{truncateString(props.email.contenido_mensaje, 85)}</p>
      </div>
    </div>
  );
};

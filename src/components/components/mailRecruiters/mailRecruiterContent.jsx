import React from "react";
import "moment/locale/es-mx";
import { Spinner } from "react-bootstrap";
const moment = require("moment");

moment.locale("es");
export const MailRecruiterContent = (props) => {
  if (!props.loading && props.mails.length === 0 && !props.selectedItem) {
    return (
      <div className="loading__wrapper">
        <h4> No has contactaco a nadie por el momento.</h4>
      </div>
    );
  }
  if (!props.loading && props.mails.length > 0 && !props.selectedItem) {
    return (
      <div className="loading__wrapper">
        <h4> Selecciona un mensaje para ver su contenido.</h4>
      </div>
    );
  }
  if (props.loading) {
    return (
      <div className="loading__wrapper">
        <Spinner style={{ fontSize: "6rem" }} animation="border" />
      </div>
    );
  }
  if (props.selectedItem) {
    return (
      <div className="email-details__container" style={{ textAlign: "start" }}>
        <div className="email-details__header">
          <div className="email-details__info">
            <strong>{props.selectedItem.usuario_para?.nombre_usuario} </strong>

            <div className="pull-right">
              <span>
                {" "}
                {moment(props.selectedItem.fecha_envio)
                  .locale("es")
                  .format("MMMM D YYYY")}
              </span>
            </div>
            <div>{props.selectedItem.subject_mensaje}</div>
          </div>
        </div>
        <div className="email-details__message">
          <p>{props.selectedItem.contenido_mensaje}</p>
        </div>
      </div>
    );
  }
};

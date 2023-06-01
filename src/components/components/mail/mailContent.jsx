import React, { useState } from "react";
import "moment/locale/es-mx";
import { Row, Spinner } from "react-bootstrap";
import SendEmailModalAthlete from "../modals/ModalSendMailAthlete";
const moment = require("moment");

moment.locale("es");
export const MailContent = (props) => {
  const [openReply, setOpenReply] = useState(false);
  if (!props.loading && props.mails.length === 0 && !props.selectedItem) {
    return (
      <div className="loading__wrapper">
        <h4> No tienes mensajes por el momento.</h4>
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
            <strong>{props.selectedItem.usuario_de.nombre_usuario} </strong>

            <div className="pull-right">
              <span>
                {" "}
                {moment(props.selectedItem.fecha_envio)
                  .locale("es")
                  .format("MMMM D YYYY")}
              </span>
              <div className="email-details__buttons">
                {!props.reply && (
                  <SendEmailModalAthlete
                    refresh={props.refresh}
                    setRefresh={props.setRefresh}
                    id_usuario={props.selectedItem.de}
                    message={props.selectedItem}
                  />
                )}
              </div>
            </div>
            <div>{props.selectedItem.subject_mensaje}</div>
          </div>
        </div>

        <Row className="acudiente__row">
          <p className="display__small weight__bold">
            <i className="bi bi-lock" style={{ fontSize: "16px" }}></i>
            Las llamadas y mensajes enviados a este chat ahora están seguros con
            cifrado de extremo a extremo. Toca para más informacion
          </p>
        </Row>
        <div className="email-details__message">
          <p style={{ paddingTop: "15px" }}>
            {props.selectedItem.contenido_mensaje}
          </p>
        </div>
      </div>
    );
  }
};

import React from "react";
import "moment/locale/es-mx";
const moment = require("moment");

moment.locale("es");
export const MailContent = (props) => {
  return (
    props.selectedItem && (
      <div className="email-details__container" style={{ textAlign: "start" }}>
        <div className="email-details__header">
          <div className="email-details__info">
            <strong>
              {props.selectedItem.from} {"<" + props.selectedItem.email + ">"}
            </strong>

            <div className="pull-right">
              <span>
                {" "}
                {moment(props.selectedItem.date)
                  .locale("es")
                  .format("MMMM D YYYY")}
              </span>
            </div>
            <div>{props.selectedItem.subject}</div>
          </div>
        </div>
        <div className="email-details__message">
          <p>{props.selectedItem.content}</p>
        </div>
      </div>
    )
  );
};

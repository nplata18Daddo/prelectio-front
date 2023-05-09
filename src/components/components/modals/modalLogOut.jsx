import Modal from "react-bootstrap/Modal";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { CODES } from "../../../consts/codes";

export const ModalLogOut = (props) => {
  return (
    <>
      <Modal
        show={props.open}
        onHide={props.action}
        centered
        className="modal__info"
      >
        <Modal.Body style={{ padding: "4rem" }}>
          <Row>
            <Col xs={12}>
              <p className="display__small text-white weight__bold">
                {props.data?.responseMessage}
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className="login__submit display__label weight__bold"
            variant="primary"
            onClick={props.action}
          >
            Cerrar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

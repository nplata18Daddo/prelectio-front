import Modal from "react-bootstrap/Modal";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";

export const ModalInfo = (props) => {
  //console.log(props.data)

  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <>
      <Modal
        show={props.open}
        onHide={handleClose}
        centered
        className="modal__info"
      >
        <Modal.Body style={{ padding: "4rem" }}>
          <Row>
            <Col xs={12}>
              <p className="display__small text-white weight__bold">
                {props.data?.data?.responseCode === 0 ||
                props.data?.data?.responseCode === 1008
                  ? props.data?.data?.responseMessage
                  : props.data?.data?.errors[0].msg}
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className="login__submit display__label weight__bold"
            variant="primary"
            onClick={handleClose}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

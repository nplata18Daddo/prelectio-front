import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CODES } from "../../../consts/codes";
import { ChangeRecruiterStatus } from "../../../services/adminServices";

export const ModalConfirmStatusChange = (props) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleStatusChange = async () => {
    const fetchData = async () => {
      console.log(props.userData.id_estado);
      setLoading(true);
      const obj = {
        id: props.userData.id_usuario,
        id_estado: props.userData.id_estado === 0 ? "1" : "0",
      };
      const [userInfo] = await Promise.all([ChangeRecruiterStatus(obj)]);
      setLoading(false);
      setShow(false);
      props.setOpen(true);
      props.setResponseMessage(userInfo);
    };

    fetchData();
  };
  return (
    <>
      <Button
        onClick={handleShow}
        className="login__submit display__small weight__bold"
      >
        {props.userData?.id_estado === 0 && (
          <>
            Dar acceso
            <i
              className="bi bi-arrow-right"
              style={{ fontSize: "16px", marginLeft: "5px" }}
            ></i>
          </>
        )}
        {props.userData?.id_estado === 1 && (
          <>
            <i
              className="bi bi-arrow-left"
              style={{ fontSize: "16px", marginRight: "5px" }}
            ></i>
            Remover acceso
          </>
        )}
      </Button>
      <Modal centered show={show} onHide={handleClose} className="modal__info">
        <Modal.Header closeButton>
          <Modal.Title className="colors__lightBlue weight__bold display__large">
            Confirmación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Row className="p-4">
            <Col xs={12}>
              <p className="display__small text-white weight__bold">
                ¿Estás seguro que deseas cambiar el acceso a la plataforma del
                reclutador?
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="primary"
            onClick={handleStatusChange}
            className="button__accept"
          >
            Aceptar
          </Button>
          <Button
            className="button__cancel"
            variant="secondary"
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

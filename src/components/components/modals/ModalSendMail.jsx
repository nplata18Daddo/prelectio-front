import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { SendMail } from "../../../services/adminServices";
import { CODES } from "../../../consts/codes";
import { ModalInfo } from "../../../components/components/modals/ModalInfo";

function SendEmailModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);

  const handleSubmit = (event) => {
    const send = async () => {
      const activeUser = JSON.parse(localStorage.getItem("user"));

      const obj = {
        de: activeUser.id_usuario,
        para: props.id_usuario,
        contenido_mensaje: content,
        subject_mensaje: subject,
        leido_mensaje: false,
      };
      console.log(`Sending email with subject: ${obj}`);
      const [sended] = await Promise.all([SendMail(obj)]);
      console.log(sended);
      setResponseMessage(sended);
      handleClose();
      if (sended.status === 200) {
        if (sended.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          setOpenModalInfo(true);
          setSubject("");
          setContent("");
        }
      }
    };

    send();

    // Send email using subject and content inputs
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="listAthletes__button"
        style={{ minHeight: "40px" }}
      >
        Contactar
      </Button>
      <ModalInfo
        data={responseMessage}
        open={openModalInfo}
        setOpen={setOpenModalInfo}
      />

      <Modal show={show} onHide={handleClose} size="lg" centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Enviar Correo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <Form>
            {props.acudiente && props.acudiente.length > 0 && (
              <>
                <Row className="acudiente__row">
                  <p className="display__small">
                    {" "}
                    <i
                      className="bi bi-info-circle"
                      style={{ fontSize: "16px" }}
                    >
                      {" "}
                    </i>
                    Este atleta es un menor de edad, antes de establecer una
                    conexión debes comunicarte con el acudiente.
                  </p>
                </Row>
                <Row>
                  <p
                    className="display__regular weight__bold"
                    style={{ marginTop: "5px" }}
                  >
                    Información Acudiente:
                  </p>
                  <Col xs={12} md={6}>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId="name"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className=" display__small">
                        Nombre
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          disabled
                          maxLength="100"
                          value={props.acudiente[0].nombre_acudiente}
                          className="edit__input  display__small"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId="name"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className=" display__small">
                        Correo
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          disabled
                          maxLength="100"
                          value={props.acudiente[0].email_acudiente}
                          className="edit__input  display__small"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId="name"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className=" display__small">
                        Celular
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          disabled
                          maxLength="100"
                          value={props.acudiente[0].telefono_acudiente}
                          className="edit__input  display__small"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            <Form.Group controlId="formSubject">
              <Form.Label
                className="weight__bold display__small"
                style={{ fontSize: "14px" }}
              >
                Asunto
              </Form.Label>
              <Form.Control
                style={{ fontSize: "14px" }}
                type="text"
                placeholder="Ingrese el asunto"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formContent" className="mt-3">
              <Form.Label
                className="weight__bold display__small"
                style={{ fontSize: "14px" }}
              >
                Contenido
              </Form.Label>
              <Form.Control
                style={{ fontSize: "14px" }}
                as="textarea"
                placeholder="Ingrese el contenido del correo"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: "center", justifyContent: "center" }}>
          <Button
            className="display__label weight__bold"
            style={{ fontSize: "14px" }}
            variant="secondary"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            className="login__submit display__label weight__bold"
            style={{ fontSize: "14px" }}
            variant="primary"
            onClick={handleSubmit}
            type="submit"
          >
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SendEmailModal;

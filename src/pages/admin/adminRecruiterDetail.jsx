import React, { useEffect, useState } from "react";
import { Button, Col, Container, Placeholder, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CODES } from "../../consts/codes";
import { GetRecruiterDetail } from "../../services/adminServices";
import Accordion from "react-bootstrap/Accordion";
import { GetDocumentType, GetRepresents } from "../../consts/generalFunctions";
import { ModalConfirmStatusChange } from "../../components/components/recruiter/modalConfirmStatusChange";

import { ModalAction } from "../../components/components/modals/ModalAction";
export const AdminRecruiterDetail = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const obj = {
        id: id,
      };
      const [userInfo] = await Promise.all([GetRecruiterDetail(obj)]);
      setLoading(false);
      if (userInfo.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
        setUserData(userInfo.data.responseMessage);
      }
    };

    fetchData();
  }, [id, refresh]);

  const handleHideAction = () => {
    setOpenModalInfo(false);
    setRefresh(!refresh);
  };

  return (
    <div>
      <Container style={{ marginTop: "8rem", marginBottom: "5rem" }}>
        <ModalAction
          data={responseMessage}
          open={openModalInfo}
          setOpen={setOpenModalInfo}
          action={handleHideAction}
        />
        {!loading && (
          <>
            <Row>
              <Col xs={12} className="px-4">
                <h1
                  onClick={() => navigate(-1)}
                  className="display__label weight__bold pb-1 d-flex align-items-center"
                  style={{ textAlign: "start", cursor: "pointer" }}
                >
                  <i
                    class="bi bi-arrow-left-circle "
                    style={{ fontSize: "20px", marginRight: "15px" }}
                  ></i>
                  <span>Ir atrás</span>
                </h1>
              </Col>
              <Col xs={8} className="mt-3">
                <h1
                  className="display__large weight__bold colors__lightBlue"
                  style={{ textAlign: "left", fontSize: "36px" }}
                >
                  {userData.nombre_usuario}
                </h1>
              </Col>
              <Col xs={4} style={{ textAlign: "right" }}>
                <ModalConfirmStatusChange
                  refresh={refresh}
                  setRefresh={setRefresh}
                  userData={userData}
                  setResponseMessage={setResponseMessage}
                  setOpen={setOpenModalInfo}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "2rem" }}>
              <Col xs={12}>
                {" "}
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Información Personal</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col xs={12} md={4}>
                          <p
                            className="display__label"
                            style={{ textAlign: "left", padding: "10px" }}
                          >
                            {" "}
                            <span className="weight__bold  colors__lightBlue ">
                              Correo:{" "}
                            </span>
                            {userData.email_usuario}
                          </p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p
                            className="display__label"
                            style={{ textAlign: "left", padding: "10px" }}
                          >
                            <span className="weight__bold  colors__lightBlue ">
                              Ciudad:{" "}
                            </span>
                            {userData.ciudad?.nombre_ciudad}
                          </p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p
                            className="display__label"
                            style={{ textAlign: "left", padding: "10px" }}
                          >
                            <span className="weight__bold  colors__lightBlue ">
                              Departamento:{" "}
                            </span>

                            {userData.departamento?.nombre_departamento}
                          </p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p
                            className="display__label"
                            style={{ textAlign: "left", padding: "10px" }}
                          >
                            <span className="weight__bold  colors__lightBlue ">
                              Fecha nacimiento/creación:{" "}
                            </span>
                            {userData.fecha_creacion}
                          </p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p
                            className="display__label"
                            style={{ textAlign: "left", padding: "10px" }}
                          >
                            <span className="weight__bold  colors__lightBlue ">
                              Tipo Documento:{" "}
                            </span>

                            {GetDocumentType(userData.tipo_documento_usuario)}
                          </p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p
                            className="display__label"
                            style={{ textAlign: "left", padding: "10px" }}
                          >
                            <span className="weight__bold  colors__lightBlue ">
                              Numero Documento:
                            </span>
                            {userData.numero_documento_usuario}
                          </p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p
                            className="display__label"
                            style={{ textAlign: "left", padding: "10px" }}
                          >
                            <span className="weight__bold  colors__lightBlue ">
                              Celular:
                            </span>
                            {userData.telefono_usuario}
                          </p>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
            <Row style={{ marginTop: "2rem" }}>
              <Col xs={12}>
                {" "}
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Información Profesional</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col xs={12}>
                          <p
                            className="display__label"
                            style={{ textAlign: "left", padding: "10px" }}
                          >
                            {" "}
                            <span className="weight__bold  colors__lightBlue ">
                              A quien representa:{" "}
                            </span>
                            {GetRepresents(
                              userData.reclutador?.entidad_reclutador
                            )}
                          </p>
                        </Col>
                        <Col xs={12}>
                          <p
                            className="display__label"
                            style={{ textAlign: "left", padding: "10px" }}
                          >
                            <span className="weight__bold  colors__lightBlue ">
                              Descripción:{" "}
                            </span>
                            {userData.descripcion_usuario}
                          </p>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </>
        )}

        {loading && (
          <>
            <Placeholder className="mt-5 " xs={12} />
            <Placeholder className="mt-5 " xs={12} />
            <Placeholder className="mt-5 " xs={12} />
            <Placeholder className="mt-5 " xs={12} />
            <Placeholder className="mt-5 " xs={12} />/{" "}
          </>
        )}
      </Container>
    </div>
  );
};

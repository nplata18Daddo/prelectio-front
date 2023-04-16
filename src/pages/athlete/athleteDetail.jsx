import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CODES } from "../../consts/codes";
import { GetDeportistaById } from "../../services/deportistaServices";
import ColombianFlag from "../../assets/register/colombia.png";
import baseProfile from "../../assets/register/emptyProfile.png";
import { getCiudades, getDepartamentos } from "../../services/locationServices";
import {
  GetHabilidadDeportista,
  GetTrayectoriaDeportista,
} from "../../services/adminServices";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import SendEmailModal from "../../components/components/modals/ModalSendMail";
export const AthleteDetail = () => {
  const { id } = useParams();
  const [athleteInfo, setAthleteInfo] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [habilidadesDeportista, setHabilidadesDeportista] = useState([]);
  const [trayectoriasDeportista, setTrayectoriasDeportista] = useState([]);
  const [img, setImg] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const [cities, departments, athlete, habilidades, trayectorias] =
        await Promise.all([
          getCiudades(),
          getDepartamentos(),
          GetDeportistaById(id),
          GetHabilidadDeportista(id),
          GetTrayectoriaDeportista(id),
        ]);

      if (cities.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
        setCities(cities.data.responseMessage);
      }
      if (
        departments.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST
      ) {
        setDepartments(departments.data.responseMessage);
      }
      if (athlete.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
        const img =
          athlete.data.responseMessage.usuario.foto_usuario_base_64 != null
            ? "data:image/png;base64," +
              athlete.data.responseMessage.usuario.foto_usuario_base_64
            : baseProfile;
        setImg(img);
        setAthleteInfo(athlete.data.responseMessage);
      }
      if (
        habilidades.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST
      ) {
        setHabilidadesDeportista(habilidades.data.responseMessage);
      }
      if (
        trayectorias.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST
      ) {
        setTrayectoriasDeportista(trayectorias.data.responseMessage);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <div className="athleteDetail">
        {athleteInfo === null ? (
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              height: "30vh",
            }}
          >
            <Spinner style={{ width: "10vh", height: "10vh" }} />
          </div>
        ) : (
          <Row className="athleteDetail__mainInfoRow">
            <Col xs={12}>
              <Row
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  minWidth: "20%",
                }}
              >
                <Col xs={4} style={{ minHeight: "10%", marginTop: "10px" }}>
                  <SendEmailModal id_usuario={athleteInfo.id_usuario} />
                </Col>
              </Row>
            </Col>

            <Col xs={12} className="athleteDetail__mainInfoRow__mainInfoCol">
              <Row className="athleteDetail__mainInfoRow__mainInfoCol__imgRow">
                {img ? (
                  <img
                    src={img}
                    className="athleteDetail__mainInfoRow__mainInfoCol__imgRow__img"
                  ></img>
                ) : (
                  <Spinner />
                )}{" "}
              </Row>
              <Row className="athleteDetail__mainInfoRow__mainInfoCol__titleRow">
                <h1 className="athleteDetail__mainInfoRow__mainInfoCol__titleRow__title">
                  {athleteInfo.usuario.nombre_usuario
                    .split(" ")
                    .map(function (nombre) {
                      return nombre.charAt(0).toUpperCase() + nombre.slice(1);
                    })
                    .join(" ")}
                </h1>
              </Row>
              <Row className="athleteDetail__mainInfoRow__mainInfoCol__videoRow">
                {/* <Row>
                  <h2 style={{ textAlign: "start" }}>Video de presentación</h2>
                </Row> */}
                <iframe
                  className="athleteDetail__mainInfoRow__mainInfoCol__videoRow__video"
                  src={`https://www.youtube.com/embed/${
                    athleteInfo.video_deportista.includes("youtu.be")
                      ? athleteInfo.video_deportista.split("youtu.be/")[1]
                      : athleteInfo.video_deportista.split("v=")[1]
                  }`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={"Video " + athleteInfo.usuario?.nombre_usuario}
                />
                {/* https://www.youtube.com/watch?v=IKcoj88Eycc */}
              </Row>
              <Row className="athleteDetail__mainInfoRow__mainInfoCol__basicInfoRow">
                <Row>
                  <h2 style={{ textAlign: "start" }}>Información básica</h2>
                </Row>
                <Row>
                  <Col xs={12} md={12}>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId="formBasicEmail"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className="display__small">
                        Nombre Completo
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          disabled
                          maxLength="100"
                          value={athleteInfo.usuario.nombre_usuario}
                          className="edit__input  display__small"
                          placeholder="Nombre completo deportista"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId="name"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className=" display__small">
                        Género
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          disabled
                          value={
                            athleteInfo.usuario.genero_usuario == 1
                              ? "Masculino"
                              : athleteInfo.usuario.genero_usuario == 2
                              ? "Femenino"
                              : "Otro"
                          }
                          maxLength="100"
                          className="display__small"
                          placeholder="Correo Deportista"
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
                        Documento
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          disabled
                          value={
                            CODES.TIPO_DOCUMENTO_CODES.find(
                              (a) =>
                                a.value ===
                                athleteInfo.usuario.tipo_documento_usuario
                            )?.label +
                            "\t" +
                            athleteInfo.usuario.numero_documento_usuario
                          }
                          maxLength="100"
                          className="display__small"
                          placeholder="Correo Deportista"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group
                      className="mb-4 mt-3"
                      controlId="birthDate"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className=" display__small">
                        Dirección
                      </Form.Label>
                      <Form.Control
                        className=" display__small"
                        placeholder="Dirección"
                        maxLength="150"
                        disabled
                        value={athleteInfo.usuario.direccion_usuario}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group
                      className="mb-4 mt-3"
                      controlId="phone"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className="display__small">
                        Celular
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className=" display__small">
                          <img
                            src={ColombianFlag}
                            alt="Colombian Flag"
                            width="15"
                            height="100%"
                            style={{ marginRight: "10px" }}
                          />
                          <a> (+57)</a>
                        </InputGroup.Text>
                        <Form.Control
                          disabled
                          maxLength="100"
                          className="display__small"
                          placeholder="Celular"
                          value={athleteInfo.usuario.telefono_usuario}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={4}>
                    <Form.Group
                      className="mb-4 mt-3"
                      controlId="birthDate"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className="display__small">
                        Fecha de Nacimiento
                      </Form.Label>
                      <Form.Control
                        className=" display__small"
                        type="date"
                        name="duedate"
                        placeholder="DD/MM/AAAA"
                        disabled
                        value={athleteInfo.usuario.fecha_nacimiento_usuario}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={4}>
                    <Form.Group
                      className="mb-4 mt-3"
                      controlId="birthDate"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className=" display__small">
                        Departamento
                      </Form.Label>
                      <Form.Control
                        className=" display__small"
                        placeholder="Departamento"
                        maxLength="100"
                        disabled
                        value={
                          departments.find(
                            (a) =>
                              a.id_departamento ===
                              athleteInfo.usuario.id_departamento
                          ).nombre_departamento
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={4}>
                    <Form.Group
                      className="mb-4 mt-3"
                      controlId="birthDate"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className=" display__small">
                        Departamento
                      </Form.Label>
                      <Form.Control
                        className=" display__small"
                        placeholder="Municipio"
                        maxLength="100"
                        disabled
                        value={
                          cities.find(
                            (a) => a.id_ciudad === athleteInfo.usuario.id_ciudad
                          ).nombre_ciudad
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}></Col>
                  <Form.Group
                    className="mb-4 mt-3"
                    controlId="birthDate"
                    style={{ textAlign: "start" }}
                  >
                    <Form.Label className=" display__small">
                      Descripción
                    </Form.Label>
                    <Form.Control
                      className=" display__small"
                      placeholder="Descripción"
                      as="textarea"
                      rows={2}
                      maxLength="150"
                      disabled
                      value={athleteInfo.usuario.descripcion_usuario}
                    />
                  </Form.Group>
                </Row>
              </Row>
              <Row className="athleteDetail__mainInfoRow__mainInfoCol__sportInfoRow">
                <Row>
                  <h2 style={{ textAlign: "start" }}>Información Deportiva</h2>
                </Row>
                <Row>
                  <Col xs={4} md={3}>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId="formBasicEmail"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className="display__small">
                        Posición
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          disabled
                          maxLength="100"
                          value={
                            CODES.CODES_POSICIONES.find((item) => {
                              return (
                                item.value == athleteInfo.posicion_deportista
                              );
                            })?.label
                          }
                          className="edit__input  display__small"
                          placeholder="Posición deportista"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xs={4} md={3}>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId="formBasicEmail"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className="display__small">
                        Pierna Habil
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          disabled
                          maxLength="100"
                          value={
                            CODES.PIERNA_HABIL_CODES.find((item) => {
                              return (
                                item.value ==
                                athleteInfo.pierna_habil_deportista
                              );
                            })?.label
                          }
                          className="edit__input  display__small"
                          placeholder="Posición deportista"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xs={4} md={3}>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId="formBasicEmail"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className="display__small">Peso</Form.Label>
                      <InputGroup>
                        <Form.Control
                          disabled
                          maxLength="100"
                          value={athleteInfo.peso_deportista + " kg"}
                          className="edit__input  display__small"
                          placeholder="Peso deportista"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xs={4} md={3}>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId="formBasicEmail"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className="display__small">
                        Estatura
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          disabled
                          maxLength="100"
                          value={athleteInfo.altura_deportista + " cm"}
                          className="edit__input  display__small"
                          placeholder="Estatura deportista"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group
                      className="mb-4 mt-3"
                      controlId="birthDate"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className=" display__small">
                        Historia Clínica
                      </Form.Label>
                      <Form.Control
                        className=" display__small"
                        placeholder="Descripción"
                        as="textarea"
                        rows={2}
                        maxLength="150"
                        disabled
                        value={athleteInfo.historia_clinica_deportista}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
              <Row className="athleteDetail__mainInfoRow__mainInfoCol__habilidadesRow">
                <Row>
                  <h2 style={{ textAlign: "start" }}>Habilidades</h2>
                </Row>
                <Row>
                  {habilidadesDeportista.map((item, index) => {
                    return (
                      <Col xs={6} md={3} key={index}>
                        <Form.Group
                          className="mb-3 mt-3"
                          controlId="phone "
                          style={{ textAlign: "start" }}
                        >
                          <InputGroup>
                            <InputGroup.Text className=" display__small">
                              <SportsSoccerIcon
                                sx={{
                                  color:
                                    index % 3 === 0
                                      ? "#00459a"
                                      : index % 3 === 1
                                      ? "#00ccff"
                                      : "",
                                }}
                              />
                            </InputGroup.Text>
                            <Form.Control
                              disabled
                              maxLength="20"
                              className="display__small"
                              placeholder="Habilidad deportista"
                              value={
                                CODES.CODES_HABILIDADES.find(
                                  (habi) => habi.value == item.id_habilidad
                                )?.label
                              }
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    );
                  })}
                </Row>
              </Row>
              <Row className="athleteDetail__mainInfoRow__mainInfoCol__trayectoriaRow">
                <Row>
                  <h2 style={{ textAlign: "start" }}>Trayectoria</h2>
                </Row>
                <Row>
                  {trayectoriasDeportista.length === 0 ? (
                    <h2>Sin trayectorias registradas</h2>
                  ) : (
                    trayectoriasDeportista.map((item, index) => {
                      return (
                        <Col
                          xs={12}
                          md={6}
                          key={index}
                          style={{ marginBottom: "1vh", marginTop: "1vh" }}
                        >
                          <Card
                            variant="outlined"
                            sx={{ borderRadius: "10px" }}
                          >
                            <Typography
                              variant="h3"
                              component="div"
                              sx={{ fontWeight: "bold", marginTop: "1.5vh" }}
                              noWrap
                            >
                              {item.titulo_trayectoria}
                            </Typography>
                            <CardContent>
                              <Row>
                                <Form.Group
                                  className="mb-3 mt-3"
                                  controlId="phone "
                                  style={{ textAlign: "start" }}
                                >
                                  <InputGroup>
                                    <Form.Control
                                      style={{
                                        resize: "none",
                                        backgroundColor: "white",
                                        textAlign: "justify",
                                        border: "none",
                                      }}
                                      disabled
                                      maxLength="20"
                                      as="textarea"
                                      rows={3}
                                      className="display__small"
                                      placeholder="Descripcion"
                                      value={item.descripcion_trayectoria}
                                    />
                                  </InputGroup>
                                </Form.Group>
                              </Row>
                              <Row>
                                <Col xs={6}>
                                  <h3>{item.fecha_inicio}</h3>
                                </Col>
                                <Col xs={6}>
                                  <h3>{item.fecha_fin}</h3>
                                </Col>
                              </Row>
                            </CardContent>
                          </Card>
                        </Col>
                      );
                    })
                  )}
                </Row>
              </Row>
            </Col>
            <Col xs={12}>
              <Row
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: "20%",
                }}
              >
                <Col xs={12} style={{ minHeight: "35px", marginTop: "10px" }}>
                  <SendEmailModal id_usuario={athleteInfo.id_usuario} />
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

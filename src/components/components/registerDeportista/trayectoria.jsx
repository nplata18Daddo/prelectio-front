import { IconButton, InputLabel, TextField } from "@mui/material";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

export const Trayectoria = (props) => {
  const addFields = () => {
    let newfield = {
      titulo_trayectoria: "",
      descripcion_trayectoria: "",
      fecha_inicio: "",
      fecha_fin: "",
    };
    props.setTrayectoria([...props.trayectoria, newfield]);
  };

  const handleFormChange = (index, name, event) => {
    let data = [...props.trayectoria];
    data[index][name] = event;
    props.setTrayectoria(data);
    console.log(data);
  };

  const removeField = (index) => {
    let data = [...props.trayectoria];
    data.splice(index, 1);
    props.setTrayectoria(data);
  };

  console.log(props.trayectoria);
  return (
    <div className="trayectoria">
      <Container className="trayectoria__container">
        <Row>
          <h1>Trayectoria</h1>
        </Row>
        <Row className="trayectoria__container__cardRow">
          {props.trayectoria.map((item, index) => {
            return (
              <Card
                className="trayectoria__container__cardRow__card"
                key={index}
              >
                <Row style={{ height: "100%" }}>
                  <Col
                    md={11}
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Row style={{ width: "100%" }}>
                      <Col
                        xs={12}
                        md={4}
                        className="trayectoria__container__cardRow__card__col"
                      >
                        <InputLabel>
                          <h4 style={{ textAlign: "left", color: "white" }}>
                            Título
                          </h4>
                        </InputLabel>
                        <TextField
                          fullWidth
                          sx={{
                            border: "1px solid white",
                            borderRadius: "5px",
                            "& ::placeholder": {
                              color: "white",
                            },
                          }}
                          InputLabelProps={{
                            sx: {
                              color: "white",
                              borderColor: "white",
                            },
                          }}
                          inputProps={{
                            sx: {
                              color: "white",
                              borderColor: "white",
                            },
                          }}
                          onChange={(e, val) => {
                            if (e.target.value) {
                              handleFormChange(
                                index,
                                "titulo_trayectoria",
                                e.target.value
                              );
                            } else {
                              handleFormChange(index, "titulo_trayectoria", "");
                            }
                          }}
                          value={
                            item.titulo_trayectoria
                              ? item.titulo_trayectoria
                              : ""
                          }
                        ></TextField>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        className="trayectoria__container__cardRow__card__col"
                      >
                        <InputLabel>
                          <h4 style={{ textAlign: "left", color: "white" }}>
                            Fecha Inicio
                          </h4>
                        </InputLabel>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DesktopDatePicker
                            sx={{
                              border: "1px solid white",
                              borderRadius: "5px",
                              width: "100%",
                              "& .MuiSvgIcon-root": {
                                color: "white",
                              },
                              "& input": { color: "white" },
                            }}
                            inputlabelprops={{
                              sx: {
                                color: "white",
                                borderColor: "white",
                              },
                            }}
                            inputProps={{
                              sx: {
                                color: "white",
                                borderColor: "white",
                              },
                            }}
                            //inputRef={ref}
                            autoComplete="off"
                            fullWidth
                            format="DD/MM/YYYY"
                            label=""
                            value={
                              item.fecha_inicio ? moment(item.fecha_inicio) : ""
                            }
                            required
                            size="small"
                            shrink="true"
                            onChange={(val) => {
                              if (val) {
                                handleFormChange(
                                  index,
                                  "fecha_inicio",
                                  val.format("DD/MM/YYYY")
                                );
                              } else {
                                handleFormChange(index, "fecha_inicio", "");
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        className="trayectoria__container__cardRow__card__col"
                      >
                        <InputLabel>
                          <h4 style={{ textAlign: "left", color: "white" }}>
                            Fecha Fin
                          </h4>
                        </InputLabel>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DesktopDatePicker
                            fullWidth
                            sx={{
                              width: "100%",
                              border: "1px solid white",
                              borderRadius: "5px",
                              "& .MuiSvgIcon-root": {
                                color: "white",
                              },
                              "& input": { color: "white" },
                            }}
                            inputlabelprops={{
                              sx: {
                                color: "white",
                                borderColor: "white",
                              },
                            }}
                            inputProps={{
                              sx: {
                                color: "white",
                                borderColor: "white",
                              },
                            }}
                            //inputRef={ref}
                            autoComplete="off"
                            format="DD/MM/YYYY"
                            label=""
                            value={item.fecha_fin ? moment(item.fecha_fin) : ""}
                            required
                            size="small"
                            shrink="true"
                            onChange={(val) => {
                              if (val) {
                                handleFormChange(
                                  index,
                                  "fecha_fin",
                                  val.format("DD/MM/YYYY")
                                );
                              } else {
                                handleFormChange(index, "fecha_fin", "");
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Col>
                    </Row>
                    <Row style={{ width: "100%", marginTop: "0.5vh" }}>
                      <Col
                        xs={12}
                        md={12}
                        className="trayectoria__container__cardRow__card__col"
                      >
                        <InputLabel>
                          <h4 style={{ textAlign: "left", color: "white" }}>
                            Descripción
                          </h4>
                        </InputLabel>
                        <TextField
                          fullWidth
                          multiline
                          rows={1}
                          sx={{
                            border: "1px solid white",
                            borderRadius: "5px",
                            "& ::placeholder": {
                              color: "white",
                            },
                          }}
                          InputLabelProps={{
                            sx: {
                              color: "white",
                              borderColor: "white",
                            },
                          }}
                          inputProps={{
                            sx: {
                              color: "white",
                              borderColor: "white",
                            },
                          }}
                          onChange={(e, val) => {
                            if (e.target.value) {
                              handleFormChange(
                                index,
                                "descripcion",
                                e.target.value
                              );
                            } else {
                              handleFormChange(index, "descripcion", "");
                            }
                          }}
                          value={item.descripcion ? item.descripcion : ""}
                        ></TextField>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={1}
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      flexDirection: "column",
                    }}
                  >
                    {index > 0 && (
                      <Row>
                        <IconButton
                          style={{ padding: 0 }}
                          onClick={() => {
                            removeField(index);
                          }}
                        >
                          <DeleteIcon
                            fontSize="large"
                            sx={{
                              color: "#00ccff",
                            }}
                          />
                        </IconButton>
                      </Row>
                    )}
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Row>
        <Row className="trayectoria__container__bottomRow">
          <IconButton
            style={{ padding: 0, width: "fit-content" }}
            onClick={addFields}
          >
            <AddIcon
              fontSize="large"
              sx={{
                color: "#00ccff",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
          </IconButton>
        </Row>
      </Container>
    </div>
  );
};

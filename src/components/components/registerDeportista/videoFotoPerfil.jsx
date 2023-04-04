import { IconButton, InputLabel, Tooltip } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { InputField } from "./FormFields/inputField";
import { InputFieldMultiline } from "./FormFields/inputFieldMultiLine";
import InfoIcon from "@mui/icons-material/Info";

export const VideoYFotoPerfil = () => {
  return (
    <div className="videoFotoPerfil">
      <Container className="videoFotoPerfil__container">
        <Row className="videoFotoPerfil__container__row">
          <Col md={6} className="videoFotoPerfil__container__row__leftCol">
            <Row className="videoFotoPerfil__container__row__leftCol__topRow">
              <InputFieldMultiline
                rows={4}
                label="Descripción del jugador"
                name="descripcion"
              />
            </Row>
            <Row className="videoFotoPerfil__container__row__leftCol__bottomRow">
              <Row
                style={{
                  marginBottom: "2vh",
                }}
              >
                <Col xs={10}>
                  <InputLabel style={{ marginBottom: "0.5vh" }}>
                    <h5
                      style={{
                        textAlign: "left",
                        color: "white",
                        textOverflow: "clip",
                        whiteSpace: "initial",
                      }}
                    >
                      Ingresa el link con el video de tus mejores momentos
                    </h5>
                  </InputLabel>
                </Col>
                <Col
                  xs={2}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip
                    title={
                      <h5>
                        Se recomienda un video de youtube corto, de alta
                        calidad, donde demuestres tus mejores talentos y
                        habilidades.
                      </h5>
                    }
                    placement="top"
                  >
                    <IconButton style={{ padding: 0 }}>
                      <InfoIcon
                        fontSize="large"
                        sx={{
                          color: "#00ccff",
                          backgroundColor: "white",
                          borderRadius: "50%",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <InputField label="Link a video" name="link_video" />
              </Row>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

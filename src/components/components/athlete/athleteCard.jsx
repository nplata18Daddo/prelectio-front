import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { CODES } from "../../../consts/codes";

export const AthleteCard = (props) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image={props.item.usuario.foto_usuario}
        title="Profile Picture"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {props.item.usuario.nombre_usuario}
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          {props.item.usuario.genero_usuario == 1
            ? "Masculino"
            : props.item.usuario.genero_usuario == 2
            ? "Femenino"
            : "Otro"}
        </Typography>
        <Row>
          <Col xs={6} style={{ marginBottom: "7vh" }}>
            <Row>
              <Typography
                align={"left"}
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {
                  CODES.CODES_POSICIONES.find(
                    (item) => item.value == props.item.posicion_deportista
                  )?.label
                }
              </Typography>
            </Row>
            <Row>
              <Typography
                align={"left"}
                gutterBottom
                variant="h5"
                component="div"
              >
                {
                  CODES.PIERNA_HABIL_ADJETIVO_CODES.find(
                    (item) => item.value == props.item.pierna_habil_deportista
                  )?.label
                }
              </Typography>
            </Row>
            <Row>
              <Typography
                align={"left"}
                gutterBottom
                variant="h5"
                component="div"
              >
                {props.item.peso_deportista}
                <span> kg</span>
              </Typography>
            </Row>
            <Row>
              <Typography
                align={"left"}
                gutterBottom
                variant="h5"
                component="div"
              >
                {props.item.altura_deportista}
                <span> cm</span>
              </Typography>
            </Row>
          </Col>
          <Col
            xs={6}
            style={{
              display: "flex",
              alignContent: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "column",
            }}
          >
            <Row>
              <Typography
                align={"center"}
                variant="h3"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {moment(props.item.usuario.fecha_nacimiento_usuario).format(
                  "YYYY"
                )}
              </Typography>
            </Row>
            <Row>
              <Typography
                align={"center"}
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {moment(props.item.usuario.fecha_nacimiento_usuario).format(
                  "MMMM"
                )}
              </Typography>
            </Row>
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
};

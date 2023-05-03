import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { CODES } from "../../../consts/codes";
import baseProfile from "../../../assets/register/emptyProfile.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LazyLoad from "react-lazy-load";
export const AthleteCard = (props) => {
  const navigate = useNavigate();
  const img =
    props.item.usuario.foto_usuario_base_64 != null
      ? "data:image/png;base64," + props.item.usuario.foto_usuario_base_64
      : baseProfile;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
    >
      <Card
        onClick={() => {
          navigate("/recruiter/athlete/" + props.item.id_deportista);
        }}
        sx={{
          filter: "drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.37))",
          backgroundColor: "#282828",
          borderRadius: "15px",
          "&:hover": { cursor: "pointer" },
        }}
      >
        <CardMedia title="Foto de perfil" style={{ position: "relative" }}>
          {img ? (
            <LazyLoad key={props.item.id_deportista} offset={300}>
              <img
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
                src={img}
              ></img>
            </LazyLoad>
          ) : (
            <Spinner />
          )}{" "}
        </CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ fontWeight: "bold", color: "#FFFFFF" }}
            noWrap
          >
            {props.item.usuario.nombre_usuario
              .split(" ")
              .map(function (nombre) {
                return nombre.charAt(0).toUpperCase() + nombre.slice(1);
              })
              .join(" ")}
          </Typography>
          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ color: "#FFFFFF", fontSize: "12px" }}
          >
            {props.item.usuario.genero_usuario == 1
              ? "Masculino"
              : props.item.usuario.genero_usuario == 2
              ? "Femenino"
              : "Otro"}
          </Typography>
          <Row>
            <Col xs={6} style={{ marginBottom: "10vh" }}>
              <Row>
                <Typography
                  align={"left"}
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#FFFFFF" }}
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
                  sx={{ color: "#FFFFFF" }}
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
                  sx={{ color: "#FFFFFF" }}
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
                  sx={{ color: "#FFFFFF" }}
                  className="pruebaTypo"
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
                  variant="h2"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#FFFFFF" }}
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
                  sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                >
                  {moment(props.item.usuario.fecha_nacimiento_usuario)
                    .format("MMMM")
                    .charAt(0)
                    .toUpperCase() +
                    moment(props.item.usuario.fecha_nacimiento_usuario)
                      .format("MMMM")
                      .slice(1)}
                </Typography>
              </Row>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </motion.div>
  );
};

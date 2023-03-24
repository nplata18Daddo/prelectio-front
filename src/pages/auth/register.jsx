import React, { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import LogoPrelectio from "../../assets/logo_prelectio.png";
import Deportista from "../../assets/register/deportista.png";
import Reclutador from "../../assets/register/reclutador.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export const Register = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("*Este campo debe ser un email válido")
      .required("*Este campo es requerido"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleForgotPass = async (data) => {
    try {
      const obj = {
        email: data.email,
        password: data.password,
      };
    } catch (error) {
      console.log("==============Error login======================");
      console.log(error);
      console.log("====================================");
    }
  };
  const navigate = useNavigate();
  return (
    <motion.main
      className="main__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="register__background">
        <Row className=" p-4">
          <Col xs={12} style={{ textAlign: "left" }}>
            <img
              className="login__logo"
              src={LogoPrelectio}
              alt="logo prelectio"
            ></img>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5 ">
          <Col xs={10} md={6}>
            <Card body className="register__card p-4 ">
              <Row>
                <Col xs={12} className="px-4">
                  <h1
                    onClick={() => navigate(-1)}
                    className="text-white display__label weight__bold pb-1 d-flex align-items-center"
                    style={{ textAlign: "start", cursor: "pointer" }}
                  >
                    <i
                      class="bi bi-arrow-left-circle colors__lightBlue"
                      style={{ fontSize: "20px", marginRight: "15px" }}
                    ></i>
                    <span>Ir atrás</span>
                  </h1>
                </Col>

                <Col xs={12} lg={6} className="register__shadow">
                  <Link to="/registerRecruit" className="no__underline">
                    {" "}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      onHoverStart={(e) => {}}
                      onHoverEnd={(e) => {}}
                    >
                      <Row>
                        <Col xs={12}>
                          <img
                            className="login__logo mt-3"
                            src={Reclutador}
                            alt="Reclutador"
                          ></img>
                        </Col>
                        <Col xs={12}>
                          {" "}
                          <div class="register__line mt-5"></div>
                        </Col>
                        <Col xs={12}>
                          <p className="display__large weight__bold colors__lightBlue  mt-3">
                            Reclutador
                          </p>
                        </Col>
                        <Col xs={12}>
                          <p className="display__label text-white  mt-3">
                            Busca talento y contacta futuras estrellas.
                          </p>
                        </Col>
                      </Row>
                    </motion.div>
                  </Link>
                </Col>

                <Col xs={12} md={6}>
                  <Link to="/registerAthlete" className="no__underline">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      onHoverStart={(e) => {}}
                      onHoverEnd={(e) => {}}
                    >
                      <Row>
                        <Col xs={12}>
                          <img
                            className="login__logo  mt-3"
                            src={Deportista}
                            alt="Deportista"
                          ></img>
                        </Col>
                        <Col xs={12}>
                          <div class="register__line mt-5"></div>
                        </Col>
                        <Col xs={12}>
                          <p className="display__large weight__bold colors__lightBlue mt-3">
                            Deportista
                          </p>
                        </Col>
                        <Col xs={12}>
                          <p className="display__label text-white mt-3">
                            Crea tu perfil y maximiza tus oportunidades
                          </p>
                        </Col>
                      </Row>
                    </motion.div>
                  </Link>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </motion.main>
  );
};

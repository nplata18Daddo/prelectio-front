import React, { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import LogoPrelectio from "../../assets/logo_prelectio.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
export const ForgotPassword = () => {
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
    <Row className="forgotPass__background justify-content-center">
      <Col xs={10} md={6} className=" my-auto">
        <Card body className="forgotPass__card ">
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
            <Col xs={12} md={8} style={{ padding: "5rem" }}>
              <Row>
                <Col xs={12}>
                  <h1
                    className="text-white display__large weight__bold"
                    style={{ textAlign: "start" }}
                  >
                    Restablecer Contraseña
                  </h1>
                </Col>
                <Col xs={12}>
                  <Form onSubmit={handleSubmit(handleForgotPass)}>
                    <Form.Group
                      className="mb-5 mt-5"
                      controlId="formBasicEmail"
                      style={{ textAlign: "start" }}
                    >
                      <Form.Label className="text-white display__small mb-4">
                        Correo
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="login__input__icon display__small">
                          <i className="bi bi-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                          {...register("email")}
                          className="login__input  display__small"
                          placeholder="Tu correo"
                        />
                        {errors.email && (
                          <Form.Control.Feedback
                            className="d-block display__label mt-2"
                            type="invalid"
                          >
                            {errors.email.message}
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
                    </Form.Group>

                    <Button
                      disabled={!watch("email")}
                      variant="primary"
                      type="submit"
                      className="login__submit display__small weight__bold"
                    >
                      Continuar
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col
              xs={12}
              md={4}
              className="p-5 d-flex justify-content-center align-items-center"
            >
              <img
                className="login__logo"
                src={LogoPrelectio}
                alt="logo prelectio"
              ></img>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

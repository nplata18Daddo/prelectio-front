import React, { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import LogoPrelectio from "../../assets/logo_prelectio.png";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const schema = yup.object().shape({
    password: yup.string().required("*Este campo es obligatorio"),
    email: yup
      .string()
      .email("*Este campo debe ser un email válido")
      .required("*Este campo es requerido"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
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

  const handleShowPass = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };
  return (
    <div className="login__background">
      <Row className=" p-4">
        <Col xs={12} style={{ textAlign: "left" }}>
          <img
            className="login__logo"
            src={LogoPrelectio}
            alt="logo prelectio"
          ></img>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={10} md={4}>
          <Card body className="login__card p-5">
            <Row>
              <Col xs={12}>
                <h1 className="text-white">Bienvenido a Prelectio</h1>
              </Col>
              <Col xs={12}>
                <p className="text-white">Inicia sesión con tu cuenta</p>
              </Col>
              <Col xs={12}>
                <Form onSubmit={handleSubmit(handleLogin)}>
                  <Form.Group
                    className="mb-4 mt-4"
                    controlId="formBasicEmail"
                    style={{ textAlign: "start" }}
                  >
                    <Form.Label className="text-white">Correo</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="login__input__icon">
                        <i className="bi bi-envelope"></i>
                      </InputGroup.Text>
                      <Form.Control
                        className="login__input"
                        type="email"
                        placeholder="Tu correo"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group
                    className="mb-4 mt-4"
                    controlId="formBasicPassword"
                    style={{ textAlign: "start" }}
                  >
                    <Form.Label className="text-white">Contraseña</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="login__input__icon">
                        <i className="bi bi-lock"></i>
                      </InputGroup.Text>
                      <Form.Control
                        className="login__input__pass"
                        type={showPass ? "text" : "password"}
                        placeholder="Tu contraseña"
                      />
                      <InputGroup.Text className="login__input__icon__pass">
                        <i
                          onClick={handleShowPass}
                          class={showPass ? "bi bi-eye" : "bi bi-eye-slash"}
                        ></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group
                    className="mb-4 mt-4"
                    style={{ textAlign: "end" }}
                  >
                    <Form.Label className="colors__lightBlue">
                      ¿Olvidaste tu contraseña?
                    </Form.Label>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="login__submit"
                  >
                    Continuar
                  </Button>
                </Form>
              </Col>
              <Col xs={12} className="mt-4">
                <p className="text-white">
                  ¿No tienes una cuenta?{" "}
                  <span className="colors__lightBlue">Registrate ahora</span>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

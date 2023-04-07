import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import LogoPrelectio from "../../assets/logo_prelectio.png";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { CODES } from "../../consts/codes";
import { LoginService } from "../../services/authServices";
import bcrypt from "bcryptjs";
export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [systemError, setSystemError] = useState(false);
  const [unathorized, setUnauthorized] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const schema = yup.object().shape({
    password: yup.string().required("*Este campo es requerido"),
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

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.rol_usuario === CODES.COD_ROLES_ADMIN) {
        navigate("/admin/home", { replace: true });
      } else if (user.rol_usuario === CODES.COD_ROLES_RECRUITER) {
        navigate("/recruiter/home", { replace: true });
      } else {
        navigate("/athlete/home", { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = async (data) => {
    try {
      try {
        setLoading(true);
        setInvalidPassword(false);
        setUnauthorized(false);
        setSystemError(false);
        setNoUser(false);
        const obj = {
          email_usuario: data.email,
          password_usuario: data.password,
        };

        const service = await LoginService(obj);

        if (service.status === 200) {
          if (
            service.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST
          ) {
            const token = service.data.responseMessage.accessToken;
            localStorage.setItem("access_token", token);
            const user = service.data.responseMessage.user;
            localStorage.setItem("user", JSON.stringify(user));
            if (user.changePass) {
              navigate("/user/changePassword", { replace: true });
            } else {
              if (user.rol_usuario === CODES.COD_ROLES_ADMIN) {
                navigate("/admin/home", { replace: true });
              } else if (user.rol_usuario === CODES.COD_ROLES_RECRUITER) {
                navigate("/recruiter/home", { replace: true });
              } else {
                navigate("/athlete/home", { replace: true });
              }
            }
          } else if (service.data.responseCode === CODES.COD_RESPONSE_ERROR) {
            setInvalidPassword(true);
          } else if (
            service.data.responseCode === CODES.COD_RESPONSE_ERROR_UNAUTHORIZED
          ) {
            setUnauthorized(true);
          } else {
            setNoUser(true);
          }
        } else {
          setSystemError(true);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setSystemError(true);
        console.log(error);
      }
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
      <Row className="justify-content-center pb-3">
        <Col xs={10} md={6} lg={4}>
          <Card body className="login__card ">
            <Row>
              <Col xs={12}>
                <h1 className="text-white display__large weight__bold">
                  Bienvenido a Prelectio
                </h1>
              </Col>
              <Col xs={12}>
                <p className="text-white display__medium">
                  Inicia sesión con tu cuenta
                </p>
              </Col>
              <Col xs={12}>
                <Form onSubmit={handleSubmit(handleLogin)}>
                  <Form.Group
                    className="mb-5 mt-5"
                    controlId="formBasicEmail"
                    style={{ textAlign: "start" }}
                  >
                    <Form.Label className="text-white display__small">
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

                  <Form.Group
                    className="mb-5 mt-5"
                    controlId="formBasicPassword"
                    style={{ textAlign: "start" }}
                  >
                    <Form.Label className="text-white display__small">
                      Contraseña
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="login__input__icon display__small">
                        <i className="bi bi-lock"></i>
                      </InputGroup.Text>
                      <Form.Control
                        {...register("password")}
                        className="login__input__pass  display__small"
                        type={showPass ? "text" : "password"}
                        placeholder="Tu contraseña"
                      />
                      <InputGroup.Text className="login__input__icon__pass display__small">
                        <i
                          onClick={handleShowPass}
                          class={showPass ? "bi bi-eye" : "bi bi-eye-slash"}
                        ></i>
                      </InputGroup.Text>
                      {errors.password && (
                        <Form.Control.Feedback
                          className="d-block display__label mt-2"
                          type="invalid"
                        >
                          {errors.password.message}
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>
                  </Form.Group>

                  <Form.Group
                    className="mb-5 mt-5"
                    style={{ textAlign: "end" }}
                  >
                    <Link to="/forgotPassword">
                      <Form.Label
                        className="colors__lightBlue display__label"
                        style={{ cursor: "pointer" }}
                      >
                        ¿Olvidaste tu contraseña?
                      </Form.Label>
                    </Link>
                  </Form.Group>

                  <Button
                    disabled={!watch("email") || !watch("password")}
                    variant="primary"
                    type="submit"
                    className="login__submit display__small weight__bold"
                  >
                    {loading ? <Spinner animation="border" /> : "Continuar"}
                  </Button>
                </Form>
              </Col>
              <Col xs={12} className="mt-5">
                <p className="text-white display__small">
                  ¿No tienes una cuenta?{" "}
                  <Link to="/register">
                    <span className="colors__lightBlue">Registrate ahora</span>
                  </Link>
                </p>
              </Col>
              <Col xs={12}>
                {invalidPassword && (
                  <p className="text-danger pt-4 display__label">
                    Crendenciales Incorrectas.
                  </p>
                )}
                {systemError && (
                  <p className="text-danger pt-4 display__label">
                    Error en el sistema.
                  </p>
                )}
                {noUser && (
                  <p className="text-danger pt-4 display__label">
                    El usuario no se encuentra registrado.
                  </p>
                )}
                {unathorized && (
                  <p className="text-danger pt-4 display__label">
                    El usuario no se encuentra habilitado para ingresar a la
                    plataforma.
                  </p>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

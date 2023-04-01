import React, { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import LogoPrelectio from "../../assets/logo_prelectio.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { REGEXP } from "../../consts/regex";
import { ChangePasswordService } from "../../services/authServices";
import { CODES } from "../../consts/codes";
import { ModalInfo } from "../../components/components/modals/ModalInfo";
export const ChangePass = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirmation, setShowPassConfirmation] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const handleShowPass = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };
  const handleShowPassConfirmation = (event) => {
    event.preventDefault();
    setShowPassConfirmation(!showPassConfirmation);
  };
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Este campo es requerido")
      .min(8, "Mínimo 8 caracteres")
      .max(15, "Máximo 15 caracteres")
      .test("upperCase", "Al menos una letra mayúscula", function (value) {
        if (!!value) {
          const schema = yup.string().matches(/^(?=.*?[A-Z])/);
          return schema.isValidSync(value);
        }
        return true;
      })
      .test("lowerCase", "Al menos una letra minúscula", function (value) {
        if (!!value) {
          const schema = yup.string().matches(/(?=.*?[a-z])/);
          return schema.isValidSync(value);
        }
        return true;
      })
      .test("number", "Al menos un número", function (value) {
        if (!!value) {
          const schema = yup.string().matches(/(?=.*?[0-9])/);
          return schema.isValidSync(value);
        }
        return true;
      })
      .test("specialChar", "Al menos un caracter especial", function (value) {
        if (!!value) {
          const schema = yup.string().matches(/(?=.*?[#?!@$%^&*-])/);
          return schema.isValidSync(value);
        }
        return true;
      }),
    passwordConfirmation: yup
      .string()
      .required("Este campo es requerido")
      .oneOf(
        [yup.ref("password"), null],
        "La nueva contraseña y su confirmación no coinciden"
      ),
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleForgotPass = async (data) => {
    const activeUser = JSON.parse(localStorage.getItem("user"));
    try {
      const obj = {
        idUser: activeUser.id_usuario,
        newPassword: data.passwordConfirmation,
      };
      const service = await ChangePasswordService(obj);

      if (service.status === 200) {
        setResponseMessage(service);
        setOpenModalInfo(true);
        reset();
        if (service.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          const token = service.data.responseLoad.accessToken;
          localStorage.setItem("access_token", token);
          const user = service.data.responseLoad.user;
          localStorage.setItem("user", JSON.stringify(user));
          if (user.rol_usuario === CODES.COD_ROLES_ADMIN) {
            navigate("/admin/home", { replace: true });
          } else if (user.rol_usuario === CODES.COD_ROLES_RECRUITER) {
            navigate("/recruiter/home", { replace: true });
          } else {
            navigate("/athlete/home", { replace: true });
          }
        }
      }
    } catch (error) {
      console.log("==============Error login======================");
      console.log(error);
      console.log("====================================");
    }
  };

  function getPassValidation() {
    return (
      watch("password")?.length >= 8 &&
      watch("password")?.length <= 15 &&
      REGEXP.ONE_LOWER_LETTER.test(watch("password")) &&
      REGEXP.ONE_UPPER_LETTER.test(watch("password")) &&
      REGEXP.ONE_NUMBER.test(watch("password")) &&
      REGEXP.ONE_SPECIAL_CHAR.test(watch("password"))
    );
  }

  const navigate = useNavigate();
  return (
    <motion.main
      className="main__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Row className="forgotPass__background justify-content-center">
        <ModalInfo
          data={responseMessage}
          open={openModalInfo}
          setOpen={setOpenModalInfo}
        />
        <Col xs={10} md={7} className=" my-auto">
          <Card body className="forgotPass__card ">
            <Row>
              <Col xs={12} className="px-4">
                <h1
                  onClick={() => navigate(-1)}
                  className="text-white display__label weight__bold pb-1 d-flex align-items-center"
                  style={{ textAlign: "start", cursor: "pointer" }}
                >
                  <i
                    className="bi bi-arrow-left-circle colors__lightBlue"
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
                              className={
                                showPass ? "bi bi-eye" : "bi bi-eye-slash"
                              }
                            ></i>
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group
                        className="mb-5 mt-5"
                        controlId="formBasicConfirmationPassword"
                        style={{ textAlign: "start" }}
                      >
                        <Form.Label className="text-white display__small">
                          Confirmar Contraseña
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text
                            disabled
                            className="login__input__icon display__small"
                          >
                            <i className="bi bi-lock"></i>
                          </InputGroup.Text>
                          <Form.Control
                            {...register("passwordConfirmation")}
                            className="login__input__pass  display__small"
                            type={showPassConfirmation ? "text" : "password"}
                            placeholder="Confirmación contraseña"
                            disabled={!getPassValidation()}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                          />
                          <InputGroup.Text className="login__input__icon__pass display__small">
                            <i
                              onClick={handleShowPassConfirmation}
                              className={
                                showPassConfirmation
                                  ? "bi bi-eye"
                                  : "bi bi-eye-slash"
                              }
                            ></i>
                          </InputGroup.Text>
                          {errors.passwordConfirmation && (
                            <Form.Control.Feedback
                              className="d-block display__label mt-2"
                              type="invalid"
                            >
                              {errors.passwordConfirmation.message}
                            </Form.Control.Feedback>
                          )}
                        </InputGroup>
                      </Form.Group>

                      <Button
                        disabled={!getPassValidation()}
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
              <Col xs={12} md={4} className="p-4 d-flex ">
                <Row>
                  <Col
                    className="text-white display__regular weight__bold"
                    xs={12}
                  >
                    <p>Para crear tu contraseña ten en cuenta:</p>
                  </Col>
                  <Col className="text-white display__label" xs={12}>
                    <p style={{ textAlign: "left" }}>
                      {watch("password")?.length >= 8 &&
                      watch("password")?.length <= 15 ? (
                        <i className="bi bi-check-lg"></i>
                      ) : (
                        <i className="bi bi-x-lg"></i>
                      )}{" "}
                      Minimo 8 caracteres y máximo 15.
                    </p>
                  </Col>
                  <Col className="text-white display__label" xs={12}>
                    <p style={{ textAlign: "left" }}>
                      {" "}
                      {REGEXP.ONE_LOWER_LETTER.test(watch("password")) ? (
                        <i className="bi bi-check-lg"></i>
                      ) : (
                        <i className="bi bi-x-lg"></i>
                      )}{" "}
                      Al menos una minúscula.
                    </p>
                  </Col>
                  <Col className="text-white display__label" xs={12}>
                    <p style={{ textAlign: "left" }}>
                      {REGEXP.ONE_UPPER_LETTER.test(watch("password")) ? (
                        <i className="bi bi-check-lg"></i>
                      ) : (
                        <i className="bi bi-x-lg"></i>
                      )}{" "}
                      Al menos una mayúscula..
                    </p>
                  </Col>
                  <Col className="text-white display__label" xs={12}>
                    <p style={{ textAlign: "left" }}>
                      {" "}
                      {REGEXP.ONE_NUMBER.test(watch("password")) ? (
                        <i className="bi bi-check-lg"></i>
                      ) : (
                        <i className="bi bi-x-lg"></i>
                      )}{" "}
                      Al menos un número.
                    </p>
                  </Col>
                  <Col className="text-white display__label" xs={12}>
                    <p style={{ textAlign: "left" }}>
                      {REGEXP.ONE_SPECIAL_CHAR.test(watch("password")) ? (
                        <i className="bi bi-check-lg"></i>
                      ) : (
                        <i className="bi bi-x-lg"></i>
                      )}{" "}
                      Al menos un carácter especial.
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </motion.main>
  );
};

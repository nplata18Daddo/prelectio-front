import React, { useState } from "react";
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
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ForgotPasswordService } from "../../services/authServices";
import { CODES } from "../../consts/codes";
import { ModalInfo } from "../../components/components/modals/ModalInfo";
export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleForgotPass = async (data) => {
    try {
      setLoading(true);

      const obj = {
        email_usuario: data.email,
      };
      const service = await ForgotPasswordService(obj);

      setResponseMessage(service);
      setOpenModalInfo(true);
      reset();
      if (service.status === 200) {
        if (service.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          // const token = service.data.responseMessage.accessToken;
          // localStorage.setItem("access_token", token);
          // const user = service.data.responseMessage.user;
          // localStorage.setItem("user", JSON.stringify(user));
          // navigate("/dashboard");
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
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
      <Row className="forgotPass__background justify-content-center">
        <ModalInfo
          data={responseMessage}
          open={openModalInfo}
          setOpen={setOpenModalInfo}
        />
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
                        {loading ? <Spinner animation="border" /> : "Continuar"}
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
    </motion.main>
  );
};

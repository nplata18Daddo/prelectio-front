import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import LogoPrelectio from "../../assets/logo_prelectio.png";
import ColombianFlag from "../../assets/register/colombia.png";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getCiudades, getDepartamentos } from "../../services/locationServices";
import { CODES } from "../../consts/codes";
export const RecruiterRegister = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      department: "",
    },
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data) => {
    console.log(data);
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

  useEffect(() => {
    const fetchData = async () => {
      const [cities, departments] = await Promise.all([
        getCiudades(),
        getDepartamentos(),
      ]);

      if (cities.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
        setCities(cities.data.responseMessage);
      }
      if (
        departments.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST
      ) {
        setDepartments(departments.data.responseMessage);
      }
    };

    fetchData();
  }, []);

  const getDisabled = () => {
    let disabled =
      !watch("email") !== "" &&
      !watch("name") !== "" &&
      !watch("documentType") !== "" &&
      !watch("documentNumber") !== "" &&
      !watch("represents") !== "" &&
      !(date !== "") &&
      !watch("phone") !== "" &&
      !watch("department") !== "" &&
      !watch("city") !== "" &&
      !watch("description") !== "";

    return disabled;
  };

  const filterCities = (event) => {
    let selectedDepartment = event.target.value;
    setValue("department", selectedDepartment);

    let filteredCities = cities.filter(
      (item) => String(item.id_departamento) === String(selectedDepartment)
    );

    setSelectedCities(filteredCities);
  };
  return (
    <motion.main
      className="main__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Row className="register__backgroundRecruiter justify-content-center">
        <Col xs={10} md={8}>
          <Card body className="register__card mt-5 mb-3">
            <Row>
              <Col xs={12} lg={6}>
                <Row className="register__logo__row">
                  <img
                    className="register__logo"
                    src={LogoPrelectio}
                    alt="logo prelectio"
                  ></img>
                </Row>
              </Col>
              <Col xs={12} lg={6}>
                <Row className="p-4">
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
                  <Col xs={12}>
                    <Form onSubmit={handleSubmit(handleRegister)}>
                      <Form.Group
                        className="mb-3 mt-3"
                        controlId="formBasicEmail"
                        style={{ textAlign: "start" }}
                      >
                        <Form.Label className="text-white display__small">
                          Nombre Completo*
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            maxLength="100"
                            {...register("name")}
                            className="register__input  display__small"
                            placeholder="Tu nombre completo"
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group
                        className="mb-3 mt-3"
                        controlId="name"
                        style={{ textAlign: "start" }}
                      >
                        <Form.Label className="text-white display__small">
                          Correo*
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            maxLength="100"
                            {...register("email")}
                            className="register__input  display__small"
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
                      <Row style={{ alignItems: "baseline" }}>
                        <Form.Group
                          className="mb-3 col-xs-12 col-lg-4"
                          controlId="documentType"
                          style={{ textAlign: "start" }}
                        >
                          <Form.Label className="text-white display__small">
                            Tipo documento*
                          </Form.Label>
                          <Form.Select
                            {...register("documentType")}
                            className="register__select display__small"
                            aria-label="Default select example"
                          >
                            <option value="" disabled selected>
                              Tipo Documento
                            </option>
                            <option value="1">CC</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          className="mb-3 mt-3 col-xs-12 col-lg-8"
                          controlId="documentNumber"
                          style={{ textAlign: "start" }}
                        >
                          <Form.Label className="text-white display__small">
                            Numero documento*
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              maxLength="25"
                              {...register("documentNumber")}
                              className="register__input  display__small"
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group
                          className="mb-3 mt-3 "
                          controlId="represents"
                          style={{ textAlign: "start" }}
                        >
                          <Form.Label className="text-white display__small">
                            A quien representas*
                          </Form.Label>
                          <Form.Select
                            {...register("represents")}
                            className="register__select display__small"
                            aria-label="Default select example"
                          >
                            <option value="" disabled selected>
                              A quien representas
                            </option>
                            <option value="1">Club de fútbol</option>
                            <option value="2">Agencia</option>
                            <option value="3">Medios</option>
                            <option value="4">Federación</option>
                            <option value="5">Fanático de Fútbol</option>
                            <option value="6">Otros</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          className="mb-4 mt-2 col-xs-12 col-lg-6"
                          controlId="birthDate"
                          style={{ textAlign: "start" }}
                        >
                          <Form.Label className="text-white display__small">
                            Fecha de{" "}
                            {watch("represents") === "5"
                              ? "Nacimiento"
                              : "Fundación"}
                            *
                          </Form.Label>
                          <Form.Control
                            {...register("birthDate")}
                            className="register__date__input display__small"
                            type="date"
                            name="duedate"
                            placeholder="DD/MM/AAAA"
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-4 col-xs-12 col-lg-6"
                          controlId="phone "
                          style={{ textAlign: "start" }}
                        >
                          <Form.Label className="text-white display__small">
                            Celular
                          </Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="login__input__icon display__small">
                              <img
                                src={ColombianFlag}
                                alt="Colombian Flag"
                                width="15"
                                height="15"
                                style={{ marginRight: "10px" }}
                              />
                              <a> (+57)</a>
                            </InputGroup.Text>
                            <Form.Control
                              maxLength="20"
                              className="login__input  display__small"
                              placeholder="Tu celular"
                              {...register("phone")}
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group
                          className="mb-3 mt-1 col-xs-12 col-lg-6"
                          controlId="department"
                          style={{ textAlign: "start" }}
                        >
                          <Form.Label className="text-white display__small">
                            Departamento*
                          </Form.Label>
                          <Form.Select
                            className="register__select display__small"
                            aria-label="Default select example"
                            {...register("department")}
                            onChange={filterCities}
                          >
                            <option value="" disabled selected>
                              Departamento
                            </option>
                            {departments.map((item) => {
                              return (
                                <option
                                  value={item.id_departamento}
                                  key={item.id_departamento}
                                >
                                  {item.nombre_departamento}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          className="mb-3 mt-1 col-xs-12 col-lg-6"
                          controlId="city"
                          style={{ textAlign: "start" }}
                        >
                          <Form.Label className="text-white display__small">
                            Municipio*
                          </Form.Label>
                          <Form.Select
                            disabled={watch("department") === ""}
                            className="register__select display__small"
                            aria-label="Default select example"
                            {...register("city")}
                          >
                            <option value="" disabled selected>
                              Municipio
                            </option>
                            {selectedCities.map((item) => {
                              return (
                                <option
                                  value={item.id_ciudad}
                                  key={item.id_ciudad}
                                >
                                  {item.nombre_ciudad}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          className="mb-5 "
                          controlId="formBasicEmail"
                          style={{ textAlign: "start" }}
                        >
                          <Form.Label className="text-white display__small">
                            Descripción
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              maxLength="150"
                              as="textarea"
                              rows={2}
                              {...register("description")}
                              className="register__input  display__small"
                              placeholder="Descripción corta de tu puesto"
                            />
                          </InputGroup>
                        </Form.Group>
                      </Row>

                      <Button
                        disabled={getDisabled()}
                        variant="primary"
                        type="submit"
                        className="login__submit display__small weight__bold"
                      >
                        Solicitar
                      </Button>
                      <p className="display__label text-white mt-4">
                        El producto esta solo disponible para
                        profesionales(sujetos a aprobación)
                      </p>
                    </Form>
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

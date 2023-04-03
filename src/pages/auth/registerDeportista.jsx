import React, { useEffect, useState } from "react";
import prelectioLogo from "../../assets/logo_prelectio.png";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Step, StepLabel, Stepper } from "@mui/material";
import { getCiudades, getDepartamentos } from "../../services/locationServices";
import {
  InformacionDeportiva,
  InformacionPersonal,
  VideoYFotoPerfil,
} from "../../components/components";
import { CODES } from "../../consts/codes";

export const RegisterDeportista = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDpto, setSelectedDpto] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    if (selectedDpto != "") {
      let filtradas = cities
        .filter((item) => item.id_departamento === selectedDpto)
        .map((item, index) => {
          return { value: item.id_ciudad, label: item.nombre_ciudad };
        });
      setSelectedCities(filtradas);
    }
  }, [selectedDpto]);

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
        let dptos = departments.data.responseMessage.map((item) => {
          return {
            label: item.nombre_departamento,
            value: item.id_departamento,
          };
        });
        setDepartments(dptos);
      }
    };

    fetchData();
  }, []);

  const steps = [
    "Informacion Personal",
    "Informacion Deportiva",
    "Video y Foto de Perfil",
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <InformacionPersonal
            departamentos={departments}
            cities={cities}
            setSelectedDpto={setSelectedDpto}
            selectedCities={selectedCities}
          />
        );
      case 1:
        return <InformacionDeportiva />;
      case 2:
        return <VideoYFotoPerfil />;
      case 3:
      default:
        return "Unknown step";
    }
  }

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    alert(JSON.stringify(data));
    handleNext();
  };

  const defaultValues = {
    nombreCompleto: "",
    email: "",
    tipoDoc: "",
    numDoc: "",
    fechaNacimiento: "",
    celular: "",
    departamento: "",
    municipio: "",
    genero: "",
    estatura: "",
    peso: "",
    pierna_habil: "",
    habilidades: [],
    posicion: "",
    descripcion: "",
    link_video: "",
  };

  const validationSchema = [
    //validation for step1
    yup.object({
      nombreCompleto: yup.string().required(),
      email: yup.string().email().required(),
      tipoDoc: yup.number().required(),
      numDoc: yup.string().required(),
      fechaNacimiento: yup.string().required(),
      celular: yup.number().required(),
      departamento: yup.number().required(),
      municipio: yup.number().required(),
      genero: yup.number().required(),
    }),
    //validation for step2
    yup.object({
      estatura: yup.number().required(),
      peso: yup.number().required(),
      pierna_habil: yup.string().required(),
      posicion: yup.number().required(),
      habilidades: yup.array().max(5).min(1),
    }),
    //validation for step3
    yup.object({
      descripcion: yup.string().required(),
      link_video: yup.string().required(),
    }),
  ];

  const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const { handleSubmit, reset, trigger } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  return (
    <div className="registerDeportista">
      <img
        src={prelectioLogo}
        alt={"logo"}
        className="registerDeportista__logo"
      />
      <Container className="registerDeportista__container">
        <Row className="registerDeportista__container__topRow">
          <Col
            xs={2}
            className="registerDeportista__container__topRow__buttonCol"
          >
            <Button
              onClick={() => {
                console.log("PANTALLA ANTERIOR");
              }}
              className="registerDeportista__container__topRow__buttonCol__button"
            >
              ←
            </Button>
            <div className="registerDeportista__container__topRow__buttonCol__div">
              <p>Ir atrás</p>
            </div>
          </Col>
        </Row>
        <Stepper
          activeStep={activeStep}
          className="registerDeportista__container__stepper"
        >
          {steps.map((label, index) => {
            return (
              <Step
                key={label}
                className="registerDeportista__container__stepper__step"
              >
                <StepLabel className="registerDeportista__container__stepper__step__label">
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div style={{ minHeight: "50%" }}>
          {activeStep === steps.length ? (
            <>
              <Button onClick={handleReset} className={""}>
                Reset
              </Button>
            </>
          ) : (
            <FormProvider {...methods}>
              <form>
                <div className={"registerDeportista__container__content"}>
                  {getStepContent(activeStep)}
                </div>
                <div
                  style={{
                    paddingTop: "5vh",
                  }}
                >
                  <Row>
                    <Col
                      xs={6}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignContent: "flex-start",
                      }}
                    >
                      {activeStep !== 0 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleBack}
                          className={
                            "registerDeportista__container__nextButton"
                          }
                        >
                          Anterior
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col
                      xs={6}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                      }}
                    >
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleSubmit(onSubmit);
                          }}
                          className={
                            "registerDeportista__container__nextButton"
                          }
                        >
                          Finalizar
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={
                            "registerDeportista__container__nextButton"
                          }
                        >
                          Siguiente
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </form>
            </FormProvider>
          )}
        </div>
      </Container>
    </div>
  );
};

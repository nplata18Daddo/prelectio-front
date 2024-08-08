import React, { useEffect, useState } from "react";
import prelectioLogo from "../../assets/logo_prelectio.png";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Step, StepLabel, Stepper } from "@mui/material";
import { getCiudades, getDepartamentos } from "../../services/locationServices";
import {
  InformacionDeportiva,
  InformacionPersonal,
  VideoYFotoPerfil,
} from "../../components/components";
import { CODES } from "../../consts/codes";
import { useNavigate } from "react-router-dom";
import { RegisterDeportistaService } from "../../services/deportistaServices";
import { ModalInfo } from "../../components/components/modals/ModalInfo";
import { ModalAction } from "../../components/components/modals/ModalAction";
import { PasswordDeportista } from "../../components/components/registerDeportista/passwordDeportista";
import { Trayectoria } from "../../components/components/registerDeportista/trayectoria";
import { InformacionAcudiente } from "../../components/components/registerDeportista/informacionAcudiente";

export const RegisterDeportista = () => {
  const MAX_FILE_SIZE = 5242880; //100KB
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDpto, setSelectedDpto] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const [openModalAction, setOpenModalAction] = useState(false);
  const [allowImage, setAllowImage] = useState(true);
  const [underaged, setUnderaged] = useState(false);
  const [trayectoria, setTrayectoria] = useState([
    {
      titulo_trayectoria: "",
      descripcion_trayectoria: "",
      fecha_inicio: "",
      fecha_fin: "",
    },
  ]);

  useEffect(() => {
    if (selectedDpto !== "") {
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

  const steps = underaged
    ? [
        "Informacion Personal",
        "Informacion Deportiva",
        "Video y Foto de Perfil",
        "Trayectoria",
        "Contraseña",
        "Información Acudiente",
      ]
    : [
        "Informacion Personal",
        "Informacion Deportiva",
        "Video y Foto de Perfil",
        "Trayectoria",
        "Contraseña",
      ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setAllowImage(true);
    if (file.size > MAX_FILE_SIZE) {
      setAllowImage(false);
    } else {
      setAllowImage(true);
      setImageFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUrl = reader.result;
          setImagePreviewUrl(imageDataUrl);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  function getStepContent(step) {
    if (!underaged) {
      switch (step) {
        case 0:
          return (
            <InformacionPersonal
              departamentos={departments}
              cities={cities}
              setSelectedDpto={setSelectedDpto}
              selectedCities={selectedCities}
              setUnderaged={setUnderaged}
            />
          );
        case 1:
          return <InformacionDeportiva />;
        case 2:
          return (
            <VideoYFotoPerfil
              allowImage={allowImage}
              handleImageChange={handleImageChange}
              imagePreviewUrl={imagePreviewUrl}
            />
          );
        case 3:
          return (
            <Trayectoria
              trayectoria={trayectoria}
              setTrayectoria={setTrayectoria}
            />
          );
        case 4:
          return <PasswordDeportista />;
        default:
          return "Unknown step";
      }
    } else {
      switch (step) {
        case 0:
          return (
            <InformacionPersonal
              departamentos={departments}
              cities={cities}
              setSelectedDpto={setSelectedDpto}
              selectedCities={selectedCities}
              setUnderaged={setUnderaged}
            />
          );
        case 1:
          return <InformacionDeportiva />;
        case 2:
          return (
            <VideoYFotoPerfil
              allowImage={allowImage}
              handleImageChange={handleImageChange}
              imagePreviewUrl={imagePreviewUrl}
            />
          );
        case 3:
          return (
            <Trayectoria
              trayectoria={trayectoria}
              setTrayectoria={setTrayectoria}
            />
          );
        case 4:
          return <PasswordDeportista />;
        case 5:
          return <InformacionAcudiente />;
        default:
          return "Unknown step";
      }
    }
  }

  const goHome = () => {
    setOpenModalAction(false);
    navigate("/login", { replace: true });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("telefono_usuario", data.celular);
      formData.append("nombre_usuario", data.nombreCompleto);
      formData.append("email_usuario", data.email);
      formData.append("numero_documento_usuario", data.numDoc);
      formData.append("tipo_documento_usuario", data.tipoDoc);
      formData.append("foto_usuario", imageFile);
      formData.append("fecha_nacimiento_usuario", data.fechaNacimiento);
      formData.append("genero_usuario", data.genero);
      formData.append("descripcion_usuario", data.descripcion);
      formData.append("id_departamento", data.departamento);
      formData.append("id_ciudad", data.municipio);
      formData.append("peso_deportista", data.peso);
      formData.append("altura_deportista", data.estatura);
      formData.append("posicion_deportista", data.posicion);
      formData.append("pierna_habil_deportista", data.pierna_habil);
      formData.append("habilidades", JSON.stringify(data.habilidades));
      formData.append("direccion_usuario", data.direccion);
      formData.append("password_usuario", data.password);
      formData.append("rol_usuario", "2");
      formData.append("historia_clinica_deportista", data.historia_clinica);
      formData.append("changePass", false);
      formData.append("video_deportista", data.link_video);
      formData.append("trayectoria", JSON.stringify(trayectoria));

      if (underaged) {
        let acudiente = {
          tipo_documento_acudiente: data.tipoDocAcudiente,
          numero_documento_acudiente: data.numDocAcudiente,
          telefono_acudiente: data.telefonoAcudiente,
          email_acudiente: data.emailAcudiente,
          nombre_acudiente: data.nombreAcudiente,
        };
        formData.append("acudiente", JSON.stringify(acudiente));
      }
      const service = await RegisterDeportistaService(formData);
      setLoading(false);
      if (service.status === 200) {
        setResponseMessage(service);
        setOpenModalInfo(true);

        if (service.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          reset();
          setOpenModalAction(true);
        } else if (service.data.responseCode === CODES.COD_RESPONSE_ERROR) {
          setOpenModalInfo(true);
        }
      }
      handleNext();
    } catch (error) {
      console.log(
        "==============Error Register Deportista======================"
      );
      console.log(error);
      console.log("====================================");
    }
  };

  const defaultValues = underaged
    ? {
        nombreCompleto: "",
        email: "",
        tipoDoc: "",
        numDoc: "",
        fechaNacimiento: "",
        celular: "",
        departamento: "",
        municipio: "",
        direccion: "",
        genero: "",
        estatura: "",
        peso: "",
        pierna_habil: "",
        habilidades: [],
        posicion: "",
        descripcion: "",
        link_video: "",
        image: "",
        historia_clinica: "",
        password: "",
        passwordConfirmation: "",
        trayectoria: [],
        tipoDocAcudiente: "",
        numDocAcudiente: "",
        telefonoAcudiente: "",
        emailAcudiente: "",
        nombreAcudiente: "",
      }
    : {
        nombreCompleto: "",
        email: "",
        tipoDoc: "",
        numDoc: "",
        fechaNacimiento: "",
        celular: "",
        departamento: "",
        municipio: "",
        direccion: "",
        genero: "",
        estatura: "",
        peso: "",
        pierna_habil: "",
        habilidades: [],
        posicion: "",
        descripcion: "",
        link_video: "",
        image: "",
        historia_clinica: "",
        password: "",
        passwordConfirmation: "",
        trayectoria: [],
      };

  const validationSchema = underaged
    ? [
        //validation for step1
        yup.object({
          nombreCompleto: yup.string().required("Ingresa tu nombre completo"),
          email: yup
            .string()
            .email("*Este campo debe ser un email válido")
            .required("*Este campo es requerido"),
          tipoDoc: yup
            .number()
            .required()
            .typeError("Selecciona un tipo de documento"),
          numDoc: yup.string().required("Ingresa tu número de documento"),
          fechaNacimiento: yup
            .string()
            .required("Selecciona una fecha de nacimiento"),
          celular: yup
            .number()
            .required()
            .typeError("Ingresa un número válido"),
          departamento: yup
            .number()
            .required()
            .typeError("Selecciona un departamento"),
          municipio: yup
            .number()
            .required()
            .typeError("Selecciona un municipio"),
          direccion: yup.string().required("Ingresa tu dirección"),
          genero: yup.number().required().typeError("Selecciona un género"),
        }),
        //validation for step2
        yup.object({
          estatura: yup
            .number()
            .required()
            .typeError("Ingresa una estatura válida (cm)"),
          peso: yup
            .number()
            .required()
            .typeError("Ingresa un peso válido (Kg)"),
          pierna_habil: yup
            .string()
            .required("Selecciona una pierna hábil")
            .typeError("Selecciona una pierna hábil"),
          posicion: yup
            .number()
            .required()
            .typeError("Selecciona una posición"),
          habilidades: yup
            .array()
            .max(5, "Máximo selecciona 5 habilidades")
            .min(1, "Mínimo seleccona 1 habilidad")
            .typeError("Selecciona entre 1 y 5 habilidades"),
          historia_clinica: yup
            .string()
            .required("Describe tu historia clínica en un texto corto"),
        }),
        //validation for step3
        yup.object().shape({
          descripcion: yup.string().required("Agrega la descripcion"),
          link_video: yup
            .string()
            .required("Ingresa un link a tu video")
            .matches(/youtu/i, "El video debe estar subido en youtube"),
          image: yup.mixed().required("Debes seleccionar una foto de perfil"),
        }),
        //Validation for trayectoria
        yup.object().shape({}),
        //validation for password step
        yup.object().shape({
          password: yup
            .string()
            .required("Este campo es requerido")
            .min(8, "Mínimo 8 caracteres")
            .max(15, "Máximo 15 caracteres")
            .test(
              "upperCase",
              "Al menos una letra mayúscula",
              function (value) {
                if (!!value) {
                  const schema = yup.string().matches(/^(?=.*?[A-Z])/);
                  return schema.isValidSync(value);
                }
                return true;
              }
            )
            .test(
              "lowerCase",
              "Al menos una letra minúscula",
              function (value) {
                if (!!value) {
                  const schema = yup.string().matches(/(?=.*?[a-z])/);
                  return schema.isValidSync(value);
                }
                return true;
              }
            )
            .test("number", "Al menos un número", function (value) {
              if (!!value) {
                const schema = yup.string().matches(/(?=.*?[0-9])/);
                return schema.isValidSync(value);
              }
              return true;
            })
            .test(
              "specialChar",
              "Al menos un caracter especial",
              function (value) {
                if (!!value) {
                  const schema = yup.string().matches(/(?=.*?[#?!@$%^&*-])/);
                  return schema.isValidSync(value);
                }
                return true;
              }
            ),
          passwordConfirmation: yup
            .string()
            .required("Este campo es requerido")
            .oneOf(
              [yup.ref("password"), null],
              "La nueva contraseña y su confirmación no coinciden"
            ),
        }),
        yup.object({
          tipoDocAcudiente: yup
            .number()
            .required()
            .typeError("Selecciona un tipo de documento"),
          numDocAcudiente: yup
            .string()
            .required("Ingresa tu número de documento"),
          telefonoAcudiente: yup
            .string()
            .required("Ingresa tu número de teléfono"),
          emailAcudiente: yup
            .string()
            .email("*Este campo debe ser un email válido")
            .required("*Este campo es requerido"),
          nombreAcudiente: yup.string().required("Ingresa tu nombre completo"),
        }),
      ]
    : [
        //validation for step1
        yup.object({
          nombreCompleto: yup.string().required("Ingresa tu nombre completo"),
          email: yup
            .string()
            .email("*Este campo debe ser un email válido")
            .required("*Este campo es requerido"),
          tipoDoc: yup
            .number()
            .required()
            .typeError("Selecciona un tipo de documento"),
          numDoc: yup.string().required("Ingresa tu número de documento"),
          fechaNacimiento: yup
            .string()
            .required("Selecciona una fecha de nacimiento"),
          celular: yup
            .number()
            .required()
            .typeError("Ingresa un número válido"),
          departamento: yup
            .number()
            .required()
            .typeError("Selecciona un departamento"),
          municipio: yup
            .number()
            .required()
            .typeError("Selecciona un municipio"),
          direccion: yup.string().required("Ingresa tu dirección"),
          genero: yup.number().required().typeError("Selecciona un género"),
        }),
        //validation for step2
        yup.object({
          estatura: yup
            .number()
            .required()
            .typeError("Ingresa una estatura válida (cm)"),
          peso: yup
            .number()
            .required()
            .typeError("Ingresa un peso válido (Kg)"),
          pierna_habil: yup
            .string()
            .required("Selecciona una pierna hábil")
            .typeError("Selecciona una pierna hábil"),
          posicion: yup
            .number()
            .required()
            .typeError("Selecciona una posición"),
          habilidades: yup
            .array()
            .max(5, "Máximo selecciona 5 habilidades")
            .min(1, "Mínimo seleccona 1 habilidad")
            .typeError("Selecciona entre 1 y 5 habilidades"),
          historia_clinica: yup
            .string()
            .required("Describe tu historia clínica en un texto corto"),
        }),
        //validation for step3
        yup.object().shape({
          descripcion: yup.string().required("Agrega la descripcion"),
          link_video: yup
            .string()
            .required("Ingresa un link a tu video")
            .matches(/youtu/i, "El video debe estar subido en youtube"),
          image: yup.mixed().required("Debes seleccionar una foto de perfil"),
        }),
        //Validation for trayectoria
        yup.object().shape({}),
        //validation for password step
        yup.object().shape({
          password: yup
            .string()
            .required("Este campo es requerido")
            .min(8, "Mínimo 8 caracteres")
            .max(15, "Máximo 15 caracteres")
            .test(
              "upperCase",
              "Al menos una letra mayúscula",
              function (value) {
                if (!!value) {
                  const schema = yup.string().matches(/^(?=.*?[A-Z])/);
                  return schema.isValidSync(value);
                }
                return true;
              }
            )
            .test(
              "lowerCase",
              "Al menos una letra minúscula",
              function (value) {
                if (!!value) {
                  const schema = yup.string().matches(/(?=.*?[a-z])/);
                  return schema.isValidSync(value);
                }
                return true;
              }
            )
            .test("number", "Al menos un número", function (value) {
              if (!!value) {
                const schema = yup.string().matches(/(?=.*?[0-9])/);
                return schema.isValidSync(value);
              }
              return true;
            })
            .test(
              "specialChar",
              "Al menos un caracter especial",
              function (value) {
                if (!!value) {
                  const schema = yup.string().matches(/(?=.*?[#?!@$%^&*-])/);
                  return schema.isValidSync(value);
                }
                return true;
              }
            ),
          passwordConfirmation: yup
            .string()
            .required("Este campo es requerido")
            .oneOf(
              [yup.ref("password"), null],
              "La nueva contraseña y su confirmación no coinciden"
            ),
        }),
      ];

  const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const { handleSubmit, reset, trigger, watch } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (activeStep === 2) {
      if (allowImage) {
        if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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
        <ModalInfo
          data={responseMessage}
          open={openModalInfo}
          setOpen={setOpenModalInfo}
        />
        <ModalAction
          data={responseMessage}
          open={openModalAction}
          setOpen={setOpenModalAction}
          action={goHome}
        />
        <Row className="registerDeportista__container__topRow">
          <Col
            xs={2}
            className="registerDeportista__container__topRow__buttonCol"
          >
            <Button
              onClick={() => {
                navigate(-1);
              }}
              className="registerDeportista__container__topRow__buttonCol__button"
            >
              ←
            </Button>
            <div className="registerDeportista__container__topRow__buttonCol__div">
              <p>Ir atrás {JSON.stringify(underaged)}</p>
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
                sx={{
                  "& .Mui-completed .MuiStepIcon-root": {
                    color: "#00ccff",
                    height: "25px",
                    width: "25px",
                  },
                  "& .Mui-disabled .MuiStepIcon-root": {
                    color: "#484848",
                    height: "25px",
                    width: "25px",
                  },
                  "& .Mui-active .MuiStepIcon-root": {
                    color: "#00ccff",
                    height: "25px",
                    width: "25px",
                  },
                }}
                key={label}
                className="registerDeportista__container__stepper__step"
              >
                <StepLabel
                  sx={{
                    color: "white !important",
                  }}
                  className="registerDeportista__container__stepper__step__label"
                >
                  <p style={{ color: "white" }}>{label}</p>
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
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      <Button
                        variant="contained"
                        color="primary"
                        className={"registerDeportista__container__nextButton"}
                        type="submit"
                        style={{
                          display:
                            activeStep === steps.length - 1 ? "block" : "none",
                        }}
                      >
                        {loading ? <Spinner animation="border" /> : "Finalizar"}
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={"registerDeportista__container__nextButton"}
                        style={{
                          display:
                            activeStep === steps.length - 1 ? "none" : "block",
                        }}
                      >
                        Siguiente
                      </Button>
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

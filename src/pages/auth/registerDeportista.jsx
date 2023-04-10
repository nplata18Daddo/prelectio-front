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

export const RegisterDeportista = () => {
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

  const steps = [
    "Informacion Personal",
    "Informacion Deportiva",
    "Video y Foto de Perfil",
    "Trayectoria",
    "Contraseña",
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setImagePreviewUrl(imageDataUrl);
        const imageData = imageDataUrl.split(",")[1];
        setImageFile(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

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
        return (
          <VideoYFotoPerfil
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
  }

  const goHome = () => {
    setOpenModalAction(false);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.rol_usuario === CODES.COD_ROLES_ADMIN) {
      navigate("/admin/home", { replace: true });
    } else if (user.rol_usuario === CODES.COD_ROLES_RECRUITER) {
      navigate("/recruiter/home", { replace: true });
    } else {
      navigate("/athlete/home", { replace: true });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const obj = {
        telefono_usuario: data.celular,
        nombre_usuario: data.nombreCompleto,
        email_usuario: data.email,
        numero_documento_usuario: data.numDoc,
        tipo_documento_usuario: data.tipoDoc,
        foto_usuario: "76",
        fecha_nacimiento_usuario: data.fechaNacimiento,
        genero_usuario: data.genero,
        descripcion_usuario: data.descripcion,
        id_departamento: data.departamento,
        id_ciudad: data.municipio,
        peso_deportista: data.peso,
        altura_deportista: data.estatura,
        posicion_deportista: data.posicion,
        pierna_habil_deportista: data.pierna_habil,
        habilidades: data.habilidades,
        direccion_usuario: data.direccion,
        password_usuario: data.password,
        id_estado: "1",
        rol_usuario: "2",
        historia_clinica_deportista: data.historia_clinica,
        changePass: false,
        link_video: data.link_video,
        trayectoria: trayectoria,
      };
      console.log(obj);
      const service = await RegisterDeportistaService(obj);
      if (service.status === 200) {
        setResponseMessage(service);
        setOpenModalInfo(true);
        reset();

        if (service.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          setOpenModalAction(true);
          const token = service.data.responseLoad.accessToken;
          localStorage.setItem("access_token", token);
          const user = service.data.responseLoad.user;
          localStorage.setItem("user", JSON.stringify(user));
        } else if (service.data.responseCode === CODES.COD_RESPONSE_ERROR) {
          setOpenModalInfo(true);
        }
      }
      //handleNext();
    } catch (error) {
      setLoading(false);
      console.log(
        "==============Error Register Deportista======================"
      );
      console.log(error);
      console.log("====================================");
    }
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

  const validationSchema = [
    //validation for step1
    yup.object({
      // nombreCompleto: yup.string().required("Ingresa tu nombre completo"),
      // email: yup
      //   .string()
      //   .email()
      //   .required("Ingresa un email válido")
      //   .typeError("Ingresa un email válido"),
      // tipoDoc: yup
      //   .number()
      //   .required()
      //   .typeError("Selecciona un tipo de documento"),
      // numDoc: yup.string().required("Ingresa tu número de documento"),
      // fechaNacimiento: yup
      //   .string()
      //   .required("Selecciona una fecha de nacimiento"),
      // celular: yup.number().required().typeError("Ingresa un número válido"),
      // departamento: yup
      //   .number()
      //   .required()
      //   .typeError("Selecciona un departamento"),
      // municipio: yup.number().required().typeError("Selecciona un municipio"),
      // direccion: yup.string().required("Ingresa tu dirección"),
      // genero: yup.number().required().typeError("Selecciona un género"),
    }),
    //validation for step2
    yup.object({
      // estatura: yup
      //   .number()
      //   .required()
      //   .typeError("Ingresa una estatura válida (cm)"),
      // peso: yup.number().required().typeError("Ingresa un peso válido (Kg)"),
      // pierna_habil: yup
      //   .string()
      //   .required("Selecciona una pierna hábil")
      //   .typeError("Selecciona una pierna hábil"),
      // posicion: yup.number().required().typeError("Selecciona una posición"),
      // habilidades: yup
      //   .array()
      //   .max(5, "Máximo selecciona 5 habilidades")
      //   .min(1, "Mínimo seleccona 1 habilidad")
      //   .typeError("Selecciona entre 1 y 5 habilidades"),
      // historia_clinica: yup
      //   .string()
      //   .required("Describe tu historia clínica en un texto corto"),
    }),
    //validation for step3
    yup.object().shape({
      // descripcion: yup.string().required("Agrega la descripcion"),
      // link_video: yup.string().required("Ingresa un link a tu video"),
      // image: yup.string(),
    }),
    //Validation for trayectoria
    yup.object().shape({}),
    //validation for password step
    yup.object().shape({
      // password: yup
      //   .string()
      //   .required("Este campo es requerido")
      //   .min(8, "Mínimo 8 caracteres")
      //   .max(15, "Máximo 15 caracteres")
      //   .test("upperCase", "Al menos una letra mayúscula", function (value) {
      //     if (!!value) {
      //       const schema = yup.string().matches(/^(?=.*?[A-Z])/);
      //       return schema.isValidSync(value);
      //     }
      //     return true;
      //   })
      //   .test("lowerCase", "Al menos una letra minúscula", function (value) {
      //     if (!!value) {
      //       const schema = yup.string().matches(/(?=.*?[a-z])/);
      //       return schema.isValidSync(value);
      //     }
      //     return true;
      //   })
      //   .test("number", "Al menos un número", function (value) {
      //     if (!!value) {
      //       const schema = yup.string().matches(/(?=.*?[0-9])/);
      //       return schema.isValidSync(value);
      //     }
      //     return true;
      //   })
      //   .test("specialChar", "Al menos un caracter especial", function (value) {
      //     if (!!value) {
      //       const schema = yup.string().matches(/(?=.*?[#?!@$%^&*-])/);
      //       return schema.isValidSync(value);
      //     }
      //     return true;
      //   }),
      // passwordConfirmation: yup
      //   .string()
      //   .required("Este campo es requerido")
      //   .oneOf(
      //     [yup.ref("password"), null],
      //     "La nueva contraseña y su confirmación no coinciden"
      //   ),
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

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CODES } from "../../consts/codes";
import { getCiudades, getDepartamentos } from "../../services/locationServices";
import * as yup from "yup";
import ColombianFlag from "../../assets/register/colombia.png";
import EditIcon from "@mui/icons-material/Edit";
import {
  GetAthleteDetail,
  GetHabilidadDeportista,
  GetTrayectoriaDeportista,
  UpdateProfileAthlete,
} from "../../services/adminServices";
import { UpdateProfileRecruiter } from "../../services/recruiterServices";
import SendEmailModal from "../../components/components/modals/ModalSendMail";
import baseProfile from "../../assets/register/emptyProfile.png";
import { ModalInfo } from "../../components/components/modals/ModalInfo";
import { IconButton } from "@mui/material";
export const AthleteProfile = () => {
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [date, setDate] = useState("");
  const [responseMessage, setResponseMessage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openModalAction, setOpenModalAction] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedValues, setSelectedValues] = useState([]);
  const [trayectorias, setTrayectorias] = useState([]);
  const [img, setImg] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleSelect = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedValues(selectedOptions);
  };
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

  const options = [
    { label: "Agilidad", value: "1" },
    { label: "Agresividad", value: "2" },
    { label: "Altura", value: "3" },
    { label: "Ambidiestro", value: "4" },
    { label: "Cabeceador", value: "5" },
    { label: "Capacidad de Reaccion", value: "6" },
    { label: "Creador de Jugadas", value: "7" },
    { label: "Estructura Física", value: "8" },
    { label: "Fuerza de Tiro", value: "9" },
    { label: "Habilidad Tecnica", value: "10" },
    { label: "Jugador Solido", value: "11" },
    { label: "Lider", value: "12" },
    { label: "Penales", value: "13" },
    { label: "Perfil Cambiado", value: "14" },
    { label: "Provocador", value: "15" },
    { label: "Rapido", value: "16" },
    { label: "Recuperador", value: "17" },
    { label: "Regateador", value: "18" },
    { label: "Saque Largo", value: "19" },
    { label: "Saque Largo Con Manos", value: "20" },
    { label: "Tiros Libres", value: "21" },
  ];
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
  }, [refresh]);

  useEffect(() => {
    if (cities.length > 0) {
      const fetchData = async () => {
        setLoading(true);
        const activeUser = JSON.parse(localStorage.getItem("user"));
        const obj = {
          id: activeUser.id_usuario,
        };
        const [userInfo] = await Promise.all([GetAthleteDetail(obj)]);

        if (userInfo.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          const img =
            userInfo.data.responseMessage.foto_usuario_base_64 != null
              ? "data:image/png;base64," +
                userInfo.data.responseMessage.foto_usuario_base_64
              : baseProfile;
          setImg(img);
        }
        const [habilidadesDeportista] = await Promise.all([
          GetHabilidadDeportista(
            userInfo.data.responseMessage.deportista[0].id_deportista
          ),
        ]);
        let habilidades = habilidadesDeportista.data.responseMessage;
        setLoading(false);
        let habilidadesAEntrar = [];
        for (let i = 0; i < habilidades.length; i++) {
          habilidadesAEntrar[i] = String(habilidades[i].id_habilidad);
        }
        setSelectedValues(habilidadesAEntrar);
        if (userInfo.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          let data = userInfo.data.responseMessage;
          setUserData(data);
          setValue("name", data.nombre_usuario);
          setValue("email", data.email_usuario);
          setValue("documentType", data.tipo_documento_usuario);
          setValue("documentNumber", data.numero_documento_usuario);
          setValue("birthDate", data.fecha_nacimiento_usuario);
          setDate(data.fecha_nacimiento_usuario);
          setValue("phone", data.telefono_usuario);
          setValue("department", data.id_departamento);

          let obj = { target: { value: data.id_departamento } };
          filterCities(obj);
          setValue("city", data.id_ciudad);

          setValue("description", data.descripcion_usuario);
          setValue("direccion", data.direccion_usuario);
          setValue("genero", data.genero_usuario);
          setValue("altura", data.deportista[0].altura_deportista);
          setValue("peso", data.deportista[0].peso_deportista);
          setValue("historia", data.deportista[0].historia_clinica_deportista);
          setValue("video", data.deportista[0].video_deportista);
          setValue("posicion", data.deportista[0].posicion_deportista);
          setValue("pierna", data.deportista[0].pierna_habil_deportista);
        }
      };

      fetchData();
    }
  }, [cities, refresh]);

  useEffect(() => {
    const fetchData = async () => {
      const activeUser = JSON.parse(localStorage.getItem("user"));
      const obj = {
        id: activeUser.id_usuario,
      };
      const [userInfo] = await Promise.all([GetAthleteDetail(obj)]);
      const [trayectoriasD] = await Promise.all([
        GetTrayectoriaDeportista(
          userInfo.data.responseMessage.deportista[0].id_deportista
        ),
      ]);
      setTrayectorias(trayectoriasD.data.responseMessage);
    };
    fetchData();
  }, [refresh]);

  function removeTrajectoryById(id) {
    setRefresh(true);
    let trayectoriass = [...trayectorias];
    trayectoriass.splice(id, 1);
    /*  for (let i = 0; i < trayectoriass.length; i++) {
      if (trayectoriass[i].id_trayectoria === id) {
        trayectoriass.splice(id, 1);
        break;
      }
    } */
    setTrayectorias(trayectoriass);
    setRefresh(false);
  }

  function addTrayectoriaField(id_deportista) {
    let id_deportistaa = 0;
    const fetchData = async () => {
      const activeUser = JSON.parse(localStorage.getItem("user"));
      const obj = {
        id: activeUser.id_usuario,
      };
      const [userInfo] = await Promise.all([GetAthleteDetail(obj)]);

      id_deportistaa =
        userInfo.data.responseMessage.deportista[0].id_deportista;

      let newfield = {
        id_trayectoria: "",
        id_deportista: id_deportistaa,
        descripcion_trayectoria: "",
        titulo_trayectoria: "",
        fecha_inicio: "",
        fecha_fin: "",
      };
      setTrayectorias([...trayectorias, newfield]);
    };
    fetchData();
  }

  function setDescripcionTrayectoria(index, descripcion) {
    setRefresh(true);
    let trayectoriass = [...trayectorias];
    trayectoriass[index].descripcion_trayectoria = descripcion;
    setTrayectorias(trayectoriass);
    setRefresh(false);
  }
  function setTituloTrayectoria(index, titulo) {
    setRefresh(true);
    let trayectoriass = [...trayectorias];
    trayectoriass[index].titulo_trayectoria = titulo;
    setTrayectorias(trayectoriass);
    setRefresh(false);
  }

  function setFechasTrayectoria(index, fecha, cual) {
    setRefresh(true);
    let trayectoriass = [...trayectorias];
    if (cual === 1) {
      trayectoriass[index].fecha_inicio = fecha;
    } else {
      trayectoriass[index].fecha_fin = fecha;
    }
    setTrayectorias(trayectoriass);
    setRefresh(false);
  }

  const getDisabled = () => {
    let disabled =
      watch("email") === "" ||
      watch("name") === "" ||
      watch("documentType") === "" ||
      watch("documentNumber") === "" ||
      watch("represents") === "" ||
      date === "" ||
      watch("phone") === "" ||
      watch("department") === "" ||
      watch("city") === "" ||
      watch("description") === "" ||
      watch("direccion") === "" ||
      watch("peso") === "" ||
      watch("altura") === "" ||
      watch("genero") === "" ||
      watch("historia") === "" ||
      watch("video") === "" ||
      watch("posicion") === "" ||
      watch("pierna") === "";

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

  const handleUpdate = async (data) => {
    let id_deportistaa = 0;
    const activeUser = JSON.parse(localStorage.getItem("user"));
    const obj = {
      id: activeUser.id_usuario,
    };
    const [userInfo] = await Promise.all([GetAthleteDetail(obj)]);

    id_deportistaa = userInfo.data.responseMessage.deportista[0].id_deportista;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id_usuario", userData.id_usuario);
      formData.append("id_deportista", id_deportistaa);
      formData.append("telefono_usuario", data.phone);
      formData.append("nombre_usuario", data.name);
      formData.append("email_usuario", data.email);
      formData.append("numero_documento_usuario", data.documentNumber);
      formData.append("tipo_documento_usuario", data.documentType);
      formData.append("foto_usuario", imageFile);
      formData.append("fecha_nacimiento_usuario", date);
      formData.append("genero_usuario", data.genero);
      formData.append("descripcion_usuario", data.description);
      formData.append("id_departamento", data.department);
      formData.append("id_ciudad", data.city);
      formData.append("peso_deportista", data.peso);
      formData.append("altura_deportista", data.altura);
      formData.append("posicion_deportista", data.posicion);
      formData.append("pierna_habil_deportista", data.pierna);
      formData.append("habilidades", JSON.stringify(selectedValues));
      formData.append("direccion_usuario", data.direccion);
      formData.append("password_usuario", data.password);
      formData.append("rol_usuario", "2");
      formData.append("historia_clinica_deportista", data.historia);
      formData.append("changePass", false);
      formData.append("video_deportista", data.video);
      formData.append("trayectoria", JSON.stringify(trayectorias));
      const service = await UpdateProfileAthlete(formData);

      setResponseMessage(service);
      setLoading(false);
      if (service.status === 200) {
        if (service.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          setOpenModalInfo(true);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("==============Error login======================");
      console.log(error);
      console.log("====================================");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setImagePreviewUrl(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className="edit__form__container">
      <ModalInfo
        data={responseMessage}
        open={openModalInfo}
        setOpen={setOpenModalInfo}
      />
      <Col xs={12}>
        <Form onSubmit={handleSubmit(handleUpdate)}>
          <Col xs={12} className="athleteDetail__mainInfoRow__mainInfoCol">
            <Row className="athleteDetail__mainInfoRow__mainInfoCol__imgRow">
              <div style={{ position: "relative" }}>
                {img ? (
                  <img
                    src={imageFile ? imagePreviewUrl : img}
                    className="athleteDetail__mainInfoRow__mainInfoCol__imgRow__img"
                  ></img>
                ) : (
                  <Spinner />
                )}
                {img && (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      position: "absolute",
                      bottom: "-12%",
                      right: "47%",
                      width: "6%",
                    }}
                  >
                    <input
                      id="photo-upload"
                      className="imageInput__fotoDiv__fileUpload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleImageChange(e);
                      }}
                    ></input>
                    <EditIcon
                      fontSize="large"
                      style={{
                        width: "40px",
                        height: "40px",
                        padding: "15%",
                      }}
                      sx={{
                        backgroundColor: "#00ccff",
                        color: "white",
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>
                )}
              </div>
            </Row>
          </Col>
          <Form.Group
            className="mb-3 mt-3"
            controlId="formBasicEmail"
            style={{ textAlign: "start" }}
          >
            <Form.Label className="display__small">Nombre Completo*</Form.Label>
            <InputGroup>
              <Form.Control
                disabled
                maxLength="100"
                {...register("name")}
                className="edit__input  display__small"
                placeholder="Tu nombre completo"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group
            className="mb-3 mt-3"
            controlId="name"
            style={{ textAlign: "start" }}
          >
            <Form.Label className=" display__small">Correo*</Form.Label>
            <InputGroup>
              <Form.Control
                disabled
                maxLength="100"
                {...register("email")}
                className="edit__input  display__small"
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
          <Row style={{ alignItems: "baseline", padding: "1.5px" }}>
            <Form.Group
              className="mb-3 col-xs-12 col-lg-4"
              controlId="documentType"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">
                Tipo documento*
              </Form.Label>
              <Form.Select
                disabled
                {...register("documentType")}
                className="edit__select display__small"
                aria-label="Default select example"
              >
                <option value="" disabled selected>
                  Tipo Documento
                </option>
                <option value="1">CC</option>
                <option value="2">CE</option>
                <option value="3">TI</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3 mt-3 col-xs-12 col-lg-8"
              controlId="documentNumber"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">
                Numero documento*
              </Form.Label>
              <InputGroup>
                <Form.Control
                  disabled
                  maxLength="25"
                  {...register("documentNumber")}
                  className="edit__input  display__small"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group
              className="mb-4 mt-2 col-xs-12 col-lg-6"
              controlId="birthDate"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">
                Fecha de {"Nacimiento"}*
              </Form.Label>
              <Form.Control
                {...register("birthDate")}
                className=" display__small"
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
              <Form.Label className="display__small">Celular</Form.Label>
              <InputGroup>
                <InputGroup.Text className=" display__small">
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
                  className="display__small"
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
              <Form.Label className=" display__small">Departamento*</Form.Label>
              <Form.Select
                className="edit__select display__small"
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
              <Form.Label className="display__small">Municipio*</Form.Label>
              {!loading && (
                <Form.Select
                  disabled={watch("department") === ""}
                  className="edit__select display__small"
                  aria-label="Default select example"
                  {...register("city")}
                >
                  <option value="" disabled selected>
                    Municipio
                  </option>
                  {selectedCities.map((item) => {
                    return (
                      <option value={item.id_ciudad} key={item.id_ciudad}>
                        {item.nombre_ciudad}
                      </option>
                    );
                  })}
                </Form.Select>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ textAlign: "start" }}
            >
              <Form.Label className=" display__small">Descripción</Form.Label>
              <InputGroup>
                <Form.Control
                  maxLength="150"
                  as="textarea"
                  rows={2}
                  {...register("description")}
                  className="edit__input  display__small"
                  placeholder="Descripción corta de tu puesto"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-1 mt-1"
              controlId="formBasicEmail"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">Dirección*</Form.Label>
              <InputGroup>
                <Form.Control
                  maxLength="100"
                  {...register("direccion")}
                  className="edit__input  display__small"
                  placeholder="Tu nombre completo"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-3 col-xs-12 col-lg-6"
              controlId="genero"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">Posición*</Form.Label>
              <Form.Select
                {...register("posicion")}
                className="edit__select display__small"
                aria-label="Default select example"
              >
                <option value="" disabled selected>
                  Posición
                </option>
                <option value="1">Portero</option>
                <option value="2">Lateral derecho</option>
                <option value="3">Central derecho</option>
                <option value="4">Central izquierdo</option>
                <option value="5">Lateral izquierdo</option>
                <option value="6">Volante de marca</option>
                <option value="7">Volante mixto</option>
                <option value="8">Volante ofensivo</option>
                <option value="9">Extremo derecho</option>
                <option value="10">Extremo izquierdo</option>
                <option value="11">Delantero centro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3 col-xs-12 col-lg-6"
              controlId="genero"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">Pierna Hábil*</Form.Label>
              <Form.Select
                {...register("pierna")}
                className="edit__select display__small"
                aria-label="Default select example"
              >
                <option value="" disabled selected>
                  Pierna Hábil
                </option>
                <option value="1">Derecha</option>
                <option value="2">Izquierda</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-2 mt-2 col-xs-6 col-lg-4"
              controlId="formBasicEmail"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">Peso*</Form.Label>
              <InputGroup>
                <Form.Control
                  maxLength="100"
                  {...register("peso")}
                  className="edit__input  display__small"
                  placeholder="Peso"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-2 mt-2 col-xs-6 col-lg-4"
              controlId="formBasicEmail"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">Altura*</Form.Label>
              <InputGroup>
                <Form.Control
                  maxLength="100"
                  {...register("altura")}
                  className="edit__input  display__small"
                  placeholder="Altura"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-3 col-xs-12 col-lg-4"
              controlId="genero"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">Genero*</Form.Label>
              <Form.Select
                disabled
                {...register("genero")}
                className="edit__select display__small"
                aria-label="Default select example"
              >
                <option value="" disabled selected>
                  Genero
                </option>
                <option value="0">Masculino</option>
                <option value="1">Femenino</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ textAlign: "start" }}
            >
              <Form.Label className=" display__small">
                Historia clínica*
              </Form.Label>
              <InputGroup>
                <Form.Control
                  maxLength="250"
                  as="textarea"
                  rows={2}
                  {...register("historia")}
                  className="edit__input  display__small"
                  placeholder="Tu historia clínica"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-3 col-xs-12 col-lg-12"
              controlId="genero"
              style={{
                textAlign: "start",
                fontSize: "14px",
              }}
            >
              <Form.Label className="display__small">Habilidades*</Form.Label>
              <Row>
                {options.map((option) => (
                  <Col xs={6} md={4} key={option.value}>
                    <Form.Check
                      //key={option.value}
                      type="checkbox"
                      id={option.value}
                      label={option.label}
                      value={option.value}
                      checked={selectedValues.includes(option.value)}
                      style={{
                        minWidth: "5%",
                      }}
                      onChange={(e) => {
                        if (e.target.checked && selectedValues.length < 5) {
                          setSelectedValues([
                            ...selectedValues,
                            e.target.value,
                          ]);
                        } else {
                          setSelectedValues(
                            selectedValues.filter(
                              (value) => value !== e.target.value
                            )
                          );
                        }
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>

            <Form.Group
              className="mb-1 col-xs-12 col-lg-12"
              controlId="genero"
              style={{
                textAlign: "start",
                fontSize: "14px",
              }}
            >
              <Form.Label className="display__small">
                Trayectorias* {}
              </Form.Label>
              <Row className="mb-2">
                {trayectorias.map((option, index) => (
                  <Row className="mb-2" key={index}>
                    <Col xs={11}>
                      <Row className="mb-2">
                        <Col xs={12} md={4}>
                          <InputGroup>
                            <Form.Control
                              maxLength="100"
                              value={option.titulo_trayectoria}
                              className="edit__input  display__small"
                              placeholder="Trayectoria"
                              onChange={(e) => {
                                setTituloTrayectoria(index, e.target.value);
                              }}
                            />
                          </InputGroup>
                        </Col>
                        <Col xs={12} md={8}>
                          <InputGroup>
                            <Form.Control
                              maxLength="100"
                              value={option.descripcion_trayectoria}
                              className="edit__input  display__small"
                              placeholder="Trayectoria"
                              onChange={(e) => {
                                setDescripcionTrayectoria(
                                  index,
                                  e.target.value
                                );
                              }}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="mb-5">
                        <Col xs={6} md={6}>
                          <Form.Label className="display__small">
                            Fecha Inicio
                          </Form.Label>
                          <Form.Control
                            value={option.fecha_inicio}
                            className=" display__small"
                            type="date"
                            name="duedate"
                            placeholder="DD/MM/AAAA"
                            onChange={(e) =>
                              setFechasTrayectoria(index, e.target.value, 1)
                            }
                          />
                        </Col>
                        <Col xs={6} md={6}>
                          <Form.Label className="display__small">
                            Fecha Fin
                          </Form.Label>
                          <Form.Control
                            value={option.fecha_fin}
                            className=" display__small"
                            type="date"
                            name="duedate"
                            placeholder="DD/MM/AAAA"
                            onChange={(e) =>
                              setFechasTrayectoria(index, e.target.value, 2)
                            }
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      xs={1}
                      style={{
                        display: "flex",
                        minHeight: "30px",
                        minWidth: "30px",
                        alignContent: "center",
                        flexDirection: "row",
                        alignSelf: "center",
                      }}
                    >
                      <Button
                        className="p-2 justify-content-center"
                        variant="primary"
                        //className="weight__bold"
                        disabled={trayectorias.length <= 1}
                        //onClick={removeTrajectoryById(option.id_trayectoria)}

                        onClick={() => removeTrajectoryById(index)}
                      ></Button>
                    </Col>
                    <Row className="p-2 justify-content-center"></Row>
                  </Row>
                ))}
              </Row>
            </Form.Group>
            <Col
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                onClick={() => {
                  addTrayectoriaField();
                }}
              >
                Agregar Trayectoria a la lista
              </Button>
            </Col>
            <Form.Group
              className="mb-5 mt-1"
              controlId="formBasicEmail"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">
                Link del video*
              </Form.Label>
              <InputGroup>
                <Form.Control
                  maxLength="100"
                  {...register("video")}
                  className="edit__input  display__small"
                  placeholder="Link de tu video"
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
            {loading ? <Spinner animation="border" /> : "Actualizar"}
          </Button>
          <p className="display__label text-white mt-4"></p>
        </Form>
      </Col>
    </Container>
  );
};

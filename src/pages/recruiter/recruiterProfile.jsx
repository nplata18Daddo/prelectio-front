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
import { GetRecruiterDetail } from "../../services/adminServices";
import { UpdateProfileRecruiter } from "../../services/recruiterServices";
import { ModalInfo } from "../../components/components/modals/ModalInfo";
export const RecruiterProfile = () => {
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
        const [userInfo] = await Promise.all([GetRecruiterDetail(obj)]);
        setLoading(false);
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
          setValue("represents", data.reclutador.entidad_reclutador);
        }
      };

      fetchData();
    }
  }, [cities, refresh]);

  console.log(watch("city"));

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
      watch("description") === "";

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
    console.log(data);
    setLoading(true);
    try {
      const obj = {
        id_usuario: userData.id_usuario,
        id_reclutador: userData.reclutador.id_reclutador,
        nombre_usuario: data.name,
        email_usuario: data.email,
        telefono_usuario: data.phone,
        tipo_documento_usuario: data.documentType,
        numero_documento_usuario: data.documentNumber,
        entidad_reclutador: data.represents,
        fecha_nacimiento_usuario: date,
        id_departamento: data.department,
        id_ciudad: data.city,

        descripcion_usuario: data.description,
      };
      const service = await UpdateProfileRecruiter(obj);

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

  return (
    <Container className="edit__form__container">
      <ModalInfo
        data={responseMessage}
        open={openModalInfo}
        setOpen={setOpenModalInfo}
      />
      <Col xs={12}>
        <Form onSubmit={handleSubmit(handleUpdate)}>
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
              className="mb-3 mt-3 "
              controlId="represents"
              style={{ textAlign: "start" }}
            >
              <Form.Label className="display__small">
                A quien representas*
              </Form.Label>
              <Form.Select
                {...register("represents")}
                className="edit__select display__small"
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
              <Form.Label className="display__small">
                Fecha de{" "}
                {watch("represents") === "5" ? "Nacimiento" : "Fundación"}*
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
              className="mb-5 "
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
          </Row>

          <Button
            disabled={getDisabled()}
            variant="primary"
            type="submit"
            className="login__submit display__small weight__bold"
          >
            {loading ? <Spinner animation="border" /> : "Actualizar"}
          </Button>
          <p className="display__label text-white mt-4">
            El producto esta solo disponible para profesionales(sujetos a
            aprobación)
          </p>
        </Form>
      </Col>
    </Container>
  );
};

import { InputLabel } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { InputField } from "./FormFields/inputField";
import { SelectField } from "./FormFields/selectField";

export const InformacionAcudiente = () => {
  return (
    <div className="informacionAcudiente">
      <Container className="informacionAcudiente__container">
        <Row className="informacionAcudiente__container__row">
          <Col md={6} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Nombre Acudiente
              </h4>
            </InputLabel>
            <InputField label="Nombre" name="nombreAcudiente" />
          </Col>
          <Col md={2} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Tipo Documento
              </h4>
            </InputLabel>
            <SelectField
              placeholder={"Tipo Documento"}
              options={[
                { value: 1, label: "CC" },
                { value: 2, label: "CE" },
                { value: 3, label: "TI" },
              ]}
              label="Tipo Documento"
              name="tipoDocAcudiente"
            />
          </Col>
          <Col md={4} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Número de documento
              </h4>
            </InputLabel>
            <InputField label="Numero Documento" name="numDocAcudiente" />
          </Col>
        </Row>
        <Row className="informacionAcudiente__container__row">
          <Col md={6} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Email Acudiente
              </h4>
            </InputLabel>
            <InputField label="Correo" name="emailAcudiente" />
          </Col>
          <Col md={6} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Telefono Acudiente
              </h4>
            </InputLabel>
            <InputField label="Telefono" name="telefonoAcudiente" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

import { InputLabel, Select } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DateField } from "./FormFields/dateField";
import { InputField } from "./FormFields/inputField";
import {
  DptoSelectField,
  MunicipioSelectField,
} from "./FormFields/departamentoSelectField";
import { SelectField } from "./FormFields/selectField";

export const InformacionPersonal = (props) => {
  return (
    <div className="informacionPersonal">
      <Container className="informacionPersonal__container">
        <Row className="informacionPersonal__container__row">
          <Col md={6} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Nombre</h4>
            </InputLabel>
            <InputField label="Nombre Completo" name="nombreCompleto" />
          </Col>
          <Col md={6} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Correo</h4>
            </InputLabel>
            <InputField label="Tu Correo" name="email" />
          </Col>
        </Row>
        <Row className="informacionPersonal__container__row">
          <Col md={2} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Tipo Documento
              </h4>
            </InputLabel>
            <SelectField
              options={[
                { value: 1, label: "CC" },
                { value: 2, label: "CE" },
                { value: 3, label: "TI" },
              ]}
              label="Tipo Documento"
              name="tipoDoc"
            />
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1.5vh",
            }}
            md={4}
            className="informacionPersonal__container__row__col"
          >
            <InputField label="Numero Documento" name="numDoc" />
          </Col>
          <Col md={3} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Fecha Nacimiento
              </h4>
            </InputLabel>
            <DateField label="Fecha Nacimiento" name="fechaNacimiento" />
          </Col>
          <Col md={3} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Celular</h4>
            </InputLabel>
            <InputField label="Celular" name="celular" />
          </Col>
        </Row>
        <Row className="informacionPersonal__container__row">
          <Col md={3} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Departamento
              </h4>
            </InputLabel>
            <DptoSelectField
              options={props.departamentos}
              label="Departamento"
              name="departamento"
              setSelectedDpto={props.setSelectedDpto}
            />
          </Col>
          <Col md={3} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Municipio</h4>
            </InputLabel>
            <SelectField
              label="Municipio"
              name="municipio"
              options={props.selectedCities}
            />
          </Col>
          <Col md={3} className="informacionPersonal__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Género</h4>
            </InputLabel>
            <SelectField
              label="Genero"
              name="genero"
              options={[
                { value: 1, label: "Masculino" },
                { value: 2, label: "Femenino" },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

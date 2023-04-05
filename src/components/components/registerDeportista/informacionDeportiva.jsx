import { InputLabel } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CODES } from "../../../consts/codes";
import { InputField } from "./FormFields/inputField";
import { MultipleSelectField } from "./FormFields/multipleSelectFields";
import { SelectField } from "./FormFields/selectField";

export const InformacionDeportiva = () => {
  return (
    <div className="informacionDeportiva">
      <Container className="informacionDeportiva__container">
        <Row className="informacionDeportiva__container__row">
          <Col md={3} className="informacionDeportiva__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Estatura(cm)
              </h4>
            </InputLabel>
            <InputField label="Estatura (cm)" name="estatura" />
          </Col>
          <Col md={3} className="informacionDeportiva__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Peso (kg)</h4>
            </InputLabel>
            <InputField label="Peso (kg)" name="peso" />
          </Col>
          <Col md={3} className="informacionDeportiva__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Pierna Habil
              </h4>
            </InputLabel>
            <SelectField
              placeholder="Pierna Hábil"
              label="Pierna Habil"
              name="pierna_habil"
              options={[
                { label: "Derecha", value: 1 },
                { label: "Izquierda", value: 2 },
              ]}
            />
          </Col>
          <Col md={3} className="informacionDeportiva__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Posición</h4>
            </InputLabel>
            <SelectField
              placeholder={"Posición"}
              label="Posicion"
              name="posicion"
              options={[
                { label: "Portero", value: 1 },
                { label: "Lateral Derecho", value: 2 },
                { label: "Central Derecho", value: 3 },
                { label: "Central Izquierdo", value: 4 },
                { label: "Lateral Izquierdo", value: 5 },
                { label: "Volante de Marca", value: 6 },
                { label: "Volante Mixto", value: 7 },
                { label: "Volante Ofensivo", value: 8 },
                { label: "Extremo Derecho", value: 9 },
                { label: "Extremo Izquierdo", value: 10 },
                { label: "Delantero Centro", value: 11 },
              ]}
            />
          </Col>
        </Row>
        <Row className="informacionDeportiva__container__row">
          <Col md={6} className="informacionDeportiva__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>Trayectoria</h4>
            </InputLabel>
          </Col>
          <Col md={6} className="informacionDeportiva__container__row__col">
            <InputLabel style={{ marginBottom: "0.5vh" }}>
              <h4 style={{ textAlign: "left", color: "white" }}>
                Habilidades (máximo 5)
              </h4>
            </InputLabel>
            <MultipleSelectField
              placeholder={"Habilidades"}
              label="Habilidades"
              name="habilidades"
              options={[
                { label: "Agilidad", value: 1 },
                { label: "Agresividad", value: 2 },
                { label: "Altura", value: 3 },
                { label: "Ambidiestro", value: 4 },
                { label: "Cabeceador", value: 5 },
                { label: "Capacidad de Reaccion", value: 6 },
                { label: "Creador de Jugadas", value: 7 },
                { label: "Estructura Física", value: 8 },
                { label: "Fuerza de Tiro", value: 9 },
                { label: "Habilidad Tecnica", value: 10 },
                { label: "Jugador Solido", value: 11 },
                { label: "Lider", value: 12 },
                { label: "Penales", value: 13 },
                { label: "Perfil Cambiado", value: 14 },
                { label: "Provocador", value: 15 },
                { label: "Rapido", value: 16 },
                { label: "Recuperador", value: 17 },
                { label: "Regateador", value: 18 },
                { label: "Saque Largo", value: 19 },
                { label: "Saque Largo Con Manos", value: 20 },
                { label: "Tiros Libres", value: 21 },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

import React, { useState } from "react";
import { Button, Col, Collapse, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoPrelectio from "../../assets/logo_prelectio.png";

export const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Row className="navbar">
        <Col xs={4} lg={3} className="text-left navbar__col">
          <Link to="/">
            <img style={{ width: "50%" }} src={logoPrelectio}></img>
          </Link>
        </Col>
        <Col xs={8} lg={8} className="text-center navbar__col">
          <Row className="navbar__col__buttonRow">
            <Col xs={2}>
              <Button className="navbar__col__buttonRow__button__secondary">
                Inicio
              </Button>
            </Col>
            <Col xs={2}>
              <Button className="navbar__col__buttonRow__button__secondary">
                Sobre Nosotros
              </Button>
            </Col>
            <Col xs={2}>
              <Button className="navbar__col__buttonRow__button__secondary">
                Quienes Somos
              </Button>
            </Col>
            <Col xs={2}>
              <Button className="navbar__col__buttonRow__button__secondary">
                Servicios
              </Button>
            </Col>
            <Col xs={2}>
              <Button className="navbar__col__buttonRow__button__primary">
                Ingresar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="navbar__responsive">
        <Row className="rowArriba">
          <Col
            xs={2}
            className="text-left navbar__col__toggle navbar__responsive__col"
            id="margenArriba"
          >
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setOpen(!open)}
              aria-controls="navbarCollapse"
              aria-expanded={open}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/" style={{ width: "fit-content" }}>
              <img style={{ width: "50%" }} src={logoPrelectio}></img>
            </Link>
          </Col>
        </Row>
        <Collapse in={open}>
          <div id="navbarCollapse">
            <Row className="navbar__responsive__col__buttonRow">
              <Button className="navbar__responsive__col__buttonRow__button__secondary">
                Inicio
              </Button>
            </Row>
            <Row className="navbar__responsive__col__buttonRow">
              <Button className="navbar__responsive__col__buttonRow__button__secondary">
                Sobre Nosotros
              </Button>
            </Row>
            <Row className="navbar__responsive__col__buttonRow">
              <Button className="navbar__responsive__col__buttonRow__button__secondary">
                Quienes Somos
              </Button>
            </Row>
            <Row className="navbar__responsive__col__buttonRow">
              <Button className="navbar__responsive__col__buttonRow__button__secondary">
                Servicios
              </Button>
            </Row>
            <Row className="navbar__responsive__col__buttonRow">
              <Button className="navbar__responsive__col__buttonRow__button__primary">
                Ingresar
              </Button>
            </Row>
          </div>
        </Collapse>
      </Row>
    </div>
  );
};

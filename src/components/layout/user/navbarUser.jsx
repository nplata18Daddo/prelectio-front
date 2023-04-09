import React, { useState } from "react";
import { Button, Col, Collapse, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logoPrelectio from "../../../assets/logo_prelectio.png";

export const NavBarUser = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log("==============Error handleLogout======================");
      console.log(error);
      console.log("====================================");
    }
  };

  console.log(props);
  return (
    <div>
      <Row className="navbar">
        <Col xs={4} lg={3} className="text-left navbar__col">
          {props.role === "athlete" && (
            <>
              <Link to="/athlete/messages">
                <img style={{ width: "50%" }} src={logoPrelectio}></img>
              </Link>
            </>
          )}
        </Col>
        <Col xs={8} lg={8} className="text-center navbar__col">
          <Row className="navbar__col__buttonRow">
            {props.role === "athlete" && (
              <>
                <Col xs={2}>
                  <Link to="/athlete/messages">
                    <Button className="navbar__col__buttonRow__button__secondary">
                      Mensajes
                    </Button>
                  </Link>
                </Col>
                <Col xs={2}>
                  <Link to="/athlete/profile">
                    <Button className="navbar__col__buttonRow__button__secondary">
                      Mi perfil
                    </Button>
                  </Link>
                </Col>

                <Col xs={2}>
                  <Button
                    className="navbar__col__buttonRow__button__primary"
                    onClick={handleLogout}
                  >
                    Salir
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
      <Row
        className="navbar__titulo"
        style={{ textAlign: "left", padding: "7rem" }}
      >
        <h1
          className="text-white display__large weight__bold"
          style={{ fontSize: "4rem" }}
        >
          {props.routeName}
        </h1>
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
            {props.role === "athlete" && (
              <>
                <Row className="navbar__responsive__col__buttonRow">
                  <Link to="/athlete/messages">
                    <Button className="navbar__responsive__col__buttonRow__button__secondary">
                      Mensajes
                    </Button>
                  </Link>
                </Row>
                <Row className="navbar__responsive__col__buttonRow">
                  <Link to="/athlete/profile">
                    <Button className="navbar__responsive__col__buttonRow__button__secondary">
                      Mi perfil
                    </Button>
                  </Link>
                </Row>

                <Row className="navbar__responsive__col__buttonRow">
                  <Link to="/login">
                    <Button
                      onClick={handleLogout}
                      className="navbar__responsive__col__buttonRow__button__primary"
                    >
                      Salir
                    </Button>
                  </Link>
                </Row>
              </>
            )}
          </div>
        </Collapse>
      </Row>
    </div>
  );
};

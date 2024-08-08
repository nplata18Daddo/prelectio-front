import React, { useState } from "react";
import { Button, Col, Collapse, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logoPrelectio from "../../../assets/logo_prelectio.png";
import { CODES } from "../../../consts/codes";
import { LogoutService } from "../../../services/authServices";

export const NavBarUser = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const userMail = user.email_usuario;
      const logout = async () => {
        const obj = { email: userMail };
        const [logout] = await Promise.all([LogoutService(obj)]);

        if (logout.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          setLoading(false);
          navigate("/");
        }
      };
      await logout();
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
          {props.role === "admin" && (
            <>
              <Link to="/admin/home">
                <img style={{ width: "50%" }} src={logoPrelectio}></img>
              </Link>
            </>
          )}
        </Col>
        <Col xs={8} lg={8} className="text-center navbar__col">
          <Row className="navbar__col__buttonRow">
            {props.role === "admin" && (
              <>
                <Col xs={2}>
                  <Link to="/admin/home">
                    <Button className="navbar__col__buttonRow__button__secondary">
                      Inicio
                    </Button>
                  </Link>
                </Col>
                <Col xs={2}>
                  <Link to="/admin/recruiters">
                    <Button className="navbar__col__buttonRow__button__secondary">
                      Reclutadores
                    </Button>
                  </Link>
                </Col>
                <Col xs={2}>
                  <Link to="/admin/athletes">
                    <Button className="navbar__col__buttonRow__button__secondary">
                      Deportistas
                    </Button>
                  </Link>
                </Col>
                <Col xs={2}>
                  <Button
                    className="navbar__col__buttonRow__button__primary"
                    onClick={handleLogout}
                  >
                    {loading ? <Spinner /> : "Salir"}
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
            <Link to="/admin/home" style={{ width: "fit-content" }}>
              <img style={{ width: "50%" }} src={logoPrelectio}></img>
            </Link>
          </Col>
        </Row>
        <Collapse in={open}>
          <div id="navbarCollapse">
            {props.role === "admin" && (
              <>
                <Row className="navbar__responsive__col__buttonRow">
                  <Link to="/admin/home">
                    <Button className="navbar__responsive__col__buttonRow__button__secondary">
                      Inicio
                    </Button>
                  </Link>
                </Row>
                <Row className="navbar__responsive__col__buttonRow">
                  <Link to="/admin/recruiters">
                    <Button className="navbar__responsive__col__buttonRow__button__secondary">
                      Reclutadores
                    </Button>
                  </Link>
                </Row>
                <Row className="navbar__responsive__col__buttonRow">
                  <Link to="/admin/athletes">
                    <Button className="navbar__responsive__col__buttonRow__button__secondary">
                      Deportistas
                    </Button>
                  </Link>
                </Row>
                <Row className="navbar__responsive__col__buttonRow">
                  <Link to="/login">
                    <Button
                      onClick={handleLogout}
                      className="navbar__responsive__col__buttonRow__button__primary"
                    >
                      {loading ? <Spinner /> : "Salir"}
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

import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoPrelectio from "../../../assets/logo_prelectio.png";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterCircle,
} from "react-icons/ai";

export const FooterUser = (props) => {
  return (
    <div>
      <div className="footer__degrade">
        <div className="footer__degrade__line" />
      </div>
      <Row className="footer">
        <Row className="footer__topRow">
          <Col xs={4} lg={3} className="text-left footer__topRow__col">
            {props.role === "admin" && (
              <>
                <Link to="/admin/home">
                  <img
                    alt={"logo"}
                    style={{ width: "40%" }}
                    src={logoPrelectio}
                  ></img>
                </Link>
              </>
            )}
          </Col>
          <Col xs={8} lg={8} className="text-center footer__topRow__col">
            <Row
              className="footer__topRow__col__buttonRow"
              style={{ justifyContent: "center" }}
            >
              {props.role === "admin" && (
                <>
                  <Col md={2} xs={12}>
                    <Link to="/admin/home">
                      <Button className="footer__topRow__col__buttonRow__button">
                        Inicio
                      </Button>
                    </Link>
                  </Col>
                  <Col md={2} xs={12}>
                    <Link to="/admin/recruiters">
                      <Button className="footer__topRow__col__buttonRow__button">
                        Reclutadores
                      </Button>
                    </Link>
                  </Col>
                  <Col md={2} xs={12}>
                    <Link to="/admin/athletes">
                      <Button className="footer__topRow__col__buttonRow__button">
                        Deportistas
                      </Button>
                    </Link>
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
        <div className="footer__separator">
          <div className="footer__separator__line"></div>
        </div>
        <Row className="footer__bottomRow">
          <Col xs={1} className="footer__bottomRow__SNCol">
            <Button className="footer__bottomRow__SNCol__SNButton">
              <AiFillFacebook className="footer__bottomRow__SNCol__SNButton__icon" />
            </Button>
          </Col>
          <Col xs={1} className="footer__bottomRow__SNCol">
            <Button className="footer__bottomRow__SNCol__SNButton">
              <AiFillInstagram className="footer__bottomRow__SNCol__SNButton__icon" />
            </Button>
          </Col>
          <Col xs={1} className="footer__bottomRow__SNCol">
            <Button className="footer__bottomRow__SNCol__SNButton">
              <AiFillTwitterCircle className="footer__bottomRow__SNCol__SNButton__icon" />
            </Button>
          </Col>
        </Row>
        <Row className="footer__signature">
          <h4>Developed by Daddo Software</h4>
        </Row>
      </Row>
    </div>
  );
};

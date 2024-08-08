import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import homeBanner from "../../../assets/home/HomeBanner.png";
export const Main = () => {
  return (
    <div className="home" id="home">
      <Row className="home__mainRow">
        <Col xs={12} md={6} className="home__mainRow__leftCol">
          <Container className="home__mainRow__leftCol__mainContainer">
            <Row className="home__mainRow__leftCol__mainContainer__title">
              <h1>Bienvenido a {"\n"}</h1>
              <h1>
                <span className="home__mainRow__leftCol__mainContainer__title__blueh1">
                  Prelectio
                </span>
              </h1>
            </Row>
            <Row>
              <h2>Encuentra oportunidades y </h2>
              <h2>busca talento en un solo lugar</h2>
            </Row>
            <Row className="home__mainRow__leftCol__mainContainer__buttonRow">
              <Link to="/register">
                <Button className="home__mainRow__leftCol__mainContainer__buttonRow__joinButton">
                  Únete
                </Button>
              </Link>
            </Row>
          </Container>
        </Col>
        <Col xs={12} md={6} className="home__mainRow__rightCol">
          <img
            loading="lazy"
            decoding="async"
            className="home__mainRow__rightCol__picture"
            src={homeBanner}
          ></img>
        </Col>
      </Row>
    </div>
  );
};

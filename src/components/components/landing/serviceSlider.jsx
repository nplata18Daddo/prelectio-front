import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export const ServiceSlider = (props) => {
  return (
    <div className="serviceSlider">
      <Container className="serviceSlider__container">
        <Row className="serviceSlider__container__mainRow">
          <Col
            xs={12}
            md={7}
            className="serviceSlider__container__mainRow__leftCol"
          >
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <Link to="/login">
              <Button className="serviceSlider__container__mainRow__leftCol__btn">
                Ingresa
              </Button>
            </Link>
          </Col>
          <Col
            xs={12}
            md={5}
            className="serviceSlider__container__mainRow__rightCol"
          >
            <img
              alt={""}
              className="serviceSlider__container__mainRow__rightCol__img"
              src={props.img}
            ></img>
            <img
              alt={""}
              className="serviceSlider__container__mainRow__rightCol__imgRes"
              src={props.imgRes}
            ></img>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

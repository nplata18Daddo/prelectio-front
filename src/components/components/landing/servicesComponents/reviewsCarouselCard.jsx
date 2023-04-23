import React from "react";
import { Col, Container, Row } from "react-bootstrap";
export const ReviewCard = (props) => {
  return (
    <div className="reviewCard">
      <Container className="reviewCard__container">
        <Row className="reviewCard__container__topRow">
          <h1>"{props.veredict} "</h1>
        </Row>
        <Row className="reviewCard__container__middleRow">
          <Col xs={{ offset: 0, span: 12 }} md={{ offset: 8, span: 4 }}>
            <h2>{props.name}</h2>
          </Col>
        </Row>
        <Row className="reviewCard__container__bottomRow">
          <Col xs={{ offset: 0, span: 12 }} md={{ offset: 8, span: 4 }}>
            <h2>{props.position}</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

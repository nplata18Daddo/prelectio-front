import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ReviewsCarousel } from "./reviewsCarousel";

export const Reviews = () => {
  return (
    <>
      <Row className="services__mainContainer__rowTitleReviews">
        <Col xs={12} style={{ marginBottom: "2rem" }}>
          <h1 className="services__mainContainer__rowTitleReviews__title text-center">
            ¿Qué sigue ahora?
          </h1>
        </Col>
        <Col xs={12} style={{ marginBottom: "6rem" }}>
          <Row className="justify-content-center">
            <Col xs={6} md={4}>
              <Button className="callToAction__mainContainer__mainRow__rightRow__button">
                <h1>Pasos a seguir</h1>
              </Button>
            </Col>
            <Col xs={6} md={4}>
              <Button className="callToAction__mainContainer__mainRow__rightRow__button">
                <h1>Video instructivo</h1>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="services__mainContainer__rowTitleReviews">
        <h1 className="services__mainContainer__rowTitleReviews__title text-center">
          Lo que la industria tiene que decir sobre Prelectio
        </h1>
      </Row>
      <ReviewsCarousel />
    </>
  );
};

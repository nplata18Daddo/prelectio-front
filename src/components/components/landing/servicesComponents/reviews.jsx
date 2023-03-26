import React from "react";
import { Row } from "react-bootstrap";
import { ReviewsCarousel } from "./reviewsCarousel";

export const Reviews = () => {
  return (
    <>
      <Row className="services__mainContainer__rowTitleReviews">
        <h1 className="services__mainContainer__rowTitleReviews__title">
          Lo que la industria tiene que decir sobre Prelectio
        </h1>
      </Row>
      <ReviewsCarousel />
    </>
  );
};

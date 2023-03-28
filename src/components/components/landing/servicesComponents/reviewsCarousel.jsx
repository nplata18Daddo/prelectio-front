import React from "react";
import { Carousel, Row } from "react-bootstrap";
import { ReviewCard } from "./reviewsCarouselCard";
import { reviews } from "./reviewsData";

export const ReviewsCarousel = () => {
  return (
    <Row className="services__mainContainer__rowCarouselReviews">
      <Carousel>
        {reviews.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <ReviewCard
                veredict={item.veredict}
                name={item.name}
                position={item.position}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Row>
  );
};

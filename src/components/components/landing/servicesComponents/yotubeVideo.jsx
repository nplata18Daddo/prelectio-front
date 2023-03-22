import React from "react";
import { Container, Row } from "react-bootstrap";

export const YoutubeVideo = (props) => {
  return (
    <Row className="services__mainContainer__videoRow">
      <Container className="services__mainContainer__videoRow__videoContainer">
        <iframe
          src={props.url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Prelectio"
        />
      </Container>
    </Row>
  );
};

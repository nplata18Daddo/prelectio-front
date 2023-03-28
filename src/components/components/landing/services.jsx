import { Col, Container, Row } from "react-bootstrap";
import {
  ImageCarousel,
  OportunitiesTalentCarousel,
  Reviews,
  YoutubeVideo,
} from "./servicesComponents/";

export const Services = () => {
  return (
    <div className="services">
      <Container className="services__mainContainer">
        <Row className="services__mainContainer__titleRow">
          <Col
            className="services__mainContainer__titleRow__titleCol"
            xs={{ offset: 1, span: 10 }}
            md={{ offset: 4, span: 4 }}
          >
            <h1 className="services__mainContainer__titleRow__titleCol__title">
              Servicios
            </h1>
          </Col>
        </Row>
        <OportunitiesTalentCarousel />
        <YoutubeVideo url={"https://www.youtube.com/embed/A2NqpFsg1dQ"} />
        <ImageCarousel/>
        <Reviews />
      </Container>
    </div>
  );
};

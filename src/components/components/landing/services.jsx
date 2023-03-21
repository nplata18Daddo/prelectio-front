import { Button, Col, Container, Row } from "react-bootstrap";

export const Services = () => {
  return (
    <div className="services">
      <Container className="services__mainContainer">
        <Row className="services__mainContainer__titleRow">
          <Col
            className="services__mainContainer__titleRow__titleCol"
            xs={12}
            md={{ offset: 4, span: 4 }}
          >
            <h1 className="services__mainContainer__titleRow__titleCol__title">
              Servicios
            </h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

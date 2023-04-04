import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoPrelectio from "../../assets/logo_prelectio.png";
export const NotFound = () => {
  return (
    <div className="login__background">
      <Row className="justify-content-center">
        <Col xs={10} md={4}>
          <Card body className="login__card " style={{ marginTop: "15rem" }}>
            <Row className="justify-content-center">
              <Col xs={12}>
                <img
                  className="login__logo mb-4"
                  src={LogoPrelectio}
                  alt="logo prelectio"
                ></img>
              </Col>
              <Col xs={12} className="mt-4">
                {" "}
                <h1 className="display__large text-white weight__bold mt-4">
                  Pagina no encontrada
                </h1>
              </Col>
              <Col xs={12} className="mt-5">
                <Link to="/">
                  {" "}
                  <Button
                    variant="primary"
                    className="login__submit display__small weight__bold"
                  >
                    {"Volver"}
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

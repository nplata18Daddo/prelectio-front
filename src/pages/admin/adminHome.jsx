import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CODES } from "../../consts/codes";
import { GetDashboardInfo } from "../../services/adminServices";

export const AdminHome = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardInfo, setDashboardInfo] = useState({});
  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const [dashboard] = await Promise.all([GetDashboardInfo()]);
        setLoading(false);
        // setLoading(false);
        if (
          dashboard.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST
        ) {
          setDashboardInfo(dashboard.data.responseMessage);
        }
      };

      fetchData();
    } catch (error) {
      setLoading(false);
    }
  }, []);
  return (
    <div>
      <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <Row>
          <Col xs={12} md={6}>
            <Link to="/admin/recruiters">
              <Button className="button__dashboard">Ver Reclutadores</Button>
            </Link>
          </Col>
          <Col xs={12} md={6}>
            <Link to="/admin/athletes">
              <Button className="button__dashboard">Ver Deportistas</Button>
            </Link>
          </Col>
        </Row>
        <div className="dashboard__container">
          <Row>
            <Col xs={12} md={4}>
              <Card body className="dashboard__card">
                <Row>
                  <Col xs={12}>
                    <p className="display__large text-white weight__bold">
                      {" "}
                      Reclutadores Registrados
                    </p>
                  </Col>
                  <Col xs={12}>
                    {" "}
                    <p className="display__large text-white weight__bold">
                      {" "}
                      {dashboardInfo.recruiters}
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row style={{ justifyContent: "right" }}>
            <Col xs={12} md={4}>
              <Card body className="dashboard__card">
                <Row>
                  <Col xs={12}>
                    <p className="display__large text-white weight__bold">
                      {" "}
                      Interacciones Totales
                    </p>
                  </Col>
                  <Col xs={12}>
                    {" "}
                    <p className="display__large text-white weight__bold">
                      {" "}
                      {dashboardInfo.messages}
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              {" "}
              <Card body className="dashboard__card">
                <Row>
                  <Col xs={12}>
                    <p className="display__large text-white weight__bold">
                      {" "}
                      Deportistas Registrados
                    </p>
                  </Col>
                  <Col xs={12}>
                    <p className="display__large text-white weight__bold">
                      {" "}
                      {dashboardInfo.athletes}
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

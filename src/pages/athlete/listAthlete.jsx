import React, { useEffect, useState } from "react";
import { Container, Row, Form, InputGroup, Col } from "react-bootstrap";
import { CODES } from "../../consts/codes";
import { GetDeportistas } from "../../services/deportistaServices";

export const ListAthletes = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [athletes, setAthletes] = useState([]);
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [messages] = await Promise.all([GetDeportistas()]);

      if (messages.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
        setLoading(false);
        setAthletes(messages.data.responseMessage);
        setFilteredAthletes(messages.data.responseMessage);
      }
    };

    fetchData();
  }, [refresh]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    let filteredAthletes = athletes.filter((item) => {
      return item.usuario.nombre_usuario.toLowerCase().includes(value);
    });
    setFilteredAthletes(filteredAthletes);
  };
  return (
    <div className="listAthletes">
      <Container style={{ marginTop: "3rem", marginBottom: "5rem" }}>
        <div className="listAthletes__container">
          <Row style={{ margin: "0" }}>
            <InputGroup>
              <InputGroup.Text className="display__small">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                className=""
                type="search"
                placeholder="Buscar por nombre"
                aria-label="Search"
                onChange={handleSearch}
              />
            </InputGroup>
          </Row>
          <Row style={{ marginBottom: "2vh" }}>
            <Col xs={6} md={3}></Col>
          </Row>
          <Row className="listAthletes__listWrapper">
            {filteredAthletes.map((item, index) => {
              return (
                <h4 key={index}>
                  {"------------------------------------------- \n" +
                    JSON.stringify(item) +
                    "------------------------------------------- \n"}
                </h4>
              );
            })}
          </Row>
        </div>
      </Container>
    </div>
  );
};

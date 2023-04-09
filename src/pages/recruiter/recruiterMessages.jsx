import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import { MailRecruiterDetail } from "../../components/components/mailRecruiters/mailRecruiterDetail";
import { MailRecruiterContent } from "../../components/components/mailRecruiters/mailRecruiterContent";
import { CODES } from "../../consts/codes";
import { ChangeMessageOpened } from "../../services/deportistaServices";
import { GetMessagesReclutador } from "../../services/recruiterServices";

export const RecruiterMessages = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showFiltered, setShowFiltered] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const obj = {
        id: user.id_usuario,
      };

      const [messages] = await Promise.all([GetMessagesReclutador(obj)]);

      if (messages.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
        setLoading(false);
        setEmails(messages.data.responseMessage);

        setFilteredEmails(messages.data.responseMessage);
      }
    };

    fetchData();
  }, [refresh]);

  const handleClickEmail = (item) => {
    setSelectedItem(item);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    let filteredEmails = emails.filter((item) => {
      return item.usuario_de.nombre_usuario.toLowerCase().includes(value);
    });
    setFilteredEmails(filteredEmails);
  };
  return (
    <Container style={{ marginTop: "3rem", marginBottom: "5rem" }}>
      <div className="mail__container">
        <Row style={{ margin: "0" }}>
          <Col xs={12} className="mail__searchBar">
            <li style={{ listStyle: "none" }}>
              <ul onClick={() => setShowFiltered(false)}>
                Mensajes Enviados({emails.length})
              </ul>

              <ul>
                <Form.Control
                  className="messages__searchBar"
                  type="search"
                  placeholder="Buscar por destinatario"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </ul>
            </li>
          </Col>
          <Col className="email-list__wrapper" xs={12} md={4}>
            {filteredEmails.map((item, i) => {
              return (
                <MailRecruiterDetail
                  key={item.id_mensaje}
                  email={item}
                  handleClick={() => handleClickEmail(item)}
                />
              );
            })}
          </Col>
          <Col className="email-details__wrapper" xs={12} md={8}>
            <MailRecruiterContent
              selectedItem={selectedItem}
              mails={filteredEmails}
              loading={loading}
            />
          </Col>

          <Col className="mail__footer" xs={12}></Col>
        </Row>
      </div>
    </Container>
  );
};

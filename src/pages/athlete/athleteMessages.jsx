import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { MailContent } from "../../components/components/mail/mailContent";
import { MailDetail } from "../../components/components/mail/mailDetail";
import { CODES } from "../../consts/codes";
import {
  ChangeMessageOpened,
  GetMessagesDeportista,
} from "../../services/deportistaServices";

export const AthleteMessages = () => {
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

      const [messages] = await Promise.all([GetMessagesDeportista(obj)]);

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
    handleUpdateOpened(item);
  };

  const handleUpdateOpened = async (item) => {
    if (!item.leido_mensaje) {
      const obj = {
        id: item.id_mensaje,
      };
      const [messages] = await Promise.all([ChangeMessageOpened(obj)]);
      if (messages.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
        const originalState = [...emails];
        const originalStateFiltered = [...filteredEmails];
        const objectToUpdate = originalState.find(
          (obj) => obj.id_mensaje === item.id_mensaje
        );
        const updatedObject = { ...objectToUpdate, leido_mensaje: true };
        const newArray = originalState.map((obj) =>
          obj.id_mensaje === item.id_mensaje ? updatedObject : obj
        );

        const newArrayFiltered = originalStateFiltered.map((obj) =>
          obj.id_mensaje === item.id_mensaje ? updatedObject : obj
        );
        setFilteredEmails(newArrayFiltered);
        setEmails(newArray);
      }
    }
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
                Mensajes recibidos({emails.length})
              </ul>
              <ul onClick={() => setShowFiltered(true)}>
                Mensajes sin leer(
                {emails.filter((item) => !item.leido_mensaje).length})
              </ul>

              <ul>
                <Form.Control
                  className="messages__searchBar"
                  type="search"
                  placeholder="Buscar por remitente"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </ul>
            </li>
          </Col>
          <Col className="email-list__wrapper" xs={12} md={4}>
            {filteredEmails.map((item, i) => {
              if (showFiltered && !item.leido_mensaje) {
                return (
                  <MailDetail
                    key={item.id_mensaje}
                    email={item}
                    handleClick={() => handleClickEmail(item)}
                  />
                );
              } else if (!showFiltered) {
                return (
                  <MailDetail
                    key={item.id_mensaje}
                    email={item}
                    handleClick={() => handleClickEmail(item)}
                  />
                );
              }
            })}
          </Col>
          <Col className="email-details__wrapper" xs={12} md={8}>
            <MailContent
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

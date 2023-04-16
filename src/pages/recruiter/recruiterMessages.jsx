import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { MailRecruiterDetail } from "../../components/components/mailRecruiters/mailRecruiterDetail";
import { MailRecruiterContent } from "../../components/components/mailRecruiters/mailRecruiterContent";
import { CODES } from "../../consts/codes";
import { ChangeMessageOpened } from "../../services/deportistaServices";
import {
  GetMessagesReclutador,
  GetMessagesReclutadorReceived,
} from "../../services/recruiterServices";
import { MailDetail } from "../../components/components/mail/mailDetail";
import { MailContent } from "../../components/components/mail/mailContent";

export const RecruiterMessages = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);

  const [emailsReceived, setEmailsReceived] = useState([]);
  const [filteredEmailsReceived, setFilteredEmailsReceived] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showFiltered, setShowFiltered] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [showSent, setShowSent] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const obj = {
        id: user.id_usuario,
      };

      const [messages, received] = await Promise.all([
        GetMessagesReclutador(obj),
        GetMessagesReclutadorReceived(obj),
      ]);

      if (messages.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
        setLoading(false);
        setEmails(messages.data.responseMessage);

        setFilteredEmails(messages.data.responseMessage);
      }

      if (received.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
        setLoading(false);
        setEmailsReceived(received.data.responseMessage);

        setFilteredEmailsReceived(received.data.responseMessage);
      }
    };

    fetchData();
  }, [refresh]);

  const handleClickEmail = (item) => {
    setSelectedItem(item);
    if (!showSent) {
      handleUpdateOpened(item);
    }
  };

  const handleSearch = (event) => {
    if (showSent) {
      const value = event.target.value.toLowerCase();
      let filteredEmails = emails.filter((item) => {
        return item.usuario_para.nombre_usuario.toLowerCase().includes(value);
      });
      setFilteredEmails(filteredEmails);
    } else {
      const value = event.target.value.toLowerCase();
      let filteredEmails = emailsReceived.filter((item) => {
        return item.usuario_de.nombre_usuario.toLowerCase().includes(value);
      });
      setFilteredEmailsReceived(filteredEmails);
    }
  };

  const handleUpdateOpened = async (item) => {
    if (!item.leido_mensaje) {
      const obj = {
        id: item.id_mensaje,
      };
      const [messages] = await Promise.all([ChangeMessageOpened(obj)]);
      if (messages.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
        const originalState = [...emailsReceived];
        const originalStateFiltered = [...filteredEmailsReceived];
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
        setFilteredEmailsReceived(newArrayFiltered);
        setEmailsReceived(newArray);
      }
    }
  };
  return (
    <Container style={{ marginTop: "3rem", marginBottom: "5rem" }}>
      <Row style={{ justifyContent: "end" }} className="mb-4">
        <Col xs={3}>
          <Button
            style={{ fontSize: "14px" }}
            className="login__submit display__label weight__bold"
            variant="primary"
            onClick={() => {
              setRefresh(!refresh);
            }}
            type="submit"
          >
            Actualizar
          </Button>
        </Col>
      </Row>
      <div className="mail__container">
        <Row style={{ margin: "0" }}>
          <Col xs={12} className="mail__searchBar">
            <li style={{ listStyle: "none" }}>
              <ul
                onClick={() => {
                  setSelectedItem(null);
                  setShowFiltered(false);
                  setShowSent(false);
                }}
              >
                Mensajes recibidos({emailsReceived.length})
              </ul>
              <ul
                onClick={() => {
                  setSelectedItem(null);
                  setShowFiltered(true);
                  setShowSent(false);
                }}
              >
                Mensajes sin leer(
                {emailsReceived.filter((item) => !item.leido_mensaje).length})
              </ul>
              <ul
                onClick={() => {
                  setSelectedItem(null);
                  setShowSent(true);
                }}
              >
                Mensajes Enviados({emails.length})
              </ul>

              <ul>
                <Form.Control
                  className="messages__searchBar"
                  type="search"
                  placeholder="Buscar correo"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </ul>
            </li>
          </Col>
          <Col className="email-list__wrapper" xs={12} md={4}>
            {showSent
              ? filteredEmails.map((item, i) => {
                  return (
                    <MailRecruiterDetail
                      key={item.id_mensaje}
                      email={item}
                      handleClick={() => handleClickEmail(item)}
                    />
                  );
                })
              : filteredEmailsReceived.map((item, i) => {
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
            {showSent ? (
              <MailRecruiterContent
                refresh={refresh}
                setRefresh={setRefresh}
                selectedItem={selectedItem}
                mails={filteredEmails}
                loading={loading}
              />
            ) : (
              <MailContent
                refresh={refresh}
                setRefresh={setRefresh}
                reply={true}
                selectedItem={selectedItem}
                mails={filteredEmails}
                loading={loading}
              />
            )}
          </Col>

          <Col className="mail__footer" xs={12}></Col>
        </Row>
      </div>
    </Container>
  );
};

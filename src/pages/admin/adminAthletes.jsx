import { Box } from "@mui/material";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MailContent } from "../../components/components/mail/mailContent";
import { MailDetail } from "../../components/components/mail/mailDetail";

export const AdminAthletes = () => {
  const [emails, setEmails] = useState([
    {
      subject: "nestor marica tenemos que hablar",
      email: "nplata18@hotmail.com",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
    {
      subject: "nestor marica tenemos que hablar",
      from: "Daniela Plata",
      date: new Date(),
      read: false,
      content:
        "no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa no joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfano joda marica hace rato no hablamos lorem ipsim loremdsdfafasdfafasdfasdfa",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickEmail = (item) => {
    setSelectedItem(item);
  };
  return (
    <Container style={{ marginTop: "3rem", marginBottom: "5rem" }}>
      <div className="mail__container">
        <Row style={{ margin: "0" }}>
          <Col xs={12} className="mail__searchBar">
            <li style={{ listStyle: "none" }}>
              <ul>Mensajes recibidos</ul>
              <ul>Mensajes sin leer</ul>
            </li>
          </Col>
          <Col className="email-list__wrapper" xs={12} md={4}>
            {emails.map((item, i) => {
              return (
                <MailDetail
                  idx={i}
                  email={item}
                  handleClick={() => handleClickEmail(item)}
                />
              );
            })}
          </Col>
          <Col className="email-details__wrapper" xs={12} md={8}>
            <MailContent selectedItem={selectedItem} />
          </Col>

          <Col className="mail__footer" xs={12}></Col>
        </Row>
      </div>
    </Container>
  );
};

import React, { useState } from "react";
import { ServiceSlider } from "../serviceSlider";
import oportunidadesImg from "../../../../assets/home/talentsFull.png";
import oportunidadesImgRes from "../../../../assets/home/talentsPreview.png";
import talentoImg from "../../../../assets/home/recruitersFull.png";
import talentoImgRes from "../../../../assets/home/recruitersPreview.png";
import { Button, Carousel, Col, Row } from "react-bootstrap";

export const OportunitiesTalentCarousel = () => {
  const [activeServiceCarousel, setActiveServiceCarousel] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setActiveServiceCarousel(selectedIndex);
  };
  return (
    <>
      <Row className="services__mainContainer__TalentOportunitiesRow">
        <Col xs={12} md={4}>
          <Button
            className="services__mainContainer__TalentOportunitiesRow__talentOportunitesButton"
            id={activeServiceCarousel === 0 ? "seleccionado" : ""}
            onClick={() => {
              setActiveServiceCarousel(0);
            }}
          >
            Buscar Oportunidades
          </Button>
        </Col>
        <Col xs={12} md={4}>
          <Button
            id={activeServiceCarousel === 1 ? "seleccionado" : ""}
            className="services__mainContainer__TalentOportunitiesRow__talentOportunitesButton"
            onClick={() => {
              setActiveServiceCarousel(1);
            }}
          >
            Buscar Talentos
          </Button>
        </Col>
      </Row>
      <Row className="services__mainContainer__ServicesCarouselRow">
        <Carousel onSelect={handleSelect} activeIndex={activeServiceCarousel}>
          <Carousel.Item>
            <ServiceSlider
              title={"Busca Oportunidades"}
              content={
                "Esta plataforma te brinda la posibilidad de demostrar tus habilidades deportivas al mundo, otorgándote una oportunidad única de obtener una mayor exposición en tu disciplina. Además, elimina obstáculos como la distancia y el tiempo para que puedas mostrar tu talento sin limitaciones."
              }
              img={oportunidadesImg}
              imgRes={oportunidadesImgRes}
            />
          </Carousel.Item>
          <Carousel.Item>
            <ServiceSlider
              title={"Busca Talentos"}
              content={
                "Uniéndote a Prelectio tendrás acceso a un amplio portafolio de deportistas de alto rendimiento disponibles en todos los rincones del país, brindándote información esencial para tu proceso de selección. Siendo la solución integral que necesitas para encontrar a los mejores deportistas y llevar tus proyectos deportivos al siguiente nivel."
              }
              img={talentoImg}
              imgRes={talentoImgRes}
            />
          </Carousel.Item>
        </Carousel>
      </Row>
    </>
  );
};

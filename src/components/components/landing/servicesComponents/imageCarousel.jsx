import React from "react";
import Slider from "react-slick";

export const ImageCarousel = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
  };
  const settingsResponsive = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  function importAll(r) {
    let images = [];
    r.keys().forEach((item, index) => {
      images[index] = r(item);
    });
    return images;
  }
  const images = importAll(
    require.context(
      "../../../../assets/home/imgsCarousel",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  return (
    <>
      <div className="imgCarousel">
        <Slider {...settings}>
          {images.map((item, index) => {
            return (
              <div className="imgCarousel__imgContainer" key={index}>
                <img className="imgCarousel__imgContainer__img" src={item} />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="imgCarouselResponsive">
        <Slider {...settingsResponsive}>
          {images.map((item, index) => {
            return (
              <div className="imgCarousel__imgContainer" key={index}>
                <img className="imgCarousel__imgContainer__img" src={item} />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

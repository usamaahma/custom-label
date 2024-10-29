import React from "react";
import Slider from "react-slick";
import "./alicecarousel.css";

const logos = [
  { src: "../images/alice1.png", alt: "Brand Logo 1" },
  { src: "../images/alice2.png", alt: "Brand Logo 2" },
  { src: "../images/alice3.png", alt: "Brand Logo 3" },
  { src: "../images/alice4.png", alt: "Brand Logo 4" },
  { src: "../images/alice5.png", alt: "Brand Logo 5" },
  { src: "../images/alice6.png", alt: "Brand Logo 6" },
  { src: "../images/alice7.png", alt: "Brand Logo 7" },
  { src: "../images/alice8.png", alt: "Brand Logo 8" },
  { src: "../images/alice9.png", alt: "Brand Logo 9" },
  { src: "../images/alice10.png", alt: "Brand Logo 10" },
  { src: "../images/alice11.png", alt: "Brand Logo 11" },
  { src: "../images/alice12.png", alt: "Brand Logo 12" },
];

const Alice = () => {
  // Slick slider settings
  const settings = {
    infinite: true,
    speed: 3000, // Speed for smooth scrolling
    slidesToShow: 8, // Number of logos to show at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // 0 means it constantly moves without delay
    cssEase: "linear", // Linear scroll for seamless effect
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="trusted">
      <h2 className="trustedtext"> TRUSTED BY OVER 25,000 BRANDS</h2>
      <Slider {...settings} className="scrolling-slider">
        {logos.map((logo, index) => (
          <div key={index} className="logo-container">
            <img src={logo.src} alt={logo.alt} className="logo" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Alice;

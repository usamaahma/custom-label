import React from "react";
import "./alicecarousel.css";
import { useSpring, animated } from "@react-spring/web";

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
  { src: "../images/alice1.png", alt: "Brand Logo 1" },
  { src: "../images/alice2.png", alt: "Brand Logo 2" },
  { src: "../images/alice3.png", alt: "Brand Logo 3" },
  { src: "../images/alice4.png", alt: "Brand Logo 4" },
  { src: "../images/alice5.png", alt: "Brand Logo 5" },
  { src: "../images/alice6.png", alt: "Brand Logo 6" },
];

const Alice = () => {
  const props = useSpring({
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(-100%)" },
    config: { duration: 20000 }, // Duration in milliseconds
    reset: true,
    loop: true, // Makes the animation loop indefinitely
  });

  return (
    <div className="trusted">
      <h2 className="trustedtext"> TRUSTED BY OVER 25,000 BRANDS</h2>
      <div className="scrolling-text">
        <animated.div className="scroll-animation" style={props}>
          {logos.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} className="logo" />
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default Alice;

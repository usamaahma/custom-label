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
];

const Alice = () => {
  const props = useSpring({
    from: { transform: "translateX(0%)" },
    to: { transform: "translateX(-50%)" }, // Move half the width of the logos
    config: { duration: 30000 }, // Duration for scrolling
    reset: true,
    loop: true, // Makes the animation loop indefinitely
  });

  return (
    <div className="trusted">
      <h2 className="trustedtext"> TRUSTED BY OVER 25,000 BRANDS</h2>
      <div className="scrolling-text">
        <animated.div className="scroll-animation" style={props}>
          <div className="logo-container">
            {/* Original logos */}
            {logos.map((logo, index) => (
              <img key={index} src={logo.src} alt={logo.alt} className="logo" />
            ))}
            {/* Duplicate logos for seamless scrolling */}
            {logos.map((logo, index) => (
              <img key={`duplicate-${index}`} src={logo.src} alt={logo.alt} className="logo" />
            ))}
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default Alice;

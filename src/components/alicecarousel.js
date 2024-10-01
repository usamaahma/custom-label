import React from 'react';
import './alicecarousel.css'; 
import { useSpring, animated } from '@react-spring/web';

// Import your logos here
import logo1 from '../assests/images/pintrest.png';
import logo2 from '../assests/images/pintrest.png';
import logo3 from '../assests/images/pintrest.png';
import logo4 from '../assests/images/pintrest.png';
import logo5 from '../assests/images/pintrest.png';
import logo6 from '../assests/images/pintrest.png';

const Alice = () => {
  const props = useSpring({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(-100%)' },
    config: { duration: 20000 }, // Duration in milliseconds
    reset: true,
    loop: true, // Makes the animation loop indefinitely
  });

  return (
    <div className="trusted"> 
      <h2 className="trustedtext"> TRUSTED BY OVER 25,000 BRANDS</h2>
    <div className="scrolling-text">
      <animated.div className="scroll-animation" style={props}>
        <img src={logo1} alt="Brand Logo 1" className="logo" />
        <img src={logo2} alt="Brand Logo 2" className="logo" />
        <img src={logo3} alt="Brand Logo 3" className="logo" />
        <img src={logo4} alt="Brand Logo 4" className="logo" />
        <img src={logo5} alt="Brand Logo 5" className="logo" />
        <img src={logo6} alt="Brand Logo 6" className="logo" />
        <img src={logo1} alt="Brand Logo 1" className="logo" />
        <img src={logo2} alt="Brand Logo 2" className="logo" />
        <img src={logo3} alt="Brand Logo 3" className="logo" />
        <img src={logo4} alt="Brand Logo 4" className="logo" />
        <img src={logo5} alt="Brand Logo 5" className="logo" />
        <img src={logo6} alt="Brand Logo 6" className="logo" />
      </animated.div>
    </div>
    </div>
  );
};

export default Alice;

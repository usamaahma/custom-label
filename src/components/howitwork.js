import React from 'react';
import "./howitwork.css";
import { Slide} from 'react-awesome-reveal';

function Howitwork() {
  return (
    <div className='txtmain'>
      <p className='how'>How it Works</p>
      <p className='at'>At Custom Woven Labels, we email you a Free Digital Proof and Free Photo Sample of your custom product to ensure your 100% satisfaction before production begins.</p>
      
      <div className='image-row'>
        <div className='image-item'>
          <img src="../../images/upload.png" alt="Upload" className='step-image' />
          <p className='image-text'>Upload Artwork</p>
        </div>
        <div className='image-item'>
        <Slide cascade> <img src="../../images/arrow.svg" alt="Arrow" className='step-image1' /> </Slide>
          
        </div>
        <div className='image-item'>
          <img src="../../images/approve.png" alt="Approve" className='step-image' />
          <p className='image-text'>Approve Digital Proof</p>
        </div>
        <div className='image-item'>
        <Slide cascade><img src="../../images/arrow.svg" alt="Approve" className='step-image1' /></Slide>
           
        </div>
        <div className='image-item'>
          <img src="../../images/receive.png" alt="Approve" className='step-image' />
          <p className='image-text'>Receive Order</p>
        </div>
      </div>
    </div>
  );
}

export default Howitwork;

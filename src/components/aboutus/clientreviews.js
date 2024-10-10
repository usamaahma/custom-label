import React from "react";
import AliceCarousel from "react-alice-carousel";
import { Card, Avatar } from "antd";
import { Rate } from "antd";
import "react-alice-carousel/lib/alice-carousel.css";
import "./clientreviews.css";

// Carousel items
const carouselItems = [
  {
    img: "../images/client.jpg",
    name: "John Wick",
    occupation: "Broker – About Roatan Real Estate",
    review:
      "“Thrive exceeded our expectations in every way. They are honest, reliable, and handle all needs quickly. They deliver on their promises without any fuss.”",
  },
  {
    img: "../images/client.jpg",
    name: "ACP",
    occupation: "Practice Manager – PARC Urology",
    review:
      "“Thrive is incredible. They helped us grow our business so much that our biggest challenge now is managing the overflow. We're exactly where we wanted to be, thanks to them.”",
  },
  {
    img: "../images/client.jpg",
    name: "NINI",
    occupation: "CEO – Accurate Leak and Line",
    review:
      "“Working with Thrive has been a pleasure. Their dedication, exceptional support, and attention to our needs make us excited for a long-term partnership.”",
  },
];

// Render carousel items
const renderItems = () =>
  carouselItems.map((item, index) => (
    <div className="carousel-item-content" key={index}>
      <Card className="carousel-card">
        <Avatar className="avatar-review" src={item.img} />
        <h5>{item.name}</h5>
        <Rate disabled defaultValue={5} />
        <p>{item.review}</p>
      </Card>
    </div>
  ));

const Car = () => {
  const carouselRef = React.useRef(null);

  const slidePrev = () => carouselRef.current.slidePrev();
  const slideNext = () => carouselRef.current.slideNext();

  return (
    <div className="customerdiv">
      <h2 className="customers">What Our Customers Say</h2>
      <p className="customer">
        Client highlighting our services and successful results.
      </p>
      <div className="carousel-wrapper">
        <div className="carousel-container1">
          <AliceCarousel
            ref={carouselRef}
            items={renderItems()}
            responsive={{
              0: { items: 1 },
              568: { items: 2 },
              1024: { items: 3 },
            }}
            controlsStrategy="alternate"
            autoPlay
            autoPlayInterval={3000}
            infinite
          />
        </div>
      </div>
    </div>
  );
};

export default Car;

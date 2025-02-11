import React from "react";
import { Helmet } from "react-helmet";
import Herosec1 from "../components/herosection/hero";
import Alice from "../components/alicecarousel";
import Customclothing from "../components/customclothing";
import Custompatches from "../components/custompatches";
import Howitwork from "../components/howitwork";
import Samplepack from "../components/samplepack";
import Offers1 from "../components/offers";
import Formcustom1 from "../components/formcustom";
import Question from "../components/question";
import Featureproduct from "../components/featureproduct";
import Faq1 from "../components/faq";
import "./landing.css";
import Getaquote1 from "../components/getaquote";

function Landingpage() {
  return (
    <div className="landingback">
      <Helmet>
        <title>My Website - Best Products & Services</title>
        <meta
          name="description"
          content="Welcome to My Website. Discover amazing products and services here!"
        />
        <meta
          name="keywords"
          content="ecommerce, products, services, shopping"
        />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "My Website",
            "url": "https://www.mywebsite.com"
          }`}
        </script>
      </Helmet>
      <Herosec1 />
      <Alice />
      <Featureproduct />
      <Customclothing />
      <Howitwork />
      <Samplepack />
      <Offers1 />
      <Getaquote1 />
      <Question />
      <Faq1 />
      {/* <Thankyou1/> */}
    </div>
  );
}

export default Landingpage;

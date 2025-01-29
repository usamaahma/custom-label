import React from "react";
import Wovenlabelhero from "../components/woven-label/wovenlabelhero";
import Wovenlabeldesc from "../components/woven-label/wovenlabeldesc";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";
import { Helmet } from "react-helmet"; // Import Helmet

function Wovenlabelpage() {
  return (
    <div className="landingback">
      <Helmet>
        <title>Woven Labels - High-Quality Custom Labels for Your Products</title>
        <meta
          name="description"
          content="Discover high-quality woven labels to personalize your products. Custom labels designed for durability and style."
        />
        <meta
          name="keywords"
          content="woven labels, custom labels, product labels, high-quality labels, personalized labels"
        />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Custom Woven Labels",
            "description": "Discover high-quality woven labels to personalize your products. Custom labels designed for durability and style.",
            "url": "https://www.mywebsite.com/wovenlabels",
            "image": "https://www.mywebsite.com/images/woven-label.jpg"
          }`}
        </script>
      </Helmet>
      
      <Wovenlabeldesc />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />
    </div>
  );
}

export default Wovenlabelpage;

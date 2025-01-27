import React from "react";
import { Helmet } from "react-helmet";
import Clothingcard from "../components/clothingsection/Clothingcard";

function Allclothingpage() {
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
      <Clothingcard />{" "}
    </div>
  );
}

export default Allclothingpage;

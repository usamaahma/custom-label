import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Customcottonhero from "../components/custom-cotton-label/customcottonhero";
import Customcottontable from "../components/custom-cotton-label/customcottontable";

function Customcottonpage() {
  return (
    <div className="landingback">
      <Customcottonhero />
      <Customcottontable />
      <GoogleReviews />
    </div>
  );
}

export default Customcottonpage;

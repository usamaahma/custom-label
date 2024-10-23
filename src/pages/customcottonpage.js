import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Customcottonhero from "../components/custom-cotton-label/customcottonhero";
 import Descriptionexpress from "../components/expressclothing/descriptionexpress";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";

function Customcottonpage() {
  return (
    <div className="landingback">
      <Customcottonhero />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />
    </div>
  );
}

export default Customcottonpage;

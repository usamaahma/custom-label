import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Expressmain from "../components/expressclothing/expressmain";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";

function Expressclothing() {
  return (
    <div className="landingback">
      <Expressmain />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />
    </div>
  );
}

export default Expressclothing;

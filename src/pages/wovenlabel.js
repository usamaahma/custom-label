import React from "react";
import Wovenlabelhero from "../components/woven-label/wovenlabelhero";
import Wovenlabeldesc from "../components/woven-label/wovenlabeldesc";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";

function Wovenlabelpage() {
  return (
    <div className="landingback">
      <Wovenlabeldesc />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />
    </div>
  );
}

export default Wovenlabelpage;

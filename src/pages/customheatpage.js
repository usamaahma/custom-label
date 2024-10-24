import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Heathero from "../components/custom-heat-label/heathero";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";

function Customheatpage() {
  return (
    <div className="landingback">
      <Heathero />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />{" "}
    </div>
  );
}

export default Customheatpage;

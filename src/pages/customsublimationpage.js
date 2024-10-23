import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Sublimationhero from "../components/custom-sublimation/sublimationhero";
 import Faqexpress1 from "../components/expressclothing/faqexpress";
import Finalprocess from "../components/expressclothing/finalprocess";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";

function Customsublimationpage() {
  return (
    <div className="landingback">
      <Sublimationhero />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />{" "}
    </div>
  );
}

export default Customsublimationpage;

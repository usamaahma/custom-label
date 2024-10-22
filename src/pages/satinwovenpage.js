import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Satinhero from "../components/satin-woven/satinhero";
 import Finalprocess from "../components/expressclothing/finalprocess";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";
import Faqexpress1 from "../components/expressclothing/faqexpress";

function Satinwovenpage() {
  return (
    <div className="landingback">
      <Satinhero />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />
    </div>
  );
}

export default Satinwovenpage;

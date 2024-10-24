import React from "react";
import Tpuhero1 from "../components/tpu-labels/tpuhero";
import Tputabel1 from "../components/tpu-labels/tputabel";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";

function Tpulabelspage1() {
  return (
    <div className="landingback">
      <Tpuhero1 />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />{" "}
    </div>
  );
}

export default Tpulabelspage1;

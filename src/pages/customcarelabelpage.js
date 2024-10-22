import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Carehero from "../components/custom-care-label/carehero";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";

function CustomCareLabelPage() {
  return (
    <div className="landingback">
      <Carehero />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />{" "}
    </div>
  );
}

export default CustomCareLabelPage;

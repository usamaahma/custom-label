import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Carehero from "../components/custom-care-label/carehero";
import Caretable from "../components/custom-care-label/caretable";

function CustomCareLabelPage() {
  return (
    <div className="landingback">
      <Carehero />
      <Caretable />
      <GoogleReviews />
    </div>
  );
}

export default CustomCareLabelPage;

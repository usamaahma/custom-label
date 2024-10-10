import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Heathero from "../components/custom-heat-label/heathero";
import Heattable from "../components/custom-heat-label/heattable";

function Customheatpage() {
  return (
    <div>
      <Heathero />
      <Heattable />
      <GoogleReviews />
    </div>
  );
}

export default Customheatpage;

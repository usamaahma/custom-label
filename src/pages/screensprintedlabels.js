import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Screenprintedhero from "../components/screen-printed-labels/screenprintedhero";
import Screenprintedtable from "../components/screen-printed-labels/screenprintedtable";

function Screenprintedlabels() {
  return (
    <div className="landingback">
      <Screenprintedhero />
      <Screenprintedtable />
      <GoogleReviews />
    </div>
  );
}

export default Screenprintedlabels;

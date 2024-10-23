import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Screenprintedhero from "../components/screen-printed-labels/screenprintedhero";
import Screenprintedtable from "../components/screen-printed-labels/screenprintedtable";
import Bestcustom from "../components/custom-woven/bestcustom";
import Wovendesign from "../components/custom-woven/wovendesign";
import Lastbest from "../components/custom-woven/lastbest";
import Faqexpress1 from "../components/expressclothing/faqexpress";

function Screenprintedlabels() {
  return (
    <div className="landingback">
      <Screenprintedhero />
      <Bestcustom />
      <Wovendesign />
      <Lastbest />
      <Faqexpress1 />
      <GoogleReviews />
    </div>
  );
}

export default Screenprintedlabels;

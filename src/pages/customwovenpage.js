import React from "react";
import Wovenhero from "../components/custom-woven/wovenhero";
import Woventable from "../components/custom-woven/woventable";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Bestcustom from "../components/custom-woven/bestcustom";
import Wovendesign from "../components/custom-woven/wovendesign";
import Lastbest from "../components/custom-woven/lastbest";

function CustomWovenPage() {
  return (
    <div className="landingback">
      <Wovenhero />
      <Woventable />
      <GoogleReviews />
      <Bestcustom />
      <Wovendesign />
      <Lastbest />
    </div>
  );
}

export default CustomWovenPage;

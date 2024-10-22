import React from "react";
import Wovenhero from "../components/custom-woven/wovenhero";
import Woventable from "../components/custom-woven/woventable";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Bestcustom from "../components/custom-woven/bestcustom";
import Wovendesign from "../components/custom-woven/wovendesign";
import Lastbest from "../components/custom-woven/lastbest";
import Faqexpress1 from "../components/expressclothing/faqexpress";

function CustomWovenPage() {
  return (
    <div className="landingback">
      <Wovenhero />
      <Bestcustom />
      <Wovendesign />
      <Lastbest />
      <Faqexpress1 />
      <GoogleReviews />
    </div>
  );
}

export default CustomWovenPage;

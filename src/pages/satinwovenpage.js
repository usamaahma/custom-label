import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Satinhero from "../components/satin-woven/satinhero";
import Satintable from "../components/satin-woven/satintable";

function Satinwovenpage() {
  return (
    <div className="landingback">
      <Satinhero />
      <Satintable />
      <GoogleReviews />
    </div>
  );
}

export default Satinwovenpage;

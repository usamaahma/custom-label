import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Tyvekhero from "../components/custom-tyvek/tyvekhero";
import Tyvektable from "../components/custom-tyvek/tyvektable";

function Customtyvekpage() {
  return (
    <div className="landingback">
      <Tyvekhero />
      <Tyvektable />
      <GoogleReviews />
    </div>
  );
}

export default Customtyvekpage;

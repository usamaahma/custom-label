import React from "react";
import Wovenlabelhero from "../components/woven-label/wovenlabelhero";
import Wovenlabeldesc from "../components/woven-label/wovenlabeldesc";
import GoogleReviews from "../components/expressclothing/googlereviews";

function Wovenlabelpage() {
  return (
    <div className="landingback">
       <Wovenlabeldesc />
      <GoogleReviews />
    </div>
  );
}

export default Wovenlabelpage;

import React from "react";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Tyvekhero from "../components/custom-tyvek/tyvekhero";
import Tyvektable from "../components/custom-tyvek/tyvektable";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";

function Customtyvekpage() {
  return (
    <div className="landingback">
      <Tyvekhero />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />{" "}
    </div>
  );
}

export default Customtyvekpage;

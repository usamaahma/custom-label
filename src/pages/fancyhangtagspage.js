import React from "react";
import Fancyhanghero1 from "../components/hantagsection/fancyhanghero";
import FancyForm1 from "../components/hantagsection/fancyform";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";

function Fancyhangtagspage() {
  return (
    <div className="landingback">
      <Fancyhanghero1 />
      <FancyForm1 />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />{" "}
    </div>
  );
}

export default Fancyhangtagspage;

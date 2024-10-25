import React from "react";
import Simplehanghero1 from "../components/hantagsection/simplehanghero";
import Simpletable1 from "../components/hantagsection/simpletable";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";

function Simplehangtagspage() {
  return (
    <div className="landingback">
      <Simplehanghero1 />
      <Descriptionexpress />
      <Finalprocess />
      <Faqexpress1 />
      <GoogleReviews />{" "}
    </div>
  );
}

export default Simplehangtagspage;

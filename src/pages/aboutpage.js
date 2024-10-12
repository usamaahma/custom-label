import React from "react";
import Abouthero1 from "../components/aboutus/abouthero";
import Aboutstory from "../components/aboutus/aboutstory";
import Car from "../components/aboutus/clientreviews";
import Number1 from "../components/aboutus/numbers";
import Ourproduct1 from "../components/aboutus/ourproduct";

function Aboutpage() {
  return (
    <div>
      <Abouthero1 />
      <Aboutstory />
      <Ourproduct1 />
      <Car />
      <Number1 />
    </div>
  );
}

export default Aboutpage;

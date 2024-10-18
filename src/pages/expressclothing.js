import React from "react";
import TablesCart from "../components/expressclothing/tablescart";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Expressmain from "../components/expressclothing/expressmain";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";

function Expressclothing() {
  return (
    <div className="landingback">
      <Expressmain />
      <Descriptionexpress />
      <GoogleReviews />
    </div>
  );
}

export default Expressclothing;

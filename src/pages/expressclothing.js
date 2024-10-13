import React from "react";
import Expresshero from "../components/expressclothing/expresshero";
import TablesCart from "../components/expressclothing/tablescart";
import GoogleReviews from "../components/expressclothing/googlereviews";

function Expressclothing() {
  return (
    <div className="landingback">
      <Expresshero />
      <TablesCart />
      <GoogleReviews />
    </div>
  );
}

export default Expressclothing;

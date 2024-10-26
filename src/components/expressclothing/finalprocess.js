import React from "react";
import "./finalprocess.css";

function Finalprocess() {
  return (
    <div className="main-final-process">
      <div className="padding-final-process">
        <h2>The Wunderlabel Difference</h2>
        <div className="div-flex-final">
          <div className="divs-final-process">
            <img alt="star" src="../images/star.svg" />
            <div>
              <h3>Premium Quality</h3>
              <p>OEKO-TEX® Standard 100 certified</p>
            </div>
          </div>
          <div className="divs-final-process">
            <img alt="star" src="../images/star.svg" />
            <div>
              <h3>Best Value</h3>
              <p>Save more when you order more</p>
            </div>
          </div>{" "}
          <div className="divs-final-process">
            <img alt="star" src="../images/star.svg" />
            <div>
              <h3>Fast Shipping</h3>
              <p>Choose between standard and expedited shipping</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finalprocess;

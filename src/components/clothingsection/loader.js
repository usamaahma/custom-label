import React from "react";
import { Circles } from "react-loader-spinner";

const CustomLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        backgroundColor: "#f8f8f8",
        position: "relative",
      }}
    >
      <Circles
        height={100}
        width={100}
        color="#5F6F65"
        ariaLabel="loading-indicator"
      />
      <div
        style={{
          position: "absolute",
          color: "#5F6F65",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Custom Woven Labels
      </div>
    </div>
  );
};

export default CustomLoader;

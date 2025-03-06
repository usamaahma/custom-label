import React, { useState, useEffect } from "react";
import CustomLoader from "../clothingsection/loader";

function Gallery() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for iframe content (optional)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          width: "95%",
          height: "700px",
          marginTop: "3rem",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {isLoading ? (
          <CustomLoader /> // Show loader while fetching posts
        ) : (
          <iframe
            src="https://4cbf57b5bb8742a0bebd8c468940509b.elf.site/"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "12px",
            }}
            title="Instagram Feed"
            onLoad={() => setIsLoading(false)} // Stop loading when iframe loads
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default Gallery;

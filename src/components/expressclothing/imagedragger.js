import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const maxSize = 5 * 1024 * 1024; // 5 MB limit

  // Load the image from local storage when the component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Check if the file size exceeds the limit
    if (file.size > maxSize) {
      alert("File is too large! Please upload an image smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Set the image to state
      localStorage.setItem("uploadedImage", reader.result); // Store the image in local storage
      // Reload the page to reflect the uploaded image
      window.location.reload();
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Function to delete the image
  const handleDelete = () => {
    setImage(null); // Clear image from state
    localStorage.removeItem("uploadedImage"); // Remove image from local storage
    // Reload the page to reflect the deletion
    window.location.reload();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], // Accept all image types
    },
  });

  return (
    <div style={styles.container}>
      <div
        {...getRootProps({
          className: "dropzone",
          style: styles.dropzone,
          role: "button",
        })}
        aria-live="polite"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p style={styles.text}>Drop the images here ...</p>
        ) : (
          <p style={styles.text}>
            Drag 'n' drop some images here, or click to select images
          </p>
        )}
      </div>
      {image && (
        <div style={styles.previewContainer}>
          <img src={image} alt="Uploaded Preview" style={styles.imagePreview} />
          <button onClick={handleDelete} style={styles.deleteButton}>
            Delete Image
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "rgba(95, 111, 101, 0.6)", // Reduced opacity
  },
  dropzone: {
    border: "2px dashed #FAF4EB",
    borderRadius: "10px",
    padding: "40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
    width: "100%",
    maxWidth: "400px",
    marginBottom: "20px",
  },
  text: {
    color: "#FAF4EB",
    fontSize: "18px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Black drop shadow
  },
  previewContainer: {
    marginTop: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    width: "100%",
    maxWidth: "400px",
    position: "relative", // Position relative for the button
  },
  imagePreview: {
    width: "100%",
    height: "auto",
  },
  deleteButton: {
    backgroundColor: "#FF4D4D", // Red background for delete button
    color: "#FFFFFF", // White text
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)", // Center the button
    transition: "background-color 0.3s",
  },
  // Adding media queries for responsiveness
  "@media (max-width: 600px)": {
    dropzone: {
      padding: "20px",
      width: "90%", // 90% width for small screens
    },
    previewContainer: {
      width: "90%", // 90% width for small screens
    },
    text: {
      fontSize: "16px", // Slightly smaller text
    },
    deleteButton: {
      padding: "8px 10px", // Smaller button padding
    },
  },
  "@media (max-width: 425px)": {
    dropzone: {
      padding: "15px",
      width: "100%", // Full width for very small screens
    },
    previewContainer: {
      width: "100%", // Full width for very small screens
    },
    text: {
      fontSize: "14px", // Even smaller text for very small screens
    },
    deleteButton: {
      padding: "6px 8px", // Smaller button padding
    },
  },
};

export default ImageUploader;

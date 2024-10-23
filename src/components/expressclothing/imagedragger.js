import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  // Load the image from local storage when the component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Set the image to state
      localStorage.setItem("uploadedImage", reader.result); // Store the image in local storage
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Function to delete the image
  const handleDelete = () => {
    setImage(null); // Clear image from state
    localStorage.removeItem("uploadedImage"); // Remove image from local storage
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], // Accept all image types
    },
  });

  return (
    <div style={styles.container}>
      <div {...getRootProps({ className: "dropzone", style: styles.dropzone })}>
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
    backgroundColor: 'rgba(95, 111, 101, 0.6)', // Reduced opacity
   },
  dropzone: {
    border: "2px dashed #FAF4EB",
    borderRadius: "10px",
    padding: "40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
    width: "400px",
    marginBottom: "20px",
  },
  text: {
    color: "#FAF4EB",
    fontSize: "18px",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Black drop shadow
  },
  previewContainer: {
    marginTop: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    width: "400px",
    position: 'relative', // Position relative for the button
  },
  imagePreview: {
    width: "100%",
    height: "auto",
  },
  deleteButton: {
    backgroundColor: '#FF4D4D', // Red background for delete button
    color: '#FFFFFF', // White text
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)', // Center the button
    transition: 'background-color 0.3s',
  },
};

export default ImageUploader;

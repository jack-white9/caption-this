import { useState } from "react";
import { DragDropFile } from "./components/FileUpload/FileUpload";
import { LoadingBar } from "./components/LoadingBar/LoadingBar";
import "./App.css";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageCaption, setImageCaption] = useState(null);

  const handleFileUpload = async (file) => {
    // TODO: Validate files to filter out non-image files
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/generate_caption/", {
        method: "POST",
        body: formData,
      });
      const responseText = await response.json();
      setIsLoading(false);
      setImageCaption(responseText.image_description);
    } catch (error) {
      console.error("Request failed with error:", error);
    }
  };

  return (
    <div className={`page-container ${isLoading ? "loading-container" : ""}`}>
      <h1 className="page-header">Give me a caption for...</h1>
      {imageCaption === null ? (
        <DragDropFile handleFileUpload={handleFileUpload} />
      ) : (
        <p>{imageCaption}</p>
      )}
      <LoadingBar isLoading={isLoading} />
    </div>
  );
};

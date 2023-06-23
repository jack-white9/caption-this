import { useState, useRef } from "react";
import axios from "axios";
import "./DragDropFile.css";

export const DragDropFile = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef(null);

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragover" || e.type === "dragenter") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    // TODO: Validate files to filter out non-image files
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/generate_caption/", {
        method: "POST",
        body: formData,
      });
      const responseText = await response.json();
      console.log(responseText);
      return response;
    } catch (error) {
      console.error("Request failed with error:", error);
    }
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={isDragActive ? "drag-active" : ""}
      >
        <div>
          <p>Drag and drop your file here or</p>
          <button onClick={onButtonClick} className="upload-button">
            Upload a file
          </button>
        </div>
      </label>
      {isDragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};

import { React, useState, useRef } from "react";
import "./FileUpload.css";

interface TFileUploadProps {
  handleFileUpload: (file: File) => Promise<void>;
}

export const FileUpload = ({ handleFileUpload }: TFileUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const onButtonClick = () => {
    if (!inputRef?.current) return;
    inputRef.current.click();
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragover" || e.type === "dragenter") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e?.dataTransfer?.files) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: DragEvent) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files;
    if (file) {
      handleFileUpload(file[0]);
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

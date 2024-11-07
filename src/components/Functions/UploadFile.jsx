import React, { useState, useEffect, useRef } from "react";
import { _IMG } from "@/shared/constants/images";
import {
  getVideoCover,
  isImage,
  isVideo,
} from "@/shared/functions/file-conversion.js";
import { crossButtonStyle } from "@/shared/constants/styles.js";
import Image from "next/image";

const fileFormatImage = _IMG.dummyImg;

const UploadFile = ({
  label = "Upload",
  isCircle = false,
  borderColor = "#DCD3D3E8",
  borderWidth = 1.5,
  width = 100,
  maxFileSize = 50, // 50MB default
  allowedFormats = [], // Allow all formats by default if empty
  showFileName = true,
  backgroundColor = "transparent",
  initialFileData = null,
  onFileUpload,
  name = "",
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialFileData);
  const [fileError, setFileError] = useState("");
  const [cover, setCover] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const mediaStyle = {
    width: `${width}px`,
    height: `${width}px`,
    borderRadius: isCircle ? "50%" : "5%",
    border: `${borderWidth}px solid ${borderColor}`,
    objectFit: "cover",
    cursor: "pointer",
    padding: "2px",
    backgroundColor: backgroundColor,
    position: "relative", // Make this relative for absolute child positioning
  };

  // Handle initialFileData
  useEffect(() => {
    if (initialFileData) {
      setPreviewUrl(initialFileData);
      const [fullPath] = initialFileData.split("?");
      setFileName(fullPath.split("/").pop()); // Extract filename from URL
    }
  }, [initialFileData]);

  useEffect(() => {
    if (previewUrl || cover) {
      onFileUpload({
        fileName,
        file: selectedFile,
        type: selectedFile?.type || "unknown",
        fileUrl: previewUrl || cover,
      });
    }
  }, [previewUrl, cover, selectedFile, fileName, onFileUpload]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size
      if (file.size > maxFileSize * 1024 * 1024) {
        setFileError(
          `File size exceeds the limit of ${maxFileSize / (1024 * 1024)} MB.`
        );
        return;
      }

      // Validate file type based on MIME types
      const formats = allowedFormats.length > 0 ? allowedFormats : [];
      if (formats.length && !formats.includes(file.type)) {
        setFileError("Unsupported file format. Please select a valid file.");
        return;
      }

      // File is valid
      setFileError("");
      setSelectedFile(file);
      setFileName(file.name); // Set file name for display

      // Handle images
      if (isImage(file.name)) {
        const newUrl = URL.createObjectURL(file);
        setPreviewUrl(newUrl); // Set image preview using object URL
        return () => URL.revokeObjectURL(newUrl); // Cleanup
      }
      // Handle videos
      else if (isVideo(file.name)) {
        const newUrl = URL.createObjectURL(file);
        setPreviewUrl(newUrl); // Set video preview
        const coverImage = await getVideoCover(file, 1.5); // Get video thumbnail
        setCover(coverImage);
        return () => URL.revokeObjectURL(newUrl); // Cleanup
      }
      // Handle non-image/non-video files (e.g., PDFs, docs)
      else {
        setPreviewUrl(fileFormatImage); // Set a placeholder for non-previewable files

        // Trigger onFileUpload with the file data
        onFileUpload({
          fileName: file.name,
          file: file,
          type: file.type,
          fileUrl: null, // No actual preview URL for non-image/video files
        });
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simulate click on hidden file input
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileName(null);
    setCover(null);
    fileInputRef.current.value = ""; // Clear file input value

    // Trigger the onFileUpload callback with empty data
    onFileUpload({
      fileName: null,
      file: null,
      type: null,
      fileUrl: null,
    });
  };

  const renderPreview = () => {
    // Render image preview
    if (
      previewUrl &&
      (isImage(selectedFile?.name || "") || isImage(previewUrl))
    ) {
      return (
        <div style={{ position: "relative", width: `${width}px` }}>
          <img
            src={previewUrl}
            alt="Selected"
            style={mediaStyle}
            onClick={handleClick}
          />
          <button style={crossButtonStyle} onClick={clearFile}>
            ×
          </button>
        </div>
      );
    }
    // Render video preview
    else if (previewUrl && isVideo(selectedFile?.name || "")) {
      return (
        <div style={{ position: "relative", width: `${width}px` }}>
          <video controls style={mediaStyle} onClick={handleClick}>
            <source src={previewUrl} type={selectedFile?.type || "video/mp4"} />
            Your browser does not support the video tag.
          </video>
          <button style={crossButtonStyle} onClick={clearFile}>
            ×
          </button>
        </div>
      );
    }
    // Render placeholder for non-image and non-video files
    else if (fileName) {
      return (
        <div style={{ position: "relative", width: `${width}px` }}>
          <img
            src={previewUrl ? previewUrl : fileFormatImage}
            alt="File"
            style={mediaStyle}
            onClick={handleClick}
          />
          <button style={crossButtonStyle} onClick={clearFile}>
            ×
          </button>
        </div>
      );
    }
    // Render initial placeholder before file selection with + sign
    else {
      return (
        <div
          style={{
            ...mediaStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleClick}
        >
          <div
            style={{
              position: "absolute",
              fontSize: "40px",
              color: "#000",
              fontWeight: "bold",
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            +
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {label && (
        <label style={{ marginBottom: "10px", display: "block" }}>
          {label}
        </label>
      )}

      {/* File Preview with + sign */}
      {renderPreview()}

      {/* Hidden File Upload */}
      <input
        type="file"
        name={name}
        accept={allowedFormats.length > 0 ? allowedFormats.join(",") : "*/*"}
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      {/* Error Message */}
      {fileError && <p style={{ color: "red" }}>{fileError}</p>}

      {/* Show/Hide File Name */}
      {showFileName &&
        (selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          initialFileData && <p>{fileName}</p> // Show filename from initialFileData if no file is selected
        ))}
    </div>
  );
};

export default UploadFile;

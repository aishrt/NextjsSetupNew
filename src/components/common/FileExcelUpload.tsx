"use client";
import { ChangeEvent, useEffect } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
// import { FaFileUpload } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

interface FileUploadProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  handleUpload: () => void;
  isLoading: boolean;
}

const FileExcelUpload: React.FC<FileUploadProps> = ({
  selectedFile,
  setSelectedFile,
  handleUpload,
  isLoading,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById(
      "raised-button-file"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  useEffect(() => {
    setSelectedFile(null);
  }, []);
  return (
    <Box className="file-upload-container">
      <Typography variant="h6" sx={{ textAlign: "center" }} gutterBottom>
        Upload an Excel Sheet with column name : Domain_Name
      </Typography>
      {selectedFile && (
        <Box
          className="file-section"
          style={{
            margin: "20px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "16px" }}>
            <span style={{ fontWeight: 600 }}>Selected File:</span>
            {selectedFile.name}
          </Typography>
          <IconButton
            aria-label="remove file"
            onClick={handleRemoveFile}
            size="small"
            style={{ marginLeft: "10px" }}
            className="crossbtnscaner"
          >
            <CloseIcon sx={{ fontSize: "14px" }} />
          </IconButton>
        </Box>
      )}
      <div style={{ textAlign: "center" }}>
        <input
          accept=".xlsx, .xls"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />

        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<FaUpload />}
            disabled={isLoading}
            className="modalButton"
            // style={{borderRadius:"8px", padding:'13px 22px', fontWeight:"600"}}
          >
            Choose File
          </Button>
        </label>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleUpload()}
          disabled={isLoading || !selectedFile}
          className="modalButton upload"
          style={{ marginTop: "20px" }}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </Box>
  );
};

export default FileExcelUpload;

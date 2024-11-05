"use client";
import { ChangeEvent } from "react";
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
  domainName: string;
  setDomainName: (name: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  selectedFile,
  setSelectedFile,
  handleUpload,
  isLoading,
  domainName,
  setDomainName,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setDomainName("");
    const fileInput = document.getElementById(
      "raised-button-file"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };
  return (
    <Box className="file-upload-container">
      <Typography variant="h6" sx={{ textAlign: "center" }} gutterBottom>
        Upload a Zip File
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
          <Typography variant="body1" sx={{ fontSize: "13px" }}>
            Selected File: {selectedFile.name}
          </Typography>
          <IconButton
            aria-label="remove file"
            onClick={handleRemoveFile}
            size="small"
            style={{ marginLeft: "10px" }}
          >
            <CloseIcon sx={{ fontSize: "14px" }} />
          </IconButton>
        </Box>
      )}
      <div style={{ textAlign: "center" }}>
        <input
          accept=".zip"
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
          onClick={handleUpload}
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

export default FileUpload;

import React, { useEffect, useState } from "react";
import { _IMG } from "@/shared/constants/images";

import { Box, Button, Modal } from "@mui/material";
import { fetchImage } from "@/shared/functions/file-conversion.js";
import {
  closeButtonStyle,
  modalImageStyle,
  modalStyles,
} from "@/shared/constants/styles.js";
import Image from "next/image";

const ViewImage = ({
  src,
  isCircle = false,
  borderColor = "#DCD3D3E8",
  borderWidth = 0,
  size = 100,
  awsFolder = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchImage(src, _IMG.dummyImg, awsFolder).then((data) => {
      setImageUrl(data);
    });
  }, [src]);

  const imageStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: isCircle ? "50%" : "10%",
    border: `${borderWidth}px solid ${borderColor}`,
    objectFit: "cover",
    cursor: "pointer",
    position: "relative",
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <img
        src={imageUrl}
        alt="common"
        style={imageStyle}
        onClick={handleImageClick}
      />

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyles}>
          <img src={imageUrl} alt="common" style={modalImageStyle} />
          <Button
            variant="contained"
            color="error"
            onClick={closeModal}
            sx={closeButtonStyle}
          >
            X
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewImage;

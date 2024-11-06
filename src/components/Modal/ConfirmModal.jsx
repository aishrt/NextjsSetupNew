import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Typography, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import {modalStyles} from "@/shared/constants/styles.js";

const ConfirmModal = ({ isModalOpen, setIsModalOpen, onConfirmDelete }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{...modalStyles, width: 400}} className="confirmModal">
        <div></div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <DeleteOutlineIcon
            style={{
              fontSize: "40px",
              color: "#f00",
              textAlign: "center",
            }}
          />
        </Typography>
        <Typography id="modal-modal-description" style={{ marginTop: "10px" }}>
          Are you sure you want to delete this item?
        </Typography>
        <div
          style={{
            display: "flex",
            marginTop: "25px",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Button onClick={() => onConfirmDelete()} className="blueButton">
            Delete
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="blueButton cancel"
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;

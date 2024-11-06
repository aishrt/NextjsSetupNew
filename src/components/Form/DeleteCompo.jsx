import IconButton from "@mui/material/IconButton";
import {CircularProgress} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {BootstrapTooltipUi} from "@/components/mui/BootstrapToolTip.jsx";
import React, {useState} from "react";
import ConfirmModal from "@/components/Modals/ConfirmModal.jsx";
import {apiDeleteMethod} from "@/api/rest.js";
import {toast} from "react-toastify";
import {_errorMsg} from "@/shared/functions/index.js";

export const DeleteCompo = (
  {
    tokenNull = false,
    deleteUrl,
    apiCall
  }
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const onConfirmDelete = () => {
    setIsModalOpen(false);
    setIsLoadingDelete(true);
    apiDeleteMethod(deleteUrl, null, tokenNull ? -1 : null).then((data) => {
      toast.dismiss();
      toast.success(data?.message);
      if (apiCall !== undefined) {
        apiCall();
      }
    })
    .catch((err) => {
      toast.dismiss();
      toast.error(_errorMsg(err));
    })
    .finally(() => {
      setIsLoadingDelete(false);
    });
  };

  return (
    <>
      <BootstrapTooltipUi title="Delete" placement="top">
        <IconButton
          className="outerborder"
          aria-label="Delete"
          onClick={() => {
            setIsModalOpen(true);
          }}
          sx={{ color: "error.main" }}
          disabled={isLoadingDelete}
        >
          {isLoadingDelete ? (
            <CircularProgress size={20} />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </BootstrapTooltipUi>

      <ConfirmModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onConfirmDelete={onConfirmDelete}
      />
    </>
  )
}

// Usage 
{/* <DeleteCompo
deleteUrl={`${allApiUrl.BUSINESS_USERS}/${row.id}`}
apiCall={getLastUsers}
/> */}
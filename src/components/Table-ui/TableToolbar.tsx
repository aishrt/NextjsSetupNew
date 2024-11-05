"use client"
import * as React from "react";
import { useState } from "react";
import {postFetcher} from "@/@core/apiFetcher";
import {toast} from "react-toastify";
import AlertDialog from "@/components/UI/AlertDialog";
import {_errorMsg} from "@/@core/helper";
import { ToolbarUi } from "./toolbar-ui";

export default function TableToolbar(
  {
   title = "",
   subTitle = "",
   numSelected = 0,
   onSearch = (value: any) => {},
   showDeleteButtonCheck = true,
   hideSearch = false,
   deleteModalTitle = "All Selected items",
   deleteUrl = "",
   selected = [],
   setSelected = (value: any) => {},
   apiCall = () => {},
   searchPlaceholder= "Search",
   debounceTime = 500,
   alertContent= null
 }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeleteSelected = () => {
    if (deleteUrl) {
      postFetcher(deleteUrl, { id: selected })
        .then((res: any) => {
          toast.success(res?.message);
          setSelected([...[]]);
          if (apiCall !== undefined) {
            apiCall();
          }
        })
        .catch((err: any) => {
          toast.error(_errorMsg(err));
        });
    }
  };
  return (
    <>
      <AlertDialog
        title={deleteModalTitle}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={() => {
          setOpenDeleteModal(false);
          handleDeleteSelected();
        }}
        content={alertContent}
      />
      <div className="allocation">
        <ToolbarUi
          numSelected={numSelected}
          title={title}
          subTitle={subTitle}
          onSearch={onSearch}
          searchPlaceholder={searchPlaceholder}
          showDeleteButton={showDeleteButtonCheck}
          onDeleteClick={() => setOpenDeleteModal(true)}
          debounceTime={debounceTime}
          hideSearch={hideSearch}
        />
      </div>
    </>
  );
}

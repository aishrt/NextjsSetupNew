import Box from "@mui/material/Box";
import {Modal} from "@mui/material";
import Grid from '@mui/material/Grid2';
import Button from "@mui/material/Button";
import {LoadingButton} from "@mui/lab";
import UploadIcon from "@mui/icons-material/Upload";
import React, {useState} from "react";
import {boxStyle} from "@/shared/constants/styles";
import {handleCSVExport, handleImportCsv} from "@/shared/functions/file-conversion";
import {apiPostMethod} from "@/api/rest";
import {allApiUrl} from "@/api/apiRoute";
import {toast} from "react-toastify";
import {isEmpty} from "lodash";

export const UserUploadCsvModal = (
  {
    importUserModal,
    setImportUserModal,
    setImportErrorsModal,
    setImportErrors
  }
) => {
  const [uploading, setUploading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  const requiredColumns = ["user_name", "email", "phone_number", "role"];
  const handleSampleDataFormat = () => {
    const data = [
      {
        user_name: "abc",
        email: "xyz@mail.com",
        rolename: "Super Admin",
        phone_number: "1234567890",
      },
      {
        user_name: "abc",
        email: "xyz@mail.com",
        rolename: "Reseller User",
        phone_number: "1234567890",
      },
    ];
    const opts = {
      fields: [
        {
          label: "user_name",
          value: "user_name",
          default: "N/A",
        },
        {
          label: "email",
          value: "email",
          default: "N/A",
        },
        {
          label: "role",
          value: "rolename",
          default: "N/A",
        },
        {
          label: "phone_number",
          value: "phone_number",
          default: "N/A",
        },
      ],
    };
    handleCSVExport(data, opts, "sample");
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
    handleImportCsv(event, requiredColumns);
  };
  const handleSubmitImport = async () => {
    if (!csvFile) {
      toast.dismiss();
      toast.error("Please Select file");
    } else {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", csvFile);
      let url = allApiUrl?.IMPORT_USER;
      apiPostMethod(url, formData)
        .then((data) => {
          if (!isEmpty(data.data)) {
            setImportErrorsModal(true);
            setImportErrors(data?.data);
          } else {
            toast.dismiss();
            toast.success(data.message);
          }
          setImportUserModal(false);
        })
        .catch((err) => {
          toast.dismiss();
          toast.error(err?.data?.message[0]);
          setImportUserModal(false);
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };

  return (
    <>
      {importUserModal && (
        <Modal
          open={importUserModal}
          onClose={() => setImportUserModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={boxStyle} className="confirmModal">
            <Grid container columnSpacing={2} rowSpacing={3}>
              <Grid size={12}>
                <h4
                  style={{
                    marginBottom: "20px",
                    fontWeight: "600",
                  }}
                >
                  Upload Csv File
                </h4>
                <Grid size={12}>
                  <Box className="inputFile">
                    <input
                      type="file"
                      id="csvFile"
                      accept=".csv"
                      onChange={handleFileChange}
                      size="10"
                      style={{
                        marginTop: "30px",
                        marginLeft: "-80px",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                marginTop: "50px",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Button
                className="blueButton"
                sx={{ p: "8px 25px" }}
                onClick={handleSampleDataFormat}
              >
                Download Sample
              </Button>
              <LoadingButton
                autoFocus
                disabled={uploading}
                loading={uploading}
                endIcon={<UploadIcon />}
                loadingPosition="end"
                variant="contained"
                className="blueButton"
                onClick={handleSubmitImport}
              >
                Upload
              </LoadingButton>
              <Button
                className="blueButton cancel"
                sx={{ p: "8px 25px" }}
                onClick={() => setImportUserModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  )
}
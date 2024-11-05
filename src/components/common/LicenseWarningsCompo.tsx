"use client";

import { useEffect } from "react";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
import { isEmpty } from "@/utils/isEmpty";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  showWarnings?: boolean;
  onSetLicenseData?: any;
  onSetIsLoading?: any;
};
const LicenseWarningsCompo = ({
  onSetLicenseData,
  onSetIsLoading,
  showWarnings = true
}: Props) => {
  useEffect(() => {
    fetchLicenseData();
  }, []);

  const fetchLicenseData = () => {
    if (onSetIsLoading !== undefined) {
      onSetIsLoading(true);
    }
    getFetcherWithAuth(API_ROUTES.ACCOUNT_LICENSE_DETAIL)
      .then((resData: any) => {
        if (onSetLicenseData !== undefined) {
          onSetLicenseData(resData);
        }
        if (showWarnings && !isEmpty(resData) && !isEmpty(resData.data.warning_data)) {
          const warnings = resData.data.warning_data;
          if (
            !isEmpty(warnings.domain) ||
            !isEmpty(warnings.user) ||
            !isEmpty(warnings.email) ||
            !isEmpty(warnings.sender)
          ) {
            toast.info(
              <>
                {!isEmpty(warnings.domain) && (
                  <div>
                    <h6 style={{ color: "#ffa800", marginBottom: 0 }}>
                      Domain:
                    </h6>
                    <p style={{ lineHeight: "normal" }}>{warnings.domain}</p>
                  </div>
                )}
                {!isEmpty(warnings.user) && (
                  <div>
                    <h6 style={{ color: "#ffa800", marginBottom: 0 }}>User:</h6>
                    <p style={{ lineHeight: "normal" }}>{warnings.user}</p>
                  </div>
                )}
                {!isEmpty(warnings.email) && (
                  <div>
                    <h6 style={{ color: "#ffa800", marginBottom: 0 }}>
                      Email:
                    </h6>
                    <p style={{ lineHeight: "normal" }}>{warnings.email}</p>
                  </div>
                )}
                {!isEmpty(warnings.sender) && (
                  <div>
                    <h6 style={{ color: "#ffa800", marginBottom: 0 }}>
                      Sender:
                    </h6>
                    <p style={{ lineHeight: "normal" }}>{warnings.sender}</p>
                  </div>
                )}
              </>,
              {
                autoClose: false,
                closeOnClick: true,
                draggable: true,
                style: { width: "500px" },
                position: "top-center",
                closeButton: ({ closeToast }) => (
                  <IconButton
                    onClick={closeToast}
                    style={{
                      color: "white",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                ),
              }
            );
          }
        }
      })
      .catch(() => {
        if (onSetLicenseData !== undefined) {
          onSetLicenseData(null);
        }
      })
      .finally(() => {
        if (onSetIsLoading !== undefined) {
          onSetIsLoading(false);
        }
      });
  };
    return <></>;
};
export default LicenseWarningsCompo;

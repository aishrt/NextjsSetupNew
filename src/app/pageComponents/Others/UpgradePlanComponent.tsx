"use client";
import { useEffect, useState } from "react";
import { BootstrapDialog } from "@/components/Modal/BootstrapDialogUi";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { getLicenseData } from "@/@core/apiFetcher";
import { _ENV_VARIABLES } from "@/constants/envVariables";

const SECRET_KEY = _ENV_VARIABLES.NEXT_PUBLIC_SECRET_KEY;
const PUBLIC_URL = _ENV_VARIABLES.NEXT_PUBLIC_URL;

const UpgradePlanComponent = ({
  initialOpenModal, // Initial prop for openModal
  onClose,
}: {
  initialOpenModal?: any; // Renamed to initialOpenModal for clarity
  onClose?: any; // Defined as a function
}) => {
  const router = useRouter();
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [license, setLicense] = useState<any>(null);

  // State variable to control modal visibility
  const [openModal, setOpenModal] = useState(initialOpenModal);

  useEffect(() => {
    const fetchLicenseData = async () => {
      const resData = await getLicenseData();
      if (resData) {
        setLicense(resData.data);
      }
    };
    fetchLicenseData();
  }, []);

  const onManageChangePlan = async () => {
    setIsStripeLoading(true);
    if (license?.stripe_customer_id) {
      fetch("https://api.stripe.com/v1/billing_portal/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${SECRET_KEY}`,
        },
        body: `customer=${license?.stripe_customer_id}&return_url=${PUBLIC_URL}/dashboard/dashboard`,
      })
        .then((response) => response.json())
        .then((data) => {
          const url = data.url;
          router.push(url);
          setIsStripeLoading(false);
        })
        .catch((error) => {
          setIsStripeLoading(false);
        });
    } else {
      const newUrl = "/dashboard/pricing";
      router.push(newUrl);
    }
  };

  // Handle modal close with state management
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // Close the modal by setting openModal to false
      setOpenModal(false); // Now this controls the modal visibility
    }
  };

  return (
    <>
      <BootstrapDialog open={openModal} onClose={handleClose}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="automateModal">
          <Typography gutterBottom>
            <div className="col-xl-12">
              <h5 className="text-center">Unlock Powerful Features!</h5>
              <div className="col-xl-12">
                <span>
                  <p>
                    You&apos;ve almost reached your full potential! This feature
                    is only available on our premium plans. Upgrade to unlock a
                    world of new possibilities.
                  </p>
                </span>
                <button
                  style={{
                    backgroundColor: "#eb5454",
                    color: "#fff",
                    fontWeight: 700,
                    border: "none",
                    padding: "6px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={onManageChangePlan}
                >
                  <span>
                    <i className="fa-regular fa-circle-up"></i>
                    {isStripeLoading ? "Please wait ..." : "Upgrade Now!"}
                  </span>
                </button>
              </div>
            </div>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default UpgradePlanComponent;

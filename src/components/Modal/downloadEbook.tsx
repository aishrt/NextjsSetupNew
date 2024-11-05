"use client";
import React, { useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal"; // Import Modal from Material-UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { postFetcher } from "@/@core/apiFetcher";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@mui/material";

interface ModalEbookProps {
  isOpen: boolean;
  setIsOpen: any;
  handleClose: () => void;
}
interface FormState {
  name: string;
  email: string;
}

const ModalEbook: React.FC<ModalEbookProps> = ({
  isOpen,
  setIsOpen,
  handleClose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const recaptchaRef: any = useRef(null);
  const [verfied, setVerfied] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
  });
  const onSubmitHandler = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    if (!verfied) {
      toast.error("Please check the reCAPTCHA before submitting.");
      setIsLoading(false);
    } else {
      try {
        const res: any = await postFetcher("/api/download-ebook", {
          email: form.email,
          name: form.name,
        });
        if (res.code === 200) {
          setIsOpen(false);
          resetRecaptcha();
          toast.success(
            !res.message ? "Ebook is send to email successfully" : res.message
          );
          setIsLoading(false);
          setForm({
            name: "",
            email: "",
          });
        } else {
          resetRecaptcha();
          setIsOpen(false);
          setForm({
            name: "",
            email: "",
          });
          setIsLoading(false);
          toast.error(res.message || "An unexpected error occurred");
        }
      } catch (error) {
        resetRecaptcha();
        setIsOpen(false);
        setForm({
          name: "",
          email: "",
        });
        setIsLoading(false);
      } finally {
        resetRecaptcha();
        setIsOpen(false);
        setForm({
          name: "",
          email: "",
        });
        setIsLoading(false);
        // setEmail('')
      }
    }
  };
  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setVerfied(false);
    }
  };

  const handleVerify = (response: any) => {
    if (response) {
      setVerfied(true);
      // reCAPTCHA verified successfully
    } else {
      setVerfied(false);
      // Verification failed
      console.error("reCAPTCHA verification failed");
    }
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="ebookModal">
          <span>
            <button className="btn closeModal" onClick={handleClose}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </span>
          <Grid
            container
            spacing={2}
            sx={{ height: "100%", marginTop: "0", marginLeft: "0" }}
          >
            <Grid item sm={6} xs={12} className="ebookContent">
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: "30px",
                  marginBottom: "30px",
                }}
              >
                YOUR DMARC
              </Typography>
              <p
                style={{
                  color: "#4B575E",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                Subscribe now and receive &quot;<b>Compliance Guide</b>&quot; by
                YOUR DMARC as a free eBook. Your best compliance roadmap
                simplified practices.
              </p>
              <form onSubmit={onSubmitHandler}>
                <div style={{ marginTop: "40px" }}>
                  <Typography
                    id="modal-modal-description"
                    sx={{
                      fontWeight: "600",
                      marginBottom: "10px",
                      color: "#4B575E",
                    }}
                  >
                    Name<span>*</span>
                  </Typography>
                  <input
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    required
                  />
                  <Typography
                    id="modal-modal-description"
                    sx={{
                      fontWeight: "600",
                      marginBottom: "10px",
                      color: "#4B575E",
                      marginTop: "20px",
                    }}
                  >
                    Email Address <span>*</span>
                  </Typography>
                  <input
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    value={form.email}
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email Address"
                    required
                  />
                  <div className="mt-3">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Ldza_spAAAAALvLizCIWzed5ORDjA3uR0yk41nA"
                      onChange={handleVerify}
                    />
                  </div>
                  {/* 6LfqC_cpAAAAADQG6JmlMJzB6HrrbDrhJuCx0lUf */}
                  {/* 6LcMC_cpAAAAAF_pKIf5BNYRsqV3G2dxaa9Wt8NT */}
                  <div className="text-center" style={{ marginTop: "30px" }}>
                    {/* <button
                      className="btn pinkButton"
                      style={{ width: "175px" }}
                    >
                      {isLoading ? "Please wait..." : "Submit"}
                    </button> */}

                    <Button
                      className="btn blueButton"
                      style={{ width: "175px" }}
                      disabled={isLoading}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </Grid>
            <Grid item sm={6} xs={12} className="ebookImage">
              <img
                src="/assets/images/magzineImg.svg"
                alt=""
                loading="eager"
                fetchPriority="high"
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEbook;

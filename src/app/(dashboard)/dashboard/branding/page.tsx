"use client";
import { getFetcherWithAuth, putFormFetcher } from "@/@core/apiFetcher";
import AdminDetail from "@/app/pageComponents/Dashboard/AdminDetails";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, Typography } from "@mui/material";
import { API_ROUTES } from "@/@core/apiRoutes";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import MainLoader from "@/components/Loaders/MainLoader";
import { BootstrapDialog } from "@/components/Modal/BootstrapDialogUi";
import { useStore } from "@/utils/store";
import UpgradePlanComponent from "@/app/pageComponents/Others/UpgradePlanComponent";
import { _IMG } from "@/constants/images";
import Image from "next/image";
const BrandLogo = () => {
  const [form, setFormData] = useState({
    brandLogo: "",
    brandName: "",
    preview: "",
    hostName: "",
    port: "",
    authentication: "",
    username: "",
    password: "",
  } as any);

  const [nameError, setNameError] = useState(false as boolean);
  const [imageError, setImageError] = useState(false as boolean);
  const [deleteDomain, setdeleteDomain] = useState(false as boolean);
  const [hostNameError, setHostNameError] = useState(false as boolean);
  const [portError, setPortError] = useState(false as boolean);
  const [authenticationError, setAuthenticationError] = useState(
    false as boolean
  );
  const [usernameError, setUsernameError] = useState(false as boolean);
  const [passwordError, setPasswordError] = useState(false as boolean);
  const [isLoadingLicence, setIsLoadingLicence] = useState(false);
  const [isLoadingCompany, setIsLoadingCompany] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { license, userRole } = useStore();

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    weekly_digest_report: false,
    profile_image: "",
  });
  const [isBranding, setBranding] = useState([] as any);

  useEffect(() => {
    fetchIProfileData();
    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    if (form.brandName) {
      setNameError(false);
    }

    if (form.brandLogo) {
      setImageError(false);
    }
    if (form.hostName) {
      setHostNameError(false);
    }
    if (form.port) {
      setPortError(false);
    }
    if (form.authentication) {
      setAuthenticationError(false);
    }
    if (form.username) {
      setUsernameError(false);
    }
    if (form.password) {
      setPasswordError(false);
    }
  }, [form]);

  const fetchIProfileData = () => {
    setIsLoadingProfile(true);
    getFetcherWithAuth(API_ROUTES.VIEW_PROFILE)
      .then((resData: any) => {
        if (!isEmpty(resData)) {
          resData.data.preview = resData.data.profile_image
            ? process.env.NEXT_PUBLIC_BACKEND_API_URL +
              resData.data.profile_image
            : "/assets/images/profile.png";
          setProfileData(resData.data);
        }
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoadingProfile(false);
        setIsLoadingSave(false);
      });
  };
  const fetchCompanyDetails = () => {
    setIsLoadingCompany(true);
    getFetcherWithAuth(API_ROUTES.GET_COMPANY_DETAILS)
      .then((resData: any) => {
        if (!isEmpty(resData)) {
          setFormData({
            ...form,
            brandName: resData?.data?.brand_name,
            brandLogo: resData?.data?.brand_image,
            hostName: resData?.data?.host_name,
            port: resData?.data?.port,
            authentication: resData?.data?.authentication,
            username: resData?.data?.username,
            password: resData?.data?.password,

            preview: resData.data.brand_image
              ? process.env.NEXT_PUBLIC_BACKEND_API_URL +
                resData.data.brand_image
              : "",
          });
        }
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoadingCompany(false);
      });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    if (!form.brandLogo && !form.brandName) {
      setImageError(true);
      setNameError(true);
      return;
    }
    if (!form.brandLogo) {
      setImageError(true);
      return;
    }
    if (!form.hostName) {
      setHostNameError(true);
      return;
    }
    if (!form.port) {
      setPortError(true);
      return;
    }
    if (!form.authentication) {
      setAuthenticationError(true);
      return;
    }
    if (!form.username) {
      setUsernameError(true);
      return;
    }
    if (!form.password) {
      setPasswordError(true);
      return;
    }
    setIsLoadingSave(true);

    if (!(form.brandLogo instanceof File)) {
      formData.append("brand_name", form.brandName);
    } else {
      formData.append("brand_image", form.brandLogo);
      // formData.append("brand_name", form.brandName);
      formData.append("hostName", form.hostName);
      formData.append("port", form.port);
      formData.append("authentication", form.authentication);
      formData.append("username", form.username);
      formData.append("password", form.password);
    }
    putFormFetcher(API_ROUTES.UPDATE_COMPANY_DETAILS, formData)
      .then(async (response: any) => {
        if (!response?.status) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          fetchCompanyDetails();
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadingSave(false);
      });
  };
  const handleDelete = async () => {
    setIsLoadingDelete(true);
    const formData = new FormData();
    formData.append("brand_image", "");
    formData.append("brand_name", form.brandName);

    putFormFetcher(API_ROUTES.UPDATE_COMPANY_DETAILS, formData)
      .then(async (response: any) => {
        if (!response?.status) {
          toast.error(response.message);
        } else {
          setFormData({
            ...form,
            brandLogo: [],
            brandName: form.brandName,
            preview: "",
          });
          toast.success(response.message);
          fetchCompanyDetails();
        }
      })
      .catch(() => {})
      .finally(() => {
        setdeleteDomain(false);
        setIsLoadingDelete(false);
      });
  };

  const handleImageChange = (e: any) => {
    setFormData({
      ...form,
      brandLogo: e.target.files[0],
      preview: window.URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleClose = () => {
    setdeleteDomain(false);
  };

  const [showUpgrade, setShowUpgrade] = useState(true);

  const handleCloseUpgradePlan = () => {
    setShowUpgrade(false);
  };

  return (
    <>
      <LicenseWarningsCompo
        showWarnings={false}
        onSetIsLoading={(value: any) => setIsLoadingLicence(value)}
        onSetLicenseData={(resData: any) => {
          if (resData) {
            setBranding(resData?.data?.branding);
          }
        }}
      />

      {isLoadingProfile || isLoadingLicence ? (
        <MainLoader />
      ) : (
        <>
          {showUpgrade && !license?.branding && (
            <UpgradePlanComponent
              initialOpenModal={showUpgrade}
              onClose={handleCloseUpgradePlan}
            />
          )}
          <div className="graphSection">
            <div className="dashboardTopCard">
              <div className="brand">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12 m-3">
                      <h3>Branding</h3>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3">
                      <AdminDetail profileData={profileData} />
                    </div>

                    {isLoadingCompany ? (
                      <p>Loading</p>
                    ) : (
                      <>
                        <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-9">
                          <div className="card">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-xl-12">
                                  <div className="logoUpload logo">
                                    <label
                                      htmlFor="formFile"
                                      className="form-label"
                                    >
                                      Logo
                                    </label>
                                    <input
                                      accept="image/png"
                                      className="form-control"
                                      type="file"
                                      id="formFile"
                                      onChange={handleImageChange}
                                    />
                                    {imageError && (
                                      <span className="error">
                                        Please select brand logo.
                                      </span>
                                    )}
                                    <p>Only PNG format is supported</p>
                                  </div>
                                </div>
                                <div className="col-xl-12">
                                  <div className="logoUpload">
                                    {form.preview && (
                                      <>
                                        <div className="logoImage">
                                          <Image
                                            src={form.preview}
                                            alt="Logo Preview"
                                            width={80}
                                            height={80}
                                            loading="lazy"
                                          />
                                          <div className="deleteImg">
                                            <i
                                              className="fa-solid fa-circle-xmark"
                                              onClick={() =>
                                                setdeleteDomain(true)
                                              }
                                              style={{ fontSize: "25px" }}
                                            ></i>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>

                                  {license?.is_custom_smtp && userRole == 2 && (
                                    <div className="col-xl-12">
                                      <h5>SMTP Details</h5>
                                      <hr />
                                      <div className="row">
                                        <div className="col-xl-4">
                                          <label
                                            htmlFor="host_name"
                                            className="form-label"
                                          >
                                            SMTP Hostname
                                          </label>
                                          <input
                                            type="text"
                                            value={form.hostName}
                                            onChange={(e) =>
                                              setFormData({
                                                ...form,
                                                hostName: e?.target?.value,
                                              })
                                            }
                                            className="form-control"
                                            placeholder="google.com"
                                          />
                                          {hostNameError && (
                                            <span className="error">
                                              Please enter host name.
                                            </span>
                                          )}
                                        </div>
                                        <div className="col-xl-4">
                                          <label
                                            htmlFor="port"
                                            className="form-label"
                                          >
                                            Port
                                          </label>
                                          <input
                                            type="number"
                                            className="form-control"
                                            placeholder="30"
                                            value={form.port}
                                            onChange={(e) =>
                                              setFormData({
                                                ...form,
                                                port: e?.target?.value,
                                              })
                                            }
                                          />
                                          {portError && (
                                            <span className="error">
                                              Please enter port.
                                            </span>
                                          )}
                                        </div>
                                        <div className="col-xl-4">
                                          <label
                                            htmlFor="auth_type"
                                            className="form-label"
                                          >
                                            Authentication
                                          </label>

                                          <select
                                            name="auth_type"
                                            id="auth_type"
                                            className="form-control"
                                            value={form.authentication}
                                            onChange={(e) =>
                                              setFormData({
                                                ...form,
                                                authentication:
                                                  e?.target?.value,
                                              })
                                            }
                                          >
                                            <option value="-" hidden>
                                              Select Authentication
                                            </option>
                                            <option value="none">None</option>
                                            <option value="TLS">TLS</option>
                                            <option value="SSL">SSL</option>
                                          </select>
                                          {authenticationError && (
                                            <span className="error">
                                              Please enter authentication.
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="col-xl-12 mt-4">
                                        <div className="row">
                                          <div className="col-xl-4">
                                            <label
                                              htmlFor="user_name"
                                              className="form-label"
                                            >
                                              Username
                                            </label>
                                            <input
                                              type="text"
                                              name="user_name"
                                              className="form-control"
                                              placeholder="john cena"
                                              value={form.username}
                                              onChange={(e) =>
                                                setFormData({
                                                  ...form,
                                                  username: e?.target?.value,
                                                })
                                              }
                                            />
                                            {usernameError && (
                                              <span className="error">
                                                Please enter user name.
                                              </span>
                                            )}
                                          </div>
                                          <div className="col-xl-4">
                                            <label
                                              htmlFor="password"
                                              className="form-label"
                                            >
                                              Password
                                            </label>
                                            <input
                                              type="password"
                                              name="password"
                                              className="form-control"
                                              value={form.password}
                                              onChange={(e) =>
                                                setFormData({
                                                  ...form,
                                                  password: e?.target?.value,
                                                })
                                              }
                                            />
                                            {passwordError && (
                                              <span className="error">
                                                Please enter password.
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="mt-5 text-end">
                                  {!license?.branding ? (
                                    <button
                                      className="btn pinkButton"
                                      onClick={() => setShowUpgrade(true)}
                                    >
                                      Save Changes
                                    </button>
                                  ) : (
                                    <button
                                      className="btn pinkButton"
                                      onClick={handleSubmit}
                                    >
                                      Save Changes
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {Boolean(deleteDomain) && (
                    <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={deleteDomain}
                      className="deleteDialogOuter"
                    >
                      <DialogContent className="dialogHeader" dividers>
                        <Typography gutterBottom>
                          <div>
                            <Image
                              alt="delete"
                              src={_IMG.bin_Icon}
                              loading="lazy"
                            />
                            <p>Are you sure you want to delete logo ?</p>
                          </div>
                        </Typography>
                      </DialogContent>
                      <DialogActions className="dialogBtns">
                        <Button
                          className="delBtn"
                          onClick={() => handleDelete()}
                        >
                          Yes
                        </Button>
                        <Button
                          className="cancelBtn"
                          onClick={() => setdeleteDomain(false)}
                          autoFocus
                        >
                          No
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default BrandLogo;

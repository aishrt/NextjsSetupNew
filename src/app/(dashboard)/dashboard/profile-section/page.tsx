"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ROLES } from "@/constants/roles";
import MainLoader from "@/components/Loaders/MainLoader";
import { getFetcherWithAuth, putFormFetcher } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
import { isEmpty } from "@/utils/isEmpty";
import AdminDetails from "@/app/pageComponents/Dashboard/AdminDetails";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_image: "",
    brand_name: "",
  } as any);

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_image: "",
    brand_name: "",
  } as any);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  useEffect(() => {
    fetchIProfileData();
  }, []);

  const fetchIProfileData = () => {
    setIsLoading(true);
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
        setIsLoading(false);
        setIsLoadingSave(false);
      });
  };

  const saveData = async (e: any) => {
    e.preventDefault();
    if (
      profileData?.first_name == "" ||
      profileData?.last_name == "" ||
      profileData?.email == "" ||
      profileData?.brand_name == ""
    ) {
      setError({
        ...error,
        first_name:
          profileData.first_name == ""
            ? "Please Enter First Name"
            : error?.first_name,
        last_name:
          profileData?.last_name == ""
            ? "Please Enter Last Name"
            : error?.last_name,
        email: profileData.email == "" ? "Please Enter Email" : error.email,
        brand_name:
          profileData.brand_name == ""
            ? "Please Enter Company Name"
            : error.brand_name,
      });
      return false;
    }
    setIsLoadingSave(true);
    const formData = new FormData();
    formData.append("email", profileData.email),
      formData.append("first_name", profileData.first_name),
      formData.append("last_name", profileData.last_name);
    formData.append("brand_name", profileData.brand_name);
    putFormFetcher(API_ROUTES.UPDATE_PROFILE, formData)
      .then(async (res: any) => {
        if (res?.data?.logout == true) {
          await signOut({ callbackUrl: "/" });
          toast.success(res.message);
        }
        if (!res?.status) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
          fetchIProfileData();
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadingSave(false);
      });
  };
  return (
    <div className="graphSection">
      <div className="dashboardTopCard">
        {isLoading ? (
          <MainLoader />
        ) : (
          <div className="profileSection">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-xl-12 m-3">
                  <h3 className="fw-bolder">Profile</h3>
                </div>
                <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-3 col-sm-12 adminData">
                  <AdminDetails profileData={profileData} />
                </div>
                <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-9  col-sm-12 profileData">
                  <form onSubmit={saveData}>
                    <div className="card">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-semibold">My Profile Data</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label htmlFor="profile">First Name</label>
                            <input
                              className="form-control"
                              type="text"
                              aria-label=""
                              name="first_name"
                              value={profileData?.first_name}
                              onChange={(e) => {
                                setProfileData({
                                  ...profileData,
                                  first_name: e.target.value,
                                });
                                setError({
                                  ...error,
                                  first_name: null,
                                });
                              }}
                            ></input>
                          </div>
                          {error.first_name && (
                            <span className="error">{error.first_name}</span>
                          )}
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label htmlFor="profile">Last Name</label>
                            <input
                              className="form-control"
                              type="text"
                              aria-label=""
                              name="last_name"
                              value={profileData?.last_name}
                              onChange={(e) => {
                                setProfileData({
                                  ...profileData,
                                  last_name: e.target.value,
                                });
                                setError({
                                  ...error,
                                  last_name: null,
                                });
                              }}
                            ></input>
                          </div>
                          {error.last_name && (
                            <span className="error">{error.last_name}</span>
                          )}
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label htmlFor="emailAddress">Email address</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="name@example.com"
                              value={profileData?.email}
                              onChange={(e) => {
                                setProfileData({
                                  ...profileData,
                                  email: e.target.value,
                                });
                                setError({
                                  ...error,
                                  email: null,
                                });
                              }}
                            />
                          </div>
                          {error.email && (
                            <span className="error">{error.email}</span>
                          )}
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label htmlFor="profile">Company Name</label>
                            <input
                              className="form-control"
                              type="text"
                              aria-label=""
                              name="last_name"
                              value={profileData?.brand_name}
                              onChange={(e) => {
                                setProfileData({
                                  ...profileData,
                                  brand_name: e.target.value,
                                });
                                setError({
                                  ...error,
                                  brand_name: null,
                                });
                              }}
                              disabled={
                                profileData?.role == ROLES.ADMIN ? false : true
                              }
                            ></input>
                          </div>
                          {error.brand_name && (
                            <span className="error">{error.brand_name}</span>
                          )}
                        </div>
                        <div className="col-xl-6"></div>
                        <div className="col-xl-12">
                          <div className="saveSection">
                            <div className="row ">
                              <div className="margin"></div>
                              <div className="col-xl-12 saveButton text-end">
                                <button
                                  title="Save Changes"
                                  className="btn pinkButton"
                                  type="submit"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;

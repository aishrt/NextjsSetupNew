"use client";

import { isTokenExpired, putFormFetcher } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
import AdminDetails from "@/app/pageComponents/Dashboard/AdminDetails";
import MainLoader from "@/components/Loaders/MainLoader";
import ProfileSectionLoader from "@/components/Loaders/ProfileSectionLoader";
import { _ENV_VARIABLES } from "@/constants/envVariables";
import getCurrentUser from "@/lib/session";
import { isEmpty } from "@/utils/isEmpty";
import { useStore } from "@/utils/store";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BACKEND_API_URL = _ENV_VARIABLES.NEXT_PUBLIC_BACKEND_API_URL;

const ProfilePage = () => {
  const { digestReportVal, dmarcReportVal, domainReportVal, alertVal } =
    useStore();

  const [profileData, setProfileData] = useState({
    weekly_digest_report: false,
    weekly_domain_report: false,
    weekly_dmarc_report: false,
    alert: false,
  } as any);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    setIsLoading(true);
    let url = API_ROUTES.VIEW_PROFILE;
    const users = await getCurrentUser();
    const isTokenValid = await isTokenExpired(users.token);
    if (!isTokenValid) {
      signOut({ callbackUrl: "/" });
      return;
    }
    let headers: any = {
      "Content-Type": "application/json",
    };
    if (!isEmpty(users) && !isEmpty(users.token)) {
      headers["Authorization"] = `Bearer ${users.token}`;
    }
    const res = await fetch(`${BACKEND_API_URL}${url}`, {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    });
    let resData = await res.json();
    resData.data.preview = resData.data.profile_image
      ? BACKEND_API_URL + resData.data.profile_image
      : "/assets/images/profile.png";
    setProfileData(resData.data);
    setIsLoading(false);
  };

  const saveData = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("weekly_digest_report", profileData.weekly_digest_report);
    formData.append("weekly_domain_report", profileData.weekly_domain_report);
    formData.append("weekly_dmarc_report", profileData.weekly_dmarc_report);
    formData.append("alert", profileData.alert);

    const res = await putFormFetcher(
      "/api/v1/account/update-notification",
      formData
    );
    if (res?.data?.logout == true) {
      signOut({ callbackUrl: "/" });
      toast.success(res.message);
    }
    if (!res?.status) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      getProfileData();
    }
  };

  return (
    <div className="graphSection">
      <div className="dashboardTopCard">
        {isLoading ? (
          <ProfileSectionLoader profileData={profileData} />
        ) : (
          <div className="profileSection">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-xl-12 m-3">
                  <h3>Profile</h3>
                </div>
                <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-3 col-sm-12 adminData">
                  <AdminDetails profileData={profileData} />
                </div>
                <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-9  col-sm-12 profileData">
                  <form onSubmit={saveData}>
                    <div className="card">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-semibold">Notifications</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="reportSection">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                disabled={!digestReportVal}
                                name="weekly_digest_report"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                checked={profileData?.weekly_digest_report}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    weekly_digest_report:
                                      !profileData.weekly_digest_report,
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexSwitchCheckChecked"
                              >
                                Weekly digest report
                              </label>
                              <p>
                                Receive weekly report for all configured
                                domains.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="reportSection">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                disabled={!domainReportVal}
                                name="weekly_domain_report"
                                role="switch"
                                id="weekly_domain_report"
                                checked={profileData?.weekly_domain_report}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    weekly_domain_report:
                                      !profileData.weekly_domain_report,
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="weekly_domain_report"
                              >
                                Weekly domain report
                              </label>
                              <p>
                                Receive weekly report for all configured
                                domains.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="reportSection">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="weekly_dmarc_report"
                                role="switch"
                                disabled={!dmarcReportVal}
                                id="weekly_dmarc_report"
                                checked={profileData?.weekly_dmarc_report}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    weekly_dmarc_report:
                                      !profileData.weekly_dmarc_report,
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="weekly_dmarc_report"
                              >
                                Weekly dmarc report
                              </label>
                              <p>
                                Receive weekly report for all configured
                                domains.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="reportSection">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="alerts"
                                role="switch"
                                disabled={!alertVal}
                                id="alert"
                                checked={profileData?.alert}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    alert: !profileData.alert,
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="alerts"
                              >
                                Alert
                              </label>
                            </div>
                          </div>
                        </div>
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

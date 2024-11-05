"use client";
import { isTokenExpired } from "@/@core/apiFetcher";
import AdminDetail from "@/app/pageComponents/Dashboard/AdminDetails";
import getCurrentUser from "@/lib/session";
import { isEmpty } from "lodash";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_ROUTES } from "@/@core/apiRoutes";
import { getLicenseData } from "@/@core/apiFetcher";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import MainLoader from "@/components/Loaders/MainLoader";
import { useStore } from "@/utils/store";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const License = () => {
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    weekly_digest_report: false,
  });

  const [license, setLicense] = useState("" as any);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoader, setIsLoader] = useState(true);

  const getProfileData = async () => {
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
      {
        method: "GET",
        headers,
        next: {
          revalidate: 0,
        },
      }
    );
    let resData = await res.json();
    resData.data.preview = resData.data.profile_image
      ? process.env.NEXT_PUBLIC_BACKEND_API_URL + resData.data.profile_image
      : "/assets/images/profile.png";
    setProfileData(resData.data);
    setProfileData(resData.data);
  };

  const { licenseValidation } = useStore();
  useEffect(() => {
    setIsLoading(true);
    const fetchLicenseData = async () => {
      const resData = await getLicenseData();
      if (resData) {
        setLicense(resData.data);
      }
    };
    setIsLoading(false);
    fetchLicenseData();
  }, []);

  useEffect(() => {
    getProfileData();
  }, []);

  const manageChangePlan = async ({ profileData }: any) => {
    const user = await getCurrentUser();
    const redirectURL = process?.env?.NEXT_PUBLIC_URL;

    await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_KEY}`,
      },
      body: `customer=${license?.stripe_customer_id}&return_url=${redirectURL}/dashboard/dashboard`,
    })
      .then((response) => response.json())
      .then((data) => {
        const url = data.url;

        router.push(url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <LicenseWarningsCompo
        onSetIsLoading={(value: any) => setIsLoader(value)}
        onSetLicenseData={(resData: any) => {
          if (resData) {
            setLicense(resData.data);
          }
        }}
      />
      <div className="graphSection">
        <div className="dashboardTopCard">
          {isLoading || isLoader ? (
            <MainLoader />
          ) : (
            <div className="license">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-12 m-3">
                    <h3 className="fw-bolder">License</h3>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12">
                    <AdminDetail profileData={profileData} />
                  </div>
                  <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-12">
                    <div className="row margin">
                      <div className="col-xl-12">
                        <div className="card">
                          <div className="card-header">
                            <img
                              src="/assets/images/card.svg"
                              alt=""
                              loading="lazy"
                            />
                            <h5 className="fw-bolder">License</h5>
                          </div>
                          <div className="card-body">
                            {license?.plan_name !== null ? (
                              <div className="row">
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                  <h6>Plan Name</h6>
                                  <p>{license?.plan_name}</p>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                  <h6>ISSUED ON</h6>
                                  <p>{license?.start_date}</p>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                  <h6>TYPE</h6>
                                  <p>{license?.plan_type}</p>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                  <h6>EXPIRES</h6>
                                  <p>
                                    {license?.end_date
                                      ? license?.end_date
                                      : "Unlimited"}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center text-gray-600">
                                <p>No plan found yet.</p>
                              </div>
                            )}
                            {license && license?.plan_name == "Free Plan" ? (
                              <button
                                className="btn pinkButton changeButton"
                                type="submit"
                                onClick={() =>
                                  router.push("/dashboard/pricing")
                                }
                              >
                                Upgrade Plan
                              </button>
                            ) : (
                              <button
                                className="btn pinkButton changeButton"
                                type="submit"
                                onClick={() => manageChangePlan(profileData)}
                                title="Manage Plan"
                                // onClick={() => router.push("/dashboard/pricing")}
                                //jkvf
                              >
                                Manage Plan
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {license?.domains?.limit !== null && (
                        <div className="col-xl-12 mt-3">
                          <div className="card">
                            <div className="card-header">
                              <img
                                src="/assets/images/domainIcon.svg"
                                alt=""
                                loading="lazy"
                              />
                              <h5 className="fw-bolder">Domains</h5>
                            </div>
                            <div className="card-body">
                              <div className="row">
                                <div className="col-xl-3">
                                  <h6>Limit</h6>
                                  <p>{license?.domains?.limit}</p>
                                </div>
                                <div className="col-xl-3">
                                  <h6>Usage</h6>
                                  <p>
                                    {license?.domains?.usage}/
                                    {license?.domains?.limit} Used
                                  </p>
                                  <div className="progress" role="progressbar">
                                    <div
                                      className="progress-bar"
                                      style={{
                                        width: `${(
                                          (license?.domains?.usage /
                                            license?.domains?.limit) *
                                          100
                                        ).toFixed(2)}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {license?.volume?.limit !== null && (
                        <div className="col-xl-12 mt-3">
                          <div className="card">
                            <div className="card-header">
                              <img
                                src="/assets/images/envelope.svg"
                                alt=""
                                loading="lazy"
                              />
                              <h5 className="fw-bolder">Volume</h5>
                            </div>
                            <div className="card-body">
                              <div className="row">
                                <div className="col-xl-3">
                                  <h6>Limit</h6>
                                  <p>{license?.volume?.limit} per month</p>
                                </div>
                                <div className="col-xl-3">
                                  <h6>Usage</h6>
                                  <p>
                                    {licenseValidation?.emailUsage}/
                                    {license?.volume?.limit} Used
                                  </p>
                                  <div className="progress" role="progressbar">
                                    <div
                                      className="progress-bar"
                                      style={{
                                        width: `${(
                                          (licenseValidation?.emailUsage /
                                            license?.volume?.limit) *
                                          100
                                        ).toFixed(2)}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {license?.users?.limit !== null && (
                        <div className="col-xl-12 mt-3">
                          <div className="card">
                            <div className="card-header">
                              <img
                                src="/assets/images/users.svg"
                                alt=""
                                loading="lazy"
                              />
                              <h5 className="fw-bolder">Users</h5>
                            </div>
                            <div className="card-body">
                              <div className="row">
                                <div className="col-xl-3">
                                  <h6>Limit</h6>
                                  <p>{license?.users?.limit}</p>
                                </div>
                                <div className="col-xl-3">
                                  <h6>Usage</h6>
                                  <p>
                                    {license?.users?.usage}/
                                    {license?.users?.limit} Used
                                  </p>
                                  <div className="progress" role="progressbar">
                                    <div
                                      className="progress-bar"
                                      style={{
                                        width: `${(
                                          (license?.users?.usage /
                                            license?.users?.limit) *
                                          100
                                        ).toFixed(2)}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {license?.senders?.limit !== null && (
                        <div className="col-xl-12 mt-3">
                          <div className="card">
                            <div className="card-header">
                              <img
                                src="/assets/images/sender.png"
                                alt=""
                                loading="lazy"
                              />
                              <h5 className="fw-bolder">Senders</h5>
                            </div>
                            <div className="card-body">
                              <div className="row">
                                <div className="col-xl-3">
                                  <h6>Limit</h6>
                                  <p>{license?.senders?.limit}</p>
                                </div>
                                <div className="col-xl-3">
                                  <h6>Usage</h6>
                                  <p>
                                    {license?.senders?.usage}/
                                    {license?.senders?.limit} Used
                                  </p>
                                  <div className="progress" role="progressbar">
                                    <div
                                      className="progress-bar"
                                      style={{
                                        width: `${(
                                          (license?.senders?.usage /
                                            license?.senders?.limit) *
                                          100
                                        ).toFixed(2)}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-xl-12 mt-3">
                        <div className="card">
                          <div className="card-header">
                            <img
                              src="/assets/images/plan.svg"
                              alt=""
                              loading="lazy"
                            />
                            <h5 className="fw-bolder">Plan Features</h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-4">
                                <label
                                  htmlFor="username"
                                  className="form-label"
                                >
                                  Data History
                                </label>
                                <input
                                  type="text"
                                  name="datahistory"
                                  className="form-control"
                                  placeholder="johnwick@example.com"
                                  value=" 3 Months"
                                  disabled
                                />
                              </div>

                              <div className="col-xl-4">
                                <label
                                  htmlFor="username"
                                  className="form-label"
                                >
                                  Audit
                                </label>
                                <input
                                  type="text"
                                  name="audit"
                                  className="form-control"
                                  placeholder="johnwick@example.com"
                                  value="Annually"
                                  disabled
                                />
                              </div>
                              <div className="col-xl-8">
                                <div className="selectPlans">
                                  <FormGroup className="abc123">
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6">
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={
                                                licenseValidation?.ipSourcMonitoring
                                              }
                                            />
                                          }
                                          label="IP Source Monitoring"
                                        />
                                      </div>

                                      <div className="col-lg-6 col-md-6">
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={
                                                licenseValidation?.showWeeklyEmailReports
                                              }
                                            />
                                          }
                                          label="Weekly Email Reports"
                                        />
                                      </div>

                                      <div className="col-lg-6 col-md-6">
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={
                                                licenseValidation?.showTlsReport
                                              }
                                            />
                                          }
                                          label="TLS Reports"
                                        />
                                      </div>

                                      <div className="col-lg-6 col-md-6">
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={
                                                licenseValidation?.showDnsTimeline
                                              }
                                            />
                                          }
                                          label="DNS History"
                                        />
                                      </div>

                                      <div className="col-lg-6 col-md-6">
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={
                                                licenseValidation?.showAiAnalytics
                                              }
                                            />
                                          }
                                          label="AI Analytics"
                                        />
                                      </div>

                                      <div className="col-lg-6 col-md-6">
                                        <FormControlLabel
                                          control={<Checkbox checked={false} />}
                                          label="BIMI Setup and Implementation"
                                        />
                                      </div>

                                      <div className="col-lg-6 col-md-6">
                                        <FormControlLabel
                                          control={<Checkbox checked={false} />}
                                          label="Reputation Monitoring"
                                        />
                                      </div>

                                      <div className="col-lg-6 col-md-6">
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={
                                                licenseValidation?.showAlerts
                                              }
                                            />
                                          }
                                          label="Smart alerts"
                                        />
                                      </div>

                                      <div className="col-lg-6 col-md-6">
                                        <FormControlLabel
                                          control={<Checkbox checked={false} />}
                                          label="User permissioning"
                                        />
                                      </div>

                                      <div className="col-lg-6 col-md-6">
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={
                                                licenseValidation?.showBranding
                                              }
                                            />
                                          }
                                          label="White Label"
                                        />
                                      </div>
                                    </div>
                                  </FormGroup>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default License;

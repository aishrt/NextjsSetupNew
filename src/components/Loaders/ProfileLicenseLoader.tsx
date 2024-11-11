"use client";

import AdminDetails from "@/app/pageComponents/Dashboard/AdminDetails";
import { Skeleton } from "@mui/material";

const ProfileLicenseLoader = ({ profileData }: { profileData: any }) => {
  return (
    <div className="graphSection">
      <div className="dashboardTopCard">
        <div className="profileSection">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 m-3">
                <h3 className="fw-bolder">Profile</h3>
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-3 col-sm-12 adminData">
                <AdminDetails profileData={profileData} />
              </div>
              <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-12">
                <div className="row margin">
                  <div className="col-xl-12 mt-3">
                    <div className="card">
                      <Skeleton
                        animation="wave"
                        variant="text"
                        height={60}
                        width={100}
                        style={{
                          marginBottom: "-22px",
                        }}
                      />
                      <div className="card-body">
                        <Skeleton
                          animation="wave"
                          variant="text"
                          height={180}
                          style={{
                            marginBottom: "-22px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 mt-3">
                    <div className="card">
                      <Skeleton
                        animation="wave"
                        variant="text"
                        height={60}
                        width={100}
                        style={{
                          marginBottom: "-22px",
                        }}
                      />
                      <div className="card-body">
                        <Skeleton
                          animation="wave"
                          variant="text"
                          height={180}
                          style={{
                            marginBottom: "-22px",
                          }}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div className="col-xl-12 mt-3">
                    <div className="card">
                      <Skeleton
                        animation="wave"
                        variant="text"
                        height={60}
                        width={100}
                        style={{
                          marginBottom: "-22px",
                        }}
                      />
                      <div className="card-body">
                        <Skeleton
                          animation="wave"
                          variant="text"
                          height={180}
                          style={{
                            marginBottom: "-22px",
                          }}
                        />
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
  );
};

export default ProfileLicenseLoader;

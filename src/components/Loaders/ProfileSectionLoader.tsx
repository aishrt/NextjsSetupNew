"use client";

import AdminDetails from "@/app/pageComponents/Dashboard/AdminDetails";
import { Skeleton } from "@mui/material";

const ProfileSectionLoader = ({ profileData }: { profileData: any }) => {
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
              <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-9 col-sm-12 profileData">
                <div className="card">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-semibold">
                      <Skeleton
                        animation="wave"
                        variant="text"
                        height={80}
                        width={250}
                      />
                    </h4>
                  </div>
                  <div className="LoaderProfileeMain ">
                    <div
                      style={{
                        margin: "-62px 0",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        variant="text"
                        //   style={{ padding: "160px 0px" }}
                        height={360}
                      />
                    </div>

                    <div className="col-xl-12">
                      <div className="saveSection">
                        <div className="row">
                          <div className="col-xl-12 d-flex saveButton justify-content-end">
                            <Skeleton
                              animation="wave"
                              variant="text"
                              height={80}
                              width={100}
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
      </div>
    </div>
  );
};

export default ProfileSectionLoader;

import { Skeleton } from "@mui/material";

export default function SendEmailLoader() {
  return (
    <>
      <div className="graphSection">
        <div className="dashboardTopCard">
          <div className="addUser">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-header">
                      <Skeleton animation="wave" variant="text" height={100} />
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="row">
                            <div className="col-xl-4">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={100}
                              />
                            </div>

                            <div className="col-xl-4">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={100}
                              />
                            </div>
                            <div className="col-xl-4 ">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={100}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 mt-4">
                          <div className="row">
                            <div className="col-xl-5">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={100}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 mt-4">
                          <div className="row">
                            <div className="col-xl-11">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={100}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="row">
                            <div className="col-xl-12 mt-3">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={100}
                              />
                              <hr />
                            </div>
                            <div className="col-xl-12">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                height={100}
                              />
                              <div className="row">
                                <div className="col-xl-4">
                                  <Skeleton
                                    animation="wave"
                                    variant="text"
                                    height={100}
                                  />
                                </div>
                                <div className="col-xl-4">
                                  <Skeleton
                                    animation="wave"
                                    variant="text"
                                    height={100}
                                  />
                                </div>
                                <div className="col-xl-4">
                                  <Skeleton
                                    animation="wave"
                                    variant="text"
                                    height={100}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-12 mt-4">
                              <div className="row">
                                <div className="col-xl-4">
                                  <Skeleton
                                    animation="wave"
                                    variant="text"
                                    height={100}
                                  />
                                </div>

                                <div className="col-xl-4">
                                  <Skeleton
                                    animation="wave"
                                    variant="text"
                                    height={100}
                                  />
                                </div>
                                <div className="col-xl-4">
                                  <Skeleton
                                    animation="wave"
                                    variant="text"
                                    height={100}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-6 saveButton mt-5">
                          <Skeleton
                            animation="wave"
                            variant="text"
                            height={100}
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
    </>
  );
}

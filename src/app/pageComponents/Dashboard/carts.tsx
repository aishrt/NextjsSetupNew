"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const CartsDashboard = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.error.main;

  return (
    <>
      <div className="graphSection p-x-100-y-50">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h3>
                    <Image
layout="intrinsic"
                      className="failureImg"
                      alt={``}
                      src={_IMG.cancel}
                      loading="lazy"
                    />{" "}
                    Top 5 failure sources
                  </h3>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Source</th>
                          <th>Volume</th>
                          <th>Compliance</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>aruba.it</td>
                          <td>12</td>
                          <td>
                            <span className="failure">25%</span>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic"
                                alt={``}
                                src={_IMG.right_arrow}
                                loading="lazy"
                              />
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>aruba.it</td>
                          <td>12</td>
                          <td>
                            <span className="failure">25%</span>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic"
                                alt={``}
                                src={_IMG.right_arrow}
                                loading="lazy"
                              />
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>aruba.it</td>
                          <td>12</td>
                          <td>
                            <span className="failure">25%</span>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic"
                                alt={``}
                                src={_IMG.right_arrow}
                                loading="lazy"
                              />
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>aruba.it</td>
                          <td>12</td>
                          <td>
                            <span className="failure">25%</span>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic"
                                alt={``}
                                src={_IMG.right_arrow}
                                loading="lazy"
                              />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h3>
                    <Image
layout="intrinsic" alt={``} src={_IMG.checkmarcGreen} loading="lazy" />{" "}
                    Top compliant sources
                  </h3>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Source</th>
                          <th>Volume</th>
                          <th>Compliance</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>aruba.it</td>
                          <td>12</td>
                          <td>
                            <span className="complete">25%</span>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic"
                                alt={``}
                                src={_IMG.right_arrow}
                                loading="lazy"
                              />
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>aruba.it</td>
                          <td>12</td>
                          <td>
                            <span className="complete">25%</span>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic"
                                alt={``}
                                src={_IMG.right_arrow}
                                loading="lazy"
                              />
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>aruba.it</td>
                          <td>12</td>
                          <td>
                            <span className="complete">25%</span>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic"
                                alt={``}
                                src={_IMG.right_arrow}
                                loading="lazy"
                              />
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>aruba.it</td>
                          <td>12</td>
                          <td>
                            <span className="complete">25%</span>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic"
                                alt={``}
                                src={_IMG.right_arrow}
                                loading="lazy"
                              />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-xl-3">
                      <h3 className="text-start">Details</h3>
                    </div>
                    <div className="col-xl-9">
                      <div className="headerBtns">
                        <div className="btn-group">
                          <a href="#" className="btn compliant">
                            Compliant
                          </a>
                          <a href="#" className="btn notCompliant">
                            Not Compliant
                          </a>
                          <a href="#" className="btn unknown">
                            Unknown/Threat
                          </a>
                          <a href="#" className="btn forward">
                            Forward
                          </a>
                          <a href="#" className="btn sources active">
                            All Sources
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Source</th>
                          <th>IP Count</th>
                          <th>From:Domains</th>
                          <th>Volume</th>
                          <th>Compliance</th>
                          <th>SPF</th>
                          <th>DKIN</th>
                          <th>Forward</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>Outlook.com</td>
                          <td>4</td>
                          <td>1</td>
                          <td>1</td>
                          <td>
                            <span className="failure">0%</span>
                          </td>
                          <td className="progressSection">
                            <div
                              className="progress threat"
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <p className="threatText">45%</p>
                          </td>
                          <td className="progressSection">
                            <div
                              className="progress nocpmpliant"
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <p className="nocpmpliantText">45%</p>
                          </td>
                          <td className="progressSection">
                            <div
                              className="progress cpmpliant"
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <p className="cpmpliantText">45%</p>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic"
                                alt={``}
                                src={_IMG.right_arrow}
                                loading="lazy"
                              />
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>Outlook.com</td>
                          <td>4</td>
                          <td>1</td>
                          <td>1</td>
                          <td>
                            <span className="failure">0%</span>
                          </td>
                          <td className="progressSection">
                            <div
                              className="progress threat"
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <p className="threatText">45%</p>
                          </td>
                          <td className="progressSection">
                            <div
                              className="progress nocpmpliant"
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <p className="nocpmpliantText">45%</p>
                          </td>
                          <td className="progressSection">
                            <div
                              className="progress cpmpliant"
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <p className="cpmpliantText">45%</p>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic" alt={``} src={_IMG.right_arrow} />
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>Outlook.com</td>
                          <td>4</td>
                          <td>1</td>
                          <td>1</td>
                          <td>
                            <span className="failure">0%</span>
                          </td>
                          <td className="progressSection">
                            <div
                              className="progress threat"
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <p className="threatText">45%</p>
                          </td>
                          <td className="progressSection">
                            <div
                              className="progress nocpmpliant"
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <p className="nocpmpliantText">45%</p>
                          </td>
                          <td className="progressSection">
                            <div
                              className="progress cpmpliant"
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <p className="cpmpliantText">45%</p>
                          </td>
                          <td>
                            <a href="">
                              <Image
layout="intrinsic"
                                alt={``}
                                src={_IMG.right_arrow}
                                loading="lazy"
                              />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CartsDashboard;

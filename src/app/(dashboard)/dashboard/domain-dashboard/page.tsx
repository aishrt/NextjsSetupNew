"use client";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const DomainDashboard = () => {
  return (
    <div>
      <div className="graphSection">
        <div className="dashboardTopCard">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="col-xl-12">
                  <h4>Domains</h4>
                  <p>
                    In this section you can manage your domains and get an
                    overview of their health status
                  </p>
                </div>
                <div className="col-xl-12 ">
                  <div className="domainFilter">
                    <div className="card">
                      <div className="row domainSection">
                        <div className="col-xl-12">
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group domain-filter">
                                <label>Domains</label>
                                <FormControl fullWidth disabled={true}>
                                  <Select
                                    label="Domain"
                                    required
                                    className="domain-filter"
                                  ></Select>
                                </FormControl>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div className="form-group">
                                <FormControl fullWidth>
                                  <label>Start Date</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    disabled={true}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div className="form-group">
                                <FormControl fullWidth>
                                  <label>End Date</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    disabled={true}
                                  />
                                </FormControl>
                              </div>
                            </div>

                            <div className="col-lg-2">
                              <div className="form-group filtersButton">
                                <Stack spacing={2} direction="row">
                                  <Button className="btn blueButton">
                                    Filter
                                  </Button>
                                </Stack>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="offset-xl-3 col-xl-6"></div>
                      </div>
                      <div className="col-xl-12 mt-4">
                        <div className="row">
                          <div className="col-xl-3">
                            <div className="entries d-flex gap-2 align-items-center ">
                              <label>Show </label>
                              <select name="entry" id="entry">
                                <option value="50">50</option>
                                <option value="60">60</option>
                                <option value="70">70</option>
                                <option value="100">100</option>
                              </select>
                              <span>entries</span>
                            </div>
                          </div>
                          <div className="col-xl-9">
                            <div className="domainButtons d-flex gap-3 justify-content-end">
                              <button className="btn btn-primary">
                                <a href="">
                                  <i className="fa-solid fa-plus"></i>
                                  Add Domain
                                </a>
                              </button>
                              <div className="dropdown import">
                                <button
                                  className="btn btn-primary dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <a href="">
                                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                    Import From
                                  </a>
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                    CSV
                                  </li>
                                </ul>
                              </div>

                              <div className="dropdown manage">
                                <button
                                  className="btn btn-primary dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <a href="">
                                    <i className="fa-solid fa-gears"></i>
                                    Manage
                                  </a>
                                </button>
                                <ul className="dropdown-menu">
                                  <li>Domains</li>
                                  <li>Groups</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-5">
                          <div className="col-xl-12">
                            <table className="table">
                              <div className="table-responsive">
                                <tbody className="accTable">
                                  <tr>
                                    <td>
                                      <span className="domainbottomFilters">
                                        <div
                                          className="accordion accordion-flush"
                                          id="accordionFlushExample"
                                        >
                                          <div className="accordion-item">
                                            <div className="accordion-header">
                                              <div className="col-xl-1 col-md-1 col-sm-1 d-flex align-items-center">
                                                <div
                                                  className="accordion-button collapsed"
                                                  data-bs-toggle="collapse"
                                                  data-bs-target="#flush-collapseOne"
                                                  aria-expanded="false"
                                                  aria-controls="flush-collapseOne"
                                                ></div>
                                                <img
                                                  className="header-image"
                                                  src="/assets/images/checkmarcGreen.svg"
                                                  alt=""
                                                  loading="lazy"
                                                />
                                              </div>
                                              <div className="col-xl-3 col-md-3 col-sm-3">
                                                <p className="site">
                                                  www.google.com
                                                </p>
                                              </div>
                                              <div className="col-xl-2 col-md-2 col-sm-2">
                                                <div className="dropdown">
                                                  <div
                                                    className="dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                  >
                                                    <a href="">
                                                      <i className="fa-solid fa-shield"></i>
                                                      DMARC
                                                    </a>
                                                  </div>
                                                  class{" "}
                                                  <ul className="dropdown-menu">
                                                    <li>
                                                      <a href="">
                                                        Record Wizard
                                                      </a>
                                                    </li>
                                                    <li>
                                                      <a href="">Publish</a>
                                                    </li>
                                                    <li>
                                                      <a href="">
                                                        Manage Record
                                                      </a>
                                                    </li>
                                                    <li>
                                                      <hr />
                                                    </li>
                                                    <li>
                                                      <a href="">
                                                        Show published record
                                                      </a>
                                                    </li>
                                                  </ul>
                                                </div>
                                                <span>p=none</span>
                                              </div>
                                              <div className="col-xl-2 col-md-2 col-sm-2">
                                                <div className="dropdown">
                                                  <div
                                                    className="dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                  >
                                                    <a href="">
                                                      <i className="fa-solid fa-key"></i>
                                                      DKIM
                                                    </a>
                                                  </div>
                                                  <ul className="dropdown-menu">
                                                    <li>
                                                      <a href="">
                                                        Record Wizard
                                                      </a>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                              <div className="col-xl-2 col-md-2 col-sm-2">
                                                <div className="dropdown">
                                                  <div
                                                    className="dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                  >
                                                    <a href="">
                                                      <i className="fa-solid fa-key"></i>
                                                      SPF
                                                    </a>
                                                  </div>
                                                  <ul className="dropdown-menu">
                                                    <li>
                                                      <a href="">
                                                        Record Wizard
                                                      </a>
                                                    </li>
                                                    <li>
                                                      <hr />
                                                    </li>
                                                    <li>
                                                      <a href="">
                                                        Record Published Wizard
                                                      </a>
                                                    </li>
                                                  </ul>
                                                </div>
                                                <span>~all</span>
                                              </div>
                                              <div className="col-xl-2 col-md-2 col-sm-2">
                                                <div className="updateButtons">
                                                  <a href="" className="edit">
                                                    <i className="fa-solid fa-pen"></i>
                                                  </a>
                                                  <a href="" className="delete">
                                                    <i className="fa-solid fa-trash"></i>
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="flush-collapseOne"
                                              className="accordion-collapse collapse"
                                              data-bs-parent="#accordionFlushExample"
                                            >
                                              <div className="accordion-body">
                                                <div className="message success">
                                                  <p>
                                                    Great! Your domain is
                                                    healthy.
                                                  </p>
                                                  <span className="issues">
                                                    No issues found.
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </div>
                            </table>
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
export default DomainDashboard;

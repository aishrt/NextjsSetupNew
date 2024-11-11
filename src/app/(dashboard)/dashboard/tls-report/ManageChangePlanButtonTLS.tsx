"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LanguageIcon from "@mui/icons-material/Language";
import CancelIcon from "@mui/icons-material/Cancel";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  Box,
  Card,
  LinearProgress,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import PieChartComponent from "@/components/Charts/pieChart";
import EmailBarCharts from "@/components/Charts/emailBarCharts";
import TableToolbar from "@/components/Table-ui/TableToolbar";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";
import TableHeadRow, { StyledTableCell, StyledTableNoData, StyledTableRow } from "@/components/Table-ui/TableHeadRow";
import { isEmpty } from "@/utils/isEmpty";
import { headCellTLSReport } from "@/components/Table-ui/headCells";
import UpgradePlanComponent from "@/app/pageComponents/Others/UpgradePlanComponent";


const ManageChangePlanButtonTLS = ({ data }: { data: any }) => {
  const router = useRouter();

  const [showUpgrade, setShowUpgrade] = useState(true);

  const handleCloseUpgradePlan = () => {
    setShowUpgrade(false);
  };

  return (
    <>
      <div className="col-xl-12">
        <div className=" mt-4 mb-4 aiCard">
          <div className="card-body chatBoxInd">
            <p>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="tlsReport__Content">
                      <div className="">
                        <div
                          className="dashboardTopCard"
                          style={{
                            padding: "0px 0  30px 0px",
                          }}
                        >
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="row">
                                <div
                                  className="col-xl-3 "
                                  onClick={() =>
                                    router.push("/dashboard/domain")
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <div
                                    className="cardInner reports"
                                    title="Domains"
                                  >
                                    <div className="cardInnerContent ">
                                      <div className="cardIcon">
                                        <LanguageIcon className="iconSize reports" />
                                      </div>
                                      <div className="cardText">
                                        <h4>Sending Source </h4>

                                        <p>
                                          {data?.summary?.total_sending_source
                                            ? data?.summary
                                                ?.total_sending_source
                                            : 0}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-3">
                                  <div
                                    className="cardInner volume"
                                    title="Volume"
                                  >
                                    <div className="cardInnerContent">
                                      <div className="cardIcon">
                                        <AssessmentIcon className="iconSize volume" />
                                      </div>
                                      <div className="cardText">
                                        <h4>Total Reports </h4>
                                        <p>
                                          {data?.summary?.total_reports
                                            ? data?.summary?.total_reports
                                            : 0}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-xl-3">
                                  <div
                                    className="cardInner compliants"
                                    title="Source"
                                  >
                                    <div className="cardInnerContent">
                                      <div className="cardIcon">
                                        <CheckCircleIcon className="iconSize compliants" />
                                      </div>
                                      <div className="cardText">
                                        <h4>Success Count</h4>
                                        <p>
                                          {data?.summary?.total_success
                                            ? data?.summary?.total_success
                                            : 0}
                                          <span
                                            className={`subText ${
                                              data?.summary?.total_success_per <
                                              30
                                                ? "failure"
                                                : data?.summary
                                                    ?.total_success_per > 30 &&
                                                  data?.summary
                                                    ?.total_success_per <= 80
                                                ? "passTable"
                                                : "complete"
                                            }`}
                                          >
                                            {` (${
                                              data?.summary
                                                ?.total_success_per || 0
                                            }%)`}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-3">
                                  <div
                                    className="cardInner failures"
                                    title="Failures"
                                  >
                                    <div className="cardInnerContent">
                                      <div className="cardIcon">
                                        <CancelIcon className="iconSize failures" />
                                      </div>
                                      <div className="cardText">
                                        <h4>Failure Count</h4>
                                        <p>
                                          {data?.summary?.total_failure
                                            ? data?.summary?.total_failure
                                            : 0}
                                          <span className="subText failure">
                                            {`(${
                                              data?.summary?.total_fail_per?.toFixed(
                                                2
                                              ) || 0
                                            }%)`}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {data?.pie_chart?.length >= 1 &&
                      data?.graph_data?.length >= 1 ? (
                        <div className="row borderBoxes">
                          <div className="col-lg-5">
                            {data?.pie_chart?.length > 0 && (
                              <PieChartComponent data={data?.pie_chart} />
                            )}
                          </div>
                          <div className="col-lg-7">
                            {data?.graph_data?.length > 0 && (
                              <EmailBarCharts data={data?.graph_data} />
                            )}
                          </div>
                        </div>
                      ) : null}

                      <Box>
                        <Card className="cardFix mb-7">
                          <TableToolbar
                            title={`TLS Reports`}
                            subTitle={`Access to the tls reports`}
                          />

                          <Scrollbar>
                            <TableContainer>
                              <Table>
                                <TableHeadRow headCells={headCellTLSReport} />
                                <TableBody>
                                  {isEmpty(data?.reports) ? (
                                    <StyledTableNoData
                                      colSpan={headCellTLSReport.length}
                                    />
                                  ) : (
                                    data?.reports?.map(
                                      (item: any, idx: number) => (
                                        <StyledTableRow key={`row_idx${idx}`}>
                                          <StyledTableCell>
                                            {item?.tlsrpt_report__organization_name
                                              ? item?.tlsrpt_report__organization_name
                                              : "N/A"}
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            {item?.policy_policy_type
                                              ? item?.policy_policy_type
                                              : "N/A"}
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            {item?.total_success
                                              ? item?.total_success
                                              : "N/A"}
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            {item?.total_failure
                                              ? item?.total_failure
                                              : "N/A"}
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            {item?.tlsrpt_report_count
                                              ? item?.tlsrpt_report_count
                                              : "N/A"}
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            <LinearProgress
                                              variant="determinate"
                                              value={item?.percentage_success}
                                              className="reportdetailprogress"
                                            />
                                            <p className="progressText">
                                              {item?.percentage_success}%
                                            </p>
                                          </StyledTableCell>
                                          <StyledTableCell>
                                            <>
                                              <button
                                                style={{
                                                  cursor: "pointer",
                                                  background: "transparent",
                                                  border: "none",
                                                }}
                                              >
                                                <img
                                                  alt={``}
                                                  src="/assets/images/right-arrow.svg"
                                                  title="View Details"
                                                  loading="lazy"
                                                />
                                              </button>
                                            </>
                                          </StyledTableCell>
                                        </StyledTableRow>
                                      )
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Scrollbar>
                        </Card>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </p>
            <div className="row">
              <div className="outerSection">
                {showUpgrade && (
                  <UpgradePlanComponent
                    initialOpenModal={showUpgrade}
                    onClose={handleCloseUpgradePlan}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageChangePlanButtonTLS;

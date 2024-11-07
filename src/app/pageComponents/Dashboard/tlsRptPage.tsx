"use client";
import { useStore } from "@/utils/store";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import LanguageIcon from "@mui/icons-material/Language";
import CancelIcon from "@mui/icons-material/Cancel";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PieChartComponent from "@/components/Charts/pieChart";
import EmailBarCharts from "@/components/Charts/emailBarCharts";
import { API_ROUTES } from "@/@core/apiRoutes";
import MainLoader from "@/components/Loaders/MainLoader";
import SelectAsync from "@/components/Form/SelectAsync";
import DateRangePicker from "@/components/Form/DateRangePicketMui";
import { getFetcherWithAuth } from "@/@core/apiFetcher";

import {
  Box,
  Button,
  Card,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import TableToolbar from "@/components/Table-ui/TableToolbar";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";
import TableHeadRow, {
  StyledTableCell,
  StyledTableNoData,
  StyledTableRow,
} from "@/components/Table-ui/TableHeadRow";
import { headCellTLSReport } from "@/components/Table-ui/headCells";
import TableRowsLoader from "@/components/Table-ui/TableRowsLoader";

import { PAGINATION_OBJECT } from "@/constants/pagination";
import {
  _handleChangePage,
  _setPaginationObjectFn,
  createQueryString,
} from "@/@core/tableFunctions";
import { TablePaginationCompo } from "@/components/Table-ui/TablePaginationCompo";
import { isEmpty } from "@/utils/isEmpty";
import CircularSpinner from "@/components/Loaders/CircularSpinner";
import { checkHistory } from "@/@core/helper";
import UpgradeSubscription from "../Others/UpgradeSubscription";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const TlsReportPage = ({
  domain,
  startDateProp,
  endDateProp,
  pageProp,
}: {
  domain: any;
  startDateProp: any;
  endDateProp: any;
  pageProp: any;
}) => {
  const router = useRouter();
  const { firstDomain, license, licenseValidation } = useStore();
  const [selectedDomain, setSelectedDomain] = useState(domain);
  const [startDate, setStartDate] = useState<Dayjs | null>(startDateProp);
  const [endDate, setEndDate] = useState<Dayjs | null>(endDateProp);
  const [data, setData] = useState([] as any);
  const [clicked, setClicked] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [paginationObject, setPaginationObject] = useState(
    pageProp
      ? { ...PAGINATION_OBJECT, page: Number(pageProp) || 1 }
      : PAGINATION_OBJECT
  );

  const [checkHistoryVal, setCheckHistory] = useState(false);
  useEffect(() => {
    if (startDate || endDate) {
      setCheckHistory(
        checkHistory(startDate, endDate, licenseValidation?.historyDate)
      );
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (paginationObject.triggerApi) {
      if (firstDomain || selectedDomain) {
        getTlsReportData();
      }
    }
  }, [paginationObject.triggerApi]);

  useEffect(() => {
    _handleChangePage({}, 0, setPaginationObject);
  }, [searchTerm, selectedDomain]);

  useEffect(() => {
    if (firstDomain) {
      setisLoading(false);
      getTlsReportData();
    }
  }, [firstDomain]);

  const [showUpgrade, setShowUpgrade] = useState(true);

  const handleCloseUpgradePlan = () => {
    setShowUpgrade(false);
  };

  const getTlsReportData = (refresh?: boolean) => {
    setLoader(true);
    let queryObject = {
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
      search_query: searchTerm || "",
      policy_published_domain: selectedDomain
        ? selectedDomain
        : domain
        ? domain
        : firstDomain,

      start_date: startDate ? dayjs(startDate).format("YYYY-MM-DD") : null,
      end_date: endDate ? dayjs(endDate).format("YYYY-MM-DD") : null,
    };

    let queryObjectClear = {
      page: paginationObject.page,
      policy_published_domain: selectedDomain ? selectedDomain : firstDomain,
    };

    let qryStr = createQueryString(queryObject);
    if (refresh) {
      qryStr = createQueryString(queryObjectClear);
    }

    getFetcherWithAuth(`${API_ROUTES.TLS_REPORT_DASHBOARD}${qryStr}`)
      .then((resData: any) => {
        setData(resData.results);
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, resData);
        });
      })
      .catch((err) => {
        setData([...[]]);
        setPaginationObject(PAGINATION_OBJECT);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleChangeDomain = (event: any) => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDomain(event.value);
    router.push(
      `${API_ROUTES.TLS_DASHBOARD}?domain=${event?.value}&page=${paginationObject?.page}`
    );
  };

  const generateUrl = (startDate?: any, endDate?: any) => {
    const baseUrl = API_ROUTES.TLS_DASHBOARD;

    let formattedStartDate = "";
    let formattedEndDate = "";
    if (startDate !== undefined && startDate !== "undefined") {
      formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    }
    if (endDate !== undefined && endDate !== "undefined") {
      formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
    }

    const qryObj = {
      domain: selectedDomain ? selectedDomain : firstDomain,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      page: paginationObject?.page,
    };

    const newUrls = createQueryString(qryObj, baseUrl);
    router.push(`${newUrls}`);
  };

  const handleReportSearch = () => {
    generateUrl(startDate, endDate);
    getTlsReportData();
  };

  const openListPage = (domain: string, org: string) => {
    if (startDate && endDate) {
      const startDateNew = dayjs(startDate).format("YYYY-MM-DD");
      const endDateNew = dayjs(endDate).format("YYYY-MM-DD");
      router.push(
        `${API_ROUTES.TLS_RECORD_DATEWISE}?domain=${
          selectedDomain ? selectedDomain : firstDomain
        }&org=${org}&startDate=${startDateNew}&endDate=${endDateNew}`
      );
    } else {
      router.push(
        `${API_ROUTES.TLS_RECORD_DATEWISE}?domain=${
          selectedDomain ? selectedDomain : firstDomain
        }&org=${org}`
      );
    }
  };

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    router.push(
      `${API_ROUTES.TLS_DASHBOARD}?domain=${
        selectedDomain ? selectedDomain : firstDomain
      }&page=${paginationObject?.page}`
    );
    getTlsReportData(true);
  };

  useEffect(() => {
    if (license && Object.keys(license).length > 0) {
      setLoadingData(false);
    }
  }, [license]);

  if (isLoading || loadingData) {
    return <MainLoader />;
  }
  return (
    <div className="tlsReport">
      {license.tls_report ? (
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
                            onClick={() => router.push("/dashboard/domain")}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="cardInner reports" title="Domains">
                              <div className="cardInnerContent ">
                                <div className="cardIcon">
                                  <LanguageIcon className="iconSize reports" />
                                </div>
                                <div className="cardText">
                                  <h4>Sending Source </h4>

                                  <p>
                                    {data?.summary?.total_sending_source
                                      ? data?.summary?.total_sending_source
                                      : 0}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="cardInner volume" title="Volume">
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
                                        data?.summary?.total_success_per < 30
                                          ? "failure"
                                          : data?.summary?.total_success_per >
                                              30 &&
                                            data?.summary?.total_success_per <=
                                              80
                                          ? "passTable"
                                          : "complete"
                                      }`}
                                    >
                                      {` (${
                                        data?.summary?.total_success_per || 0
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

                <div className="mb-2 " style={{ padding: "10px 0 15px 0" }}>
                  <h6 style={{ marginBottom: "10px", fontWeight: "bolder" }}>
                    Filters:
                  </h6>
                  <Grid container columnSpacing={2}>
                    <Grid item lg={3} md={3} sm={12} className="mb-2">
                      <SelectAsync
                        searchType={`domainListing`}
                        placeholder="Domain"
                        required
                        onChange={handleChangeDomain}
                        value={
                          selectedDomain
                            ? { value: selectedDomain, label: selectedDomain }
                            : { value: firstDomain, label: firstDomain }
                        }
                      />
                    </Grid>
                    <Grid item lg={5} md={5} sm={12} className="mb-2">
                      <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                      />
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} className="mb-2">
                      <div>
                        {!checkHistoryVal ? (
                          <Button
                            className="btn heightLarge secondaryButton"
                            onClick={handleReportSearch}
                            size="large"
                            disabled={!(startDate && endDate)}
                          >
                            Check Report
                          </Button>
                        ) : (
                          <UpgradeSubscription
                            text={"Check Report"}
                            cssVal={"btn heightLarge secondaryButton"}
                          />
                        )}

                        {startDate && endDate && (
                          <Button
                            variant="contained"
                            color="primary"
                            className="btn heightLarge secondaryButton ms-2"
                            onClick={handleClearFilter}
                            size="large"
                          >
                            Reset Filters
                          </Button>
                        )}
                      </div>
                    </Grid>
                  </Grid>
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
                      onSearch={(query) => setSearchTerm(query)}
                    />

                    <Scrollbar>
                      <TableContainer>
                        <Table>
                          <TableHeadRow headCells={headCellTLSReport} />
                          <TableBody>
                            {loader ? (
                              <TableRowsLoader
                                rowsNum={10}
                                columnNum={headCellTLSReport.length}
                              />
                            ) : isEmpty(data?.reports) ? (
                              <StyledTableNoData
                                colSpan={headCellTLSReport.length}
                              />
                            ) : (
                              data?.reports?.map((item: any, idx: number) => (
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
                                      {clicked == item ? (
                                        <button
                                          style={{
                                            cursor: "pointer",
                                            background: "transparent",
                                            border: "none",
                                          }}
                                          disabled={true}
                                        >
                                          <CircularSpinner />
                                        </button>
                                      ) : (
                                        <button
                                          style={{
                                            cursor: "pointer",
                                            background: "transparent",
                                            border: "none",
                                          }}
                                          disabled={clicked == item}
                                          onClick={() => {
                                            setClicked(item);
                                            openListPage(
                                              domain,
                                              item?.tlsrpt_report__organization_name
                                            );
                                          }}
                                        >
                                          <Image
                                            alt={``}
                                            src={_IMG.right_arrow}
                                            title="View Details"
                                            loading="lazy"
                                          />
                                        </button>
                                      )}
                                    </>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Scrollbar>
                    <TablePaginationCompo
                      paginationObject={paginationObject}
                      setPaginationObject={setPaginationObject}
                      className="alignPagination"
                    />
                  </Card>
                </Box>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* {showUpgrade && <ManageChangePlanButtonTLS data={data} />} */}
          {showUpgrade && <p>ManageChangePlanButtonTLS</p>}
        </>
      )}
    </div>
  );
};
export default TlsReportPage;

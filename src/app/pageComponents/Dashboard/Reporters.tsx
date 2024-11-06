"use client";
import { Grid, Table, TableBody, TableContainer } from "@mui/material";
import { isEmpty } from "@/utils/isEmpty";
import Button from "@mui/material/Button";
import ResultButton from "@/app/pageComponents/Dashboard/ResultButton";
import dynamic from "next/dynamic";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useStore } from "@/utils/store";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import TableToolbar from "@/components/Table-ui/TableToolbar";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";
import TableHeadRow, {
  StyledTableCell,
  StyledTableNoData,
  StyledTableRow,
} from "@/components/Table-ui/TableHeadRow";
import { headCellsReports } from "@/components/Table-ui/headCells";
import MainLoader from "@/components/Loaders/MainLoader";
import SelectAsync from "@/components/Form/SelectAsync";
import DateRangePicker from "@/components/Form/DateRangePicketMui";
import { PAGINATION_OBJECT } from "@/constants/pagination";
import { TablePaginationCompo } from "@/components/Table-ui/TablePaginationCompo";
import {
  _handleChangePage,
  _setPaginationObjectFn,
  createQueryString,
} from "@/@core/tableFunctions";
import { API_ROUTES } from "@/@core/apiRoutes";
import { fetchImage } from "@/@core/commonS3";
import UpgradeSubscription from "../Others/UpgradeSubscription";
import { checkHistory } from "@/@core/helper";

const DonutChart = dynamic(() => import("@/app/pageComponents/Dashboard/donutchart"), {
  ssr: false,
});

const Reporters = ({
  domain,
  endDateProp,
  startDateProp,
  pageProps,
}: {
  endDateProp: any;
  startDateProp: any;
  domain: any;
  pageProps: any;
}) => {
  const router = useRouter();

  const { firstDomain, licenseValidation } = useStore();
  const [startDate, setStartDate] = useState<Dayjs | null>(startDateProp);
  const [endDate, setEndDate] = useState<Dayjs | null>(endDateProp);
  const [pieDetails, setPieDetails] = useState<any>();
  const [selectedDomain, setSelectedDomain] = useState(domain);
  const [details, setDetails] = useState<any>([]);
  const [isLoader, setisLoader] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationObject, setPaginationObject] = useState(PAGINATION_OBJECT);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (paginationObject.triggerApi) {
      if (firstDomain || selectedDomain) {
        getReportData();
      }
    }
  }, [paginationObject.triggerApi]);

  useEffect(() => {
    _handleChangePage({}, 0, setPaginationObject);
  }, [searchTerm, selectedDomain]);

  useEffect(() => {
    if (firstDomain) {
      setisLoading(false);
      getReportData();
    }
  }, [firstDomain]);
  const getReportData = (refresh?: boolean) => {
    let queryObject;
    queryObject = {
      search_query: searchTerm || "",
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
      policy_published_domain: selectedDomain ? selectedDomain : firstDomain,
      start_date: !isEmpty(startDate) && dayjs(startDate).format("YYYY-MM-DD"),
      end_date: !isEmpty(endDate) && dayjs(endDate).format("YYYY-MM-DD"),
    };

    let queryObjectClear = {
      page: paginationObject.page,

      policy_published_domain: selectedDomain ? selectedDomain : firstDomain,
    };
    const qryStr = createQueryString(queryObject);
    if (refresh) {
      createQueryString(queryObjectClear);
    }
    getFetcherWithAuth(`${API_ROUTES.REPORTER_DETAIL_LIST}${qryStr}`)
      .then(async (response) => {
        const promises = response?.results.map(
          async (item: any, index: number) => {
            if (item.source_logo) {
              const logoUrl = await fetchImage(
                item.source_logo,
                null,
                ""
              );
              return {
                ...item,
                source_logo: logoUrl,
              };
            } else {
              return item;
            }
          }
        );
        const updatedArray = await Promise.all(promises);
        setDetails(updatedArray);
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, response);
        });

        getFetcherWithAuth(`${API_ROUTES.REPORTER_PIE_CHART}${qryStr}`).then(
          (pieChartResponse) => {
            setPieDetails(pieChartResponse?.data);
          }
        );
      })
      .catch((err) => {
        setDetails([...[]]);
        setPaginationObject(PAGINATION_OBJECT);
      })
      .finally(() => {
        setisLoader(false);
      });
  };
  const handleChangeDomain = (event: any) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSelectedDomain(event.value);
    router.push(`/dashboard/reporters?domain=${event?.value}`);
  };
  const generateUrl = (startDate?: any, endDate?: any): string => {
    const baseUrl = "/dashboard/reporters";

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
    };

    return createQueryString(qryObj, baseUrl);
  };

  const formatNumberWithCommas = (number: any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleReportSearch = () => {
    generateUrl(startDate, endDate);
    getReportData();
  };
  const handleCommonFunction = (check1: any, check2: any) => {
    return (
      <span
        className={`${
          check2 == "decrease"
            ? "redColor"
            : check2 == "increase"
            ? "greenColor"
            : "yellowColor"
        } `}
      >
        {check1 == 0 ? null : check2 == "increase" ? (
          <img
            src="/assets/images/trend-up.svg"
            alt="Web icon"
            loading="lazy"
            width="20px"
          />
        ) : check2 == "decrease" ? (
          <img
            src="/assets/images/trend-down.svg"
            alt="Web icon"
            width="20px"
            loading="lazy"
          />
        ) : check2 == "no change" ? null : null}
        {`(${check1 != null ? check1 : "0.00"}%)`}
      </span>
    );
  };

  const [checkHistoryVal, setCheckHistory] = useState(false);
  useEffect(() => {
    if (startDate || endDate) {
      setCheckHistory(
        checkHistory(startDate, endDate, licenseValidation?.historyDate)
      );
    }
  }, [startDate, endDate]);

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="graphSection mb-5">
          <div className="">
            <Grid container>
              <Grid item lg={12}>
                <ResultButton refetchData={domain != "" ? domain : ""} />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 4, mt: 3 }}>
              <Grid item lg={3}>
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
              <Grid item lg={4} md={4} sm={6}>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={6}>
                {/* <Button
                  className="btn heightLarge secondaryButton"
                  onClick={() => {
                    handleReportSearch();
                  }}
                  size="large"
                >
                  Filter
                </Button> */}

                {!checkHistoryVal ? (
                  <Button
                    className="btn heightLarge secondaryButton"
                    onClick={() => {
                      handleReportSearch();
                    }}
                    size="large"
                  >
                    Filter
                  </Button>
                ) : (
                  <UpgradeSubscription
                    text={"Filter"}
                    cssVal={"btn heightLarge secondaryButton"}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item lg={4}>
                <div className="card reporters reportersCard">
                  <div className="card-header text-start">
                    <h3>
                      Reporters <InformationTooltip name="RPT_reporters" />
                    </h3>
                    <p>
                      Which organisations send you reports?
                      <span>
                        <InformationTooltip name="RPT_which_organization" />
                      </span>
                    </p>
                  </div>
                  <DonutChart pieDetails={pieDetails} />
                </div>
              </Grid>
              <Grid item lg={8}>
                <div className="card ">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-xl-3">
                        <span className="d-flex align-items-start gap-2">
                          <h3 className="text-start">
                            Reporters
                            <InformationTooltip name="RPT_table_reporters" />
                          </h3>
                        </span>
                      </div>
                    </div>
                  </div>
                  <TableToolbar onSearch={(query) => setSearchTerm(query)} />
                  <Scrollbar sx={{ mt: 2 }}>
                    <TableContainer>
                      <Table>
                        <TableHeadRow headCells={headCellsReports} />
                        <TableBody>
                          {isEmpty(details) ? (
                            <StyledTableNoData
                              colSpan={headCellsReports.length}
                            />
                          ) : (
                            details?.map((item: any, idx: Number) => (
                              <StyledTableRow key={`row_idx${idx}`}>
                                <StyledTableCell>
                                  {item?.source_logo ? (
                                    <img
                                      src={item?.source_logo}
                                      // width={5}
                                      // height={40}
                                      loading="lazy"
                                    />
                                  ) : (
                                    <img
                                      className="favIconImage"
                                      loading="lazy"
                                      src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.reporter}&size=128`}
                                    />
                                  )}
                                  {item.reporter}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {" "}
                                  {item.reports}
                                  <br />
                                  {handleCommonFunction(
                                    item.reports_trend_percentage_change,
                                    item?.reports_trend
                                  )}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {item.ip_count}
                                  <br />
                                  {handleCommonFunction(
                                    item.ip_counttrend_percentage_change,
                                    item?.ip_count_trend
                                  )}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {item.from_domain}
                                  <br />
                                  {handleCommonFunction(
                                    item.from_domaintrend_percentage_change,
                                    item?.from_domain_trend
                                  )}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {item.volume
                                    ? formatNumberWithCommas(item.volume)
                                    : 0}
                                  <br />
                                  {handleCommonFunction(
                                    item.volume_trend_percentage_change,
                                    item?.volume_trend
                                  )}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {item.compliant
                                    ? formatNumberWithCommas(item.compliant)
                                    : 0}
                                  <br />
                                  {handleCommonFunction(
                                    item.compliant_trend_percentage_change,
                                    item?.compliant_trend
                                  )}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {item.failure
                                    ? formatNumberWithCommas(item.failure)
                                    : 0}
                                  <br />
                                  {handleCommonFunction(
                                    item.failure_trend_percentage_change,
                                    item?.failure_trend
                                  )}
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
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};
export default Reporters;

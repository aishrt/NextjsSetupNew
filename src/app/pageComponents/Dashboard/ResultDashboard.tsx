"use client";
import { Grid, Table, TableBody, TableContainer } from "@mui/material";
import React, { useEffect, useState, Suspense } from "react";
import ResultButton from "@/app/pageComponents/Dashboard/ResultButton";
import Button from "@mui/material/Button";
import LineChartComponent from "@/components/Charts/linechart";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import { useRouter } from "next/navigation";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import PollIcon from "@mui/icons-material/Poll";
import { isEmpty } from "@/utils/isEmpty";
import { useStore } from "@/utils/store";
import { formatDateOnly } from "@/utils/format";
import dayjs, { Dayjs } from "dayjs";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import { API_ROUTES } from "@/@core/apiRoutes";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import MainLoader from "@/components/Loaders/MainLoader";
import SelectAsync from "@/components/Form/SelectAsync";
import DateRangePicker from "@/components/Form/DateRangePicketMui";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";
import TableHeadRow, {
  StyledTableCell,
  StyledTableNoData,
  StyledTableRow,
} from "@/components/Table-ui/TableHeadRow";
import { headCellsResult } from "@/components/Table-ui/headCells";
import { PAGINATION_OBJECT } from "@/constants/pagination";
import {
  _handleChangePage,
  _setPaginationObjectFn,
  createQueryString,
} from "@/@core/tableFunctions";
import UpgradeSubscription from "../Others/UpgradeSubscription";
import { checkHistory } from "@/@core/helper";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const Resultspage = ({
  domain,
  endDateProp,
  startDateProp,
}: {
  endDateProp: any;
  startDateProp: any;
  domain: any;
}) => {
  const router = useRouter();
  const { firstDomain, licenseValidation } = useStore();
  const [startDate, setStartDate] = useState<Dayjs | null>(startDateProp);
  const [endDate, setEndDate] = useState<Dayjs | null>(endDateProp);
  const [data, setData] = useState([] as any);
  const [elementsList, setElementsList] = useState([] as any);
  const [selectedDomain, setSelectedDomain] = useState(domain);
  const [isLoader, setisLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationObject, setPaginationObject] = useState(PAGINATION_OBJECT);

  useEffect(() => {
    if (firstDomain) {
      setIsLoading(false);
      getResultData();
    }
  }, [firstDomain]);
  useEffect(() => {
    if (paginationObject.triggerApi) {
      if (firstDomain || selectedDomain) {
        getResultData();
      }
    }
  }, [paginationObject.triggerApi]);

  useEffect(() => {
    _handleChangePage({}, 0, setPaginationObject);
  }, [selectedDomain]);
  const getResultData = (refresh?: boolean) => {
    let queryObject;
    queryObject = {
      policy_published_domain: selectedDomain
        ? selectedDomain
        : domain
        ? domain
        : firstDomain,
      start_date: !isEmpty(startDate) && dayjs(startDate).format("YYYY-MM-DD"),
      end_date: !isEmpty(endDate) && dayjs(endDate).format("YYYY-MM-DD"),
    };
    const qryStr = createQueryString(queryObject);
    getFetcherWithAuth(`${API_ROUTES.RESULT_FIRST_DASHBOARD}${qryStr}`)
      .then((response) => {
        setData(response.data);
        setElementsList(
          response.data &&
            response.data.elements_list &&
            Object.values(response.data.elements_list)
        );
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, response);
        });
      })
      .catch((err) => {
        setData([...[]]);
        setElementsList([...[]]);
        setPaginationObject(PAGINATION_OBJECT);
      })
      .finally(() => {
        setisLoader(false);
      });
  };

  const formatNumberWithCommas = (number: any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const generateUrl = (
    startDate?: any,
    endDate?: any,
    disposition?: string | undefined,
    spf?: string | undefined,
    dkim?: string | undefined
  ): string => {
    const baseUrl = API_ROUTES.RESULT_DASHBOARD;

    let formattedStartDate = "";
    let formattedEndDate = "";
    if (startDate !== undefined && startDate !== "undefined") {
      formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    }
    if (endDate !== undefined && endDate !== "undefined") {
      formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
    }

    const qryObj = {
      policy_published_domain: selectedDomain ? selectedDomain : firstDomain,
      spf,
      dkim,
      disposition,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };

    return createQueryString(qryObj, baseUrl);
  };

  const handleChangeDomain = (event: any) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSelectedDomain(event.value);
    router.push(`/dashboard/results?domain=${event?.value}`);
  };
  const handleReportSearch = () => {
    generateUrl(startDate, endDate);
    getResultData();
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
      <LicenseWarningsCompo
        onSetIsLoading={(value: any) => setisLoader(value)}
        onSetLicenseData={(resData: any) => {
          if (resData) {
          }
        }}
      />
      {isLoader ? (
        <MainLoader />
      ) : (
        <div className="graphSection">
          <div className="dashboardTopCard">
            <Grid container>
              <Grid item lg={12}>
                <ResultButton
                  refetchData={!isEmpty(selectedDomain) ? selectedDomain : ""}
                />
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
                  startDate={dayjs(startDate)}
                  endDate={dayjs(endDate)}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={6}>
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
            <>
              {isLoading ? (
                <MainLoader />
              ) : (
                <>
                  <Grid item lg={12}>
                    <div className="row">
                      <div className="col-xl-3">
                        <div className="cardInner volume">
                          <div className="cardInnerContent">
                            <div className="cardIcon">
                              <EmailIcon className="iconSize volume" />
                            </div>
                            <div className="cardText">
                              <h4>
                                Emails <InformationTooltip name="RSLT_email" />
                              </h4>
                              <p>
                                {data && data.tiles && data.tiles.total_volume
                                  ? formatNumberWithCommas(
                                      data.tiles.total_volume
                                    )
                                  : 0}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3">
                        <div className="cardInner compliants">
                          <div className="cardInnerContent">
                            <div className="cardIcon">
                              <CheckCircleIcon className="iconSize compliants" />
                            </div>
                            <div className="cardText">
                              <h4>
                                Delivered{" "}
                                <InformationTooltip name="RSLT_delivered" />
                              </h4>
                              <p>
                                {data && data.tiles && data.tiles.none
                                  ? formatNumberWithCommas(data.tiles.none)
                                  : 0}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3">
                        <div className="cardInner quarantined">
                          <div className="cardInnerContent">
                            <div className="cardIcon">
                              <PollIcon className="iconSize quarantined" />
                            </div>
                            <div className="cardText">
                              <h4>
                                Quarantined{" "}
                                <InformationTooltip name="RSLT_quarantined" />
                              </h4>
                              <p>
                                {data && data.tiles && data.tiles.quarantine
                                  ? data.tiles.quarantine
                                  : "0"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3">
                        <div className="cardInner failures">
                          <div className="cardInnerContent">
                            <div className="cardIcon">
                              <CancelIcon className="iconSize failures" />
                            </div>
                            <div className="cardText">
                              <h4>
                                Rejected{" "}
                                <InformationTooltip name="RSLT_rejected" />
                              </h4>
                              <p>
                                {data && data.tiles && data.tiles.reject
                                  ? data.tiles.reject
                                  : 0}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={12}>
                    <div className="card mt-4">
                      <div className="card-header text-start">
                        <h3>
                          Results <InformationTooltip name="RSLT_results" />
                        </h3>
                      </div>

                      <div className="card-body">
                        <LineChartComponent chart={data?.graph?.graph_data} />
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={12}>
                    <div className="card mt-4 detailsCard">
                      <div className="card-header">
                        <div className="row">
                          <div className="col-xl-3">
                            <span className="d-flex align-items-start gap-2">
                              <h3 className="text-start">Details</h3>
                            </span>
                          </div>
                        </div>
                      </div>
                      <Scrollbar>
                        <TableContainer>
                          <Table>
                            <TableHeadRow headCells={headCellsResult} />
                            <TableBody>
                              {isEmpty(elementsList) ? (
                                <StyledTableNoData
                                  colSpan={headCellsResult.length}
                                />
                              ) : (
                                elementsList?.map((item: any, idx: Number) => (
                                  <StyledTableRow key={`row_idx${idx}`}>
                                    <StyledTableCell>
                                      {item.row &&
                                        formatDateOnly(item.row[0]?.begin_date)}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {item.row && item.row[0]?.source_ip}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {item.dkim}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <span className="passDark">
                                        {item?.spf}
                                      </span>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <span className="greyDark">
                                        {item.disposition}
                                      </span>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {item.row && item.row[0]?.selector}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {item.row && item.row[0]?.reporter}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {item.row && item.row[0]?.messages}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <button className="pointer btn">
                                        <a
                                          href={generateUrl(
                                            startDate,
                                            endDate,
                                            item?.disposition,
                                            item?.spf,
                                            item?.dkim
                                          )}
                                        >
                                          <Image
                                            className="handIcon"
                                            alt={``}
                                            src={_IMG.right_arrow}
                                            loading="lazy"
                                          />
                                        </a>
                                      </button>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Scrollbar>
                    </div>
                  </Grid>
                </>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Resultspage;

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

const GoogleleafletMap = dynamic(
  () => import("@/externalLibraries/GoogleleafletMap"),
  {
    ssr: false,
  }
);
import GetAppIcon from "@mui/icons-material/GetApp";
import { isEmpty } from "@/utils/isEmpty";
import Volume from "@/app/pageComponents/Dashboard/Volume";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import CancelIcon from "@mui/icons-material/Cancel";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import TableHeadRow, {
  StyledTableCell,
  StyledTableNoData,
  StyledTableRow,
} from "@/components/Table-ui/TableHeadRow";
import { PAGINATION_OBJECT } from "@/constants/pagination";

import {
  _handleChangePage,
  _setPaginationObjectFn,
  createQueryString,
} from "@/@core/tableFunctions";
import { API_ROUTES } from "@/@core/apiRoutes";
import Link from "next/link";
import { useStore } from "@/utils/store";
import { fetchImage } from "@/@core/commonS3";
import moment from "moment";
import { TablePaginationCompo } from "@/components/Table-ui/TablePaginationCompo";
import TableRowsLoader from "@/components/Table-ui/TableRowsLoader";
import { headCellAcountDashboardDetail } from "@/components/Table-ui/headCells";
import MainLoader from "@/components/Loaders/MainLoader";
import CircularSpinner from "@/components/Loaders/CircularSpinner";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";
import TableToolbar from "@/components/Table-ui/TableToolbar";
import { BorderLinearProgress } from "@/components/UI/LineProgress";
import { _IMG } from "@/constants/images";
import Image from "next/image";
const AccountDashboardComponent = ({
  // resData,
  page,
  page_size,
  searchQuery,
}: {
  // resData: any;
  page: any;
  page_size: any;
  searchQuery: any;
}) => {
  const router = useRouter();
  const { historyDate, license } = useStore();
  const [dataTDF, setDataTDF] = useState({} as any);
  const [data, setData] = useState({} as any);
  const [paginationObject, setPaginationObject] = useState(() => {
    if (page) {
      return {
        ...PAGINATION_OBJECT,
        page: page,
        rowsPerPage: !isNaN(+page_size) ? +page_size : 10,
        triggerApi: true,
      };
    } else {
      return PAGINATION_OBJECT;
    }
  });
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [map, setMap] = useState([] as any);
  const [loader, setLoader] = useState(true);
  const [isLoader, setisLoader] = useState(true);
  const [detailsData, setDetailsData] = useState<(string | null)[]>([]);
  const [clickedButton, setclickedButton] = useState(0);
  const [buttonLoader, setButtonLoader] = useState(false);
  useEffect(() => {
    if (paginationObject.triggerApi) {
      getDashboardDetail();
      // getDashboardData()
      // getDashboardMapData()
      // // getFirstDomain();
    }
  }, [paginationObject.triggerApi, historyDate]);
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        await getDashboardData();
        await getDashboardMapData();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [historyDate]);
  useEffect(() => {
    _handleChangePage(
      {},
      searchTerm ? 0 : !isNaN(+page - 1) ? +page - 1 : 0,
      setPaginationObject
    );
  }, [searchTerm]);
  useEffect(() => {
    if (data) {
      if (parseInt(data?.volume) > parseInt(license?.volume?.limit)) {
      }
      const dataVal = data?.top_dmarc_failures;
      const sortedData = dataVal?.sort(
        (a: any, b: any) => b.failure_count - a.failure_count
      );

      setDataTDF(sortedData);
    }
  }, [data]);
  const getDashboardDetail = () => {
    setLoader(true);
    let queryObject = {
      search_query: searchTerm || "",
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
      start_date:
        historyDate && moment(historyDate.startDate).format("YYYY-MM-DD"),
      end_date: historyDate && moment(historyDate.endDate).format("YYYY-MM-DD"),
    };
    const qryStr = createQueryString(queryObject);
    router.push(`/dashboard/dashboard${qryStr}`, { scroll: false });
    getFetcherWithAuth(`${API_ROUTES.MAIN_DASHBOARD_DETAILS}${qryStr}`)
      .then(async (resData: any) => {
        const promises = resData?.results.map(
          async (item: any, index: number) => {
            if (item.source_logo) {
              const logoUrl = await fetchImage(item.source_logo, null, "");
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
        setDetailsData(updatedArray);
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, resData);
        });
      })
      .catch((err) => {
        setDetailsData([...[]]);
        setPaginationObject(PAGINATION_OBJECT);
      })
      .finally(() => {
        setLoader(false);
        setisLoader(false);
      });
  };
  const getDashboardData = async () => {
    const response = await getFetcherWithAuth(API_ROUTES.MAIN_DASHBOARD);
    if (response?.data?.is_domain === "not_verified") {
      router.push("/dashboard/domain");
    } else if (response?.data?.is_domain == null) {
      router.push("/dashboard/add-domain");
    } else {
      setData(response.data);
    }
  };

  const getDashboardMapData = async () => {
    const response = await getFetcherWithAuth(
      API_ROUTES.MAIN_DASHBOARD_MAPDATA
    );
    const array =
      response.data?.map((item: any, index: number) => ({
        flagIcon: item.country_code,
        Failure: item.failure_count,
        TotalEmai: item.total_count,
        ipAddress: item.row_source_ip,
        Compliant: item.total_pass,
        id: index + 1,
        title: item.country_code_iso3,
        name: item.country_name,
        coordinates: {
          lat: parseInt(item.latitude),
          lng: parseInt(item.longitude),
        },
      })) || [];
    setMap(array);
  };

  function capitalizeFirstLetter(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const formatNumberWithCommas = (number: any) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const reloadPageData = () => {};
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
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12">
                  <div className="dashboardTop-Content">
                    <h4>Overview</h4>
                    <p>
                      Here you can find an overview of DMARC results of your
                      domains
                    </p>
                  </div>
                </div>
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
                            <h4>
                              Domains
                              <InformationTooltip name="AD_domain" />
                            </h4>

                            <p>
                              {formatNumberWithCommas(data?.domain_count) || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3">
                      <div className="cardInner volume" title="Volume">
                        <div className="cardInnerContent">
                          <div className="cardIcon">
                            <EmailIcon className="iconSize volume" />
                          </div>
                          <div className="cardText">
                            <h4>
                              Emails
                              <InformationTooltip name="AD_emails" />
                            </h4>
                            <p>{formatNumberWithCommas(data?.volume) || 0}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3">
                      <div className="cardInner compliants" title="Source">
                        <div className="cardInnerContent">
                          <div className="cardIcon">
                            <Image
                              className="imgBorder"
                              alt={``}
                              src={_IMG.complaint}
                              loading="lazy"
                            />
                          </div>
                          <div className="cardText">
                            <h4>
                              Compliant
                              <InformationTooltip name="AD_compliant" />
                            </h4>
                            <p>
                              {`${
                                formatNumberWithCommas(data?.total_compliant) ||
                                0
                              }`}
                              <span
                                className={`subText ${
                                  data?.compliant_percentage < 30
                                    ? "failure"
                                    : data?.compliant_percentage > 30 &&
                                      data?.compliant_percentage <= 80
                                    ? "passTable"
                                    : "complete"
                                }`}
                              >
                                {` (${data?.compliant_percentage || 0}%)`}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3">
                      <div className="cardInner failures" title="Failures">
                        <div className="cardInnerContent">
                          <div className="cardIcon">
                            <CancelIcon className="iconSize failures" />
                          </div>
                          <div className="cardText">
                            <h4>
                              Failures <InformationTooltip name="AD_failures" />
                            </h4>
                            <p>
                              {`${
                                formatNumberWithCommas(data?.failure_count) || 0
                              } `}
                              <span className="subText failure">
                                {`(${
                                  data?.failure_percentage?.toFixed(2) || 0
                                }%)`}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="card dmarcFailures mt-4">
                    <div className="card-header text-start faliureHeader1">
                      <h4>
                        DMARC failures
                        <InformationTooltip name="AD_DMARC_failures_hd" />
                      </h4>
                      <p>Where are the failures coming from?</p>
                    </div>
                    <div className="mapHeight">
                      <section>
                        <GoogleleafletMap mapData={map} from="dashboard" />
                      </section>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="row">
                    <div className="dashboardVolumeCard volumeTable">
                      <Volume />
                    </div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="row">
                    <div className="col-xl-4">
                      <div className="card volumeEmail mt-4">
                        <div className="card-header text-start">
                          <h4>
                            Total Emails
                            <InformationTooltip
                              name="AD_total_Email_hd"
                              position="right"
                            />
                          </h4>
                        </div>
                        <div className="card-body">
                          <div className="card-body-inner">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th title="DOMAIN">
                                      DOMAIN
                                      <InformationTooltip
                                        name="AD_total_Email_doamin"
                                        position="right2"
                                      />
                                    </th>
                                    <th title="VOLUME" className="text-end">
                                      VOLUME
                                      <InformationTooltip
                                        name="AD_total_Email_volume"
                                        position="left2"
                                      />
                                    </th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data?.top_email_volume?.length > 0 ? (
                                    data?.top_email_volume?.map(
                                      (item: any, index: number) => {
                                        return (
                                          <tr key={index}>
                                            <td>
                                              {item ? null : (
                                                <img
                                                  alt="Image"
                                                  className="favIconImage"
                                                  loading="lazy"
                                                  src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.domain}&size=128`}
                                                />
                                              )}
                                              {capitalizeFirstLetter(
                                                item?.domain
                                              )}
                                            </td>
                                            <td className="volumeTD text-end">
                                              {formatNumberWithCommas(
                                                item?.volume
                                              )}
                                            </td>
                                            <td className="volumeTD text-end">
                                              <a
                                                onClick={() => {
                                                  window.localStorage.setItem(
                                                    "myDomain",
                                                    item?.domain
                                                  );
                                                  reloadPageData();
                                                }}
                                                href={`/dashboard/sender-dashboard?policy_published_domain=${
                                                  item?.domain
                                                }&fromDashboard=true&page=1&page_size=10&start_date=${moment(
                                                  historyDate?.startDate
                                                ).format(
                                                  "YYYY-MM-DD"
                                                )}&end_date=${moment(
                                                  historyDate?.endDate
                                                ).format("YYYY-MM-DD")}`}
                                              >
                                                <Image
                                                  alt={``}
                                                  src={_IMG.right_arrow}
                                                  title="View Details"
                                                  loading="lazy"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )
                                  ) : (
                                    <tr>
                                      <td colSpan={2}>
                                        No Data Available in table
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-4">
                      <div className="card volumeEmail mt-4">
                        <div className="card-header text-start">
                          <h4>
                            Total Compliant%
                            <InformationTooltip
                              name="AD_total_compliant_hd"
                              position="right"
                            />
                          </h4>
                        </div>
                        <div className="card-body">
                          <div className="card-body-inner">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th title="DOMAIN">
                                      DOMAIN
                                      <InformationTooltip
                                        name="AD_total_compliant_domain"
                                        position="right2"
                                      />
                                    </th>
                                    <th title="COMPLIANT" className="text-end">
                                      COMPLIANT %
                                      <InformationTooltip
                                        name="AD_total_compliant_compliant"
                                        position="left2"
                                      />
                                    </th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data?.top_dmarc_compliant?.length > 0 ? (
                                    data?.top_dmarc_compliant?.map(
                                      (item: any, index: number) => {
                                        return (
                                          <tr key={index}>
                                            <td>
                                              <img
                                                alt="Fav icon"
                                                className="favIconImage"
                                                loading="lazy"
                                                src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.domain}&size=128`}
                                              />
                                              {capitalizeFirstLetter(
                                                item?.domain
                                              )}
                                            </td>

                                            <td className="text-end">
                                              <span
                                                className={
                                                  item?.compliant_percentage <
                                                  30
                                                    ? "failure"
                                                    : item?.compliant_percentage >
                                                        30 &&
                                                      item?.compliant_percentage <=
                                                        80
                                                    ? "passTable"
                                                    : "complete "
                                                }
                                              >
                                                <span className="highlightedText">
                                                  {formatNumberWithCommas(
                                                    item?.compliant_count
                                                  )}
                                                </span>
                                                (
                                                {item?.compliant_percentage ==
                                                parseInt(
                                                  item?.compliant_percentage,
                                                  10
                                                )
                                                  ? item?.compliant_percentage
                                                  : (item?.compliant_percentage).toFixed(
                                                      2
                                                    )}
                                                %)
                                              </span>
                                            </td>
                                            <td className="volumeTD text-end">
                                              <a
                                                onClick={() => {
                                                  window.localStorage.setItem(
                                                    "myDomain",
                                                    item?.domain
                                                  ),
                                                    reloadPageData();
                                                }}
                                                href={`/dashboard/sender-dashboard?policy_published_domain=${
                                                  item?.domain
                                                }&fromDashboard=true&page=1&page_size=10&start_date=${moment(
                                                  historyDate?.startDate
                                                ).format(
                                                  "YYYY-MM-DD"
                                                )}&end_date=${moment(
                                                  historyDate?.endDate
                                                ).format("YYYY-MM-DD")}`}
                                              >
                                                <Image
                                                  alt={``}
                                                  src={_IMG.right_arrow}
                                                  title="View Details"
                                                  loading="lazy"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )
                                  ) : (
                                    <tr>
                                      <td colSpan={2}>
                                        No Data Available in table
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-4">
                      <div className="card volumeEmail mt-4">
                        <div className="card-header text-left faliureHeader2">
                          <h4 className="text-start">
                            Total Failures%
                            <InformationTooltip
                              name="AD_total_compliant_hd"
                              position="right"
                            />
                          </h4>
                        </div>
                        <div className="card-body">
                          <div className="card-body-inner">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th title="DOMAIN">
                                      DOMAIN
                                      <InformationTooltip
                                        name="AD_total_compliant_domain"
                                        position="right2"
                                      />
                                    </th>
                                    <th title="FAILURES" className="text-end">
                                      FAILURES
                                      <InformationTooltip
                                        name="AD_total_failures_failures"
                                        position="left2"
                                      />
                                    </th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dataTDF?.length > 0 ? (
                                    dataTDF?.map((item: any, index: number) => {
                                      return (
                                        <tr key={index}>
                                          <td>
                                            <img
                                              alt="New icon"
                                              className="favIconImage"
                                              loading="lazy"
                                              src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.domain}&size=128`}
                                            />
                                            {item?.domain}
                                          </td>
                                          <td className="text-end">
                                            <span
                                              className={
                                                item?.failure_percentage < 30
                                                  ? "complete"
                                                  : item?.failure_percentage >
                                                      30 &&
                                                    item?.failure_percentage <=
                                                      80
                                                  ? "passTable"
                                                  : "failure"
                                              }
                                            >
                                              <span className="highlightedText">
                                                {item?.failure_percentage ==
                                                parseInt(
                                                  item?.failure_percentage,
                                                  10
                                                )
                                                  ? `${formatNumberWithCommas(
                                                      item?.failure_count
                                                    )} 
                                                  `
                                                  : `${formatNumberWithCommas(
                                                      item?.failure_count
                                                    )} `}
                                              </span>
                                              (
                                              {item.failure_percentage.toFixed(
                                                2
                                              )}
                                              %)
                                            </span>
                                          </td>
                                          <td className="volumeTD text-end">
                                            {clickedButton == index &&
                                            buttonLoader ? (
                                              <CircularSpinner />
                                            ) : (
                                              <a
                                                onClick={() => {
                                                  setButtonLoader(true);
                                                  setclickedButton(index);
                                                  window.localStorage.setItem(
                                                    "myDomain",
                                                    item?.domain
                                                  ),
                                                    reloadPageData();
                                                }}
                                                href={`/dashboard/sender-dashboard?policy_published_domain=${
                                                  item?.domain
                                                }&fromDashboard=true&page=1&page_size=10&start_date=${moment(
                                                  historyDate?.startDate
                                                ).format(
                                                  "YYYY-MM-DD"
                                                )}&end_date=${moment(
                                                  historyDate?.endDate
                                                ).format("YYYY-MM-DD")}`}
                                              >
                                                <Image
                                                  alt={``}
                                                  src={_IMG.right_arrow}
                                                  title="View Details"
                                                  loading="lazy"
                                                />
                                              </a>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <tr>
                                      <td colSpan={2}>
                                        No Data Available in Table
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Box>
                  <Card className="cardFix mb-7">
                    <TableToolbar
                      title={`Details`}
                      onSearch={(query: any) => setSearchTerm(query)}
                    />
                    <Scrollbar>
                      <TableContainer>
                        <Table>
                          <TableHeadRow
                            headCells={headCellAcountDashboardDetail}
                          />
                          <TableBody>
                            {loader ? (
                              <TableRowsLoader
                                rowsNum={10}
                                columnNum={headCellAcountDashboardDetail.length}
                              />
                            ) : isEmpty(detailsData) ? (
                              <StyledTableNoData
                                colSpan={headCellAcountDashboardDetail.length}
                              />
                            ) : (
                              detailsData?.map((item: any, idx: number) => (
                                <StyledTableRow key={`row_idx${idx}`}>
                                  <StyledTableCell>
                                    {" "}
                                    {item?.source_logo ? (
                                      <img
                                        alt="Source Logo"
                                        src={item?.source_logo}
                                        loading="lazy"
                                      />
                                    ) : (
                                      <img
                                        alt="Source Logo"
                                        className="favIconImage"
                                        loading="lazy"
                                        src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.domain}&size=128`}
                                      />
                                    )}
                                    {/* <img
                                      className="favIconImage"
                                      loading="lazy"
                                      src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.domain}&size=128`}
                                    /> */}
                                    {item?.domain}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {item?.distict_sources}
                                  </StyledTableCell>
                                  <StyledTableCell className="volumeTD">
                                    {formatNumberWithCommas(item?.volume)}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    className={
                                      item?.compliant_percentage < 30
                                        ? "failureData"
                                        : item?.compliant_percentage > 30 &&
                                          item?.compliant_percentage <= 80
                                        ? "passTableData"
                                        : item?.compliant_percentage > 80
                                        ? "completeData"
                                        : ""
                                    }
                                  >
                                    {" "}
                                    <span className="highlightedText">
                                      {formatNumberWithCommas(
                                        item?.compliant_count
                                      )}
                                    </span>
                                    {item?.compliant_percentage == 0 ? null : (
                                      <>({item?.compliant_percentage}%)</>
                                    )}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    className={
                                      item?.failure_percentage < 30
                                        ? "failureData"
                                        : item?.failure_percentage > 30 &&
                                          item?.failure_percentage <= 80
                                        ? "passTableData"
                                        : item?.failure_percentage > 80
                                        ? "completeData"
                                        : ""
                                    }
                                  >
                                    <span className="highlightedText">
                                      {formatNumberWithCommas(
                                        item?.failure_count
                                      )}
                                    </span>
                                    {item?.failure_percentage == 0 ? null : (
                                      <>({item?.failure_percentage}%)</>
                                    )}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {item?.dmarc_policy
                                      ? item?.dmarc_policy
                                      : "N/A"}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <BorderLinearProgress
                                      value={item?.spf_percentage}
                                      variant="determinate"
                                      barColor={
                                        item?.spf_percentage < 30
                                          ? "#f43f5e"
                                          : item?.spf_percentage > 30 &&
                                            item?.spf_percentage <= 80
                                          ? "#eab308"
                                          : "#42a55e"
                                      }
                                    />
                                    <Typography
                                      color={
                                        item?.spf_percentage < 30
                                          ? "#f43f5e"
                                          : item?.spf_percentage > 30 &&
                                            item?.spf_percentage <= 80
                                          ? "#eab308"
                                          : "#42a55e"
                                      }
                                      fontSize="14px"
                                    >
                                      {item?.spf_percentage}%
                                    </Typography>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <BorderLinearProgress
                                      value={item?.dkim_percentage}
                                      variant="determinate"
                                      barColor={
                                        item?.dkim_percentage < 30
                                          ? "#f43f5e"
                                          : item?.dkim_percentage > 30 &&
                                            item?.dkim_percentage <= 80
                                          ? "#eab308"
                                          : "#42a55e"
                                      }
                                    />
                                    <Typography
                                      color={
                                        item?.dkim_percentage < 30
                                          ? "#f43f5e"
                                          : item?.dkim_percentage > 30 &&
                                            item?.dkim_percentage <= 80
                                          ? "#eab308"
                                          : "#42a55e"
                                      }
                                      fontSize="14px"
                                    >
                                      {item?.dkim_percentage}%
                                    </Typography>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Link
                                      href={`/dashboard/sender-dashboard?policy_published_domain=${
                                        item?.domain
                                      }&fromDashboard=true&page=1&page_size=10&start_date=${moment(
                                        historyDate?.startDate
                                      ).format("YYYY-MM-DD")}&end_date=${moment(
                                        historyDate?.endDate
                                      ).format("YYYY-MM-DD")}`}
                                      prefetch={true}
                                      // onClick={() =>
                                      //   // router.push(
                                      //   //   `/dashboard?domain=${item?.domain}&fromDashboard=true`
                                      //   // )
                                      //   handleRedirect(item?.domain)
                                      // }
                                      style={{
                                        color: "#f43f5e",
                                        backgroundColor: "transparent",
                                        maxWidth: "25px",
                                        padding: 0,
                                      }}
                                    >
                                      <GetAppIcon
                                        style={{
                                          transform: "rotate(-90deg)",
                                        }}
                                      />
                                    </Link>
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
      )}
    </>
  );
};
export default AccountDashboardComponent;

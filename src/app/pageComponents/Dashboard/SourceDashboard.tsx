"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Ipmodal from "@/components/Modal/ipModal";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import { isEmpty } from "@/utils/isEmpty";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { headCellsSource } from "@/components/Table-ui/headCells";
import TableRowsLoader from "@/components/Table-ui/TableRowsLoader";
import { BorderLinearProgress } from "@/components/UI/LineProgress";
import { TablePaginationCompo } from "@/components/Table-ui/TablePaginationCompo";
import { PAGINATION_OBJECT } from "@/constants/pagination";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import MainLoader from "@/components/Loaders/MainLoader";
import TableToolbar from "@/components/Table-ui/TableToolbar";
import { API_ROUTES } from "@/@core/apiRoutes";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";

import {
  FormControl,
  MenuItem,
  Select,
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

import {
  _handleChangePage,
  _setPaginationObjectFn,
  createQueryString,
} from "@/@core/tableFunctions";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const GoogleleafletMap = dynamic(
  () => import("@/externalLibraries/GoogleleafletMap"),
  {
    ssr: false,
  }
);
const SourceDashboardPage = ({ props }: { props: any }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(props?.searchQuery);
  const [paginationObject, setPaginationObject] = useState(() => {
    if (props.pageProp) {
      return {
        ...PAGINATION_OBJECT,
        page: props.pageProp,
        rowsPerPage: props.page_sizeProp,
      };
    } else {
      return PAGINATION_OBJECT;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal open/close
  const [currentIp, setCurrentIp] = useState("");
  const [list, setList] = React.useState<any>([]);
  const handleModalOpen = (ip: any) => {
    setCurrentIp(ip);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setCurrentIp("");
    setIsModalOpen(false);
  };
  const [filterDetails, setFilterDetails] = useState(props?.detail_type);
  const [mapData, setMapData] = useState(undefined);
  const reloadPageData = () => {};
  useEffect(() => {
    if (paginationObject.triggerApi) {
      if (props?.domain) {
        handleSourceDashboard();
        handleChartDashboard();
      }
    }
  }, [paginationObject.triggerApi]);

  useEffect(() => {
    _handleChangePage(
      {},
      searchTerm ? 0 : !isNaN(+props.pageProp - 1) ? +props.pageProp - 1 : 0,
      setPaginationObject
    );
  }, [searchTerm, props?.domain, filterDetails]);
  const handleChartDashboard = () => {
    let queryObject = {
      policy_published_domain: props?.domain,
      // base_domain: props?.baseDomain,
      host_name: props?.host_name,
      org_name: props?.org,
      ...(props?.start_Date && props?.start_Date !== "undefined"
        ? { start_date: dayjs(props?.start_Date).format("YYYY-MM-DD") }
        : {}),
      ...(props?.end_Date && props?.end_Date !== "undefined"
        ? { end_date: dayjs(props?.end_Date).format("YYYY-MM-DD") }
        : {}),
    };
    const qryStr = createQueryString(queryObject);
    getFetcherWithAuth(`${API_ROUTES.SOURCE_GEO_DETAILS_LIST}${qryStr}`)
      .then((pieChartResponse) => {
        let newMapResponse = JSON.parse(JSON.stringify(mapData ?? []));
        pieChartResponse?.data?.map((item: any, index: any) => {
          let responseData = {
            coordinates: {
              lat: parseInt(item.latitude),
              lng: parseInt(item.longitude),
            },
            flagIcon: item?.country,
            Failure: item?.failure_count,
            TotalEmai: item?.total_count,
            ipAddress: item?.source_ip,
            Compliant: item?.total_pass,
            id: index + 1,
            title: item?.country_code_iso3,
            name: item?.country_name,
          };

          newMapResponse[index] = responseData;
        });
        setMapData(newMapResponse);
      })
      .catch((err) => {
        setMapData(undefined);
        setPaginationObject(PAGINATION_OBJECT);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log("1234 list", list);
  const handleSourceDashboard = () => {
    setIsLoading(true);
    let queryObject = {
      policy_published_domain: props?.domain,
      // base_domain: props?.baseDomain,
      host_name: props?.host_name,
      org_name: props?.org,
      ...(props?.start_Date && props?.start_Date !== "undefined"
        ? { start_date: dayjs(props?.start_Date).format("YYYY-MM-DD") }
        : {}),
      ...(props?.end_Date && props?.end_Date !== "undefined"
        ? { end_date: dayjs(props?.end_Date).format("YYYY-MM-DD") }
        : {}),
      detail_type: filterDetails,
      search_query: searchTerm || "",
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
    };
    const qryStr = createQueryString(queryObject);
    router.push(`/dashboard/source-dashboard${qryStr}`);
    getFetcherWithAuth(`${API_ROUTES.SOURCE_DETAILS_LIST}${qryStr}`)
      .then((response) => {
        setList(response.results);
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, response);
        });
      })
      .catch((err) => {
        setList([...[]]);
        setPaginationObject(PAGINATION_OBJECT);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="graphSection">
        <div className="dashboardTopCard">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="col-xl-12">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group domain-filter">
                        <label>Domains</label>
                        <FormControl fullWidth disabled={true}>
                          <Select
                            label="Domain"
                            required
                            // onChange={(e: any) => handleChange(e, "domain")}
                            value={props?.domain}
                            className="domain-filter"
                          >
                            <MenuItem value={props?.domain}>
                              {props?.domain}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group datePickerNew">
                        <label>Start Date </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              value={dayjs(props?.start_Date)}
                              disabled
                              minDate={dayjs("2000-01-01")}
                              maxDate={
                                dayjs() > dayjs(props?.end_Date)
                                  ? dayjs(props?.end_Date)
                                  : dayjs()
                              }
                              className="dateRangeChanges"
                              format="YYYY-MM-DD"
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group datePickerNew">
                        <label>End Date </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              value={dayjs(props?.end_Date)}
                              disabled
                              className="dateRangeChanges"
                              minDate={dayjs(props?.start_Date)}
                              maxDate={dayjs()}
                              format="YYYY-MM-DD"
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                    </div>

                    <div className="col-lg-2">
                      <div className="form-group filtersButton">
                        <Stack spacing={2} direction="row">
                          <Button
                            className="btn blueButton"
                            title="Filter"
                            disabled={true}
                          >
                            Filter
                          </Button>
                        </Stack>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 sourceCard">
                <div className="card">
                  <div className="card-body">
                    <div className="dashboardData">
                      <div className="source-data">
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr>
                                <th scope="row">Sender</th>
                                <td>
                                  <img
                                    alt=""
                                    className="favIconImage"
                                    loading="lazy"
                                    src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${props?.domain}&size=128`}
                                  />
                                  {props?.domain}
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
              <div className="col-lg-6 sourceCard">
                <div className="card">
                  <div className="card-body">
                    <div className="dashboardData">
                      <div className="source-data">
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr>
                                <th scope="row">Source Name</th>
                                <td>
                                  <img
                                    alt=""
                                    className="favIconImage"
                                    loading="lazy"
                                    src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${props?.org}&size=128`}
                                  />
                                  {props?.org}
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
              {props?.host_name == "null" || props?.host_name == "" ? null : (
                <div className="col-lg-6 sourceCard mt-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="dashboardData">
                        <div className="source-data">
                          <div className="table-responsive">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <th scope="row">Host Name</th>
                                  <td>
                                    <img
                                      alt=""
                                      className="favIconImage"
                                      loading="lazy"
                                      src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${props?.org}&size=128`}
                                    />
                                    {props?.host_name}
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
              )}
              <div className="col-xl-12 mt-3">
                <div className="card">
                  <div className="card-header text-start">
                    <h3>
                      Where are emails sent from?
                      <InformationTooltip name="map_where_email_sent_from" />
                    </h3>
                  </div>

                  <div className="card-body">
                    <div className="mapHeight">
                      <div className="mapImageData">
                        {isLoading ? (
                          <MainLoader />
                        ) : (
                          <section>
                            <GoogleleafletMap
                              mapData={mapData}
                              from="dashboard"
                            />
                          </section>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-12 mt-3">
                <div className="card detailsCard detailBorder">
                  <div className="card-header p-3">
                    <div className="row">
                      <div className="col-xl-3">
                        <span className="d-flex align-items-start gap-2">
                          <h3 className="text-start">Details</h3>
                        </span>
                      </div>
                      <div className="col-xl-9">
                        <div className="headerBtns">
                          <div className="btn-group">
                            <div className="btn-group">
                              <div
                                className={
                                  filterDetails == "sources"
                                    ? "btn sources active"
                                    : " btn sources"
                                }
                                onClick={() => {
                                  setFilterDetails("sources");
                                }}
                                title="All Sources"
                              >
                                All Senders
                              </div>
                              <div
                                className={
                                  filterDetails == "compliant"
                                    ? "btn compliant active"
                                    : " btn compliant"
                                }
                                onClick={() => {
                                  setFilterDetails("compliant");
                                }}
                                title="Compliant"
                              >
                                Compliant
                              </div>
                              <div
                                className={
                                  filterDetails == "not_compliant"
                                    ? "btn notCompliant active"
                                    : " btn notCompliant"
                                }
                                onClick={() => {
                                  setFilterDetails("not_compliant");
                                }}
                                title="Not Compliant"
                              >
                                Not Compliant
                              </div>
                              <div
                                className={
                                  filterDetails == "unknown"
                                    ? "btn unknown active"
                                    : " btn unknown"
                                }
                                onClick={() => {
                                  setFilterDetails("unknown");
                                }}
                                title="Unknown/Threat"
                              >
                                Unknown/Threat
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <TableToolbar
                        onSearch={(query) => setSearchTerm(query)}
                      />
                      <Scrollbar sx={{ mt: 2 }}>
                        <TableContainer>
                          <Table>
                            <TableHeadRow headCells={headCellsSource} />
                            <TableBody>
                              {isLoading ? (
                                <TableRowsLoader
                                  rowsNum={10}
                                  columnNum={headCellsSource.length}
                                />
                              ) : isEmpty(list) ? (
                                <StyledTableNoData
                                  colSpan={headCellsSource.length}
                                />
                              ) : (
                                list?.map((item: any, idx: Number) => (
                                  <StyledTableRow key={`row_idx${idx}`}>
                                    <StyledTableCell>
                                      <div
                                        className={`${
                                          item?.ip_blacklist
                                            ?.blacklisted_status == true
                                            ? "redColor"
                                            : ""
                                        }  d-flex gap-1 justify-content-around align-items-center`}
                                      >
                                        <span
                                          className={`fi fi-${item?.country_code?.toLowerCase()}`}
                                        ></span>
                                        {/* <div className="title">
                                                {item?.data?.country_code_iso3}
                                              </div> */}
                                        <div className="text-center">
                                          <p
                                            onClick={() =>
                                              handleModalOpen(item?.source_ip)
                                            }
                                            className="ip text-decoration-underline"
                                            style={{ cursor: "pointer" }}
                                          >
                                            {item?.source_ip}
                                          </p>
                                          <p className="site">
                                            {item?.host_name}
                                          </p>
                                        </div>
                                        <span>
                                          {item?.ip_blacklist
                                            ?.blacklisted_status == true ? (
                                            <>
                                              <Tooltip
                                                title="Blacklisted"
                                                placement="right"
                                              >
                                                <Image
                                                  alt=""
                                                  src={_IMG.Critical}
                                                  loading="lazy"
                                                />
                                              </Tooltip>
                                            </>
                                          ) : (
                                            <>
                                              <Tooltip
                                                title="Not Blacklisted"
                                                placement="right"
                                              >
                                                <Image
                                                  src={_IMG.checkarrowFilled}
                                                  alt=""
                                                  loading="lazy"
                                                />
                                              </Tooltip>
                                            </>
                                          )}
                                        </span>
                                      </div>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {item?.header_from}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <span className="highlightedText">
                                        {item?.rows_count}
                                      </span>
                                      {props?.start_Date == "undefined" &&
                                      props?.end_Date == "undefined" ? null : (
                                        <>
                                          <br />
                                          <span className="">
                                            <span
                                              className={`${
                                                item?.rows_trend == "decrease"
                                                  ? "redColor"
                                                  : item?.rows_trend ==
                                                    "increase"
                                                  ? "greenColor"
                                                  : "yellowColor"
                                              } `}
                                            >
                                              {item?.rows_trend ==
                                              "decrease" ? (
                                                <Image
                                                  src={_IMG.trend_down}
                                                  alt="Web icon"
                                                  width={20}
                                                  loading="lazy"
                                                />
                                              ) : item?.rows_trend ==
                                                "increase" ? (
                                                <Image
                                                  src={_IMG.trend_up}
                                                  alt="Web icon"
                                                  width={20}
                                                  loading="lazy"
                                                />
                                              ) : item?.rows_trend ==
                                                "no change" ? null : null}
                                              {item?.rows_trend_value ==
                                              0 ? null : (
                                                <>
                                                  {`(${
                                                    item.rows_trend_value !=
                                                    null
                                                      ? item?.rows_trend_value
                                                      : "0.00"
                                                  }%)`}
                                                </>
                                              )}
                                            </span>
                                          </span>
                                        </>
                                      )}
                                    </StyledTableCell>
                                    <StyledTableCell>0</StyledTableCell>
                                    <StyledTableCell>
                                      <span className="highlightedText">
                                        {item?.compliant_count}
                                      </span>
                                      <br />
                                      {props?.start_Date == "undefined" &&
                                      props?.end_Date == "undefined" ? null : (
                                        <>
                                          <br />
                                          <span className="">
                                            {item.compliant_trend_value ==
                                            0 ? null : (
                                              <>
                                                <span
                                                  className={`${
                                                    item?.compliant_trend ==
                                                    "decrease"
                                                      ? "redColor"
                                                      : item?.compliant_trend ==
                                                        "increase"
                                                      ? "greenColor"
                                                      : "yellowColor"
                                                  } `}
                                                >
                                                  {item?.compliant_trend ==
                                                  "decrease" ? (
                                                    <Image
                                                      src={_IMG.trend_down}
                                                      alt="Web icon"
                                                      width={20}
                                                      loading="lazy"
                                                    />
                                                  ) : item?.compliant_trend ==
                                                    "increase" ? (
                                                    <Image
                                                      src={_IMG.trend_up}
                                                      alt="Web icon"
                                                      width={20}
                                                      loading="lazy"
                                                    />
                                                  ) : item?.compliant_trend ==
                                                    "no change" ? null : null}
                                                  {item.compliant_percentage ==
                                                  0 ? null : (
                                                    <>
                                                      {`(${
                                                        item.compliant_trend_value !=
                                                        null
                                                          ? item?.compliant_trend_value
                                                          : "0.00"
                                                      }%)`}
                                                    </>
                                                  )}
                                                </span>
                                              </>
                                            )}
                                          </span>
                                        </>
                                      )}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <span className="highlightedText">
                                        {item?.failure_count}
                                      </span>
                                      <br />
                                      {props?.start_Date == "undefined" &&
                                      props?.end_Date == "undefined" ? null : (
                                        <>
                                          <span className="">
                                            <span
                                              className={`${
                                                item?.failure_trend ==
                                                "decrease"
                                                  ? "greenColor"
                                                  : item?.failure_trend ==
                                                    "increase"
                                                  ? "redColor"
                                                  : "yellowColor"
                                              } `}
                                            >
                                              {item?.failure_trend_value ==
                                              0 ? null : (
                                                <>
                                                  {item?.failure_trend ==
                                                  "decrease" ? (
                                                    <Image
                                                      src={
                                                        _IMG.trend_down_green
                                                      }
                                                      alt="Web icon"
                                                      width={20}
                                                      loading="lazy"
                                                    />
                                                  ) : item?.failure_trend ==
                                                    "increase" ? (
                                                    <Image
                                                      src={_IMG.trend_up_red}
                                                      alt="Web icon"
                                                      width={20}
                                                      loading="lazy"
                                                    />
                                                  ) : item?.failure_trend ==
                                                    "no change" ? null : null}

                                                  {item?.failure_trend_value ==
                                                  0 ? null : (
                                                    <>
                                                      {`(${
                                                        item.failure_trend_value !=
                                                        null
                                                          ? item?.failure_trend_value
                                                          : "0.00"
                                                      }%)`}
                                                    </>
                                                  )}
                                                </>
                                              )}
                                            </span>
                                          </span>
                                        </>
                                      )}
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
                                      <div>
                                        {props?.start_Date !== "undefined" &&
                                        props?.end_Date !== "undefined" ? (
                                          <a
                                            onClick={() => reloadPageData()}
                                            href={`/dashboard/compliant-dashboard/?row_source_ip=${
                                              item.source_ip
                                            }&volume=${
                                              item.rows_count
                                            }&complaince=${
                                              item.compliant_percentage
                                            }&policy_published_domain=${
                                              item.header_from
                                            }&spf=${item.spf_percentage}&dkim=${
                                              item.dkim_percentage
                                            }&start_date=${dayjs(
                                              props?.start_Date
                                            ).format(
                                              "YYYY-MM-DD"
                                            )}&end_date=${dayjs(
                                              props?.end_Date
                                            ).format(
                                              "YYYY-MM-DD"
                                            )}&page=1&page_size=10`}
                                          >
                                            <Image
                                              alt={``}
                                              src={_IMG.right_arrow}
                                              title="View Details"
                                              loading="lazy"
                                            />
                                          </a>
                                        ) : (
                                          <a
                                            onClick={() => reloadPageData()}
                                            href={`/dashboard/compliant-dashboard/?row_source_ip=${item.source_ip}&volume=${item.rows_count}&complaince=${item.compliant_percentage}&policy_published_domain=${item.header_from}&spf=${item.spf_percentage}&dkim=${item.dkim_percentage}&page=1&page_size=10`}
                                          >
                                            <Image
                                              alt={``}
                                              src={_IMG.right_arrow}
                                              title="View Details"
                                              loading="lazy"
                                            />
                                          </a>
                                        )}
                                      </div>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Scrollbar>
                    </div>
                  </div>
                  <TablePaginationCompo
                    paginationObject={paginationObject}
                    setPaginationObject={setPaginationObject}
                    className="alignPagination"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Ipmodal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleClose={handleModalClose}
        Ip={currentIp}
      />
    </>
  );
};
export default SourceDashboardPage;

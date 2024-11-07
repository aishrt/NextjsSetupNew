"use client";
import { useEffect, useState, memo } from "react";
import { isEmpty } from "@/utils/isEmpty";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import dayjs from "dayjs";
import { Table, TableBody, TableContainer, Typography } from "@mui/material";
import _ from "lodash";
import TableToolbar from "@/components/Table-ui/TableToolbar";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";
import TableHeadRow, {
  StyledTableCell,
  StyledTableNoData,
  StyledTableRow,
} from "@/components/Table-ui/TableHeadRow";
import { headCellsSenders } from "@/components/Table-ui/headCells";
import { BorderLinearProgress } from "@/components/UI/LineProgress";
import { PAGINATION_OBJECT } from "@/constants/pagination";
import { useStore } from "@/utils/store";
import {
  _handleChangePage,
  _setPaginationObjectFn,
  createQueryString,
} from "@/@core/tableFunctions";
import { API_ROUTES } from "@/@core/apiRoutes";
import TableRowsLoader from "@/components/Table-ui/TableRowsLoader";
import { TablePaginationCompo } from "@/components/Table-ui/TablePaginationCompo";
import { useRouter } from "next/navigation";
import { fetchImage } from "@/@core/commonS3";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const DetailedSources = (props: any) => {
  let queryString;
  useEffect(() => {
    if (typeof window !== "undefined") {
      queryString = window.location.search;
    }
  }, []);
  const router = useRouter();
  const { firstDomain } = useStore();
  const [filterDetails, setFilterDetails] = useState(props?.detail_type);
  const [details, setDetails] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState(props?.searchQuery);
  const [isLoading, setisLoading] = useState(true);
  const [paginationObject, setPaginationObject] = useState(() => {
    if (props.pageProp) {
      return {
        ...PAGINATION_OBJECT,
        page: props.pageProp,
        rowsPerPage: !isNaN(+props.page_sizeProp) ? +props.page_sizeProp : 10,
      };
    } else {
      return PAGINATION_OBJECT;
    }
  });

  const formatNumberWithCommas = (number: any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (paginationObject.triggerApi) {
      getSendersData();
    }
  }, [paginationObject.triggerApi]);

  useEffect(() => {
    _handleChangePage(
      {},
      searchTerm ? 0 : !isNaN(+props.pageProp - 1) ? +props.pageProp - 1 : 0,
      setPaginationObject
    );
  }, [searchTerm, props?.domain, filterDetails]);
  const getSendersData = () => {
    setisLoading(true);
    let queryObject = {};
    queryObject = {
      search_query: searchTerm || "",
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
      policy_published_domain: props?.domain ? props?.domain : firstDomain,
      ...(props?.start_date && props?.start_date !== "undefined"
        ? { start_date: dayjs(props?.start_date).format("YYYY-MM-DD") }
        : {}),
      ...(props?.end_date && props?.end_date !== "undefined"
        ? { end_date: dayjs(props?.end_date).format("YYYY-MM-DD") }
        : {}),
      detail_type: filterDetails,
      ...(props?.fromDashboard == "true" ? { fromDashboard: "true" } : {}),
    };
    const qryStr = createQueryString(queryObject);
    router.push(`/dashboard/sender-dashboard${qryStr}`, { scroll: false });

    getFetcherWithAuth(`${API_ROUTES.DETAIL_REPORT_LIST}${qryStr}`)
      .then(async (response) => {
        const promises = response?.results.map(
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
        setDetails(updatedArray);
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, response);
        });
      })
      .catch((err) => {
        setDetails([...[]]);
        setPaginationObject(PAGINATION_OBJECT);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  return (
    <>
      <div className="graphSection pt-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card detailsCard">
                <div className="card-header">
                  <div className="row">
                    <div className="col-xl-3">
                      <span className="d-flex align-items-start gap-2">
                        <h3 className="text-start">Details </h3>
                      </span>
                    </div>
                    <div className="col-xl-9">
                      <div className="headerBtns">
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

                <div className="card-body">
                  <div className="table-responsive">
                    <TableToolbar
                      onSearch={(query) => {
                        setSearchTerm(query);
                      }}
                    />
                    <Scrollbar sx={{ mt: 2 }}>
                      <TableContainer>
                        <Table>
                          <TableHeadRow headCells={headCellsSenders} />
                          <TableBody>
                            {isLoading ? (
                              <TableRowsLoader
                                rowsNum={10}
                                columnNum={headCellsSenders.length}
                              />
                            ) : isEmpty(details) ? (
                              <StyledTableNoData
                                colSpan={headCellsSenders.length}
                              />
                            ) : (
                              details?.map((item: any, idx: Number) => (
                                <StyledTableRow key={`row_idx${idx}`}>
                                  <StyledTableCell>
                                    {" "}
                                    <div className="sourcesName">
                                      <span>
                                        {item?.source_logo ? (
                                          <img
                                            alt="Source Logo"
                                            src={item?.source_logo}
                                            loading="lazy"
                                          />
                                        ) : (
                                          <img
                                            src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.base_domain}&size=128`}
                                            alt="Source Logo"
                                            loading="lazy"
                                          />
                                        )}
                                        {/*<img
                                          loading="lazy"
                                          src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.base_domain}&size=128`}
                                        /> */}
                                      </span>
                                      <div className="">
                                        <p>{item?.source}</p>
                                        <p>{item?.host_name}</p>
                                      </div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {item?.ip_count}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <span className="highlightedText">
                                      {formatNumberWithCommas(item?.volume)}
                                    </span>

                                    <br />
                                    {props?.fromDashboard ? null : (
                                      <>
                                        <br />
                                        <span className="">
                                          <span
                                            className={`${
                                              item?.volume_trend == "decrease"
                                                ? "redColor"
                                                : item?.volume_trend ==
                                                  "increase"
                                                ? "greenColor"
                                                : "yellowColor"
                                            } `}
                                          >
                                            {item.volume_trend_value ==
                                            0 ? null : (
                                              <>
                                                {item?.volume_trend ==
                                                "decrease" ? (
                                                  <Image
layout="intrinsic"
                                                    src={_IMG.trend_down}
                                                    alt="Web icon"
                                                    width={20}
                                                    loading="lazy"
                                                  />
                                                ) : item?.volume_trend ==
                                                  "increase" ? (
                                                  <Image
layout="intrinsic"
                                                    src={_IMG.trend_up}
                                                    alt="Web icon"
                                                    width={20}
                                                    loading="lazy"
                                                  />
                                                ) : item?.volume_trend ==
                                                  "no change" ? null : null}
                                                {`(${
                                                  item.volume_trend_value !=
                                                  null
                                                    ? item?.volume_trend_value
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
                                      {item?.compliant_count}{" "}
                                      <span
                                        className={
                                          item?.compliant_percentage < 30
                                            ? "redColor"
                                            : item?.compliant_percentage > 30 &&
                                              item?.compliant_percentage <= 80
                                            ? "yellowColor"
                                            : item?.compliant_percentage > 80
                                            ? "greenColor"
                                            : ""
                                        }
                                      >
                                        {item?.compliant_percentage ==
                                        0 ? null : (
                                          <>
                                            {`(${
                                              item.compliant_percentage != null
                                                ? item?.compliant_percentage
                                                : "0.00"
                                            }%)`}
                                          </>
                                        )}
                                      </span>
                                    </span>
                                    <br />
                                    {props?.fromDashboard ? null : (
                                      <>
                                        <br />
                                        <span
                                          className={`${
                                            item?.compliant_trend == "decrease"
                                              ? "redColor"
                                              : item?.compliant_trend ==
                                                "increase"
                                              ? "greenColor"
                                              : "yellowColor"
                                          } `}
                                        >
                                          {item.compliant_trend_value ==
                                          0 ? null : (
                                            <>
                                              {item?.compliant_trend ==
                                              "decrease" ? (
                                                <Image
layout="intrinsic"
                                                  src={_IMG.trend_down}
                                                  alt="Web icon"
                                                  width={20}
                                                  loading="lazy"
                                                />
                                              ) : item?.compliant_trend ==
                                                "increase" ? (
                                                <Image
layout="intrinsic"
                                                  src={_IMG.trend_up}
                                                  alt="Web icon"
                                                  width={20}
                                                  loading="lazy"
                                                />
                                              ) : item?.compliant_trend ==
                                                "no change" ? null : null}
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
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <span className="highlightedText">
                                      {item?.failure_count}{" "}
                                      <span
                                        className={
                                          item?.failure_percentage < 30
                                            ? "greenColor"
                                            : item?.failure_percentage > 30 &&
                                              item?.failure_percentage <= 80
                                            ? "yellowColor"
                                            : item?.failure_percentage > 80
                                            ? "redColor"
                                            : ""
                                        }
                                      >
                                        {item?.failure_percentage ==
                                        0 ? null : (
                                          <>
                                            {`(${
                                              item.failure_percentage != null
                                                ? item?.failure_percentage
                                                : "0.00"
                                            }%)`}
                                          </>
                                        )}
                                      </span>
                                    </span>
                                    <br />
                                    {props?.fromDashboard ? null : (
                                      <>
                                        <br />
                                        <span
                                          className={`${
                                            item?.failure_trend == "decrease"
                                              ? "greenColor"
                                              : item?.failure_trend ==
                                                "increase"
                                              ? "redColor"
                                              : "yellowColor"
                                          } `}
                                        >
                                          {item.failure_trend_value ==
                                          0 ? null : (
                                            <>
                                              {item?.failure_trend ==
                                              "decrease" ? (
                                                <Image
layout="intrinsic"
                                                  src={_IMG.trend_down_green}
                                                  alt="Web icon"
                                                  width={20}
                                                  loading="lazy"
                                                />
                                              ) : item?.failure_trend ==
                                                "increase" ? (
                                                <Image
layout="intrinsic"
                                                  src={_IMG.trend_up_red}
                                                  alt="Web icon"
                                                  width={20}
                                                  loading="lazy"
                                                />
                                              ) : item?.failure_trend ==
                                                "no change" ? null : null}
                                              {`(${
                                                item.failure_trend_value != null
                                                  ? item?.failure_trend_value
                                                  : "0.00"
                                              }%)`}
                                            </>
                                          )}
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
                                      {props.start_date !== "undefined" &&
                                      props.end_date !== "undefined" ? (
                                        <a
                                          href={`/dashboard/source-dashboard/?policy_published_domain=${
                                            props?.domain
                                              ? props?.domain
                                              : firstDomain
                                          }&host_name=${
                                            item?.host_name
                                          }&org_name=${
                                            item?.source
                                          }&start_date=${dayjs(
                                            props?.start_date
                                          ).format(
                                            "YYYY-MM-DD"
                                          )}&end_date=${dayjs(
                                            props?.end_date
                                          ).format(
                                            "YYYY-MM-DD"
                                          )}&page=1&page_size=10`}
                                        >
                                          <Image
layout="intrinsic"
                                            alt={``}
                                            src={_IMG.right_arrow}
                                            className="give-pointer"
                                            title="View Details"
                                            loading="lazy"
                                          />
                                        </a>
                                      ) : (
                                        <a
                                          href={`/dashboard/source-dashboard/?policy_published_domain=${props?.domain}&host_name=${item?.host_name}&org_name=${item?.source}&page=1&page_size=10`}
                                        >
                                          <Image
layout="intrinsic"
                                            alt={``}
                                            src={_IMG.right_arrow}
                                            className="give-pointer"
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
      </div>
    </>
  );
};
export default memo(DetailedSources);

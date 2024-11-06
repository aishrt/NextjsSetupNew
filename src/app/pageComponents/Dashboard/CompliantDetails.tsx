"use client";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import { Table, TableBody, TableContainer } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { API_ROUTES } from "@/@core/apiRoutes";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";
import TableHeadRow, {
  StyledTableCell,
  StyledTableNoData,
  StyledTableRow,
} from "@/components/Table-ui/TableHeadRow";
import { headCellsComplaint } from "@/components/Table-ui/headCells";
import { isEmpty } from "@/utils/isEmpty";
import dayjs, { Dayjs } from "dayjs";
import {
  _handleChangePage,
  _setPaginationObjectFn,
  createQueryString,
} from "@/@core/tableFunctions";
import { PAGINATION_OBJECT } from "@/constants/pagination";
import { TablePaginationCompo } from "@/components/Table-ui/TablePaginationCompo";
import TableRowsLoader from "@/components/Table-ui/TableRowsLoader";
import { useRouter } from "next/navigation";

const CompliantDetails = ({ props }: { props: any }) => {
  const router = useRouter();
  const [filterDetails, setFilterDetails] = useState(props?.detail_type);
  const [tableData, setTableData] = useState([]);
  const [paginationObject, setPaginationObject] = useState(() => {
    if (props.page) {
      return {
        ...PAGINATION_OBJECT,
        page: props.page,
        rowsPerPage: props.page_size,
      };
    } else {
      return PAGINATION_OBJECT;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const formatNumberWithCommas = (number: any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleCommonFunction = (domain: any) => {
    return domain == "fail" || domain == "Fail" ? (
      <img
        style={{ width: "28px" }}
        src="/assets/images/Critical.svg"
        alt=""
        loading="lazy"
      />
    ) : (
      <img src="/assets/images/checkarrowFilled.svg" alt="" loading="lazy" />
    );
  };
  useEffect(() => {
    if (paginationObject.triggerApi) {
      // if (header_from) {
      handleCompliantDashboard();
      // }
    }
  }, [paginationObject.triggerApi]);
  useEffect(() => {
    _handleChangePage(
      {},
      !isNaN(+props.page - 1) ? +props.page - 1 : 0,
      setPaginationObject
    );
  }, [props?.header_from, filterDetails]);
  const handleCompliantDashboard = () => {
    let queryObject = {
      policy_published_domain: props?.header_from,
      row_source_ip:props?.ip_address,
      ...(props?.startDate  && props?.startDate !== "undefined"
        ? { start_date: dayjs(props?.startDate).format("YYYY-MM-DD") }
        : {}),
      ...(props?.endDate && props?.endDate !== "undefined"
        ? { end_date: dayjs(props?.endDate).format("YYYY-MM-DD") }
        : {}),
      detail_type: filterDetails,
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
      base_domain: props?.base_domain,
      volume: props?.volume,
      complaince: props?.complaince,
      spf: props?.spf,
      dkim: props?.dkim,
    };
    const qryStr = createQueryString(queryObject);
    router.push(`/dashboard/compliant-dashboard${qryStr}`, { scroll: false });
    getFetcherWithAuth(`${API_ROUTES.DMARC_SOURCE_DETAIL_LIST}${qryStr}`)
      .then((response) => {
        setTableData(response.results);
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, response);
        });
      })
      .catch((err) => {
        setTableData([...[]]);
        setPaginationObject(PAGINATION_OBJECT);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
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
                <div className="headerBtns compliantTabs">
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <Scrollbar sx={{ mt: 2 }}>
                <TableContainer>
                  <Table>
                    <TableHeadRow headCells={headCellsComplaint} />
                    <TableBody>
                      {isLoading ? (
                        <TableRowsLoader
                          rowsNum={10}
                          columnNum={headCellsComplaint.length}
                        />
                      ) : isEmpty(tableData) ? (
                        <StyledTableNoData
                          colSpan={headCellsComplaint.length}
                        />
                      ) : (
                        tableData?.map((item: any, idx: Number) => (
                          <StyledTableRow key={`num_${idx}`}>
                            <StyledTableCell>
                              <div className="d-flex gap-2 justify-content-start">
                                <div className="d-flex gap-1">
                                  {/* <span
                                    className={`align-middle fi fi-${data?.country_code?.toLowerCase()}`}
                                  ></span> */}
                                  {/* <div className="title">
                                    {data?.country_code_iso3}
                                  </div> */}
                                </div>
                                <div className="text-center">
                                  <p className="ip">
                                    {moment(item?.date_range_begin).format(
                                      "DD MMM, YYYY"
                                    )}
                                  </p>
                                  {/* <p className="site">{data?.base_domain}</p> */}
                                </div>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              {" "}
                              {formatNumberWithCommas(item?.volume)}
                            </StyledTableCell>
                            <StyledTableCell>0</StyledTableCell>
                            <StyledTableCell>
                              {handleCommonFunction(
                                item?.row_policy_evaluated_spf
                              )}
                            </StyledTableCell>
                            <StyledTableCell>
                              {handleCommonFunction(
                                item?.row_policy_evaluated_dkim
                              )}
                            </StyledTableCell>
                            <StyledTableCell>
                              {handleCommonFunction(item?.compliance)}
                            </StyledTableCell>
                            <StyledTableCell style={{ cursor: "pointer" }}>
                              {props?.startDate !== "undefined" &&
                              props?.endDate !== "undefined"  ? (
                                <a
                                  href={`/dashboard/source-result/?policy_published_domain=${props?.header_from}&base_domain=${props?.base_domain}&row_source_ip=${props?.ip_address}&dmarc_report_detail_id=${item?.id}&start_date=${props?.startDate}&end_date=${props?.endDate}`}
                                >
                                  <img
                                    alt={``}
                                    src="/assets/images/right-arrow.svg"
                                    title="View Details"
                                    loading="lazy"
                                  />
                                </a>
                              ) : (
                                <a
                                  href={`/dashboard/source-result/?policy_published_domain=${props?.header_from}&base_domain=${props?.base_domain}&row_source_ip=${props?.ip_address}&dmarc_report_detail_id=${item?.id}`}
                                >
                                  <img
                                    alt={``}
                                    src="/assets/images/right-arrow.svg"
                                    title="View Details"
                                    loading="lazy"
                                  />
                                </a>
                              )}
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
    </>
  );
};
export default CompliantDetails;

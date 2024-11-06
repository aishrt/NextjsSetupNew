"use client";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PollIcon from "@mui/icons-material/Poll";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import { Table, TableBody, TableContainer } from "@mui/material";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Ipmodal from "@/components/Modal/ipModal";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import { API_ROUTES } from "@/@core/apiRoutes";
import dayjs, { Dayjs } from "dayjs";
import { PAGINATION_OBJECT } from "@/constants/pagination";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";
import TableRowsLoader from "@/components/Table-ui/TableRowsLoader";
import { isEmpty } from "lodash";
import { TablePaginationCompo } from "@/components/Table-ui/TablePaginationCompo";
import { SenderSPFDKIMdashboard } from "@/components/Table-ui/headCells";

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

const GoogleleafletMap = dynamic(
  () => import("@/externalLibraries/GoogleleafletMap"),
  {
    ssr: false,
  }
);
const DonutChart = dynamic(
  () => import("@/app/pageComponents/Dashboard/donutchart"),
  {
    ssr: false,
  }
);

const SenderSPFDKIMDashboard = ({ props }: { props: any }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal open/close
  const [currentIp, setCurrentIp] = useState("");
  const [elementsList, setElementsList] = useState([] as any);
  const [dkim_result, setDkimResult] = React.useState<string>(props?.dkim);
  const [spf_result, setSpfResult] = React.useState<string>(props.spf);
  const [selectedDomain, setSelectedDomain] = useState(props?.domain);
  const [chartData, setChartData] = useState<any>();
  const [disposition, setDisposition] = React.useState<string>(
    props?.dispositions
  );
  const [mapData, setMapData] = useState(undefined);
  const [startDate, setStartDate] = useState<Dayjs | string | null>(
    props?.start_Date ?? null
  );
  const [endDate, setEndDate] = useState<Dayjs | string | null>(
    props?.end_Date ?? null
  );
  const [paginationObject, setPaginationObject] = useState(PAGINATION_OBJECT);
  const [isLoading, setIsLoading] = useState(true);
  const handleModalOpen = (ip: any) => {
    setCurrentIp(ip);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setCurrentIp("");
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (paginationObject.triggerApi) {
      if (selectedDomain) {
        handleSourceDashboard();
        handleChartDashboard();
      }
    }
  }, [paginationObject.triggerApi]);

  useEffect(() => {
    _handleChangePage({}, 0, setPaginationObject);
  }, [selectedDomain]);
  const handleSourceDashboard = () => {
    let queryObject = {
      policy_published_domain: selectedDomain ? selectedDomain : props?.domian,
      dkim_result: dkim_result ? dkim_result : props?.dkim,
      spf_result: spf_result ? spf_result : props.spf,
      ...(startDate && startDate !== "undefined"
        ? { start_date: dayjs(startDate).format("YYYY-MM-DD") }
        : {}),
      ...(endDate && endDate !== "undefined"
        ? { end_date: dayjs(endDate).format("YYYY-MM-DD") }
        : {}),
      disposition: disposition ? disposition : props?.disposition,
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
    };
    const qryStr = createQueryString(queryObject);
    getFetcherWithAuth(`${API_ROUTES.RESULT_SECOND_DETAIL_LIST}${qryStr}`)
      .then((response) => {
        setElementsList(response.results);
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, response);
        });
      })
      .catch((err) => {
        setElementsList([...[]]);
        setPaginationObject(PAGINATION_OBJECT);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleChartDashboard = () => {
    let queryObject = {
      policy_published_domain: selectedDomain ? selectedDomain : props?.domian,
      dkim_result: dkim_result ? dkim_result : props?.dkim,
      spf_result: spf_result ? spf_result : props.spf,
      ...(startDate && startDate !== "undefined"
        ? { start_date: dayjs(startDate).format("YYYY-MM-DD") }
        : {}),
      ...(endDate && endDate !== "undefined"
        ? { end_date: dayjs(endDate).format("YYYY-MM-DD") }
        : {}),
      disposition: disposition ? disposition : props?.disposition,
    };
    const qryStr = createQueryString(queryObject);
    getFetcherWithAuth(`${API_ROUTES.RESULT_SECOND_DASHBOARD}${qryStr}`)
      .then((pieChartResponse) => {
        setChartData(pieChartResponse?.pie_chart);
        let newMapResponse = JSON.parse(JSON.stringify(mapData ?? []));
        pieChartResponse?.geo_ip_list?.map((item: any, index: any) => {
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

  const generateUrlLastpage = (
    domain: any,
    base_domain: any,
    row_source_ip: any,
    dmarc_report_detail_id: any
  ) => {
    let queryObject = {
      policy_published_domain: domain,
      base_domain: base_domain,
      row_source_ip: row_source_ip,
      dmarc_report_detail_id: dmarc_report_detail_id,
    };
    return createQueryString(queryObject, "/dashboard/source-result");
  };
  return (
    <div className="result-dashboard2">
      <div className="graphSection">
        <div className="dashboardTopCard">
          <div className="row">
            <div className="col-xl-12"></div>
            <div className="col-xl-3">
              <div
                className={`cardInner ${
                  spf_result ? "compliants" : "failures"
                }`}
              >
                <div className="cardInnerContent">
                  <div className="cardIcon">
                    {spf_result ? (
                      <CheckCircleIcon className="iconSize compliants" />
                    ) : (
                      <CancelIcon className="iconSize failures" />
                    )}
                  </div>
                  <div className="cardText">
                    <h4>
                      SPF Result
                      <InformationTooltip name="RSLT_p2_spf_result" />
                    </h4>
                    <p>{spf_result}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div
                className={`cardInner ${
                  spf_result ? "compliants" : "failures"
                }`}
              >
                <div className="cardInnerContent">
                  <div className="cardIcon">
                    {spf_result ? (
                      <CheckCircleIcon className="iconSize compliants" />
                    ) : (
                      <CancelIcon className="iconSize failures" />
                    )}
                  </div>
                  <div className="cardText">
                    <h4>
                      DKIM Result
                      <InformationTooltip name="RSLT_p2_spf_result" />
                    </h4>
                    <p>{dkim_result}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="cardInner compliants">
                <div className="cardInnerContent">
                  <div className="cardIcon">
                    <PollIcon className="iconSize compliants" />
                  </div>
                  <div className="cardText">
                    <h4>
                      Disposition
                      <InformationTooltip name="RSLT_p2_disposition" />
                    </h4>
                    <p>{disposition}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 mt-3">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-start fw-bold">
                    Where are emails sent from?
                    <InformationTooltip name="map_where_email_sent_from" />
                  </h3>
                </div>
                <div className="card-body">
                  <div className="row mapHeight">
                    <section>
                      <GoogleleafletMap mapData={mapData} from="dashboard" />
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-3">
              <div className="card reporters sourceResult">
                <div className="card-header text-start">
                  <h4>
                    Sources <InformationTooltip name="RSLT_p2_sources" />
                  </h4>
                  <p>Messages by source</p>
                </div>
                <DonutChart pieDetails={chartData?.sources} />
              </div>
            </div>
            <div className="col-xl-4 mt-3">
              <div className="card reporters sourceResult">
                <div className="card-header text-start">
                  <h4>
                    Selectors <InformationTooltip name="RSLT_p2_selectors" />
                  </h4>
                  <p>Messages by selector</p>
                </div>
                <DonutChart pieDetails={chartData?.selector} />
              </div>
            </div>
            <div className="col-xl-4 mt-3">
              <div className="card reporters sourceResult">
                <div className="card-header text-start">
                  <h4>
                    Reporters <InformationTooltip name="RSLT_p2_reporters" />
                  </h4>
                  <p>Messages by reporter</p>
                </div>
                <DonutChart pieDetails={chartData?.reporter} />
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
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <Scrollbar sx={{ mt: 2 }}>
                      <TableContainer>
                        <Table>
                          <TableHeadRow headCells={SenderSPFDKIMdashboard} />
                          <TableBody>
                            {isLoading ? (
                              <TableRowsLoader
                                rowsNum={10}
                                columnNum={SenderSPFDKIMdashboard.length}
                              />
                            ) : isEmpty(elementsList) ? (
                              <StyledTableNoData
                                colSpan={SenderSPFDKIMdashboard.length}
                              />
                            ) : (
                              elementsList?.map((item: any, idx: Number) => (
                                <StyledTableRow key={`row_idx${idx}`}>
                                  <StyledTableCell>
                                    <div className="d-flex gap-3 justify-content-start">
                                      <div className="d-flex gap-1 align-items-center">
                                        <span
                                          className={`fi fi-${item?.country_code?.toLowerCase()}`}
                                        ></span>
                                        <div className="title">
                                          {item.country_code}
                                        </div>
                                      </div>
                                      <div className="text-center">
                                        <p
                                          onClick={() =>
                                            handleModalOpen(item?.source_ip)
                                          }
                                          className="ip text-decoration-underline"
                                          style={{ cursor: "pointer" }}
                                        >
                                          {item.source_ip}
                                        </p>
                                        <p className="site">{item.source}</p>
                                      </div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {item.message}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {item?.selector}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {item?.reporter}
                                  </StyledTableCell>

                                  <StyledTableCell>
                                    <a
                                      className="btn pointer"
                                      title="View Event"
                                      href={generateUrlLastpage(
                                        props.domain,
                                        item?.source,
                                        item?.source_ip,
                                        item?.report_detail_id
                                      )}
                                      // target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {new Date(item.last_event)
                                        .toLocaleDateString("en-GB")
                                        .split("/")
                                        .join("-")}
                                      <i className="fa-solid fa-up-right-from-square ms-2 handIcon"></i>
                                    </a>
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
      <Ipmodal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleClose={handleModalClose}
        Ip={currentIp}
      />
    </div>
  );
};
export default SenderSPFDKIMDashboard;

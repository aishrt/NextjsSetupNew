"use client";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import { Table, TableBody, TableContainer } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import InformationTooltip from "@/components/InformationTooltip";
import dayjs from "dayjs";
import {
  _handleChangePage,
  _setPaginationObjectFn,
  createQueryString,
} from "@/@core/tableFunctions";
import { API_ROUTES } from "@/@core/apiRoutes";
import { PAGINATION_OBJECT } from "@/constants/pagination";
import TableToolbar from "../../../components/ui/table-ui/TableToolbar";
import Scrollbar from "../../../components/ui/scrollbar/Scrollbar";
import TableHeadRow, {
  StyledTableCell,
  StyledTableNoData,
  StyledTableRow,
} from "../../../components/ui/table-ui/TableHeadRow";
import { headCellsSourceResult } from "../../../components/ui/table-ui/headCells";
import TableRowsLoader from "../../../components/ui/table-ui/TableRowsLoader";
import { TablePaginationCompo } from "../../../components/ui/table-ui/TablePaginationCompo";
import { useRouter } from "next/navigation";
import { fetchImage } from "@/@core/commonS3";
interface DKIMDetailsProps {
  domain: string;
  base_domain: any;
  row_source_ip: string;
  dmarc_report_detail_id: any;
  startDate: string;
  endDate: string;
  page: any;
  page_size: any;
  searchQuery: any;
}

const SourceResultDKIMDetails: React.FC<DKIMDetailsProps> = ({
  domain,
  base_domain,
  row_source_ip,
  dmarc_report_detail_id,
  startDate,
  endDate,
  page,
  page_size,
  searchQuery,
}) => {
  const num_page_size = parseInt(page_size);
  const router = useRouter();
  const [elementsList, setElementsList] = useState([] as any);
  const [paginationObject, setPaginationObject] = useState(() => {
    if (page) {
      return {
        ...PAGINATION_OBJECT,
        page: page,
        rowsPerPage: num_page_size,
      };
    } else {
      return PAGINATION_OBJECT;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    if (paginationObject.triggerApi) {
      if (domain) {
        handleCompliantDashboard();
      }
    }
  }, [paginationObject.page, paginationObject.triggerApi]);
  useEffect(() => {
    _handleChangePage(
      {},
      searchTerm ? 0 : !isNaN(+page - 1) ? +page - 1 : 0,
      setPaginationObject
    );
  }, [domain, searchTerm]);
  const handleCompliantDashboard = () => {
    setIsLoading(true);
    let queryObject = {
      policy_published_domain: domain,
      base_domain: base_domain,
      row_source_ip: row_source_ip,
      ...(startDate && startDate !== "undefined"
        ? { start_date: dayjs(startDate).format("YYYY-MM-DD") }
        : {}),
      ...(endDate && endDate !== "undefined"
        ? { end_date: dayjs(endDate).format("YYYY-MM-DD") }
        : {}),
      dmarc_report_detail_id: dmarc_report_detail_id,
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
      search_query: searchTerm || "",
    };
    const qryStr = createQueryString(queryObject);

    router.push(`/dashboard/source-result${qryStr}`, { scroll: false });
    getFetcherWithAuth(`${API_ROUTES.DKIM_SIGNATURE_LIST}${qryStr}`)
      .then(async (response) => {
        const promises = response?.results.map(
          async (item: any, index: number) => {
            if (item.source_logo) {
              const logoUrl = await fetchImage(
                item.source_logo,
                null,
                "source_logo"
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
        setElementsList(updatedArray);
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
  const handleCommonFunction = (domain: any) => {
    return domain == "fail" || domain == "Fail" ? (
      <img src="/assets/images/Critical.svg" alt="" loading="lazy" />
    ) : (
      <img src="/assets/images/checkarrowFilled.svg" alt="" loading="lazy" />
    );
  };
  return (
    <>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-xl-3">
                <span className="d-flex align-items-start gap-2">
                  <h3 className="text-start">
                    DKIM Signatures
                    <InformationTooltip name="SRDP_dkim_signatures" />
                  </h3>
                </span>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <TableToolbar onSearch={(query) => setSearchTerm(query)} />

              <Scrollbar sx={{ mt: 2 }}>
                <TableContainer>
                  <Table>
                    <TableHeadRow headCells={headCellsSourceResult} />
                    <TableBody>
                      {isLoading ? (
                        <TableRowsLoader
                          rowsNum={10}
                          columnNum={headCellsSourceResult.length}
                        />
                      ) : isEmpty(elementsList) ? (
                        <StyledTableNoData
                          colSpan={headCellsSourceResult.length}
                        />
                      ) : (
                        elementsList?.map((item: any, idx: Number) => (
                          <StyledTableRow key={`row_idx${idx}`}>
                            <StyledTableCell>
                              {" "}
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
                                  src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.dkim_auth_results_domain}&size=128`}
                                />
                              )}
                              {/* <img
                                className="favIconImage"
                                loading="lazy"
                                src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.dkim_auth_results_domain}&size=128`}
                              /> */}
                              <span className="py-1 px-2 ">
                                {item?.dkim_auth_results_domain}
                              </span>
                            </StyledTableCell>
                            <StyledTableCell>
                              {item?.dkim_auth_results_selector}
                            </StyledTableCell>
                            <StyledTableCell>
                              {handleCommonFunction(
                                item?.dkim_auth_results_result
                              )}
                            </StyledTableCell>
                            <StyledTableCell>
                              {handleCommonFunction(
                                item?.row_policy_evaluated_dkim
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
export default SourceResultDKIMDetails;

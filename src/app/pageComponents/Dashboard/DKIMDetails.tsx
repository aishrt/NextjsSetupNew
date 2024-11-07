"use client";
import { fetchDkimSignatureData } from "@/@core/apiFetcher";
import { Pagination } from "@mui/material";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import { _IMG } from "@/constants/images";
import Image from "next/image";

interface DKIMDetailsProps {
  domain: string;
  base_domain: any;
  row_source_ip: string;
  dmarc_report_detail_id: string;
  DKIMList: any;
}

const DKIMDetails: React.FC<DKIMDetailsProps> = ({
  domain,
  base_domain,
  row_source_ip,
  dmarc_report_detail_id,
  DKIMList,
}) => {
  const [searchDetails, setSearchDetails] = useState<string>("");
  const [elementsList, setElementsList] = useState([] as any);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setElementsList(DKIMList?.results);
    setTotalPages(DKIMList?.total_pages);
    setTotalRecords(DKIMList?.count);
  }, [domain, base_domain, row_source_ip, dmarc_report_detail_id, DKIMList]);
  const option = [10, 15, 20];
  const handleChangePage = async (event: any, value: any) => {
    setPage(value);
    handleRefreshData(
      domain,
      base_domain,
      row_source_ip,
      dmarc_report_detail_id,
      value,
      pageSize,
      searchDetails
    );
  };
  const handleRefreshData = async (
    domain: any,
    base_domain: any,
    row_source_ip: any,
    dmarc_report_detail_id: any,
    page: any,
    page_size: any,
    search_query: any
  ) => {
    let response = await fetchDkimSignatureData(
      domain,
      base_domain,
      row_source_ip,
      dmarc_report_detail_id,
      page,
      page_size,
      search_query
    );
    setElementsList(response?.results);
    setTotalPages(response?.total_pages);
    setTotalRecords(response?.count);
  };
  const changeWidth = async (e: any) => {
    setPageSize(parseInt(e.target.value, 10));
    setPage(1);
    handleRefreshData(
      domain,
      base_domain,
      row_source_ip,
      dmarc_report_detail_id,
      1,
      e.target.value,
      searchDetails
    );
  };
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchDetails(value);
      handleRefreshData(
        domain,
        base_domain,
        row_source_ip,
        dmarc_report_detail_id,
        1,
        pageSize,
        value
      );
    }, 500),
    [domain, base_domain, row_source_ip, dmarc_report_detail_id, pageSize]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <>
      <div className="col-xl-12 mt-4">
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
            <div className="search d-flex justify-content-between align-itens-center mb-4 filterSection">
              <div className="entries d-flex gap-2 align-items-center">
                <label>Show </label>
                <select name="entry" id="entry" onChange={changeWidth}>
                  {option?.length > 0 &&
                    option?.map((item: any, index: number) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      );
                    })}
                </select>
                <span>entries</span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table subtle">
                <thead>
                  <tr>
                    <th title="DKIM Domain">
                      DKIM DOMAIN <InformationTooltip name="SRDP_dkim_domain" />
                    </th>
                    <th title="DKIM Selector">
                      DKIM SELECTOR
                      <InformationTooltip name="SRDP_dkim_selector" />
                    </th>
                    <th title="DKIM Valid">
                      DKIM VALID <InformationTooltip name="SRDP_dkim_valid" />
                    </th>
                    <th title="DKIM Alignment">
                      DKIM ALIGNMENT
                      <InformationTooltip name="SRDP_dkim_alignment" />
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {elementsList && elementsList.length > 0 ? (
                    elementsList.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="">
                          <Image
                            alt="Fav icon"
                            className="favIconImage"
                            loading="lazy"
                            src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.dkim_auth_results_domain}&size=128`}
                          />
                          <span className="py-1 px-2 bg-secondary-subtle rounded">
                            {item?.dkim_auth_results_domain}
                          </span>
                        </td>
                        <td>{item?.dkim_auth_results_selector}</td>
                        <td>
                          {item?.dkim_auth_results_result?.toLowerCase() ===
                          "fail" ? (
                            <Image
                              src={_IMG.crosscircle}
                              alt="crosscircle"
                              loading="lazy"
                            />
                          ) : (
                            <Image
                              src={_IMG.checkcircle}
                              alt=""
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td>
                          {item?.row_policy_evaluated_dkim?.toLowerCase() ===
                          "fail" ? (
                            <Image
                              src={_IMG.crosscircle}
                              alt=""
                              loading="lazy"
                            />
                          ) : (
                            <Image
                              src={_IMG.crosscircle}
                              alt=""
                              loading="lazy"
                            />
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-xl-12">
            {elementsList && elementsList.length > 0 && (
              <div className="search Pagination d-flex align-items-baseline justify-content-between mt-4">
                <div className="entries d-flex gap-2">
                  <p>
                    Showing {(page - 1) * pageSize + 1} of
                    {page * pageSize > totalRecords
                      ? totalRecords
                      : page * pageSize}
                    of {totalRecords} Entries
                  </p>
                </div>
                <div>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default DKIMDetails;

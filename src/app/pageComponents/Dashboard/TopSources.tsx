"use client";
import React, { memo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import { fetchImage } from "@/@core/commonS3";
import { _IMG } from "@/constants/images";
import Image from "next/image";
const TopSources = ({
  domainValue,
  failure,
  compliant,
  sender,
  start_date,
  end_date,
}: {
  domainValue: any;
  failure: any;
  compliant: any;
  sender: any;
  start_date: any;
  end_date: any;
}) => {
  const searchParams = useSearchParams();
  const domain: any = domainValue ? domainValue : searchParams.get("domain");
  const queryString = searchParams.toString();
  const reloadPageData = () => {
    // router.push(fullUrl);
  };
  const urlParams = new URLSearchParams(queryString);
  const fromDashboard = urlParams.get("fromDashboard");
  const [fileSenderSrc, setFileSenderSrc] = useState<(string | null)[]>([]);
  const [fileFailureSrc, setFileFailureSrc] = useState<(string | null)[]>([]);
  const [fileComplaintSrc, setFileComplaintSrc] = useState<(string | null)[]>(
    []
  );
  useEffect(() => {
    if (sender?.length > 0) {
      const fetchLogos = async () => {
        const promises = sender.map(async (item: any, index: number) => {
          if (item.source_logo) {
            const logoUrl = await fetchImage(item.source_logo, null, "");
            return {
              ...item,
              source_logo: logoUrl,
            };
          } else {
            return item;
          }
        });
        const updatedArray = await Promise.all(promises);
        setFileSenderSrc(updatedArray);
      };

      fetchLogos();
    }
  }, [sender]);
  useEffect(() => {
    if (failure?.length > 0) {
      const fetchFailureLogos = async () => {
        const promises = failure.map(async (item: any, index: number) => {
          if (item.source_logo) {
            const logoUrl = await fetchImage(item.source_logo, null, "");
            return {
              ...item,
              source_logo: logoUrl,
            };
          } else {
            return item;
          }
        });
        const updatedArray = await Promise.all(promises);
        setFileFailureSrc(updatedArray);
      };

      fetchFailureLogos();
    }
  }, [failure]);
  useEffect(() => {
    if (compliant?.length > 0) {
      const fetchComplaintLogos = async () => {
        const promises = compliant.map(async (item: any, index: number) => {
          if (item.source_logo) {
            const logoUrl = await fetchImage(item.source_logo, null, "");
            return {
              ...item,
              source_logo: logoUrl,
            };
          } else {
            return item;
          }
        });
        const updatedArray = await Promise.all(promises);
        setFileComplaintSrc(updatedArray);
      };

      fetchComplaintLogos();
    }
  }, [compliant]);
  return (
    <div className="graphSection pt-4 border-top-0">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-4 ps-0">
            <div className="card failure detailBorder">
              <div className="card-header text-start">
                <h3>
                  Top Senders <InformationTooltip name="SND_top_sender" />
                </h3>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th title="Source">SENDERS</th>
                        <th title="Compliance" className="text-center">
                          EMAILS
                        </th>
                        <th title="Compliance" className="text-center">
                          PERCENTAGE
                        </th>
                        {fileSenderSrc && fileSenderSrc?.length > 0 ? (
                          <th></th>
                        ) : (
                          ""
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {fileSenderSrc?.length > 0 ? (
                        fileSenderSrc?.map((item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="sourcesName">
                                  <span>
                                    {item?.source_logo ? (
                                      <img
                                        alt=""
                                        src={item?.source_logo}
                                        loading="lazy"
                                      />
                                    ) : (
                                      <img
                                        alt=""
                                        src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.base_domain}&size=128`}
                                        loading="lazy"
                                      />
                                    )}
                                  </span>
                                  <div className="">
                                    <p>{item?.org}</p>
                                    <p>{item?.host_name}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end">{item?.sum}</td>
                              <td className="text-end">
                                <span>{item.percentage} % </span>
                              </td>
                              <td>
                                {start_date !== "undefined" &&
                                end_date !== "undefined" ? (
                                  <a
                                    href={`/dashboard/source-dashboard/?policy_published_domain=${domain}&host_name=${item?.host_name}&org_name=${item?.org}&start_date=${start_date}&end_date=${end_date}&page=1&page_size=10`}
                                  >
                                    <Image
layout="intrinsic"
                                      alt=""
                                      src={_IMG.right_arrow}
                                      className="give-pointer"
                                      title="View Details"
                                      loading="lazy"
                                    />
                                  </a>
                                ) : (
                                  <a
                                    href={`/dashboard/source-dashboard/?policy_published_domain=${domain}&host_name=${item?.host_name}&org_name=${item?.org}&page=1&page_size=10`}
                                  >
                                    <Image
layout="intrinsic"
                                      alt=""
                                      src={_IMG.right_arrow}
                                      className="give-pointer"
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
                          <td colSpan={3} className="text-center">
                            No Data available in table
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 ps-0">
            <div className="card failure detailBorder">
              <div className="card-header text-start">
                <h3>
                  Top Failure Senders
                  <InformationTooltip name="SND_top_failure_sender" />
                </h3>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th title="Source">SENDERS</th>
                        <th title="Volume" className="text-center">
                          EMAILS
                        </th>
                        <th title="Compliance" className="text-center">
                          FAILURES
                        </th>
                        {fileFailureSrc?.length > 0 ? <th></th> : ""}
                      </tr>
                    </thead>
                    <tbody>
                      {fileFailureSrc?.length > 0 ? (
                        fileFailureSrc?.map((item: any, index: number) => {
                          if (item?.non_compliant_email_count) {
                            return (
                              <tr key={index}>
                                <td>
                                  <div className="sourcesName">
                                    <span>
                                      {item?.source_logo ? (
                                        <img
                                          alt=""
                                          src={item?.source_logo}
                                          loading="lazy"
                                        />
                                      ) : (
                                        <img
                                          alt=""
                                          src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.base_domain}&size=128`}
                                          loading="lazy"
                                        />
                                      )}
                                    </span>

                                    <div className="">
                                      <p>{item?.source}</p>
                                      <p>{item?.host_name}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-end">
                                  {item?.non_compliant_email_count}
                                </td>
                                <td
                                  className="text-end"
                                  style={{ minWidth: "130px" }}
                                >
                                  <span
                                    className={
                                      item?.percentage_of_non_compliant_email <
                                      30
                                        ? "complete"
                                        : item?.percentage_of_non_compliant_email >
                                            30 &&
                                          item?.percentage_of_non_compliant_email <=
                                            80
                                        ? "passTable"
                                        : "failure"
                                    }
                                  >
                                    <span className="highlightedText">
                                      {item?.percentage_of_non_compliant_email ==
                                      parseInt(
                                        item?.percentage_of_non_compliant_email,
                                        10
                                      )
                                        ? item?.percentage_of_non_compliant_email
                                        : (
                                            item?.percentage_of_non_compliant_email ??
                                            0
                                          ).toFixed(2)}
                                      % {""}
                                    </span>
                                    {fromDashboard ? null : (
                                      <>
                                        <br />
                                        <span className="trendDisplaydata">
                                          <span>
                                            {item?.trend == "decrease" ? (
                                              <Image
layout="intrinsic"
                                                src={_IMG.trend_down_green}
                                                alt="Web icon"
                                              />
                                            ) : item?.trend == "increase" ? (
                                              <Image
layout="intrinsic"
                                                src={_IMG.trend_up_red}
                                                alt="Web icon"
                                              />
                                            ) : item?.trend ==
                                              "no change" ? null : null}
                                          </span>
                                          {item?.trend_percentage ==
                                          0 ? null : (
                                            <span
                                              className={`${
                                                item?.trend == "decrease"
                                                  ? "greenColor"
                                                  : item?.trend == "increase"
                                                  ? "redColor"
                                                  : "yellowColor"
                                              } `}
                                            >
                                              {`(${item?.trend_percentage}%)`}
                                            </span>
                                          )}
                                        </span>
                                      </>
                                    )}
                                  </span>
                                </td>
                                <td>
                                  {start_date !== "undefined" &&
                                  end_date !== "undefined" ? (
                                    <a
                                      onClick={() => reloadPageData()}
                                      href={`/dashboard/source-dashboard/?policy_published_domain=${domain}&host_name=${item?.host_name}&org_name=${item?.source}&start_date=${start_date}&end_date=${end_date}&page=1&page_size=10`}
                                    >
                                      <Image
layout="intrinsic"
                                        alt=""
                                        src={_IMG.right_arrow}
                                        className="give-pointer"
                                        title="View Details"
                                        loading="lazy"
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      onClick={() => reloadPageData()}
                                      href={`/dashboard/source-dashboard/?policy_published_domain=${domain}&host_name=${item?.host_name}&org_name=${item?.source}&page=1&page_size=10`}
                                    >
                                      <Image
layout="intrinsic"
                                        alt=""
                                        src={_IMG.right_arrow}
                                        className="give-pointer"
                                        title="View Details"
                                        loading="lazy"
                                      />
                                    </a>
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        })
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center">
                            No Data available in table
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 pe-0">
            <div className="card compliant detailBorder">
              <div className="card-header text-start">
                <h3>
                  Top Compliant Senders
                  <InformationTooltip name="SND_top_compliant_sender" />
                </h3>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th title="Source">SENDERS</th>
                        <th title="Volume" className="text-center">
                          EMAILS
                        </th>
                        <th title="Compliance" className="text-center">
                          COMPLIANCE
                        </th>
                        {fileComplaintSrc?.length > 0 && <th></th>}
                      </tr>
                    </thead>
                    <tbody>
                      {fileComplaintSrc?.length > 0 ? (
                        fileComplaintSrc?.filter(
                          (item: any) =>
                            item?.percentage_of_compliant_email_count >= 80
                        ).length > 0 ? (
                          fileComplaintSrc?.map((item: any, index: number) => {
                            if (
                              item?.percentage_of_compliant_email_count >= 80
                            ) {
                              return (
                                <tr key={index}>
                                  <td>
                                    <div className="sourcesName">
                                      <span>
                                        {item?.source_logo ? (
                                          <img
                                            alt=""
                                            src={item?.source_logo}
                                            loading="lazy"
                                          />
                                        ) : (
                                          <img
                                            alt=""
                                            src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.base_domain}&size=128`}
                                            loading="lazy"
                                          />
                                        )}
                                      </span>
                                      <div className="">
                                        <p>{item?.source}</p>
                                        <p>{item?.host_name}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    {item?.compliant_email_count}
                                  </td>
                                  <td className="text-end">
                                    <span
                                      className={
                                        item?.percentage_of_compliant_email_count <
                                        30
                                          ? "failure"
                                          : item?.percentage_of_compliant_email_count >
                                              30 &&
                                            item?.percentage_of_compliant_email_count <=
                                              80
                                          ? "passTable"
                                          : "complete"
                                      }
                                    >
                                      <span className="highlightedText">
                                        {item?.percentage_of_compliant_email_count ===
                                        parseInt(
                                          item?.percentage_of_compliant_email_count,
                                          10
                                        )
                                          ? item?.percentage_of_compliant_email_count
                                          : (
                                              item?.percentage_of_compliant_email_count ??
                                              0
                                            ).toFixed(2)}
                                        % {""}
                                      </span>
                                      {fromDashboard ? null : (
                                        <>
                                          <br />
                                          <span className="trendDisplaydata">
                                            <span>
                                              {item?.trend === "decrease" ? (
                                                <Image
layout="intrinsic"
                                                  src="/assets/images/trend-down.svg"
                                                  alt="Web icon"
                                                />
                                              ) : item?.trend === "increase" ? (
                                                <Image
layout="intrinsic"
                                                  src="/assets/images/trend-up.svg"
                                                  alt="Web icon"
                                                />
                                              ) : item?.trend ===
                                                "no change" ? null : null}
                                            </span>
                                            {item?.trend_percentage ===
                                            0 ? null : (
                                              <span
                                                className={`${
                                                  item?.trend === "decrease"
                                                    ? "redColor"
                                                    : item?.trend === "increase"
                                                    ? "greenColor"
                                                    : "yellowColor"
                                                } `}
                                              >
                                                {`(${item?.trend_percentage}%)`}
                                              </span>
                                            )}
                                          </span>
                                        </>
                                      )}
                                    </span>
                                  </td>
                                  <td>
                                    {start_date !== "undefined" &&
                                    end_date !== "undefined" ? (
                                      <a
                                        onClick={() => reloadPageData()}
                                        href={`/dashboard/source-dashboard/?policy_published_domain=${domain}&host_name=${item?.host_name}&org_name=${item?.source}&start_date=${start_date}&end_date=${end_date}&page=1&page_size=10`}
                                      >
                                        <Image
layout="intrinsic"
                                          alt=""
                                          src={_IMG.right_arrow}
                                          className="give-pointer"
                                          title="View Details"
                                          loading="lazy"
                                        />
                                      </a>
                                    ) : (
                                      <a
                                        onClick={() => reloadPageData()}
                                        href={`/dashboard/source-dashboard/?policy_published_domain=${domain}&host_name=${item?.host_name}&org_name=${item?.source}&page=1&page_size=10`}
                                      >
                                        <Image
layout="intrinsic"
                                          alt=""
                                          src={_IMG.right_arrow}
                                          className="give-pointer"
                                          title="View Details"
                                          loading="lazy"
                                        />
                                      </a>
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          })
                        ) : (
                          <tr>
                            <td colSpan={7} className="text-center">
                              No Data Available in Table
                            </td>
                          </tr>
                        )
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center">
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
  );
};
export default memo(TopSources);

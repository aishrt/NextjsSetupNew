"use client";
import React, { useState } from "react";

import MainLoader from "@/components/Loaders/MainLoader";
import { cidrToRange } from "@/@core/cidrToRange";
import { API_ROUTES } from "@/@core/apiRoutes";

const AccordionComponent = ({
  inc,
  mappingId,
  IsPremiumPlan,
  isLoggedIn,
  itemIndex,
}: {
  inc: any;
  mappingId: any;
  IsPremiumPlan: boolean;
  isLoggedIn: boolean;
  itemIndex: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ipData, setIpData] = useState<any>({}); // Store data specific to each IP
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track open accordion index
  // Handle accordion toggle

  const handleToggle = async (index: number, value: string) => {
    setIsLoading(true);
    if (openIndex === index) {
      // Close if already open
      setIpData((prev: any) => ({ ...prev, [value]: null })); // Clear data when closing
      setOpenIndex(null);
      setIsLoading(false);
    } else {
      // Open new index
      setOpenIndex(index);
      // Fetch data for the opened IP
      if (!ipData[value] && isLoggedIn && IsPremiumPlan) {
        await fetchData(value); // Fetch only if data is not already fetched
      }
      setOpenIndex(index);
      setIsLoading(false);
    }
  };

  // Function to fetch data from API
  const fetchData = async (value: string) => {
    try {
      const response = await fetch(`${API_ROUTES.CHECK_PROXY}?ip=${value}`);
      // Simulating API response with mock data
      const output = await response.json(); //JSONdata; // Mock data
      // const output = JSONdata ; // Mock data
      if (output) {
        setIpData((prev: any) => ({ ...prev, [value]: output.data }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <div
          id="sub-collapseOneInner"
          className="accordion-collapse collapse show"
          aria-labelledby="sub-headingOne"
          data-bs-parent="#sub-accordionExample"
        >
          <div className="accordion-body">
            <ul>
              {inc?.map((ps: any, idx3: any) => {
                // const subnetMask =
                //   typeof ps.value != "object"
                //     ? parseInt(ps?.value?.split("/")[1], 10)
                //     : 0;
                const subnetMask =
                  typeof ps.value !== "object" && ps?.value?.includes("/")
                    ? parseInt(ps.value.split("/")[1], 10)
                    : 0;

                return (
                  <div key={idx3} className="accordion-item parsedItems">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button hidden ${subnetMask > 24 ? "buttonBoldcss" : ""}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapselookup_${mappingId}_${idx3}`}
                        aria-expanded={openIndex === idx3}
                        aria-controls={`collapselookup_${mappingId}_${idx3}`}
                        disabled={subnetMask < 24}
                        onClick={() => handleToggle(idx3, ps.value)}
                      >
                        <ul>
                          <li>
                            {ps?.mechanism != "ip4" &&
                            ps?.mechanism != "ip6" ? (
                              ParsedItems(ps, itemIndex + idx3)
                            ) : (
                              <>
                                <i className="fa-solid fa-cloud"></i>
                                {ps?.value}
                                <span>
                                  {cidrToRange(ps?.value, ps?.mechanism)}
                                </span>
                              </>
                            )}
                            {subnetMask > 24 && (
                              <i className="fa-solid fa-angle-down tabCss"></i>
                            )}
                          </li>
                        </ul>
                      </button>
                    </h2>

                    <div
                      id={`collapselookup_${mappingId}_${idx3}`}
                      className={`accordion-collapse collapse ${openIndex === idx3 ? "show" : ""}`}
                      data-bs-parent="#spflookupaccordion"
                    >
                      <div className="accordion-body">
                        {isLoggedIn ? (
                          IsPremiumPlan ? (
                            <>
                              {ipData[ps.value] ? (
                                <table className="table tableOuter">
                                  <tbody>
                                    <tr>
                                      <th scope="row">Network Block:</th>
                                      <td>{ps.value}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Network Address:</th>
                                      <td>
                                        {ipData[ps.value]?.networkAddress}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Netmask:</th>
                                      <td>{ipData[ps.value]?.netmask}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">MinAddress:</th>
                                      <td>{ipData[ps.value]?.minAddress}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">MaxAddress:</th>
                                      <td>{ipData[ps.value]?.maxAddress}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">numPossibleHosts:</th>
                                      <td>
                                        {ipData[ps.value]?.numPossibleHosts}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row">addressSpaceDesc:</th>
                                      <td>
                                        {ipData[ps.value]?.addressSpaceDesc}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Reported address:</th>
                                      <td>
                                        {ipData[ps.value]?.reportedAddress
                                          ?.length > 0 && (
                                          <div className="tableContainer">
                                            <table className="table inner-table">
                                              <tbody>
                                                {ipData[
                                                  ps.value
                                                ]?.reportedAddress.map(
                                                  (item: any, index: any) => (
                                                    <tr key={index}>
                                                      <td>
                                                        <table className="inner-table2">
                                                          <tbody>
                                                            <tr>
                                                              <th scope="row">
                                                                ipAddress:
                                                              </th>
                                                              <td>
                                                                {item.ipAddress}
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <th scope="row">
                                                                numReports:
                                                              </th>
                                                              <td>
                                                                {
                                                                  item.numReports
                                                                }
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <th scope="row">
                                                                mostRecentReport:
                                                              </th>
                                                              <td>
                                                                {
                                                                  item.mostRecentReport
                                                                }
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <th scope="row">
                                                                abuseConfidenceScore:
                                                              </th>
                                                              <td>
                                                                {
                                                                  item.abuseConfidenceScore
                                                                }
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <th scope="row">
                                                                countryCode:
                                                              </th>
                                                              <td>
                                                                {
                                                                  item.countryCode
                                                                }
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  )
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              ) : (
                                <p>Loading data...</p>
                              )}
                            </>
                          ) : (
                            <div>
                              <a
                                href="/dashboard/license"
                                className="btn main-button-dark"
                              >
                                Upgrade to Premium Plan
                              </a>
                            </div>
                          )
                        ) : (
                          <div>
                            <a href="/login" className="btn main-button-dark">
                              Join now
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* {setNumindex(mappingId+1)} */}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default AccordionComponent;

export const ParsedItems = (ps: any, itemIndex: number) => {
  return (
    <>
      {ps?.mechanism == "mx" ? (
        <>
          <div className="accordionMechanism">
            <h6>
              <span className="numbers">{ps.seq_number}</span>
              <span className="color">{ps?.mechanism}</span> : {ps.name}
            </h6>
            <div className="backColor">
              {ps?.value?.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    {item.ip_address?.map((ip: any, index: any) => {
                      {
                        return (
                          <p key={index}>
                            {item.hostname}
                            <i className="fa-solid fa-arrow-right"></i>
                            <span>
                              <i className="fa-solid fa-cloud"></i>
                            </span>
                            {ip}
                          </p>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : ps?.mechanism == "a" ? (
        <div className="accordionMechanism">
          <h6>
            <span className="numbers">{ps.seq_number}</span>
            <span className="color">{ps?.mechanism} </span>:{ps?.name}{" "}
          </h6>
          <div className="a-records">
            {ps.value.map((ip: any, i: number) => {
              return (
                <div key={i}>
                  <p>
                    <span>
                      <i className="fa-solid fa-cloud"></i>
                    </span>
                    {ip}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="accordionMechanism">
          <h6 style={{ marginTop: "0px" }}>
            <span className="numbers">{ps.seq_number}</span>
            <span className="color">{ps?.mechanism}</span> : {ps.value}{" "}
          </h6>
        </div>
      )}
    </>
  );
};

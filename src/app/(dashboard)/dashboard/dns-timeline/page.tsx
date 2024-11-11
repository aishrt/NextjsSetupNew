"use client";
import { postFetcher } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import UpgradePlanComponent from "@/app/pageComponents/Others/UpgradePlanComponent";
import SelectAsync from "@/components/Form/SelectAsync";
import DNSLoader from "@/components/Loaders/DnsLoader";
import MainLoader from "@/components/Loaders/MainLoader";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import { isEmpty } from "@/utils/isEmpty";
import { useStore } from "@/utils/store";
import { FormControl } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const DnsTimeline = () => {
  const { firstDomain, license } = useStore();

  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState(firstDomain);
  const [isLoadingLicense, setIsLoadingLicense] = useState(true);
  const [licenseData, setLicenseData] = useState(null as any);
  const [dnsTimeline, setDnsTimeline] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState("" as any);
  const [isLoading, setIsLoading] = useState(false);

  const [domainShow, setDomainShow] = useState<any>([]);
  const [recordType, setRecordType] = useState("" as any);
  const [isStripeLoading, setIsStripeLoading] = useState<boolean>(false);

  const buttons = [
    { label: "ALL", type: "", className: "btn-info", icon: "fa-server" },
    { label: "SPF", type: "spf", className: "btn-warning", icon: "fa-server" },
    { label: "DKIM", type: "dkim", className: "btn-success", icon: "fa-key" },
    {
      label: "DMARC",
      type: "dmarc",
      className: "btn-primary",
      icon: "fa-shield",
    },
  ];

  useEffect(() => {
    if (firstDomain) {
      setSelectedDomain(firstDomain);
    }
  }, [firstDomain, dnsTimeline]);
  useEffect(() => {
    if (selectedDomain && dnsTimeline) {
      handleSubmit();
    }
  }, [recordType, selectedDomain, dnsTimeline]);

  const handleSubmit = () => {
    setIsLoading(true);
    const currentDomain = selectedDomain ? selectedDomain : firstDomain;

    if (dnsTimeline && currentDomain) {
      postFetcher(API_ROUTES.DNS_RECORD_HISTORY, {
        domain: currentDomain,
        record_type: recordType,
      })
        .then((res: any) => {
          if (!isEmpty(res) && !isEmpty(res?.data)) {
            setData(res?.data);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const highlightChanges = (previousValue: any, updatedValue: any) => {
    const prevArr = previousValue ? previousValue.split("") : [];
    const updatedArr = updatedValue.split("");

    // Check if there is no previous value
    if (prevArr.length === 0 && updatedArr.length > 0) {
      // Display all updated characters in green
      return updatedArr
        .map((char: any) => `<span style="color: green">${char}</span>`)
        .join("");
    }

    // Check if there is no updated value
    if (prevArr.length > 0 && updatedArr.length === 0) {
      // Display all previous characters in red
      return prevArr
        .map((char: any) => `<span style="color: red">${char}</span>`)
        .join("");
    }

    // If both values exist, proceed with the comparison
    const output = [];
    // const regex = /([^\s;]+[,.;]?)|\s+/g; // Match words followed by punctuation or whitespace
    // const regex = /([^\s;,.]+[;,.]?)|\s+/g;
    const regex = /[^;,\s]+/g;
    const words1 = previousValue.match(regex) || [];
    const words2 = updatedValue.match(regex) || [];
    const maxLength = Math.max(words1.length, words2.length);

    for (let i = 0; i < maxLength; i++) {
      const word1 = words1[i] || "";
      const word2 = words2[i] || "";

      if (word1.trim() === word2.trim()) {
        output.push(word1); // Same word
      } else {
        if (word1) {
          output.push(`<span style="color: red">${word1}</span>`); // Old word in red
        }
        if (word2) {
          output.push(`<span style="color: green">${word2}</span>`); // New word in green
        }
      }
    }

    return output.join(";");
  };

  const handleChangeDomain = (event: any) => {
    setSelectedDomain(event?.value || firstDomain);
  };
  useEffect(() => {
    if (license && Object.keys(license).length > 0) {
      setLoadingData(false);
    }
  }, [license]);
  if (loadingData) {
    return <MainLoader />;
  }

  return (
    <>
      <LicenseWarningsCompo
        onSetIsLoading={setIsLoadingLicense}
        onSetLicenseData={(resData: any) => {
          if (resData) {
            setLicenseData(resData.data);
            setDnsTimeline(resData?.data?.dns_timeline);
          }
        }}
      />
      <>
        {!license?.dns_timeline ? (
          <>
            <div className="graphSection">
              <div className="dashboardTopCard">
                <div className="container-fluid">
                  <div className="row">
                    <div className="dns-timeline">
                      <div className="col-xl-12">
                        <h4>
                          DNS events timeline
                          <InformationTooltip
                            name="DNS_event_timeline_hd"
                            position="right"
                          />
                        </h4>
                        <p>
                          Track and monitor changes in your domain records with
                          our DNS Timeline feature for complete control over
                          your email security.
                        </p>
                      </div>
                      <div className="col-xl-12">
                        <div className="card">
                          <div className="card-header">
                            <div className="col-xl-2 d-block">
                              <FormControl fullWidth>
                                <SelectAsync
                                  searchType={`domainListing`}
                                  placeholder="Domain"
                                  required
                                  isDisabled={true}
                                  onChange={handleChangeDomain}
                                  className="left-align-text"
                                  value={
                                    selectedDomain
                                      ? {
                                          value: selectedDomain,
                                          label: selectedDomain,
                                        }
                                      : {
                                          value: firstDomain,
                                          label: firstDomain,
                                        }
                                  }
                                />
                              </FormControl>
                            </div>
                            <div className="offset-xl-4 col-xl-6">
                              <div className="rightFilter d-flex align-items-center justify-content-end">
                                <div
                                  className="btn-group dns"
                                  role="group"
                                  aria-label="Basic mixed styles example"
                                >
                                  {buttons.map((button, index) => (
                                    <button
                                      key={index}
                                      type="button"
                                      className={`btn btn-sm ${button.className}`}
                                      onClick={() => setRecordType(button.type)}
                                    >
                                      <i
                                        className={`fa-solid ${button.icon}`}
                                      ></i>
                                      {button.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <>
                            <div className="card-body">
                              <div className="dns-content">
                                <div className="dns-undefined">
                                  <p>No Data Available for DNS-History</p>
                                </div>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <UpgradePlanComponent initialOpenModal={true} />
          </>
        ) : (
          <div className="graphSection">
            <div className="dashboardTopCard">
              <div className="container-fluid">
                <div className="row">
                  <div className="dns-timeline">
                    <div className="col-xl-12">
                      <h4>
                        DNS events timeline
                        <InformationTooltip
                          name="DNS_event_timeline_hd"
                          position="right"
                        />
                      </h4>
                      <p>
                        Track and monitor changes in your domain records with
                        our DNS Timeline feature for complete control over your
                        email security.
                      </p>
                    </div>
                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-header">
                          <div className="col-xl-2 d-block">
                            <FormControl fullWidth>
                              <SelectAsync
                                searchType={`domainListing`}
                                placeholder="Domain"
                                required
                                onChange={handleChangeDomain}
                                className="left-align-text"
                                value={
                                  selectedDomain
                                    ? {
                                        value: selectedDomain,
                                        label: selectedDomain,
                                      }
                                    : { value: firstDomain, label: firstDomain }
                                }
                              />
                            </FormControl>
                          </div>
                          <div className="offset-xl-4 col-xl-6">
                            <div className="rightFilter d-flex align-items-center justify-content-end">
                              <div
                                className="btn-group dns"
                                role="group"
                                aria-label="Basic mixed styles example"
                              >
                                {buttons.map((button, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    className={`btn btn-sm ${button.className}`}
                                    onClick={() => setRecordType(button.type)}
                                  >
                                    <i
                                      className={`fa-solid ${button.icon}`}
                                    ></i>
                                    {button.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <>
                          {isLoading ? (
                            <DNSLoader />
                          ) : (
                            <div className="card-body">
                              <div className="dns-content">
                                {data?.length > 0 ? (
                                  data?.map((item: any, index: number) => {
                                    return (
                                      <div className="record1" key={index}>
                                        <div className="row">
                                          <div className="col-xl-1">
                                            <div className="timeline">
                                              <i className="fa-solid fa-globe"></i>
                                            </div>
                                          </div>
                                          <div className="col-xl-11">
                                            <span className="time">
                                              <i className="fa-regular fa-clock"></i>
                                              {moment(item?.created_at).format(
                                                "DD MMM, YYYY"
                                              )}
                                              at
                                              {moment(item?.created_at).format(
                                                "hh:mm A"
                                              )}
                                            </span>
                                            <h6>
                                              {item?.record_type.toUpperCase()}
                                            </h6>
                                            {item?.selector
                                              ? ` (selector= ${item.selector})`
                                              : ""}
                                            <p>
                                              Updated a record for &nbsp;
                                              <em>{selectedDomain}</em>
                                            </p>
                                            <span
                                              className="show"
                                              hidden={
                                                !(
                                                  domainShow[index] ==
                                                    undefined ||
                                                  domainShow[index] == false
                                                )
                                              }
                                              onClick={() => {
                                                setDomainShow(
                                                  (prevData: any) => {
                                                    prevData[`${index}`] = true;
                                                    return [...prevData];
                                                  }
                                                );
                                              }}
                                            >
                                              <i className="fa-solid fa-angle-down"></i>
                                              Show Details
                                            </span>
                                            <div
                                              hidden={
                                                domainShow[index] ==
                                                  undefined ||
                                                domainShow[index] == false
                                              }
                                            >
                                              <ul
                                                className="nav nav-tabs"
                                                id="myTab"
                                                role="tablist"
                                              >
                                                <li
                                                  className="nav-item"
                                                  role="presentation"
                                                >
                                                  <button
                                                    className="nav-link active"
                                                    id="home-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target={`#home-tab-panel_${index}`}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls={`home-tab-panel_${index}`}
                                                    aria-selected="true"
                                                    // onClick={() => handleTabClick(index, "home")}
                                                  >
                                                    Values
                                                    <InformationTooltip name="DNS_value" />
                                                  </button>
                                                </li>
                                                <li
                                                  className="nav-item"
                                                  role="presentation"
                                                >
                                                  <button
                                                    className="nav-link"
                                                    id="profile-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target={`#profile-tab-panel_${index}`}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls={`profile-tab-panel_${index}`}
                                                    aria-selected="false"
                                                    // onClick={() => handleTabClick(index, "profile")}
                                                  >
                                                    Previous
                                                    <InformationTooltip name="DNS_previous" />
                                                  </button>
                                                </li>
                                                <li
                                                  className="nav-item"
                                                  role="presentation"
                                                >
                                                  <button
                                                    className="nav-link"
                                                    id="contact-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target={`#contact-tab-panel_${index}`}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls={`contact-tab-panel_${index}`}
                                                    aria-selected="false"
                                                    // onClick={() => handleTabClick(index, "contact")}
                                                  >
                                                    Diffs
                                                    <InformationTooltip name="DNS_diff" />
                                                  </button>
                                                </li>
                                              </ul>
                                              <div
                                                className="tab-content"
                                                id={`myTabContent_${index}`}
                                              >
                                                <div
                                                  className="tab-pane fade show active"
                                                  id={`home-tab-panel_${index}`}
                                                  role="tabpanel"
                                                  aria-labelledby="home-tab"
                                                  tabIndex={0}
                                                >
                                                  <div className="content">
                                                    {item?.updated_record_value
                                                      ? item.updated_record_value
                                                      : "No Record Found"}
                                                    {/* {item?.updated_record_value} */}
                                                  </div>
                                                </div>
                                                <div
                                                  className="tab-pane fade"
                                                  id={`profile-tab-panel_${index}`}
                                                  role="tabpanel"
                                                  aria-labelledby="profile-tab"
                                                  tabIndex={0}
                                                >
                                                  <div className="content">
                                                    {item?.previous_value
                                                      ? item?.previous_value
                                                      : "No Record Found"}
                                                  </div>
                                                </div>
                                                <div
                                                  className="tab-pane fade"
                                                  id={`contact-tab-panel_${index}`}
                                                  role="tabpanel"
                                                  aria-labelledby="contact-tab"
                                                  tabIndex={0}
                                                >
                                                  {item?.previous_value ||
                                                  item?.updated_record_value ? (
                                                    <div
                                                      className="content"
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          highlightChanges(
                                                            item?.previous_value,
                                                            item?.updated_record_value
                                                          ),
                                                      }}
                                                    ></div>
                                                  ) : (
                                                    <div className="content">
                                                      No Record Found
                                                    </div>
                                                  )}
                                                </div>
                                              </div>

                                              <span
                                                className="show"
                                                onClick={() =>
                                                  setDomainShow(
                                                    (prevData: any) => {
                                                      prevData[index] = false;
                                                      return [...prevData];
                                                    }
                                                  )
                                                }
                                              >
                                                <i className="fa-solid fa-angle-up"></i>
                                                Hide Details
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div className="dns-undefined">
                                    <p>No Data Available for DNS-History</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      {/* // )} */}
    </>
  );
};
export default DnsTimeline;

"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { lazy, useEffect, useState } from "react";
import CopyToClipboard from "@/components/ui/CopyToClipboard";
import { Link, Tooltip } from "@mui/material";

import CircularSpinner from "@/components/ui/Loaders/CircularSpinner";
import { isEmpty } from "@/utils/isEmpty";
import { commonFetcherFn } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
const GaugeChartCompo = lazy(() => import("./GaugeChartCompo"));

const BLACKLIST_CHECK_URL = process.env.NEXT_PUBLIC_BACKEND_BLACKLIST_CHECK_URL;
const DKIM_CHECK_URL = process.env.NEXT_PUBLIC_DKIM_CHECK_URL;

type ScannerResultTypes = {
  DMARC: any;
  SPF: any;
  DKIM: any;
  BIMI: any;
  MTA: any;
  TLS: any;
  BLACKLIST?: any;
};
const AllToolsScannerResult = ({
  domain,
  data,
}: {
  domain: string;
  data?: ScannerResultTypes;
}) => {
  const pathname = usePathname();
  const [dmarcData, setDmarcData] = useState<any>({
    isLoading: true,
    data: {},
  });

  const { data: session, status } = useSession();

  const [domainList, setDomainLists] = useState<any>([]);
  const [domainExist, setDomainExist] = useState(false);
  const [domainVerified, setDomainVerified] = useState(false);

  async function fetchDomainData() {
    try {
      const userFromLocalStorage = localStorage.getItem("user");
      const users =
        session?.user ||
        (userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null);
      let headers: any = { "Content-Type": "application/json" };
      if (!isEmpty(users) && !isEmpty(users?.token)) {
        headers["Authorization"] = `Bearer ${users?.token}`;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.DOMAINS_LIST}`,
        {
          method: "GET",
          headers,
          next: {
            revalidate: 0,
          },
        }
      );
      if (res.ok) {
        const resData = await res.json();
        return resData;
      } else {
        console.error("Failed to fetch data:", res.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  useEffect(() => {
    async function getData() {
      const result = await fetchDomainData();
      if (!isEmpty(result?.data)) {
        // const filteredDomains = result.data
        //   .filter((item: any) => item.is_verify === true)
        //   .map((item: any) => item.domain);
        // setDomainLists(filteredDomains);
        setDomainLists(result.data);
      }
    }
    getData();
  }, [session]);

  const checkDomainExists = (input: string) => {
    const exists = domainList.some((item: any) => item.domain === input);
    let verified = false;

    if (exists) {
      const domainItem = domainList.find((item: any) => item.domain === input);

      verified = domainItem?.is_verify || false;
    }

    setDomainExist(exists);
    setDomainVerified(verified);
    return { exists, verified };
  };

  const [spfData, setSpfData] = useState<any>({ isLoading: true, data: {} });
  const [bimiData, setBimiData] = useState<any>({ isLoading: true, data: {} });
  const [mtaData, setMtaData] = useState<any>({ isLoading: true, data: {} });
  const [tlsData, setTlsData] = useState<any>({ isLoading: true, data: {} });
  const [blacklistData, setBlacklistData] = useState<any>({
    isLoading: true,
    data: {},
  });
  const [dkimData, setDkimData] = useState<any>({ isLoading: true, data: [] });

  const [complainPercentage, setComplainPercentage] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [dkimPercentage, setDkimPercentage] = useState(0);

  useEffect(() => {
    setComplainPercentage(0);
    setComplainPercentage(0);
    setTotalPercentage(0);
    setDkimPercentage(0);
    getApiData(`/${API_ROUTES.DMARC_LOOKUP}`, setDmarcData);
    getApiData(`/${API_ROUTES.SPF_LOOKUP}`, setSpfData);
    getApiData(`/${API_ROUTES.BIMI_LOOKUP}`, setBimiData);
    getApiData(`/${API_ROUTES.MTA_STS_LOOKUP}`, setMtaData);
    getApiData(`/${API_ROUTES.TLS_RPT_LOOK}`, setTlsData);
    getApiData(BLACKLIST_CHECK_URL, setBlacklistData);
    getApiData(DKIM_CHECK_URL, setDkimData);
  }, [domain]);

  const getApiData = (url = "", setDataState: any) => {
    if (domain) {
      setDataState((prevState: any) => {
        return {
          ...prevState,
          isLoading: true,
          data: {},
        };
      });
      commonFetcherFn(url, "POST", { domain_name: domain }, true)
        .then((res) => {
          const resData =
            url === `/${API_ROUTES.DMARC_LOOKUP}` ? res.data : res;
          if (!isEmpty(res) && !isEmpty(resData)) {
            setDataState((prevState: any) => {
              return url === DKIM_CHECK_URL
                ? {
                    ...prevState,
                    data: resData,
                  }
                : {
                    ...prevState,
                    ...resData,
                  };
            });
          }
        })
        .catch((e) => {
          setDataState((prevState: any) => {
            return {
              ...prevState,
              data: {},
            };
          });
        })
        .finally(() => {
          setDataState((prevState: any) => {
            return {
              ...prevState,
              isLoading: false,
            };
          });
        });
    } else {
      setDataState((prevState: any) => {
        return {
          ...prevState,
          isLoading: true,
          data: {},
        };
      });
    }
  };

  const getBarColorClass = (title: any) =>
    typeof title == "object"
      ? title?.length > 0 &&
        title?.map((item: any) => {
          return !isEmpty(item) &&
            ["valid", "active", "accept"].includes(item?.toLowerCase())
            ? "success"
            : "danger";
        })
      : !isEmpty(title) &&
        ["valid", "active", "accept"].includes(title?.toLowerCase())
      ? "success"
      : "danger";
  const router = useRouter();

  let expactedTitle: any = [];
  let expectedSubTitle: any = [];

  dkimData?.data?.length > 0 &&
    dkimData?.data?.map((item: any) => {
      expactedTitle.push(item?.data?.validate?.title);
      expectedSubTitle.push(item?.data?.validate?.subtitle);
    });

  const scannerResults = [
    {
      heading: "DMARC",
      title: dmarcData?.data?.validate?.title,
      subtitle: !dmarcData?.isLoading
        ? dmarcData?.data?.validate?.subtitle
        : "Fetching.......",
      barColorClass: getBarColorClass(dmarcData?.data?.validate?.title),
    },
    {
      heading: "SPF",
      title: spfData?.data?.status?.title,
      subtitle: !spfData?.isLoading
        ? spfData?.data?.status?.subtitle || spfData?.error
        : "Fetching.......",
      barColorClass: getBarColorClass(spfData?.data?.status?.title),
    },
    {
      heading: "DKIM",
      title: !dkimData?.isLoading
        ? !isEmpty(dkimData?.data)
          ? dkimData?.data?.data[0]?.data?.validate?.title
          : ""
        : "Fetching.......",
      subtitle: !dkimData?.isLoading
        ? !isEmpty(dkimData?.data) && !isEmpty(dkimData?.data?.data[0])
          ? dkimData?.data?.data[0].data?.validate?.subtitle
          : ""
        : "Fetching.......",
      barColorClass: getBarColorClass(
        dkimData?.data?.data?.length! >= 1
          ? dkimData?.data?.data[0].data?.validate?.title
          : ""
      ),
    },
    {
      heading: "BIMI",
      title: bimiData?.data?.validate?.title,
      subtitle: !bimiData?.isLoading
        ? bimiData?.data?.validate?.subtitle
        : "Fetching.......",
      barColorClass: getBarColorClass(bimiData?.data?.validate?.title),
    },
    {
      heading: "MTA STS Record",
      title: mtaData?.data?.validate?.title,
      subtitle: !mtaData?.isLoading
        ? mtaData?.data?.validate?.subtitle
        : "Fetching.......",
      barColorClass: getBarColorClass(mtaData?.data?.validate?.title),
    },
    {
      heading: "TLS RPT Record",
      title: tlsData?.data?.data?.validate?.title,
      subtitle: !tlsData?.isLoading
        ? tlsData?.data?.data?.validate?.subtitle
        : "Fetching.......",
      barColorClass: getBarColorClass(tlsData?.data?.data?.validate?.title),
    },
    {
      heading: "Blacklist Domain",
      title: !blacklistData?.isLoading
        ? blacklistData?.data?.validate?.title
          ? "Invalid"
          : "Valid"
        : "Loading...",
      subtitle: !blacklistData?.isLoading
        ? blacklistData?.data?.validate?.subtitle
        : "Fetching.......",
      barColorClass: getBarColorClass(blacklistData?.data?.validate?.title),
    },
  ];
  const getCountStep = (title: string) =>
    !isEmpty(title) && title?.toLowerCase() === "valid" ? 1 : 0;

  const getPendingCount = (data: string[]) =>
    !isEmpty(data) ? data?.length : 0;

  const getPendingCountMultipleWarning = (dkimData: any[]) => {
    let totalWarnings = 0;

    {
      dkimData?.length > 0 &&
        dkimData?.forEach((entry) => {
          if (entry?.data && Array.isArray(entry?.data?.warnings)) {
            totalWarnings += entry?.data?.warnings?.length;
          }
        });
    }
    return totalWarnings;
  };

  const [wizardLoader, setwizardLoader] = useState(false);

  const handleLaunch = () => {
    setwizardLoader(true);
    if (status == "authenticated") {
      let domainStatus = checkDomainExists(domain);

      if (domainStatus?.exists == true) {
        if (domainStatus?.verified == true) {
          // alert("Exists bhi h or verified bhi h ");
          router.push(
            `/dashboard/sender-dashboard?page=1&page_size=10&policy_published_domain=${domain}&detail_type=sources`
          );
          setwizardLoader(false);
        } else {
          // alert("Exists bhi h or verified nahi h ");

          router.push("/dashboard/domain");
          setwizardLoader(false);
        }
      } else {
        // alert("kuch bhi nahi ahi  ");

        router.push(`/dashboard/add-domain?domain=${domain}`);
        setwizardLoader(false);
      }
    } else {
      router.push("/login");
      setwizardLoader(false);
    }
  };

  const getPendingCountMultipleErrors = (dkimData: any[]) => {
    let totalWarnings = 0;
    {
      dkimData?.length > 0 &&
        dkimData?.forEach((entry) => {
          if (entry?.data && Array.isArray(entry?.data?.warnings)) {
            totalWarnings += entry?.data?.warnings?.length;
          }
        });
    }
    return totalWarnings;
  };

  const issuesCount =
    getPendingCount(dmarcData?.data?.errors) +
    getPendingCount(spfData?.data?.errors) +
    getPendingCountMultipleErrors(dkimData?.data?.data) +
    getPendingCount(bimiData?.data?.errors) +
    getPendingCount(mtaData?.data?.errors) +
    getPendingCount(tlsData?.data?.data?.errors) +
    getPendingCount(blacklistData?.error);
  const warningsCount =
    getPendingCount(dmarcData?.data?.warnings) +
    getPendingCount(spfData?.data?.warnings) +
    getPendingCountMultipleWarning(dkimData?.data?.data) +
    getPendingCount(bimiData?.data?.warnings) +
    getPendingCount(mtaData?.data?.warnings) +
    getPendingCount(tlsData?.data?.data?.warnings) +
    getPendingCount(blacklistData?.warnings);

  useEffect(() => {
    let resultScore = 0;
    resultScore =
      getCountStep(dmarcData?.data?.validate?.title) +
      getCountStep(spfData?.data?.status?.title) +
      getCountStep(bimiData?.data?.validate?.title) +
      getCountStep(mtaData?.data?.validate?.title) +
      getCountStep(tlsData?.data?.data?.validate?.title) +
      getCountStep(blacklistData?.data?.validate?.title);

    const val = parseFloat(String((resultScore / scannerResults.length) * 100));

    if (val != complainPercentage) {
      setTotalPercentage(val);
    }
  }, [
    dmarcData?.isLoading,
    spfData?.isLoading,
    dkimData?.isLoading,
    bimiData?.isLoading,
    mtaData?.isLoading,
    tlsData?.isLoading,
    blacklistData?.isLoading,
  ]);

  const calculateDKIMValidationPercentage = (dkim: any) => {
    if (!dkim || !dkim.data || !Array.isArray(dkim.data)) {
      return { total: 0, validCount: 0, percentage: 0 };
    }

    const total = dkim?.data?.length;
    const validCount = dkim?.data?.filter(
      (item: any) => item?.data?.validate?.title === "Valid"
    ).length;
    const percentage = total > 0 ? (validCount / total) * 100 : 0;
    const calculatedPercentage = (percentage / 100) * 14.29;
    return {
      total,
      validCount,
      percentage: calculatedPercentage,
    };
  };

  useEffect(() => {
    const result = calculateDKIMValidationPercentage(dkimData?.data);
    setDkimPercentage((prevState) => {
      return prevState + (result?.percentage || 0);
    });
  }, [dkimData?.data]);

  useEffect(() => {
    if (complainPercentage > 100 || dkimPercentage + totalPercentage > 100) {
      setComplainPercentage(100);
    } else {
      setComplainPercentage(dkimPercentage + totalPercentage);
    }
  }, [dkimPercentage, totalPercentage]);

  const riskAssessmentTitle =
    complainPercentage < 30
      ? "LOW"
      : complainPercentage > 30 && complainPercentage <= 70
      ? "MEDIUM"
      : "HIGH";
  const riskAssessmentColorClass =
    complainPercentage < 30
      ? "dangerColor"
      : complainPercentage > 30 && complainPercentage <= 70
      ? "warningColor"
      : "successColor";
  // const riskAssessmentSubtitle =
  //   complainPercentage < 30
  //     ? "Domains with a low security risk level have minimal or no significant authentication issues, ensuring robust protection against email-based threats, but periodic monitoring is advisable to stay ahead of emerging risks."
  //     : complainPercentage > 30 && complainPercentage <= 70
  //     ? "A medium security risk level signals notable SPF, DKIM, and DMARC issues, posing a potential risk of email spoofing; prompt resolution is recommended to strengthen overall security."
  //     : "A domain with a high security risk level indicates critical vulnerabilities in SPF, DKIM, and DMARC, posing a severe threat of email impersonation and phishing attacks, necessitating urgent protocol enhancements.";

  const riskAssessmentSubtitle =
    complainPercentage < 30
      ? "A domain with a low security level indicates that it has significant vulnerabilities in SPF, DKIM, and DMARC. This means that it is highly susceptible to email impersonation and phishing attacks."
      : complainPercentage > 30 && complainPercentage <= 70
      ? "A domain with a medium security level has some vulnerabilities in SPF, DKIM, or DMARC. While it is not as vulnerable as a low-security domain, it still faces a moderate risk of email impersonation and phishing attacks."
      : "A domain with a high security level has strong SPF, DKIM, and DMARC configurations. This significantly reduces the risk of email impersonation and phishing attacks.";

  const BLACKLIST_TRUE = "You are blacklisted";
  const BLACKLIST_FALSE = "You are not blacklisted";

  const getValidClass = (obj: any) => {
    let colorClass = "danger";
    let iconClass = "fa-close";
    function getColorClass(
      errors: any,
      warnings: any,
      recordValue: any,
      title: string
    ) {
      return !isEmpty(errors)
        ? "danger"
        : !isEmpty(warnings)
        ? "warning"
        : (!isEmpty(recordValue) &&
            title?.toLowerCase() !== "blacklist domain") ||
          (!isEmpty(recordValue) &&
            title?.toLowerCase() === "blacklist domain" &&
            recordValue === BLACKLIST_FALSE)
        ? "success"
        : "danger";
    }
    function getIconClass(
      errors: any,
      warnings: any,
      recordValue: any,
      title: string
    ) {
      return !isEmpty(errors)
        ? "fa-close"
        : !isEmpty(warnings)
        ? "fa-triangle-exclamation"
        : (!isEmpty(recordValue) &&
            title?.toLowerCase() !== "blacklist domain") ||
          (!isEmpty(recordValue) &&
            title?.toLowerCase() === "blacklist domain" &&
            recordValue === BLACKLIST_FALSE)
        ? "fa-check"
        : "fa-close";
    }
    if (typeof obj?.recordValue == "object") {
      obj.recordValue?.map((item: any, index: number) => {
        colorClass = getColorClass(
          obj.errors[index],
          obj.warnings[index],
          item,
          obj?.title[index]
        );
        iconClass = getIconClass(
          obj.errors[index],
          obj.warnings[index],
          item,
          obj?.title[index]
        );
      });
    } else if (!isEmpty(obj)) {
      colorClass = getColorClass(
        obj?.errors,
        obj?.warnings,
        obj?.recordValue,
        obj?.title
      );
      iconClass = getIconClass(
        obj?.errors,
        obj?.warnings,
        obj?.recordValue,
        obj?.title
      );
    }
    return {
      colorClass,
      iconClass,
    };
  };

  const record_value: any = [];
  const warning: any = [];
  const errors: any = [];

  let colorCheck: any = "";
  dkimData?.data?.data?.length > 0 &&
    dkimData?.data?.data?.map((item: any) => {
      record_value?.push({
        record_value: item?.data?.record_value,
        selector: item?.data?.selector,
      });
      warning?.push(item?.data?.warning);
      errors?.push(item?.data?.errors);
      if (item?.data?.record_value?.length > 0) {
        return (colorCheck = "");
      } else {
        return (colorCheck = "red");
      }
    });

  const detailedResults = [
    {
      title: "DMARC",
      subtitle:
        "A DMARC Checker is a tool that validates if a domain's DMARC record is correctly set up, helping to prevent email spoofing and improve email deliverability.",
      recordValue: dmarcData?.data?.record_value || "",
      warnings: dmarcData?.data?.warnings,
      errors: dmarcData?.data?.errors,
      colorClass: isEmpty(dmarcData?.data?.record_value) ? "red" : "",
      link: "/tools/dmarc-generator",
    },
    {
      title: "SPF",
      subtitle:
        " A SPF Checker is a tool that verifies whether the Sender Policy Framework (SPF) record of a domain is valid and properly configured, aiding in the prevention of email spoofing.",
      recordValue: spfData?.data?.record,
      warnings: spfData?.data?.warnings,
      errors: spfData?.data?.errors,
      colorClass: isEmpty(spfData?.data?.record) ? "red" : "",
      link: "/tools/spf-generator",
    },
    {
      title: "DKIM",
      subtitle:
        "A DKIM Checker is a tool that validates the DomainKeys Identified Mail (DKIM) record of a domain, ensuring it is correctly set up to authenticate and secure email communication.",
      recordValue: record_value,
      warnings: warning,
      errors: errors,
      colorClass: colorCheck,
      link: "/tools/dkim-generator",
    },
    {
      title: "BIMI",
      subtitle:
        "A BIMI Checker is a tool that verifies the Brand Indicators for Message Identification (BIMI) record of a domain, ensuring it's correctly configured to display brand logos in email clients.",
      recordValue: bimiData?.data?.record_value,
      warnings: bimiData?.data?.warnings,
      errors: bimiData?.data?.errors,
      colorClass: isEmpty(bimiData?.data?.record_value) ? "red" : "",
      link: "/tools/bimi-generator",
    },
    {
      title: "MTA STS Record",
      subtitle:
        "An MTA-STS Record Checker is a tool that validates the Mail Transfer Agent Strict Transport Security (MTA-STS) record of a domain, ensuring it's correctly set up for secure email communication.",
      recordValue: mtaData?.data?.record_value,
      warnings: mtaData?.data?.warnings,
      errors: mtaData?.data?.errors,
      colorClass: isEmpty(mtaData?.data?.record_value) ? "red" : "",
      link: "/tools/mta-sts-generator",
    },
    {
      title: "TLS RPT Record",
      subtitle:
        "A TLS RPT Record Checker is a tool that verifies the TLS Reporting (TLS RPT) record of a domain, ensuring it's correctly configured to receive reports about TLS failures in email delivery.",
      recordValue: tlsData?.data?.data?.record_value,
      warnings: tlsData?.data?.data?.warnings,
      errors: tlsData?.data?.data?.errors,
      colorClass: isEmpty(tlsData?.data?.data?.record_value) ? "red" : "",
      link: "/tools/tls-rpt-generator",
    },
    {
      title: "Blacklist Domain",
      subtitle:
        "A Blacklist Domain Checker is a tool that checks if a domain is listed on any email blacklists, which could negatively impact email deliverability.",
      recordValue: blacklistData?.data?.blacklist_status
        ? BLACKLIST_TRUE
        : BLACKLIST_FALSE,
      warnings: blacklistData?.warnings ? blacklistData?.warnings : "",
      errors: blacklistData?.error,
      colorClass: blacklistData?.data?.blacklist_status ? "red" : "",
      link: "/tools/blacklist-domain-lookup",
    },
  ];
  return (
    <>
      {!isEmpty(domain) &&
        (!dmarcData?.isLoading ||
          !spfData?.isLoading ||
          !dkimData?.isLoading ||
          !bimiData?.isLoading ||
          !mtaData?.isLoading ||
          !tlsData?.isLoading ||
          !blacklistData?.isLoading) && (
          <>
            <div className="container">
              <div className="generatorSection__Result mt-4">
                <h3 className="justify-content-center mb-5 mt-0 heading-main">
                  Scanner results for
                  <span className="blue">&nbsp;{domain}&nbsp;</span>domain
                </h3>
                {/* <PDFDownloadLink
                  document={
                    <PdfDownload
                      scannerResult={scannerResults}
                      detailed={detailedResults}
                    />
                  }
                  fileName="my_document.pdf"
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#fff",
                    backgroundColor: "#007bff",
                    borderRadius: "4px",
                  }}
                >
                  Download PDF
                </PDFDownloadLink> */}
                <div className="row">
                  <div className="col-xl-5 col-lg-5 col-md-12 expand">
                    <div className="complaintCard">
                      <h6 className="text-center fw-bolder">
                        Overall Result Score
                      </h6>
                      <div className="row">
                        <div className="col-12 expand__half">
                          <GaugeChartCompo percentage={complainPercentage} />
                        </div>
                        <div className="col-12 expand__half assessment">
                          <h4
                            className={`text-center ${riskAssessmentColorClass}`}
                          >
                            {riskAssessmentTitle}
                          </h4>
                          <p
                            className="text-center mb-0"
                            style={{ lineHeight: "20px" }}
                          >
                            {riskAssessmentSubtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <div className="resultIssue warning">
                          <div className="LeftSection">
                            <span className="iconSection">
                              <img
                                src="/assets/images/warningIconWhite.svg"
                                alt="warning"
                                loading="lazy"
                              />
                            </span>
                            <p>
                              {warningsCount > 1 ? "Warnings" : "Warning"}
                              &nbsp;detected
                            </p>
                          </div>

                          <div className="rightSection">
                            <span>{warningsCount}</span>
                          </div>
                        </div>

                        <div className="resultIssue issue">
                          <div className="LeftSection">
                            <span className="iconSection">
                              <img
                                src="/assets/images/issueIconWhite.svg"
                                alt="issyes"
                                loading="lazy"
                              />
                            </span>
                            <p>
                              {issuesCount > 1 ? "Issues" : "Issue"} detected
                            </p>
                          </div>

                          <div className="rightSection">
                            <span>{issuesCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {status === "authenticated" ? (
                      ""
                    ) : (
                      <div className="button__center text-center">
                        <button
                          className="blueButton"
                          type="button"
                          onClick={() => router.push("/login")}
                        >
                          View Detailed Report
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-12 expand scannerResult">
                    <div className="row">
                      {scannerResults?.map((val, idx: number) => {
                        if (typeof val?.title == "object") {
                          return val?.subtitle?.map(
                            (items: any, index: number) => {
                              return (
                                <div
                                  className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-2"
                                  key={`scanner_results_${index}`}
                                >
                                  <div className="card">
                                    <div className="progressCard resultCard">
                                      <h4>{val?.heading}</h4>
                                      <div className="progress">
                                        <div
                                          className={`progress-bar ${getBarColorClass(
                                            val?.title[index]
                                          )}`}
                                          style={{ width: `100%` }}
                                        ></div>
                                      </div>
                                      <p className="card-text mb-3">{items}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          );
                        }
                        return (
                          <div
                            className="col-xl-6 col-lg-6 col-md-6 col-sm-12  mb-2  scannerResult"
                            key={`scanner_results_${idx}`}
                          >
                            <div className="card">
                              <div className="progressCard">
                                <h4>{val?.heading}</h4>
                                <div className="progress">
                                  <div
                                    className={`progress-bar ${val?.barColorClass}`}
                                    style={{ width: `100%` }}
                                  ></div>
                                </div>
                                <p
                                  className="card-text"
                                  style={{
                                    height: "auto",
                                    minHeight: "170px",
                                    // overflow: "scroll",
                                  }}
                                >
                                  {val?.subtitle}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!tlsData?.isLoading && pathname == "/domain-scanner" && (
              <div className="generatorSection__Result mt-4">
                <div className="text-center complaintCard">
                  <p
                    style={{
                      color: "var(--grey)",
                      marginBottom: "25px",
                      fontSize: "18px",
                    }}
                  >
                    Click here to access full details and settings for your
                    domain
                  </p>
                  <button
                    className="btn main-button-dark ms-3 launchBtn"
                    onClick={() => {
                      setwizardLoader(true), handleLaunch();
                    }}
                  >
                    {wizardLoader ? (
                      <CircularSpinner />
                    ) : (
                      <>
                        Launch Setup Wizard
                        <img src="/assets/images/right-arrowNew.svg" />
                      </>
                    )}
                  </button>
                </div>

                <h3 className="justify-content-center mb-5 heading-main">
                  Detailed results for
                  <span className="blue">&nbsp;{domain}&nbsp;</span>domain
                </h3>
                <div className="jobBreakdown-card wow fadeIn">
                  <div className="card-out">
                    <div className="row">
                      {detailedResults?.map((val: any, idx: number) => {
                        if (
                          val &&
                          typeof val.recordValue === "object" &&
                          val.recordValue !== null &&
                          val.title === "DKIM"
                        ) {
                          return (
                            val?.recordValue?.length > 0 &&
                            val?.recordValue?.map(
                              (item: any, index: number) => {
                                return (
                                  <div
                                    className="col-xl-6 col-lg-6 col-md-12 expand"
                                    key={`job_card_${idx}`}
                                  >
                                    <div className="card bg-light h-100 detailResultCard wow flipInX">
                                      <div className="card-body progressCard">
                                        <div className="d-flex align-items-start">
                                          <div
                                            className={`roundImage me-4 ${
                                              getValidClass(val).colorClass
                                            }`}
                                          >
                                            <i
                                              className={`fa-solid ${
                                                getValidClass(val).iconClass
                                              }`}
                                            ></i>
                                          </div>
                                          <div>
                                            <h4>{val?.title}</h4>
                                            <p className="card-text">
                                              {val?.subtitle}
                                            </p>
                                          </div>
                                        </div>
                                        <p className="mb-1">Selector :</p>
                                        <div className="recordValueBox">
                                          <p
                                            className={`m-0 ${val?.colorClass}`}
                                          >
                                            {!isEmpty(item?.selector)
                                              ? item?.selector
                                              : "Selector not found!"}
                                          </p>

                                          {isEmpty(item.selector) ? (
                                            <div className="generateCodeBtn pt-4 text-start">
                                              <Link
                                                style={{ color: "#fff" }}
                                                href={`${val?.link}?domain=${domain}`}
                                              >
                                                <Tooltip
                                                  title="Generate Record"
                                                  placement="top"
                                                >
                                                  <img src="/assets/images/record.svg" />
                                                </Tooltip>
                                              </Link>
                                            </div>
                                          ) : (
                                            <CopyToClipboard
                                              disabledButton={isEmpty(
                                                item.selector
                                              )}
                                              entryText={item.selector}
                                            />
                                          )}
                                        </div>
                                        <p className="mb-1">Record Value:</p>
                                        <div className="recordValueBox">
                                          <p
                                            className={`m-0 ${val?.colorClass}`}
                                          >
                                            {!isEmpty(item?.record_value)
                                              ? item.record_value
                                              : "Record value not found!"}
                                          </p>

                                          {isEmpty(item?.record_value) ? (
                                            <div className="generateCodeBtn pt-4 text-start">
                                              <Link
                                                style={{ color: "#fff" }}
                                                href={`${val?.link}?domain=${domain}`}
                                              >
                                                <>
                                                  <Tooltip
                                                    title="Generate Record"
                                                    placement="top"
                                                  >
                                                    <img src="assets/images/record.svg" />
                                                  </Tooltip>
                                                </>
                                              </Link>
                                            </div>
                                          ) : (
                                            <CopyToClipboard
                                              disabledButton={isEmpty(
                                                item.record_value
                                              )}
                                              entryText={item.record_value}
                                            />
                                          )}
                                        </div>

                                        {(val?.warnings?.length > 0 &&
                                          val?.warnings[0] !== undefined) ||
                                          (val?.errors?.length > 0 &&
                                            val?.errors[0]?.length > 0 && (
                                              <>
                                                <p className="mb-2 bold">
                                                  <b>{val?.title} Lookup</b>
                                                </p>
                                                {!isEmpty(val?.warnings) && (
                                                  <div className="warningBox">
                                                    <p>
                                                      {val?.warnings?.length}
                                                      warning fix
                                                    </p>
                                                    <ul className="ps-4">
                                                      {val?.warnings?.map(
                                                        (
                                                          warning: string,
                                                          idx: number
                                                        ) => {
                                                          return (
                                                            <li
                                                              key={`warning_list_${idx}`}
                                                            >
                                                              {warning}
                                                            </li>
                                                          );
                                                        }
                                                      )}
                                                    </ul>
                                                  </div>
                                                )}
                                                {!isEmpty(val?.errors) && (
                                                  <div className="errorBox">
                                                    <p>
                                                      {val?.errors.length}
                                                      issue fix
                                                    </p>
                                                    <ul className="ps-4">
                                                      {val?.errors?.map(
                                                        (
                                                          error: string,
                                                          idx: number
                                                        ) => {
                                                          return (
                                                            <li
                                                              key={`error_list_${idx}`}
                                                            >
                                                              {error}
                                                            </li>
                                                          );
                                                        }
                                                      )}
                                                    </ul>
                                                  </div>
                                                )}
                                              </>
                                            ))}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          );
                        }
                        return (
                          <div
                            className="col-xl-6 col-lg-6 col-md-12 expand"
                            key={`job_card_${idx}`}
                          >
                            <div className="card bg-light h-100 detailResultCard wow flipInX">
                              <div className="card-body progressCard">
                                <div className="d-flex align-items-start">
                                  <div
                                    className={`roundImage me-4 ${
                                      getValidClass(val).colorClass
                                    }`}
                                  >
                                    <i
                                      className={`fa-solid ${
                                        getValidClass(val).iconClass
                                      }`}
                                    ></i>
                                  </div>
                                  <div>
                                    <h4>{val?.title}</h4>
                                    <p className="card-text">{val?.subtitle}</p>
                                  </div>
                                </div>
                                <p className="mb-1">Record Value:</p>

                                {Array.isArray(val?.recordValue) ? (
                                  <>
                                    {!isEmpty(val?.recordValue) ? (
                                      <>
                                        {val?.recordValue?.map(
                                          (item: any, index: any) => (
                                            <>
                                              <div className="recordValueBox">
                                                <p
                                                  key={index}
                                                  className={`m-0 ${val?.colorClass}`}
                                                >
                                                  {item}
                                                </p>
                                                <CopyToClipboard
                                                  disabledButton={isEmpty(item)}
                                                  entryText={item}
                                                />
                                              </div>
                                            </>
                                          )
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        Record value not found!
                                        {isEmpty(val?.recordValue) ? (
                                          <>
                                            {(isEmpty(val?.recordValue) ||
                                              (val?.title?.toLowerCase() ==
                                                "blacklist domain" &&
                                                val?.recordValue ==
                                                  BLACKLIST_TRUE)) && (
                                              <div className="generateCodeBtn main-button-dark">
                                                <Link
                                                  style={{ color: "#fff" }}
                                                  href={`${val?.link}?domain=${domain}`}
                                                >
                                                  {val?.title?.toLowerCase() ==
                                                    "blacklist domain" &&
                                                  val?.recordValue ==
                                                    BLACKLIST_TRUE ? (
                                                    "Check Details"
                                                  ) : (
                                                    <>
                                                      <Tooltip
                                                        title="Generate Record"
                                                        placement="top"
                                                      >
                                                        <img src="assets/images/record.svg" />
                                                      </Tooltip>
                                                    </>
                                                  )}
                                                </Link>
                                              </div>
                                            )}
                                          </>
                                        ) : (
                                          <CopyToClipboard
                                            disabledButton={isEmpty(
                                              val?.recordValue
                                            )}
                                            entryText={val?.recordValue}
                                          />
                                        )}
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <div className="recordValueBox">
                                      <p className={`m-0 ${val?.colorClass}`}>
                                        {!isEmpty(val?.recordValue)
                                          ? val?.recordValue
                                          : "Record value not found!"}
                                      </p>
                                      {val?.title.toLowerCase() !==
                                      "blacklist domain" ? (
                                        <>
                                          {isEmpty(val?.recordValue) ? (
                                            <>
                                              {(isEmpty(val?.recordValue) ||
                                                (val?.title?.toLowerCase() ==
                                                  "blacklist domain" &&
                                                  val?.recordValue ==
                                                    BLACKLIST_TRUE)) && (
                                                <div className="generateCodeBtn ">
                                                  <Link
                                                    style={{ color: "#fff" }}
                                                    href={`${val?.link}?domain=${domain}`}
                                                  >
                                                    {val?.title?.toLowerCase() ==
                                                      "blacklist domain" &&
                                                    val?.recordValue ==
                                                      BLACKLIST_TRUE ? (
                                                      <>
                                                        <Tooltip
                                                          title="Check Details"
                                                          placement="top"
                                                        >
                                                          <img src="assets/images/record.svg" />
                                                        </Tooltip>
                                                      </>
                                                    ) : (
                                                      <>
                                                        <Tooltip
                                                          title="Generate Record"
                                                          placement="top"
                                                        >
                                                          <img src="assets/images/record.svg" />
                                                        </Tooltip>
                                                      </>
                                                    )}
                                                  </Link>
                                                </div>
                                              )}
                                            </>
                                          ) : (
                                            <CopyToClipboard
                                              disabledButton={isEmpty(
                                                val?.recordValue
                                              )}
                                              entryText={val?.recordValue}
                                            />
                                          )}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </>
                                )}

                                {(!isEmpty(val?.warnings) ||
                                  !isEmpty(val?.errors)) && (
                                  <>
                                    <p className="mb-2 bold">
                                      <b>{val?.title} Lookup</b>
                                    </p>
                                    {!isEmpty(val?.warnings) && (
                                      <div className="warningBox">
                                        <p>
                                          {val?.warnings?.length} warning fix
                                        </p>
                                        <ul className="ps-4">
                                          {val?.warnings?.map(
                                            (warning: string, idx: number) => {
                                              return (
                                                <li key={`warning_list_${idx}`}>
                                                  {warning}
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                    {!isEmpty(val?.errors) && (
                                      <div className="errorBox">
                                        <p>{val?.errors?.length} issue fix</p>
                                        <ul className="ps-4">
                                          {Array.isArray(val?.errors) ? (
                                            <>
                                              {val?.errors?.map(
                                                (
                                                  error: string,
                                                  idx: number
                                                ) => {
                                                  return (
                                                    <li
                                                      key={`error_list_${idx}`}
                                                    >
                                                      {error}
                                                    </li>
                                                  );
                                                }
                                              )}
                                            </>
                                          ) : (
                                            <p> {val?.errors}</p>
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
    </>
  );
};
export default AllToolsScannerResult;

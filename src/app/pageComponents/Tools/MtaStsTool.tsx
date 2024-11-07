"use client";
import Link from "next/link";
import {
  cleanDomain,
  formatToolTypes,
  isDomainValid,
} from "@/utils/string-conversion";
import { isEmpty } from "@/utils/isEmpty";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useCallback,
} from "react";
import { _TOOL_TYPES } from "@/constants/toolsData";
import { useRouter } from "next/navigation";
import RecordWarningCompo from "@/app/pageComponents/Tools/ui/RecordWarningCompo";
import { debounce } from "lodash";

import { postFetcherLambda } from "@/@core/apiFetcher";
import { scrollIntoView } from "@/utils/scrollIntoView";
import SubmitButton from "@/components/Form/SubmitButton";
import TagTable from "@/components/UI/TagTable";
import { createAndClickProgressBar } from "@/@core/createAndClickProgressBar";
import RecordValuesCompo from "@/app/pageComponents/Tools/ui/RecordValuesCompo";
import { useSession } from "next-auth/react";
import AllToolsScannerResult from "./ui/AllToolsScannerResult";
import { toast } from "react-toastify";
import getCurrentUser from "@/lib/session";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import ToolsUi from "@/app/pageComponents/Tools/ToolsUi";
import { validateDomainName } from "@/utils/string-conversion";
import Head from "next/head";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import MainLoader from "@/components/Loaders/MainLoader";
import { Skeleton } from "@mui/material";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const MtaStsTool = ({
  result,
  toolsId,
  toolType,
  toolName,
  searchParams,
  lookupData,
}: toolPageProps) => {
  const router = useRouter();
  const domain: string = searchParams?.domain || "";
  const { data: session, status } = useSession();
  if (!isEmpty(lookupData)) {
    scrollIntoView(`${toolName}_resultSection`, 0);
  }

  const [inputDomain, setInputDomain] = useState(cleanDomain(domain));
  useEffect(() => {
    setInputDomain(cleanDomain(domain));
  }, [domain]);

  const handleClick = (event: any) => {
    event.preventDefault();
    const host = generatorData?.data?.host?.split("_")[1] || "";
    const url = `https://${host}/.well-known/mta-sts.txt`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [domainError, setDomainError] = useState(false);
  const [policyTyp, setPolicyTyp] = useState("none" as string);

  const [generatorData, setGeneratorData] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isWindow, setIsWindow] = useState(true);
  const [isLoadingGenerator, setIsLoadingGenerator] = useState(false);
  const [fields, setFields] = useState([{ value: "" }]);
  const [mxHosts, setMxHosts] = useState([]);

  const handlePolicyChange = (event: any) => {
    setPolicyTyp(event.target.value); // Update state on selection
  };
  const onCheckLookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    const formDomain = cleanDomain(formData.get("domain") as string);
    const ValidDomainCheck = isDomainValid(formDomain);
    if (!ValidDomainCheck) {
      setDomainError(true);
      setIsLoading(false);
      return;
    }
    setDomainError(false);
    // setInputDomain(formDomain);

    if (formDomain) {
      if (validateDomainName(formDomain)) {
        const href = `/tools/${formatToolTypes(
          toolsId
        )}-lookup?domain=${formDomain}`;
        const hrefDashboard = `/dashboard/tools/${formatToolTypes(
          toolsId
        )}-lookup?domain=${formDomain}`;

        createAndClickProgressBar();
        {
          status === "authenticated"
            ? router.push(hrefDashboard)
            : router.push(href);
        }
      }
    }

    setIsLoading(false);
  };
  const onGenerateRecord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoadingGenerator(true);
    try {
      const formData = new FormData(event.currentTarget);
      const formDomain = cleanDomain(formData.get("domain_name") as string);

      const ValidDomainCheck = isDomainValid(formDomain);
      if (!ValidDomainCheck) {
        setDomainError(true);
        setIsLoadingGenerator(false);
        setIsLoading(false);
        setInvalidDomainError(true);
        return;
      }

      setDomainError(false);
      setInputDomain(formDomain);
      let postData: any = {
        mx_host: fields.map((v) => v.value),
      };
      // @ts-ignore
      for (const [key, value] of formData.entries()) {
        if (!isEmpty(value) && key !== "mx_host[]") {
          postData[key] = value;
        }
      }
      const data = await postFetcherLambda(`/${toolsId}/`, postData);
      // @ts-ignore
      // setInputDomain(cleanDomain(formData.get("domain") as string));
      setGeneratorData(data);
      scrollIntoView(`${toolName}_resultSection`, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingGenerator(false);
    }
  };
  const [lookupError, setLookupError] = useState(false);
  const [invalidDomainError, setInvalidDomainError] = useState(false);

  useEffect(() => {
    if (!isEmpty(lookupData)) {
      if (lookupData?.status == false) {
        setLookupError(true);
        toast.error(`${lookupData?.message}`);
      }
    }
    setInvalidDomainError(false);
  }, [lookupData]);
  const debouncedSearch = useCallback(
    debounce((value) => {
      let newName = cleanDomain(value as string);
      setInputDomain(cleanDomain(newName));
    }, 800),
    [domain]
  );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  const handleAddField = () => {
    const newFields = [...fields, { value: "" }];
    setFields(newFields);
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newFields = [...fields];
    newFields[index].value = e.target.value;
    setFields(newFields);
  };

  const handleRemoveField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const policyContentCopy = (policy: any) => {
    let mxStr = "";
    policy?.mx.map((mxx: string) => {
      mxStr = mxStr + `mx: ${mxx}\n`;
    });
    return (
      `Version: ${policy?.version}\n` +
      `mode: ${policy?.mode}\n` +
      `${mxStr}` +
      `max_age: ${policy?.max_age}`
    );
  };

  const tabLink = domain
    ? `/tools/${formatToolTypes(toolsId)}-lookup?domain=${domain}`
    : `/tools/${formatToolTypes(toolsId)}-lookup`;
  const tabLinkDashboard = domain
    ? `/dashboard/tools/${formatToolTypes(toolsId)}-lookup?domain=${domain}`
    : `/dashboard/tools/${formatToolTypes(toolsId)}-lookup`;
  const tabLink1 = status === "authenticated" ? tabLinkDashboard : tabLink;

  const tabLinks = domain
    ? `/tools/${formatToolTypes(toolsId)}-generator?domain=${domain}`
    : `/tools/${formatToolTypes(toolsId)}-generator`;
  const tabLinksDashboard = domain
    ? `/dashboard/tools/${formatToolTypes(toolsId)}-generator?domain=${domain}`
    : `/dashboard/tools/${formatToolTypes(toolsId)}-generator`;
  const tabLink2 = status === "authenticated" ? tabLinksDashboard : tabLinks;

  const [cardData, setcardData] = useState({} as any);
  useEffect(() => {
    if (toolType === _TOOL_TYPES.LOOKUP) {
      setcardData(lookupData);
    } else {
      setcardData(generatorData);
    }
  }, [lookupData, generatorData]);

  useEffect(() => {
    const path = window.location.pathname.includes("/dashboard");
    if (path === true) {
      setIsWindow(false);
    }
  }, []);
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const CardsHtml = () => {
    const getClass = (color: string) =>
      color === "Green" ? "success" : "danger";
    const arr = ["validate", "policy_validate", "policy_mode"];
    return (
      <>
        <div className="row">
          {arr.map((val, idx: number) => {
            return (
              <>
                {cardData?.data?.[val]?.title ? (
                  <div className="col-lg-4 col-md-6 " key={`card_${idx}`}>
                    <div className="progressCard lookupResult resultCardData">
                      <h4>
                        {cardData?.data?.[val]?.name
                          ? cardData?.data?.[val]?.name
                          : "N/A"}
                        <span className="tooltipLight">
                          <InformationTooltip name={val} favIcons="i" />
                        </span>
                      </h4>
                      {/* <div className="progress">
                        <div
                          className={`progress-bar ${getClass(
                            lookupData?.data?.[val]?.color
                          )}`}
                          style={{ width: `100%` }}
                        ></div>
                      </div> */}
                      <p className={`${cardData?.data?.[val]?.color}`}>
                        {" "}
                        {cardData?.data?.[val]?.title
                          ? capitalizeFirstLetter(cardData?.data?.[val]?.title)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
      </>
    );
  };

  const [dataloader, setDataloader] = useState(false);
  const [mxAges, setMxAges] = useState<any>(604800);

  const getDomainData = async () => {
    setDataloader(true);

    const validDomain = cleanDomain(inputDomain);
    const ValidDomainCheck = isDomainValid(validDomain);
    if (validDomain) {
      if (!ValidDomainCheck) {
        setDomainError(true);
        setIsLoading(false);
        setDataloader(false);
        setInvalidDomainError(true);
        return;
      }
    }
    setDomainError(false);

    const url = `/tools/mx-lookup?domain=${validDomain}`;
    const users = await getCurrentUser();
    let headers: any = {
      "Content-Type": "application/json",
    };
    if (!isEmpty(users) && !isEmpty(users.token)) {
      headers["Authorization"] = `Bearer ${users.token}`;
    }
    let resData: any = {};

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
        {
          method: "GET",
          headers,
          next: {
            revalidate: 0, //ff
          },
        }
      );

      if (!res.ok) {
        setDataloader(false);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      resData = await res.json();
      if (resData?.data?.policy?.mx?.length) {
        setMxHosts(resData?.data?.policy?.mx);
        let newFields: { value: string }[] = [];
        resData?.data?.policy?.mx.map((item: any, index: number) => {
          newFields[index] = { value: item };
        });
        setInputDomain(validDomain);
        setFields(newFields);
        setPolicyTyp(
          !isEmpty(resData?.data?.policy?.mode)
            ? resData?.data?.policy?.mode
            : "none"
        );
        setMxAges(resData?.data?.policy?.max_age);
        setGeneratorData({});
        setDataloader(false);
      } else {
        setFields([{ value: "" }]);
        setMxAges(604800);
        setPolicyTyp("none");
        setDataloader(false);
        setInputDomain(validDomain);
      }
    } catch (error) {
      setDataloader(false);
      console.error("Fetch error:", error);
      router.push("/serverErrorFound");
    } finally {
      setDataloader(false);
    }
  };

  useEffect(() => {
    if (mxHosts.length >= 1) {
    }
  }, [mxHosts]);

  useEffect(() => {
    getDomainData();
  }, [domain, inputDomain]);

  const scriptNewData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yourdmarc.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://yourdmarc.com/tools/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "MTA-STS Generator",
        item: "https://yourdmarc.com/tools/mta-sts-generator",
      },
    ],
  };

  const scriptNewData2 = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yourdmarc.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://yourdmarc.com/tools/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "MTA-STS Lookup",
        item: "https://yourdmarc.com/tools/mta-sts-lookup",
      },
    ],
  };
  const [isLoader, setisLoader] = useState(true);
  const handleDownload = () => {
    const mtaStsRecord =
      generatorData?.data?.mta_stst_record || "No record value found";

    const blob = new Blob([mtaStsRecord], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mta_sts_policy.txt";
    link.click();
  };
  return (
    <>
      <LicenseWarningsCompo
        onSetIsLoading={(value: any) => setisLoader(value)}
        onSetLicenseData={(resData: any) => {
          if (resData) {
          }
        }}
      />
      {isLoader ? (
        <MainLoader />
      ) : (
        <>
          <Head>
            <meta name="robots" content="index, follow" />
          </Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData2) }}
          />
          <div className="blueBg">
            <div className="generatorSection">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="generatorSection__Content">
                      <ul>
                        <li
                          className={
                            toolType === _TOOL_TYPES.LOOKUP ? "active" : ""
                          }
                        >
                          <Link href={tabLink1}>
                            {formatToolTypes(toolName).toUpperCase()} Lookups
                          </Link>
                        </li>

                        <li
                          className={
                            toolType === _TOOL_TYPES.GENERATOR ? "active" : ""
                          }
                        >
                          <Link href={tabLink2}>
                            {formatToolTypes(toolName).toUpperCase()}-Record
                            Generator
                          </Link>
                        </li>
                      </ul>

                      <h2>
                        {toolType === _TOOL_TYPES.LOOKUP &&
                          "MTA-STS Record and Policy Checker"}
                        {toolType === _TOOL_TYPES.GENERATOR &&
                          "MTA-STS Record and Policy Generator"}
                      </h2>
                      <p>
                        {toolType === _TOOL_TYPES.LOOKUP &&
                          "Quickly verify and validate your MTA-STS records with our powerful tool. Ensure your email security policies are correctly configured to safeguard your domain's email communications."}
                        {toolType === _TOOL_TYPES.GENERATOR &&
                          "Generate and manage MTA-STS records and policies to ensure secure email connections."}
                      </p>

                      {toolType === _TOOL_TYPES.LOOKUP && (
                        <form onSubmit={onCheckLookup}>
                          <div className="row">
                            <div className="col-lg-8 mx-auto">
                              <div className="form-group checkerGroup">
                                {/* <input
                                  type="text"
                                  name="domain"
                                  className="form-control"
                                  placeholder="Type your domain"
                                  defaultValue={inputDomain}
                                  required
                                /> */}

                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Type your domain"
                                  name="domain"
                                  defaultValue={inputDomain}
                                  onChange={handleSearchChange}
                                  required
                                />
                              </div>
                              {domainError && (
                                <span className="error">
                                  {" "}
                                  Please enter valid domain
                                </span>
                              )}
                            </div>
                            <div className="col-lg-8 mx-auto d-flex justify-content-end">
                              <SubmitButton
                                title={`Check MTA-STS`}
                                isLoading={isLoading}
                              />
                            </div>
                          </div>
                        </form>
                      )}
                      {toolType === _TOOL_TYPES.GENERATOR && (
                        <div className="spfGenerator__Content">
                          <form onSubmit={onGenerateRecord}>
                            <div className="row">
                              <div className="col-xl-6 col-lg-12">
                                <div className="form-group">
                                  <label className="d-flex gap-2">
                                    Domain{" "}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type your domain"
                                    name="domain_name"
                                    required
                                    defaultValue={inputDomain}
                                    onChange={handleSearchChange}
                                  />{" "}
                                  {domainError && (
                                    <span className="error">
                                      {" "}
                                      Please enter valid domain
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-12">
                                <div className="form-group">
                                  <label>
                                    Policy type
                                    {/* <span
                                  className="tooltipOuter"
                                  style={{ marginLeft: "10px" }}
                                >
                                  <Image
                                    src="/assets/images/infoIcon.svg"
                                    alt=""
                                    loading="lazy"
                                  />
                                  <span className="tooltip mtaTooltip">
                                    <p>Select desired MTA-STS policy mode.</p>
                                    <p>
                                      <b>None</b> - disable policy check.
                                    </p>
                                    <p>
                                      <b>Testing</b> - allow both secure and
                                      insecure connections.
                                    </p>
                                    <p>
                                      <b>Enforce</b> - allow only secure
                                      connections
                                    </p>
                                  </span>

                                </span> */}
                                    <InformationTooltip
                                      name="mta_sts_generator_policy_type"
                                      favIcons="i"
                                    />
                                    {/* <Tooltip title="info" placement="right">
                                </Tooltip> */}
                                  </label>
                                  {dataloader ? (
                                    <div className="outer">
                                      <div className="form-check policyCheck">
                                        <Skeleton
                                          animation="wave"
                                          variant="text"
                                          height={60}
                                          width={200}
                                        />
                                      </div>
                                      <div className="form-check policyCheck">
                                        <Skeleton
                                          animation="wave"
                                          variant="text"
                                          height={60}
                                          width={200}
                                        />
                                      </div>{" "}
                                      <div className="form-check policyCheck">
                                        <Skeleton
                                          animation="wave"
                                          variant="text"
                                          height={60}
                                          width={200}
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="outer">
                                      <div className="form-check policyCheck">
                                        <label
                                          className="form-check-label mta"
                                          htmlFor="flexRadioDefault1"
                                        >
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="policy_type"
                                            value="none"
                                            required
                                            checked={policyTyp === "none"}
                                            onChange={handlePolicyChange}
                                            id="flexRadioDefault1"
                                          />
                                          None
                                          <span> (monitoring)</span>
                                        </label>
                                      </div>

                                      <div className="form-check policyCheck">
                                        <label
                                          className="form-check-label mta"
                                          htmlFor="flexRadioDefault2"
                                        >
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="policy_type"
                                            value="testing"
                                            required
                                            checked={policyTyp === "testing"}
                                            onChange={handlePolicyChange}
                                            id="flexRadioDefault2"
                                          />
                                          Testing
                                        </label>
                                      </div>

                                      <div className="form-check policyCheck">
                                        <label
                                          className="form-check-label mta"
                                          htmlFor="flexRadioDefault3"
                                        >
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="policy_type"
                                            value="enforce"
                                            checked={policyTyp === "enforce"}
                                            onChange={handlePolicyChange}
                                            id="flexRadioDefault3"
                                          />
                                          Enforce
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                  {/* <div className="outer">
                                    <div className="form-check policyCheck">
                                      <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault1"
                                      >
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="policy_type"
                                          value="none"
                                          required
                                          defaultChecked={policyTyp === "none"}
                                          id="flexRadioDefault1"
                                        />
                                        None (monitoring)
                                      </label>
                                    </div>

                                    <div className="form-check policyCheck">
                                      <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault2"
                                      >
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="policy_type"
                                          value="testing"
                                          required
                                          defaultChecked={
                                            policyTyp === "testing"
                                          }
                                          id="flexRadioDefault2"
                                        />
                                        Testing
                                      </label>
                                    </div>

                                    <div className="form-check policyCheck">
                                      <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault3"
                                      >
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="policy_type"
                                          value="enforce"
                                          id="flexRadioDefault3"
                                          defaultChecked={
                                            policyTyp === "enforce"
                                          }
                                        />
                                        Enforce
                                      </label>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                              <div className="col-xxl-6 col-xl-12">
                                <div className="form-group maxAge">
                                  <label>MX Hosts </label>
                                  <InformationTooltip
                                    name="mta_sts_generator_mx_hosts"
                                    favIcons="i"
                                  />
                                  {dataloader ? (
                                    <Skeleton
                                      animation="wave"
                                      variant="text"
                                      height={75}
                                      width={650}
                                    />
                                  ) : (
                                    <>
                                      {" "}
                                      {fields.map((field, index) => (
                                        <div
                                          className={`valueOuter ${
                                            index ? "mt-2" : "mt-0"
                                          }`}
                                          key={index}
                                        >
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="mx1.example.com"
                                            name="mx_host[]"
                                            value={field.value}
                                            required
                                            onChange={(e) =>
                                              handleChange(index, e)
                                            }
                                          />
                                          {index ? (
                                            <button
                                              className="button-red-common"
                                              type="button"
                                              onClick={() =>
                                                handleRemoveField(index)
                                              }
                                            >
                                              <i className="fa-solid fa-circle-xmark"></i>
                                            </button>
                                          ) : (
                                            <button
                                              className="button-gray-common"
                                              type="button"
                                              onClick={() => handleAddField()}
                                            >
                                              <i className="fa-solid fa-circle-plus"></i>
                                            </button>
                                          )}
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="col-xxl-6 col-xl-12">
                                <div className="form-group maxAge">
                                  <label>Maximum Age</label>
                                  <InformationTooltip
                                    name="mta_sts_generator_maximum_age"
                                    favIcons="i"
                                  />

                                  {dataloader ? (
                                    <Skeleton
                                      animation="wave"
                                      variant="text"
                                      height={75}
                                      width={650}
                                    />
                                  ) : (
                                    <>
                                      <input
                                        type="number"
                                        className="form-control"
                                        placeholder="604800"
                                        name="max_age"
                                        required
                                        value={mxAges || 604800}
                                        onChange={(e) =>
                                          setMxAges(e.target.value)
                                        }
                                      />
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-12 mx-auto d-flex justify-content-end">
                                <SubmitButton
                                  title={`Generate`}
                                  isLoading={isLoadingGenerator}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!invalidDomainError && (
            <>
              <div className="generatorSection pt-5">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div id={`${toolName}_resultSection`} />
                      {toolType === _TOOL_TYPES.LOOKUP &&
                        !isEmpty(lookupData) && (
                          <div className="generatorSection__Result mt-0">
                            <h3 className="justify-content-center mb-5 mt-0">
                              Lookup and check results for
                              <span className="blue">
                                &nbsp;{domain}&nbsp;
                              </span>{" "}
                              domain
                            </h3>
                            <div className="row mb-4">
                              <CardsHtml />
                            </div>
                            <RecordValuesCompo
                              lookupType={"mta-sts-generator"}
                              hostName={domain}
                              typeVal="TXT"
                              recordValue={[
                                lookupData?.data?.record_value,
                                lookupData?.data?.policy
                                  ? policyContentCopy(lookupData?.data?.policy)
                                  : "",
                                // : "Record value not found!",
                                lookupData?.data?.policy
                                  ? lookupData?.data?.policy.mode
                                  : "",
                                // : "Missing",
                              ]}
                              titleText={[
                                `Record Validation`,
                                `Policy Validation`,
                                `Policy Mode`,
                              ]}
                              // validText={[
                              //   lookupData?.data?.valid_record ? "Valid" : "Invalid",
                              //   lookupData?.data?.valid_policy ? "Valid" : "Invalid",
                              //   lookupData?.data?.valid_policy ? "Valid" : "Invalid",
                              // ]}
                              rvpText={[``, `Policy content:`, ``]}
                            />

                            <RecordWarningCompo
                              warningText={lookupData?.data?.warnings}
                            />
                            <RecordWarningCompo
                              isError
                              warningText={lookupData?.data?.errors}
                            />
                          </div>
                        )}
                      {toolType === _TOOL_TYPES.GENERATOR &&
                        !isEmpty(generatorData) && (
                          <div className="generatorSection__Result">
                            <h3>
                              Generated results for
                              {!!inputDomain && <>&nbsp;{inputDomain}&nbsp;</>}
                              domain
                            </h3>

                            {!generatorData?.data?.errors.length ? (
                              <div className="mtaPoints">
                                <h3 className="mb-5 mt-0">
                                  Publish MTA-STS record to your DNS zone.
                                </h3>

                                <ul>
                                  <li>
                                    Log in to your <span>DNS Zone</span>.
                                  </li>
                                  <li>
                                    Navigate to the{" "}
                                    <span>DNS record section</span>
                                  </li>
                                  <li>
                                    Create a new <span>TXT record</span> with
                                    the provided data.
                                  </li>
                                </ul>

                                <div className="row mb-4">
                                  <CardsHtml />
                                </div>

                                <div className="recordsBox">
                                  <h5 className="fw-bolder">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <h4>MTA-STS Record </h4>

                                      {/* <span className="validSpan">
                                    {generatorData?.data?.valid_policy ==
                                    true ? (
                                      <h5 className="valid-invalid success">
                                        <i className="fa fa-circle-check"></i>{" "}
                                        Valid
                                      </h5>
                                    ) : (
                                      <h5 className={`valid-invalid danger`}>
                                        <i className={`fa fa-times-circle`}></i>
                                        Invalid
                                      </h5>
                                    )}
                                  </span> */}
                                    </div>

                                    <InformationTooltip name="tool_mta_tls_MTA_STS_Record" />
                                  </h5>
                                  <div className="recordValueBox mb-3 pe-3 row">
                                    <div className="row_divider recordSec position-relative row">
                                      <div className="recordSecInner col-lg-4">
                                        <p className="record_value p-2">
                                          <span className="">
                                            <b>Host</b>&nbsp;:&nbsp;
                                          </span>
                                          <span className="">
                                            {generatorData?.data?.host}
                                          </span>
                                        </p>
                                      </div>

                                      <div className="recordSecInner col-lg-4">
                                        <p className="record_value p-2">
                                          <span className="col-2">
                                            <b>Type</b>&nbsp;:&nbsp;
                                          </span>
                                          <span className="col-10">TXT</span>
                                        </p>
                                      </div>

                                      <div className="recordSecInner col-lg-4">
                                        <p className="record_value p-2">
                                          <span className="col-2">
                                            <b>Value</b>&nbsp;:&nbsp;
                                          </span>
                                          <span className="col-10">
                                            {generatorData?.data?.record_value}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <ul>
                                  <li>
                                    Create{" "}
                                    <span>{generatorData?.data?.host}</span>{" "}
                                    subdomain
                                  </li>
                                  <li>
                                    Upload generated
                                    <span>mta-sts.txt policy</span> file to
                                    <span>&ldquo;.well-known&ldquo;</span>{" "}
                                    folder so that it can be accessible
                                    through&nbsp;
                                    <span
                                      onClick={handleClick}
                                      className="linkStyle"
                                    >
                                      {`https://${
                                        generatorData?.data?.host?.split(
                                          "_"
                                        )[1] || ""
                                      }/.well-known/mta-sts.txt`}
                                    </span>
                                    &nbsp;link.
                                  </li>
                                </ul>

                                <div className="recordsBox">
                                  <h5 className="fw-bolder">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <h4>MTA-STS Policy </h4>
                                      {/* <span className="validSpan">
                                    {generatorData?.data?.valid_policy ==
                                    true ? (
                                      <h5 className="valid-invalid success">
                                        <i className="fa fa-circle-check"></i>{" "}
                                        Valid
                                      </h5>
                                    ) : (
                                      <h5 className={`valid-invalid danger`}>
                                        <i className={`fa fa-times-circle`}></i>
                                        Invalid
                                      </h5>
                                    )}
                                  </span> */}
                                    </div>

                                    <InformationTooltip name="tool_mta_tls_MTA_STS_Policy" />
                                  </h5>
                                  <div className="recordValueBox mb-3 pe-3 row">
                                    <div className="row_divider position-relative recordSec row">
                                      <div className="recordSecInner col-lg-4">
                                        <p className="record_value  p-2">
                                          <span className="">
                                            <b>Policy Content</b>
                                          </span>
                                        </p>
                                      </div>
                                      <div className="recordSecInner col-lg-4">
                                        <p className="record_value  p-2">
                                          <div className="">
                                            {generatorData?.data
                                              ?.mta_stst_record
                                              ? generatorData?.data
                                                  ?.mta_stst_record
                                              : "No record value found"}
                                            {/* <span>version: STSv1</span> <br />
                                      <span>mode: testing</span> <br />
                                      <span>mx: alt1.aspmx.l.google.com</span> <br />
                                      <span>mx: alt2.aspmx.l.google.com</span> <br />
                                      <span>mx: alt3.aspmx.l.google.com</span> <br />
                                      <span>mx: alt4.aspmx.l.google.com</span> <br />
                                      <span>mx: aspmx.l.google.com</span> <br />
                                      <span>max_age: 54</span> <br /> */}
                                          </div>
                                        </p>
                                      </div>
                                      <div className="recordSecInner col-lg-4">
                                        <div className="text-end">
                                          <button onClick={handleDownload}>
                                            <Image
                                              alt="Download Icon"
                                              src={_IMG.downloadIcon}
                                              loading="lazy"
                                            />
                                            Download
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {/* <RecordValuesCompo
                      recordValue={[
                        generatorData?.data?.host,
                        generatorData?.data?.record_value,
                        generatorData?.data?.mta_stst_record,
                      ]}
                      titleText={[`MTA-STS Host`, `MTA-STS Record`, `MTA-STS Policy`]}
                      rvpText={[`Host`, ``, `Policy content:`]}
                    /> */}

                            <RecordWarningCompo
                              warningText={generatorData?.data?.warnings}
                            />

                            <RecordWarningCompo
                              isError
                              warningText={generatorData?.data?.errors}
                            />
                          </div>
                        )}
                      {toolType === _TOOL_TYPES.LOOKUP &&
                        !isEmpty(domain) &&
                        isEmpty(lookupData) && (
                          <RecordWarningCompo
                            isError
                            warningText={`No Record Found!`}
                          />
                        )}
                    </div>
                  </div>
                </div>
              </div>
              {toolType === _TOOL_TYPES.LOOKUP && (
                <>
                  <AllToolsScannerResult
                    // data={result}
                    domain={domain}
                  />
                </>
              )}

              {isWindow ? (
                <ToolsUi toolName={`${"mta_sts" + "_" + toolType}`} />
              ) : (
                <></>
              )}
              <TagTable
                result={result}
                domain={domain}
                toolName={toolName}
                toolType={toolType}
                responseData={
                  toolType === _TOOL_TYPES.LOOKUP ? lookupData : generatorData
                }
              />
            </>
          )}
        </>
      )}
    </>
  );
};
export default MtaStsTool;

"use client";
import Link from "next/link";
import {
  cleanDomain,
  formatToolTypes,
  isDomainValid,
  removeHttp,
  validateDomainName,
} from "@/utils/string-conversion";
import { isEmpty } from "@/utils/isEmpty";
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import { _TOOL_TYPES } from "@/constants/toolsData";
import { useRouter } from "next/navigation";
import RecordWarningCompo from "@/app/pageComponents/Tools/ui/RecordWarningCompo";
import { postFetcher, postFetcherLambda } from "@/@core/apiFetcher";
import { scrollIntoView } from "@/utils/scrollIntoView";
import SubmitButton from "@/components/Form/SubmitButton";
import TagTable from "@/components/UI/TagTable";
import { createAndClickProgressBar } from "@/@core/createAndClickProgressBar";
import RecordValuesCompo from "@/app/pageComponents/Tools/ui/RecordValuesCompo";
import { useSession } from "next-auth/react";
import AllToolsScannerResult from "./ui/AllToolsScannerResult";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";import ToolsUi from "@/app/pageComponents/Tools/ToolsUi";
import Head from "next/head";
import RecordBox from "@/components/UI/RecordBox";
import { toast } from "react-toastify";
const TlsRptTool = ({
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

  // if (!isEmpty(lookupData)) {
  //   scrollIntoView(`${toolName}_resultSection`, 0);
  // }
  const [inputDomain, setInputDomain] = useState(cleanDomain(domain));
  const [domainError, setDomainError] = useState(false);
  const [searchState, setSearchState] = useState<boolean>(false);
  const targetSectionRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (searchState && targetSectionRef.current) {
      const offsetTop = targetSectionRef.current.offsetTop;
      const scrollToPosition = offsetTop - 80;
      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      setSearchState(false);
    } else if (lookupData && targetSectionRef.current) {
      const offsetTop = targetSectionRef.current.offsetTop;
      const scrollToPosition = offsetTop - 80;
      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      setSearchState(false);
    }
  }, [searchState, lookupData, targetSectionRef]);

  useEffect(() => {
    setInputDomain(cleanDomain(domain));
  }, [domain]);

  const [generatorData, setGeneratorData] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGenerator, setIsLoadingGenerator] = useState(false);

  const [fields, setFields] = useState([
    { value: "rua@mail.yourdmarc.online" },
  ]);
  const [fields2, setFields2] = useState([{ value: "" }]);
  const [isWindow, setIsWindow] = useState(true);

  useEffect(() => {
    const path = window.location.pathname.includes("/dashboard");
    if (path === true) {
      setIsWindow(false);
    }
  }, []);

  const onCheckLookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const formDomain = cleanDomain(formData.get("domain") as string);

    const ValidDomainCheck = isDomainValid(formDomain);
    if (!ValidDomainCheck) {
      setDomainError(true);
      setIsLoading(false);
      setInvalidDomainError(true);

      return;
    }
    setDomainError(false);
    setInputDomain(formDomain);
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
      const formDomain = cleanDomain(formData.get("domain") as string);
      const ValidDomainCheck = isDomainValid(formDomain);
      if (!ValidDomainCheck) {
        setDomainError(true);
        setIsLoading(false);
        setInvalidDomainError(true);
        return;
      }
      setDomainError(false);
      setInputDomain(formDomain);

      if (formDomain) {
        if (validateDomainName(formDomain)) {
          const href = `/tools/${formatToolTypes(
            toolsId
          )}-generator?domain=${formDomain}`;
          const hrefDashboard = `/dashboard/tools/${formatToolTypes(
            toolsId
          )}-generator?domain=${formDomain}`;
          createAndClickProgressBar();
          {
            status === "authenticated"
              ? router.push(hrefDashboard)
              : router.push(href);
          }
        }
      }

      // let httpsArray: any = fields2.map((v) => v.value);

      // if (httpsArray[0] != "") {
      //   httpsArray = fields2.map((v) => v.value);
      // } else {
      //   httpsArray = null;
      // }

      let postData: any = {
        domain_name: formDomain,
        mailto: fields.map((v) => v.value),
        https: fields2.filter((v) => v.value !== "").map((v) => v.value),
      };

      // @ts-ignore
      for (const [key, value] of formData.entries()) {
        if (!isEmpty(value)) {
          postData[key] = value;
        }
      }
      const data = await postFetcherLambda(`/${toolsId}/`, postData);
      // @ts-ignore
      setInputDomain(formDomain);
      setGeneratorData(data);
      setSearchState(true);
      setInvalidDomainError(false);
      scrollIntoView(`${toolName}_resultSection`, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingGenerator(false);
      setSearchState(true);
    }
  };
  const handleAddField = (firstField: boolean = true) => {
    const newFields = firstField
      ? [...fields, { value: "" }]
      : [...fields2, { value: "" }];
    if (firstField) {
      setFields(newFields);
    } else {
      setFields2(newFields);
    }
  };

  const handleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
    firstField: boolean = true
  ) => {
    const newFields = firstField ? [...fields] : [...fields2];
    newFields[index].value = e.target.value;
    if (firstField) {
      setFields(newFields);
    } else {
      setFields2(newFields);
    }
  };

  const handleRemoveField = (index: number, firstField: boolean = true) => {
    const newFields = firstField ? [...fields] : [...fields2];
    newFields.splice(index, 1);
    if (firstField) {
      setFields(newFields);
    } else {
      setFields2(newFields);
    }
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
  const CardsHtml = () => {
    const getClass = (color: string) =>
      color === "Green" ? "success" : "danger";

    const arr = ["validate", "reporting"];
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
          name: "TLS RPT Generator",
          item: "https://yourdmarc.com/tools/tls-rpt-generator",
        },
      ],
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData) }}
        />
        {arr.map((val, idx: number) => {
          return (
            <div className="col-lg-4 col-md-6" key={`card_${idx}`}>
              <div className="progressCard resultCard">
                <h4>
                  {lookupData?.data?.data
                    ? lookupData?.data?.data?.[val]?.title
                    : lookupData?.[val]?.title}
                </h4>
                <span>
                  {lookupData?.data?.[val]?.name
                    ? lookupData?.data?.[val]?.name
                    : null}
                </span>
                <div className="progress">
                  <div
                    className={`progress-bar 
                      ${getClass(
                        lookupData?.data?.data
                          ? lookupData?.data?.data?.[val]?.color
                          : lookupData?.[val]?.color
                      )}`}
                    style={{ width: `100%` }}
                  ></div>
                </div>
                <p className="overflowScroll">
                  {lookupData?.data?.data
                    ? lookupData?.data?.data?.[val]?.subtitle
                    : lookupData?.[val]?.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  };
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
        name: "TLS RPT Lookup",
        item: "https://yourdmarc.com/tools/tls-rpt-lookup",
      },
    ],
  };

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData) }}
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
                      "TLS-RPT Record Checker"}
                    {toolType === _TOOL_TYPES.GENERATOR &&
                      "TLS-RPT Record Generator"}
                  </h2>
                  <p>
                    {toolType === _TOOL_TYPES.LOOKUP &&
                      "Quickly check and validate your TLS-RPT records to ensure secure email communication."}
                    {toolType === _TOOL_TYPES.GENERATOR &&
                      "The TLS-RPT Record Generator creates DNS records to report TLS encryption issues in email communications."}
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
                            /> */}{" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Type your domain"
                              name="domain"
                              value={inputDomain}
                              onChange={(e) => setInputDomain(e.target.value)}
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
                        <div className="col-lg-8 mx-auto d-flex justify-content-center">
                          <SubmitButton
                            title={`Check TLS-RPT`}
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
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label>Domain</label>
                              {/* <input
                                type="text"
                                className="form-control"
                                placeholder="Type your domain"
                                name="domain"
                                required
                                defaultValue={inputDomain}
                              /> */}

                              <input
                                type="text"
                                className="form-control"
                                placeholder="Type your domain"
                                name="domain"
                                value={inputDomain}
                                onChange={(e) => setInputDomain(e.target.value)}
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
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label>
                                Reports send to (mail to:)
                                <InformationTooltip
                                  name="tls_rpt_report_mail_to"
                                  favIcons="i"
                                />
                              </label>
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
                                    placeholder="email@domain.com"
                                    name="mailto[]"
                                    value={field.value}
                                    required
                                    onChange={(e) =>
                                      handleChange(index, e, true)
                                    }
                                  />
                                  {index ? (
                                    <button
                                      className="button-red-common"
                                      type="button"
                                      onClick={() =>
                                        handleRemoveField(index, true)
                                      }
                                    >
                                      <i className="fa-solid fa-circle-xmark"></i>
                                    </button>
                                  ) : (
                                    <button
                                      className="button-gray-common"
                                      type="button"
                                      onClick={() => handleAddField(true)}
                                    >
                                      <i className="fa-solid fa-circle-plus"></i>
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label>
                                Report send to (https://)
                                <InformationTooltip
                                  name="tls_rpt_report_https_to"
                                  favIcons="i"
                                />
                              </label>
                              {fields2.map((field, index) => (
                                <div
                                  className={`valueOuter ${
                                    index ? "mt-2" : "mt-0"
                                  }`}
                                  key={`field2_${index}`}
                                >
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="email@domain.com"
                                    name="https[]"
                                    value={field.value}
                                    onChange={(e) =>
                                      handleChange(index, e, false)
                                    }
                                  />
                                  {index ? (
                                    <button
                                      className="button-gray"
                                      type="button"
                                      onClick={() =>
                                        handleRemoveField(index, false)
                                      }
                                    >
                                      <i className="fa-solid fa-circle-xmark"></i>
                                    </button>
                                  ) : (
                                    <button
                                      className="button-gray"
                                      type="button"
                                      onClick={() => handleAddField(false)}
                                    >
                                      <i className="fa-solid fa-circle-plus"></i>
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="col-lg-12">
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
          <div
            className="generatorSection pt-5"
            ref={targetSectionRef}
            id={`${toolName}_resultSection`}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div />
                  {toolType === _TOOL_TYPES.LOOKUP &&
                    !lookupError &&
                    !isEmpty(lookupData) && (
                      <div className="generatorSection__Result mt-0">
                        <h3 className="justify-content-center mb-5 mt-0">
                          Lookup and check results for
                          <span className="blue">
                            &nbsp;{domain}&nbsp;
                          </span>{" "}
                          domain
                        </h3>
                        <div className="row">
                          <CardsHtml />
                        </div>
                        <RecordValuesCompo
                          lookupType={"tls-rpt-generator"}
                          hostName={domain}
                          typeVal="TXT"
                          recordValue={lookupData?.data?.record_value}
                          // titleText={`Record Validation`}
                          // validText={
                          //   lookupData?.data?.valid_record ? "Valid" : "Invalid"
                          // }
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
                      <div
                        className="generatorSection__Result mt-0"
                        ref={targetSectionRef}
                      >
                        <h3 className="generator-result mt-0 text-center">
                          Generated results for
                          <span>
                            {!!inputDomain && <>&nbsp;{inputDomain}&nbsp;</>}
                          </span>
                          domain
                        </h3>
                        <h3 className="mb-2 mt-5">
                          Publish TLS-RPT record to your DNS zone.
                        </h3>

                        <ul>
                          <li>
                            Log in to your <span>DNS Zone</span>.
                          </li>
                          <li>
                            Navigate to the <span>DNS record section</span>
                          </li>
                          <li>
                            Create a new <span>TXT record</span> with the
                            provided data.
                          </li>
                        </ul>

                        {/* <RecordValuesCompo
                      recordValue={generatorData?.data?.record_value}
                      titleText={`TLS-RPT Record`}
                    /> */}
                        <RecordBox
                          tootlipName={"tool_mta_tls_MTA_STS_Record"}
                          heading={`${toolName.toUpperCase()} Record`}
                          subHead1={"Host"}
                          subHead2={"Type"}
                          subHead3={"Value"}
                          text1={inputDomain}
                          text2={"TXT"}
                          text3={generatorData?.data?.record_value}
                        />

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
                    !lookupError &&
                    !isEmpty(domain) &&
                    isEmpty(lookupData) && (
                      <div>
                        <RecordWarningCompo
                          isError
                          warningText={`No Record Found!`}
                        />
                      </div>
                    )}
                  {toolType === _TOOL_TYPES.LOOKUP &&
                    !lookupError &&
                    !isEmpty(domain) &&
                    !isEmpty(lookupData) && (
                      <div>
                        <RecordValuesCompo
                          lookupType="tls-rpt-generator"
                          hostName={domain}
                          typeVal="TXT"
                          recordValue={lookupData?.data?.data?.record_value}
                          titleText={`TLS-RPT Record`}
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          {toolType === _TOOL_TYPES.LOOKUP && !lookupError && (
            <AllToolsScannerResult
              // data={result}
              domain={domain}
            />
          )}
          {isWindow ? (
            <ToolsUi toolName={`${"tls_rpt" + "_" + toolType}`} />
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
  );
};
export default TlsRptTool;

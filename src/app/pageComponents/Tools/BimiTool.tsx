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
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { _TOOL_TYPES } from "@/constants/toolsData";
import { useRouter } from "next/navigation";
import { postFetcher, postFetcherLambda } from "@/@core/apiFetcher";
import RecordWarningCompo from "@/app/pageComponents/Tools/ui/RecordWarningCompo";
import { scrollIntoView } from "@/utils/scrollIntoView";
import SubmitButton from "@/app/pageComponents/Tools/ui/SubmitButton";
import { capitalize } from "@mui/material";
import TagTable from "@/components/ui/TagTable";
import { createAndClickProgressBar } from "@/@core/createAndClickProgressBar";
import RecordValuesCompo from "@/app/pageComponents/Tools/ui/RecordValuesCompo";
import { useSession } from "next-auth/react";
import AllToolsScannerResult from "./ui/AllToolsScannerResult";
import getCurrentUser from "@/lib/session";
import { toast } from "react-toastify";
import InformationTooltip from "@/components/InformationTooltip";
import Head from "next/head";
import MainLoader from "@/components/ui/MainLoader";
import LicenseWarningsCompo from "@/components/common/LicenseWarningsCompo";
import ToolsUi from "@/app/pageComponents/Tools/ToolsUi";
import CopyToClipboard from "@/components/ui/CopyToClipboard";
const BimiTool = ({
  result,
  toolsId,
  toolType,
  toolName,
  searchParams,
  lookupData,
}: toolPageProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const domain: string | string[] | undefined =
    removeHttp(searchParams?.domain as string) || "";

  if (!isEmpty(lookupData)) {
    scrollIntoView(`${toolName}_resultSection`, 0);
  }

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

  const [generatorData, setGeneratorData] = useState({} as any);
  const [vmcErrors, setVMCErrors] = useState([] as any);
  const [logoErrorrs, setLogoErrorrs] = useState([] as any);

  const [logoData, setLogoData] = useState({} as any);

  const [isWindow, setIsWindow] = useState(true);

  const [searchState, setSearchState] = useState<boolean>(false);
  const targetSectionRef = useRef<HTMLDivElement>(null);

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
    const path = window.location.pathname.includes("/dashboard");
    if (path === true) {
      setIsWindow(false);
    }
  }, []);

  useEffect(() => {
    if (toolType === _TOOL_TYPES.LOOKUP) {
      setLogoData(lookupData);
    } else {
      setLogoData(generatorData);
    }
  }, [lookupData, generatorData]);

  const [inputDomain, setInputDomain] = useState(cleanDomain(domain));
  const [domainError, setDomainError] = useState(false);

  useEffect(() => {
    setInputDomain(cleanDomain(domain));
  }, [domain]);

  //comment
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGenerator, setIsLoadingGenerator] = useState(false);

  const onCheckLookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const currentDomain = formData.get("domain") as string;
    const formDomain = cleanDomain(currentDomain);
    const ValidDomainCheck = isDomainValid(formDomain);
    if (!ValidDomainCheck) {
      setDomainError(true);
      setIsLoading(false);
      setInvalidDomainError(true);
      return;
    }
    setInvalidDomainError(false);
    setDomainError(false);
    setInputDomain(formDomain);
    if (formDomain) {
      if (validateDomainName(formDomain)) {
        createAndClickProgressBar();
        {
          status === "authenticated"
            ? router.push(
                `/dashboard/tools/${formatToolTypes(
                  toolsId
                )}-lookup?domain=${formDomain}`
              )
            : router.push(
                `/tools/${formatToolTypes(toolsId)}-lookup?domain=${formDomain}`
              );
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
      const currentDomain = formData.get("domain") as string;
      const formDomain = cleanDomain(currentDomain);
      const ValidDomainCheck = isDomainValid(formDomain);
      if (!ValidDomainCheck) {
        setDomainError(true);
        setIsLoading(false);
        setInvalidDomainError(true);
        return;
      }
      setDomainError(false);
      setInputDomain(formDomain);

      let postData: any = {};

      // @ts-ignore
      for (const [key, value] of formData.entries()) {
        if (!isEmpty(value)) {
          postData[key] = value;
        }
      }
      let _copy = {
        ...postData,
        domain_name: formDomain,
        domain: postData.domain,
      };
      const data = await postFetcherLambda(`/${toolsId}/`, _copy);
      const vmcError = data?.data?.pem_response?.details?.errors;
      const LogoError = data?.data?.logo_detail?.details?.errors;
      setVMCErrors(vmcError);
      setLogoErrorrs(LogoError);
      // @ts-ignore
      setInvalidDomainError(false);

      setInputDomain(formDomain);
      setGeneratorData(data);
      setSearchState(true);
      // !isEmpty(data?.data)
      // scrollIntoView(`${toolName}_resultSection`, 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingGenerator(false);
      setSearchState(true);
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

    const arr = ["validate"];

    return (
      <>
        {arr.map((val, idx: number) => {
          return (
            <div className="col-lg-4 col-md-6" key={`card_${idx}`}>
              <div className="progressCard resultCard">
                <div className="text-center">
                  <span>
                    {lookupData?.data?.[val]?.name
                      ? lookupData?.data?.[val]?.name
                      : null}
                  </span>
                  <h4>{lookupData?.data?.[val]?.title}</h4>
                </div>
                <div className="progress">
                  <div
                    className={`progress-bar 
                      ${getClass(lookupData?.data?.[val]?.color)}`}
                    style={{ width: `100%` }}
                  ></div>
                </div>
                <p className="overflowScroll">
                  {lookupData?.data?.[val]?.subtitle}
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
        name: "BIMI Generator",
        item: "https://yourdmarc.com/tools/bimi-generator",
      },
    ],
  };
  const script2 = {
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
        name: "BIMI Lookup",
        item: "https://yourdmarc.com/tools/bimi-lookup",
      },
    ],
  };

  const [isLoader, setisLoader] = useState(true);
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script2) }}
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
                          <Link rel="canonical" href={tabLink1}>
                            {formatToolTypes(toolName).toUpperCase()} Lookups
                          </Link>
                        </li>

                        <li
                          className={
                            toolType === _TOOL_TYPES.GENERATOR ? "active" : ""
                          }
                        >
                          <Link rel="canonical" href={tabLink2}>
                            {formatToolTypes(toolName).toUpperCase()}-Record
                            Generator
                          </Link>
                        </li>
                      </ul>

                      <h2>
                        {toolName.toUpperCase()} Record&nbsp;
                        {toolType === _TOOL_TYPES.LOOKUP
                          ? "Checker"
                          : capitalize(toolType)}
                      </h2>
                      <p>
                        {toolType === _TOOL_TYPES.LOOKUP &&
                          "Quickly verify your BIMI record to ensure it's properly configured for displaying brand logos in email inboxes."}
                        {toolType === _TOOL_TYPES.GENERATOR &&
                          "Easily create and configure your BIMI record with our tool to enhance brand visibility and email security."}
                      </p>

                      {toolType === _TOOL_TYPES.LOOKUP && (
                        <form onSubmit={onCheckLookup}>
                          <div className="row">
                            <div className="col-lg-8 mx-auto">
                              <div className="form-group checkerGroup">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Type your domain"
                                  name="domain"
                                  value={inputDomain}
                                  onChange={(e) =>
                                    setInputDomain(e.target.value)
                                  }
                                  required
                                />
                                <SubmitButton
                                  title={`Check BIMI`}
                                  isLoading={isLoading}
                                />
                              </div>
                              {domainError && (
                                <span className="error">
                                  {" "}
                                  Please enter valid domain
                                </span>
                              )}
                            </div>
                          </div>
                        </form>
                      )}
                      {toolType === _TOOL_TYPES.GENERATOR && (
                        <form onSubmit={onGenerateRecord}>
                          <div className="row">
                            <div className="col-lg-8 mx-auto mt-4">
                              <div className="form-group">
                                <label>Domain</label>
                                <input
                                  type="text"
                                  name="domain"
                                  className="form-control"
                                  placeholder="Type your domain"
                                  value={inputDomain}
                                  onChange={(e) =>
                                    setInputDomain(e.target.value)
                                  }
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
                            <div className="col-lg-8 mx-auto">
                              <div className="form-group">
                                <label>
                                  Logo Location
                                  <InformationTooltip
                                    name="bimi_generator_logo_location"
                                    favIcons="i"
                                  />
                                </label>
                                <input
                                  type="text"
                                  name="logo_location"
                                  className="form-control"
                                  placeholder="https://example.com/logo.svg"
                                />
                              </div>
                            </div>
                            <div className="col-lg-8 mx-auto">
                              <div className="form-group">
                                <label>
                                  VMC Certificate Location
                                  <InformationTooltip
                                    name="bimi_generator_VMC_ertificate_location"
                                    favIcons="i"
                                  />
                                </label>
                                <input
                                  type="text"
                                  name="vmc_certificate_location"
                                  className="form-control"
                                  placeholder="https://example.com/cert.pem"
                                />
                              </div>
                            </div>
                            <div className="col-lg-8 mx-auto d-flex justify-content-start">
                              <SubmitButton
                                title={`Generate`}
                                isLoading={isLoadingGenerator}
                              />
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!invalidDomainError && (
            <>
              {toolType === _TOOL_TYPES.LOOKUP &&
                !isEmpty(lookupData) &&
                !lookupError && (
                  <div
                    className="generatorSection  pt-5"
                    ref={targetSectionRef}
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-12">
                          <div id={`${toolName}_resultSection`} />
                          <div className="generatorSection__Result">
                            <h3 className="justify-content-center mb-5">
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
                              lookupType={"bimi-generator"}
                              hostName={domain}
                              typeVal="TXT"
                              recordValue={lookupData?.data?.record_value}
                              titleText={`BIMI Record`}
                            />

                            <RecordWarningCompo
                              warningText={lookupData?.data?.warnings}
                            />
                            <RecordWarningCompo
                              isError
                              warningText={lookupData?.data?.errors}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {lookupData?.data?.logo_valid && (
                <div className="generatorSection  pt-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12">
                        <div id={`${toolName}_resultSection`} />
                        <div className="container">
                          <div className="devicePreview">
                            <h3>Device Preview</h3>
                            <div className="row">
                              <div className="col-lg-8">
                                <div className="devicePreview__Left">
                                  <div className="devicePreview__Img">
                                    <img
                                      src="/assets/images/bimi-desktop-bg.png"
                                      loading="lazy"
                                    />
                                    <div className="leftContent">
                                      <img
                                        src={lookupData?.data?.logo_detail?.url}
                                        loading="lazy"
                                      />
                                      <p className="heading-main font-bold">
                                        &nbsp;{domain}&nbsp;
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="devicePreview__Right">
                                  <div className="devicePreview__Img">
                                    <img
                                      src="/assets/images/bimi-mobile-bg.png"
                                      loading="lazy"
                                    />
                                    <div className="rightImg">
                                      <img
                                        src={lookupData?.data?.logo_detail?.url}
                                        loading="lazy"
                                      />
                                    </div>
                                    <div className="rightContent">
                                      <p className="heading-main">
                                        &nbsp;{domain}&nbsp;
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {toolType === _TOOL_TYPES.GENERATOR &&
                !isEmpty(generatorData?.data) && (
                  <div
                    className="generatorSection  pt-5"
                    ref={targetSectionRef}
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-12">
                          <div id={`${toolName}_resultSection`} />
                          <div className="generatorSection__Result">
                            <h3 className="justify-content-center">
                              Generated results for
                              <span style={{ color: "#eb5454" }}>
                                {!!inputDomain && (
                                  <>&nbsp;{inputDomain}&nbsp;</>
                                )}
                              </span>
                              domain
                            </h3>

                            <p className="mt-4 sbdPtag">
                              Publish the following DNS TXT record on 
                              <span style={{ fontWeight: "600!important" }}>
                                default._bimi.
                                {inputDomain}
                              </span>
                               subdomain
                            </p>

                            <RecordValuesCompo
                              typeVal="TXT"
                              showSelector={false}
                              hostName={` default._bimi.${inputDomain}`}
                              recordValue={generatorData?.data?.record_value}
                              titleText={`BIMI Record`}
                            />
                            {/* <RecordBox
                        heading={`${toolName.toUpperCase()} Record`}
                        subHead1={"Host"}
                        subHead2={"Type"}
                        subHead3={"Value"}
                        text1={inputDomain}
                        text2={"TXT"}
                        text3={generatorData?.data?.record_value}
                      /> */}
                            <RecordWarningCompo
                              warningText={generatorData?.data?.warnings}
                            />
                            <RecordWarningCompo
                              isError
                              warningText={generatorData?.data?.errors}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              {logoData?.data?.logo_valid && (
                <div className="generatorSection  pt-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12">
                        <div id={`${toolName}_resultSection`} />
                        <div className="recordsBox">
                          <span className="d-flex justify-content-between align-items-center">
                            <span>
                              <h4 className="title">Logo Validation</h4>
                            </span>
                          </span>
                          <p className="rvp">Logo URL:</p>
                          <div className="recordValueBox">
                            <p className={`m-0`}>
                              {logoData.data?.logo_detail?.url}
                            </p>
                            <CopyToClipboard
                              disabledButton={false}
                              entryText={logoData.data?.logo_detail?.url}
                            />
                          </div>

                          <p className="rvp">Logo details:</p>
                          <div className="logoSection">
                            <div className="row">
                              <div className="col-lg-2">
                                <div className="logo">
                                  <span>
                                    <img
                                      src={logoData.data?.logo_detail?.url}
                                      loading="lazy"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="col-lg-8">
                                <div className="contentSection">
                                  <p>
                                    <strong>Title:</strong>
                                    {logoData.data?.logo_detail?.details?.title}
                                  </p>
                                  <p>
                                    <strong>Size:</strong>
                                    {logoData.data?.logo_detail?.details?.size}
                                  </p>
                                </div>

                                <div className="contentSection">
                                  <p>
                                    <strong>SVG Version:</strong>
                                    {
                                      logoData.data?.logo_detail?.details
                                        ?.svg_version
                                    }
                                  </p>
                                  <p>
                                    <strong>SVG baseProfile:</strong>
                                    {
                                      logoData.data?.logo_detail?.details
                                        ?.svg_baseProfile
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {logoData?.data?.pem_valid && (
                <div className="generatorSection  pt-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12">
                        <div id={`${toolName}_resultSection`} />
                        <div className="recordsBox">
                          <span className="d-flex justify-content-between align-items-center">
                            <span>
                              <h4 className="title">Certificate Validation</h4>
                            </span>
                          </span>
                          <p className="rvp">Certificate URL:</p>
                          <div className="recordValueBox">
                            <div className="recordValueBox">
                              <p className={`m-0`}>
                                {logoData?.data?.pem_response?.file_path}
                              </p>
                              <CopyToClipboard
                                disabledButton={false}
                                entryText={
                                  logoData?.data?.pem_response?.file_path
                                }
                              />
                            </div>
                            {/* <p className="record_value">{lookupData?.pem_response?.file_path}</p> */}
                            {/* <div className="copyButton" title="Copy">
                    </div> */}
                          </div>

                          <p className="rvp">Certificate Details:</p>
                          <div className="logoSection">
                            <div className="row">
                              {logoErrorrs?.length == 0 && (
                                <div className="col-lg-2">
                                  <div className="logo">
                                    <span>
                                      <img
                                        src={logoData?.data?.logo_detail?.url}
                                        loading="lazy"
                                      />
                                    </span>
                                  </div>
                                </div>
                              )}
                              <div className="col-lg-8">
                                <div className="contentSection">
                                  <p>
                                    <strong>Valid from: </strong>
                                    {
                                      logoData?.data?.pem_response?.details
                                        ?.valid_from
                                    }
                                  </p>
                                  <p>
                                    <strong>Expires on:</strong>
                                    {
                                      logoData?.data?.pem_response?.details
                                        ?.expires_on
                                    }
                                  </p>
                                </div>

                                <div className="contentSection">
                                  {/* <p>
                            <strong>Trademark registration:</strong>
                            {
                              logoData?.data?.pem_response?.details
                                ?.trademark_registration
                            }
                          </p> */}
                                  <p>
                                    <strong>Certified domains:</strong>
                                    {
                                      logoData?.data?.pem_response?.details
                                        ?.certified_domains
                                    }
                                  </p>
                                </div>

                                <div className="contentSection">
                                  <p>
                                    <strong>Issuer:</strong>
                                    {
                                      logoData?.data?.pem_response?.details
                                        ?.issuer
                                    }
                                  </p>
                                </div>

                                <div className="contentSection">
                                  <p>
                                    <strong>Serial Number:</strong>
                                    {
                                      logoData?.data?.pem_response?.details
                                        ?.serial_number
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {toolType === _TOOL_TYPES.LOOKUP &&
                !lookupError &&
                !isEmpty(domain) &&
                isEmpty(lookupData) && (
                  <RecordWarningCompo
                    isError
                    warningText={`No Record Found!`}
                  />
                )}

              {toolType === _TOOL_TYPES.LOOKUP && !lookupError && (
                <AllToolsScannerResult
                  // data={result}
                  domain={domain}
                />
              )}
              {isWindow ? (
                <ToolsUi toolName={`${toolName + "_" + toolType}`} />
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
export default BimiTool;

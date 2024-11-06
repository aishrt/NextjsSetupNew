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
import RecordWarningCompo from "@/app/pageComponents/Tools/ui/RecordWarningCompo";
import { postFetcherLambda } from "@/@core/apiFetcher";
import { scrollIntoView } from "@/utils/scrollIntoView";
import SubmitButton from "@/components/Form/SubmitButton";
import { capitalize } from "@mui/material";
import TagTable from "@/components/UI/TagTable";
import { createAndClickProgressBar } from "@/@core/createAndClickProgressBar";
import RecordValuesCompo from "@/app/pageComponents/Tools/ui/RecordValuesCompo";
import { useSession } from "next-auth/react";
import AllToolsScannerResult from "./ui/AllToolsScannerResult";
import { toast } from "react-toastify";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import Head from "next/head";
import ToolsUi from "@/app/pageComponents/Tools/ToolsUi";

const DkimTool = ({
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
  const selector: string | string[] | undefined = searchParams?.selector || "";

  if (!isEmpty(lookupData)) {
    scrollIntoView(`${toolName}_resultSection`, 0);
  }
  const [inputDomain, setInputDomain] = useState(cleanDomain(domain));
  const [domainError, setDomainError] = useState(false);
  const [lookupError, setLookupError] = useState(false);
  const [invalidDomainError, setInvalidDomainError] = useState(false);
  const [inputSelector, setInputSelector] = useState(selector);
  const [detectAllSelector, setDetectAllSelector] = useState(!selector);
  const [generatorData, setGeneratorData] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGenerator, setIsLoadingGenerator] = useState(false);
  const [isWindow, setIsWindow] = useState(true);
  const [searchState, setSearchState] = useState<boolean>(false);
  const targetSectionRef = useRef<HTMLDivElement>(null);
  
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
    setInputDomain(cleanDomain(domain));
  }, [domain]);

  

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
    const formSelector = formData.get("selector") as string;
    const formDetectAllSelector = formData.get("detect_all_selectors");

    if (
      formDomain &&
      (formDetectAllSelector || (!formDetectAllSelector && formSelector))
    ) {
      if (validateDomainName(formDomain)) {
        const hrefDashboard =
          !formDetectAllSelector && formSelector
            ? `/dashboard/tools/${formatToolTypes(
                toolsId
              )}-lookup?domain=${formDomain}&selector=${formSelector}`
            : `/dashboard/tools/${formatToolTypes(
                toolsId
              )}-lookup?domain=${formDomain}`;
        const href =
          !formDetectAllSelector && formSelector
            ? `/tools/${formatToolTypes(
                toolsId
              )}-lookup?domain=${formDomain}&selector=${formSelector}`
            : `/tools/${formatToolTypes(toolsId)}-lookup?domain=${formDomain}`;
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
          postData[key] = key === "key_length" ? parseInt(value, 0) : value;
        }
      }

      let _copy = {
        ...postData,
        domain_name: formDomain,
      };

      const data = await postFetcherLambda(`/${toolsId}/`, _copy);
      // @ts-ignore
      setInputDomain(formDomain);
      setGeneratorData(data.data);
      setInvalidDomainError(false);
      scrollIntoView(`${toolName}_resultSection`, 0);
      setSearchState(true);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchState(true);
      setIsLoadingGenerator(false);
    }
  };
  const querySelector = inputSelector ? `${inputSelector}` : ``;
  const tabLink = domain
    ? `/tools/${formatToolTypes(
        toolsId
      )}-lookup?domain=${domain}&selector=${querySelector}`
    : `/tools/${formatToolTypes(toolsId)}-lookup`;
  const tabLinkDashboard = domain
    ? `/dashboard/tools/${formatToolTypes(
        toolsId
      )}-lookup?domain=${domain}&selector=${querySelector}`
    : `/dashboard/tools/${formatToolTypes(toolsId)}-lookup`;
  const tabLink1 = status === "authenticated" ? tabLinkDashboard : tabLink;
  const tabLinks = domain
    ? `/tools/${formatToolTypes(toolsId)}-generator?domain=${domain}`
    : `/tools/${formatToolTypes(toolsId)}-generator`;
  const tabLinksDashbaord = domain
    ? `/dashboard/tools/${formatToolTypes(toolsId)}-generator?domain=${domain}`
    : `/dashboard/tools/${formatToolTypes(toolsId)}-generator`;
  const tabLink2 = status === "authenticated" ? tabLinksDashbaord : tabLinks;

  const [lookupDKIMData, setLookupDKIMData] = useState<any[]>([]);
  useEffect(() => {
    setLookupDKIMData(JSON.parse(JSON.stringify(lookupData)));
  }, [lookupData]);

  const getClass = (color: string) =>
    color === "Green" ? "success" : "danger";
  const arr = ["published", "validate", "public_key_check"];

  const CardsHtml = ({ data }: { data: any }) => {
    const getClass = (color: string) =>
      color === "Green" ? "success" : "danger";
    const arr = ["published", "validate", "public_key_check"];
    return (
      <>
        {data?.data?.length > 0 &&
          data?.data?.map((item: any) => {
            return arr?.map((val, idx: number) => {
              return (
                <div className="col-lg-4 col-md-6" key={`card_${idx}`}>
                  <div className="progressCard resultCard">
                    {item?.data?.selector ? (
                      <p className="selector">
                        Selector: {item?.data?.selector}
                      </p>
                    ) : (
                      ""
                    )}
                    <span>
                      {lookupData?.data?.[val]?.name
                        ? lookupData?.data?.[val]?.name
                        : null}
                    </span>
                    <h4>{item?.data?.[val]?.title}</h4>
                    <div className="progress">
                      <div
                        className={`progress-bar 
                    ${getClass(item?.data?.[val]?.color)}`}
                        style={{ width: `100%` }}
                      ></div>
                    </div>
                    <p>{item?.data?.[val]?.subtitle}</p>
                  </div>
                </div>
              );
            });
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
        name: "DKIM Generator",
        item: "https://yourdmarc.com/tools/dkim-generator",
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
        name: "DKIM Lookup",
        item: "https://yourdmarc.com/tools/dkim-lookup",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData2) }}
      />
      <div className="generatorSection">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="generatorSection__Content">
                <ul>
                  <li
                    className={toolType === _TOOL_TYPES.LOOKUP ? "active" : ""}
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
                      {formatToolTypes(toolName).toUpperCase()}-Record Generator
                    </Link>
                  </li>
                </ul>

                <h2>
                  {toolName.toUpperCase()} Record{" "}
                  {toolType === _TOOL_TYPES.LOOKUP
                    ? "Checker"
                    : capitalize(toolType)}
                </h2>
                <p>
                  {toolType === _TOOL_TYPES.LOOKUP &&
                    "Quickly inspect your domain's DKIM record with a selected DKIM selector to instantly identify and fix potential issues."}
                  {toolType === _TOOL_TYPES.GENERATOR &&
                    "Effortlessly create a strong DKIM record to supercharge your email security and seamlessly finalize your DNS authentication process."}
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
                      <div className="col-lg-8 mx-auto">
                        <div className="form-group">
                          <input
                            type="text"
                            name="selector"
                            className="form-control"
                            readOnly={detectAllSelector}
                            placeholder={
                              detectAllSelector ? "auto" : "<Selector>"
                            }
                            value={detectAllSelector ? "" : inputSelector}
                            onChange={(e) => {
                              setInputSelector(e.target.value);
                            }}
                            required={!detectAllSelector}
                          />
                        </div>
                      </div>
                      <div className="col-lg-8 mx-auto">
                        <div className="form-group">
                          <input
                            name="detect_all_selectors"
                            className="form-check-input"
                            type="checkbox"
                            checked={detectAllSelector}
                            onChange={(e) => {
                              setDetectAllSelector(e.target.checked);
                            }}
                            id="flexCheckChecked"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            &nbsp;Detect all selectors
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-8 mx-auto d-flex justify-content-start">
                        <SubmitButton
                          title={`Check DKIM`}
                          isLoading={isLoading}
                        />
                      </div>
                    </div>
                  </form>
                )}
                {toolType === _TOOL_TYPES.GENERATOR && (
                  <form onSubmit={onGenerateRecord}>
                    <div className="row">
                      <div className="col-lg-8 mx-auto">
                        <div className="form-group checkerGroup">
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
                      <div className="col-lg-8 mx-auto">
                        <div className="form-group">
                          <label>
                            Selector
                            <InformationTooltip
                              name="dkim_generator_selector"
                              favIcons="i"
                            />
                          </label>
                          <input
                            type="text"
                            name="selector"
                            className="form-control"
                            placeholder="e.g. s1"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-8 mx-auto">
                        <div className="form-group">
                          <label>
                            Key Length
                            <InformationTooltip
                              name="dkim_generator_key_length"
                              favIcons="i"
                            />
                          </label>
                          <select
                            className="form-control"
                            name="key_length"
                            defaultValue=""
                          >
                            <option value="1024">1024</option>
                            <option value="2048">2048</option>
                            <option value="4096">4096</option>
                          </select>
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
              {/* <div id={`${toolName}_resultSection`} /> */}
              {/* {toolType === _TOOL_TYPES.LOOKUP && !isEmpty(lookupData) && (
                <div className="generatorSection__Result">
                  <h3 className="justify-content-center mb-5">
                    Lookup and check results for
                    <span className="blue">&nbsp;{domain}&nbsp;</span> domain
                  </h3>
                  <div className="row">
                    <CardsHtml data={lookupDKIMData} />
                  </div>
                  {lookupData?.length > 0 &&
                    lookupData?.map((item: any, idx: number) => {
                      return (
                        <div key={idx}>
                          <RecordValuesCompo
                            recordValue={item?.data?.record_value}
                            titleText={`Selector`}
                            subTitleText={item?.data?.selector}
                          />
                          <RecordWarningCompo
                            warningText={item?.data?.warnings}
                          />
                          <RecordWarningCompo
                            isError
                            warningText={item?.data?.errors}
                          />
                        </div>
                      );
                    })}
                </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      {!invalidDomainError && (
        <>
          <div className="generatorSection" ref={targetSectionRef}>
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div id={`${toolName}_resultSection`} />
                  {toolType === _TOOL_TYPES.LOOKUP &&
                    !lookupError &&
                    !isEmpty(lookupData.data) && (
                      <div className="generatorSection__Result  mt-0">
                        <h3 className="justify-content-center mb-5  mt-0">
                          Lookup and check results for
                          <span className="blue">
                            &nbsp;{domain}&nbsp;
                          </span>{" "}
                          domain
                        </h3>
                        {/* <div className="row">
                    <CardsHtml data={lookupDKIMData} />
                  </div> */}
                        {lookupData?.data?.length > 0 &&
                          lookupData?.data?.map((item: any, idx: number) => {
                            return (
                              <div key={idx}>
                                <RecordValuesCompo
                                  lookupType={"dkim-generator"}
                                  hostName={`${item?.data?.selector}._domainkey.${domain}`}
                                  typeVal="TXT"
                                  showSelector={true}
                                  recordValue={item?.data?.record_value}
                                  titleText={`Selector`}
                                  subTitleText={item?.data?.selector}
                                />

                                <RecordWarningCompo
                                  warningText={item?.data?.warnings}
                                />
                                <RecordWarningCompo
                                  isError
                                  warningText={item?.data?.errors}
                                />
                              </div>
                            );
                          })}
                      </div>
                    )}
                  {/* {toolType === _TOOL_TYPES.LOOKUP && !isEmpty(lookupData.data) && (
                <div className="generatorSection__Result mt-0">
                  <h3 className="justify-content-center mb-5 mt-0">
                    Lookup and check results for
                    <span className="blue">&nbsp;{domain}&nbsp;</span> domain
                  </h3>
                  <div className="row">
                    {lookupDKIMData?.data?.length > 0 &&
                      lookupDKIMData?.data?.map(
                        (cardItem: any, idx: number) => {
                          const matchingRecord = lookupData?.data?.find(
                            (recordItem: any) =>
                              recordItem?.data?.selector ===
                              cardItem?.data?.selector
                          );

                          return (
                            <div
                              key={`card_record_${idx}`}
                              className="col-lg-12"
                            >
                              {lookupDKIMData?.data?.length > 0 &&
                                lookupDKIMData?.data?.map((item: any) => {
                                  return arr?.map((val, idx: number) => {
                                    return (
                                        <div
                                          className="col-lg-4 col-md-6"
                                          key={`card_${idx}`}
                                        >
                                          <div className="progressCard resultCard">
                                            {item?.data?.selector ? (
                                              <p className="selector">
                                                Selector: {item?.data?.selector}
                                              </p>
                                            ) : (
                                              ""
                                            )}
                                            <h4>{item?.data?.[val]?.title}</h4>
                                            <div className="progress">
                                              <div
                                                className={`progress-bar 
                      ${getClass(item?.data?.[val]?.color)}`}
                                                style={{ width: `100%` }}
                                              ></div>
                                            </div>
                                            <p>{item?.data?.[val]?.subtitle}</p>
                                          </div>
                                        </div>
                                    );
                                  });
                                })}

                              {matchingRecord && (
                                <div>
                                  <RecordValuesCompo
                                    recordValue={
                                      matchingRecord?.data?.record_value
                                    }
                                    titleText={`Selector`}
                                    subTitleText={
                                      matchingRecord?.data?.selector
                                    }
                                  />
                                  <RecordWarningCompo
                                    warningText={matchingRecord?.data?.warnings}
                                  />
                                  <RecordWarningCompo
                                    isError
                                    warningText={matchingRecord?.data?.errors}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
              )} */}

                  {toolType === _TOOL_TYPES.GENERATOR &&
                    !isEmpty(generatorData) && (
                      <div className="generatorSection__Result">
                        <h3>
                          Generated results for
                          {!!inputDomain && (
                            <>&nbsp;{generatorData?.domain_name}&nbsp;</>
                          )}{" "}
                          domain
                          {/* <button className="btn blueButton">DNS Panel</button> */}
                        </h3>
                        <p>
                          Publish the following DNS TXT record on
                          <b> {generatorData?.data?.domain_key}</b> subdomain
                        </p>
                        <div className="container-fluid">
                          <RecordValuesCompo
                            typeVal="TXT"
                            showSelector={true}
                            recordValue={[
                              generatorData?.data?.record_value,
                              generatorData?.data.private_key,
                              generatorData?.data.public_key,
                            ]}
                            hostName={generatorData?.data?.domain_key}
                            titleText={[
                              `Selector`,
                              `Private key`,
                              `Public key`,
                            ]}
                            subTitleText={[
                              generatorData?.data?.selector,
                              `You must enter this key in your DKIM signer. It must be kept secret, as anyone with access to it can stamp tokens pretending to be you`,
                              `This is the public key in the original raw "X509" format. It's not usable in DNS directly, but it might be useful for something else.`,
                            ]}
                          />
                        </div>

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
                      <RecordWarningCompo
                        isError
                        warningText={`No Record Found!`}
                      />
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
            <ToolsUi toolName={`${toolName + "_" + toolType}`} />
          ) : (
            <></>
          )}
          {toolType === _TOOL_TYPES.LOOKUP ? (
            lookupData?.length > 0 &&
            lookupData.map((data: any, idx: number) => {
              return (
                <div key={`table_${idx}`}>
                  <TagTable
                    result={result}
                    domain={domain}
                    toolName={toolName}
                    toolType={toolType}
                    responseData={data}
                  />
                </div>
              );
            })
          ) : (
            <>
              <TagTable
                result={result}
                domain={domain}
                toolName={toolName}
                toolType={toolType}
                responseData={generatorData}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
export default DkimTool;

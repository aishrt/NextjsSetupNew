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
import React, { FormEvent, useState, useEffect, useRef } from "react";
import { _TOOL_TYPES } from "@/constants/toolsData";
import { useRouter } from "next/navigation";
import RecordWarningCompo from "@/app/pageComponents/Tools/ui/RecordWarningCompo";
import { postFetcherLambda } from "@/@core/apiFetcher";
import { scrollIntoView } from "@/utils/scrollIntoView";
import SubmitButton from "@/components/Form/SubmitButton";
import TagTable from "@/components/UI/TagTable";
import { capitalize } from "@mui/material";
import { createAndClickProgressBar } from "@/@core/createAndClickProgressBar";
import RecordValuesCompo from "@/app/pageComponents/Tools/ui/RecordValuesCompo";
import { useSession } from "next-auth/react";
import AllToolsScannerResult from "./ui/AllToolsScannerResult";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import Head from "next/head";
import { toast } from "react-toastify";
import ToolsUi from "@/app/pageComponents/Tools/ToolsUi";
import RecordBox from "@/components/UI/RecordBox";

const DmarcTool = ({
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

  const [generatorData, setGeneratorData] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGenerator, setIsLoadingGenerator] = useState(false);
  const [selectedOptionsError, setselectedOptionsError] = useState(false);
  const [searchState, setSearchState] = useState<boolean>(false);
  const targetSectionRef = useRef<HTMLDivElement>(null);
  const [lookupError, setLookupError] = useState(false);
  const [invalidDomainError, setInvalidDomainError] = useState(false);

  const [inputs, setInputs] = useState([
    { id: 1, value: "rua@mail.yourdmarc.online" },
  ]);
  const handleAddInput = () => {
    setInputs([...inputs, { id: inputs.length + 1, value: "" }]);
  };
  const handleDeleteInput = (id: any) => {
    setInputs(inputs.filter((input: any) => input.id !== id));
  };
  const handleInputChange = (id: any, event: any) => {
    const newInputs = inputs.map((input) =>
      input.id === id ? { ...input, value: event.target.value } : input
    );
    setInputs(newInputs);
  };

  const [inputsReports, setInputsReports] = useState([
    { id: 1, value: "ruf@mail.yourdmarc.online" },
  ]);
  const handleAddInputReports = () => {
    setInputsReports([
      ...inputsReports,
      { id: inputsReports.length + 1, value: "" },
    ]);
  };
  const handleDeleteInputReports = (id: any) => {
    setInputsReports(inputsReports.filter((input: any) => input.id !== id));
  };
  const handleInputChangeReports = (id: any, event: any) => {
    const newInputsReports = inputsReports.map((input) =>
      input.id === id ? { ...input, value: event.target.value } : input
    );
    setInputsReports(newInputsReports);
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
  const [inputDomain, setInputDomain] = useState(cleanDomain(domain));

  const [domainError, setDomainError] = useState(false);

  useEffect(() => {
    setInputDomain(cleanDomain(domain));
  }, [domain]);

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

  const [selectedOptions, setSelectedOptions] = useState(["1"]);
  const [isWindow, setIsWindow] = useState(true);

  useEffect(() => {
    if (window.location.pathname.includes("/dashboard")) {
      setIsWindow(false);
    }
  }, []);
  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;

    setSelectedOptions((prevSelectedOptions: any) => {
      if (checked) {
        // Add the value to the array if it is checked
        setselectedOptionsError(false);
        return [...prevSelectedOptions, value];
      } else {
        // Remove the value from the array if it is unchecked
        setselectedOptionsError(false);
        return prevSelectedOptions.filter((option: any) => option !== value);
      }
    });
  };

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
    // setOpen(true);
    if (selectedOptions.length <= 0) {
      setselectedOptionsError(true);
      setIsLoadingGenerator(false);

      return;
    }
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
        failure_reporting_options: selectedOptions,
        policy_type: postData.policy_type,
        reports_to_email: inputs,
        failure_reports_to_email:
          inputsReports[0]?.value != "" ? inputsReports : null,
      };

      const data = await postFetcherLambda(`/${toolsId}/`, _copy);
      setInputDomain(formDomain);
      setGeneratorData(data);
      setSearchState(true);
      setInvalidDomainError(false);

      scrollIntoView(`${toolName}_resultSection`, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchState(true);

      setIsLoadingGenerator(false);
    }
  };
  const CardsHtml = ({ crType }: { crType: any }) => {
    const getClass = (color: string) =>
      color === "Green" ? "success" : "danger";
    const arr = ["reporting", "validate", "policy", "subdomain_policy"];
    // recordValue={lookupData?.data?.record_value}
    // titleText={`${toolName.toUpperCase()} Record`}

    return (
      <>
        {crType == "lookup" ? (
          <>
            {arr.map((val, idx: number) => {
              return (
                <>
                  {lookupData?.data?.data?.[val]?.title ? (
                    <div className="col-lg-4 col-md-6" key={`card_${idx}`}>
                      <div className="progressCard resultCard">
                        <div className="text-center">
                          <span>
                            {lookupData?.data?.data?.[val]?.name
                              ? lookupData?.data?.data?.[val]?.name
                              : null}
                          </span>
                          <h4>{lookupData?.data?.data?.[val]?.title}</h4>
                        </div>
                        <div className="progress">
                          <div
                            className={`progress-bar 
                ${getClass(lookupData?.data?.data?.[val]?.color)}`}
                            style={{ width: `100%` }}
                          ></div>
                        </div>
                        <p className="overflowScroll">
                          {lookupData?.data?.data?.[val]?.subtitle}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </>
              );
            })}
          </>
        ) : (
          <>
            {arr.map((val, idx: number) => {
              return (
                <>
                  {generatorData?.data?.data?.[val]?.title ? (
                    <div className="col-lg-4 col-md-6" key={`card_${idx}`}>
                      <div className="progressCard resultCard">
                        <div className="text-center">
                          <span>
                            {generatorData?.data?.data?.[val]?.name
                              ? generatorData?.data?.data?.[val]?.name
                              : null}
                          </span>
                          <h4>{generatorData?.data?.data?.[val]?.title}</h4>
                        </div>
                        <div className="progress">
                          <div
                            className={`progress-bar 
                 ${getClass(generatorData?.data?.data?.[val]?.color)}`}
                            style={{ width: `100%` }}
                          ></div>
                        </div>
                        <p>{generatorData?.data?.data?.[val]?.subtitle}</p>
                      </div>
                    </div>
                  ) : null}
                </>
              );
            })}
          </>
        )}
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
        name: "DMARC Generator",
        item: "https://yourdmarc.com/tools/dmarc-generator",
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
                    {toolName.toUpperCase()} Record
                    {toolType === _TOOL_TYPES.LOOKUP
                      ? "Checker"
                      : capitalize(toolType)}
                  </h2>
                  <p>
                    {toolType === _TOOL_TYPES.LOOKUP
                      ? "Lookup your DMARC record to identify any problems and fix them."
                      : "Create a valid DMARC record in a few clicks to use it in your DNS."}
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
                            <SubmitButton
                              title={`Check`}
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
                        <div className="col-xl-6 col-lg-12  col-md-12">
                          <div className="form-group">
                            <label>Domain</label>
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

                        <div className="col-xl-6 col-lg-12  col-md-12">
                          <div className="form-group">
                            <label>
                              Policy type
                              <InformationTooltip
                                name="dmarc_generator_policy_type"
                                position="right"
                                favIcons="i"
                              />
                            </label>

                            <div className="outer">
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
                                    defaultChecked
                                    id="flexRadioDefault1"
                                  />
                                  None
                                  <span> (monitoring)</span>
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
                                    value="quarantine"
                                    id="flexRadioDefault2"
                                  />
                                  Quarantine
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
                                    value="reject"
                                    id="flexRadioDefault3"
                                  />
                                  Reject
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-12  col-md-12">
                          <div className="form-group">
                            <label>
                              Reports send to
                              <InformationTooltip
                                name="dmarc_generator_reports_send_to"
                                position="right"
                                favIcons="i"
                              />
                            </label>

                            {/* Loop through the inputs and render each one */}
                            {inputs.map((input, index) => (
                              <div
                                key={input.id}
                                className="d-flex align-items-center mb-2"
                              >
                                <input
                                  type="email"
                                  required
                                  name={`reports_to_email_${input.id}`}
                                  className="form-control"
                                  placeholder="Enter email"
                                  value={input.value}
                                  onChange={(e) =>
                                    handleInputChange(input.id, e)
                                  }
                                />
                                {index === 0 && (
                                  <button
                                    className="button-gray-common"
                                    type="button"
                                    onClick={handleAddInput}
                                  >
                                    <i className="fa-solid fa-circle-plus"></i>
                                  </button>
                                )}
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="button-red-common"
                                    onClick={() => handleDeleteInput(input.id)}
                                  >
                                    <i className="fa-solid fa-circle-xmark"></i>
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-12  col-md-12">
                          <div className="form-group">
                            <label>
                              Sub-Policy type
                              <InformationTooltip
                                name="dmarc_generator_sub_domain_policy"
                                position="right"
                                favIcons="i"
                              />
                            </label>

                            <div className="outer">
                              <div className="form-check policyCheck">
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault11"
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="subdomain_policy"
                                    value="none"
                                    // defaultChecked
                                    id="flexRadioDefault11"
                                  />
                                  None
                                  <span> (monitoring)</span>
                                </label>
                              </div>

                              <div className="form-check policyCheck">
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault12"
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="subdomain_policy"
                                    value="quarantine"
                                    id="flexRadioDefault12"
                                  />
                                  Quarantine
                                </label>
                              </div>

                              <div className="form-check policyCheck">
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault13"
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="subdomain_policy"
                                    value="reject"
                                    id="flexRadioDefault13"
                                  />
                                  Reject
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>
                              SPF identifier alignment
                              <InformationTooltip
                                name="dmarc_generator_spf_identifire"
                                position="right"
                                favIcons="i"
                              />
                            </label>
                            <select
                              className="form-control"
                              name="alignment_spf"
                              defaultValue="r"
                            >
                              <option value="">-</option>
                              <option value="r">Relaxed</option>
                              <option value="s">Strict</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>
                              DKIM identifier alignment
                              <InformationTooltip
                                name="dmarc_generator_dkim_identifier"
                                position="right"
                                favIcons="i"
                              />
                            </label>
                            <select
                              className="form-control"
                              name="alignment_dkim"
                              defaultValue="r"
                            >
                              <option value="">-</option>
                              <option value="r">Relaxed</option>
                              <option value="s">Strict</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-12  col-md-12">
                          <div className="form-group">
                            <label>
                              Reporting interval
                              <InformationTooltip
                                name="dmarc_generator_report_interval"
                                position="right"
                                favIcons="i"
                              />
                            </label>
                            <input
                              type="number"
                              defaultValue={86400}
                              name="reporting_interval"
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-12  col-md-12">
                          <div className="form-group">
                            <label>
                              Percentage applied to
                              <InformationTooltip
                                name="dmarc_generator_percentage_applied_to"
                                position="right"
                                favIcons="i"
                              />
                            </label>
                            <input
                              type="number"
                              name="pct"
                              defaultValue={100}
                              className="form-control"
                              placeholder="Enter percentage %"
                            />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-12  col-md-12">
                          <div className="form-group">
                            <label>
                              Failure reporting send to
                              <InformationTooltip
                                name="dmarc_generator_failure_report_send_to"
                                position="right"
                                favIcons="i"
                              />
                            </label>

                            {/* Loop through the inputs and render each one */}
                            {inputsReports.map((input, index) => (
                              <div
                                key={input.id}
                                className="d-flex align-items-center mb-2"
                              >
                                <input
                                  type="email"
                                  name={`failure_reports_to_email${input.id}`}
                                  className="form-control"
                                  placeholder="Enter Email"
                                  value={input.value}
                                  onChange={(e) =>
                                    handleInputChangeReports(input.id, e)
                                  }
                                />
                                {index === 0 && (
                                  <button
                                    type="button"
                                    className="button-gray-common"
                                    onClick={handleAddInputReports}
                                  >
                                    <i className="fa-solid fa-circle-plus"></i>
                                  </button>
                                )}
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="button-red-common"
                                    onClick={() =>
                                      handleDeleteInputReports(input.id)
                                    }
                                  >
                                    <i className="fa-solid fa-circle-xmark"></i>
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>
                              Failure reporting options
                              <InformationTooltip
                                name="dmarc_generator_failure_report_option"
                                position="right"
                                favIcons="i"
                              />
                            </label>
                            <div className="outer">
                              <div className="form-check reportingCheck">
                                <input
                                  name="failure_reporting_options"
                                  className="form-check-input"
                                  type="checkbox"
                                  value="0"
                                  id="flexCheckDefault0"
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault0"
                                >
                                  0
                                </label>
                              </div>
                              <div className="form-check reportingCheck">
                                <input
                                  name="failure_reporting_options"
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultChecked
                                  value="1"
                                  id="flexCheckDefault1"
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault1"
                                >
                                  1
                                </label>
                              </div>
                              <div className="form-check reportingCheck">
                                <input
                                  name="failure_reporting_options"
                                  className="form-check-input"
                                  type="checkbox"
                                  value="d"
                                  id="flexCheckDefaultD"
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefaultD"
                                >
                                  d
                                </label>
                              </div>
                              <div className="form-check reportingCheck">
                                <input
                                  name="failure_reporting_options"
                                  className="form-check-input"
                                  type="checkbox"
                                  value="s"
                                  id="flexCheckDefaultS"
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefaultS"
                                >
                                  s
                                </label>
                              </div>
                              {selectedOptionsError && (
                                <span className="error">
                                  Please select any option
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="text-start">
                            <SubmitButton
                              title={`Generate`}
                              isLoading={isLoadingGenerator}
                            />
                          </div>
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
          <div className="generatorSection pt-5" ref={targetSectionRef}>
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div id={`${toolName}_resultSection`} />
                  {toolType === _TOOL_TYPES.LOOKUP &&
                    !lookupError &&
                    !isEmpty(lookupData) && (
                      <div className="generatorSection__Result mt-0">
                        <h3 className="justify-content-center mb-5 mt-0">
                          {toolName.toUpperCase()} lookup results for
                          <span className="blue">&nbsp;{domain}&nbsp;</span>
                          domain
                        </h3>

                        <div className="row">
                          <CardsHtml crType="lookup" />
                        </div>

                        <RecordValuesCompo
                          lookupType={"dmarc-generator"}
                          hostName={domain}
                          typeVal="TXT"
                          recordValue={lookupData?.data?.data?.record_value}
                          titleText={`${toolName.toUpperCase()} Record`}
                        />
                        <RecordWarningCompo
                          warningText={lookupData?.data?.data?.warnings}
                        />
                        <RecordWarningCompo
                          isError
                          warningText={lookupData?.data?.data?.errors}
                        />
                      </div>
                    )}
                  {toolType === _TOOL_TYPES.GENERATOR &&
                    !isEmpty(generatorData) && (
                      <div className="generatorSection__Result">
                        <h3 className="justify-content-center">
                          Generated results for
                          <span style={{ color: "#eb5454" }}>
                            {!!inputDomain && <>&nbsp;{inputDomain}&nbsp;</>}
                          </span>
                          domain
                          {/* <button>DNS Panel</button> */}
                        </h3>
                        <p className="text-center">
                          Publish the following DNS TXT record on
                          <b>_dmarc.{inputDomain}</b> subdomain
                        </p>

                        <div className="row">
                          <CardsHtml crType="generator" />
                        </div>

                        <h3 className="mb-3 mt-3">
                          Publish DMARC record to your DNS zone.
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
                        <RecordBox
                          tootlipName={"tool_mta_tls_MTA_STS_Record"}
                          heading={`${toolName.toUpperCase()} Record`}
                          subHead1={"Host"}
                          subHead2={"Type"}
                          subHead3={"Value"}
                          text1={inputDomain}
                          text2={"TXT"}
                          text3={generatorData?.data?.data?.record_value}
                        />
                        <RecordWarningCompo
                          warningText={generatorData.data?.data?.warnings}
                        />
                        <RecordWarningCompo
                          isError
                          warningText={generatorData?.data?.data?.errors}
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
            <div className="dmarcScanResult">
              <AllToolsScannerResult
                // data={result}
                domain={domain}
              />
            </div>
          )}

          {isWindow ? (
            <ToolsUi toolName={`${toolName + "_" + toolType}`} />
          ) : (
            <></>
          )}
          <div className="mt-4">
            <TagTable
              result={result}
              domain={domain}
              toolName={toolName}
              toolType={toolType}
              responseData={
                toolType === _TOOL_TYPES.LOOKUP ? lookupData : generatorData
              }
            />
          </div>
        </>
      )}
    </>
  );
};
export default DmarcTool;

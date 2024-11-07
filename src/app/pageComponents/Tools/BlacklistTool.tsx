"use client";
import Link from "next/link";
import {
  cleanDomain,
  isDomainValid,
  isIPValid,
  removeHttp,
  validateDomainName,
} from "@/utils/string-conversion";
import { isEmpty } from "@/utils/isEmpty";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RecordWarningCompo from "@/app/pageComponents/Tools/ui/RecordWarningCompo";
import { scrollIntoView } from "@/utils/scrollIntoView";
import SubmitButton from "@/components/Form/SubmitButton";
import TagTable from "@/components/UI/TagTable";
import { createAndClickProgressBar } from "@/@core/createAndClickProgressBar";
import { useSession } from "next-auth/react";
import AllToolsScannerResult from "./ui/AllToolsScannerResult";
import { toast } from "react-toastify";

import Head from "next/head";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import MainLoader from "@/components/Loaders/MainLoader";
import { Button } from "@mui/material";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import Ipmodal from "@/components/Modal/ipModal";
import ToolsUi from "@/app/pageComponents/Tools/ToolsUi";
import Image from "next/image";

const BlacklistTool = ({
  result,
  toolName,
  searchParams,
  lookupData,
}: BlacklistingPageProps) => {
  const ToolNames = {
    IP: "blacklist-ip",
    DOMAIN: "blacklist-domain",
  };

  const router = useRouter();
  const { data: session, status } = useSession();
  const domain: string | string[] | undefined =
    removeHttp(searchParams?.domain as string) || "";
  if (!isEmpty(lookupData)) {
    scrollIntoView(`${toolName}_resultSection`, 0);
  }

  const [lookupError, setLookupError] = useState(false);
  const [invalidDomainError, setInvalidDomainError] = useState(false);
  const [inputDomain, setInputDomain] = useState(domain);
  const [domainError, setDomainError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchState, setSearchState] = useState<boolean>(false);
  const targetSectionRef = useRef<HTMLDivElement>(null);
  const [isWindow, setIsWindow] = useState(true);

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

  const onCheckLookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const currentDomain = formData.get("domain") as string;
    const formDomain = cleanDomain(currentDomain);

    if (toolName !== ToolNames.IP) {
      let ValidDomainCheck = isDomainValid(formDomain);
      if (!ValidDomainCheck) {
        setDomainError(true);
        setIsLoading(false);
        setInvalidDomainError(true);

        return;
      }
    }

    setDomainError(false);
    setInputDomain(formDomain);
    setInvalidDomainError(false);

    const formIp = removeHttp(formData.get("ip") as string);
    if (
      (toolName === ToolNames.IP && formIp) ||
      (toolName === ToolNames.DOMAIN && formDomain)
    ) {
      if (validateDomainName(formDomain) || formIp) {
        setInputDomain(toolName === ToolNames.IP ? formIp : formDomain);
        const hrefDashboard =
          toolName === ToolNames.IP
            ? `/dashboard/tools/${ToolNames.IP}-lookup?domain=${formIp}`
            : `/dashboard/tools/${ToolNames.DOMAIN}-lookup?domain=${formDomain}`;
        const href =
          toolName === ToolNames.IP
            ? `/tools/${ToolNames.IP}-lookup?domain=${formIp}`
            : `/tools/${ToolNames.DOMAIN}-lookup?domain=${formDomain}`;
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

  useEffect(() => {
    const path = window.location.pathname.includes("/dashboard");
    if (path === true) {
      setIsWindow(false);
    }
    if (lookupData?.error) {
      setDomainError(true);
    }
  }, [lookupData]);
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
                <p>{lookupData?.data?.[val]?.subtitle}</p>
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
        name: "Blacklist Domain Lookup",
        item: "https://yourdmarc.com/tools/blacklist-domain-lookup",
      },
    ],
  };

  const [isLoader, setisLoader] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentIp, setCurrentIp] = useState("");

  const handleModalOpen = (ip: any) => {
    setCurrentIp(ip);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setCurrentIp("");
    setIsModalOpen(false);
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
                          className={toolName === ToolNames.IP ? "active" : ""}
                        >
                          <Link
                            rel="canonical"
                            href={
                              status === "authenticated"
                                ? `/dashboard/tools/${ToolNames.IP}-lookup`
                                : `/tools/${ToolNames.IP}-lookup`
                            }
                          >
                            Blacklist IP Checker
                          </Link>
                        </li>

                        <li
                          className={
                            toolName === ToolNames.DOMAIN ? "active" : ""
                          }
                        >
                          <Link
                            rel="canonical"
                            href={
                              status === "authenticated"
                                ? `/dashboard/tools/${ToolNames.DOMAIN}-lookup`
                                : `/tools/${ToolNames.DOMAIN}-lookup`
                            }
                          >
                            Blacklist Domain Checker
                          </Link>
                        </li>
                      </ul>

                      <h2>{toolName.toUpperCase()} Checker</h2>
                      <p>
                        Lookup your {toolName} record to identify any problems
                        and fix them.
                      </p>

                      <form onSubmit={onCheckLookup}>
                        <div className="row">
                          <div className="col-lg-8 mx-auto" key={`${domain}`}>
                            <div className="form-group checkerGroup">
                              <input
                                type="text"
                                name={
                                  toolName === ToolNames.IP ? "ip" : "domain"
                                }
                                className="form-control"
                                placeholder={
                                  toolName === ToolNames.IP
                                    ? "Type your IP"
                                    : "Type your domain "
                                }
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
                                Please enter valid{" "}
                                {toolName === ToolNames.IP ? "IP" : "domain"}
                              </span>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                    <div id={`${toolName}_resultSection`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {domainError == false && !invalidDomainError && (
            <>
              <div className="generatorSection pt-5" ref={targetSectionRef}>
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      {!isEmpty(lookupData?.data?.blacklist_servers) && (
                        <div className="generatorSection__Result mt-0">
                          <h3 className="justify-content-center mb-5 mt-0">
                            {toolName.toUpperCase()} lookup results for
                            {toolName === ToolNames.IP ? (
                              <>
                                <span
                                  onClick={() => handleModalOpen(domain)}
                                  className="blue"
                                >
                                  &nbsp;{domain}&nbsp;
                                </span>
                                <Ipmodal
                                  isOpen={isModalOpen}
                                  setIsOpen={setIsModalOpen}
                                  handleClose={handleModalClose}
                                  Ip={currentIp}
                                />
                              </>
                            ) : (
                              <span className="blue">&nbsp;{domain}&nbsp;</span>
                            )}
                          </h3>
                          <div>{<CardsHtml />}</div>
                          {lookupData.data?.blacklist_status && (
                            <RecordWarningCompo
                              isError
                              warningText={"We notice you are on a blacklist!"}
                            />
                          )}

                          <div className="tableSection checkedServerTable">
                            <div
                              key={`tableSection_`}
                              className="tableSection__Content mt-4"
                            >
                              <h2>
                                Checked&nbsp;
                                {
                                  Object.keys(
                                    lookupData?.data?.blacklist_servers
                                  ).length
                                }
                                &nbsp;servers
                              </h2>
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>
                                        {toolName === ToolNames.IP
                                          ? "IP"
                                          : "Domain"}
                                      </th>
                                      <th>
                                        Listed?
                                        <InformationTooltip
                                          name="tool_blacklisted_listed"
                                          favIcons="i"
                                          position="bottom"
                                        />
                                      </th>
                                      <th>
                                        List
                                        <InformationTooltip
                                          name="tool_blacklisted_list"
                                          favIcons="i"
                                          position="bottom"
                                        />
                                      </th>
                                      <th>
                                        Categories
                                        <InformationTooltip
                                          name="tool_blacklisted_categories"
                                          favIcons="i"
                                          position="bottom"
                                        />
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Object.keys(
                                      lookupData?.data?.blacklist_servers
                                    ).map((objKey: any, idx3: number) => {
                                      const obj =
                                        lookupData?.data?.blacklist_servers[
                                          objKey
                                        ];
                                      return (
                                        <tr key={`table_tr_${idx3}`}>
                                          <td>
                                            <img
                                              alt="favicon"
                                              className="favIconImage"
                                              loading="lazy"
                                              src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${inputDomain}&size=128`}
                                            />
                                            {inputDomain}
                                          </td>
                                          <td>
                                            <i
                                              className={
                                                !obj.blacklist_status
                                                  ? "fa fa-circle-check colourSuccess"
                                                  : "fa fa-times-circle colourRed"
                                              }
                                              aria-hidden="true"
                                            ></i>
                                            {!obj.blacklist_status
                                              ? "No"
                                              : "Yes"}

                                            {obj.blacklist_status && (
                                              <Button
                                                className="btn-primary-check"
                                                onClick={() => {
                                                  const url = `http://${objKey}`;
                                                  const formattedUrl = new URL(
                                                    url
                                                  ).hostname;
                                                  window.open(
                                                    `http://${formattedUrl}`,
                                                    "_blank"
                                                  );
                                                }}
                                              >
                                                Check now
                                              </Button>
                                            )}
                                          </td>
                                          <td>{objKey}</td>
                                          <td>
                                            {!isEmpty(obj?.categories)
                                              ? obj?.categories.join(", ")
                                              : "N/A"}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {isEmpty(lookupData) && !isEmpty(domain) && (
                        <RecordWarningCompo
                          isError
                          warningText={`No Record Found!`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {toolName === ToolNames.IP ? null : (
                <>{!lookupError && <AllToolsScannerResult domain={domain} />}</>
              )}
              {isWindow ? (
                <ToolsUi
                  toolName={
                    toolName == "blacklist-domain"
                      ? "blacklist_domain"
                      : "blacklist_ip"
                  }
                />
              ) : (
                <></>
              )}
              <TagTable
                result={result}
                domain={domain}
                toolName={toolName}
                toolType={`checker`}
                responseData={lookupData}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
export default BlacklistTool;

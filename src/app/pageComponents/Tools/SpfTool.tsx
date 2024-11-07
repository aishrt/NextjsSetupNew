"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  addSpace,
  cleanDomain,
  formatToolTypes,
  isDomainValid,
  removeHttp,
} from "@/utils/string-conversion";
import { isEmpty } from "@/utils/isEmpty";
import { _TOOL_TYPES } from "@/constants/toolsData";
import Link from "next/link";
import CopyToClipboard from "@/components/Functions/CopyToClipboard";
import { isTokenExpired, postFetcherLambda } from "@/@core/apiFetcher";
import RecordWarningCompo from "@/app/pageComponents/Tools/ui/RecordWarningCompo";
import { scrollIntoView } from "@/utils/scrollIntoView";
import SubmitButton from "@/components/Form/SubmitButton";
import { Tooltip } from "@mui/material";
import TagTable from "@/components/UI/TagTable";
import { createAndClickProgressBar } from "@/@core/createAndClickProgressBar";
import { useSession } from "next-auth/react";
import AllToolsScannerResult from "./ui/AllToolsScannerResult";
import getCurrentUser from "@/lib/session";
import { toast } from "react-toastify";
import AccordionComponent from "./ui/Accordin";

import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import ToolsUi from "@/app/pageComponents/Tools/ToolsUi";
import { removeFirstPart } from "@/@core/helper";

import { validateDomainName } from "@/utils/string-conversion";

import Head from "next/head";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import MainLoader from "@/components/Loaders/MainLoader";
import RecordBox from "@/components/UI/RecordBox";
import { fetchImage } from "@/@core/commonS3";
import { useStore } from "@/utils/store";
import { _IMG } from "@/constants/images";
import Image from "next/image";
const SpfTool = ({
  result,
  toolsId,
  toolType,
  toolName,
  searchParams,
  lookupData,
}: toolPageProps) => {
  const router = useRouter();
  const sParams = useSearchParams();
  const pathName = usePathname();
  const { data: session, status } = useSession();

  const spfLookupErrors = lookupData?.data?.errors;
  const spfLookupWarnings = lookupData?.data?.warnings;

  const domain: string | string[] | undefined =
    removeHttp(searchParams?.domain as string) || "";
  const record: string = removeHttp(searchParams?.record as string) || "";
  if (!isEmpty(lookupData)) {
    scrollIntoView(`${toolName}_resultSection`, 0);
  }
  const [inputDomain, setInputDomain] = useState(cleanDomain(domain));
  const [domainError, setDomainError] = useState(false);

  useEffect(() => {
    setInputDomain(cleanDomain(domain));
  }, [domain]);

  const [spfRecordValue, setSpfRecordValue] = useState("");
  const [generatorData, setGeneratorData] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGenerator, setIsLoadingGenerator] = useState(false);
  const [selectedA, setSelectedA] = useState(true);
  const [selectedMX, setSelectedMX] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [inputRedirect, setInputRedirect] = useState(false);
  const [showScanner, setShowScanner] = useState(true);
  const [field_include, setField_include] = useState([{ value: "" }]);
  const [field_ipv4, setField_ipv4] = useState([]);
  const [field_ipv6, setField_ipv6] = useState([]);
  const [field_a, setField_a] = useState<any>([]);
  const [field_mx, setField_mx] = useState<any>([]);
  const [field_exists, setField_exists] = useState([]);

  const [lookupError, setLookupError] = useState(false);
  const [invalidDomainError, setInvalidDomainError] = useState(false);

  useEffect(() => {
    if (!isEmpty(lookupData)) {
      if (lookupData?.status == false) {
        setLookupError(true);
        setIsLoading(false);
        toast.error(`${lookupData?.message}`);
      }
    }
    setInvalidDomainError(false);
    setIsLoading(false);
  }, [lookupData]);

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

  let numindex = 0;
  const [isWindow, setIsWindow] = useState(true);
  const { subscriptionPlan } = useStore();
  const [IsPremiumPlan, setIsPremiumPlan] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const path = window.location.pathname.includes("/dashboard");
    if (path === true) {
      setIsWindow(false);
    }
  }, []);
  useEffect(() => {
    if (subscriptionPlan && subscriptionPlan == "PREMIUM") {
      setIsPremiumPlan(true);
    }
    checkLogin();
  }, [subscriptionPlan]);

  const checkLogin = async () => {
    const users = await getCurrentUser();
    if (users) {
      const isTokenValid = await isTokenExpired(users.token);
      if (isTokenValid) {
        setIsLoggedIn(true);
      }
    }
  };
  useEffect(() => {
    if (record) setSpfRecordValue(record);
  }, [record]);

  const onCheckLookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    let formDomain = removeHttp(formData.get("domain") as string);

    formDomain = cleanDomain(formDomain);
    const ValidDomainCheck = isDomainValid(formDomain);
    if (!ValidDomainCheck) {
      setDomainError(true);
      setIsLoading(false);
      setInvalidDomainError(true);
      return;
    }
    setDomainError(false);
    setInputDomain(formDomain);
    setIsLoading(false);

    const data = await postFetcherLambda(`/${toolsId}`, {
      domain_name: formDomain,
    });
    if (formDomain) {
      if (validateDomainName(formDomain)) {
        createAndClickProgressBar();
        {
          pathName.includes("dashboard")
            ? router.push(
                `/dashboard/tools/${formatToolTypes(
                  toolsId
                )}-lookup?domain=${formDomain}${
                  data?.data?.record ? "&record=" + data?.data?.record : ""
                }`
              )
            : router.push(
                `/tools/${formatToolTypes(
                  toolsId
                )}-lookup?domain=${formDomain}${
                  data?.data?.record ? "&record=" + data?.data?.record : ""
                }`
              );
        }
      }
    }
    setIsLoading(false);
    setShowScanner(false);
  };

  const onGenerateRecord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoadingGenerator(true);
    try {
      const formData = new FormData(event.currentTarget);
      let formDomain = removeHttp(formData.get("domain") as string);
      formDomain = cleanDomain(formDomain);
      const ValidDomainCheck = isDomainValid(formDomain);
      if (!ValidDomainCheck) {
        setDomainError(true);
        setIsLoading(false);
        setInvalidDomainError(true);
        return;
      }
      setDomainError(false);
      setInputDomain(formDomain);
      const mapValues = (field: any) =>
        field.map((v: any) => v?.value).filter((v: any) => v !== "");

      let postData: any = inputRedirect
        ? {
            domain_name: formDomain,
            include: [],
            ipv4: [],
            ipv6: [],
            a: [],
            mx: [],
            exists: [],
            redirect: formData.get("redirect"),
            // policy: formData.get("policy"),
            api_type: "generator",
          }
        : {
            domain_name: formDomain,
            // include: field_include.map((v: any) => v?.value),
            include: mapValues(field_include),
            ipv4: mapValues(field_ipv4),
            ipv6: mapValues(field_ipv6),
            a: selectedA ? [""] : [],
            mx: selectedMX ? [""] : [],
            exists: mapValues(field_exists),
            redirect: null,
            policy: formData.get("policy"),
            api_type: "generator",
          };

      let newToolId: any = toolsId;
      if ((toolsId = "spf-generator")) {
        newToolId = "spf-lookup";
      }
      const data = await postFetcherLambda(`/${newToolId}/`, postData);
      // @ts-ignore
      setInputDomain(formDomain);

      const data_new = await postFetcherLambda(`/${newToolId}`, {
        domain_name: formDomain,
      });
      if (formDomain) {
        if (validateDomainName(formDomain)) {
          createAndClickProgressBar();
          {
            pathName.includes("dashboard")
              ? router.push(
                  `/dashboard/tools/${formatToolTypes(
                    toolsId
                  )}-generator?domain=${formDomain}${
                    data?.data?.record ? "&record=" + data?.data?.record : ""
                  }&scroll=true`
                )
              : router.push(
                  `/tools/${formatToolTypes(
                    toolsId
                  )}-generator?domain=${formDomain}${
                    data?.data?.record ? "&record=" + data?.data?.record : ""
                  }&scroll=true`
                );
          }
        }
      }
      setGeneratorData(data);
      setInvalidDomainError(false);

      // setSearchState(true);
      setSpfRecordValue(data?.data?.record);
    } catch (error) {
    } finally {
      setIsLoadingGenerator(false);
      // setSearchState(true);
      setShowScanner(false);
    }
  };
  const onRawRecord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoadingGenerator(true);
    try {
      const formData = new FormData(event.currentTarget);
      let formDomain = removeHttp(formData.get("domain") as string);
      formDomain = cleanDomain(formDomain);
      const ValidDomainCheck = isDomainValid(formDomain);
      if (!ValidDomainCheck) {
        setDomainError(true);
        setIsLoading(false);
        setInvalidDomainError(true);
        return;
      }
      setDomainError(false);
      setInputDomain(formDomain);

      let formRaw = removeHttp(formData.get("raw") as string);

      let postData: any = {
        domain_name: formDomain,
        api_type: "row_checker",
        record: formRaw,
      };

      const data = await postFetcherLambda(`/spf-lookup/`, postData);
      // @ts-ignore
      setInputDomain(removeHttp(formDomain as string));
      setGeneratorData(data);
      setSpfRecordValue(data?.data?.record);
      setSearchState(true);
      setInvalidDomainError(false);
      scrollIntoView(`${toolName}_resultSection`, 0);
    } catch (error) {
    } finally {
      setIsLoadingGenerator(false);
      setSearchState(true);
      setShowScanner(false);
    }
  };
  const handleAddField = (type: string) => {
    const newFields = getNewFields(type, true);
    setField(type, newFields);
  };

  const handleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const newFields = getNewFields(type);
    newFields[index].value = e.target.value;
    setField(type, newFields);
  };

  const handleRemoveField = (index: number, type: string) => {
    const newFields = getNewFields(type);
    newFields.splice(index, 1);
    setField(type, newFields);
  };

  const displayBlock = (
    inc: any,
    idx: number,
    value: any,
    designvalue: any
  ) => {
    numindex += 1;
    return (
      // <h1>hello</h1>
      <div
        className="accordion"
        key={`include_top_${idx}`}
        id={`sub-accordionExample_${idx}`}
      >
        <div className={`accordion-item ${designvalue}`}>
          <h2 className="accordion-header" id={`sub-headingOne_${idx}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#sub-collapseOne_${idx}`}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <span className="numbers">{inc?.seq_number}</span>
              <span className="colourBlue">{value}:</span> {inc?.domain}
              <span className="blue-pill">
                {inc?.dns_lookups} NESTED LOOKUPS
              </span>
            </button>
            {inc?.record ? (
              <span className="codeSection">
                {inc?.record} <CopyToClipboard entryText={inc?.record} />
              </span>
            ) : (
              ""
            )}
          </h2>
          <div
            id={`sub-collapseOne_${idx}`}
            className="accordion-collapse collapse show"
            aria-labelledby="sub-headingOne"
            data-bs-parent={`#sub-accordionExample_${idx}`}
          >
            <AccordionComponent
              inc={inc?.parsed?.pass}
              mappingId={numindex}
              IsPremiumPlan={IsPremiumPlan}
              isLoggedIn={isLoggedIn}
              itemIndex={numindex + 1}
            />
            {inc?.parsed?.include?.map((inc: any, inx: number) => {
              return (
                <div key={inx}>
                  {displayBlock(inc, numindex, "include", "ps-4")}
                </div>
              );
            })}
            {inc?.data?.parsed?.redirect &&
              displayBlock(
                inc?.data?.parsed?.redirect,
                numindex,
                "redirect",
                "ps-4"
              )}
          </div>
        </div>
      </div>
    );
  };
  const getNewFields = (type: string, isAdd = false) => {
    if (type === "include") {
      return isAdd ? [...field_include, { value: "" }] : [...field_include];
    } else if (type === "ipv4") {
      return isAdd ? [...field_ipv4, { value: "" }] : [...field_ipv4];
    } else if (type === "ipv6") {
      return isAdd ? [...field_ipv6, { value: "" }] : [...field_ipv6];
    } else if (type === "a") {
      return isAdd ? [...field_a, { value: "" }] : [...field_a];
    } else if (type === "mx") {
      return isAdd ? [...field_mx, { value: "" }] : [...field_mx];
    } else if (type === "exists") {
      return isAdd ? [...field_exists, { value: "" }] : [...field_exists];
    }
    return [...field_include];
  };

  const setField = (type: string, newFields: any) => {
    if (type === "include") {
      setField_include(newFields);
    } else if (type === "ipv4") {
      setField_ipv4(newFields);
    } else if (type === "ipv6") {
      setField_ipv6(newFields);
    } else if (type === "a") {
      setField_a(newFields);
    } else if (type === "mx") {
      setField_mx(newFields);
    } else if (type === "exists") {
      setField_exists(newFields);
    }
  };
  const CardsHtml = ({
    data,
    isGenerator,
  }: {
    data: any;
    isGenerator?: boolean;
  }) => {
    const getClass = (title: string | number, key: string) =>
      title === "Green" ? "success" : "danger";
    // const getClass = (title: string | number, key: string) => ((key === "status" && typeof title === "string" && ["valid"].includes(title.toLowerCase())) || (key === "lookup_count" && typeof title === "number" && title <= 10) || (key === "email_senders" && typeof title === "number" && title > 0)) ? "success" : "danger"
    var lookupArray = [
      "record_existence",
      "status",
      "syntax_validation",
      "lookup_count",
      "void_lookup_count",
      // "spf_version",
      // "redirect_modifier",
      // "exp_modifier",
      "all_mechanism",
    ];

    var generatorArray = [
      "status",
      "syntax_validation",
      "lookup_count",
      "void_lookup_count",
      "record_existence",
      // "spf_version",
      // "redirect_modifier",
      // "exp_modifier",
      "all_mechanism",
    ];
    var table = isGenerator ? generatorArray : lookupArray;

    return (
      <>
        {table.map((val, idx: number) => {
          if (data?.[val]) {
            return (
              <div
                className={
                  isGenerator ? `col-lg-4 col-md-6` : `col-lg-4 col-md-6`
                }
                key={`card_${idx}`}
              >
                <div className="progressCard spfProgressCard">
                  <div className="text-center">
                    <h4>
                      {data?.[val]?.name}
                      {data?.[val]?.name && data?.[val]?.title ? ` : ` : null}
                      {val == "void_lookup_count" ? " :" : null}
                      <b> {data?.[val]?.title}</b>
                    </h4>
                  </div>
                  <div className="progress">
                    <div
                      className={`progress-bar ${getClass(
                        data?.[val]?.color,
                        val
                      )}`}
                      style={{ width: `100%` }}
                    ></div>
                  </div>
                  <p className="overflowScroll">{data?.[val]?.subtitle}</p>
                </div>
              </div>
            );
          }
        })}
      </>
    );
  };

  const EmailSenderTableHtml = ({
    emailSenderArray,
  }: {
    emailSenderArray: any[];
  }) => {
    const [fileSrc, setFileSrc] = useState<(string | null)[]>([]);
    useEffect(() => {
      if (emailSenderArray?.length > 0) {
        const fetchLogos = async () => {
          const promises = emailSenderArray.map(async (item, index) => {
            if (item.email_service_provider_logo) {
              const logoUrl = await fetchImage(
                `/${item.email_service_provider_logo}`,
                null,
                "email-provider"
              );
              return {
                ...item,
                email_service_provider_logo: logoUrl,
              };
            } else {
              return item;
            }
          });
          const updatedArray = await Promise.all(promises);
          setFileSrc(updatedArray);
        };

        fetchLogos();
      }
    }, [emailSenderArray]);

    return (
      <div className="tableSection emailSenders">
        <h6 className="fw-bold fs-4 mt-3">Email Senders</h6>
        <div className="tableSection__Content resultOuterCard mb-5">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>SENDING SOURCE</th>
                  <th># OF LOOKUPS</th>
                  <th>SPF PART</th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(fileSrc) &&
                  fileSrc.map((row: any, idx: number) => {
                    return (
                      <tr key={`email_sender_key_${idx}`}>
                        <td>
                          <span>
                            {row?.email_service_provider_logo ? (
                              <img
                                src={`${row?.email_service_provider_logo}`}
                                loading="lazy"
                                alt="Email Provider Logo"
                              />
                            ) : (
                              <img
                                src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${removeFirstPart(
                                  row?.spf_part
                                )}&size=128`}
                                loading="lazy"
                                alt="Gstatic Image"
                              />
                            )}
                            <span>{row?.sending_source}</span>
                          </span>
                        </td>
                        <td>{row?.of_lookups}</td>
                        <td>{row?.spf_part}</td>
                      </tr>
                    );
                  })}

                {isEmpty(fileSrc) && (
                  <tr>
                    <td colSpan={3} className={`text-center`}>
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  const tabLink = domain
    ? `/tools/${formatToolTypes(toolsId)}-lookup?domain=${domain}${
        record || spfRecordValue ? "&record=" + (record ?? spfRecordValue) : ""
      }`
    : `/tools/${formatToolTypes(toolsId)}-lookup`;
  const tabLinkDashboard = domain
    ? `/dashboard/tools/${formatToolTypes(toolsId)}-lookup?domain=${domain}${
        record || spfRecordValue ? "&record=" + (record ?? spfRecordValue) : ""
      }`
    : `/dashboard/tools/${formatToolTypes(toolsId)}-lookup`;
  const tabLink1 = status === "authenticated" ? tabLinkDashboard : tabLink;
  const tabLinks = domain
    ? `/tools/${formatToolTypes(toolsId)}-generator?domain=${domain}${
        record || spfRecordValue ? "&record=" + (record ?? spfRecordValue) : ""
      }`
    : `/tools/${formatToolTypes(toolsId)}-generator`;

  const tabLinksDashboard = domain
    ? `/dashboard/tools/${formatToolTypes(toolsId)}-generator?domain=${domain}${
        record || spfRecordValue ? "&record=" + (record ?? spfRecordValue) : ""
      }`
    : `/dashboard/tools/${formatToolTypes(toolsId)}-generator`;

  const tabLinks2 = domain
    ? `/tools/${formatToolTypes(toolsId)}-checker?domain=${domain}${
        record || spfRecordValue ? "&record=" + (record ?? spfRecordValue) : ""
      }`
    : `/tools/${formatToolTypes(toolsId)}-checker`;
  const tabsLinksDashboard = domain
    ? `/dashboard/tools/${formatToolTypes(toolsId)}-checker?domain=${domain}${
        record || spfRecordValue ? "&record=" + (record ?? spfRecordValue) : ""
      }`
    : `/dashboard/tools/${formatToolTypes(toolsId)}-checker`;

  const tabLink2 = status === "authenticated" ? tabLinksDashboard : tabLinks;

  const tabLink3 = status === "authenticated" ? tabsLinksDashboard : tabLinks2;

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
        name: "SPF Generator",
        item: "https://yourdmarc.com/tools/spf-generator",
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
        name: "SPF Lookup",
        item: "https://yourdmarc.com/tools/spf-lookup",
      },
    ],
  };
  const calculateNestedDnsLookups = (includes: any[]) => {
    if (includes?.reduce) {
      return (
        includes?.reduce((total: number, includeArray: any) => {
          return total + includeArray?.dns_lookups || 0;
        }, 0) || 0
      );
    } else {
      return 0;
    }
  };
  const [isLoader, setisLoader] = useState(true);
  const TreeLookup = ({ treeData }: { treeData: any }) => {
    return (
      <>
        <div className="tabInnerContet">
          <h5>
            Lookup and check results for
            <span className="blue">&nbsp;{domain}&nbsp;</span>
            domain
          </h5>
          <h6 className="fw-bold fs-4">SPF {toolType} Tree</h6>

          {treeData?.map((item: any, index: any) => {
            return (
              <>
                <div
                  key={index}
                  className="accordion border mt-4 p-2"
                  id="accordionExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${index}`}
                      >
                        {domain}

                        <span className="blue-pill">
                          {item?.dns_lookups || 0} LOOKUPS (
                          {(item?.dns_lookups || 0) -
                            (calculateNestedDnsLookups(item?.parsed?.include) +
                              (item?.parsed?.redirect?.dns_lookups || 0))}{" "}
                          main,{" "}
                          {
                            calculateNestedDnsLookups(item?.parsed?.include) +
                              // calculateNestedDnsLookups(
                              (item?.parsed?.redirect?.dns_lookups || 0)
                            // )
                          }{" "}
                          nested)
                        </span>
                      </button>

                      <span className="codeSection">
                        {item?.record || "No record value found"}
                        {item?.record ? (
                          <CopyToClipboard entryText={item?.record} />
                        ) : (
                          <div className="generateCodeBtn pt-4 text-start">
                            <Link
                              style={{ color: "#fff" }}
                              href={`spf-generator?domain=${domain}`}
                            >
                              <Tooltip title="Generate Record" placement="top">
                                <Image src={_IMG.record} alt="Record" />
                              </Tooltip>
                            </Link>
                          </div>
                        )}
                      </span>
                    </h2>
                    <div
                      id={`collapse-${index}`}
                      className="accordion-collapse collapse show"
                      aria-labelledby={`heading-${index}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {/* {CalculateNestedRecords(
                                      lookupData?.data?.parsed?.pass
                                    )} */}

                        {!isEmpty(item?.parsed?.include) &&
                          item?.parsed?.include?.map(
                            (inc: any, idx: number) => {
                              {
                                return (
                                  <div key={idx}>
                                    {displayBlock(
                                      inc,
                                      inc.seq_number,
                                      "include",
                                      "ps-0"
                                    )}
                                  </div>
                                );
                              }
                            }
                          )}
                        {item?.parsed?.redirect && (
                          <div>
                            {displayBlock(
                              item?.parsed?.redirect,
                              item?.parsed?.redirect.seq_number,
                              // lookupData?.data?.parsed?.redirect,
                              // lookupData?.data?.parsed?.redirect.seq_number,
                              "redirect",
                              "ps-0"
                            )}
                          </div>
                        )}
                        {item?.parsed?.pass?.length ? (
                          <>
                            <AccordionComponent
                              inc={item?.parsed?.pass}
                              mappingId={numindex}
                              IsPremiumPlan={IsPremiumPlan}
                              isLoggedIn={isLoggedIn}
                              itemIndex={numindex + 1}
                            />
                            {/* {setSelectedData(item?.parsed?.pass)} */}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
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
            <div className="generatorSection spfGenerator">
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

                        {toolName == "spf" && (
                          <li
                            className={
                              toolType === _TOOL_TYPES.CHECKER ? "active" : ""
                            }
                          >
                            <Link href={tabLink3}>
                              {formatToolTypes(toolName).toUpperCase()} Raw
                              Checker
                            </Link>
                          </li>
                        )}
                      </ul>

                      <h2>
                        {toolType === _TOOL_TYPES.LOOKUP &&
                          "SPF Record Checker"}
                        {toolType === _TOOL_TYPES.GENERATOR &&
                          "SPF Record Generator"}
                        {toolType === _TOOL_TYPES.CHECKER && "SPF Raw Checker"}
                      </h2>
                      <p>
                        {toolType === _TOOL_TYPES.LOOKUP &&
                          "Quickly check your domain’s SPF record using our tool to ensure it blocks unauthorized senders."}
                        {toolType === _TOOL_TYPES.GENERATOR &&
                          "Create and configure SPF records to protect your domain from unauthorized email sources and enhance email security."}
                        {toolType === _TOOL_TYPES.CHECKER &&
                          "Easily analyzes the raw SPF data from DNS for a more technical inspection"}
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
                                  title={`Check SPF`}
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
                        <div className="spfGenerator__Content">
                          <form onSubmit={onGenerateRecord}>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label>Enter your domain</label>
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
                                </div>
                                {domainError && (
                                  <span className="error">
                                    {" "}
                                    Please enter valid domain
                                  </span>
                                )}
                              </div>

                              <div className="col-lg-12">
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    name="redirect_check"
                                    type="checkbox"
                                    role="switch"
                                    id="Redirect"
                                    value={inputRedirect ? "on" : ""}
                                    onChange={(e) =>
                                      setInputRedirect(e.target.checked)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="Redirect"
                                  >
                                    Use Redirect
                                    <InformationTooltip
                                      name="tool_spf_generator_use_redirect"
                                      favIcons="i"
                                    />
                                  </label>
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="form-group">
                                  {inputRedirect ? (
                                    <div className="valueOuter">
                                      <label>Redirect</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g _spf.google.com mail.zendesk.com"
                                        name="redirect"
                                      />
                                    </div>
                                  ) : (
                                    <>
                                      {selectedA && (
                                        <div className="valueOuter">
                                          <label>A record</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="a"
                                            name="a[]"
                                            disabled
                                          />
                                          <button
                                            type="button"
                                            onClick={() => setSelectedA(false)}
                                          >
                                            <i className="fa-solid fa-trash-can"></i>
                                          </button>
                                        </div>
                                      )}

                                      {selectedMX && (
                                        <div className="valueOuter">
                                          <label>MX record</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="mx"
                                            name="mx[]"
                                            disabled
                                          />
                                          <button
                                            type="button"
                                            onClick={() => setSelectedMX(false)}
                                          >
                                            <i className="fa-solid fa-trash-can"></i>
                                          </button>
                                        </div>
                                      )}
                                      {field_include.map(
                                        (field: any, index) => (
                                          <div
                                            className="valueOuter"
                                            key={`include_${index}`}
                                          >
                                            <label className="includeLabel">
                                              Include
                                              <span className="includeSpan">
                                                <InformationTooltip
                                                  name="tool_spf_generator_include"
                                                  favIcons="i"
                                                />
                                              </span>
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control my-2"
                                              placeholder="Start typing Email Sender name or include value"
                                              name="include[]"
                                              value={field?.value}
                                              onChange={(e) =>
                                                handleChange(
                                                  index,
                                                  e,
                                                  "include"
                                                )
                                              }
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleRemoveField(
                                                  index,
                                                  "include"
                                                )
                                              }
                                            >
                                              <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                          </div>
                                        )
                                      )}
                                      {field_ipv4.map((field: any, index) => (
                                        <div
                                          className="valueOuter"
                                          key={`ipv4_${index}`}
                                        >
                                          <label>IPv4</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g. 10.0.0.1/20 192.168.0.10"
                                            name="ipv4[]"
                                            value={field?.value}
                                            onChange={(e) =>
                                              handleChange(index, e, "ipv4")
                                            }
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleRemoveField(index, "ipv4")
                                            }
                                          >
                                            <i className="fa-solid fa-trash"></i>
                                          </button>
                                        </div>
                                      ))}
                                      {field_ipv6.map((field: any, index) => (
                                        <div
                                          className="valueOuter"
                                          key={`ipv6_${index}`}
                                        >
                                          <label>IPv6</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g. 2001:db8:0:1:1:1:1:1 2404:6800:4000::/36"
                                            name="ipv6[]"
                                            value={field?.value}
                                            onChange={(e) =>
                                              handleChange(index, e, "ipv6")
                                            }
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleRemoveField(index, "ipv6")
                                            }
                                          >
                                            <i className="fa-solid fa-trash"></i>
                                          </button>
                                        </div>
                                      ))}

                                      {field_exists.map((field: any, index) => (
                                        <div
                                          className="valueOuter"
                                          key={`exists_${index}`}
                                        >
                                          <label>Exists</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g. %{i}._spf.example.com"
                                            name="exists[]"
                                            value={field?.value}
                                            onChange={(e) =>
                                              handleChange(index, e, "exists")
                                            }
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleRemoveField(index, "exists")
                                            }
                                          >
                                            <i className="fa-solid fa-trash"></i>
                                          </button>
                                        </div>
                                      ))}

                                      <ul>
                                        <li>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleAddField("include")
                                            }
                                          >
                                            + Include
                                          </button>
                                        </li>
                                        <li>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleAddField("ipv4")
                                            }
                                          >
                                            + IPv4
                                          </button>
                                        </li>

                                        {showMore && (
                                          <>
                                            <li>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleAddField("ipv6")
                                                }
                                              >
                                                + IPv6
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  setSelectedA(!selectedA)
                                                }
                                              >
                                                {selectedA ? "-" : "+"} A
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  setSelectedMX(!selectedMX)
                                                }
                                              >
                                                {selectedMX ? "-" : "+"} MX
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleAddField("exists")
                                                }
                                              >
                                                + Exists
                                              </button>
                                            </li>
                                          </>
                                        )}
                                        <li>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setShowMore(!showMore)
                                            }
                                          >
                                            <i
                                              className={`fa-solid ${
                                                showMore
                                                  ? "fa-angles-left"
                                                  : "fa-angles-right"
                                              }`}
                                            ></i>
                                            {showMore
                                              ? "Show Less"
                                              : "Show More"}
                                          </button>
                                        </li>
                                      </ul>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label>Select Failure Policy</label>
                                  <select
                                    className="form-control"
                                    name="policy"
                                    defaultValue="None"
                                    disabled={inputRedirect}
                                  >
                                    <option value="None">None</option>
                                    <option value="Fail">Fail</option>
                                    <option value="SoftFail">SoftFail</option>
                                    <option value="Neutral">Neutral</option>
                                  </select>
                                  {inputRedirect && (
                                    <span style={{ color: "#f43f5e" }}>
                                      Note: If you are using redirect, the
                                      failure policy should not be chosen.
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <SubmitButton
                                title={`Generate`}
                                isLoading={isLoadingGenerator}
                              />
                            </div>
                          </form>
                        </div>
                      )}
                      {toolType === _TOOL_TYPES.CHECKER && (
                        <form onSubmit={onRawRecord}>
                          <div className="row">
                            <div className="col-lg-8 mx-auto">
                              <div className="form-group ">
                                <label>Domain</label>
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
                                {domainError && (
                                  <span className="error">
                                    {" "}
                                    Please enter valid domain
                                  </span>
                                )}
                                <br />
                                <label>Record Value </label>

                                <textarea
                                  name="raw"
                                  className="form-control mb-4"
                                  placeholder="Please enter record value here"
                                  defaultValue={spfRecordValue}
                                  required
                                  rows={9}
                                />
                                <SubmitButton
                                  title={`Check Raw SPF`}
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
              <div className="generatorSection spfGenerator pt-3">
                <div className="container" ref={targetSectionRef}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div id={`${toolName}_resultSection`} />
                      {toolType === _TOOL_TYPES.LOOKUP &&
                        !lookupError &&
                        !isEmpty(lookupData) && (
                          <div className="generatorSection__Result">
                            <h3 className="justify-content-center mb-5">
                              {toolName.toUpperCase()} lookup results for
                              <span className="blue">&nbsp;{domain}&nbsp;</span>
                              domain
                            </h3>

                            <div className="row">
                              <CardsHtml
                                isGenerator={false}
                                data={lookupData?.data}
                              />
                            </div>

                            <RecordWarningCompo
                              warningText={spfLookupWarnings}
                            />
                            <RecordWarningCompo
                              isError
                              warningText={spfLookupErrors}
                            />
                            <div className="toolsTab pb-0">
                              <div className="container">
                                <div className="row">
                                  <div className="col-xl-12">
                                    {lookupData?.data?.record?.length >
                                    1 ? null : (
                                      <div className="tabInnerContet">
                                        <EmailSenderTableHtml
                                          emailSenderArray={
                                            lookupData?.data?.email_sender
                                          }
                                        />
                                      </div>
                                    )}
                                    <TreeLookup
                                      treeData={lookupData?.data?.spf_list}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
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

                            <div className="row mt-5">
                              <CardsHtml
                                isGenerator
                                data={generatorData?.data}
                              />
                            </div>

                            <div className="toolsTab">
                              <div className="container">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <div className="tabInnerContet">
                                      <EmailSenderTableHtml
                                        emailSenderArray={
                                          generatorData?.data?.email_sender
                                        }
                                      />
                                    </div>
                                    <h3 className="mb-2 mt-0">
                                      Publish SPF record to your DNS zone.
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
                                        Create a new <span>TXT record</span>{" "}
                                        with the provided data.
                                      </li>
                                    </ul>

                                    <RecordBox
                                      heading={`${toolName.toUpperCase()} Record`}
                                      subHead1={"Host"}
                                      subHead2={"Type"}
                                      subHead3={"Value"}
                                      text1={inputDomain}
                                      text2={"TXT"}
                                      text3={generatorData?.data?.record}
                                    />

                                    <TreeLookup
                                      treeData={generatorData?.data?.spf_list}
                                    />
                                  </div>
                                </div>
                              </div>
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
                      {toolType === _TOOL_TYPES.CHECKER &&
                        !isEmpty(generatorData) && (
                          <div className="generatorSection__Result">
                            <h3>
                              Generated results for
                              {!!inputDomain && <>&nbsp;{inputDomain}&nbsp;</>}
                              domain
                            </h3>

                            <div className="row mt-5">
                              <CardsHtml
                                isGenerator
                                data={generatorData?.data}
                              />
                            </div>

                            <div className="toolsTab">
                              <div className="container">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <div className="tabInnerContet">
                                      <EmailSenderTableHtml
                                        emailSenderArray={
                                          generatorData?.data?.email_sender
                                        }
                                      />
                                    </div>

                                    <TreeLookup
                                      treeData={generatorData?.data?.spf_list}
                                    />
                                  </div>
                                </div>
                              </div>
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
                    </div>
                  </div>
                </div>
              </div>

              {toolType === _TOOL_TYPES.LOOKUP && !lookupError && (
                <div className="mt-5">
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
export default SpfTool;

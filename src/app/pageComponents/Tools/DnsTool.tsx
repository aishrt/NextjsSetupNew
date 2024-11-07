"use client";
import ToolsUi from "@/app/pageComponents/Tools/ToolsUi";
import {
  cleanDomain,
  formatToolTypes,
  isDomainValid,
  removeHttp,
  removeSpace,
} from "@/utils/string-conversion";
import { isEmpty } from "@/utils/isEmpty";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  _DNS_ARRAY,
  _DNS_TABLE_COLUMN,
  _TOOL_TYPES,
  toolsData,
  toolsDescription,
} from "@/constants/toolsData";

import { useRouter, usePathname } from "next/navigation";
import RecordWarningCompo from "@/app/pageComponents/Tools/ui/RecordWarningCompo";
import {
  addUniqueItem,
  removeIfExists,
  removeItemByValue,
} from "@/utils/array-conversion";
import DashboardCard from "@/app/pageComponents/Dashboard/DashboardCard";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SubmitButton from "@/components/Form/SubmitButton";
import TagTable from "@/components/UI/TagTable";
import { createAndClickProgressBar } from "@/@core/createAndClickProgressBar";
import { useSession } from "next-auth/react";
import AllToolsScannerResult from "./ui/AllToolsScannerResult";
import IpInfoComponent from "../Dashboard/IpInfoComponent";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import Head from "next/head";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import MainLoader from "@/components/Loaders/MainLoader";
import Image from "next/image";
const DnsTool = ({
  result,
  toolsId,
  toolName,
  searchParams,
  lookupData,
}: DnsPageProps) => {
  const router = useRouter();
  const domain: string | string[] | undefined =
    removeHttp(searchParams?.domain as string) || "";
  const { data: session, status } = useSession();

  const [error, setError] = useState<string>("");
  const [isWindow, setIsWindow] = useState(true);
  const [domainError, setDomainError] = useState(false);

  const dnsServer: string | string[] | undefined =
    searchParams?.dns_server || "";
  const dnsType: string = !isEmpty(searchParams?.dns_type)
    ? searchParams?.dns_type
    : toolName.toUpperCase() === "DNS"
    ? _DNS_ARRAY.join(",") // not included "SRV", "CAA", "DS", "DNSKEY"
    : toolName.toUpperCase();
  const tempArrayDns = !isEmpty(dnsType) ? dnsType.split(",") : [];
  const [inputDnsType, setInputDnsType] = useState(tempArrayDns.join(","));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.includes("/dashboard");
    if (path === true) {
      setIsWindow(false);
    }
  }, []);
  const [selectedDns, setSelectedDns] = useState("");
  useEffect(() => {
    if (toolName && toolName.toUpperCase() != "DNS") {
      setSelectedDns(toolName.toUpperCase());
    }
  }, []);
  const [toolData, setToolData] = useState<
    (typeof toolsDescription)[keyof typeof toolsDescription] | null
  >(null);

  useEffect(() => {
    const matchedTool =
      toolsDescription[toolName as keyof typeof toolsDescription];
    if (matchedTool) {
      setToolData(matchedTool);
    }
  }, [toolName]);
  const pathname = usePathname();

  const [searchState, setSearchState] = useState<boolean>(false);
  const targetSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetSectionRef.current) {
      setSearchState(false);
      const offsetTop = targetSectionRef.current.offsetTop;
      const scrollToPosition = offsetTop - 80;
      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      setSearchState(false);
    }
  }, [searchState, lookupData, targetSectionRef]);

  const [inputDomain, setInputDomain] = useState(removeHttp(domain));

  useEffect(() => {
    setInputDomain(removeHttp(domain));
  }, [domain]);

  const onCheckLookup = async (event: FormEvent<HTMLFormElement>) => {
    setSearchState(false);

    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const formDomain = removeHttp(formData.get("domain") as string);
    const ValidDomainCheck = isDomainValid(formDomain);
    if (!ValidDomainCheck) {
      setDomainError(true);
      setIsLoading(false);
      return;
    }
    setDomainError(false);
    setInputDomain(formDomain);

    const formDnsServer = formData.get("dns_server");

    const formDnsType = removeIfExists(formData.getAll("dns_type"), "All").join(
      ","
    );
    if (isEmpty(inputDnsType)) {
      let check = _DNS_ARRAY?.includes(formDomain);
      if (check == false) {
        const temToolId = inputDnsType.split(",").length > 1 ? "dns" : toolsId;

        {
          status == "authenticated"
            ? router.push(
                `/dashboard/tools/${formatToolTypes(temToolId)}-lookup`
              )
            : router.push(`/tools/${formatToolTypes(temToolId)}-lookup`);
        }
      }
      setError("Please Select DNS type");
      setIsLoading(false);

      return false;
    }
    if (inputDnsType && formDomain) {
      // if (validateDomainName(formDomain)) {
      const queryDnsServer = formDnsServer
        ? `&dns_server=${formDnsServer}`
        : ``;
      const queryDnsType = formDnsType ? `&dns_type=${formDnsType}` : ``;
      const temToolId = inputDnsType.split(",").length > 1 ? "dns" : toolsId;
      createAndClickProgressBar();
      {
        status == "authenticated"
          ? router.push(
              `/dashboard/tools/${formatToolTypes(
                temToolId
              )}-lookup?domain=${formDomain}${queryDnsServer}${queryDnsType}`
            )
          : router.push(
              `/tools/${formatToolTypes(
                temToolId
              )}-lookup?domain=${formDomain}${queryDnsServer}${queryDnsType}`
            );
      }
      // }
    }
    setError("");
    setIsLoading(false);
    // setSearchState(true);
  };

  const onChangeDns = (event: ChangeEvent<HTMLInputElement>) => {
    const dnsName = event.currentTarget.value;
    const isChecked = event.currentTarget.checked;
    if (dnsName.toUpperCase() === "ALL" && isChecked) {
      setInputDnsType(_DNS_ARRAY.join(","));
    } else if (dnsName.toUpperCase() === "ALL" && !isChecked) {
      setInputDnsType("");
    } else if (isChecked) {
      const tempArray = !isEmpty(inputDnsType) ? inputDnsType.split(",") : [];
      addUniqueItem(tempArray, dnsName);
      if (tempArray.length && _DNS_ARRAY.length - 1 === tempArray.length) {
        addUniqueItem(tempArray, "All");
      }
      setInputDnsType(tempArray.join(","));
    } else if (!isChecked) {
      let tempArray = inputDnsType.split(",");
      tempArray = [...removeItemByValue(tempArray, dnsName)];

      if (tempArray.length && _DNS_ARRAY.length !== tempArray.length) {
        tempArray = [...removeItemByValue(tempArray, "All")];
      }

      setInputDnsType(tempArray.join(","));
    }
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
        name: "TXT Lookup",
        item: "https://yourdmarc.com/tools/txt-lookup",
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
        name: "CNAME Lookup",
        item: "https://yourdmarc.com/tools/cname-lookup",
      },
    ],
  };

  const script3 = {
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
        name: "AAAA Lookup",
        item: "https://yourdmarc.com/tools/aaaa-lookup",
      },
    ],
  };

  const script4 = {
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
        name: "MX Lookup",
        item: "https://yourdmarc.com/tools/mx-lookup",
      },
    ],
  };

  const script5 = {
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
        name: "DNS Lookup",
        item: "https://yourdmarc.com/tools/dns-lookup",
      },
    ],
  };

  const script6 = {
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
        name: "A Lookup",
        item: "https://yourdmarc.com/tools/a-lookup",
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
        name: "DNSKEY Lookup",
        item: "https://yourdmarc.com/tools/dnskey-lookup",
      },
    ],
  };

  const script7 = {
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
        name: "DS Lookup",
        item: "https://yourdmarc.com/tools/ds-lookup",
      },
    ],
  };

  const script8 = {
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
        name: "SRV Lookup",
        item: "https://yourdmarc.com/tools/srv-lookup",
      },
    ],
  };

  const script9 = {
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
        name: "SOA Lookup",
        item: "https://yourdmarc.com/tools/soa-lookup",
      },
    ],
  };

  const script10 = {
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
        name: "PTR Lookup",
        item: "https://yourdmarc.com/tools/ptr-lookup",
      },
    ],
  };

  const script11 = {
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
        name: "PTR Lookup",
        item: "https://yourdmarc.com/tools/ptr-lookup",
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData2) }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script2) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script3) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script4) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script5) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script6) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script7) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script8) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script9) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script10) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(script11) }}
          />

          <div className="blueBg mb-3">
            <div className="generatorSection">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="generatorSection__Content">
                      <h2>{toolName.toUpperCase()} Records Lookup</h2>
                      <p>{toolData?.title}</p>

                      <form onSubmit={onCheckLookup} id="dns_lookup_formId">
                        <div className="row mt-5">
                          <div className="col-6">
                            <div className="form-group">
                              <label>
                                Domain or IP :
                                <InformationTooltip
                                  name="tool_domain_or_ip"
                                  favIcons="i"
                                />
                                {/* <span className="tooltipOuter">
                              <Image
                                src="/assets/images/infoIcon.svg"
                                alt=""
                                loading="lazy"
                              />
                              <span className="tooltip dnsTooltip">
                                <p>Enter Domain name or IP Address</p>
                              </span>
                            </span> */}
                                {/* <Tooltip title="info" placement="right">
                          </Tooltip> */}
                              </label>
                              {/* <input
                                type="text"
                                name="domain"
                                className="form-control"
                                placeholder="e.g. example.com or 1.2.3.4"
                                defaultValue={domain}
                                required
                              /> */}

                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. example.com or 1.2.3.4"
                                name="domain"
                                value={inputDomain}
                                onChange={(e) => setInputDomain(e.target.value)}
                                required
                              />
                              {domainError && (
                                <span className="error">
                                  {" "}
                                  Please enter valid domain or IP
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label>
                                DNS server:
                                <InformationTooltip
                                  name="tool_dns_server"
                                  favIcons="i"
                                />
                                {/* <span className="tooltipOuter">
                              <Image
                                src="/assets/images/infoIcon.svg"
                                alt=""
                                loading="lazy"
                              />
                              <span className="tooltip dnsTooltip">
                                <p>Select the DNS server used for lookup</p>
                              </span>
                            </span> */}
                                {/* <Tooltip title="info" placement="right">
                          </Tooltip> */}
                              </label>
                              <select
                                className="form-control selectDropdown"
                                name="dns_server"
                                defaultValue={dnsServer}
                              >
                                <option value="8.8.8.8">Google</option>
                                <option value="1.1.1.1">CloudFlare</option>
                                <option value="9.9.9.9">Quad9</option>
                                <option value="208.67.222.222">OpenDNS</option>
                              </select>
                            </div>
                          </div>
                          {pathname == "/dashboard/tools/dns-lookup" ? (
                            <div className="col-12 mx-auto d-flex justify-content-between">
                              {_DNS_ARRAY.map(
                                (dnsName: string, idx: number) => {
                                  return (
                                    <div
                                      key={`dns_key_${idx}`}
                                      className="form-group"
                                    >
                                      <input
                                        name="dns_type"
                                        className="form-check-input dns_type"
                                        type="checkbox"
                                        value={dnsName}
                                        id={`dns_type_id_${idx}`}
                                        disabled={
                                          !!selectedDns &&
                                          selectedDns !== dnsName
                                        }
                                        checked={inputDnsType
                                          .split(",")
                                          ?.includes(dnsName)}
                                        onChange={(event) => onChangeDns(event)}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`dns_type_id_${idx}`}
                                      >
                                        &nbsp; {dnsName}
                                      </label>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div className="col-12 mx-auto d-flex justify-content-between">
                              {_DNS_ARRAY.map(
                                (dnsName: string, idx: number) => {
                                  return (
                                    <div
                                      key={`dns_key_${idx}`}
                                      className="form-group"
                                    >
                                      <input
                                        name="dns_type"
                                        className="form-check-input dns_type"
                                        type="checkbox"
                                        value={dnsName}
                                        id={`dns_type_id_${idx}`}
                                        disabled={
                                          !!selectedDns &&
                                          selectedDns !== dnsName
                                        }
                                        checked={inputDnsType
                                          .split(",")
                                          ?.includes(dnsName)}
                                        // onChange={(event) => onChangeDns(event)}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`dns_type_id_${idx}`}
                                      >
                                        &nbsp; {dnsName}
                                      </label>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}

                          {error && (
                            <div
                              className="error-message"
                              style={{ color: "red" }}
                            >
                              {error}
                            </div>
                          )}
                          <div className="col-lg-12 mx-auto d-flex justify-content-end">
                            <div className="form-group checkerGroup">
                              <SubmitButton
                                title={`Lookup DNS`}
                                isLoading={isLoading}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="generatorSection" ref={targetSectionRef}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div id={`${toolName}_resultSection`} />
                  {!isEmpty(lookupData?.data) && (
                    <div className="generatorSection__Result mt-0">
                      <h3 className="justify-content-center mb-5 mt-0">
                        {toolName.toUpperCase()} lookup results for
                        <span className="blue">&nbsp;{domain}&nbsp;</span>
                        domain
                      </h3>

                      {Object?.keys(lookupData?.data).map(
                        (key: string, idx: number) => {
                          if (
                            !isEmpty(lookupData.data[key]) &&
                            (isEmpty(dnsType) ||
                              dnsType.split(",").includes(key))
                          ) {
                            return (
                              <>
                                <div
                                  className="dnsTableOuter resultOuterCard"
                                  key={idx}
                                >
                                  <DashboardCard
                                    keys={true}
                                    title={key}
                                    key={`tableSection_${key}${idx}`}
                                  >
                                    <Box sx={{ overflow: "auto" }}>
                                      <Box
                                        sx={{
                                          width: "100%",
                                          display: "table",
                                          tableLayout: "fixed",
                                        }}
                                      >
                                        <Table
                                          sx={{
                                            whiteSpace: "nowrap",
                                            borderCollapse: "separate",
                                            borderSpacing: "0px 8px",
                                          }}
                                        >
                                          <TableHead
                                            sx={{
                                              backgroundColor: "#f5f5f5",
                                              fontWeight: "800",
                                              textTransform: "uppercase",
                                            }}
                                          >
                                            <TableRow>
                                              {_DNS_TABLE_COLUMN[key].map(
                                                (
                                                  thKey: string,
                                                  idx2: number
                                                ) => {
                                                  return (
                                                    <TableCell
                                                      key={`th_key_${idx2}`}
                                                    >
                                                      <Typography
                                                        variant="subtitle2"
                                                        fontWeight={600}
                                                      >
                                                        {thKey}
                                                        {thKey == "Type" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_type"
                                                            position="right2"
                                                          />
                                                        )}
                                                        {thKey == "Name" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_name"
                                                            position="bottom"
                                                          />
                                                        )}
                                                        {thKey ==
                                                          "IP Address" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_ipaddress"
                                                            position="bottom"
                                                          />
                                                        )}
                                                        {thKey == "TTL" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_ttl"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey ==
                                                          "Mail Server" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_mail_server"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey ==
                                                          "Priority" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_priority"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey == "Content" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_content"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey ==
                                                          "Primary Name Server" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_primary_name_server"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey ==
                                                          "Responsible Email" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_responsible_email"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey == "Serial" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_serial"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey == "Refresh" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_refresh"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey == "Expire" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_expiry"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey == "Retry" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_retry"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey == "Min TTL" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_main_ttl"
                                                            position="left2"
                                                          />
                                                        )}
                                                        {thKey ==
                                                          "Name Server" && (
                                                          <InformationTooltip
                                                            name="tool_dns_table_name_server"
                                                            position="left2"
                                                          />
                                                        )}
                                                      </Typography>
                                                    </TableCell>
                                                  );
                                                }
                                              )}
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {lookupData.data[key].map(
                                              (item: any, idx3: number) => {
                                                return (
                                                  <TableRow
                                                    key={`table_tr_${idx3}`}
                                                    sx={{
                                                      boxShadow:
                                                        "0 0 5px 0 rgba(0,0,0,.08), 0 0 1px 0 rgba(0,0,0,.08)",
                                                    }}
                                                  >
                                                    {_DNS_TABLE_COLUMN[key].map(
                                                      (
                                                        columnName: string,
                                                        idx4: number
                                                      ) => {
                                                        const fieldName =
                                                          removeSpace(
                                                            columnName
                                                          );
                                                        const val = !isEmpty(
                                                          item[fieldName]
                                                        )
                                                          ? item[fieldName]
                                                          : "-";
                                                        return (
                                                          <TableCell
                                                            key={`td_key_${idx4}`}
                                                          >
                                                            <Typography
                                                              sx={{
                                                                fontSize:
                                                                  "15px",
                                                                fontWeight:
                                                                  "500",
                                                              }}
                                                            >
                                                              {idx4 == 1 && (
                                                                <img
                                                                  alt="Fav icons"
                                                                  className="favIconImage"
                                                                  loading="lazy"
                                                                  src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${val}&size=128`}
                                                                />
                                                              )}
                                                              {columnName ==
                                                              "IP Address" ? (
                                                                <IpInfoComponent
                                                                  ipAddress={
                                                                    val
                                                                  }
                                                                />
                                                              ) : (
                                                                val
                                                              )}
                                                            </Typography>
                                                          </TableCell>
                                                        );
                                                      }
                                                    )}
                                                  </TableRow>
                                                );
                                              }
                                            )}
                                          </TableBody>
                                        </Table>
                                      </Box>
                                    </Box>
                                  </DashboardCard>
                                </div>
                                <div className="cardDivider"></div>
                              </>
                            );
                          } else if (
                            isEmpty(dnsType) ||
                            dnsType.split(",").includes(key)
                          ) {
                            return (
                              <>
                                <div className="dnsTableOuter resultOuterCard">
                                  <DashboardCard
                                    title={key}
                                    key={`tableSection_${key}${idx}`}
                                  >
                                    <Box sx={{ overflow: "auto" }}>
                                      <Box
                                        sx={{
                                          width: "100%",
                                          display: "table",
                                          tableLayout: "fixed",
                                        }}
                                      >
                                        <Table
                                          sx={{
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          <TableBody>
                                            <p className="noRecord">
                                              Record Not Found!
                                            </p>
                                          </TableBody>
                                        </Table>
                                      </Box>
                                    </Box>
                                  </DashboardCard>
                                </div>
                                <div className="cardDivider"></div>
                              </>
                            );
                          }
                        }
                      )}
                      <RecordWarningCompo warningText={lookupData?.Warning} />
                      <RecordWarningCompo
                        isError
                        warningText={lookupData?.data?.errors}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <AllToolsScannerResult
            // data={result}
            domain={domain}
          />
          {isWindow ? <ToolsUi toolName={toolName} /> : <></>}
          <TagTable
            result={result}
            domain={domain}
            toolName={toolName}
            toolType={"lookup"}
            responseData={lookupData}
          />
        </>
      )}
    </>
  );
};
export default DnsTool;

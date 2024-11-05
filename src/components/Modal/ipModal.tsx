"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal"; // Import Modal from Material-UI
import Box from "@mui/material/Box";

import {
  fetchIpDetails,
  getFetcherWithAuth,
  isTokenExpired,
} from "@/@core/apiFetcher";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import { useStore } from "@/utils/store";

import getCurrentUser from "@/lib/session";
import { signOut } from "next-auth/react";
import { isEmpty } from "@/utils/isEmpty";
import { useRouter } from "next/navigation";
import InformationTooltip from "@/components/InformationTooltip";import EmailButton from "../EmailButton";
import Donutchart from "@/components/Donutchart";
import dayjs from "dayjs";
import { getLicenseData } from "@/@core/apiFetcher";
import IPLoader from "../ui/Loaders/IPLoader";
import { createQueryString } from "@/@core/tableFunctions";
import { API_ROUTES } from "@/@core/apiRoutes";

const LinkOpenButton = dynamic(() => import("@/components/LinkOpenButton"), {
  ssr: false,
});
// const score = { slice1: 10, slice2: 20, slice3: 30 };
const score = 60;

const GoogleleafletMap = dynamic(
  () => import("@/app/pageComponents/Dashboard/GoogleleafletMap"),
  {
    ssr: false,
  }
);
interface ModalEbookProps {
  isOpen: boolean;
  setIsOpen: any;
  Ip: any;
  handleClose: () => void;
}
interface FormState {
  name: string;
  email: string;
}

const Ipmodal: React.FC<ModalEbookProps> = ({
  isOpen,
  setIsOpen,
  Ip,
  handleClose,
}) => {
  const { license } = useStore();
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const userFromLocalStorage = localStorage.getItem("user");
      const users = userFromLocalStorage
        ? JSON.parse(userFromLocalStorage)
        : null;
      if (isEmpty(users) || isEmpty(users.token)) {
        setIsUser(false);
      } else {
        setIsUser(true);
      }
    };
    fetchData();
  }, [Ip]);
  const manageChangePlan = async () => {
    setIsLoading(true);
    if (license?.stripe_customer_id) {
      fetch("https://api.stripe.com/v1/billing_portal/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_KEY}`,
        },
        body: `customer=${license?.stripe_customer_id}&return_url=${process?.env?.NEXT_PUBLIC_URL}/dashboard/dashboard`,
      })
        .then((response) => response.json())
        .then((data) => {
          const url = data.url;
          router.push(url);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } else {
      const newUrl = "/dashboard/pricing";
      router.push(newUrl);
    }
  };

  const fixDate = (dateVal: any) => {
    const formattedDate = dayjs(dateVal).format("MMMM D, YYYY h:mm A");
    return formattedDate;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataLoader, setDataLoader] = useState(true);
  const [data, setData] = useState<any>(null);
  const mapData: any = [];
  const [map, setMap] = useState([]);

  // const getData = async () => {
  //   let response = await fetchIpDetails(Ip);
  //   let data1 = response?.data;
  //   let responseData = {
  //     flagIcon: data1?.country_code,
  //     Failure: data1?.failure_count,
  //     TotalEmai: data1?.total_count,
  //     ipAddress: data1?.ip,
  //     Compliant: data1?.total_pass,
  //     id: data1?.id,
  //     title: data1?.city,
  //     name: data1?.country_name,
  //     coordinates: {
  //       lat: parseInt(data1?.latitude),
  //       lng: parseInt(data1?.longitude),
  //     },
  //   };
  //   mapData.push(responseData);
  //   setMap(mapData);
  //   setData(data1);
  //   setDataLoader(false);
  // };

  const getData = async () => {
    let url = `${API_ROUTES.GEO_LOOKUP_BY_IP}?ip_address=${Ip}`;
    const userFromLocalStorage = localStorage.getItem("user");
    const users = userFromLocalStorage
      ? JSON.parse(userFromLocalStorage)
      : null;

    if (!users || !users.token) {
      signOut({ callbackUrl: "/" });
      return null;
    }

    let headers: any = {
      "Content-Type": "application/json",
    };

    if (!isEmpty(users) && !isEmpty(users?.token)) {
      headers["Authorization"] = `Bearer ${users?.token}`;
    }

    let resData: any = {};
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
        {
          method: "GET",
          headers,
          next: {
            revalidate: 0,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      resData = await res.json();
    } catch (error) {
      console.error("Fetch error:", error);
    }

    let data1 = resData?.data;
    let responseData = {
      flagIcon: data1?.country_code,
      Failure: data1?.failure_count,
      TotalEmai: data1?.total_count,
      ipAddress: data1?.ip,
      Compliant: data1?.total_pass,
      id: data1?.id,
      title: data1?.city,
      name: data1?.country_name,
      coordinates: {
        lat: parseInt(data1?.latitude),
        lng: parseInt(data1?.longitude),
      },
    };

    mapData.push(responseData);
    setMap(mapData);
    setData(data1);
    setDataLoader(false);
  };

  useEffect(() => {
    if (Ip) {
      getData();
    }
  }, [Ip]);
  function parseJsonString(whoisString: any) {
    const result: { [key: string]: string } = {};
    const lines = whoisString?.split("\n");
    lines?.forEach((line: any) => {
      if (line.trim() === "") return;
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length > 0) {
        const value = valueParts.join(":").trim();
        result[key.trim()] = value;
      }
    });
    const newData = result?.RegDate ? result?.RegDate : "N/A";
    return newData;
  }

  function convertUnixToDate(unixTimestamp: any) {
    let formattedDate: any;
    if (unixTimestamp) {
      const date = new Date(unixTimestamp * 1000);
      formattedDate = date.toLocaleDateString(); // Default formatting
    } else {
      formattedDate = "N/A";
    }
    return formattedDate;
  }

  function parseJsonStringNw(whoisString: string) {
    let response: any;
    if (whoisString) {
      let resultTable = "<table border='1' style='border-collapse: collapse;'>";
      const lines = whoisString?.split("\n");
      lines?.forEach((line: string) => {
        if (line.trim() === "") return;
        const [key, ...valueParts] = line.split(":");
        if (key && valueParts.length > 0) {
          let value = valueParts.join(":").trim();
          if (key.trim() === "last_analysis_date") {
            const unixTimestamp = parseInt(value, 10);
            value = convertUnixToDate(unixTimestamp);
          }
          resultTable += `<tr><td><strong>${key.trim()}:</strong></td><td>${value}</td></tr>`;
        }
      });
      resultTable += "</table>";
      response = resultTable.trim();
    } else {
      response = "Whois data not found";
    }
    return response;
  }
  return (
    <>
      {license?.ip_source_monitoring && isUser ? (
        <div>
          <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="ebookModal ipModal">
              <span>
                <button className="btn closeModal" onClick={handleClose}>
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              </span>
              <div className="ipModalContent">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="text-center">
                      <p>IP address details</p>
                      <h2>{Ip}</h2>
                      <p className="country">
                        {data?.country_code ? (
                          <span
                            className={`favIconImage align-middle fi fi-${data?.country_code?.toLowerCase()}`}
                          ></span>
                        ) : null}
                        {data?.country_name ? data?.country_name : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 iptabs my-3">
                    <ul className="nav nav-underline" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="home-tab-pane"
                          aria-selected="true"
                        >
                          Summary
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="contact-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#contact-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="contact-tab-pane"
                          aria-selected="false"
                        >
                          Geolocation
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="asn-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#asn-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="asn-tab-pane"
                          aria-selected="false"
                        >
                          ASN
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="abuse-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#abuse-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="abuse-tab-pane"
                          aria-selected="false"
                        >
                          Abuse
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="security-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#security-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="security-tab-pane"
                          aria-selected="false"
                        >
                          Security
                        </button>
                      </li>
                    </ul>
                    {dataLoader ? (
                      <IPLoader />
                    ) : (
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="home-tab-pane"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="summarytab">
                            <table className="table table-striped">
                              <tbody>
                                <tr>
                                  <td>Ip Address</td>
                                  <td> {data?.ip ? data?.ip : "N/A"}</td>
                                </tr>
                                <tr>
                                  <td>Ip Version</td>
                                  <td>
                                    {data?.version ? data?.version : "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ip Range</td>
                                  <td>
                                    {data?.ipbase_response?.connection?.range
                                      ? data?.ipbase_response?.connection?.range
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Isp</td>
                                  <td>
                                    {data?.ipbase_response?.connection?.isp
                                      ? data?.ipbase_response?.connection?.isp
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Range type</td>
                                  <td>
                                    {data?.ipbase_response?.range_type?.type
                                      ? data?.ipbase_response?.range_type?.type
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Registration Date</td>
                                  <td>
                                    <>
                                      {parseJsonString(
                                        data?.virutotal_response?.attributes
                                          ?.whois
                                      )}
                                    </>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Reverse DNS Hostname</td>
                                  <td>
                                    <>
                                      {data?.reverse_dns?.result?.length > 0
                                        ? data?.reverse_dns?.result[0]
                                          ? data?.reverse_dns?.result[0]
                                          : "N/A"
                                        : "N/a"}
                                    </>
                                  </td>
                                </tr>
                                <tr>
                                  <td>RIR Registration</td>
                                  <td>
                                    {data?.abuse?.authoritative_rir
                                      ? data?.abuse?.authoritative_rir
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ip type</td>
                                  <td>
                                    {data?.ipinfo_response?.asn?.type
                                      ? data?.ipinfo_response?.asn?.type
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Base Domain</td>
                                  <td>
                                    {data?.base_domain
                                      ? data?.base_domain
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Hostname</td>
                                  <td>
                                    {data?.host_name ? data?.host_name : "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Created At</td>
                                  <td>
                                    {data?.created_at
                                      ? fixDate(data?.created_at)
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Updated At</td>
                                  <td>
                                    {data?.updated_at
                                      ? fixDate(data?.updated_at)
                                      : "N/A"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="contact-tab-pane"
                          role="tabpanel"
                          aria-labelledby="contact-tab"
                        >
                          <div className="row">
                            <div className="col-lg-6">
                              <table className="table table-bordered">
                                <tbody>
                                  <tr>
                                    <td>Latitude </td>
                                    <td>
                                      {data?.latitude ? data?.latitude : "N/A"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Longitude </td>
                                    <td>
                                      {data?.longitude
                                        ? data?.longitude
                                        : "N/A"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Continent Code</td>
                                    <td>
                                      {data?.continent_code
                                        ? data?.continent_code
                                        : "N/A"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Country</td>
                                    <td>
                                      <span
                                        className={`favIconImage align-middle fi fi-${data?.country_code?.toLowerCase()}`}
                                      ></span>
                                      {data?.country_name
                                        ? data?.country_name
                                        : "N/A"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Region</td>
                                    <td>
                                      {data?.region ? data?.region : "N/A"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>City</td>
                                    <td> {data?.city ? data?.city : "N/A"}</td>
                                  </tr>
                                  <tr>
                                    <td>Postal </td>
                                    <td>
                                      {data?.ipinfo_response?.postal
                                        ? data?.ipinfo_response?.postal
                                        : "N/A"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>In Eu</td>
                                    {data?.in_eu == true
                                      ? "True"
                                      : data?.in_eu == false
                                      ? "False"
                                      : "N/A"}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col-lg-6">
                              <div className="card">
                                <div className="card-header text-start">
                                  <h3>
                                    Where are emails sent from?
                                    <InformationTooltip name="map_where_email_sent_from" />
                                  </h3>
                                </div>
                                <div className="card-body">
                                  <div className="row mapHeightgeo">
                                    <section>
                                      {map.length > 0 && (
                                        <GoogleleafletMap
                                          mapData={map}
                                          from="tab"
                                        />
                                      )}
                                    </section>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="asn-tab-pane"
                          role="tabpanel"
                          aria-labelledby="asn-tab"
                        >
                          <div className="companytab">
                            <div className="companyApiSection">
                              <div className="row">
                                <div className="col-lg-5">
                                  <div className="content">
                                    <img
                                      src="/assets/images/companyIcon.svg"
                                      loading="lazy"
                                    />
                                    <h4>ASN Data </h4>
                                    <p>
                                      View website traffic from a different
                                      point of view. Our API provides customers
                                      with firmographics data on the companies
                                      behind IP traffic.
                                    </p>
                                  </div>
                                </div>
                                <div className="col-lg-7">
                                  <table className="table table-bordered">
                                    <tbody>
                                      <tr>
                                        <td>ASN</td>
                                        <td>
                                          {data?.ipinfo_response?.asn?.asn
                                            ? data?.ipinfo_response?.asn?.asn
                                            : "N/A"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>ASN Name</td>
                                        <td>
                                          {data?.ipinfo_response?.asn?.name
                                            ? data?.ipinfo_response?.asn?.name
                                            : "N/A"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Organization Name</td>
                                        <td>
                                          {data?.ipinfo_response?.org
                                            ? data?.ipinfo_response?.org
                                            : "N/A"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Domain</td>
                                        <td>
                                          {data?.ipinfo_response?.asn?.domain
                                            ? data?.ipinfo_response?.asn?.domain
                                            : "N/A"}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="abuse-tab-pane"
                          role="tabpanel"
                          aria-labelledby="abuse-tab"
                        >
                          <div className="companytab">
                            <div className="companyApiSection">
                              <div className="row">
                                <div className="col-lg-5">
                                  <div className="content">
                                    <img
                                      src="/assets/images/flag-Icon.svg"
                                      loading="lazy"
                                    />
                                    <h4>Abuse Contact Data for IP Addresses</h4>
                                    <p>
                                      Our abuse contact API returns data
                                      containing information belonging to the
                                      abuse contact of every IP address on the
                                      Internet. Fields included in this response
                                      are the abuse contact&apos;s email
                                      address, postal/ZIP code, city, state,
                                      country, name, network, and phone number.
                                    </p>
                                  </div>
                                </div>
                                <div className="col-lg-7">
                                  <table className="table table-bordered">
                                    <tbody>
                                      <tr>
                                        <td>Abuse contact</td>
                                        <td>
                                          {data?.abuse?.abuse_contacts?.length >
                                          0 ? (
                                            <>
                                              {data?.abuse?.abuse_contacts.map(
                                                (item: any, index: any) => (
                                                  <span key={index}>
                                                    {item ? (
                                                      <EmailButton
                                                        email={item}
                                                      />
                                                    ) : null}
                                                  </span>
                                                )
                                              )}
                                            </>
                                          ) : (
                                            "N/A"
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Address</td>
                                        <td>
                                          {data?.ipinfo_response?.abuse?.address
                                            ? data?.ipinfo_response?.abuse
                                                ?.address
                                            : "N/A"}
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>Name</td>
                                        <td>
                                          {data?.ipinfo_response?.abuse?.name
                                            ? data?.ipinfo_response?.abuse?.name
                                            : "N/A"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Email</td>
                                        <td>
                                          {data?.ipinfo_response?.abuse
                                            ?.email ? (
                                            <>
                                              <EmailButton
                                                email={
                                                  data?.ipinfo_response?.abuse
                                                    ?.email
                                                }
                                              />
                                            </>
                                          ) : (
                                            "N/A"
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Phone</td>
                                        <td>
                                          {data?.ipinfo_response?.abuse?.phone
                                            ? data?.ipinfo_response?.abuse
                                                ?.phone
                                            : "N/A"}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {/* <div className="codeSection">
                            <div className="form-group">
                              <input type="text" className="form-control" />
                              <button>
                                <img src="/assets/images/search.svg" />
                              </button>
                            </div>

                            <code>
                              <p>
                                <span className="quote">
                                  <img src="/assets/imag  es/quote.svg" />
                                </span>
                                address: "US, CA, Mountain View, 1600
                                Amphitheatre Parkway",
                              </p>
                              <p>
                                <span className="quote">
                                  <img src="/assets/images/quote.svg" />
                                </span>
                                country: "US",
                              </p>
                              <p>
                                <span className="quote">
                                  <img src="/assets/images/quote.svg" />
                                </span>
                                email: "network-abuse@google.com",
                              </p>
                              <p>
                                <span className="quote">
                                  <img src="/assets/images/quote.svg" />
                                </span>
                                name: "Abuse",
                              </p>
                              <p>
                                <span className="quote">
                                  <img src="/assets/images/quote.svg" />
                                </span>
                                network: "8.8.8.0/24"
                              </p>
                              <p>
                                <span className="quote">
                                  <img src="/assets/images/quote.svg" />
                                </span>
                                phone: "+1-650-253-0000"
                              </p>
                            </code>

                            <div className="btns">
                              <button className="btn">Your IP</button>
                              <button className="btn">1.1.1.14</button>
                              <button className="btn">45.60.11.176</button>
                              <button className="btn">68.8741.40</button>
                              <button className="btn">68.8741.40</button>
                            </div>
                          </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="security-tab-pane"
                          role="tabpanel"
                          aria-labelledby="security-tab"
                        >
                          <div className="companytab">
                            <div className="companyApiSection">
                              <div className="row mb-4">
                                <div className="col-xl-3">
                                  <Donutchart
                                    score={
                                      data?.virutotal_response?.attributes
                                        ?.reputation
                                        ? data?.virutotal_response?.attributes
                                            ?.reputation
                                        : 0
                                    }
                                  />
                                </div>
                                <div className="col-xl-9">
                                  <div className="domaindetailsection">
                                    <div className="domaindetailrow">
                                      <div className="row">
                                        <div className="col-lg-7">
                                          <div className="ipdangeralert">
                                            <img
                                              src="/assets/images/redinfo.svg"
                                              alt=""
                                            />
                                            <p>
                                              {
                                                data?.virutotal_response
                                                  ?.attributes?.total_votes
                                                  ?.malicious
                                              }
                                              security vendors flagged this IP
                                              address as malicious
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-lg-5 ">
                                          {/* <div className="domainoptions">
                                    <a href="">Reanalyze</a>
                                    <a href="">Similar</a>
                                    <a href="">Graph</a>
                                    <a href="">API</a>
                                  </div> */}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="ipsection">
                                      <p>
                                        {data?.virutotal_response?.id
                                          ? data?.virutotal_response?.id
                                          : null}
                                        {data?.virutotal_response?.attributes
                                          ?.network ? (
                                          <>
                                            (
                                            {
                                              data?.virutotal_response
                                                ?.attributes?.network
                                            }
                                            )
                                          </>
                                        ) : (
                                          "N/A"
                                        )}
                                      </p>

                                      <div className="ipdetails">
                                        <div>
                                          <p>
                                            {data?.virutotal_response
                                              ?.attributes?.country
                                              ? data?.virutotal_response
                                                  ?.attributes?.country
                                              : "N/A"}
                                          </p>
                                          <span
                                            className={`favIconImage align-middle fi fi-${data?.virutotal_response?.attributes?.country?.toLowerCase()}`}
                                          ></span>
                                        </div>
                                        <div>
                                          <p>Last Analysis Date</p>
                                          <span>
                                            {convertUnixToDate(
                                              data?.virutotal_response
                                                ?.attributes?.last_analysis_date
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="ipsection">
                                      <p>
                                        {data?.virutotal_response?.attributes
                                          ?.asn
                                          ? data?.virutotal_response?.attributes
                                              ?.asn
                                          : null}

                                        {data?.virutotal_response?.attributes
                                          ?.as_owner ? (
                                          <>
                                            (
                                            {
                                              data?.virutotal_response
                                                ?.attributes?.as_owner
                                            }
                                            )
                                          </>
                                        ) : (
                                          "N/A"
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <ul
                                className="nav nav-underline"
                                id="myTab"
                                role="tablist"
                              >
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link active"
                                    id="detection-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#detection-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="detection-tab-pane"
                                    aria-selected="true"
                                  >
                                    Detection
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="details-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#details-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="details-tab-pane"
                                    aria-selected="false"
                                  >
                                    Details
                                  </button>
                                </li>
                                {/* <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="relation-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#relation-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="relation-tab-pane"
                            aria-selected="false"
                          >
                            Relation
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="community-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#community-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="community-tab-pane"
                            aria-selected="false"
                          >
                            Community
                          </button>
                        </li> */}
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="dns-blacklist-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#dns-blacklist-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="dns-blacklist-tab-pane"
                                    aria-selected="false"
                                  >
                                    DNS Blacklist
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="bgp-update-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#bgp-update-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="bgp-update-tab-pane"
                                    aria-selected="false"
                                  >
                                    BGP Update
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="check-endpoint-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#check-endpoint-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="check-endpoint-tab-pane"
                                    aria-selected="false"
                                  >
                                    Check
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="reports-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#reports-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="reports-tab-pane"
                                    aria-selected="false"
                                  >
                                    Reports
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="block-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#block-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="block-tab-pane"
                                    aria-selected="false"
                                  >
                                    Check Block
                                  </button>
                                </li>
                              </ul>
                              <div className="tab-content" id="myTabContent">
                                <div
                                  className="tab-pane fade show active"
                                  id="detection-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="detection-tab"
                                >
                                  <h5>Security vendor&apos;s analysis</h5>
                                  <div className="table-responsive domaindetailtable">
                                    <table className="table table-bordered capitalData">
                                      <tbody>
                                        <tr>
                                          <th>Engine Name</th>
                                          <th>Method</th>
                                          <th>Result</th>
                                          <th>Category</th>
                                        </tr>
                                        {data?.virutotal_response?.attributes
                                          ?.last_analysis_results &&
                                        Object.keys(
                                          data?.virutotal_response?.attributes
                                            ?.last_analysis_results
                                        ).length > 0 ? (
                                          Object.keys(
                                            data?.virutotal_response?.attributes
                                              ?.last_analysis_results
                                          ).map((key, index) => {
                                            const item =
                                              data?.virutotal_response
                                                ?.attributes
                                                ?.last_analysis_results[key]; // Access each blacklist entry
                                            return (
                                              <tr key={index}>
                                                <td className="capitalData">
                                                  {item.engine_name
                                                    ? item.engine_name
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item.method
                                                    ? item.method
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item.result
                                                    ? item.result
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item.category
                                                    ? item.category
                                                    : "N/A"}
                                                </td>
                                              </tr>
                                            );
                                          })
                                        ) : (
                                          <tr>
                                            <td
                                              className="text-center"
                                              colSpan={3}
                                            >
                                              No data found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                    {/* <table className="table table-bordered">
                              <tbody>
                                <tr>
                                  <td className="capitalData">abusix</td>
                                  <td className="capitalData">
                                    <div className="dangerinfo">
                                      <img
                                        src="/assets/images/redinfo.svg"
                                        alt=""
                                      />
                                      <p className="mb-0">Malicious</p>
                                    </div>
                                  </td>
                                  <td className="capitalData">Antiy-AVL</td>
                                  <td className="capitalData">
                                    <div className="dangerinfo">
                                      <img
                                        src="/assets/images/redinfo.svg"
                                        alt=""
                                      />
                                      <p className="mb-0">Malicious</p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade detailtabsection"
                                  id="details-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="details-tab"
                                >
                                  <h5 className="detailheading">
                                    Basic Properties
                                  </h5>
                                  <table className="table table-borderless w-50">
                                    <tbody>
                                      <tr>
                                        <td className="capitalData">Network</td>
                                        <td className="capitalData">
                                          {data?.virutotal_response?.attributes
                                            ?.network
                                            ? data?.virutotal_response
                                                ?.attributes?.network
                                            : "N/A"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="capitalData">
                                          Autonomous System Number
                                        </td>
                                        <td className="capitalData">
                                          {data?.virutotal_response?.attributes
                                            ?.asn
                                            ? data?.virutotal_response
                                                ?.attributes?.asn
                                            : "N/A"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="capitalData">
                                          Autonomous System Label
                                        </td>
                                        <td className="capitalData">
                                          {data?.virutotal_response?.attributes
                                            ?.as_owner
                                            ? data?.virutotal_response
                                                ?.attributes?.as_owner
                                            : "N/A"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="capitalData">
                                          Regional Internet Registry
                                        </td>
                                        <td className="capitalData">
                                          {data?.virutotal_response?.attributes
                                            ?.regional_internet_registry
                                            ? data?.virutotal_response
                                                ?.attributes
                                                ?.regional_internet_registry
                                            : "N/A"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="capitalData">Country</td>
                                        <td className="capitalData">
                                          {data?.virutotal_response?.attributes
                                            ?.country
                                            ? data?.virutotal_response
                                                ?.attributes?.country
                                            : "N/A"}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="capitalData">
                                          Continent
                                        </td>
                                        <td className="capitalData">
                                          {data?.virutotal_response?.attributes
                                            ?.continent
                                            ? data?.virutotal_response
                                                ?.attributes?.continent
                                            : "N/A"}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {/* <h5 className="detailheading">
                            Last HTTPS Certificate
                          </h5> */}

                                  {/* <h6 className="fw-semibold">JARM Fingerprint</h6>
                                <p>
                                  2ad2ad16d00000022c2ad2ad2ad2ad46ff59a659b30fd8aeaa6755c67691b4
                                </p> */}
                                  {/* <h6 className="fw-semibold">
                            Last HTTPS Certificate
                          </h6>
                          <p>
                            Data: Version: V3 Serial Number:
                            41d24df027992690672baa52b202d567a99 Thumbprint:
                            ba018364b62387ae984ebb546547c1eb50b922d3 Signature
                            Algorithm: Issuer: C=US O=Let&apos;s Encrypt CN=R11
                            Validity Not Before: 2024-06-21 13:44:22 Not After:
                            2024-09-19 13:44:21 Subject: CN=gazallaince.com
                            Subject Public Key Info: Public Key Algorithm : RSA
                            Public-Key: (2048 bit) Modulus:
                            8f:b2:07:b9:d4:22:4d:2a:5c:fe:e9:65:dd:53:ed:
                            30:30:a3:aa:0a:6b:ed:7b:32:21:a4:c2:83:0d:ad:
                            10:b6:aa:ba:c9:a9:64:b5:f1:10:d6:26:c2:58:52:
                            86:a8:d0:c7:79:56:c2:0a:b1:da:21:67:04:a3:a4:
                            03:d4:61:7f:03:df:ab:b4:09:9f:82:71:aa:65:be:
                            c2:54:b5:07:16:b4:8f:78:e8:c8:7e:6e:51:f4:48:
                            39:40:6b:fe:ec:62:ca:ab:87:3d:94:4e:55:4a:31:
                            e3:7b:2c:35:7e:9c:3e:ab:37:b0:4f:98:57:df:02:
                            8d:a3:b5:ae:a1:9d:2b:e8:5b:4a:57:ec:b2:b0:44:
                            e8:73:6f:7f:13:b1:2c:07:0d:9f:ad:7f:06:54:44:
                            a6:5e:7f:7c:db:73:35:f1:8a:0c:f2:2a:3c:d7:fc:
                            f8:95:3f:0a:86:72:61:ca:8f:4d:86:4b:28:d8:59:
                            d9:39:b7:d3:fe:02:77:ed:3d:bb:a4:43:f4:9b:c3:
                            35:c9:d3:4a:c1:bd:34:ef:fd:70:a4:22:f1:e7:5e:
                            8d:35:43:b5:72:39:61:44:69:42:23:b8:2e:23:7a:
                            3c:9d:5b:a1:30:ed:ac:c5:8a:98:a6:ed:a7:d2:55:
                            cc:65:4d:17:fe:1b:ce:23:e9:b2:26:69:23:da:23: cb
                            Exponent: 10001 X509v3 extensions: X509v3 Authority
                            Key Identifier:
                            c5:cf:46:a4:ea:f4:c3:c0:7a:6c:95:c4:2d:b0:5e:
                            92:2f:26:e3:b9X509v3 Subject Key Identifier:
                            80:d8:6f:9a:2f:17:9a:f2:e0:6d:f4:bc:15:24:b3:
                            1c:05:84:dc:b8X509v3 Subject Alternative Name:
                            DNS:gazallaince.com X509v3 Key Usage:
                            digitalSignature, keyEncipherment X509v3 Extended
                            Key Usage: serverAuth, clientAuth X509v3 CRL
                            Distribution Points: X509v3 Certification Policies:
                            Policy: 2.23.140.1.2.1 Authority Information Access:
                            OCSP - http://r11.o.lencr.org CA Issuers -
                            http://r11.i.lencr.org/ X509v3 Basic Constraints:
                            CA:FALSE 1.3.6.1.4.1.11129.2.4.2:
                            0481f300f100770048b0e36bdaa647340fe56a02fa9d30eb1c5201cb56dd2c81
                            Signature Algorithm: sha256RSA
                            95:89:e1:b0:df:f9:54:b4:7a:e5:3c:36:3d:b0:a4:
                            21:d5:71:8d:77:91:d2:fa:63:4f:2c:b0:aa:83:d5:
                            51:51:14:8c:3a:3f:08:db:63:e3:fc:6f:91:07:36:
                            3e:cb:05:c2:6b:2e:a8:59:df:89:53:90:c9:fc:0b:
                            b7:ff:43:54:d1:ff:eb:a6:d4:aa:b0:48:e3:0f:91:
                            c8:72:ae:17:65:a0:6c:d8:d9:30:4b:0b:29:33:1a:
                            1b:cd:0a:30:fc:88:ff:56:13:0c:bc:c8:a2:74:59:
                            4d:af:5e:58:af:86:46:7f:a7:27:e1:c5:e9:f4:49:
                            05:ba:16:95:86:81:38:fd:3f:78:7e:e6:70:ec:b4:
                            d7:ae:3e:92:4b:ad:0f:83:74:d3:c6:b5:96:46:44:
                            e2:ba:59:7b:7e:4a:c7:aa:9a:40:36:2c:b0:e8:4a:
                            e7:d7:a3:7a:2b:22:db:22:1d:c1:53:af:5d:45:61:
                            5a:e3:92:65:1d:68:8e:7f:75:a5:e2:15:0f:08:1a:
                            be:61:87:6f:5e:5d:44:48:ea:bf:21:1b:55:51:ce:
                            ae:64:5e:f0:22:7a:54:0c:1a:19:fd:35:a3:c6:ba:
                            44:ef:fd:56:15:5c:97:c7:de:55:9b:c0:f6:2a:0d:
                            de:2c:1b:2f:f9:a9:9f:a0:b5:09:94:3b:ae:da:63: bd
                          </p> */}
                                  <h6 className="fw-semibold">Whois Lookup</h6>
                                  <p>
                                    <div
                                      className="content "
                                      dangerouslySetInnerHTML={{
                                        __html: parseJsonStringNw(
                                          data?.virutotal_response?.attributes
                                            ?.whois
                                        ),
                                      }}
                                    ></div>
                                  </p>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="relation-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="relation-tab"
                                >
                                  <h5 className="detailheading">
                                    Passive DNS Replication
                                  </h5>
                                  <div className="table-responsive">
                                    <table className="table table-borderless relationtable">
                                      <thead>
                                        <tr>
                                          <th>Date resolved</th>
                                          <th>Detections</th>
                                          <th>Resolver</th>
                                          <th>Domain</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="capitalData">
                                            2024-07-02
                                          </td>
                                          <td className="capitalData">
                                            0 / 93
                                          </td>
                                          <td className="capitalData">
                                            Georgia Institute of Technology
                                          </td>
                                          <td className="capitalData">
                                            <a href="">ns2.gazallaince.com</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            2024-07-02
                                          </td>
                                          <td className="capitalData">
                                            0 / 93
                                          </td>
                                          <td className="capitalData">
                                            Georgia Institute of Technology
                                          </td>
                                          <td className="capitalData">
                                            <a href="">ns2.gazallaince.com</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            2024-07-02
                                          </td>
                                          <td className="capitalData">
                                            0 / 93
                                          </td>
                                          <td className="capitalData">
                                            Georgia Institute of Technology
                                          </td>
                                          <td className="capitalData">
                                            <a href="">ns2.gazallaince.com</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>

                                  <h5 className="detailheading">
                                    Files Referring
                                  </h5>
                                  <div className="table-responsive">
                                    <table className="table table-borderless relationtable">
                                      <thead>
                                        <tr>
                                          <th>Scanned</th>
                                          <th>Detections</th>
                                          <th> Type</th>
                                          <th> Name</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="capitalData">
                                            2024-07-02
                                          </td>
                                          <td className="capitalData">
                                            0 / 93
                                          </td>
                                          <td className="capitalData">Email</td>
                                          <td className="capitalData">
                                            <a href="">
                                              Email account unusual sign-in
                                              activity.eml
                                            </a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            2024-07-02
                                          </td>
                                          <td className="capitalData">
                                            0 / 93
                                          </td>
                                          <td className="capitalData">Email</td>
                                          <td className="capitalData">
                                            <a href="">
                                              Email account unusual sign-in
                                              activity.eml
                                            </a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            2024-07-02
                                          </td>
                                          <td className="capitalData">
                                            0 / 93
                                          </td>
                                          <td className="capitalData">Email</td>
                                          <td className="capitalData">
                                            <a href="">
                                              Email account unusual sign-in
                                              activity.eml
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="community-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="community-tab"
                                >
                                  <h5 className="detailheading">
                                    Contained in Graphs
                                  </h5>
                                  <div className="table-responsive">
                                    <table className="table table-borderless relationtable">
                                      <tbody>
                                        <tr>
                                          <td className="capitalData">
                                            nextcomm
                                          </td>
                                          <td className="capitalData">
                                            Phishing Attack - Guzel
                                          </td>
                                          <td className="capitalData">
                                            2024-06-26 22:36:57
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            nextcomm
                                          </td>
                                          <td className="capitalData">
                                            Phishing Attack - Guzel
                                          </td>
                                          <td className="capitalData">
                                            2024-06-26 22:36:57
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            nextcomm
                                          </td>
                                          <td className="capitalData">
                                            Phishing Attack - Guzel
                                          </td>
                                          <td className="capitalData">
                                            2024-06-26 22:36:57
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="dns-blacklist-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="dns-blacklist-tab"
                                >
                                  <h5>DNS Blacklist</h5>
                                  <div className="table-responsive domaindetailtable">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>Name</th>
                                          <th>Operator</th>
                                          <th>Url</th>
                                        </tr>
                                        {data?.dns_blacklist?.blocklists &&
                                        Object.keys(
                                          data.dns_blacklist.blocklists
                                        ).length > 0 ? (
                                          Object.keys(
                                            data.dns_blacklist.blocklists
                                          ).map((key, index) => {
                                            const item =
                                              data.dns_blacklist.blocklists[
                                                key
                                              ]; // Access each blacklist entry
                                            return (
                                              <tr key={index}>
                                                <td className="capitalData">
                                                  {item.name
                                                    ? item.name
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item.operator
                                                    ? item.operator
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  <LinkOpenButton
                                                    url={item?.url}
                                                  />
                                                </td>
                                              </tr>
                                            );
                                          })
                                        ) : (
                                          <tr>
                                            <td
                                              className="text-center"
                                              colSpan={3}
                                            >
                                              No data found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                <div
                                  className="tab-pane fade"
                                  id="bgp-update-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="bgp-update-tab"
                                >
                                  <h5>BGP Update Data</h5>
                                  <div className="table-responsive domaindetailtable">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>Starttime</th>
                                          <th>Withdrawals</th>
                                          <th>Announcements</th>
                                        </tr>
                                        {data?.bgp_update?.updates &&
                                        data.bgp_update.updates.length > 0 ? (
                                          data.bgp_update.updates.map(
                                            (item: any, index: any) => (
                                              <tr key={index}>
                                                <td className="capitalData">
                                                  {item?.starttime
                                                    ? fixDate(item.starttime)
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item?.withdrawals
                                                    ? item.withdrawals
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item?.announcements
                                                    ? item.announcements
                                                    : "N/A"}
                                                </td>
                                              </tr>
                                            )
                                          )
                                        ) : (
                                          <tr>
                                            <td
                                              className="text-center"
                                              colSpan={3}
                                            >
                                              No data found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                <div
                                  className="tab-pane fade"
                                  id="check-endpoint-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="check-endpoint-tab"
                                >
                                  <h5>Check Data</h5>

                                  <div className="table-responsive domaindetailtable">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <td className="capitalData">ISP</td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response?.isp
                                              ? data?.abouseipdb_response?.isp
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Is Tor
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response?.isTor
                                              ? data?.abouseipdb_response?.isTor
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Domain
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response?.domain
                                              ? data?.abouseipdb_response
                                                  ?.domain
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Is Public
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.isPublic == true
                                              ? "True"
                                              : data?.abouseipdb_response
                                                  ?.isPublic == false
                                              ? "Fale"
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Hostnames
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.hostnames?.length > 0
                                              ? data?.abouseipdb_response?.hostnames.map(
                                                  (item: any, index: any) => (
                                                    <span key={index}>
                                                      {item}
                                                    </span>
                                                  )
                                                )
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Ip Address
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.ipAddress
                                              ? data?.abouseipdb_response
                                                  ?.ipAddress
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Ip Version
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.ipVersion
                                              ? data?.abouseipdb_response
                                                  ?.ipVersion
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Usage Type
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.usageType
                                              ? data?.abouseipdb_response
                                                  ?.usageType
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            updated_at
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.updated_at
                                              ? fixDate(
                                                  data?.abouseipdb_response
                                                    ?.updated_at
                                                )
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Country Code
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.countryCode
                                              ? data?.abouseipdb_response
                                                  ?.countryCode
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Total Reports
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.totalReports
                                              ? data?.abouseipdb_response
                                                  ?.totalReports
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            White-listed
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.isWhitelisted == true
                                              ? "True"
                                              : data?.abouseipdb_response
                                                  ?.isWhitelisted == false
                                              ? "False"
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Last Reported At
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.lastReportedAt
                                              ? fixDate(
                                                  data?.abouseipdb_response
                                                    ?.lastReportedAt
                                                )
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Distinct Users
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.numDistinctUsers
                                              ? data?.abouseipdb_response
                                                  ?.numDistinctUsers
                                              : "N/A"}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="capitalData">
                                            Abuse Confidence Score
                                          </td>
                                          <td className="capitalData">
                                            {data?.abouseipdb_response
                                              ?.abuseConfidenceScore
                                              ? data?.abouseipdb_response
                                                  ?.abuseConfidenceScore
                                              : "N/A"}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="reports-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="reports-tab"
                                >
                                  <h5>Reports Data</h5>
                                  <div className="table-responsive domaindetailtable">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>Reporter Country Name</th>
                                          <th>Reporter Country Code</th>
                                          <th>Reported At</th>
                                          <th>Categories</th>
                                          <th>Comment</th>
                                        </tr>
                                        {data?.abouseipdb_report?.reports &&
                                        data?.abouseipdb_report?.reports > 0 ? (
                                          data?.abouseipdb_report?.reports.map(
                                            (item: any, index: any) => (
                                              <tr key={index}>
                                                <td className="capitalData">
                                                  {item?.reporterCountryName
                                                    ? fixDate(
                                                        item.reporterCountryName
                                                      )
                                                    : "N/A"}
                                                </td>

                                                <td className="capitalData">
                                                  {item?.reporterCountryCode
                                                    ? fixDate(
                                                        item.reporterCountryCode
                                                      )
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item?.reportedAt
                                                    ? fixDate(item.reportedAt)
                                                    : "N/A"}
                                                </td>

                                                <td className="capitalData">
                                                  {item?.categories
                                                    ? fixDate(item.categories)
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item?.comment
                                                    ? fixDate(item.comment)
                                                    : "N/A"}
                                                </td>
                                              </tr>
                                            )
                                          )
                                        ) : (
                                          <tr>
                                            <td
                                              className="text-center"
                                              colSpan={5}
                                            >
                                              No data found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                <div
                                  className="tab-pane fade"
                                  id="block-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="block-tab"
                                >
                                  <h5>Block Data</h5>
                                  <div className="table-responsive domaindetailtable">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>Ip Address</th>
                                          <th>Number Reports</th>
                                          <th>Recent Report</th>
                                          <th>Abuse Confidence Score</th>
                                          <th>Country Code</th>
                                        </tr>
                                        {data?.abouseipdb_check_block_response
                                          ?.reportedAddress &&
                                        data.abouseipdb_check_block_response
                                          ?.reportedAddress > 0 ? (
                                          data.abouseipdb_check_block_response?.reportedAddress.map(
                                            (item: any, index: any) => (
                                              <tr key={index}>
                                                <td className="capitalData">
                                                  {item?.ipAddress
                                                    ? fixDate(item?.ipAddress)
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item?.numReports
                                                    ? fixDate(item?.numReports)
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item?.mostRecentReport
                                                    ? fixDate(
                                                        item?.mostRecentReport
                                                      )
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item?.abuseConfidenceScore
                                                    ? fixDate(
                                                        item?.abuseConfidenceScore
                                                      )
                                                    : "N/A"}
                                                </td>
                                                <td className="capitalData">
                                                  {item?.countryCode
                                                    ? item?.countryCode
                                                    : "N/A"}
                                                </td>
                                              </tr>
                                            )
                                          )
                                        ) : (
                                          <tr>
                                            <td
                                              className="text-center"
                                              colSpan={5}
                                            >
                                              No data found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : (
        <div>
          <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="ebookModal ">
              <span>
                <button className="btn closeModal" onClick={handleClose}>
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              </span>
              <div className="row">
                <div className="col-xl-12">
                  <div className="text-center py-4">
                    {isUser ? (
                      <p>Buy premium plan to get more IP address details</p>
                    ) : (
                      <p>Login to get more IP address details </p>
                    )}
                    {isUser ? (
                      <div className="text-center py-4">
                        {license && license?.plan_name == "Free Plan" ? (
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#eb5454",
                              color: "#fff",
                              fontWeight: "700",
                            }}
                            type="submit"
                            onClick={() => router.push("/dashboard/pricing")}
                          >
                            Upgrade Plan
                          </button>
                        ) : (
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#eb5454",
                              color: "#fff",
                              fontWeight: "700",
                            }}
                            type="submit"
                            onClick={() => manageChangePlan()}
                            title="Manage Plan"
                            // onClick={() => router.push("/dashboard/pricing")}
                            //jkvf
                          >
                            Upgrade plan
                          </button>
                        )}
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#eb5454",
                            color: "#fff",
                            fontWeight: "700",
                          }}
                          title="Login id"
                          onClick={() => router.push("/login")}
                        >
                          Login
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Ipmodal;

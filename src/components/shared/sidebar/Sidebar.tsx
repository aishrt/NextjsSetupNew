"use client";
import { Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
import Logo from "@/components/shared/dashboard-header/logo/Logo";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { isEmpty } from "@/utils/isEmpty";
import { useStore } from "@/utils/store";
import { API_ROUTES } from "@/@core/apiRoutes";
import { getLicenseData } from "@/@core/apiFetcher";
import { useSession } from "next-auth/react";
import { calculateStartDate } from "@/@core/helper";
import ExceedPlan from "@/components/ExceedPlan";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const sidebarWidth = "318px";
  const pathname = usePathname();
  const {
    setFirstDomain,
    setAllDomain,
    setSubscriptionPlan,
    setWeeklyDigestReport,
    setWeeklyDmarcReport,
    setWeeklyDomainReport,
    setMspSuperAdmin,
    setUserole,
    setUserDetail,
    setAlertVal,
    isDomainValue,
    setAllVerifiedDomain,
    setIsDomain,
    isMspSuperAdmin,
    setLicense,
    setLicenseValidations,
    setHistoryDate,
    license,
  } = useStore();
  const pathDirect = usePathname();

  const [loadingState, setLoadingState] = useState(true);
  const [licenseDataObj, setLicenseDataObj] = useState<any>({});
  const [apiDataFetched, setApiDataFetched] = useState(false);
  const [myDomain, setmyDomain] = useState("");
  const [myDomainVerified, setmyDomainVerified] = useState("");

  let path2 = "";
  const getFullDashboardPath = () => {
    const segments = pathDirect.split("/").filter(Boolean);
    const val = segments[1]
      ? `/${segments[0]}`.concat(`/${segments[1]}`)
      : `/${segments[0]}`;
    path2 = val;
  };

  getFullDashboardPath();
  const router = useRouter();

  useEffect(() => {
    if (apiDataFetched) {
      if (myDomainVerified !== "verified") {
        setLoadingState(true);
        if (
          path2 === "/dashboard" ||
          path2 === "/dashboard/dashboard" ||
          path2 === "/dashboard/tls-report" ||
          path2 === "/dashboard/tls-item-detail" ||
          path2 === "/dashboard/tls-date-list" ||
          path2 === "/dashboard/reporters" ||
          path2 === "/dashboard/sender-dashboard" ||
          path2 === "/dashboard/source-dashboard" ||
          path2 === "/dashboard/source-result" ||
          path2 === "/dashboard/results" ||
          path2 === "/dashboard/tls-result" ||
          path2 === "/dashboard/dns-timeline" ||
          path2 === "/dashboard/email-actions" ||
          path2 === "/dashboard/sendEmailListing" ||
          path2 === "/dashboard/sendEmail" ||
          path2 === "/dashboard/tools"
        ) {
          router.push("/dashboard/domain");
        }
        setLoadingState(false);
      } else if (myDomainVerified === "verified") {
        setLoadingState(false);
      } else if (myDomainVerified == null) {
        setLoadingState(false);
        router.push("/dashboard/domain");
      }
    }
  }, [apiDataFetched, path2]);

  useEffect(() => {
    if (isMspSuperAdmin == "false") {
      setLoadingState(true);
      if (
        path2 === "/dashboard/sendEmailListing" ||
        path2 === "/dashboard/sendEmail"
      ) {
        router.push("/dashboard");
      }
      setLoadingState(false);
    }
  }, [isDomainValue, path2]);

  const [domainName, setdomainName] = useState(null);
  const [domainlists, setdomainlists] = useState<any>(null);
  const [isExceedingLimit, setIsExceedingLimit] = useState(false);

  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      localStorage.setItem("user", JSON.stringify(session?.user));
    }
  }, [session]);
  async function fetchDomainData() {
    try {
      const userFromLocalStorage = localStorage.getItem("user");
      const users =
        session?.user ||
        (userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null);
      if (!users || !users.token) {
        signOut({ callbackUrl: "/" });
        return null; // Return null if no user or token is found
      }
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
  const getProfileData = async () => {
    let url = API_ROUTES.VIEW_PROFILE;
    const userFromLocalStorage = localStorage.getItem("user");
    const users =
      session?.user ||
      (userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null);
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

    setUserole(resData?.data?.role);
    setUserDetail(resData?.data);
    setMspSuperAdmin(
      resData?.data?.is_msp_super_admin == true ? "true" : "false"
    );

    setSubscriptionPlan(resData?.data?.plan_name);
  };
  const getFetchLicenseData = async () => {
    let url = API_ROUTES.ACCOUNT_LICENSE_DETAIL;
    const userFromLocalStorage = localStorage.getItem("user");
    const users =
      session?.user ||
      (userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null);
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
    if (resData) {
      setLicenseDataObj(resData?.data);
      setWeeklyDigestReport(resData?.data?.weekly_digest_report);
      setWeeklyDmarcReport(resData?.data?.weekly_dmarc_report);
      setWeeklyDomainReport(resData?.data?.weekly_domain_report);
      setAlertVal(resData?.data?.alert);
      setIsDomain(resData?.data?.is_domain);
      setmyDomain(resData?.data?.is_domain);
      setmyDomainVerified(resData?.data?.is_domain);
      setApiDataFetched(true);
      setLicense(resData?.data);
      const { startDate, endDate } = calculateStartDate(
        resData?.data?.plan_type
      );
      setHistoryDate({ startDate, endDate });
    }
  };
  useEffect(() => {
    getProfileData();
    getFetchLicenseData();
  }, [session]);

  useEffect(() => {
    let validatedObj: any = {};
    if (licenseDataObj) {
      //-----------------------------It checks wether you can add domain or not-----------------------------
      validatedObj.domainLimitCrossed =
        licenseDataObj?.domains?.usage >= licenseDataObj?.domains?.limit;

      //-----------------------------It checks wether you can send email or not-----------------------------
      const usage = licenseDataObj?.volume?.usage;
      let lastValue;

      if (usage) {
        const keys = Object.keys(usage);
        const lastKey = keys[keys.length - 1];
        lastValue = usage[lastKey];
        validatedObj.emailUsage = lastValue;
        validatedObj.emailLimitCrossed =
          lastValue >= licenseDataObj?.volume?.limit;
      } else {
        console.log("Usage object is undefined or null.");
      }

      //----------------------------- Check history date-----------------------------

      // const historyDateString = licenseDataObj?.start_date;
      // if (historyDateString) {
      //   const [month, day, year] = historyDateString?.split("/").map(Number);
      //   const historyDate = new Date(year, month - 1, day);
      //   const currentDate = new Date();
      //   currentDate.setHours(0, 0, 0, 0);
      //   validatedObj.historyDate = currentDate < historyDate;
      // }

      validatedObj.historyDate = licenseDataObj?.start_date;

      //-----------------------------It checks wether you can add users or not-----------------------------
      validatedObj.usersLimitCrossed =
        licenseDataObj?.users?.usage >= licenseDataObj?.users?.limit;

      // //-----------------------------It checks wether you can add users or not-----------------------------
      // validatedObj.usersLimitCrossed =
      //   licenseDataObj?.users?.usage >= licenseDataObj?.users?.limit;

      //-----------------------------It checks wether you can add senders or not-----------------------------
      validatedObj.sendersLimitCrossed =
        licenseDataObj?.senders?.usage >= licenseDataObj?.senders?.limit;

      //-----------------------------Values from backend-----------------------------
      validatedObj.ipSourcMonitoring = licenseDataObj?.ip_source_monitoring;
      validatedObj.showTlsReport = licenseDataObj?.tls_report;
      validatedObj.showDnsTimeline = licenseDataObj?.dns_timeline;
      validatedObj.showAiAnalytics = licenseDataObj?.ai_analytics;
      validatedObj.showAlerts = licenseDataObj?.alert;
      validatedObj.showWeeklyEmailReports =
        licenseDataObj?.weekly_digest_report;
      validatedObj.showBranding = licenseDataObj?.branding;

      //-----------------------------Update the store variable-----------------------------
      setLicenseValidations(validatedObj);
    }
  }, [licenseDataObj]);

  useEffect(() => {
    async function getData() {
      const result = await fetchDomainData();
      if (!isEmpty(result?.data)) {
        setdomainlists(result?.data);
        setdomainName(result?.data[0]?.domain);
        if (result?.data?.length > 0) {
          for (const item of result.data) {
            if (item?.is_verify === true) {
              setdomainName(item?.domain);
              break;
            }
          }
        }
      }
    }
    getData();
  }, [session]);

  useEffect(() => {
    if (domainlists) {
      const filteredDomains = domainlists
        .filter((item: any) => item.is_verify === true)
        .map((item: any) => item.domain);

      setAllVerifiedDomain(filteredDomains);
    }
  }, [domainlists]);

  useEffect(() => {
    if (domainName) {
      setFirstDomain(domainName ? domainName : true);
    }
  }, [domainName]);
  useEffect(() => {
    if (domainlists) {
      setAllDomain(domainlists);
    }
  }, [domainlists]);
  if (pathname) {
    if (
      pathname !== "/dashboard/reporters" &&
      pathname !== "/dashboard" &&
      pathname !== "/dashboard/results" &&
      pathname !== "/dashboard/sender-dashboard"
    ) {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("dashboardUrl");
      }
    }
  }
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });
    const currentYear = currentDate.getFullYear();
    const currentMonthYearKey = `${currentMonth} ${currentYear}`;
    const currentMonthUsage = license?.volume?.usage[currentMonthYearKey] || 0;
    if (currentMonthUsage > license?.volume?.limit) {
      setIsExceedingLimit(true);
    } else {
      setIsExceedingLimit(false);
    }
  }, [license]);
  return (
    <Box
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
      }}
      className="sidebarOuter"
    >
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="permanent"
        className="sideBar"
        PaperProps={{
          sx: {
            boxShadow: "0 9px 17.5px rgb(0,0,0,0.05)",
            width: sidebarWidth,
            boxSizing: "border-box",
            borderRight: 0,
            background: "#0F2138",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
          }}
        >
          <Box px={3} className="sidebarLogo">
            <span className="closeButton">
              <img
                src="/assets/images/closeIcon.svg"
                alt=""
                onClick={onSidebarClose}
                loading="lazy"
              />
            </span>
            <Logo />
          </Box>
          {isExceedingLimit === true && Object.keys(license).length !== 0 && (
            <ExceedPlan initialOpenModal={true} />
          )}
          <Box>
            <SidebarItems />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

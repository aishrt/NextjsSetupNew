import getCurrentUser from "@/lib/session";
import { Grid } from "@mui/material";
import Statistics from "@/app/pageComponents/Dashboard/Statistics";
import Volume from "@/app/pageComponents/Dashboard/Volume";
import TopSources from "@/app/pageComponents/Dashboard/TopSources";
import DetailedSources from "@/app/pageComponents/Dashboard/DetailedSources";
import { removeHttp } from "@/utils/string-conversion";
import { isEmpty } from "@/utils/isEmpty";
import {
  fetchDetailList,
  getDashboardData,
  isTokenExpired,
} from "@/@core/apiFetcher";
import { initDashboardDataResults } from "@/constants/dashboardData";
import ResultButton from "@/app/pageComponents/Dashboard/ResultButton";
import { getLast30Days } from "@/@core/helper";
import { API_ROUTES } from "@/@core/apiRoutes";
import { signOut } from "next-auth/react";
import { _ENV_VARIABLES } from "@/constants/envVariables";

type DashboardDataTypes = {
  WIDGET_COUNTS?: any;
  SOURCE_PIE?: any;
  REPORTER_PIE?: any;
  TOP_FAILURE?: any;
  TOP_COMPLIANT?: any;
  DETAIL_REPORTS?: any;
  TOP_SENDER?: any;
};

const BACKEND_API_URL = _ENV_VARIABLES.NEXT_PUBLIC_BACKEND_API_URL;

export default async function Home({ searchParams }: SearchParamsProps) {
  const user = await getCurrentUser();
  let fromDashboard = searchParams.fromDashboard;
  const domainValue = removeHttp(searchParams.domain as string);

  let { startDateStart, endDateStart } = getLast30Days();

  const start_date = searchParams?.start_date
    ? removeHttp(searchParams.start_date as string)
    : fromDashboard
    ? "undefined"
    : startDateStart;
  const end_date = searchParams?.end_date
    ? removeHttp(searchParams.end_date as string)
    : fromDashboard
    ? "undefined"
    : endDateStart;

  let url = API_ROUTES.LIST_ALL_DOMAINS;
  const users = await getCurrentUser();

  const isTokenValid = await isTokenExpired(users.token);
  if (!isTokenValid) {
    signOut({ callbackUrl: "/" });
    return;
  }
  let headers: any = {
    "Content-Type": "application/json",
  };
  if (!isEmpty(users) && !isEmpty(users.token)) {
    headers["Authorization"] = `Bearer ${users.token}`;
  }
  let resData: any = {};

  try {
    const res = await fetch(`${BACKEND_API_URL}${url}`, {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    });
    if (res.status != 200) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    resData = await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    resData = {};
  }

  let filteredData = resData?.data?.filter((item: any) => {
    return item.is_verify;
  });
  const myArray =
    domainValue || (!isEmpty(filteredData) ? filteredData[0]?.domain : []);
  const domain = myArray || "";

  const page = searchParams.page
    ? removeHttp(searchParams.page as string)
    : "1";
  let pageSize = searchParams.page_size
    ? removeHttp(searchParams.page_size as string)
    : 10;
  let filterDetailsData = searchParams.filterDetails
    ? removeHttp(searchParams.filterDetails as string)
    : "sources";
  let searchDetails = searchParams.searchDetails
    ? removeHttp(searchParams.searchDetails as string)
    : "";
  let options = [10, 15, 20];
  if (typeof pageSize == "string") {
    pageSize = parseInt(pageSize, 10);
  }
  if (typeof pageSize === "number" && options.includes(pageSize)) {
  } else {
    pageSize = 10;
  }

  let response: any = await fetchDetailList(
    domain,
    start_date,
    end_date,
    page,
    pageSize,
    filterDetailsData,
    searchDetails
  );

  let {
    WIDGET_COUNTS,
    TOP_FAILURE,
    TOP_COMPLIANT,
    TOP_SENDER,
  }: DashboardDataTypes = !isEmpty(domain)
    ? await getDashboardData(domain, start_date, end_date, fromDashboard)
    : initDashboardDataResults;

  let props: any = {
    domain,
    start_date,
    end_date,
    page,
    pageSize,
    filterDetailsData,
    searchDetails,
    response,
    fromDashboard,
  };
  return (
    <div className="graphSection mb-5">
      <div className="dashboardTopCard">
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <ResultButton
              refetchData={domain ? domain : resData?.data[0]?.domain}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <Statistics
              fromDashboard={fromDashboard}
              data={WIDGET_COUNTS}
              resData={resData}
              selectedDomain={domain ? domain : resData?.data[0]?.domain}
              start_date={start_date}
              end_date={end_date}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mb-4">
          <Grid item xl={12} lg={12} xs={12}>
            <div className="dashboardSourceCard"></div>
          </Grid>
          <Grid item xl={12} lg={12} xs={12}>
            <div className="dashboardVolumeCard">
              <Volume
                domain={domain ? domain : resData?.data[0]?.domain}
                start_date={start_date}
                end_date={end_date}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <TopSources
              domainValue={domain ? domain : resData?.data[0]?.domain}
              failure={TOP_FAILURE}
              compliant={TOP_COMPLIANT}
              sender={TOP_SENDER}
              start_date={start_date}
              end_date={end_date}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <DetailedSources {...props} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

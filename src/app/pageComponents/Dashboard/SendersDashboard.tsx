"use client";
import { Grid } from "@mui/material";
import Statistics from "@/app/pageComponents/Dashboard/Statistics";
import Volume from "@/app/pageComponents/Dashboard/Volume";
import TopSources from "@/app/pageComponents/Dashboard/TopSources";
import DetailedSources from "@/app/pageComponents/Dashboard/DetailedSources";
import ResultButton from "@/app/pageComponents/Dashboard/ResultButton";
import MainLoader from "@/components/Loaders/MainLoader";
import { useStore } from "@/utils/store";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  _handleChangePage,
  _setPaginationObjectFn,
  createQueryString,
} from "@/@core/tableFunctions";
import {
  getFetcherWithAuth,
} from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
const SendersDashboard = ({
  domain,
  endDateProp,
  startDateProp,
  fromDashboard,
  filterDetailsData,
  searchDetails,
  pageProp,
  page_sizeProp,
  searchQuery,
  detail_type,
}: {
  endDateProp: any;
  startDateProp: any;
  domain: any;
  fromDashboard?: any;
  filterDetailsData?: any;
  searchDetails?: any;
  pageProp?: any;
  page_sizeProp?: any;
  searchQuery?: any;
  detail_type?: any;
}) => {
  const { firstDomain ,license } = useStore();
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [sender, setSender] = useState<any>([]);
  const [failure, setFailure] = useState<any>([]);
  const [complaint, setComplaint] = useState<any>([]);
  const getComplaintData = () => {
    let queryObject = {
      policy_published_domain: domain ? domain : firstDomain,
      ...( startDateProp && startDateProp !== "undefined"
        ? { start_date: dayjs(startDateProp).format("YYYY-MM-DD") }
        : {}),
      ...(endDateProp && endDateProp!== "undefined"
        ? { end_date: dayjs(endDateProp).format("YYYY-MM-DD") }
        : {}),
    };
    const qryStr = createQueryString(queryObject);
    getFetcherWithAuth(`${API_ROUTES.TOP_COMPLIANT_SOURCE_LIST}${qryStr}`)
      .then((response) => {
        setComplaint(response?.data);
      })
      .catch((err) => {
        setComplaint([...[]]);
      })
      .finally(() => {});
  };
  const getSendersData = () => {
    let queryObject = {
      policy_published_domain: domain ? domain : firstDomain,
      ...( startDateProp && startDateProp !== "undefined"
        ? { start_date: dayjs(startDateProp).format("YYYY-MM-DD") }
        : {}),
      ...(endDateProp && endDateProp!== "undefined"
        ? { end_date: dayjs(endDateProp).format("YYYY-MM-DD") }
        : {}),
    };
    const qryStr = createQueryString(queryObject);
    getFetcherWithAuth(`${API_ROUTES.DASHBOARD_SENDER_DETAIL_LISTS}${qryStr}`)
      .then((response) => {
        setSender(response?.data);
      })
      .catch((err) => {
        setSender([...[]]);
      })
      .finally(() => {});
  };
  const getFailureData = () => {
    let queryObject = {
      policy_published_domain: domain ? domain : firstDomain,
      ...( startDateProp && startDateProp !== "undefined"
        ? { start_date: dayjs(startDateProp).format("YYYY-MM-DD") }
        : {}),
      ...(endDateProp && endDateProp!== "undefined"
        ? { end_date: dayjs(endDateProp).format("YYYY-MM-DD") }
        : {}),
    };
    const qryStr = createQueryString(queryObject);
    getFetcherWithAuth(`${API_ROUTES.TOP_FAILURE_SOURCE_LIST}${qryStr}`)
      .then((response) => {
        setFailure(response?.data);
      })
      .catch((err) => {
        setFailure([...[]]);
      })
      .finally(() => {});
  };
  const handleSourceDashboard = () => {
    setisLoading(true);
    let queryObject = {
      policy_published_domain: domain,
      ...(startDateProp && startDateProp !== "undefined"
        ? { start_date: dayjs(startDateProp).format("YYYY-MM-DD") }
        : {}),
      ...(endDateProp && endDateProp !== "undefined"
        ? { end_date: dayjs(endDateProp).format("YYYY-MM-DD") }
        : {}),
    };
    const qryStr = createQueryString(queryObject);
    getFetcherWithAuth(`${API_ROUTES.WIDGET_COUNT}${qryStr}`)
      .then((response) => {
        setData(response);
        setisLoading(false);
      })
      .catch((err) => {
        setData({});
        setisLoading(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    handleSourceDashboard();
    getSendersData();
    getFailureData();
    getComplaintData()
  }, [domain, startDateProp, endDateProp]);
  let props: any = {
    domain,
    start_date: startDateProp,
    end_date: endDateProp,
    filterDetailsData,
    searchDetails,
    fromDashboard,
    pageProp,
    page_sizeProp,
    searchQuery,
    detail_type,
  };
  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="graphSection mb-5">
          <div className="dashboardTopCard">
            <Grid container spacing={0}>
              <Grid item xs={12} lg={12}>
                <ResultButton
                  refetchData={domain || firstDomain}
                  fromDashboard={fromDashboard}
                />
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs={12} lg={12}>
                <Statistics
                  fromDashboard={fromDashboard}
                  data={data?.data}
                  selectedDomain={domain || firstDomain}
                  start_date={startDateProp}
                  end_date={endDateProp}
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
                    domain={domain || firstDomain}
                    start_date={startDateProp}
                    end_date={endDateProp}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} lg={12}>
                <TopSources
                  domainValue={domain || firstDomain}
                  failure={failure}
                  compliant={complaint}
                  sender={sender}
                  start_date={startDateProp}
                  end_date={endDateProp}
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
      )}
    </>
  );
};
export default SendersDashboard;
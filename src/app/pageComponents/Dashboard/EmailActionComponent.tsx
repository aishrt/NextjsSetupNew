"use client";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getLast30Days } from "@/@core/helper";
import { toast } from "react-toastify";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import dayjs, { Dayjs } from "dayjs";
import { useStore } from "@/utils/store";

import LineGraphComponent from "./linegraph";
import InformationTooltip from "@/components/InformationTooltip";
import { API_ROUTES } from "@/@core/apiRoutes";
import DateRangePicker from "../../../components/ui/DateRangePicketMui";
import SelectAsync from "../../../components/common/SelectAsync";
import EmailActionLoader from "../../../components/ui/Loaders/EmailActionLoader";
import { createQueryString } from "@/@core/tableFunctions";
import UpgradeSubscription from "../../../components/UpgradeSubscription";
import { checkHistory } from "@/@core/helper";

const EmailActionComponent = () => {
  const { firstDomain, licenseValidation } = useStore();
  const [domain, setDomain] = useState<string>(firstDomain);
  let { startDateStart, endDateStart } = getLast30Days();
  const formattedStartDateNew = dayjs(startDateStart);
  const formattedCurrentDateNew = dayjs(endDateStart);
  const [startDate, setStartDate] = useState<Dayjs | null>(
    formattedStartDateNew
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(formattedCurrentDateNew);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [graphDate, setGraphData] = useState<any>([]);
  const [heading, setHeading] = useState<any>("");


  useEffect(() => {
    if (domain) {
      onFilterHandler();
    }
  }, [domain]);

  const generateSubtitleText = () => {
    const formattedStartDateNew = dayjs(startDate);
    const formattedCurrentDateNew = dayjs(endDate);

    const start = new Date(formattedStartDateNew.toString());
    const end = new Date(formattedCurrentDateNew.toString());
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    const head = `Last ${differenceInDays} Days`;
    setHeading(head);
  };
  const onFilterHandler = () => {
    setIsLoading(true);
    if (!domain) {
      setIsLoading(false);
      toast.error("Please select any domain.");
      return;
    }
    generateSubtitleText();
    let queryObject = {
      policy_published_domain: domain ? domain : firstDomain,
      start_date: startDate ? dayjs(startDate).format("YYYY-MM-DD") : null,
      end_date: endDate ? dayjs(endDate).format("YYYY-MM-DD") : null,
    };
    let qryStr = createQueryString(queryObject);

    getFetcherWithAuth(`${API_ROUTES.EMAIL_DISPOSITION}${qryStr}`)
      .then((res: any) => {
        if (res.code === 200) {
          setGraphData(res.data);
        } else {
          toast.error(res.message || "An unexpected error occurred");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
        generateSubtitleText();
      });
  };

  const handleChangeDomain = (event: any) => {
    setDomain(event.domain);
  };

  const [checkHistoryVal, setCheckHistory] = useState(false);
  useEffect(() => {
    if (startDate || endDate) {
      setCheckHistory(
        checkHistory(startDate, endDate, licenseValidation?.historyDate)
      );
    }
  }, [startDate, endDate]);

  return (
    <div className="dashboardTopCard">
      <div className="dashboardTop-Content">
        <h4>
          Email Disposition <InformationTooltip name="ED_main_hd" />
        </h4>
        <p>{heading}</p>
      </div>

      <div className="mb-4" style={{ padding: "10px 0 15px 0" }}>
        <h6 style={{ marginBottom: "10px", fontWeight: "bolder" }}>Filters:</h6>
        <Grid container columnSpacing={2}>
          <Grid item lg={3} md={3} sm={6}>
            <SelectAsync
              searchType={`domainListing`}
              placeholder="Domain"
              required
              onChange={handleChangeDomain}
              value={
                domain
                  ? { value: domain, label: domain }
                  : { value: firstDomain, label: firstDomain }
              }
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6}>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </Grid>

          <Grid item lg={3} md={3} sm={6}>
            {!checkHistoryVal ? (
              <Button
                className="btn heightLarge secondaryButton"
                onClick={onFilterHandler}
                disabled={!(startDate && endDate)}
                size="large"
              >
                Check Report
              </Button>
            ) : (
              <UpgradeSubscription
                text={"Check Report"}
                cssVal={"btn heightLarge secondaryButton"}
              />
            )}
          </Grid>
        </Grid>
      </div>

      <div className="card-body">
        {isLoading ? (
          <EmailActionLoader />
        ) : (
          <LineGraphComponent chart={graphDate.graph_data} />
        )}
      </div>
    </div>
  );
};
export default EmailActionComponent;

"use client";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React, { useEffect, useState, memo } from "react";
import EmailIcon from "@mui/icons-material/Email";
import dayjs, { Dayjs } from "dayjs";
import { useStore } from "@/utils/store";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import { API_ROUTES } from "@/@core/apiRoutes";
import { Grid } from "@mui/material";
import SelectAsync from "@/components/Form/SelectAsync";
import DateRangePicker from "@/components/Form/DateRangePicketMui";
import { checkHistory } from "@/@core/helper";
import UpgradeSubscription from "../Others/UpgradeSubscription";
import UpgradePlanComponent from "../Others/UpgradePlanComponent";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const Statistics = ({
  data,
  selectedDomain,
  start_date,
  end_date,
  resData,
  fromDashboard,
}: {
  data: any;
  selectedDomain: any;
  start_date: any;
  end_date: any;
  resData?: any;
  fromDashboard?: any;
}) => {
  const router = useRouter();
  const { firstDomain, historyDate } = useStore();
  const [domain, setDomain] = React.useState<string>(selectedDomain);
  const [filterLoading, setFilterLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setStoredDashboardUrl } = useStore();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [checkHistoryVal, setCheckHistory] = useState(false);

  useEffect(() => {
    setStoredDashboardUrl(selectedDomain);
  }, [selectedDomain]);

  useEffect(() => {
    if (start_date) {
      setStartDate(dayjs(start_date));
    }
    if (end_date) {
      setEndDate(dayjs(end_date));
    }
    // }
  }, [start_date, end_date, fromDashboard]);

  useEffect(() => {
    if (startDate || endDate) {
      setCheckHistory(
        checkHistory(
          startDate,
          endDate,
          dayjs(historyDate?.startDate).format("DD/MM/YYYY")
        )
      );
    }
  }, [startDate, endDate]);

  const handleClick = () => {
    setShowLoader(true);
    setFilterLoading(true);
    setIsLoading(true);
    setShow(true);

    if (domain == "undefined") {
      toast.error("Domain is required");
      setIsLoading(false);
    }
    if (!startDate && !endDate) {
      toast.error("Please select both start and end dates");
      setFilterLoading(false);
      setShowLoader(false);
      setIsLoading(false);

      return;
    }

    if (!startDate) {
      toast.error("Please select start date");
      setFilterLoading(false);
      setShowLoader(false);
      setIsLoading(false);

      return;
    }

    if (!endDate) {
      toast.error("Please select end date");
      setFilterLoading(false);
      setShowLoader(false);
      setIsLoading(false);

      return;
    }
    let url = `${API_ROUTES.DASHBOARD}/sender-dashboard?policy_published_domain=${domain}`;
    let formattedStartDate;
    if (startDate) {
      if (typeof startDate == "string") {
        formattedStartDate = startDate;
      } else {
        formattedStartDate = startDate ? startDate?.format("YYYY-MM-DD") : "";
      }
      url = url.concat(`&start_date=${formattedStartDate}`);
    }
    if (endDate) {
      let formattedEndDate;
      if (typeof endDate == "string") {
        formattedEndDate = endDate;
      } else {
        formattedEndDate = endDate ? endDate?.format("YYYY-MM-DD") : "";
      }
      url = url.concat(`&end_date=${formattedEndDate}`);
    }
    router.push(url);
    setTimeout(() => {
      setFilterLoading(false);
    }, 0);
  };

  const handleChangeDomain = (event: any) => {
    setDomain(event?.domain);
    window.localStorage.setItem("dashboardUrl", event?.domain);
    if (fromDashboard) {
      router.push(
        `${API_ROUTES.DASHBOARD}/sender-dashboard?policy_published_domain=${event?.domain}&fromDashboard=true&page=1&page_size=10&start_date=${start_date}&end_date=${end_date}`
      );
    } else {
      router.push(
        `${API_ROUTES.DASHBOARD}/sender-dashboard?policy_published_domain=${event?.domain}&page=1&page_size=10&start_date=${start_date}&end_date=${end_date}`
      );
    }
  };
  useEffect(() => {
    if (end_date !== "undefined") {
      setEndDate(end_date);
    } else if (startDate !== null) {
      setEndDate(dayjs());
    }
  }, [startDate]);
  useEffect(() => {
    if (
      start_date &&
      dayjs(start_date)?.isBefore(
        dayjs(historyDate?.startDate).format("YYYY-MM-DD")
      )
    ) {
      setShowUpgrade(true);
    } else {
      setShowUpgrade(false);
    }
  }, [start_date]);
  const handleCloseUpgradePlan = () => {
    setShowUpgrade(false);
  };
  console.log(
    start_date,
    dayjs(start_date)?.isBefore(
      dayjs(historyDate?.startDate).format("YYYY-MM-DD")
    ),
    historyDate?.startDate,
    "++++++++"
  );
  return (
    <>
      {showUpgrade && (
        <UpgradePlanComponent
          initialOpenModal={showUpgrade}
          onClose={handleCloseUpgradePlan}
        />
      )}
      <div className="dashboardTopCard pb-0">
        <div className="container-fluid">
          <div className="row">
            <Grid container spacing={2} sx={{ mb: 4, mt: 3 }}>
              <Grid item lg={3}>
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
              <Grid item lg={2} md={2} sm={6}>
                {!checkHistoryVal ? (
                  <Button
                    className="btn heightLarge secondaryButton"
                    onClick={() => {
                      handleClick();
                    }}
                    size="large"
                  >
                    Filter
                  </Button>
                ) : (
                  <UpgradeSubscription
                    text={"Filter"}
                    cssVal={"btn heightLarge secondaryButton"}
                  />
                )}
              </Grid>
            </Grid>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="cardInner volume">
                <div className="cardInnerContent">
                  <div className="cardIcon">
                    <EmailIcon className="iconSize volume" />
                  </div>
                  <div className="cardText">
                    <h4>
                      Emails <InformationTooltip name="SND_email" />
                    </h4>
                    <p>
                      {`${
                        data?.TOTAL_EMAIL_VOLUME_COUNT != null
                          ? data?.TOTAL_EMAIL_VOLUME_COUNT
                          : "0.00"
                      }`}
                      {startDate && endDate && (
                        <span className="">
                          <span
                            className={`${
                              data?.TOTAL_EMAIL_VOLUME_COUNT_TREND?.trend ==
                              "decrease"
                                ? "redColor"
                                : data?.TOTAL_EMAIL_VOLUME_COUNT_TREND?.trend ==
                                  "increase"
                                ? "greenColor"
                                : "yellowColor"
                            } `}
                          >
                            <i
                              className={`fa-solid fa-arrow-${
                                data?.TOTAL_EMAIL_VOLUME_COUNT_TREND?.trend ==
                                "decrease"
                                  ? "down"
                                  : data?.TOTAL_EMAIL_VOLUME_COUNT_TREND
                                      ?.trend == "increase"
                                  ? "up"
                                  : data?.TOTAL_EMAIL_VOLUME_COUNT_TREND
                                      ?.trend == "no change"
                                  ? "right"
                                  : ""
                              }`}
                            ></i>
                            {`(${
                              data?.TOTAL_EMAIL_VOLUME_COUNT_TREND != null
                                ? data?.TOTAL_EMAIL_VOLUME_COUNT_TREND
                                    ?.percentage > 0
                                  ? parseInt(
                                      data?.TOTAL_EMAIL_VOLUME_COUNT_TREND
                                        ?.percentage
                                    )
                                  : data?.TOTAL_EMAIL_VOLUME_COUNT_TREND
                                      ?.percentage
                                : "0.00"
                            }%)`}
                          </span>
                          {fromDashboard ? (
                            ""
                          ) : (
                            <span className="previousPeriod">
                              vs.previous period:
                              {
                                data?.TOTAL_EMAIL_VOLUME_COUNT_TREND
                                  ?.last_cycle_count
                              }
                            </span>
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="cardInner compliants">
                <div className="cardInnerContent">
                  <div className="cardIcon">
                    <Image alt={``} src={_IMG.greenCheck} loading="lazy" />
                  </div>
                  <div className="cardText">
                    <h4>
                      Compliant <InformationTooltip name="SND_compliant" />
                    </h4>
                    <p>
                      {`${
                        data?.COMPLIANT_COUNT != null
                          ? data?.COMPLIANT_COUNT
                          : "0.00"
                      }`}
                      {startDate && endDate && (
                        <span className="">
                          <span
                            className={`${
                              data?.COMPLIANT_COUNT_TREND?.trend == "decrease"
                                ? "redColor"
                                : data?.COMPLIANT_COUNT_TREND?.trend ==
                                  "increase"
                                ? "greenColor"
                                : "yellowColor"
                            } `}
                          >
                            <i
                              className={`fa-solid fa-arrow-${
                                data?.COMPLIANT_COUNT_TREND?.trend == "decrease"
                                  ? "down"
                                  : data?.COMPLIANT_COUNT_TREND?.trend ==
                                    "increase"
                                  ? "up"
                                  : data?.COMPLIANT_COUNT_TREND?.trend ==
                                    "no change"
                                  ? "right"
                                  : ""
                              }`}
                            ></i>
                            {`(${
                              data?.COMPLIANT_COUNT_TREND != null
                                ? data?.COMPLIANT_COUNT_TREND?.percentage > 0
                                  ? parseInt(
                                      data?.COMPLIANT_COUNT_TREND?.percentage
                                    )
                                  : data?.COMPLIANT_COUNT_TREND?.percentage
                                : "0.00"
                            }%)`}
                          </span>
                          {fromDashboard ? (
                            ""
                          ) : (
                            <span className="previousPeriod">
                              vs.previous period:
                              {data?.COMPLIANT_COUNT_TREND?.last_cycle_count}
                            </span>
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="cardInner failures">
                <div className="cardInnerContent">
                  <div className="cardIcon">
                    <Image src={_IMG.failureIcon} alt="" loading="lazy" />
                  </div>
                  <div className="cardText">
                    <h4>
                      Failure <InformationTooltip name="SND_failure" />
                    </h4>
                    <p>
                      {`${
                        data?.FAILURE_COUNT != null
                          ? data?.FAILURE_COUNT
                          : "0.00"
                      }`}
                      {startDate && endDate && (
                        <span className="">
                          <span
                            className={`${
                              data?.FAILURE_COUNT_TREND?.trend == "decrease"
                                ? "redColor"
                                : data?.FAILURE_COUNT_TREND?.trend == "increase"
                                ? "greenColor"
                                : "yellowColor"
                            } `}
                          >
                            <i
                              className={`fa-solid fa-arrow-${
                                data?.FAILURE_COUNT_TREND?.trend == "decrease"
                                  ? "down"
                                  : data?.FAILURE_COUNT_TREND?.trend ==
                                    "increase"
                                  ? "up"
                                  : data?.FAILURE_COUNT_TREND?.trend ==
                                    "no change"
                                  ? "right"
                                  : ""
                              }`}
                            ></i>
                            {`(${
                              data?.FAILURE_COUNT_TREND != null
                                ? data?.FAILURE_COUNT_TREND?.percentage > 0
                                  ? parseInt(
                                      data?.FAILURE_COUNT_TREND?.percentage
                                    )
                                  : data?.FAILURE_COUNT_TREND?.percentage
                                : "0.00"
                            }%)`}
                          </span>
                          {fromDashboard ? (
                            ""
                          ) : (
                            <span className="previousPeriod">
                              vs.previous period:
                              {data?.FAILURE_COUNT_TREND?.last_cycle_count}
                            </span>
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="cardInner senders">
                <div className="cardInnerContent">
                  <div className="cardIcon">
                    <Image
                      className="imgBorder"
                      alt={``}
                      src={_IMG.sendEmail}
                      loading="lazy"
                    />
                  </div>
                  <div className="cardText">
                    <h4>
                      Senders <InformationTooltip name="SND_senders" />
                    </h4>
                    <p>
                      {`${
                        data?.TOTAL_SOURCE_COUNT != null
                          ? data?.TOTAL_SOURCE_COUNT
                          : "0.00"
                      }`}
                      {startDate && endDate && (
                        <span className="">
                          <span
                            className={`${
                              data?.TOTAL_SOURCE_COUNT_TREND?.trend ==
                              "decrease"
                                ? "redColor"
                                : data?.TOTAL_SOURCE_COUNT_TREND?.trend ==
                                  "increase"
                                ? "greenColor"
                                : "yellowColor"
                            } `}
                          >
                            <i
                              className={`fa-solid fa-arrow-${
                                data?.TOTAL_SOURCE_COUNT_TREND?.trend ==
                                "decrease"
                                  ? "down"
                                  : data?.TOTAL_SOURCE_COUNT_TREND?.trend ==
                                    "increase"
                                  ? "up"
                                  : data?.TOTAL_SOURCE_COUNT_TREND?.trend ==
                                    "no change"
                                  ? "right"
                                  : ""
                              }`}
                            ></i>
                            {`(${
                              data?.TOTAL_SOURCE_COUNT_TREND?.percentage != null
                                ? data?.TOTAL_SOURCE_COUNT_TREND?.percentage > 0
                                  ? parseInt(
                                      data?.TOTAL_SOURCE_COUNT_TREND?.percentage
                                    )
                                  : data?.TOTAL_SOURCE_COUNT_TREND?.percentage
                                : "0.00"
                            }%)`}
                          </span>
                          {fromDashboard ? (
                            ""
                          ) : (
                            <span className="previousPeriod">
                              vs.previous period:
                              {data?.TOTAL_SOURCE_COUNT_TREND?.last_cycle_count}
                            </span>
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Statistics);


import { isEmpty } from "lodash";
import moment from "moment";
import dayjs from "dayjs";

export const checkHistory = (
  startDate: any,
  endDate: any,
  historyDateData: string
) => {
  const getOldestDate = (startDate: any, endDate: any) => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      return start.isBefore(end) ? start : end;
    }
    return startDate ? dayjs(startDate) : dayjs(endDate);
  };
  const dateVal = getOldestDate(startDate, endDate);
  if (historyDateData && dateVal) {
    const updatedDate = dayjs(dateVal);
    const [month, day, year] = historyDateData.split("/");
    const historyDate = dayjs(`${year}-${month}-${day}`);
    if (updatedDate.isBefore(historyDate)) {
      return true; 
    }
  }
  return false; 
};


export const getFirstAndLastDayOfTheMonth = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1));
  const formattedStartDate = firstDayOfMonth.toISOString().split("T")[0];
  const formattedCurrentDate = today.toISOString().split("T")[0];
  return {
    startDateStart: formattedStartDate,
    endDateStart: formattedCurrentDate,
  };
};

export const getLast30Days = () => {
  const today = new Date(); 
  const last30Days = new Date(today);
  last30Days.setDate(today.getDate() - 30); 
  const formattedStartDate = last30Days.toISOString().split("T")[0];
  const formattedEndDate = today.toISOString().split("T")[0];
  return {
    startDateStart: formattedStartDate,
    endDateStart: formattedEndDate,
  };
};


export const _errorMsg = (err: any) => {
  return err?.message
    ? err.message
    : err?.data?.message
    ? err?.data?.message
    : "";
};






export const removeFirstPart = (name: any) => {
  const parts = name.split(".");
  parts.shift();
  return parts.join(".");
};

export const formatDateFn = (dateStr: any, onlyDate = false) => {
  return !isEmpty(dateStr)
    ? moment(dateStr).format(onlyDate ? "ll" : "lll")
    : "";
};


export const calculateStartDate = (planType: string, endDate = moment()) => {
  const regex = /(\d+)\s*([a-zA-Z]+)/g;
  let match;
  const components = {
    years: 0,
    months: 0,
    days: 0,
  };
  if (planType.toLowerCase() === "yearly") {
    components.years = 1;
  } else if (planType.toLowerCase() === "monthly") {
    components.months = 1;
  } else {
    while ((match = regex.exec(planType)) !== null) {
      const value = parseInt(match[1], 10);
      const unit = match[2].toLowerCase();
      switch (unit) {
        case "month":
        case "months":
          components.months += value;
          break;
        case "year":
        case "years":
          components.years += value;
          break;
        case "day":
        case "days":
          components.days += value;
          break;
        default:
          console.warn(`Unknown unit: ${unit}`);
      }
    }
  }
  const startDate = moment(endDate)
    .subtract(components.years, "years")
    .subtract(components.months, "months")
    .subtract(components.days, "days");

  return { startDate, endDate };
};
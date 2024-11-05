import { default as dayjs } from "dayjs";
dayjs.extend(relativeTime);
import relativeTime from "dayjs/plugin/relativeTime";

export const formatMoney = (str: string) => `$ ${str}`;

export const formatPercent = (str: string) => `${str} %`;

export const formatString = (str: string) => str.replace("_", " ");

export const toFixedNum = (num: number) => {
  let directly = parseFloat(num.toFixed(3));
  return directly;
};

//formatNumberWithCommas(123456789); // Returns "123,456,789"
export const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//------------------------------------  Format date ------------------------------------

export const formatDateTime = (date: any) =>
  dayjs(date).format("MMMM D, YYYY h:mm A");

export const formatDateOnly = (date: any) => dayjs(date).format("MMMM D, YYYY");

export const formatDate = (date: any) =>
  dayjs(date).format("MMMM D, YYYY h:mm A");

export const timeFromNow = (date: any) => dayjs().from(dayjs(date), true);

export const fMinDate = (date: any) => dayjs(date).format("DD/MM/YYYY");

//------------------------------------ Trim lengthy text to spesific count  ------------------------------------

export const trimSixty = (string: string) => {
  const result = string?.slice(0, 60) + "...";
  return result;
};
export const trimThirty = (string: string) => {
  const result = string?.slice(0, 30) + "...";
  return result;
};
export const trimTwenty = (string: string) => {
  const result = string?.slice(0, 20) + "...";
  return result;
};
export const trimTen = (string: string) => {
  const result = string?.slice(0, 10) + "..";
  return result;
};

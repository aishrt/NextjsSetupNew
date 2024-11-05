import { DEFAULT_ROW_PER_PAGE } from "@/constants/pagination";
import { isEmpty } from "@/utils/isEmpty";
import * as _ from "lodash";

export const _setPaginationObjectFn = (
  prevState: any,
  metaData: any,
  triggerApi = false
) => {
  return {
    ...prevState,
    page: _.toNumber(metaData?.page_number) || 0,
    // rowsPerPage: _.toNumber(metaData?.limit) || DEFAULT_ROW_PER_PAGE,
    totalItems: _.toNumber(metaData?.count) || 0,
    totalPages: _.toNumber(metaData?.total_pages) || 0,
    triggerApi: triggerApi,
  };
};
export const createQueryString = (queryObject: any, url?: any) => {
  Object.keys(queryObject).forEach((key) =>
    queryObject[key] === undefined ||
    queryObject[key] === null ||
    queryObject[key] === ""
      ? delete queryObject[key]
      : {}
  );
  const queryString = Object.entries(queryObject)
    .map(([k, v]) => {
      return `${k}=${queryObject[k]}`;
    })
    .join("&");

  let symbolUsed = "?";
  if (url !== undefined) {
    symbolUsed = url.includes("?") ? "&" : "?";
  }
  const qryStr = !isEmpty(queryString) ? symbolUsed + queryString : "";
  return !isEmpty(url) ? url + qryStr : qryStr;
};

export const _handleChangePage = (
  event: any,
  newPage: any,
  setPaginationObject: any,
  setSelected?: any
) => {
  try {
    if (setSelected !== undefined) {
      setSelected([]);
    }
    setPaginationObject((prevState: any) => {
      return {
        ...prevState,
        page: newPage + 1,
        triggerApi: true,
      };
    });
  } catch (e) {}
};
export const _handleChangeRowsPerPage = (
  event: any,
  setPaginationObject: any
) => {
  const rowsPerPage = parseInt(event.target.value, DEFAULT_ROW_PER_PAGE);
  setPaginationObject((prevState: any) => ({
    ...prevState,
    page: 1,
    rowsPerPage,
    triggerApi: true,
  }));
};

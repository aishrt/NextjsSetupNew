import { isEmpty } from "@/utils/isEmpty";
import getCurrentUser from "@/lib/session";
import { signOut } from "next-auth/react";
import { API_ROUTES } from "@/@core/apiRoutes";
import { trim } from "lodash-es";
import { toast } from "react-toastify";



export const isTokenExpired = async (token: string) => {
  const base64Url = token?.split(".")[1];
  const base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const { exp } = JSON.parse(jsonPayload);
  const expired = new Date(exp * 1000).getTime() - new Date().getTime() > 1;
  return expired;
};

export const getFetcherWithAuth = async (
  url: string,
  checkToken: boolean = true
) => {
  const users = await getCurrentUser();

  if (checkToken) {
    const isTokenValid = await isTokenExpired(users.token);
    if (!isTokenValid) {
      await signOut({ callbackUrl: "/" });
      return;
    }
  }

  let headers: any = {
    "Content-Type": "application/json",
  };
  if (!isEmpty(users) && !isEmpty(users.token)) {
    headers["Authorization"] = `Bearer ${users.token}`;
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
      {
        method: "GET",
        headers,
        next: { revalidate: 0 },
      }
    );
    if (!res.ok) {
      const resData = await res.json();
      console.log("Fetch error:", resData?.error);
      toast.error(`${resData?.message}`);
    }

    return await generateResponse(res);
  } catch (e) {
    return {
      message: "Something went wrong!",
      status: false,
    };
  }
};

export const getLicenseData = async (checkToken?: boolean) => {
  return await getFetcherWithAuth(
    API_ROUTES.ACCOUNT_LICENSE_DETAIL,
    checkToken
  );
};

export const getFetcher = async (url: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
      { next: { revalidate: 0 } }
    );
    return await generateResponse(res);
  } catch (e) {
    return {};
  }
};

export const commonFetcherFn = async (
  url: string,
  method: string = "GET",
  postData: any = {},
  isLambda: boolean = false,
  checkToken: boolean = false,
  contentType: string = "",
  bodyStringify: boolean = true
): Promise<any> => {
  url = trim(url);
  let users: any = {};

  if (checkToken) {
    users = await getCurrentUser();
    const isTokenValid = await isTokenExpired(users?.token);
    if (!isTokenValid) {
      await signOut({ callbackUrl: "/" });
      return;
    }
  }
  let headers: any = {};
  if (!isEmpty(contentType)) {
    headers["Content-Type"] = contentType;
  }
  if (checkToken && !isEmpty(users) && !isEmpty(users?.token)) {
    headers["Authorization"] = `Bearer ${users?.token}`;
  }

  try {
    const isHttp = url.startsWith("http://") || url.startsWith("https://");
    const baseUrl = isLambda
      ? process.env.NEXT_PUBLIC_BACKEND_API_URL_AWS_LAMBDA
      : process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const res = await fetch(isHttp ? url : `${baseUrl}${url}`, {
      method,
      ...(!isEmpty(headers) && { headers }),
      ...(!isEmpty(postData) && {
        body: bodyStringify ? JSON.stringify(postData) : postData,
      }),
    });
    return await generateResponse(res);
  } catch (error) {
    console.log("Error in app :", {
      method,
      ...(!isEmpty(headers) && { headers }),
      ...(!isEmpty(postData) && { body: JSON.stringify(postData) }),
    });
    return {};
  }
};

export const showAllDomain = async () => {
  const users = await getCurrentUser();
  const isTokenValid = await isTokenExpired(users.token);
  if (!isTokenValid) {
    await signOut({ callbackUrl: "/" });
    return;
  }
  let headers: any = {
    "Content-Type": "application/json",
  };
  if (!isEmpty(users) && !isEmpty(users.token)) {
    headers["Authorization"] = `Bearer ${users.token}`;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.LIST_ALL_DOMAINS}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  let resData = await res.json();
  return resData;
};

export const putFormFetcher = async (
  url: string,
  formData: FormData,
  contentType: string = "application/json"
) => {
  const user = await getCurrentUser();
  let headers: any = {};
  if (!isEmpty(user) && !isEmpty(user.token)) {
    Accept: "application/json";
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
    method: "PUT",
    headers,
    body: formData,
    next: {
      revalidate: 0,
    },
  });

  let resData: any = {
    message: "Something went wrong!",
    status: false,
  };
  try {
    resData = await res.json();
    resData.status = true;
  } catch (e) {
    console.log("Error parsing JSON response", e);
  }
  resData.status =
    !isEmpty(resData) &&
    (resData?.code === 200 || resData?.code === 201) &&
    (res.status === 200 || res.status === 201);
  return resData;
};

export const putFetcher = async (
  url: string,
  postData: object,
  contentType: string = "application/json"
) => {
  const user = await getCurrentUser();
  let headers: any = {
    "Content-Type": contentType,
  };
  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(postData),
    next: {
      revalidate: 0,
    },
  });

  let resData: any = {
    message: "Something went wrong!",
    status: false,
  };
  try {
    resData = await res.json();
    resData.status = true;
  } catch (e) {}
  resData.status =
    !isEmpty(resData) &&
    (resData?.code === 200 || resData?.code === 201) &&
    (res.status === 200 || res.status === 201);
  return resData;
};

export const postFetcher = async (
  url: string,
  postData: object,
  contentType: string = "application/json"
) => {
  const user = await getCurrentUser();
  let headers: any = {
    "Content-Type": contentType,
  };
  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(postData),
    next: {
      revalidate: 0,
    },
  });

  let resData: any = {
    message: "Something went wrong!",
    status: false,
  };
  try {
    resData = await res.json();
    resData.status = true;
  } catch (e) {
    console.log("e", e, JSON.stringify(res));
  }
  resData.status =
    !isEmpty(resData) &&
    (resData?.code === 200 || resData?.code === 201) &&
    (res.status === 200 || res.status === 201);
  return resData;
};

export const postFetcherFormData = async (
  url: string,
  postData: any,
  contentType: string = "application/json"
) => {
  const user = await getCurrentUser();
  let headers: any = {};

  // Only set Content-Type for JSON
  if (contentType !== "multipart/form-data") {
    headers["Content-Type"] = contentType;
  }

  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
    method: "POST",
    headers,
    body: postData,
    next: {
      revalidate: 0,
    },
  });

  let resData: any = {
    message: "Something went wrong!",
    status: false,
  };
  try {
    resData = await res.json();
    resData.status = true;
  } catch (e) {
    console.log("e", e, JSON.stringify(res));
  }
  resData.status =
    !isEmpty(resData) &&
    (resData?.code === 200 || resData?.code === 201) &&
    (res.status === 200 || res.status === 201);
  return res;
};

export const postFetcherLambda = async (
  url: string,
  postData: object,
  contentType: string = "application/json"
): Promise<any> => {
  const user = await getCurrentUser();
  const headers: Record<string, string> = {
    "Content-Type": contentType,
  };
  let apiMsg;
  let apiError;
  try {
    const workingUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL_AWS_LAMBDA}${url}`;

    const myJson = JSON.stringify(postData);

    const response: any = await fetch(
      workingUrl,

      {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(postData),
      }
    );
    if (!response.ok) {
      const resError = await response.json();
      apiMsg = resError?.message;
      apiError = resError?.error;
      toast.error(`${apiMsg}`);
      return;
      // throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const resData = await response.json();
    resData.status = true;
    return resData;
  } catch (error: any) {
    return {
      message: apiMsg ? apiMsg : "Something went wrong!",
      status: false,
    };
  }
};

export const deleteFetcher = async (
  url: string,
  contentType: string = "application/json"
) => {
  const user = await getCurrentUser();
  let headers: any = {
    "Content-Type": contentType,
  };
  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
    method: "DELETE",
    headers,
    next: {
      revalidate: 0,
    },
  });

  let resData: any = {
    message: "Something went wrong!",
    status: false,
  };
  try {
    resData = await res.json();
    resData.status = true;
  } catch (e) {
    console.log("e", e, JSON.stringify(res));
  }
  resData.status =
    !isEmpty(resData) &&
    (resData?.code === 200 || resData?.code === 201) &&
    (res.status === 200 || res.status === 201);
  return resData;
};

export const fetchSourceDetails = async (
  domain: string,
  base_domain: string,
  org_name: string,
  startDate: any,
  endDate: any,
  page: string,
  pageSize: any,
  filterDetails: string,
  searchDetails: string
) => {
  const users = await getCurrentUser();

  const isTokenValid = await isTokenExpired(users.token);
  if (!isTokenValid) {
    await signOut({ callbackUrl: "/" });
    return;
  }
  let headers: any = {
    "Content-Type": "application/json",
  };
  if (!isEmpty(users) && !isEmpty(users.token)) {
    headers["Authorization"] = `Bearer ${users.token}`;
  }
  var headerAuthentication: any = {
    method: "GET",
    headers,
    next: {
      revalidate: 0,
    },
  };
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.SOURCE_DETAILS_LIST}?policy_published_domain=${domain}&org_name=${org_name}&page=${page}&page_size=${pageSize}&detail_type=${filterDetails}`;
  if (startDate !== "undefined" && endDate !== "undefined") {
    url = url.concat(`&start_date=${startDate}&end_date=${endDate}`);
  } else if (startDate !== "undefined") {
    url = url.concat(`&start_date=${startDate}`);
  } else if (endDate !== "undefined") {
    url = url.concat(`&end_date=${endDate}`);
  }
  if (searchDetails && searchDetails != "") {
    url = url.concat(`&search_query=${searchDetails}`);
  }
  let response = await fetch(url, headerAuthentication);
  const data = await response.json();
  return data;
};

export const fetchDetailList = async (
  domain: string,
  startDate: any,
  endDate: any,
  page: string,
  pageSize: any,
  filterDetails: string,
  searchDetails: string
) => {
  try {
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
    var headerAuthentication: any = {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    };
    let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.DETAIL_REPORT_LIST}?policy_published_domain=${domain}&search_query=${searchDetails}&page_size=${pageSize}&page=${page}&detail_type=${filterDetails}`;
    if (startDate !== "undefined" && endDate !== "undefined") {
      url = url.concat(`&start_date=${startDate}&end_date=${endDate}`);
    } else if (startDate !== "undefined") {
      url = url.concat(`&start_date=${startDate}`);
    } else if (endDate !== "undefined") {
      url = url.concat(`&end_date=${endDate}`);
    }
    if (searchDetails && searchDetails != "") {
      url = url.concat(`&search_query=${searchDetails}`);
    }
    let response = await fetch(url, headerAuthentication);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

export const fetchSourceDetailsGeoList = async (
  domain: string,
  base_domain: string,
  org_name: string,
  startDate: any,
  endDate: any,
  filterDetails: string,
  searchDetails: string
) => {
  const users = await getCurrentUser();

  const isTokenValid = await isTokenExpired(users.token);
  if (!isTokenValid) {
    await signOut({ callbackUrl: "/" });
    return;
  }
  let headers: any = {
    "Content-Type": "application/json",
  };
  if (!isEmpty(users) && !isEmpty(users.token)) {
    headers["Authorization"] = `Bearer ${users.token}`;
  }
  var headerAuthentication: any = {
    method: "GET",
    headers,
    next: {
      revalidate: 0,
    },
  };
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.SOURCE_GEO_DETAILS_LIST}?policy_published_domain=${domain}&org_name=${org_name}&detail_type=${filterDetails}`;
  if (startDate !== "undefined" && endDate !== "undefined") {
    url = url.concat(`&start_date=${startDate}&end_date=${endDate}`);
  } else if (startDate !== "undefined") {
    url = url.concat(`&start_date=${startDate}`);
  } else if (endDate !== "undefined") {
    url = url.concat(`&end_date=${endDate}`);
  }
  if (searchDetails && searchDetails != "") {
    url = url.concat(`&search_query=${searchDetails}`);
  }
  let response = await fetch(url, headerAuthentication);
  const data = await response.json();
  return data;
};

export const fetchIpDetails = async (ip_address: any) => {
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
  var headerAuthentication: any = {
    method: "GET",
    headers,
    next: {
      revalidate: 0,
    },
  };
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.GEO_LOOKUP_BY_IP}?ip_address=${ip_address}`,
    headerAuthentication
  );
  const data = await response.json();
  return data;
};

export const reportsDetailsApi = async (
  domain: any,
  start_date?: any,
  end_date?: any,
  pageSize?: any,
  page?: any,
  searchDetails?: any
) => {
  var url: any;

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

  if (
    start_date !== "undefined" &&
    end_date !== "undefined" &&
    start_date !== null &&
    end_date !== null
  ) {
    url = `${API_ROUTES.REPORTER_DETAIL_LIST}?policy_published_domain=${domain}&start_date=${start_date}&end_date=${end_date}&page_size=${pageSize}&page=${page}`;
  } else {
    url = `${API_ROUTES.REPORTER_DETAIL_LIST}?policy_published_domain=${domain}&page_size=${pageSize}&page=${page}`;
  }
  if (
    searchDetails !== "" &&
    start_date !== "undefined" &&
    end_date !== "undefined" &&
    start_date !== null &&
    end_date !== null
  ) {
    url = `${API_ROUTES.REPORTER_DETAIL_LIST}?policy_published_domain=${domain}&start_date=${start_date}&end_date=${end_date}&page_size=${pageSize}&page=${page}&search_query=${searchDetails}`;
  } else if (searchDetails !== "") {
    url = `${API_ROUTES.REPORTER_DETAIL_LIST}?policy_published_domain=${domain}&page_size=${pageSize}&page=${page}&search_query=${searchDetails}`;
  }
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getPieApi = async (
  domain: any,
  start_date: any,
  end_date: any
) => {
  var url: any;

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
  if (
    start_date !== "undefined" &&
    end_date !== "undefined" &&
    start_date !== null &&
    end_date !== null
  ) {
    url = `${API_ROUTES.REPORTER_PIE_CHART}?policy_published_domain=${domain}&start_date=${start_date}&end_date=${end_date}`;
  } else {
    url = `${API_ROUTES.REPORTER_PIE_CHART}?policy_published_domain=${domain}`;
  }
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();

  return data;
};

export const getAlertsApi = async () => {
  var url: any;

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

  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.GET_ALERTS}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();

  return data;
};

export const getFirstResultsDashboard = async (
  domain: any,
  start_date: any,
  end_date: any
) => {
  var url: any;

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
  if (start_date !== "undefined" && end_date !== "undefined") {
    url = `${API_ROUTES.RESULT_FIRST_DASHBOARD}?policy_published_domain=${domain}&start_date=${start_date}&end_date=${end_date}`;
  } else if (start_date !== "undefined") {
    url = `${API_ROUTES.RESULT_FIRST_DASHBOARD}?policy_published_domain=${domain}&start_date=${start_date}`;
  } else {
    url = `${API_ROUTES.RESULT_FIRST_DASHBOARD}?policy_published_domain=${domain}`;
  }
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();

  return data;
};

export const getSecondResultsDashboard = async (
  domain: any,
  dkim_result: any,
  spf_result: any,
  disposition: any,
  start_date: any,
  end_date: any
  // page: any,
  // page_size: any
) => {
  var url: any;

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

  const queryParams: Record<string, string | undefined> = {
    policy_published_domain: domain,
    dkim_result: dkim_result !== "undefined" ? dkim_result : undefined,
    spf_result: spf_result !== "undefined" ? spf_result : undefined,
    disposition: disposition !== "undefined" ? disposition : undefined,
    start_date: start_date !== "undefined" ? start_date : undefined,
    end_date: end_date !== "undefined" ? end_date : undefined,
    // page: page !== "undefined" ? page : 1,
    // page_size: page_size !== "undefined" ? page_size : 10,
  };
  const filteredParams = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  url = `${API_ROUTES.RESULT_SECOND_DASHBOARD}?${filteredParams}`;
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();

  return data;
};

export const getSecondResultsDashboardList = async (
  domain: any,
  dkim_result: any,
  spf_result: any,
  disposition: any,
  start_date: any,
  end_date: any,
  page?: any,
  page_size?: any
) => {
  var url: any;

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

  const queryParams: Record<string, string | undefined> = {
    policy_published_domain: domain,
    dkim_result: dkim_result !== "undefined" ? dkim_result : undefined,
    spf_result: spf_result !== "undefined" ? spf_result : undefined,
    disposition: disposition !== "undefined" ? disposition : undefined,
    start_date: start_date !== "undefined" ? start_date : undefined,
    end_date: end_date !== "undefined" ? end_date : undefined,
    page: page !== "undefined" ? page : 1,
    page_size: page_size !== "undefined" ? page_size : 10,
  };
  const filteredParams = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  url = `${API_ROUTES.RESULT_SECOND_DETAIL_LIST}?${filteredParams}`;
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getThirdResultsDashboard = async (
  domain: any,
  base_domain: any,
  ip_address: any,
  dmarc_id: any
) => {
  const user = await getCurrentUser();
  let contentType: string = "application/json";

  let headers: any = {
    "Content-Type": contentType,
  };
  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  let response = await fetch(
    `${process?.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.RESULT_THIRD_DASHBOARD}?policy_published_domain=${domain}&row_source_ip=${ip_address}&dmarc_report_detail_id=${dmarc_id}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const fetchDkimSignatureData = async (
  domain: any,
  base_domain: any,
  ip_address: any,
  dmarc_id: any,
  page: any,
  page_size: any,
  search_query: any
) => {
  const user = await getCurrentUser();
  let contentType: string = "application/json";

  let headers: any = {
    "Content-Type": contentType,
  };
  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  let response = await fetch(
    `${process?.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.RESULT_THIRD_DETAIL_LIST}?policy_published_domain=${domain}&row_source_ip=${ip_address}&dmarc_report_detail_id=${dmarc_id} &page_size=${page_size}&page=${page}&search_query=${search_query}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const fetchSourceIpDetails = async (
  domain: any,
  ip_address: any,
  startDate: any,
  endDate: any
) => {
  const user = await getCurrentUser();
  let contentType: string = "application/json";

  let headers: any = {
    "Content-Type": contentType,
  };
  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  if (startDate !== "undefined" && endDate !== "undefined") {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.DMARC_SOURCE_DETAILS}?policy_published_domain=${domain}&row_source_ip=${ip_address}&start_date=${startDate}&end_date=${endDate}`,
      {
        method: "GET",
        headers,
        next: {
          revalidate: 0,
        },
      }
    );
    const data = await response.json();
    return data;
  } else if (startDate !== "undefined") {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.DMARC_SOURCE_DETAILS}?policy_published_domain=${domain}&row_source_ip=${ip_address}&start_date=${startDate}`,
      {
        method: "GET",
        headers,
        next: {
          revalidate: 0,
        },
      }
    );
    const data = await response.json();
    return data;
  } else if (endDate !== "undefined") {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.DMARC_SOURCE_DETAILS}?policy_published_domain=${domain}&row_source_ip=${ip_address}&end_date=${endDate}`,
      {
        method: "GET",
        headers,
        next: {
          revalidate: 0,
        },
      }
    );
    const data = await response.json();
    return data;
  } else {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.DMARC_SOURCE_DETAILS}?policy_published_domain=${domain}&row_source_ip=${ip_address}`,
      {
        method: "GET",
        headers,
        next: {
          revalidate: 0,
        },
      }
    );
    const data = await response.json();
    return data;
  }
};

export const fetchSourceIpDetailsList = async (
  domain: any,
  ip_address: any,
  startDate: any,
  endDate: any,
  page: any,
  page_size: any,
  detail_type: any
) => {
  const user = await getCurrentUser();
  let contentType: string = "application/json";

  let headers: any = {
    "Content-Type": contentType,
  };
  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.DMARC_SOURCE_DETAIL_LIST}/?policy_published_domain=${domain}&row_source_ip=${ip_address}`;
  if (startDate !== "undefined") {
    url = url.concat(`&start_date=${startDate}`);
  }
  if (endDate !== "undefined") {
    url = url.concat(`&end_date=${endDate}`);
  }
  if (page !== "undefined") {
    url = url.concat(`&page=${page}`);
  }
  if (page_size !== "undefined") {
    url = url.concat(`&page_size=${page_size}`);
  }
  if (detail_type !== "undefined") {
    url = url.concat(`&detail_type=${detail_type}`);
  }
  let response = await fetch(url, {
    method: "GET",
    headers,
    next: {
      revalidate: 0,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchResultDetails = async (
  domain: any,
  base_domain: any,
  ip_address: any,
  dmarc_id: any,
  start_date?: any,
  end_date?: any
) => {
  const user = await getCurrentUser();
  let contentType: string = "application/json";

  let headers: any = {
    "Content-Type": contentType,
  };
  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  let url: any = `${process?.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.RESULT_DETAIL_LIST}?policy_published_domain=${domain}&row_source_ip=${ip_address}&dmarc_report_detail_id=${dmarc_id}`;
  if (start_date !== "undefined" && end_date !== "undefined") {
    url += `&start_date=${start_date}&end_date=${end_date}`;
  }
  let response = await fetch(url, {
    method: "GET",
    headers,
    next: {
      revalidate: 0,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchDkimSignaturesList = async (
  domain: any,
  base_domain: any,
  ip_address: any,
  dmarc_id: any,
  page?: any,
  pageSize?: any,
  searchTerm?: any,
  startDate?: any,
  endDate?: any
) => {
  const user = await getCurrentUser();
  let contentType: string = "application/json";

  let headers: any = {
    "Content-Type": contentType,
  };
  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  let url = `${API_ROUTES.DKIM_SIGNATURE_LIST}?policy_published_domain=${domain}&row_source_ip=${ip_address}&dmarc_report_detail_id=${dmarc_id}&page_size=${pageSize}&page=${page}`;
  if (searchTerm) {
    url += `&search_query=${encodeURIComponent(searchTerm)}`;
  }

  if (startDate !== "undefined" && endDate !== "undefined") {
    url += `&start_date=${startDate}&end_date=${endDate}`;
  }
  let response = await fetch(
    `${process?.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const fetchResultDetailsList = async (
  domain: any,
  base_domain: any,
  ip_address: any,
  dmarc_id: any,
  page: any,
  page_size: any
) => {
  const user = await getCurrentUser();
  let contentType: string = "application/json";

  let headers: any = {
    "Content-Type": contentType,
  };
  if (!isEmpty(user) && !isEmpty(user.token)) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  let response = await fetch(
    `${process?.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.RESULT_DETAIL_LIST}?policy_published_domain=${domain}&row_source_ip=${ip_address}&dmarc_report_detail_id=${dmarc_id}&page=${page}&page_size=${page_size}`,
    {
      method: "GET",
      headers,
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getDashboardData = async (
  domain: string,
  start_date?: any,
  end_date?: any,
  fromDashboard?: any
) => {
  try {
    const user = await getCurrentUser();

    let headers: any = {
      "Content-Type": "application/json",
    };
    if (!isEmpty(user) && !isEmpty(user.token)) {
      headers["Authorization"] = `Bearer ${user.token}`;
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/tools`;

    const buildUrl = (endpoint: string) => {
      let url = `${baseUrl}/${endpoint}/?policy_published_domain=${domain}`;
      if (!fromDashboard) {
        url += `&start_date=${start_date}&end_date=${end_date}`;
      }
      return url;
    };

    let [
      WIDGET_COUNTS,
      // SOURCE_PIE,
      // REPORTER_PIE,
      // VOLUME_BAR,
      TOP_FAILURE,
      TOP_COMPLIANT,
      DETAIL_REPORTS,
      TOP_SENDER,
    ] = await Promise.all([
      fetch(buildUrl(API_ROUTES.WIDGET_COUNT), {
        headers,
        next: { revalidate: 0 },
      }),
      // fetch(buildUrl(API_ROUTES.SOURCE_PIE_CHART), {
      //   headers,
      //   next: { revalidate: 0 },
      // }),
      // fetch(buildUrl(API_ROUTES.REPORTER_DASHBOARD_PIE_CHART), {
      //   headers,
      //   next: { revalidate: 0 },
      // }),
      // fetch(buildUrl('fetch-volume-bar-chart'), { headers, next: { revalidate: 0 } }),
      fetch(buildUrl(API_ROUTES.TOP_FAILURE_SOURCE_LIST), {
        headers,
        next: { revalidate: 0 },
      }),
      fetch(buildUrl(API_ROUTES.TOP_COMPLIANT_SOURCE_LIST), {
        headers,
        next: { revalidate: 0 },
      }),
      fetch(buildUrl(API_ROUTES.DASHBOARD_REPORTER_DETAIL_LIST), {
        headers,
        next: { revalidate: 0 },
      }),
      fetch(buildUrl(API_ROUTES.DASHBOARD_SENDER_DETAIL_LISTS), {
        headers,
        next: { revalidate: 0 },
      }),
    ]);

    return {
      WIDGET_COUNTS: await generateResponse(WIDGET_COUNTS, true),
      // SOURCE_PIE: await generateResponse(SOURCE_PIE, true),
      // REPORTER_PIE: await generateResponse(REPORTER_PIE, true),
      // VOLUME_BAR: await generateResponse(VOLUME_BAR, true),
      TOP_FAILURE: await generateResponse(TOP_FAILURE, true),
      TOP_COMPLIANT: await generateResponse(TOP_COMPLIANT, true),
      DETAIL_REPORTS: await generateResponse(DETAIL_REPORTS, true),
      TOP_SENDER: await generateResponse(TOP_SENDER, true),
    };
  } catch (e) {
    return {
      WIDGET_COUNTS: {},
      // SOURCE_PIE: {},
      // REPORTER_PIE: {},
      // VOLUME_BAR: {},
      TOP_FAILURE: {},
      TOP_COMPLIANT: {},
      DETAIL_REPORTS: {},
      TOP_SENDER: {},
    };
  }
};

const generateResponse = async (
  res: any,
  returnDataOnlyIfSuccess?: boolean
) => {
  let resData: any = {
    message: "Something went wrong!",
    status: false,
  };
  try {
    resData = await res.json();
    resData.status = true;
  } catch (e) {}
  resData.status =
    res.ok /*&& (resData?.code === 200 || resData?.code === 201)*/ &&
    (res.status === 200 || res.status === 201);
  return returnDataOnlyIfSuccess
    ? resData.status
      ? resData.data
      : {}
    : resData;
};

export const getDashboardGraphData = async (
  from_last_days: string,
  domain: string,
  start_date?: any,
  end_date?: any
) => {
  try {
    const user = await getCurrentUser();
    let headers: any = {
      "Content-Type": "application/json",
    };
    if (!isEmpty(user) && !isEmpty(user.token)) {
      headers["Authorization"] = `Bearer ${user.token}`;
    }
    let url = `${API_ROUTES.EMAIL_GRAPH_DATA}?from_last_days=${from_last_days}`;
    if (domain) {
      url = `${API_ROUTES.VOLUME_GRAPH_DATA}?policy_published_domain=${domain}`;
      if (start_date !== "undefined" && end_date !== "undefined") {
        url += `&start_date=${start_date}&end_date=${end_date}`;
      }
    }
    let [VOLUME_BAR] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
        // `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}?from_last_days=${from_last_days}&policy_published_domain=${domain}&start_date=${start_date}&end_date=${end_date}`,
        { headers, next: { revalidate: 0 } }
      ),
    ]);

    return {
      VOLUME_BAR: await generateResponse(VOLUME_BAR, true),
    };
  } catch (e) {
    return {
      VOLUME_BAR: {},
    };
  }
};

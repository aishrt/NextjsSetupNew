export const API_ROUTES = {
  // ------------------------------------ Auth ------------------------------------

  LOGIN: "/api/v1/account/login",
  SOCIAL_LOGIN: "/api/v1/account/social-login/",
  RESET_PASSWORD: "/api/v1/account/reset-password",
  FORGOT_PASSWORD: "/api/v1/account/forget-password",
  FORGOT_PASSWORD_LINK: "/api/v1/account/forget-password-link",
  TOKEN_LOGIN: "/api/v1/account/user-login-token",
  VERIFY_ACCOUNT: "/api/v1/account/verify",
  ONBOARD_ACCOUNT: "/api/v1/account/onboarding",

  // ------------------------------------ Utils ------------------------------------

  VERIFY_JWT: "/api/verifyJWT",
  CHECK_PROXY: "/api/checkProxy",
  SMTP_DETAIL: "/tools/fetch-smtp-detail",
  LIST_ALL_DOMAINS: "/api/v1/domains",
  DOMAINS_LIST: "/api/v1/domains-list",

  // ------------------------------------ User ------------------------------------

  ACCOUNT_LICENSE_DETAIL: "/api/v1/account/license-detail",
  GET_ALERTS: "/tools/fetch-alert",
  VIEW_PROFILE: "/api/v1/account/get-profile",
  UPDATE_PROFILE: "/api/v1/account/update-profile",
  ADD_USER: "/api/add-user/",
  GET_USER: "/api/get-user",
  UPDATE_USER: "/api/update-user",
  LIST_USERS: "/api/list-user",
  GET_COMPANY_DETAILS: "/api/get-company-details/",
  UPDATE_COMPANY_DETAILS: "/api/update-company-details/",
  SUBSCRIBE_NEWSLETTER: "/api/add-subscribe-newsletter",
  CONTACT_US: "/api/contact-us",

  SEND_EMAIL: "/tools/send-mail",

  // ------------------------------------ Scan Domain ------------------------------------

  DNS_LOOKUP: "dns-lookup",
  DMARC_LOOKUP: "dmarc-lookup",
  SPF_LOOKUP: "spf-lookup",
  DKIM_LOOKUP: "dkim-lookup",
  BIMI_LOOKUP: "bimi-lookup",
  MTA_STS_LOOKUP: "mta-sts-lookup",
  TLS_RPT_LOOK: "tls-rpt-lookup",
  WIDGET_COUNT: "/tools/fetch-widget-counts",
  SOURCE_PIE_CHART: "fetch-source-pie-chart",
  REPORTER_DASHBOARD_PIE_CHART: "fetch-reporter-pie-chart",
  TOP_FAILURE_SOURCE_LIST: "/tools/fetch-top-failure-sources-list",
  TOP_COMPLIANT_SOURCE_LIST: "/tools/fetch-top-compliant-sources-list",
  EMAIL_GRAPH_DATA: "/tools/email-graph-detail",
  VOLUME_GRAPH_DATA: "/tools/fetch-volume-bar-chart",

  // ------------------------------------ Dashboard ------------------------------------

  DASHBOARD: "/dashboard",
  TLS_DASHBOARD: "/dashboard/tls-report/",
  SOURCE_DASHBOARD: "/dashboard/source-dashboard",
  TLS_RECORD_DATEWISE: "/dashboard/tls-date-list",
  COMPLIANT_DASHBOARD: "/dashboard/compliant-dashboard",
  RESULT_DASHBOARD: "/dashboard/results-dashboard",
  
  DNS_RECORD_HISTORY: "/api/fetch-dns-record-history/",
  DASHBOARD_REPORTER_DETAIL_LIST: "fetch-detail-reports-list",



  // ------------------------------------ Tools ------------------------------------

  DASHBOARD_SENDER_DETAIL_LISTS: "/tools/fetch-sender-detail-list",
  MAIN_DASHBOARD: "/tools/main-dashboard/",
  MAIN_DASHBOARD_MAPDATA: "/tools/main-dashbaord-geo-locations/",
  MAIN_DASHBOARD_DETAILS: "/tools/main-dashboard-domain-list/",
  EMAIL_DISPOSITION: "/tools/email-disposition",
  SOURCE_DETAILS_LIST: "/tools/fetch-source-details-list",
  DETAIL_REPORT_LIST: "/tools/fetch-detail-reports-list",
  DMARC_SOURCE_DETAIL_LIST: "/tools/fetch-dmarc-source-detail-list",
  DMARC_SOURCE_DETAILS: "/tools/fetch-dmarc-source-details",
  SOURCE_GEO_DETAILS_LIST: "/tools/fetch-source-geo-details-list",
  GEO_LOOKUP_BY_IP: "/tools/fetch-geolookup-by-ip",
  RESULT_DETAIL_LIST: "/tools/result-detail-list",
  DKIM_SIGNATURE_LIST: "/tools/fetch-dkim-signatures-list",
  EMAIL_INVESTIGATION_LIST: "/tools/fetch-investigation-list",
  CRON_EMAIL_INVESTIGATION: "/tools/email-investigation/list",
  SPECIFIC_EMAIL_INVESTIGATION: "/tools/email-investigation/message-id",
  REPORTER_DETAIL_LIST: "/tools/reporter/detail-lists",
  REPORTER_PIE_CHART: "/tools/reporter/pie-chart",
  UPLOAD_REPORT: "/tools/upload-report/",
  RESULT_FIRST_DASHBOARD: "/tools/first-result-dashbaord",
  RESULT_SECOND_DASHBOARD: "/tools/second-result-dashbaord",
  RESULT_SECOND_DETAIL_LIST: "/tools/second-result-detail-list",
  RESULT_THIRD_DASHBOARD: "/tools/third-result-dashbaord",
  RESULT_THIRD_DETAIL_LIST: "/tools/third-result-detail-list",
  HOST_SPF: "/tools/host-spf",
  HOST_SPF_LIST: "/tools/host-spf-list",
  UPDATE_SPF_LIST: "/tools/update-spf-list",
  HOST_SPF_STATUS_CHANGE: "/tools/update-is-active",
  TLS_REPORT_DASHBOARD: "/tools/tls-report-main",
  TLS_REPORT_LIST: "/tools/tls-report-list",
  TLS_REPORT_DETAIL: "/tools/tls-report-detail",
  SENDER_DETAIL_LIST: "/tools/fetch-sender-detail-list",
  SEND_MAIL_LIST: "/tools/send-mail-list",
};

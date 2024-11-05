export const headCellUser = [
  { id: "email", label: "Username" },
  { id: "first_name", label: "Firstname" },
  { id: "last_name", label: "Lastname" },
  { id: "last_login", label: "Last Login" },
  { id: "role", label: "Roles" },
  { id: "is_active", label: "Status" },
  { id: "actions", label: "Actions" },
];

export const headCellAcountDashboardDetail = [
  { id: "domain", label: "DOMAIN" },
  { id: "senders", label: "SENDERS" },
  { id: "emails", label: "EMAILS" },
  { id: "compliant", label: "COMPLIANT%" },
  { id: "failure", label: "FAILURE%" },
  { id: "dmarc_policy", label: "DMARC POLICY" },
  { id: "spf", label: "SPF" },
  { id: "dkim", label: "DKIM" },
  { id: "edit", label: "" },
];

export const headCellEmail = [
  { id: "From_address", label: "FROM ADDRESS" },
  { id: "compliance", label: "Compliance" },
  { id: "subject", label: "SUBJECT" },
  { id: "date", label: "DATE" },
];

export const headCellTLSReport = [
  { id: "tlsrpt_report__organization_name", label: "Sending Source" },
  { id: "policy_policy_type", label: "Policy Type" },
  { id: "total_success", label: "Success Count" },
  { id: "total_failure", label: "Failure Count" },
  { id: "tlsrpt_report_count", label: "Total Reports" },
  { id: "percentage_success", label: "Success Rate" },
  { id: "actions", label: "Actions" },
];

export const headCellTLSDetail = [
  { id: "tlsrpt_report__start_datetime", label: "Date" },
  { id: "tlsrpt_report__report_id", label: "ReportId" },
  { id: "tlsrpt_report__contact_info", label: "Contact Info" },
  { id: "summary_total_successful_session_count", label: "Success Count" },
  { id: "summary_total_failure_session_count", label: "Failure Count" },
  { id: "percentage_success", label: "Success Rate" },
  { id: "actions", label: "Actions" },
];

export const headCellDomain = [
  { id: "domain_name", label: "Domain Name" },
  { id: "is_verify", label: "DMARC configuration status" },
  { id: "tls_verify", label: "TLS Configuration Status" },
  { id: "report_recived", label: "Report Received" },
  { id: "actions", label: "Actions" },
];

export const headCellsReports = [
  { id: "reporter", label: "REPORTER" },
  { id: "reports", label: "REPORTS" },
  { id: "ip_count", label: "IP COUNT" },
  { id: "from_domian_count", label: "FROM DOMAIN COUNT" },
  { id: "emails", label: "EMAILS" },
  { id: "compliant", label: "COMPLIANT" },
  { id: "failures", label: "FAILURES" },
];

export const headCellsResult = [
  { id: "last_event", label: "LAST EVENT" },
  { id: "source_ip", label: "SOURCE IP" },
  { id: "dkim", label: "DKIM" },
  { id: "spf", label: "SPF" },
  { id: "disposition", label: "DISPOSITION" },
  { id: "selector", label: "SELECTOR" },
  { id: "reporter", label: "REPORTER" },
  { id: "message", label: "MESSAGES" },
  { id: "action", label: "" },
];
export const headCellsSenders = [
  { id: "SENDERS", label: "SENDERS" },
  { id: "ip_count", label: "IP COUNT" },
  { id: "enail", label: "EMAILS" },
  { id: "dmarc_override", label: "	DMARC Override" },
  { id: "compliance", label: "COMPLIANCE" },
  { id: "failures", label: "FAILURES" },
  { id: "spf", label: "SPF" },
  { id: "dkim", label: "DKIM" },
  { id: "action", label: "" },
];

export const headCellsSource = [
  { id: "senders", label: "Sender IP/SERVER" },
  { id: "header_from", label: "HEADER FROM" },
  { id: "email", label: "EMAILS" },
  { id: "overrides", label: "DMARC Overrides" },
  { id: "compliants", label: "COMPLIANT" },
  { id: "failures", label: "FAILURES" },
  { id: "spf", label: "SPF" },
  { id: "dkim", label: "DKIM" },
  { id: "action", label: "" },
];
export const headCellsComplaint = [
  { id: "report_date", label: "REPORT DATE" },
  { id: "email", label: "EMAILS" },
  { id: "Override", label: "DMARC Override" },
  { id: "spf", label: "SPF RESULT" },
  { id: "dkim", label: "DKIM RESULT" },
  { id: "compliance", label: "COMPLIANCE" },
  { id: "action", label: "" },
];
export const headCellsSourceResult = [
  { id: "dekim_domain", label: "DKIM DOMAIN" },
  { id: "dkim_selector", label: "DKIM SELECTOR" },
  { id: "valid", label: "DKIM VALID" },
  { id: "alligment", label: "	DKIM ALIGNMENT" },
];

export const SenderSPFDKIMdashboard = [
  { id: "source", label: "SOURCE PTR/SERVER" },
  { id: "message", label: "MESSAGES" },
  { id: "selector", label: "SELECTOR" },
  { id: "reporters", label: "REPORTER" },
  { id: "event", label: "LAST EVENT" },
];

export const headCellsEmails = [
  { id: "sent_at", label: "Date" },
  { id: "sender_name", label: "Send From Name" },
  { id: "mail_from", label: "Send From" },
  { id: "mail_to", label: "Send To" },
  { id: "subject", label: "Subject" },
  { id: "host_name", label: "SMTP Host" },
];

export const headCellRecordData = [
  { id: "record", label: "Record" },
  { id: "value", label: "Value" },
];

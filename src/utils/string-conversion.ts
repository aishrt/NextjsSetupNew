import { isEmpty } from "@/utils/isEmpty";
const ipv4Regex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const ipv6Regex =
  /([a-fA-F0-9]{1,4}:){7}([a-fA-F0-9]{1,4}|:)|::([a-fA-F0-9]{1,4}:){0,5}([a-fA-F0-9]{1,4})/;

export const cleanDomain = (inputString: string) => {
  if (!inputString || inputString.trim() === "") return inputString;
  let domain;
  if (inputString.includes("@")) {
    // If it's an email, split on "@"
    const parts = inputString.split("@");
    // Extract the domain part before "@" (this is the part we want for "abc.com@xyz.com")
    let domainArray = parts.filter((item: any) => {
      return item.includes(".");
    });
    domain = domainArray.length ? domainArray[0].trim() : parts[0];
  } else {
    // If there's no "@", just treat it as a regular domain string
    domain = inputString.trim();
  }
  // Step 2: Clean up the domain by removing protocol (http:// or https://) and "www."
  domain = domain
    .replace(/^(https?:\/\/)?(www\.)?(WWW\.)?/, "")
    .replace(/\/.*$/, "");
  // Step 3: Split the domain into parts based on '.'
  const domainParts = domain.split(".");
  // Step 4: Handle multi-part second-level domains (e.g., "com.in", "co.uk")
  if (
    domainParts.length > 2 &&
    (domainParts[domainParts.length - 2] === "com" ||
      domainParts[domainParts.length - 2] === "co")
  ) {
    return domainParts.slice(-3).join("."); // Keep the last 3 segments for cases like "softuvo.com.in"
  }
  // Step 5: Default case: return the last two segments (TLD and second-level domain)
  return domainParts.slice(-2).join(".");
};

export const isDomainValid = (inputString: string) => {
  const domainRegex =
    /^(https?:\/\/)?(www\.)?(WWW\.)?([a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?)(\/.*)?$/;
  return domainRegex.test(inputString) ? true : false;
};

export const validateDomainName = (formDomain: string) => {
  formDomain = formDomain?.toLowerCase();
  formDomain = formDomain?.replace(/(https?:\/\/)?(www\.)?/, "");
  const regex = new RegExp(
    /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
  );
  return regex.test(formDomain);
};

export const removeAfter = (inputString: string, separator: string) =>
  !isEmpty(inputString) ? inputString.split(separator)[0] : inputString;
export const removeHttp = (inputString: string) => {
  if (!inputString || inputString.trim() === "") return inputString;
  if (ipv4Regex.test(inputString)) {
    return inputString;
  }
  if (ipv6Regex.test(inputString)) {
    return inputString;
  }
  return !isEmpty(inputString)
    ? inputString
        .replace(/^(https?:\/\/)?(www\.)?(WWW\.)?/, "")
        .replace(/\/.*$/, "")
        .replace(/[^a-zA-Z]+$/, "")
    : inputString;
};

export const formatToolTypes = (inputString: string) => {
  return inputString.replace(
    /(-lookup|-record-generator|-record|-generator|-checker)/g,
    ""
  );
};

export const convertToUrl = (inputString: string) => {
  if (/^(https?|ftp):\/\//i.test(inputString)) {
    return inputString;
  } else {
    return "http://" + inputString;
  }
};

export const removeSpace = (inputString: string) =>
  !isEmpty(inputString)
    ? inputString.replace(/ /g, "_").toLowerCase()
    : inputString;

export const addSpace = (inputString: string) =>
  !isEmpty(inputString)
    ? inputString.replace(/_/g, " ").toLowerCase()
    : inputString;

export const isIPValid = (inputString: string): boolean => {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex =
    /^(([a-fA-F0-9]{1,4}:){7}([a-fA-F0-9]{1,4}|:))|(::([a-fA-F0-9]{1,4}:){0,5}([a-fA-F0-9]{1,4}))$/;
  return ipv4Regex.test(inputString) || ipv6Regex.test(inputString);
};

export const cleanUrl = (url?: string): string => {
  if (!url) return "";
  return url.includes("?") ? url.split("?")[0] : url;
};

export const removeQueryStringAndMatch = (
  href?: string,
  input?: string
): { cleanHref: string; isMatch: boolean } => {
  const cleanHref = cleanUrl(href);
  const cleanInput = cleanUrl(input);
  const isMatch = cleanHref === cleanInput;
  return { cleanHref, isMatch };
};

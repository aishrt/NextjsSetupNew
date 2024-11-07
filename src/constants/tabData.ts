import { _IMG } from "./images";

export const _TABS = [
  {
    tabName: "DMARC LOOKUPS",
    mainTitle: "",
    tabTools: [
      {
        title: "SPF Record Checker",
        description: `Check if your domain has an SPF record and if it’s set up correctly.`,
        href: "/tools/spf-lookup",
        buttonTitle: "Check SPF Record",
        icon: `${_IMG.spf1}`,
      },
      {
        title: "SPF Record Generator",
        description: `Generate an SPF record for your domain automatically to avoid syntax issues.`,
        href: "/tools/spf-generator",
        buttonTitle: "Generate SPF Record",
        icon: `${_IMG.spf2}`,
      },
      {
        title: "SPF Raw Checker",
        description: `Check SPF record for your domain for validations.`,
        href: "/tools/spf-checker",
        buttonTitle: "Check SPF Raw Records",
        icon: `${_IMG.spf2}`,
      },

      {
        title: "DMARC Record Checker",
        description: `Check if your domain has an DMARC record and if it’s set up correctly.`,
        href: "/tools/dmarc-lookup",
        buttonTitle: "Check DMARC Record",
        icon: `${_IMG.dmarc1}`,
      },
      {
        title: "DMARC Record Generator",
        description: `Generate an DMARC record for your domain automatically to avoid syntax issues.`,
        href: "/tools/dmarc-generator",
        buttonTitle: "Generate DMARC Record",
        icon: `${_IMG.dmarc2}`,
      },
      {
        title: "DKIM Record Checker",
        description: `Check if your domain has an DMARC record and if it’s set up correctly.`,
        href: "/tools/dkim-lookup",
        buttonTitle: "Check DKIM Record",
        icon: `${_IMG.dkim1}`,
      },
      {
        title: "DKIM Record Generator",
        description: `Generate an DKIM record for your domain automatically to avoid syntax issues.`,
        href: "/tools/dkim-generator",
        buttonTitle: "Generate DKIM Record",
        icon: `${_IMG.dkim2}`,
      },
      {
        title: "BIMI Record Checker",
        description: `Check if your domain has an BIMI record and if it’s set up correctly.`,
        href: "/tools/bimi-lookup",
        buttonTitle: "Check BIMI Record",
        icon: `${_IMG.bimi1}`,
      },
      {
        title: "BIMI Record Generator",
        description: `Generate an BIMI record for your domain automatically to avoid syntax issues.`,
        href: "/tools/bimi-generator",
        buttonTitle: "Generate BIMI Record",
        icon: `${_IMG.bimi2}`,
      },
    ],
  },
  {
    tabName: "DNS LOOKUPS",
    mainTitle: "All DNS Lookups",
    tabTools: [
      {
        title: "DNS Lookups",
        description: `Get a comprehensive view of all DNS records associated with a domain using our DNS Lookup (all) tool.`,
        href: "/tools/dns-lookup",
        buttonTitle: "Check DNS Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "DNS A Lookups",
        description: `Uncover all IPv4 addresses linked to a domain with our DNS A Lookup tool.`,
        href: "/tools/a-lookup",
        buttonTitle: "Check DNS A Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "DNS AAAA Lookups",
        description: `Find all IPv6 addresses associated with a domain using our DNS AAAA Lookup tool.`,
        href: "/tools/aaaa-lookup",
        buttonTitle: "Check DNS AAAA Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "MX Lookups",
        description: `Identify all mail exchange servers for a domain with our MX Lookup tool.`,
        href: "/tools/mx-lookup",
        buttonTitle: "Check MX Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "CNAME Lookups",
        description: `Discover all canonical names associated with a domain using this online DNS CNAME checker.`,
        href: "/tools/cname-lookup",
        buttonTitle: "Check CNAME Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "TXT Lookups",
        description: `Discover all text records for a domain with our TXT Lookup tool.`,
        href: "/tools/txt-lookup",
        buttonTitle: "Check TXT Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "PTR Lookups",
        description: `Uncover all Pointer records of a domain with our PTR Lookup tool.`,
        href: "/tools/ptr-lookup",
        buttonTitle: "Check PTR Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "NS Lookups",
        description: `Identify all name servers for a domain with our NS Lookup tool.`,
        href: "/tools/ns-lookup",
        buttonTitle: "Check NS Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "SOA Lookups",
        description: `Find all Start of Authority records for a domain with our SOA Lookup tool.`,
        href: "/tools/soa-lookup",
        buttonTitle: "Check SOA Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "SRV Lookups",
        description: `Unearth all Service records of a domain with our SRV Lookup tool.`,
        href: "/tools/srv-lookup",
        buttonTitle: "Check SRV Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "CAA Lookups",
        description: `Discover all Certification Authority Authorization records for a domain with our CAA Lookup tool.`,
        href: "/tools/caa-lookup",
        buttonTitle: "Check CAA Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "DS Lookups",
        description: `Explore all Delegation Signer records of a domain with our DS Lookup tool.`,
        href: "/tools/ds-lookup",
        buttonTitle: "Check DS Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "DNSKEY Lookups",
        description: `Uncover all DNSKEY records for a domain with our DNSKEY Lookup tool.`,
        href: "/tools/dnskey-lookup",
        buttonTitle: "Check DNSKEY Record",
        icon: `${_IMG.DMARCRecord}`,
      },
    ],
  },
  {
    tabName: "MTA TLS LOOKUPS",
    mainTitle: "",
    tabTools: [
      {
        title: "MTA STS Record Checker",
        description: `Check if your domain has an MTA STS record and if it’s set up correctly.`,
        href: "/tools/mta-sts-lookup",
        buttonTitle: "Check MTA STS Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "MTA STS Record Generator",
        description: `Generate an MTA STS record for your domain automatically to avoid syntax issues.`,
        href: "/tools/mta-sts-generator",
        buttonTitle: "Generate MTA STS Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "TLS RPT Record Checker",
        description: `Check if your domain has an TLS RPT record and if it’s set up correctly.`,
        href: "/tools/tls-rpt-lookup",
        buttonTitle: "Check TLS RPT Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "TLS RPT Record Generator",
        description: `Generate an TLS RPT record for your domain automatically to avoid syntax issues.`,
        href: "/tools/tls-rpt-generator",
        buttonTitle: "Generate TLS RPT Record",
        icon: `${_IMG.DMARCRecord}`,
      },
    ],
  },
  {
    tabName: "BLACKLISTING",
    mainTitle: "",
    tabTools: [
      {
        title: "Blacklist IP Checker",
        description: `Blacklist IP Checker`,
        href: "/tools/blacklist-ip-lookup",
        buttonTitle: "Check Blacklist IP",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "Blacklist Domain Checker",
        description: `Blacklist Domain Checker`,
        href: "/tools/blacklist-domain-lookup",
        buttonTitle: "Check Blacklist Domain",
        icon: `${_IMG.DMARCRecord}`,
      },
    ],
  },
];

export const _TABS_HOME = [
  {
    tabName: "DMARC LOOKUPS",
    mainTitle: "",
    tabTools: [
      {
        title: "SPF Record Checker",
        description: `Verify if your domain has an SPF record and if it's configured correctly.`,
        href: "/tools/spf-lookup",
        buttonTitle: "Check SPF Record",
        icon: `${_IMG.spf1}`,
      },
      {
        title: "DMARC Record Checker",
        description: `Verify your domain's DMARC record with our tool for DMARC compliance check.`,
        href: "/tools/dmarc-lookup",
        buttonTitle: "Check DMARC Record",
        icon: `${_IMG.dmarc1}`,
      },
      {
        title: "DKIM Record Checker",
        description: `Check if your domain has a DKIM record and if it’s correctly configured.`,
        href: "/tools/dkim-lookup",
        buttonTitle: "Check DKIM Record",
        icon: `${_IMG.dkim1}`,
      },
      {
        title: "BIMI Record Checker",
        description: `Confirm if your domain has a BIMI record and if it’s set up correctly.`,
        href: "/tools/bimi-lookup",
        buttonTitle: "Check BIMI Record",
        icon: `${_IMG.bimi1}`,
      },
    ],
  },
  {
    tabName: "DNS LOOKUPS",
    mainTitle: "All DNS Lookups",
    tabTools: [
      {
        title: "DNS Lookups",
        description: `Get a comprehensive view of all DNS records associated with a domain using our DNS Lookup tool.`,
        href: "/tools/dns-lookup",
        buttonTitle: "Check DNS Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "DNS A Lookups",
        description: `Find all IPv4 addresses linked to a domain with our DNS A Lookup tool.`,
        href: "/tools/a-lookup",
        buttonTitle: "Check DNS A Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "DNS AAAA Lookups",
        description: `Discover all IPv6 addresses associated with a domain using our DNS AAAA Lookup tool.`,
        href: "/tools/aaaa-lookup",
        buttonTitle: "Check DNS AAAA Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "MX Lookups",
        description: `Identify all mail exchange servers for a domain with our MX Lookup tool.`,
        href: "/tools/mx-lookup",
        buttonTitle: "Check MX Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "CNAME Lookups",
        description: `Uncover all canonical names associated with a domain using our DNS CNAME Lookup tool.`,
        href: "/tools/cname-lookup",
        buttonTitle: "Check CNAME Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "TXT Lookups",
        description: `Locate all text records for a domain with our TXT Lookup tool.`,
        href: "/tools/txt-lookup",
        buttonTitle: "Check TXT Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "PTR Lookups",
        description: `Find all Pointer records for a domain with our PTR Lookup tool.`,
        href: "/tools/ptr-lookup",
        buttonTitle: "Check PTR Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "NS Lookups",
        description: `Identify all name servers for a domain with our NS Lookup tool.`,
        href: "/tools/ns-lookup",
        buttonTitle: "Check NS Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "SOA Lookups",
        description: `Get all Start of Authority records for a domain with our SOA Lookup tool.`,
        href: "/tools/soa-lookup",
        buttonTitle: "Check SOA Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "SRV Lookups",
        description: `Discover all Service records for a domain with our SRV Lookup tool.`,
        href: "/tools/srv-lookup",
        buttonTitle: "Check SRV Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "CAA Lookups",
        description: `Check all Certification Authority Authorization records for a domain with our CAA Lookup tool.`,
        href: "/tools/caa-lookup",
        buttonTitle: "Check CAA Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "DS Lookups",
        description: `View all Delegation Signer records for a domain with our DS Lookup tool.`,
        href: "/tools/ds-lookup",
        buttonTitle: "Check DS Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "DNSKEY Lookups",
        description: `Identify all DNSKEY records for a domain with our DNSKEY Lookup tool.`,
        href: "/tools/dnskey-lookup",
        buttonTitle: "Check DNSKEY Record",
        icon: `${_IMG.DMARCRecord}`,
      },
    ],
  },
  {
    tabName: "MTA TLS LOOKUPS",
    mainTitle: "",
    tabTools: [
      { 
        title: "MTA STS Record Checker",
        description: `Verify if your domain has an MTA STS record and if it's properly configured.`,
        href: "/tools/mta-sts-lookup",
        buttonTitle: "Check MTA STS Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "MTA STS Record Generator",
        description: `Automatically generate an MTA STS record for your domain to avoid syntax errors.`,
        href: "/tools/mta-sts-generator",
        buttonTitle: "Generate MTA STS Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "TLS RPT Record Checker",
        description: `Ensure your domain has a TLS RPT record and check if it's correctly set up.`,
        href: "/tools/tls-rpt-lookup",
        buttonTitle: "Check TLS RPT Record",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "TLS RPT Record Generator",
        description: `Automatically generate a TLS RPT record for your domain to prevent syntax issues.`,
        href: "/tools/tls-rpt-generator",
        buttonTitle: "Generate TLS RPT Record",
        icon: `${_IMG.DMARCRecord}`,
      },
    ],
  },
  {
    tabName: "BLACKLISTING",
    mainTitle: "",
    tabTools: [
      {
        title: "Blacklist IP Checker",
        description: `Check if your IP address is listed on any blacklists.`,
        href: "/tools/blacklist-ip-lookup",
        buttonTitle: "Check Blacklist IP",
        icon: `${_IMG.DMARCRecord}`,
      },
      {
        title: "Blacklist Domain Checker",
        description: `Verify if your domain is listed on any blacklists.`,
        href: "/tools/blacklist-domain-lookup",
        buttonTitle: "Check Blacklist Domain",
        icon: `${_IMG.DMARCRecord}`,
      },
    ],
  },
];

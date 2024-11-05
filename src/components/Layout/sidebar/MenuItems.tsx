import SpeedIcon from "@mui/icons-material/Speed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DnsIcon from "@mui/icons-material/Dns";
import DomainIcon from "@mui/icons-material/Domain";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LanguageIcon from "@mui/icons-material/Language";
import GroupIcon from "@mui/icons-material/Group";
import MailLockIcon from "@mui/icons-material/MailLock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import { uniqueId } from "lodash";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import SearchIcon from '@mui/icons-material/Search';

let storedDashboardUrl;
if (typeof window !== "undefined") {
  storedDashboardUrl = window.localStorage.getItem("dashboardUrl");
}
const senderHref = `/dashboard/sender-dashboard${
  storedDashboardUrl ? `?policy_published_domain=${storedDashboardUrl}&page=1&page_size=10` : ""
}`;
const reportsHref = `/dashboard/reporters${
  storedDashboardUrl ? `?domain=${storedDashboardUrl}` : ""
}`;
const resultsHref = `/dashboard/results${
  storedDashboardUrl ? `?domain=${storedDashboardUrl}&page=1&page_size=10` : ""
}`;

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Account Dashboard",
    icon: SpeedIcon,
    href: "/dashboard/dashboard",
  },
  {
    id: uniqueId(),
    title: "Domain Dashboard",
    icon: DomainIcon,
    type: "collapse",
    children: [
      {
        id: uniqueId(),
        title: "Senders",
        type: "item",
        href: `${senderHref}`,
      },
      {
        id: uniqueId(),
        title: "Reporters",
        type: "item",
        href: `${reportsHref}`,
      },

      {
        id: uniqueId(),
        title: "Results",
        type: "item",
        href: `${resultsHref}`,
      },
    ],
  },
  {
    id: uniqueId(),
    title: "DNS-History",
    icon: AccessTimeIcon,
    href: "/dashboard/dns-timeline",
  },
  {
    id: uniqueId(),
    title: "Email-Actions",
    icon: AlternateEmailIcon,
    href: "/dashboard/email-actions",
  },
  {
    id: uniqueId(),
    title: "Email Investigation",
    icon: MailOutlineIcon,
    href: "/dashboard/email-investigation",
  },
  {
    navlabel: true,
    subheader: "Tools",
  },

  {
    id: uniqueId(),
    title: "DNS Lookups",
    icon: DnsIcon,
    type: "collapse",
    children: [
      {
        id: uniqueId(),
        title: "DNS Lookups",
        type: "item",
        // href: "/dashboard/tools",
        href: "/dashboard/tools/dns-lookup",
      },
      {
        id: uniqueId(),
        title: "DNS A Lookups",
        type: "item",
        href: "/dashboard/tools/a-lookup",
      },
      {
        id: uniqueId(),
        title: "DNS AAAA Lookups",
        type: "item",
        href: "/dashboard/tools/aaaa-lookup",
      },
      {
        id: uniqueId(),
        title: "MX Lookups",
        type: "item",
        href: "/dashboard/tools/mx-lookup",
      },
      {
        id: uniqueId(),
        title: "CNAME Lookups",
        type: "item",
        href: "/dashboard/tools/cname-lookup",
      },
      {
        id: uniqueId(),
        title: "TXT Lookups",
        type: "item",
        href: "/dashboard/tools/txt-lookup",
      },
      {
        id: uniqueId(),
        title: "PTR Lookups",
        type: "item",
        href: "/dashboard/tools/ptr-lookup",
      },
      {
        id: uniqueId(),
        title: "NS Lookups",
        type: "item",
        href: "/dashboard/tools/ns-lookup",
      },
      {
        id: uniqueId(),
        title: "SOA Lookups",
        type: "item",
        href: "/dashboard/tools/soa-lookup",
      },
      {
        id: uniqueId(),
        title: "SRV Lookups",
        type: "item",
        href: "/dashboard/tools/srv-lookup",
      },
      {
        id: uniqueId(),
        title: "CAA Lookups",
        type: "item",
        href: "/dashboard/tools/caa-lookup",
      },
      {
        id: uniqueId(),
        title: "DS Lookups",
        type: "item",
        href: "/dashboard/tools/ds-lookup",
      },
      {
        id: uniqueId(),
        title: "DNSKEY Lookups",
        type: "item",
        href: "/dashboard/tools/dnskey-lookup",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "MTA TLS Lookups",
    icon: MailLockIcon,
    type: "collapse",
    children: [
      {
        id: uniqueId(),
        title: "MTA STS Record Checker",
        type: "item",
        href: "/dashboard/tools/mta-sts-lookup",
      },
      {
        id: uniqueId(),
        title: "MTA STS Record Generator",
        type: "item",
        href: "/dashboard/tools/mta-sts-generator",
      },
      {
        id: uniqueId(),
        title: "TLS RPT Record Checker",
        type: "item",
        href: "/dashboard/tools/tls-rpt-lookup",
      },
      {
        id: uniqueId(),
        title: "TLS RPT Record Generator",
        type: "item",
        href: "/dashboard/tools/tls-rpt-generator",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "DMARC Lookups",
    icon: AdminPanelSettingsIcon,
    type: "collapse",
    children: [
      {
        id: uniqueId(),
        title: "SPF Record Checker",
        type: "item",
        href: "/dashboard/tools/spf-lookup",
      },
      {
        id: uniqueId(),
        title: "SPF Record Generator",
        type: "item",
        href: "/dashboard/tools/spf-generator",
      },
      {
        id: uniqueId(),
        title: "SPF Raw Checker",
        type: "item",
        href: "/dashboard/tools/spf-checker",
      },
      {
        id: uniqueId(),
        title: "DMARC Record Checker",
        type: "item",
        href: "/dashboard/tools/dmarc-lookup",
      },
      {
        id: uniqueId(),
        title: "DMARC Record Generator",
        type: "item",
        href: "/dashboard/tools/dmarc-generator",
      },
      {
        id: uniqueId(),
        title: "DKIM Record Checker",
        type: "item",
        href: "/dashboard/tools/dkim-lookup",
      },
      {
        id: uniqueId(),
        title: "DKIM Record Generator",
        type: "item",
        href: "/dashboard/tools/dkim-generator",
      },
      {
        id: uniqueId(),
        title: "BIMI Record Checker",
        type: "item",
        href: "/dashboard/tools/bimi-lookup",
      },
      {
        id: uniqueId(),
        title: "BIMI Record Generator",
        type: "item",
        href: "/dashboard/tools/bimi-generator",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Blacklisting",
    icon: UnsubscribeIcon,
    type: "collapse",
    children: [
      {
        id: uniqueId(),
        title: "Blacklist Domain Checker",
        type: "item",
        href: "/dashboard/tools/blacklist-domain-lookup",
      },
      {
        id: uniqueId(),
        title: "Blacklist IP Checker",
        type: "item",
        href: "/dashboard/tools/blacklist-ip-lookup",
      },
    ],
  },
  {
    navlabel: true,
    subheader: "Domain",
  },
  {
    id: uniqueId(),
    title: "Domains",
    icon: LanguageIcon,
    href: "/dashboard/domain",
  },
  {
    id: uniqueId(),
    title: "Add Domain",
    icon: DomainAddIcon,
    href: "/dashboard/add-domain",
  },
  {
    navlabel: true,
    subheader: "Users",
  },
  {
    id: uniqueId(),
    title: "User",
    icon: GroupIcon,
    href: "/dashboard/users",
  },
  {
    navlabel: true,
    subheader: "Support",
  },
  {
    id: uniqueId(),
    title: "Contact Us",
    icon: ContactSupportIcon,
    href: "/dashboard/contact-us",
  },
];

export default Menuitems;

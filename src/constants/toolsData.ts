export const _TOOL_TYPES = {
  LOOKUP: "lookup",
  GENERATOR: "generator",
  CHECKER: "checker",
};

export const toolsDescription = {
  dns: {
    title:
      "Quickly check your domain’s DNS records by choosing a record type or selecting from various DNS servers.",
  },
  a: {
    title:
      "Instantly find the IP address associated with a domain to verify configurations and troubleshoot connectivity.",
  },
  aaaa: {
    title:
      "Effortlessly find your domain’s IPv6 address with our AAAA Records Lookup tool. Enter your domain or IP address, select a DNS server, and receive immediate results.",
  },
  mx: {
    title:
      "Easily find your domain’s mail exchange (MX) records to verify email routing and troubleshoot delivery issues.",
  },
  cname: {
    title:
      "Easily identify and verify CNAME domain name records for your domain to ensure proper redirection and aliasing.",
  },
  txt: {
    title:
      "Easily identify and verify CNAME domain name records for your domain to ensure proper redirection and aliasing.",
  },
  ptr: {
    title:
      "Efficiently resolve IP addresses to domain names with our PTR Records Lookup tool for accurate reverse DNS lookups.",
  },
  ns: {
    title:
      "Easily identify the authoritative DNS servers for your domain with our NS Records Lookup tool.",
  },
  soa: {
    title:
      "Quickly retrieve and analyze the Start of Authority (SOA) records for your domain to understand DNS zone information and settings.",
  },
  srv: {
    title:
      "Instantly retrieve and verify SRV records to ensure proper configuration of services and applications on your domain.",
  },
  caa: {
    title:
      "Check your domain’s Certificate Authority Authorization (CAA) records to ensure authorized CAs for issuing certificates with our CAA Records Lookup tool.",
  },
  ds: {
    title:
      "Check and confirm your domain's DNSSEC DS records to enhance DNS security.",
  },
  dnskey: {
    title:
      "Check your domain’s DNSKEY records. Enter your domain or IP, select a DNS server, and get instant results to verify your keys.",
  },
};

export const toolsData = {
  dns: {
    title: "Why DNS Matters for Compliance?",
    _section:
      "DNS records are essential for routing emails and web traffic. Our DNS Records Lookup tool helps verify that your DNS records are correctly set up, which is crucial for email compliance and proper delivery. Regularly <strong>check your domain name server</strong> configuration and <strong>look up domain records</strong> to ensure everything functions smoothly and securely.(check below section reference. Keep this content in same way)",
    details: [
      {
        tag: "v (Version)",
        description:
          "Must be 'DMARC1'. If missing or incorrect, the record will be ignored.",
      },
      {
        tag: "p (Policy)",
        description: `Defines actions for failed emails. Options are:
          "none": No action, just collecting reports.
          "quarantine": Marks emails as suspicious.
          "reject": Blocks emails`,
      },
      {
        tag: "rua (Aggregate Reports)",
        description:
          "Email address for receiving aggregate reports. Optional but needed for reports.",
      },
      {
        tag: "ruf (Forensic Reports)",
        description:
          "Email address for receiving detailed failure reports. Optional but needed for detailed reports.",
      },
      {
        tag: "sp (Subdomain Policy)",
        description: `Policy for subdomains.Inherits from the main domain unless specified. Options are:
          "none",
          "quarantine",
          "reject" `,
      },
      {
        tag: "adkim (DKIM Alignment)",
        description: `Alignment between DKIM domain and Header From domain.
          Options are:
          "r" (relaxed): Allows partial match.
          "s" (strict): Requires exact match.
          `,
      },
      {
        tag: " aspf (SPF Alignment)",
        description: `Alignment between SPF domain and Header From domain. Options are:
          "r" (relaxed): Allows partial match.
          "s" (strict): Requires exact match.
          `,
      },
      {
        tag: "fo (Forensic Reporting Options)",
        description: `Determines when to generate forensic reports. Options are:
          "0": When both SPF and DKIM fail.
          "1": When either SPF or DKIM fails.
          "d": When DKIM fails.
          "s": When SPF fails.
       `,
      },
      {
        tag: "rf (Reporting Format)",
        description: `Format for failure reports. Options are:
          "afrf" (ARF)
          "iodef" (IODEF)
          `,
      },
      {
        tag: "pct (Percentage)",
        description: "Percentage of failed emails to which the policy applies.",
      },
      {
        tag: "ri (Reporting Interval)",
        description:
          "Frequency of report generation in seconds. Default is 86400 (once a day).",
      },
    ],
    features: [
      "Comprehensive DNS Records: Retrieve various types of DNS records, including A, MX, CNAME, TXT, and more.",
      "Detailed Record Information: View detailed information about each record, such as IP addresses, mail exchange servers, and canonical names.",
      "Real-Time Data: Get real-time data and updates on your DNS records to ensure accuracy.",
      "Domain Health Check: Assess the overall health of your domains DNS configuration.",
      // "User-Friendly Interface: Easily navigate and search for DNS records with a simple and intuitive interface.",
    ],
    benefits: [
      "Improve Security: Detect and address potential security vulnerabilities, such as improper DNS settings that could expose your domain to attacks or spoofing.",
      "Enhance Performance:Verify that DNS records are optimized for faster domain resolution and improved website loading times.",
      "Gain Insights:Understand how your domain is set up and how it interacts with various DNS servers globally, which can help in making informed decisions about DNS management.",
    ],
  },
  a: {
    title: "Why the A Records Lookup Tool Matters for Compliance",
    _section:
      "Our DNS A Record Lookup Tool makes it easy to find the IP address connected to any domain. This is key for maintaining smooth email operations. Accurate IP address information ensures your domain’s email traffic is routed correctly, which helps prevent delivery issues and keeps your communications running smoothly. By using this tool, you ensure that your email setup is properly configured and compliant, enhancing both reliability and security.",
    details: [],
    features: [
      "Domain to IP Resolution: Converts domain names into their corresponding IPv4 addresses, allowing users to identify the specific server a domain points to.",
      "Real-Time Data: Provides up-to-date IP address information, ensuring users receive the most current DNS records.",
      "Multi-Domain Support: Allows for the lookup of A records for multiple domains, streamlining DNS management for various websites or services.",
      "Detailed Results: Displays comprehensive details about the DNS A record, including the domain’s IP address and associated metadata.",
    ],
    benefits: [
      "Accurate IP Mapping: Quickly identifies the precise IP address linked to any domain, ensuring correct DNS setup and troubleshooting.",
      "Efficient Troubleshooting: Streamlines the process of diagnosing connectivity issues by providing real-time IP address data.",
      "Enhanced DNS Management: Facilitates effective DNS configuration and verification, helping maintain optimal domain performance.",
      "User-Friendly Interface: Simplifies complex DNS queries with an easy-to-use interface, making it accessible for both technical and non-technical users.",
    ],
  },
  aaaa: {
    title: "Why the AAAA Records Lookup Tool Matters for Compliance",
    _section:
      "The AAAA Records Lookup tool is crucial for ensuring your domains IPv6 address is correctly set up. Accurate AAAA records ensure that your domain can be reached via IPv6, which is essential for modern web and email services. By verifying these records, you help maintain email compliance and avoid potential connectivity issues.",
    details: [],
    features: [
      "IPv6 Address Resolution: Converts domain names or IP addresses into their corresponding IPv6 addresses, providing essential data for modern internet infrastructure.",
      "Instant Results: Delivers immediate results, ensuring you have up-to-date information for your domain or IP address lookup.",
      "Customizable DNS Server Selection: Allows you to choose from different DNS servers to retrieve AAAA records, giving you flexibility in your queries.",
      "Comprehensive Data: Provides detailed information about the IPv6 address associated with a domain, including relevant metadata for thorough analysis.",
    ],
    benefits: [
      "Enhanced Connectivity: Ensures your domain is properly mapped to its IPv6 address, improving compatibility with modern networks and services by verifying the DNS AAAA record.",
      "Efficient Troubleshooting: Helps identify and resolve issues related to IPv6 address resolution by providing accurate and immediate data.",
      "Up-to-Date Information: Delivers real-time results, ensuring you have the most current IPv6 address information for your domain.",
      "Flexible Query Options: Offers the ability to select different DNS servers, allowing you to customize your lookups and verify records from multiple sources.",
    ],
  },
  mx: {
    title: "Why the MX Records Lookup Tool Matters for Compliance",
    _section:
      "The MX Records Lookup tool is essential for ensuring your email system is properly configured. It helps verify that your domains mail exchange records are correct, which is crucial for email deliverability and compliance. Accurate MX records prevent misdirected emails and maintain smooth communication by ensuring emails are routed to the correct servers.  Additionally, you can lookup MX record nslookup to further diagnose and resolve any issues.",
    details: [],
    features: [
      "Mail Server Identification: Retrieves the mail exchange servers responsible for handling emails for your domain, allowing you to <strong>lookup MX records for a domain</strong> with ease.",
      "Real-Time Data: Provides immediate results to ensure accurate and up-to-date MX record information.",
      "Error Troubleshooting: Helps diagnose and resolve email delivery issues by verifying MX record configurations using lookup MX record nslookup.",
      "Comprehensive Analysis: Displays detailed MX record data, including priority and mail server addresses, for thorough email system management.",
    ],
    benefits: [
      "Streamlined Configuration Updates: Easily verify and update MX records to ensure that any changes to your email setup are correctly implemented.",
      "Support for Multiple Domains: Quickly check and lookup MX records for a domain or multiple domains, facilitating effective management of different email systems.",
      "Compatibility Checks: Assists in verifying that your domains email setup is compatible with external email services and providers.",
      "Historical Data Access: Provides a record of previous MX lookups for tracking changes and ensuring consistency over time.",
    ],
  },
  cname: {
    title: "Why the CNAME Records Lookup Tool Matters for Compliance?",
    _section:
      "The CNAME (Canonical Name) Records Lookup tool is crucial for ensuring that your domain's alias records are properly configured. Accurate CNAME records are essential for redirecting domain traffic correctly and maintaining seamless domain aliasing. This helps in meeting compliance standards by ensuring that subdomains and services are routed to the correct destinations, preventing misconfigurations that could lead to security issues or service disruptions.",
    details: [],
    features: [
      "Instant Verification: Quickly check the CNAME records for your domain or subdomain to verify proper aliasing and redirection settings.",
      "Detailed Record Information: Provides comprehensive details about the CNAME records, including the target domain and aliasing information.",
      "Easy Troubleshooting: Helps identify and resolve issues related to domain redirection and alias configuration, particularly when you lookup CNAME records for a domain.",
      "Support for Multiple Domains: Allows you to look up CNAME records for different domains and subdomains, facilitating effective domain management.",
    ],
    benefits: [
      "Improved Domain Management: Easily verify and manage CNAME records to ensure accurate redirection and aliasing across your domains and subdomains.",
      "Enhanced Troubleshooting: Quickly identify and resolve issues with domain redirection or alias configuration to maintain smooth website functionality.",
      "Streamlined Configuration: Simplifies the process of checking and updating CNAME records, reducing the risk of misconfigurations and ensuring proper setup.",
      "Comprehensive Analysis: Provides detailed insights into CNAME records, helping you make informed decisions about domain setup and DNS management.",
    ],
  },
  txt: {
    title: "Why TXT Records Lookup Matters for Compliance?",
    _section:
      "The TXT Records Lookup tool is key for verifying important text-based DNS records, such as SPF and DKIM, and DMARC TXT records. These records are crucial for email security and domain verification. Ensuring your TXT records are correct helps protect against email spoofing and phishing, maintaining compliance and the integrity of your domain's communications.",
    details: [],
    features: [
      "Comprehensive Record Retrieval: Provides detailed information about TXT records associated with your domain, including SPF, DKIM, and other verification data.",
      "Validation of DNS Settings: Helps verify the correctness of TXT records to ensure proper domain authentication and security settings, such as DMARC TXT record example.",
      "Support for Multiple TXT Records: Allows you to check domain TXT records for a domain, facilitating comprehensive DNS management.",
      "Real-Time Results: Delivers instant results for TXT record queries, enabling quick verification and troubleshooting of DNS configurations",
    ],
    benefits: [
      "Enhanced Security: Validates and confirms the implementation of security measures like SPF and DKIM, protecting your domain from phishing and spoofing attacks.",
      "Improved Email Deliverability: Ensures that email authentication records are correctly set up, enhancing the likelihood of your emails being delivered to recipients' inboxes rather than being marked as spam.",
      "Streamlined DNS Management: Simplifies the process of managing and updating TXT records, making it easier to maintain accurate DNS settings across your domain.",
      "Support for Custom Verification Records: Allows for the checking of various custom TXT records used for domain verification purposes, such as those required by third-party services.",
    ],
  },
  ptr: {
    title: "Why PTR Records Lookup Matters for Compliance?",
    _section:
      "PTR Records Lookup is important for compliance because it ensures that IP addresses are correctly mapped to domain names. Properly configured PTR records are essential for reverse DNS lookups, which help verify the legitimacy of email servers. This verification is crucial for maintaining email deliverability, reducing the likelihood of emails being marked as spam, and ensuring that your domain's communications meet industry standards for security and trustworthiness.",
    details: [],
    features: [
      "Reverse DNS Resolution: Resolves IP addresses to their associated domain names, aiding in reverse DNS lookups.",
      "Accurate PTR Record Retrieval: Retrieves and displays the PTR records associated with an IP address for verification and troubleshooting.",
      "Support for Multiple IPs: Allows querying of PTR records for multiple IP addresses, simplifying bulk reverse DNS checks.",
      "Real-Time Data: Provides up-to-date PTR record information, ensuring you get the latest data for accurate domain resolution.",
    ],
    benefits: [
      "Enhanced Email Deliverability: Improves email deliverability and reduces the likelihood of emails being marked as spam by verifying proper reverse DNS configurations.",
      "Improved Network Security: Helps identify and address potential security issues by ensuring that IP addresses are correctly mapped to legitimate domain names.",
      "Efficient Troubleshooting: Facilitates quick identification and resolution of reverse DNS issues, which can be crucial for network diagnostics and resolving connectivity problems.",
      "Streamlined IP Management: Simplifies the process of managing and validating PTR records, ensuring consistency and accuracy across your IP address assignments.",
    ],
  },
  ns: {
    title: "Why NS Records Lookup Matters for Compliance?",
    _section:
      "NS records are essential for determining which name servers are responsible for your domain. Accurate NS records ensure proper DNS resolution and can impact the reliability of your domain’s services, including email and website functionality. Keeping NS records up-to-date is crucial for maintaining compliance and ensuring seamless domain operations.",
    details: [],
    features: [
      "Identify Authoritative DNS Servers: Displays the DNS servers responsible for managing your domain's DNS records.",
      "Verify DNS Configuration: Helps verify if your domain’s name servers are correctly configured and responsive.",
      "Check for Multiple Name Servers: Lists all name servers associated with your domain, ensuring redundancy and reliability.",
      "Troubleshoot DNS Issues: Assists in diagnosing DNS resolution problems by showing which name servers are being used.",
    ],
    benefits: [
      "Improved Domain Management: Ensures that the correct DNS servers are in place for effective domain management and resolution.",
      "Enhanced Troubleshooting: Aids in identifying and resolving issues related to DNS server configuration and connectivity.",
      "Increased Reliability: Helps verify that multiple authoritative name servers are set up, promoting redundancy and reliability.",
      "Efficient DNS Monitoring: Provides insights into your domain’s DNS setup, allowing for proactive monitoring and adjustments to maintain optimal performance.",
    ],
  },
  soa: {
    title: "Why SOA Records Lookup Matters for Compliance?",
    _section:
      "SOA (Start of Authority) records are crucial for managing DNS zones, as they identify the main DNS server for a domain and include important details for DNS functioning. Using a DNS SOA lookup helps ensure these records are correct and up-to-date, which is important for keeping your DNS reliable, protecting your domain’s integrity, and staying compliant with regulations.",
    details: [],
    features: [
      "SOA Record Retrieval: Access Start of Authority (SOA) records to view crucial details about the authoritative DNS server for a domain.",
      "Flexible Lookup Options: Choose from various DNS record types, such as A, MX, CNAME, TXT, and more, for comprehensive DNS analysis.",
      "Custom DNS Servers: Perform lookups using different DNS servers to ensure accuracy and get results from multiple sources.",
      "Domain or IP Lookup: Enter a domain name or IP address to quickly retrieve SOA record details for the specified domain.",
      "Real-Time Data: Obtain current SOA record information, including serial number, refresh interval, and expiration times, to ensure up-to-date DNS settings.",
    ],
    benefits: [
      "Accurate SOA Record Verification: Confirms the authoritative DNS server and administrative contact information for reliable domain management.",
      "Zone File Integrity Checks: Ensures the consistency and correctness of DNS zone file settings, preventing misconfigurations.",
      "Time-to-Live (TTL) Monitoring: Allows monitoring of the TTL values in SOA records, which can impact DNS resolution and caching behavior.",
      "Change Notification Management: Helps manage and verify serial numbers in SOA records to track updates and changes effectively.",
    ],
  },
  srv: {
    title: "Why SRV Records Lookup Matters for Compliance?",
    _section:
      "SRV Records Lookup ensures your domain’s service records are properly configured. SRV records direct traffic to specific services, like email or chat, and are crucial for accurate routing. Proper SRV records maintain operational integrity and technical compliance. Use our SRV Records Lookup tool to verify these records, reducing disruptions and enhancing your domain’s reliability.",
    details: [],
    features: [
      "Comprehensive SRV Record Lookup: Easily retrieve SRV records to identify the specific services running on your domain.",
      "Instant Results: Get quick access to SRV record details with just a few clicks.",
      "Detailed Information: Access thorough information about service locations and ports for better domain management.",
      "Reliable Data: Ensure your domain's service configurations are correct to prevent service disruptions.",
    ],
    benefits: [
      "Service Mapping: Quickly identify and verify the location of services and applications associated with your domain, ensuring they are correctly configured.",
      "Enhanced Troubleshooting: Efficiently diagnose and resolve issues related to service connectivity by checking SRV records for accuracy and completeness.",
      "Configuration Validation: Ensure that service records are properly set up, helping to avoid misconfigurations that could impact service performance or availability.",
      "Comprehensive Insight: Gain detailed information on service records, including priority, weight, port, and target, to better manage and optimize your domain’s services.",
    ],
  },
  caa: {
    title: "Why CAA Records Lookup Matters for Compliance?",
    _section:
      "CAA (Certification Authority Authorization) records play a key role in determining which Certificate Authorities (CAs) have permission to issue SSL/TLS certificates for your domain. Running a CAA DNS lookup is essential for preventing unauthorized certificate issuance, which helps protect your domain’s security and ensures that you comply with established security policies.",
    details: [],
    features: [
      "Authority Validation: Verify which Certificate Authorities (CAs) are authorized to issue SSL/TLS certificates for your domain.",
      "Detailed Record View: Access detailed information on each CAA record, including tag values and associated CA details.",
      "Error Detection: Identify and troubleshoot issues related to unauthorized CAs or misconfigured CAA records.",
      "Compliance Checking: Ensure compliance with best practices and security policies by regularly reviewing and updating your CAA records.",
    ],
    benefits: [
      "Reduced Risk of Misconfiguration: Automatically check for common misconfigurations in CAA records to ensure correct CA authorization.",
      "Streamlined Domain Verification: Simplify the process of verifying and updating CAA records across multiple domains from a single platform.",
      "Actionable Insights: Receive actionable insights and recommendations to optimize your CAA records and enhance domain security.",
      "Enhanced Domain Trust: Strengthen trust in your domain's security posture by maintaining accurate and up-to-date CAA records.",
    ],
  },
  ds: {
    title: "Why DS Records Lookup Matters for Compliance?",
    _section:
      "DS  (Delegation Signer)  records are crucial for DNSSEC (Domain Name System Security Extensions) as they help secure the delegation of DNS zones. Accurate DS records ensure that DNSSEC validation is correctly implemented, enhancing your domain’s security and integrity.",
    details: [],
    features: [
      "DNSSEC Validation: Verifies the authenticity of DNSSEC DS records to ensure secure domain name resolutions.",
      "Detailed Record Information: Provides comprehensive details about each DS record, including key tags and algorithms.",
      "Easy Access: Quickly retrieves DS records by simply entering your domain name.",
      "Security Insights: Offers insights into potential DNS security issues and helps maintain secure DNS configurations.",
    ],
    benefits: [
      "Comprehensive Reporting: Delivers detailed reports on DS record configurations, aiding in thorough analysis and audits.",
      "Instant Results: Offers real-time retrieval of DS records, enabling prompt verification and action.",
      "Compatibility Checks: Ensures that DS records are compatible with various DNSSEC configurations and standards.",
      "Reduced Downtime: Helps prevent domain resolution issues by ensuring accurate DS record settings, thus minimizing potential disruptions.",
    ],
  },
  dnskey: {
    title: "Why DNSKEY Records Lookup Matters for Compliance?",
    _section:
      "DNSKEY records are vital for DNSSEC (Domain Name System Security Extensions), helping to secure your domain's DNS infrastructure. Proper DNSKEY configuration ensures that your DNS responses are authenticated, which is crucial for protecting against tampering and verifying the integrity of your domain data. Accurate DNSKEY records are vital for maintaining domain security and compliance with best practices.",
    details: [],
    features: [
      "Instant DNSKEY Retrieval: Quickly fetch DNSKEY records for any domain or IP, providing access to crucial security keys.",
      "Custom DNS Server Selection: Allows users to choose specific DNS servers for querying, ensuring accurate results based on different responses.",
      "Detailed Record Analysis: Provides a view of DNSKEY records, including key types, tags, and cryptographic details, helping users understand their security configuration.",
      "User-Friendly Interface: Features an intuitive design that simplifies entering domain information and retrieving DNSKEY records, making it accessible for all users.",
    ],
    benefits: [
      "Enhanced DNS Security Verification: Allows users to quickly verify the integrity and security of DNSKEY records, helping to ensure that DNS responses are authentic and secure.",
      "Customizable Query Options: Offers flexibility by letting users select specific DNS servers for their queries, allowing for tailored results based on different server configurations and preferences.",
      "Comprehensive Key Details: Provides in-depth information about DNSKEY records, including key flags, algorithms, and public keys, giving users a complete view of their DNS security setup.",
      "Enhanced Configuration Insights: Provides detailed insights into DNSKEY setup, helping users optimize and verify their DNS security configurations for better performance.",
    ],
  },
  spf_lookup: {
    title: "Why SPF Records Matter for Compliance?",
    _section:
      "SPF records are crucial for preventing email spoofing by defining which servers are allowed to send emails on behalf of your domain. Proper SPF configuration helps secure your email communications and ensures compliance with email authentication standards.",
    details: [
      {
        tag: "v (Version)",
        description:
          "Must be 'spf1' to specify the SPF version. If missing or incorrect, the record will be ignored.",
      },
      {
        tag: "ip4 (IPv4 Addresses)",
        description:
          "Lists IPv4 addresses allowed to send emails for the domain.",
      },
      {
        tag: "ip6 (IPv6 Addresses)",
        description:
          "Lists IPv6 addresses allowed to send emails for the domain.",
      },
      {
        tag: "a (A Record)",
        description:
          "Validates the sender by checking the IP address of the domain's A record.",
      },
      {
        tag: "mx (MX Record)",
        description:
          "Checks the domain's MX records to validate the sending mail servers.",
      },
      {
        tag: "ptr (PTR Record)",
        description:
          "Checks if the client IP has a matching PTR record. Not recommended due to high DNS lookup costs.",
      },
      {
        tag: "exists (Exists)",
        description: "Checks if an A record exists for the specified domain.",
      },
      {
        tag: "include (Include)",
        description:
          "Lists other domains authorized to send emails on behalf of the domain.",
      },
      {
        tag: "all (All)",
        description:
          "Specifies how to handle emails from non-authorized sources, placed at the end of the record.",
      },
      {
        tag: "redirect (Redirect)",
        description:
          "Delegates SPF checks to another domain by specifying the redirected domain.",
      },
    ],
    features: [
      "Comprehensive SPF Analysis: Examines your SPF record to detect syntax errors, missing elements, and compliance issues. Ensures your record meets standards for email authentication.",
      "Detailed Reporting: Generates a clear report highlighting problems with your SPF record. Includes actionable recommendations to correct issues and optimize configuration.",
      "Historical Data Tracking: Allows tracking and reviewing historical data on SPF records. Helps understand past modifications and ensures records are consistently updated.",
      "Integration Capabilities: Integrates with other email security tools for a comprehensive protection strategy. Ensures SPF record works seamlessly with your email security setup.",
    ],
    benefits: [
      "Improved Email Deliverability: Ensures your SPF record is set up correctly, helping prevent emails from being marked as spam or rejected, thus improving delivery rates.",
      "Enhanced Domain Security: Regular checks and updates protect your domain from phishing attacks or email spoofing, strengthening overall domain security.",
      "Simplified Troubleshooting: Identifies and fixes SPF record issues easily, reducing the complexity of troubleshooting authentication problems.",
      "Efficient Record Management: Tracks historical data and changes, allowing you to manage SPF records effectively, ensuring updates are properly applied.",
    ],
  },
  spf_generator: {
    title: "Why SPF Records Matter for Compliance?",
    _section:
      "SPF records are crucial for preventing email spoofing by defining which servers are allowed to send emails on behalf of your domain. Proper SPF configuration helps secure your email communications and ensures compliance with email authentication standards.",
    details: [
      {
        tag: "v (Version)",
        description:
          "Must be 'spf1' to specify the SPF version. If missing or incorrect, the record will be ignored.",
      },
      {
        tag: "ip4 (IPv4 Addresses)",
        description:
          "Lists IPv4 addresses allowed to send emails for the domain.",
      },
      {
        tag: "ip6 (IPv6 Addresses)",
        description:
          "Lists IPv6 addresses allowed to send emails for the domain.",
      },
      {
        tag: "a (A Record)",
        description:
          "Validates the sender by checking the IP address of the domain's A record.",
      },
      {
        tag: "mx (MX Record)",
        description:
          "Checks the domain's MX records to validate the sending mail servers.",
      },
      {
        tag: "ptr (PTR Record)",
        description:
          "Checks if the client IP has a matching PTR record. Not recommended due to high DNS lookup costs.",
      },
      {
        tag: "exists (Exists)",
        description: "Checks if an A record exists for the specified domain.",
      },
      {
        tag: "include (Include)",
        description:
          "Lists other domains authorized to send emails on behalf of the domain.",
      },
      {
        tag: "all (All)",
        description:
          "Specifies how to handle emails from non-authorized sources, placed at the end of the record.",
      },
      {
        tag: "redirect (Redirect)",
        description:
          "Delegates SPF checks to another domain by specifying the redirected domain.",
      },
    ],
    features: [
      "Pre-Built Templates: Offers pre-built templates for common SPF setups, making it easier to create records quickly and accurately.",
      "Integration Support: Provides options to integrate with other email security tools and systems, aligning with your overall email protection strategy.",
      "Detailed Documentation: Includes clear instructions and explanations for each option, helping users understand how different settings impact their SPF records.",
      "Compatibility Checks: Ensures that generated SPF records are compatible with major email providers and services, reducing the risk of deliverability issues.",
    ],
    benefits: [
      "User-Friendly Interface: Simplifies SPF record creation, making it accessible even for users with limited technical knowledge.",
      "Real-Time Error Detection: Alerts users to issues with SPF records as they are created, allowing for immediate corrections and ensuring accuracy.",
      "Optimized Email Reputation: Ensures SPF records are properly set up, enhancing email trust and reducing chances of rejection or being marked as spam.",
      "Regular Updates: Provides updates to keep SPF records aligned with evolving email security standards.",
    ],
  },
  spf_checker: {
    title: "Why SPF Raw Checker Matters for Compliance?",
    _section:
      "SPF records are crucial for preventing email spoofing by defining which servers are allowed to send emails on behalf of your domain. With the SPF Raw Checker, you can directly inspect the raw SPF record as stored in DNS, ensuring complete accuracy and compliance with email authentication standards.",
    details: [
      {
        tag: "v (Version)",
        description:
          "Must be 'spf1' to specify the SPF version. If missing or incorrect, the record will be ignored.",
      },
      {
        tag: "ip4 (IPv4 Addresses)",
        description:
          "Lists IPv4 addresses allowed to send emails for the domain.",
      },
      {
        tag: "ip6 (IPv6 Addresses)",
        description:
          "Lists IPv6 addresses allowed to send emails for the domain.",
      },
      {
        tag: "a (A Record)",
        description:
          "Validates the sender by checking the IP address of the domain's A record.",
      },
      {
        tag: "mx (MX Record)",
        description:
          "Checks the domain's MX records to validate the sending mail servers.",
      },
      {
        tag: "all (All)",
        description:
          "Specifies how to handle emails from non-authorized sources, placed at the end of the record.",
      },
    ],
    features: [
      "Comprehensive Raw SPF Analysis: Inspects the raw SPF data directly from DNS, identifying errors, missing mechanisms, or misconfigurations in the SPF record.",
      "Detailed Reporting: Generates an in-depth report on the SPF raw record, providing recommendations to resolve any issues and improve the overall configuration.",
      "Real-time DNS Lookup: Fetches and analyzes the most current SPF record stored in DNS, ensuring the data is always up-to-date.",
      "Historical Data Tracking: Allows tracking and reviewing historical SPF record data, helping to understand past configurations and maintain consistency over time.",
    ],
    benefits: [
      "Enhanced Security: Ensures your SPF record is configured accurately by analyzing raw DNS data.",
      "Efficient Troubleshooting: Helps identify and resolve issues quickly by checking the exact SPF record stored in DNS.",
      "Flexible Queries: Allows customization of DNS lookups to retrieve records from multiple sources, ensuring complete accuracy.",
      "User-Friendly Interface: Offers an intuitive interface that makes it simple for users of all technical levels to perform SPF raw checks and understand the results effortlessly.",
    ],
  },
  dmarc_lookup: {
    title: "Why DMARC Record Checker Matters for Compliance?",
    _section:
      "A DMARC (Domain-based Message Authentication, Reporting & Conformance) record is crucial for email security. It helps you protect your domain from being used in email spoofing and phishing attacks. By verifying and correcting your <strong>DMARC DNS lookup</strong> settings, you ensure that only authorized parties can send emails on behalf of your domain, and you receive detailed reports on any authentication issues. This not only improves your email deliverability but also enhances your overall domain security and compliance.",
    details: [
      {
        tag: "v (Version)",
        description:
          "Must be 'DMARC1'. If missing or incorrect, the record will be ignored.",
      },
      {
        tag: "p (Policy)",
        description:
          "Defines actions for failed emails. Options are: 'none': No action, just collecting reports. 'quarantine': Marks emails as suspicious. 'reject': Blocks emails.",
      },
      {
        tag: "rua (Aggregate Reports)",
        description:
          "Email address for receiving aggregate reports. Optional but needed for reports.",
      },
      {
        tag: "ruf (Forensic Reports)",
        description:
          "Email address for receiving detailed failure reports. Optional but needed for detailed reports.",
      },
      {
        tag: "sp (Subdomain Policy)",
        description:
          "Policy for subdomains. Inherits from the main domain unless specified. Options are: 'none', 'quarantine', 'reject'.",
      },
      {
        tag: "adkim (DKIM Alignment)",
        description:
          "Alignment between DKIM domain and Header From domain. Options are: 'r' (relaxed): Allows partial match. 's' (strict): Requires exact match.",
      },
      {
        tag: "aspf (SPF Alignment)",
        description:
          "Alignment between SPF domain and Header From domain. Options are: 'r' (relaxed): Allows partial match. 's' (strict): Requires exact match.",
      },
      {
        tag: "fo (Forensic Reporting Options)",
        description:
          "Determines when to generate forensic reports. Options are: '0': When both SPF and DKIM fail. '1': When either SPF or DKIM fails. 'd': When DKIM fails. 's': When SPF fails.",
      },
      {
        tag: "rf (Reporting Format)",
        description:
          "Format for failure reports. Options are: 'afrf' (ARF), 'iodef' (IODEF).",
      },
      {
        tag: "pct (Percentage)",
        description: "Percentage of failed emails to which the policy applies.",
      },
      {
        tag: "ri (Reporting Interval)",
        description:
          "Frequency of report generation in seconds. Default is 86400 (once a day).",
      },
    ],
    features: [
      "Real-Time Validation: Instantly verifies the accuracy of your DMARC records to ensure they are correctly configured and compliant with standards.",
      "Detailed Reports: Provides comprehensive reports on DMARC record status, including issues, helping you quickly identify and resolve problems.",
      "Policy Analysis: Analyzes the effectiveness of your DMARC policy settings, such as enforcement levels and reporting options, to ensure optimal security and deliverability.",
      "Historical Data Access: Offers access to historical data and changes, allowing you to track modifications and assess the impact of updates on security.",
    ],
    benefits: [
      "Accurate Configuration: Ensures that DMARC records are correctly set up, helping to prevent misconfigurations that could compromise email security.",
      "Enhanced Troubleshooting: Identifies and highlights issues with existing DMARC records, making it easier to resolve problems and improve email authentication.",
      "Enhanced Protection: Delivers insights into how well your DMARC policies are working, helping you fine-tune settings to better guard against spoofing and phishing threats.",
      "Data-Driven Decisions: Offers historical data and detailed reports, enabling informed decisions based on past performance and changes in email security practices.",
    ],
  },
  dmarc_generator: {
    title: "Why DMARC Record Generator Matters for Compliance?",
    _section:
      "A DMARC Record Generator is essential for compliance as it ensures the accurate setup of DMARC records, crucial for protecting domains against phishing and spoofing attacks. Properly configured DMARC records enhance email deliverability by verifying the authenticity of messages. The tool simplifies the process to <strong>generate a DMARC record</strong> and manage these records, making it easier for organizations to maintain robust email security. It also facilitates adherence to industry regulations and standards related to data protection. By providing valuable reporting insights, the generator helps monitor and refine email security practices.",
    details: [
      {
        tag: "v (Version)",
        description:
          "Must be 'DMARC1'. If missing or incorrect, the record will be ignored.",
      },
      {
        tag: "p (Policy)",
        description:
          "Defines actions for failed emails. Options are: 'none': No action, just collecting reports. 'quarantine': Marks emails as suspicious. 'reject': Blocks emails.",
      },
      {
        tag: "rua (Aggregate Reports)",
        description:
          "Email address for receiving aggregate reports. Optional but needed for reports.",
      },
      {
        tag: "ruf (Forensic Reports)",
        description:
          "Email address for receiving detailed failure reports. Optional but needed for detailed reports.",
      },
      {
        tag: "sp (Subdomain Policy)",
        description:
          "Policy for subdomains. Inherits from the main domain unless specified. Options are: 'none', 'quarantine', 'reject'.",
      },
      {
        tag: "adkim (DKIM Alignment)",
        description:
          "Alignment between DKIM domain and Header From domain. Options are: 'r' (relaxed): Allows partial match. 's' (strict): Requires exact match.",
      },
      {
        tag: "aspf (SPF Alignment)",
        description:
          "Alignment between SPF domain and Header From domain. Options are: 'r' (relaxed): Allows partial match. 's' (strict): Requires exact match.",
      },
      {
        tag: "fo (Forensic Reporting Options)",
        description:
          "Determines when to generate forensic reports. Options are: '0': When both SPF and DKIM fail. '1': When either SPF or DKIM fails. 'd': When DKIM fails. 's': When SPF fails.",
      },
      {
        tag: "rf (Reporting Format)",
        description:
          "Format for failure reports. Options are: 'afrf' (ARF), 'iodef' (IODEF).",
      },
      {
        tag: "pct (Percentage)",
        description: "Percentage of failed emails to which the policy applies.",
      },
      {
        tag: "ri (Reporting Interval)",
        description:
          "Frequency of report generation in seconds. Default is 86400 (once a day).",
      },
    ],
    features: [
      "Automated Record Creation: Quickly generates accurate DMARC records with the correct syntax and settings, reducing manual errors and ensuring proper implementation.",
      "Customizable Settings: Allows users to tailor DMARC policies to their specific needs, including setting policy modes (none, quarantine, reject), and specifying reporting email addresses.",
      "Instant Validation: Provides real-time validation of the generated DMARC records to ensure they are correctly formatted and ready for deployment.",
      "Comprehensive Reporting Options: Supports the inclusion of reporting features for aggregate and forensic reports, helping users monitor email traffic and identify potential issues.",
    ],
    benefits: [
      "Enhanced Security: Accurately <strong>creating DMARC records for domain</strong> helps protect your domain from phishing and spoofing attacks, boosting email security.",
      "Streamlined Setup: Simplifies generating and implementing DMARC records, reducing the complexity and time for proper configuration.",
      "Improved Deliverability: Ensures legitimate emails are less likely to be marked as spam by setting up DMARC policies, enhancing deliverability.",
      "Actionable Insights: Provides detailed reporting options to track and analyze email authentication performance, allowing for ongoing adjustments.",
    ],
  },
  dkim_lookup: {
    title: "Why DKIM Record Checker Matters for Compliance?",
    _section:
      "The <strong>DKIM Key Checker</strong> is crucial for compliance as it ensures your domain's DKIM records are correctly configured, preventing email spoofing and protecting your domain's reputation. It uniquely aligns your DKIM records with industry standards and regulations, offering real-time verification and error detection. This proactive approach verifies that emails are genuinely from your domain, enhancing trust and reducing the risk of your emails being flagged as fraudulent.",
    details: [
      {
        tag: "v (Version)",
        description:
          "Specifies the DKIM version being used, typically 'DKIM1', indicating the protocol version.",
      },
      {
        tag: "k (Key Type)",
        description:
          "Defines the algorithm used for the DKIM key, such as 'rsa', which specifies RSA encryption.",
      },
      {
        tag: "p (Public Key)",
        description:
          "Contains the public key used for verifying DKIM signatures, allowing recipients to confirm the email's authenticity.",
      },
      {
        tag: "s (Selector)",
        description:
          "Identifies the DKIM selector that helps locate the correct DKIM public key in DNS records. It’s used to distinguish between multiple keys.",
      },
      {
        tag: "t (Flags)",
        description:
          "Optional flags that can modify DKIM behavior, such as 'y' for testing mode, allowing you to test your DKIM setup without affecting live email.",
      },
      {
        tag: "h (Header Fields)",
        description:
          "Lists the email header fields that are included in the DKIM signature, ensuring these headers are verified along with the email.",
      },
      {
        tag: "n (Notes)",
        description:
          "Provides additional information or comments about the DKIM record, which can be useful for administrative or informational purposes.",
      },
    ],
    features: [
      "Comprehensive DKIM Analysis: Provides in-depth analysis to <strong>check DKIM records for domain</strong> by evaluating relevant tags, including version, key type, public key, selector, flags, and notes, ensuring a thorough review.",
      "Real-Time Error Detection: Instantly identifies and highlights discrepancies or errors in DKIM configuration, such as incorrect key formats or missing tags, enabling prompt corrections.",
      "Standards Compliance Verification: Checks DKIM records against industry standards and practices to ensure compliance, helping you adhere to security protocols and reduce failures.",
      "Detailed Explanations and Guidance: Offers clear explanations of DKIM tags and their functions, along with recommendations for optimizing your DKIM setup.",
    ],
    benefits: [
      "Proactive Issue Detection: Identifies potential DKIM issues before they impact email delivery, allowing you to address problems and maintain secure practices.",
      "Detailed Configuration Insights: Offers insights into DKIM settings, helping you understand the implications of each tag and how they affect authentication.",
      "Regular Updates: Ensures you receive updates on DKIM standards and best practices, keeping your email security aligned with evolving requirements.",
      "Flexible Reporting Options: Provides various reporting formats and customization options, allowing you to generate and export reports that suit your needs.",
    ],
  },
  dkim_generator: {
    title: "Why DKIM Record Generator Matters for Compliance?",
    _section:
      "The DKIM Record Generator is essential for compliance as it ensures your DKIM records are accurately created and configured. DKIM (DomainKeys Identified Mail) helps verify the authenticity of emails from your domain. By using this tool, you generate DKIM records that meet industry standards, enhancing your email security and protecting your domain from misuse. Accurate DKIM records help prevent spoofing and phishing, ensuring that your communications are trusted and comply with authentication protocols. This approach not only secures your domain but also supports regulatory compliance, reducing the risk of fraudulent emails.",
    details: [
      {
        tag: "v (DKIM Version)",
        description:
          "Specifies the DKIM version being used, typically 'DKIM1', indicating the protocol version.",
      },
      {
        tag: "k (Key Type)",
        description:
          "Defines the algorithm used for the DKIM key, such as 'rsa', which specifies RSA encryption.",
      },
      {
        tag: "p (Public Key)",
        description:
          "Contains the public key used for verifying DKIM signatures, allowing recipients to confirm the email's authenticity.",
      },
      {
        tag: "s (Selector)",
        description:
          "Identifies the DKIM selector that helps locate the correct DKIM public key in DNS records. It’s used to distinguish between multiple keys.",
      },
      {
        tag: "t (Flags)",
        description:
          "Optional flags that can modify DKIM behavior, such as 'y' for testing mode, allowing you to test your DKIM setup without affecting live email.",
      },
      {
        tag: "h (Header Fields)",
        description:
          "Lists the email header fields that are included in the DKIM signature, ensuring these headers are verified along with the email.",
      },
      {
        tag: "n (Notes)",
        description:
          "Provides additional information or comments about the DKIM record, which can be useful for administrative or informational purposes.",
      },
    ],
    features: [
      "Intuitive Record Creation: Simplifies DKIM record creation with a user-friendly interface that guides you through domain and selector information.",
      "Automated Key Generation: Automatically generates cryptographic keys for DKIM records, ensuring they are secure and compatible with email authentication.",
      "Compatibility Checks: Ensures DKIM records are compatible with various DNS configurations and email servers, reducing setup issues.",
      "Step-by-Step Instructions: Provides clear instructions for adding the DKIM record to your DNS settings, making implementation straightforward and error-free.",
    ],
    benefits: [
      "Enhanced Security: Creates robust DKIM records with advanced cryptographic keys, bolstering your email security and protecting against spoofing.",
      "Simplified Configuration: Streamlines the DKIM setup process with clear instructions and automated key generation, making configuration easier and faster.",
      "Improved Deliverability: Ensures your DKIM records are correctly formatted and compliant with standards, enhancing email deliverability and reducing the risk of being flagged as spam.",
      "Efficient Integration: Facilitates seamless integration with your DNS settings and email systems, minimizing setup errors and ensuring a smooth implementation process.",
    ],
  },
  bimi_lookup: {
    title: "Why BIMI Record Checker Matters for Compliance?",
    _section:
      "The BIMI Record Checker is crucial for compliance because it ensures that your BIMI (Brand Indicators for Message Identification) records are correctly set up, allowing your brand's logo to appear in email inboxes. This enhances brand recognition and trust while ensuring that your emails meet industry standards for authentication and visual branding. Proper BIMI implementation helps prevent phishing and spoofing, contributing to overall email security and compliance with best practices.",
    details: [],
    features: [
      "Instant Record Validation: Quickly checks the validity of your BIMI record to ensure it meets specifications for displaying your brand’s logo in email clients.",
      "Detailed Error Reporting: Provides clear, actionable insights into errors or issues with your BIMI record, helping you to promptly resolve configuration problems and achieve compliance.",
      "Cross-Domain Validation: Supports the validation of BIMI records across multiple domains or subdomains, streamlining the management of complex email setups.",
      "Integration Support: Facilitates integration with other email authentication tools, allowing for a comprehensive approach to managing your domain's email security and branding.",
    ],
    benefits: [
      "Boosts Brand Credibility: Displays your brand’s logo in email inboxes, enhancing visibility and fostering trust with your audience.",
      "Strengthens Security Measures: Ensures proper BIMI record setup, helping to reduce the risk of email-based attacks and protect your domain.",
      "Facilitates Quick Resolution: Offers actionable insights and recommendations to swiftly address any configuration issues or errors.",
      "Streamlined Verification: Simplifies verifying your BIMI records, making it easier to ensure email branding is correctly implemented.",
    ],
  },
  bimi_generator: {
    title: "Why BIMI Record Generator Matters for Compliance?",
    _section:
      "The BIMI Record Generator is essential for compliance because it helps you create and configure accurate BIMI records from scratch. This tool ensures that your brand's logo is properly set up for display in email inboxes, enhancing your email’s visibility and credibility. By generating a valid BIMI record, you improve brand recognition and align with industry standards for email authentication, which helps in establishing trust and preventing phishing attacks.",
    details: [],
    features: [
      "Custom Logo Integration: Upload and integrate your brand’s logo into the BIMI record for a recognizable brand image.",
      "Automatic Record Formatting: Formats the BIMI record to comply with standards, ensuring compatibility with email clients.",
      "Validation Checks: Validates the BIMI record to meet technical requirements before implementation, preventing issues.",
      "Step-by-Step Guidance: Offers clear instructions during the record creation process, simplifying it for all users.",
    ],
    benefits: [
      "Boosts Visual Identity: Allows you to showcase your brand logo next to your emails, making your messages instantly recognizable and reinforcing your brand identity.",
      "Streamlines Brand Consistency: Ensures your logo appears consistently across various email clients, maintaining uniformity in your brand's visual representation.",
      "Optimizes Email Deliverability: Helps improve your email deliverability by correctly setting up BIMI records, reducing the chances of your emails landing in spam folders.",
      "Enhances User Engagement: By featuring your logo, it increases engagement and interaction rates, as recipients are more likely to open and trust emails from a recognizable sender.",
    ],
  },
  mta_sts_generator: {
    title: "Why MTA-STS Policy Generator Matters for Email Security?",
    _section: `The MTA-STS Policy Generator is vital for securing email transmissions by enforcing the use of TLS encryption, ensuring that emails are protected from interception or tampering. It simplifies the creation of MTA-STS policies, helping domain owners prevent man-in-the-middle attacks. By requiring secure communication between email servers, it also improves email deliverability and protects sensitive information. This tool ensures that your domain’s email security standards are consistently applied. Using an MTA-STS Policy Generator is a proactive measure to maintain the integrity and security of your organization’s emails. <br /><br />
      <strong>How it works:</strong>
      <br /><br />
      <strong>Domain Input:</strong> You enter your domain name to generate the MTA-STS record for it.
      <br /><br />
      <strong>Policy Type Selection:</strong> Choose from:
      <br /><br />
      <ul>
      <li><strong>None:</strong> Disables the policy check.</li>
      <br />
      <li><strong>Testing:</strong> Allows both secure and insecure connections for testing purposes.</li>
      <br />
      <li><strong>Enforce:</strong> Ensures only secure connections are used.</li>
      </ul>
      <strong>MX Hosts:</strong> Specify the mail exchange servers for your domain.
      <br /><br />
      <strong>Maximum Age:</strong> Set the duration for how long the policy is valid before it needs to be refreshed.
      `,
    details: [],
    features: [
      "Custom Policy Creation: Allows you to generate MTA-STS policies with customizable settings, including enforcing secure connections or testing configurations.",
      "Domain-Specific Records: Facilitates the creation of MTA-STS records tailored to your specific domain and mail exchange servers.",
      "Maximum Age Configuration: Lets you set the duration for how long the generated policy remains valid before it needs to be updated.",
      "Ease of Use: Provides a straightforward interface for generating and managing MTA-STS policies, simplifying the implementation of email security practices.",
    ],
    benefits: [
      "Enhanced Email Security: By enforcing encrypted connections, the tool helps protect your email communications from interception and tampering, improving overall security.",
      "Reduced Risk of Downgrade Attacks: Ensures that email communications are conducted over secure channels, mitigating the risk of attackers forcing less secure connections.",
      "Streamlined Policy Management: Simplifies the creation and maintenance of MTA-STS policies, making it easier to implement and update email security practices.",
      "Customizable Settings: Offers flexibility in policy configuration, allowing you to choose the level of security enforcement and tailor settings to your specific needs.",
    ],
  },
  mta_sts_lookup: {
    title: "Why MTA-STS Matters for Email Security?",
    _section: `
          MTA-STS (Mail Transfer Agent Strict Transport Security) is essential for protecting email communications by ensuring that all emails sent to your domain are transmitted over encrypted connections. It prevents unauthorized access by enforcing TLS encryption, which guards against interception and tampering. By securing the email transmission process, MTA-STS enhances deliverability and fosters trust, ensuring that your emails reach their destination securely and are less likely to be flagged as suspicious.
          <br /><br />
          <strong>How it works:</strong>
          <br /><br />
          <strong>Enter Your Domain:</strong> Input your domain name (e.g., example.com) in the provided field. 
          <br />This is the domain you want to check for MTA-STS configuration.
          <br /><br />
          <strong>Click “Check MTA-STS”:</strong> After entering your domain, click the “Check MTA-STS” button to initiate the lookup process.
          <br /><br />
          <strong>View Results:</strong> The tool will analyze your domain’s MTA-STS setup, checking the presence of the MTA-STS TXT record and validating its syntax. 
          <br />It will also verify if the policy file is correctly hosted and formatted. You’ll receive detailed results and recommendations to ensure your email security is properly configured.`,
    details: [],
    features: [
      "Instant Record Check:Rapidly verify your domain’s MTA-STS TXT record to ensure it's correctly configured and up-to-date.",
      "Policy File Insights:Seamlessly validate that your MTA-STS policy file is properly hosted and meets all security requirements.",
      "Syntax Sleuth:Detects and fixes syntax errors in your MTA-STS records with precision, ensuring flawless email security.",
      "Real-Time Security Scan:Receive immediate, actionable feedback on your MTA-STS setup to swiftly enhance your email protection.",
    ],
    benefits: [
      "Elevated Email Security: Protect your emails by ensuring they are transmitted over secure, encrypted connections, reducing interception risk.",
      "Enhanced Trust and Deliverability: Boost email deliverability and build trust with recipients by enforcing strict transport security protocols.",
      "Streamlined Compliance: Maintain compliance with email security practices by verifying MTA-STS records and policies, meeting industry standards.",
      "Proactive Issue Resolution: Identify and resolve issues quickly with real-time feedback, keeping your email security optimized and effective.",
    ],
  },
  tls_rpt_lookup: {
    title: "Why TLS-RPT Record Checker Matters for Email Security?",
    _section: `The <strong>TLS-RPT (Transport Layer Security Reporting) record checker</strong> is essential for maintaining secure email communications by verifying that TLS-RPT records are correctly configured. It enables domain owners to receive reports on encryption issues, ensuring that any failures in email transmission are quickly identified and resolved. This tool helps protect sensitive information, enhances email deliverability, and ensures compliance with security regulations, ultimately building trust with recipients. By proactively managing encryption, the TLS-RPT Record Checker plays a crucial role in maintaining strong email security.<br /><br />
      <strong>What the Tool Does:</strong>
      <br /><br />
      <strong>Checks Your Domain:</strong> Enter your domain to look up and validate the existing TLS-RPT records.
      <br /><br />
      <strong>Validates Records:</strong> Ensures that your TLS-RPT records are correctly configured and functioning properly.
      <br /><br />
      <strong>Identifies Issues:</strong> Helps troubleshoot any problems or misconfigurations in your TLS-RPT records.`,
    details: [],
    features: [
      "Encryption Issue Detection: Identifies and reports problems with TLS encryption in email communications.",
      "Configuration Insights: Provides detailed reports on TLS configurations and potential vulnerabilities.",
      "Compliance Verification: Ensures adherence to industry standards and regulations for email encryption.",
      "Incident Support: Offers data to assist in diagnosing and responding to email security incidents.",
    ],
    benefits: [
      "Actionable Alerts: Provides specific recommendations and actionable alerts based on detected TLS issues, guiding immediate improvements.",
      "Customized Reporting: Offers tailored reports with detailed insights into the TLS configuration specific to your organization’s email infrastructure.",
      "Integration Capabilities: Can be integrated with existing security monitoring tools to provide a comprehensive view of email security.",
      "Trend Analysis: Tracks and analyzes trends in TLS encryption over time, helping to identify and address recurring issues or improvements.",
    ],
  },
  tls_rpt_generator: {
    title: "Why  TLS-RPT Record Generator Matters for Email Security?",
    _section: `The TLS-RPT Record Generator is vital for email security as it enables the creation of DNS records that facilitate reporting of TLS encryption issues. By allowing email servers to report problems like certificate errors or failed connections, it helps identify and address vulnerabilities in encryption. This tool enhances overall security posture by ensuring that email communications are protected. Additionally, it supports compliance with encryption standards and provides valuable insights into TLS performance, aiding in proactive management and resolution of security issues.<br /><br />
      <strong>What the Tool Does:</strong>
      <br /><br />
      <strong>Creates DNS Records:</strong> Generates the necessary DNS records to enable TLS-RPT reporting for your email domain.
      <br /><br />
      <strong>Enables Encryption Reporting:</strong> Allows email servers to send reports about TLS encryption issues, such as certificate errors or failed connections.
      <br /><br />
      <strong>Facilitates Issue Identification:</strong> Helps in identifying and diagnosing problems with TLS encryption by providing detailed reports on issues encountered.
      <br /><br />
      <strong>Supports Security Improvements:</strong> Assists in enhancing email security by enabling timely detection and resolution of encryption-related issues.
      `,
    details: [],
    features: [
      "DNS Record Creation: Generates DNS records necessary for enabling TLS-RPT reporting on your email domain.",
      "Issue Reporting: Facilitates the reporting of TLS encryption problems, such as certificate errors or connection failures.",
      "Customizable Reporting: Allows configuration of reporting addresses to receive notifications of TLS issues.",
      "Performance Insights: Provides insights into TLS encryption performance and issues, helping to maintain secure email communications.",
    ],
    benefits: [
      "Streamlined DNS Configuration: Simplifies the process of creating and updating TLS-RPT DNS records for your email domain.",
      "Accurate Reporting Setup: Ensures accurate setup of reporting addresses to receive timely notifications of encryption issues.",
      "Enhanced Encryption Monitoring: Provides a clear mechanism for reporting and tracking TLS encryption problems, improving overall email security.",
      "Ease of Use: Makes it easier to implement TLS-RPT reporting, facilitating better management and enhancement of email encryption practices.",
    ],
  },
  blacklist_domain: {
    title: "Safeguard Your Domain with Our Blacklist Checker",
    _section: `Worried about your domain's reputation? Our Blacklist Domain Checker helps you verify if your domain is blacklisted across various databases. Protect your domain's integrity and ensure your emails are delivered smoothly to your recipients.<br></br>
      <strong>How It Works:</strong><br /><br />1. Enter your domain name into the provided field.<br /><br />
      2. Click "Check Now" to initiate the scan.<br /><br />
      3. Examine the results and follow the guidance provided to address any issues.`,
    details: [],
    features: [
      "Real-Time Domain Check: Quickly find out if your domain is listed on any blacklist.",
      "Extensive Coverage: Our tool checks against multiple blacklist databases to provide a comprehensive assessment.",
      "In-Depth Reports: Access detailed information about any blacklist status, including specific blacklist sources.",
      "Resolution Guidance: Receive practical advice on how to address any blacklist issues detected.",
    ],
    benefits: [
      "Improved Email Delivery Rates: Avoid issues with email deliverability caused by domain blacklisting.",
      "Preserve Your Domain’s Reputation: Keep your domain off blacklists to maintain a positive image with your audience.",
      "Proactive Monitoring: Regularly check your domain's status to catch and resolve blacklist problems early.",
    ],
  },
  blacklist_ip: {
    title: "Protect Your Sender Reputation with Our Blacklist IP Checker",
    _section: `Is your IP address under threat? With our Blacklist IP Checker, you can quickly and easily determine if your IP has been blacklisted. This tool helps you maintain a strong sender reputation and ensures your emails reach their intended recipients without hindrance.<br></br>
      <strong>How It Works:</strong><br /><br />1. Enter your IP address into the search field.<br /><br />
      2. Click "Check Now" to start the scan.<br /><br />
      3. Review the results and take action based on the detailed report provided.`,
    details: [],
    features: [
      "Instant IP Check: Get real-time results on whether your IP address is listed on major blacklists.",
      "Comprehensive Database: Our tool checks against a wide range of blacklist databases to give you a thorough report.",
      "Detailed Reports: Receive clear, detailed information about any blacklisting issues detected, including the specific blacklist names.",
      "Actionable Insights: Understand the potential impact of a blacklist and get recommendations on how to resolve any issues.",
    ],
    benefits: [
      "Enhanced Email Deliverability: Ensure your emails are not blocked or flagged as spam due to blacklisting.",
      "Protect Your Sender Reputation: Keep your IP address off blacklists to maintain trust with your email recipients.",
      "Efficient Monitoring: Regular checks help prevent and address blacklist issues before they impact your communications.",
    ],
  },
};

export const _DNS_ARRAY = [
  "All",
  "A",
  "AAAA",
  "MX",
  "CNAME",
  "TXT",
  "PTR",
  "NS",
  "SOA",
  "SRV",
  "CAA",
  "DS",
  "DNSKEY",
];

export const initDomainResults = {
  DMARC: {},
  SPF: {},
  DKIM: {},
  BIMI: {},
  MTA: {},
  TLS: {},
  BLACKLIST: {},
  BLACKLISTIP: {},
};

export const _DNS_TABLE_COLUMN: any = {
  A: ["Type", "Name", "IP Address", "TTL"],
  AAAA: ["Type", "Name", "IP Address", "TTL"],
  MX: ["Type", "Name", "Mail Server", "Priority", "TTL"],
  CNAME: ["Type", "Name", "TTL"],
  TXT: ["Type", "Name", "Content", "TTL"],
  PTR: ["Type", "Name", "TTL"],
  NS: ["Type", "Name", "Name Server", "TTL"],
  SOA: [
    "Type",
    "Name",
    "Primary Name Server",
    "Responsible Email",
    "Serial",
    "Refresh",
    "Expire",
    "Retry",
    "Min TTL",
    "TTL",
  ],
  SRV: ["Type", "Name", "TTL"],
  CAA: ["Type", "Name", "IP Address", "TTL"],
  DS: ["Type", "Name", "IP Address", "TTL"],
  DNSKEY: ["Type", "Name", "IP Address", "TTL"],
};

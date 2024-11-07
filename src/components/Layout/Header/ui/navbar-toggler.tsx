"use client";
import { useState, MouseEvent, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { removeHttp } from "@/utils/string-conversion";
import { signOut, useSession } from "next-auth/react";
import DnsIcon from "@mui/icons-material/Dns";
import Link from "next/link";
import MailLockIcon from "@mui/icons-material/MailLock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const NavbarToggler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let domain: string = removeHttp(searchParams.get("domain") as string) || "";
  const { data: session, status } = useSession();
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav ms-auto mb-lg-0">
            {status === "authenticated" && (
              <>
                <li className="nav-item">
                  <Link
                    rel="canonical"
                    className="nav-link"
                    // href={domain ? `/dashboard/sender-dashboard?domain=${domain}` : `/dashboard`}
                    href={`/dashboard/dashboard`}
                  >
                    Dashboard
                  </Link>
                </li>
                {/* <li className="nav-item">
              <Link className="nav-link" href={domain ? `/?domain=${domain}` : `/`}>Reports</Link>
            </li> */}

                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tools
                    <span>
                      <i className="fa-solid fa-caret-down ms-2"></i>
                    </span>
                  </div>
                  <div className="dropdown-menu">
                    <div className="row">
                      <div className="col-lg-6">
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            <DnsIcon />
                          </span>
                          <h5>DNS Lookups</h5>
                        </span>

                        <div className="row mb-4 listMargin">
                          <div className="col-lg-6">
                            <ul>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/dns-lookup?domain=${domain}`
                                      : `/tools/dns-lookup`
                                  }
                                >
                                  DNS Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/a-lookup?domain=${domain}`
                                      : `/tools/a-lookup`
                                  }
                                >
                                  DNS A Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/aaaa-lookup?domain=${domain}`
                                      : `/tools/aaaa-lookup`
                                  }
                                >
                                  DNS AAAA Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/mx-lookup?domain=${domain}`
                                      : `/tools/mx-lookup`
                                  }
                                >
                                  MX Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/cname-lookup?domain=${domain}`
                                      : `/tools/cname-lookup`
                                  }
                                >
                                  CNAME Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/txt-lookup?domain=${domain}`
                                      : `/tools/txt-lookup`
                                  }
                                >
                                  TXT Lookups
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-6">
                            <ul>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/ptr-lookup?domain=${domain}`
                                      : `/tools/ptr-lookup`
                                  }
                                >
                                  PTR Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/ns-lookup?domain=${domain}`
                                      : `/tools/ns-lookup`
                                  }
                                >
                                  NS Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/soa-lookup?domain=${domain}`
                                      : `/tools/soa-lookup`
                                  }
                                >
                                  SOA Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/srv-lookup?domain=${domain}`
                                      : `/tools/srv-lookup`
                                  }
                                >
                                  SRV Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/caa-lookup?domain=${domain}`
                                      : `/tools/caa-lookup`
                                  }
                                >
                                  CAA Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/ds-lookup?domain=${domain}`
                                      : `/tools/ds-lookup`
                                  }
                                >
                                  DS Lookups
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/dnskey-lookup?domain=${domain}`
                                      : `/tools/dnskey-lookup`
                                  }
                                >
                                  DNSKEY Lookups
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* <h5>DNS LOOKUPS</h5>
                      <ul>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/dns-lookup?domain=${domain}`
                                : `/tools/dns-lookup`
                            }
                          >
                            DNS Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/a-lookup?domain=${domain}`
                                : `/tools/a-lookup`
                            }
                          >
                            DNS A Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/aaaa-lookup?domain=${domain}`
                                : `/tools/aaaa-lookup`
                            }
                          >
                            DNS AAAA Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/mx-lookup?domain=${domain}`
                                : `/tools/mx-lookup`
                            }
                          >
                            MX Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/cname-lookup?domain=${domain}`
                                : `/tools/cname-lookup`
                            }
                          >
                            CNAME Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/txt-lookup?domain=${domain}`
                                : `/tools/txt-lookup`
                            }
                          >
                            TXT Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/ptr-lookup?domain=${domain}`
                                : `/tools/ptr-lookup`
                            }
                          >
                            PTR Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/ns-lookup?domain=${domain}`
                                : `/tools/ns-lookup`
                            }
                          >
                            NS Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/soa-lookup?domain=${domain}`
                                : `/tools/soa-lookup`
                            }
                          >
                            SOA Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/srv-lookup?domain=${domain}`
                                : `/tools/srv-lookup`
                            }
                          >
                            SRV Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/caa-lookup?domain=${domain}`
                                : `/tools/caa-lookup`
                            }
                          >
                            CAA Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/ds-lookup?domain=${domain}`
                                : `/tools/ds-lookup`
                            }
                          >
                            DS Lookups
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              domain
                                ? `/tools/dnskey-lookup?domain=${domain}`
                                : `/tools/dnskey-lookup`
                            }
                          >
                            DNSKEY Lookups
                          </Link>
                        </li>
                      </ul> */}

                        <div className="row">
                          <div className="col-lg-12">
                            <span className="d-flex gap-2 align-items-center mb-3">
                              <span className="iconBorder">
                                <MailLockIcon />
                              </span>
                              <h5>MTA TLS Lookup</h5>
                            </span>
                            <ul className="listMargin mta">
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/mta-sts-lookup?domain=${domain}`
                                      : `/tools/mta-sts-lookup`
                                  }
                                >
                                  MTA STS Record Checker
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/mta-sts-generator?domain=${domain}`
                                      : `/tools/mta-sts-generator`
                                  }
                                >
                                  MTA STS Record Generator
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/tls-rpt-lookup?domain=${domain}`
                                      : `/tools/tls-rpt-lookup`
                                  }
                                >
                                  TLS RPT Record Checker
                                </Link>
                              </li>
                              <li>
                                <Link
                                  rel="canonical"
                                  href={
                                    domain
                                      ? `/tools/tls-rpt-generator?domain=${domain}`
                                      : `/tools/tls-rpt-generator`
                                  }
                                >
                                  TLS RPT Record Generator
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <span className="d-flex gap-2 align-items-center mb-3 mt-4">
                          <span className="iconBorder">
                            <AdminPanelSettingsIcon />
                          </span>
                          <h5>Other Tools</h5>
                        </span>

                        <ul className="listMargin mta">
                          <li>
                            <Link href="/scanDomain">
                              Domains DMARC Scanner
                            </Link>
                          </li>
                          <li>
                            <Link href="/sendEmail">Send Email</Link>
                          </li>
                        </ul> */}
                      </div>
                      <div className="col-lg-6">
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            <AdminPanelSettingsIcon />
                          </span>
                          <h5>DMARC Lookups</h5>
                        </span>

                        <ul className="mb-4 listMargin mta">
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/spf-lookup?domain=${domain}`
                                  : `/tools/spf-lookup`
                              }
                            >
                              SPF Record Checker
                            </Link>
                          </li>
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/spf-generator?domain=${domain}`
                                  : `/tools/spf-generator`
                              }
                            >
                              SPF Record Generator
                            </Link>
                          </li>
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/spf-checker?domain=${domain}`
                                  : `/tools/spf-checker`
                              }
                            >
                              SPF Raw Checker
                            </Link>
                          </li>
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/dmarc-lookup?domain=${domain}`
                                  : `/tools/dmarc-lookup`
                              }
                            >
                              DMARC Record Checker
                            </Link>
                          </li>
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/dmarc-generator?domain=${domain}`
                                  : `/tools/dmarc-generator`
                              }
                            >
                              DMARC Record Generator
                            </Link>
                          </li>
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/dkim-lookup?domain=${domain}`
                                  : `/tools/dkim-lookup`
                              }
                            >
                              DKIM Record Checker
                            </Link>
                          </li>
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/dkim-generator?domain=${domain}`
                                  : `/tools/dkim-generator`
                              }
                            >
                              DKIM Record Generator
                            </Link>
                          </li>
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/bimi-lookup?domain=${domain}`
                                  : `/tools/bimi-lookup`
                              }
                            >
                              BIMI Record Checker
                            </Link>
                          </li>
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/bimi-generator?domain=${domain}`
                                  : `/tools/bimi-generator`
                              }
                            >
                              BIMI Record Generator
                            </Link>
                          </li>
                        </ul>
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            <UnsubscribeIcon />
                          </span>
                          <h5>Blacklisting</h5>
                        </span>

                        <ul className="listMargin mta">
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/blacklist-domain-lookup?domain=${domain}`
                                  : `/tools/blacklist-domain-lookup`
                              }
                            >
                              Blacklist IP Checker
                            </Link>
                          </li>
                          <li>
                            <Link
                              rel="canonical"
                              href={
                                domain
                                  ? `/tools/blacklist-domain-lookup?domain=${domain}`
                                  : `/tools/blacklist-domain-lookup`
                              }
                            >
                              Blacklist Domain Checker
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                {/* <li className="nav-item ">
                <Link className="nav-link" href="https://www.wedmarc.com">
                  Resources
                </Link>
              </li> */}
                <li className="nav-item dropdown solution">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Solutions
                    <span>
                      <i className="fa-solid fa-caret-down ms-2"></i>
                    </span>
                  </a>
                  <div className="dropdown-menu solution">
                    <div className="row">
                      <div className="col-lg-4">
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            <Image src={_IMG.business} alt="" loading="lazy" />
                          </span>
                          <h5>By Business</h5>
                        </span>
                        <ul className="listMargin mta">
                          <li>
                            <Link rel="canonical" href="/startup">
                              Startups
                            </Link>
                          </li>
                          <li>
                            <Link rel="canonical" href="/solutions">
                              Solution for SMBs
                            </Link>
                          </li>
                          <li>
                            <Link rel="canonical" href="/enterprise">
                              DMARC Enterprise
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-8">
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            <Image src={_IMG.industry} alt="" loading="lazy" />
                          </span>
                          <h5>By Industries</h5>
                        </span>
                        <div className="row">
                          <div className="col-lg-6">
                            <ul className="listMargin mta">
                              <li>
                                <Link rel="canonical" href="/nonprofits">
                                  Non-Profit
                                </Link>
                              </li>
                              <li>
                                <Link rel="canonical" href="/healthcare">
                                  Healthcare
                                </Link>
                              </li>
                              <li>
                                <Link rel="canonical" href="/educations">
                                  Educations
                                </Link>
                              </li>
                              <li>
                                <Link rel="canonical" href="/info-tech">
                                  Info-Tech
                                </Link>
                              </li>
                              <li>
                                <Link rel="canonical" href="/government">
                                  Government
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-6">
                            <ul className="">
                              <li>
                                <Link rel="canonical" href="/retail">
                                  Retail
                                </Link>
                              </li>
                              <li>
                                <Link rel="canonical" href="/finance">
                                  Finance
                                </Link>
                              </li>
                              <li>
                                <Link rel="canonical" href="/marketing">
                                  Marketing
                                </Link>
                              </li>
                              <li>
                                <Link rel="canonical" href="/insurance">
                                  Insurance
                                </Link>
                              </li>
                              {/* <li>
                                  <Link
                                    href="/"
                                  >
                                    Insurance
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/"
                                  >
                                    ISP and Telecoms
                                  </Link>
                                </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row mt-4">
                      <div className="col-lg-4">
                          <span className="d-flex gap-2 align-items-center mb-3">
                            <span className="iconBorder">
                              <Image src="/assets/images/management.svg" alt="" />
                            </span>
                            <h5>By Management</h5>
                          </span>
                          <ul className="listMargin mta">
                            <li>
                              <Link
                                href="/"
                              >
                                Information Security
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/"
                              >
                                Email Marketing
                              </Link>
                            </li>
                          </ul>
                      </div>
                      <div className="col-lg-8">
                            <span className="d-flex gap-2 align-items-center mb-3">
                              <span className="iconBorder">
                                <Image src="/assets/images/partnership.svg" alt="" />
                              </span>
                              <h5>By Partnership</h5>
                            </span>
                            <ul className="listMargin mta">
                              <li>
                                <Link
                                  href="/"
                                >
                                  ReferralProgram
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                >
                                  MSP/MSSP Program
                                </Link>
                              </li>
                            </ul>
                      </div>
                    </div> */}
                  </div>
                </li>
                <li className="nav-item">
                  <Link rel="canonical" className="nav-link" href="/contact-us">
                    Contact us
                  </Link>
                </li>

                <button
                  className="btn main-button-dark ms-3"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  Logout
                </button>
              </>
            )}
            {status === "unauthenticated" &&
              !["/login", "/signup"].includes(pathname) && (
                <>
                  <li className="nav-item">
                    <Link rel="canonical" href="/" className="me-3 nav-link">
                      Home
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                  <Link href="/" className="me-3 nav-link">
                      About Us
                  </Link>
                </li> */}

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Tools
                      <span>
                        <i className="fa-solid fa-caret-down ms-2"></i>
                      </span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="row">
                        <div className="col-lg-6">
                          <span className="d-flex gap-2 align-items-center mb-3">
                            <span className="iconBorder">
                              <DnsIcon />
                            </span>
                            <h5>DNS Lookups</h5>
                          </span>

                          <div className="row mb-4 listMargin">
                            <div className="col-lg-6">
                              <ul>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/dns-lookup?domain=${domain}`
                                        : `/tools/dns-lookup`
                                    }
                                  >
                                    DNS Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/a-lookup?domain=${domain}`
                                        : `/tools/a-lookup`
                                    }
                                  >
                                    DNS A Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/aaaa-lookup?domain=${domain}`
                                        : `/tools/aaaa-lookup`
                                    }
                                  >
                                    DNS AAAA Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/mx-lookup?domain=${domain}`
                                        : `/tools/mx-lookup`
                                    }
                                  >
                                    MX Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/cname-lookup?domain=${domain}`
                                        : `/tools/cname-lookup`
                                    }
                                  >
                                    CNAME Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/txt-lookup?domain=${domain}`
                                        : `/tools/txt-lookup`
                                    }
                                  >
                                    TXT Lookups
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-6">
                              <ul>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/ptr-lookup?domain=${domain}`
                                        : `/tools/ptr-lookup`
                                    }
                                  >
                                    PTR Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/ns-lookup?domain=${domain}`
                                        : `/tools/ns-lookup`
                                    }
                                  >
                                    NS Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/soa-lookup?domain=${domain}`
                                        : `/tools/soa-lookup`
                                    }
                                  >
                                    SOA Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/srv-lookup?domain=${domain}`
                                        : `/tools/srv-lookup`
                                    }
                                  >
                                    SRV Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/caa-lookup?domain=${domain}`
                                        : `/tools/caa-lookup`
                                    }
                                  >
                                    CAA Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/ds-lookup?domain=${domain}`
                                        : `/tools/ds-lookup`
                                    }
                                  >
                                    DS Lookups
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/dnskey-lookup?domain=${domain}`
                                        : `/tools/dnskey-lookup`
                                    }
                                  >
                                    DNSKEY Lookups
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/* <h5>DNS LOOKUPS</h5>
                        <ul>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/dns-lookup?domain=${domain}`
                                  : `/tools/dns-lookup`
                              }
                            >
                              DNS Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/a-lookup?domain=${domain}`
                                  : `/tools/a-lookup`
                              }
                            >
                              DNS A Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/aaaa-lookup?domain=${domain}`
                                  : `/tools/aaaa-lookup`
                              }
                            >
                              DNS AAAA Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/mx-lookup?domain=${domain}`
                                  : `/tools/mx-lookup`
                              }
                            >
                              MX Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/cname-lookup?domain=${domain}`
                                  : `/tools/cname-lookup`
                              }
                            >
                              CNAME Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/txt-lookup?domain=${domain}`
                                  : `/tools/txt-lookup`
                              }
                            >
                              TXT Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/ptr-lookup?domain=${domain}`
                                  : `/tools/ptr-lookup`
                              }
                            >
                              PTR Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/ns-lookup?domain=${domain}`
                                  : `/tools/ns-lookup`
                              }
                            >
                              NS Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/soa-lookup?domain=${domain}`
                                  : `/tools/soa-lookup`
                              }
                            >
                              SOA Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/srv-lookup?domain=${domain}`
                                  : `/tools/srv-lookup`
                              }
                            >
                              SRV Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/caa-lookup?domain=${domain}`
                                  : `/tools/caa-lookup`
                              }
                            >
                              CAA Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/ds-lookup?domain=${domain}`
                                  : `/tools/ds-lookup`
                              }
                            >
                              DS Lookups
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={
                                domain
                                  ? `/tools/dnskey-lookup?domain=${domain}`
                                  : `/tools/dnskey-lookup`
                              }
                            >
                              DNSKEY Lookups
                            </Link>
                          </li>
                        </ul> */}

                          <div className="row">
                            <div className="col-lg-12">
                              <span className="d-flex gap-2 align-items-center mb-3">
                                <span className="iconBorder">
                                  <MailLockIcon />
                                </span>
                                <h5>MTA TLS Lookup</h5>
                              </span>
                              <ul className="listMargin mta">
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/mta-sts-lookup?domain=${domain}`
                                        : `/tools/mta-sts-lookup`
                                    }
                                  >
                                    MTA STS Record Checker
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/mta-sts-generator?domain=${domain}`
                                        : `/tools/mta-sts-generator`
                                    }
                                  >
                                    MTA STS Record Generator
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/tls-rpt-lookup?domain=${domain}`
                                        : `/tools/tls-rpt-lookup`
                                    }
                                  >
                                    TLS RPT Record Checker
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    rel="canonical"
                                    href={
                                      domain
                                        ? `/tools/tls-rpt-generator?domain=${domain}`
                                        : `/tools/tls-rpt-generator`
                                    }
                                  >
                                    TLS RPT Record Generator
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* <span className="d-flex gap-2 align-items-center mb-3 mt-4">
                            <span className="iconBorder">
                              <AdminPanelSettingsIcon />
                            </span>
                            <h5>Other Tools</h5>
                          </span>

                          <ul className="listMargin mta">
                            <li>
                              <Link href="/scanDomain">
                                Domains DMARC Scanner
                              </Link>
                            </li>
                            <li>
                              <Link href="/sendEmail">Send Email</Link>
                            </li>
                          </ul> */}
                        </div>
                        <div className="col-lg-6">
                          <span className="d-flex gap-2 align-items-center mb-3">
                            <span className="iconBorder">
                              <AdminPanelSettingsIcon />
                            </span>
                            <h5>DMARC Lookups</h5>
                          </span>

                          <ul className="mb-4 listMargin mta">
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/spf-lookup?domain=${domain}`
                                    : `/tools/spf-lookup`
                                }
                              >
                                SPF Record Checker
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/spf-generator?domain=${domain}`
                                    : `/tools/spf-generator`
                                }
                              >
                                SPF Record Generator
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/spf-checker?domain=${domain}`
                                    : `/tools/spf-checker`
                                }
                              >
                                SPF Raw Checker
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/dmarc-lookup?domain=${domain}`
                                    : `/tools/dmarc-lookup`
                                }
                              >
                                DMARC Record Checker
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/dmarc-generator?domain=${domain}`
                                    : `/tools/dmarc-generator`
                                }
                              >
                                DMARC Record Generator
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/dkim-lookup?domain=${domain}`
                                    : `/tools/dkim-lookup`
                                }
                              >
                                DKIM Record Checker
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/dkim-generator?domain=${domain}`
                                    : `/tools/dkim-generator`
                                }
                              >
                                DKIM Record Generator
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/bimi-lookup?domain=${domain}`
                                    : `/tools/bimi-lookup`
                                }
                              >
                                BIMI Record Checker
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/bimi-generator?domain=${domain}`
                                    : `/tools/bimi-generator`
                                }
                              >
                                BIMI Record Generator
                              </Link>
                            </li>
                          </ul>
                          <span className="d-flex gap-2 align-items-center mb-3">
                            <span className="iconBorder">
                              <UnsubscribeIcon />
                            </span>
                            <h5>Blacklisting</h5>
                          </span>

                          <ul className="listMargin mta">
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/blacklist-domain-lookup?domain=${domain}`
                                    : `/tools/blacklist-domain-lookup`
                                }
                              >
                                Blacklist IP Checker
                              </Link>
                            </li>
                            <li>
                              <Link
                                rel="canonical"
                                href={
                                  domain
                                    ? `/tools/blacklist-domain-lookup?domain=${domain}`
                                    : `/tools/blacklist-domain-lookup`
                                }
                              >
                                Blacklist Domain Checker
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <li className="nav-item">
                  <Link href="/pricing" className="me-3 nav-link">
                      Pricing
                  </Link>
                </li> */}

                  <li className="nav-item dropdown solution">
                    <a
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Solutions
                      <span>
                        <i className="fa-solid fa-caret-down ms-2"></i>
                      </span>
                    </a>
                    <div className="dropdown-menu solution">
                      <div className="row">
                        <div className="col-lg-4">
                          <span className="d-flex gap-2 align-items-center mb-3">
                            <span className="iconBorder">
                              <Image
                                src={_IMG.business}
                                alt=""
                                loading="lazy"
                              />
                            </span>
                            <h5>By Business</h5>
                          </span>
                          <ul className="listMargin mta">
                            <li>
                              <Link rel="canonical" href="/startup">
                                Startups
                              </Link>
                            </li>
                            <li>
                              <Link rel="canonical" href="/solutions">
                                Solution for SMBs
                              </Link>
                            </li>
                            <li>
                              <Link rel="canonical" href="/enterprise">
                                DMARC Enterprise
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="col-lg-8">
                          <span className="d-flex gap-2 align-items-center mb-3">
                            <span className="iconBorder">
                              <Image
                                src={_IMG.industry}
                                alt=""
                                loading="lazy"
                              />
                            </span>
                            <h5>By Industries</h5>
                          </span>
                          <div className="row">
                            <div className="col-lg-6">
                              <ul className="listMargin mta">
                                <li>
                                  <Link rel="canonical" href="/nonprofits">
                                    Non-Profit
                                  </Link>
                                </li>
                                <li>
                                  <Link rel="canonical" href="/healthcare">
                                    Healthcare
                                  </Link>
                                </li>
                                <li>
                                  <Link rel="canonical" href="/educations">
                                    Educations
                                  </Link>
                                </li>
                                <li>
                                  <Link rel="canonical" href="/info-tech">
                                    Info-Tech
                                  </Link>
                                </li>
                                <li>
                                  <Link rel="canonical" href="/government">
                                    Government
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-6">
                              <ul className="">
                                <li>
                                  <Link rel="canonical" href="/retail">
                                    Retail
                                  </Link>
                                </li>
                                <li>
                                  <Link rel="canonical" href="/finance">
                                    Finance
                                  </Link>
                                </li>
                                <li>
                                  <Link rel="canonical" href="/marketing">
                                    Marketing
                                  </Link>
                                </li>
                                <li>
                                  <Link rel="canonical" href="/insurance">
                                    Insurance
                                  </Link>
                                </li>
                                {/* <li>
                                  <Link
                                    href="/"
                                  >
                                    Insurance
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/"
                                  >
                                    ISP and Telecoms
                                  </Link>
                                </li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="row mt-4">
                      <div className="col-lg-4">
                          <span className="d-flex gap-2 align-items-center mb-3">
                            <span className="iconBorder">
                              <Image src="/assets/images/management.svg" alt="" />
                            </span>
                            <h5>By Management</h5>
                          </span>
                          <ul className="listMargin mta">
                            <li>
                              <Link
                                href="/"
                              >
                                Information Security
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/"
                              >
                                Email Marketing
                              </Link>
                            </li>
                          </ul>
                      </div>
                      <div className="col-lg-8">
                            <span className="d-flex gap-2 align-items-center mb-3">
                              <span className="iconBorder">
                                <Image src="/assets/images/partnership.svg" alt="" />
                              </span>
                              <h5>By Partnership</h5>
                            </span>
                            <ul className="listMargin mta">
                              <li>
                                <Link
                                  href="/"
                                >
                                  ReferralProgram
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/"
                                >
                                  MSP/MSSP Program
                                </Link>
                              </li>
                            </ul>
                      </div>
                    </div> */}
                    </div>
                  </li>

                  {/* <li className="nav-item">
                  <Link href="/solutions" className="me-3 nav-link">
                      Resources
                  </Link>
                </li> */}

                  <li className="nav-item">
                    <Link
                      rel="canonical"
                      className="nav-link"
                      href="/contact-us"
                    >
                      Contact us
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      rel="canonical"
                      href="/login"
                      className="me-3 nav-link"
                    >
                      Sign In
                    </Link>
                  </li>

                  <li>
                    <Link
                      rel="canonical"
                      href="/signup"
                      className="btn main-button-dark signUp"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
          </ul>
        </div>
      </Suspense>
    </>
  );
};
export default NavbarToggler;

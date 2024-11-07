"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import FooterResources from "./FooterResources";
import Image from "next/image";
import { _IMG } from "@/constants/images";

const FooterContent = (url: any) => {
  const router = useRouter();
  const [follow, setFollow] = useState(true);
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (href && href.startsWith("mailto:")) {
      event.preventDefault();
      window.location.href = href;
      router.push("/");
    } else {
      router.push(href || window.location.href);
    }
  };
  const handleLink = () => {
    router.push(window.location.href);
  };
  useEffect(() => {
    if (url.url == "home") {
      setFollow(false);
    }
  }, []);

  return (
    <>
      <Box>
        <div className="footer wow fadeIn">
          <div className="container-fluid">
            <div className="footer-outer">
              <div className="row">
                <div className="col">
                  <a href="/">
                    <Image
layout="intrinsic"
                      src={_IMG.logo_final_blue}
                      alt="YOUR DMARC Logo"
                      style={{ width: "130px" }}
                      className="footerLogo"
                      loading="lazy"
                    />
                  </a>
                  <p>
                    With YOUR DMARC, boosting email campaign deliverability,
                    safeguarding brand identity, and fortifying business
                    reputation is a breeze.
                  </p>
                </div>

                <Suspense>
                  <FooterResources />
                </Suspense>

                <div className="col">
                  <div className="footer-content resource">
                    <h5>Solutions</h5>

                    <div className="outerLinks">
                      <ul>
                        <li>
                          <a href="/startup">Startup</a>
                        </li>
                        {/* <li>
                          <a href="/nonprofits">
                            Small/Mid Business
                          </a>
                        </li> */}
                        <li>
                          <a href="/enterprise">Enterprise</a>
                        </li>
                        <li>
                          <a href="/nonprofits">Non Profit</a>
                        </li>

                        <li>
                          <a href="/healthcare">Health Care</a>
                        </li>
                        <li>
                          <a href="/educations">Education</a>
                        </li>
                        <li>
                          <a href="/info-tech">Infotech</a>
                        </li>
                        <li>
                          <a href="/government">Government</a>
                        </li>
                        <li>
                          <a href="/retail">Retail</a>
                        </li>
                        <li>
                          <a href="/finance">Finance</a>
                        </li>
                        <li>
                          <a href="/marketing">Marketing</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="footer-content resource">
                    <h5>Quick Links</h5>
                    <div className="outerLinks">
                      <ul>
                        <li>
                          <a
                            target="_blank"
                            rel={follow == true ? "nofollow" : "dofollow"}
                            href="https://www.wedmarc.com"
                            onClick={() => {
                              router.push("/");
                            }}
                          >
                            Manage Services
                          </a>
                        </li>

                        <li>
                          <a
                            target="_blank"
                            href="https://www.yourdmarc.com/blogs"
                            onClick={() => {
                              router.push("/");
                            }}
                          >
                            Blogs
                          </a>
                        </li>
                        {/* <li>
                        <a href="/pricing">Pricing</a>
                      </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <div className="col">
                <div className="footer-content">
                  <h5>Management</h5>
                  <ul>
                    <li>
                      <a target="_blank" href="https://www.wedmarc.com">
                            Referral Program
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="https://www.wedmarc.com">
                        MSP/MSSP Program
                      </a>
                    </li>https://www.yourdmarc.com/privacy-policy4
                  </ul>
                  <h5>Partnership</h5>
                  <ul>
                    <li>
                      <a target="_blank" href="https://www.wedmarc.com">
                      Information Security
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="https://www.wedmarc.com">
                      Email Marketing
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
                <div className="col">
                  <div className="footer-content">
                    <h5>Get in Touch</h5>
                    <div className="contact">
                      <a
                        href="https://www.facebook.com/yourDMARC/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLink}
                      >
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/yourdmarc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLink}
                      >
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a
                        href="https://www.youtube.com/@yourDMARC"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLink}
                      >
                        <i className="fa-brands fa-youtube"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/your.dmarc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLink}
                      >
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a
                        href="mailto:contact@yourdmarc.com"
                        onClick={handleLinkClick}
                      >
                        <i className="fa-solid fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row"></div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="row">
              <div className="col-lg-6">
                <div className="copyright">
                  <p>©Copyright 2024 - yourdmarc.com</p>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="links">
                  <Link rel="canonical" href="/privacy-policy">
                    Privacy Policy
                  </Link>
                  <Link rel="canonical" href="/terms-condition">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollToTopButton />
      </Box>
    </>
  );
};
export default FooterContent;

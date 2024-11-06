"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import DnsIcon from "@mui/icons-material/Dns";
import MailLockIcon from "@mui/icons-material/MailLock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";

const Navbar = () => {
  let router = useRouter();
  return (
    <nav className="bg-[#fff] shadow-[0_0_24px_rgba(0,0,0,0.1)] py-[20px]">
      <div className="2xl:container xl:container lg:container md:container sm:container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative d-flex items-center justify-between h-16">
          <div
            className="flex-shrink-0 h-[90px]"
            onClick={() => {
              router.push("/blogs");
            }}
          >
            <Link className="navbar-brand navbarLogo" href="/blogs">
              <img
                src="/assets/images/logo-final-blue.svg"
                alt="logo"
                width="auto"
                height="auto"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-label="Main menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex sm:ml-6">
            <div className="d-flex space-x-4">
              <div className="relative">
                <button
                  className="text-[#000] hover:text-[#eb5454] text-[16px] px-[10px] py-[9px] transition ease-in-out"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Home
                </button>
              </div>

              <div className="relative">
                <button
                  className="text-[#000] hover:text-[#eb5454] text-[16px] px-[10px] py-[9px]"
                  onClick={(e) => {
                    e.preventDefault();
                    const toolsSubmenu =
                      document.getElementById("tools-submenu");
                    const solutionSubmenu =
                      document.getElementById("solution-submenu");

                    if (toolsSubmenu.classList.contains("hidden")) {
                      solutionSubmenu.classList.add("hidden");
                    }
                    toolsSubmenu.classList.toggle("hidden");
                  }}
                >
                  Tools
                  <span>
                    <i className="fa-solid fa-caret-down ms-2"></i>
                  </span>
                </button>
                <div
                  id="tools-submenu"
                  className="absolute left-[-70px] mt-2 2xl:w-[730px] bg-[#fff] rounded-md shadow-lg border-2 border-solid border-[#dee2e6] z-10 hidden transition ease-in-out"
                >
                  <div className="py-[20px] px-[20px]">
                    <div className="grid grid-cols-2">
                      <div className="py-[10px] px-[10px]">
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            <DnsIcon className="text-[#eb5454]" />
                          </span>
                          <h3 className="text-[17px] text-[#0f2138]">
                            DNS Lookups
                          </h3>
                        </span>
                        <div className="grid grid-cols-2">
                          <ul className="pl-[15px]">
                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/tools/dns-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454", borderColor: "transparent" }}></div> */}
                                DNS Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/tools/a-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454] ml-[5px]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                DNS A Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/tools/aaaa-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                DNS AAAA Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/tools/mx-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                MX Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/tools/cname-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                CNAME Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}tools/txt-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                TXT Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/tools/dnskey-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                DNSKEY Lookups
                              </a>
                            </li>
                          </ul>
                          <ul className="pl-[15px]">
                            <li className="mb-[5px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}tools/ptr-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                PTR Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/tools/ns-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                NS Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}tools/soa-lookup`}
                                className="relative px-2 text-[15px] text-[#333]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                SOA Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/tools/srv-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                SRV Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/tools/caa-lookup`}
                                className="relative px-2 text-[15px] text-[#333]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                CAA Lookups
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/tools/ds-lookup`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                DS Lookups
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="py-[10px] px-[10px]">
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            <AdminPanelSettingsIcon className="text-[#eb5454]" />
                          </span>
                          <h3 className="text-[17px] text-[#0f2138]">
                            DMARC Lookups
                          </h3>
                        </span>
                        {/* <div className='grid grid-cols-1'> */}
                        <ul className="pl-[15px]">
                          <li className="mb-[15px] relative customArrow w-full">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/spf-lookup`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              SPF Record Checker
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow w-full">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/spf-generator`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              SPF Record Generator
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow w-full">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/spf-checker`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              SPF Raw Checker
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow w-full">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/dmarc-lookup`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              DMARC Record Checker
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow w-full">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/dmarc-generator`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              DMARC Record Generator
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow w-full">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/dkim-lookup`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              DKIM Record Checker
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow w-full">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/dkim-generator`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              DKIM Record Generator
                            </a>
                          </li>
                        </ul>
                        <ul className="pl-[15px]">
                          <li className="mb-[15px] relative customArrow w-full">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/bimi-lookup`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              BIMI Record Checker
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow w-full">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/bimi-generator`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              BIMI Record Generator
                            </a>
                          </li>
                        </ul>
                        {/* </div> */}
                      </div>

                      <div className="py-[10px] px-[10px]">
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            <MailLockIcon className="text-[#eb5454]" />
                          </span>
                          <h3 className="text-[17px] text-[#0f2138]">
                            MTA TLS Lookups
                          </h3>
                        </span>
                        <ul className="pl-[15px]">
                          <li className="mb-[15px] relative customArrow">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/mta-sts-lookup`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              MTA STS Record Checker
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/mta-sts-generator`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              MTA STS Record Generator
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/tls-rpt-lookup`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              TLS RPT Record Checker
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/tls-rpt-generator`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              TLS RPT Record Generator
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="py-[10px] px-[10px]">
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            <UnsubscribeIcon className="text-[#eb5454]" />
                          </span>
                          <h3 className="text-[17px] text-[#0f2138]">
                            Blacklisting
                          </h3>
                        </span>
                        <ul className="pl-[15px]">
                          <li className="mb-[15px] relative customArrow">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/blacklist-domain-lookup`}
                              className="relative text-[15px] px-2 text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              Blacklist IP Checker
                            </a>
                          </li>

                          <li className="mb-[5px] relative customArrow">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/tools/blacklist-domain-lookup`}
                              className="relative text-[15px] px-2 text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              Blacklist Domain Checker
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <button
                  className="text-[#000] hover:text-[#eb5454] text-[16px] py-[9px] px-[10px] transition ease-in-out"
                  onClick={(e) => {
                    e.preventDefault();
                    // Toggle the submenu visibility
                    const solutionSubmenu =
                      document.getElementById("solution-submenu");
                    const toolsSubmenu =
                      document.getElementById("tools-submenu");

                    if (solutionSubmenu.classList.contains("hidden")) {
                      toolsSubmenu.classList.add("hidden"); // Hide Tools submenu
                    }
                    solutionSubmenu.classList.toggle("hidden"); // Toggle Solutions submenu
                  }}
                >
                  Solutions
                  <span>
                    <i className="fa-solid fa-caret-down ms-2"></i>
                  </span>
                </button>
                <div
                  id="solution-submenu"
                  className="absolute left-[-70px] mt-2 w-[550px] bg-[#fff] rounded-md shadow-lg border-2 border-solid border-[#dee2e6] z-10 hidden transition ease-in-out"
                >
                  {/* Submenu items for Home */}
                  <div className="py-1">
                    {/* {[...Array(20)].map((_, index) => (
                      <a key={index} href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                        Home {index + 1}
                      </a>
                    ))} */}
                    <div className="grid grid-cols-2">
                      <div className="py-[20px] px-[20px]">
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            {/* <DnsIcon className='text-[#eb5454]'/> */}
                            <img
                              src="/assets/images/business.svg"
                              alt=""
                              loading="lazy"
                            />
                          </span>
                          <h3 className="text-[17px] text-[#0f2138]">
                            By Business
                          </h3>
                        </span>
                        {/* <h3 className='text-[17px] text-[#0f2138] mb-[8px]'>By Business</h3> */}

                        <ul className="pl-[15px]">
                          <li className="mb-[15px] relative customArrow">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/startup`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              Startups
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/solution`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              Solution for SMBs
                            </a>
                          </li>

                          <li className="mb-[15px] relative customArrow">
                            <a
                              href={`${process.env.NEXT_PUBLIC_URL}/enterprise`}
                              className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                            >
                              {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                              DMARC Enterprise
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="py-[20px] px-[20px]">
                        <span className="d-flex gap-2 align-items-center mb-3">
                          <span className="iconBorder">
                            {/* <DnsIcon className='text-[#eb5454]'/> */}
                            <img
                              src="/assets/images/industry.svg"
                              alt=""
                              loading="lazy"
                            />
                          </span>
                          <h3 className="text-[17px] text-[#0f2138]">
                            By Industries
                          </h3>
                        </span>
                        {/* <h3 className='text-[17px] text-[#0f2138] mb-[8px]'>By Industries</h3> */}

                        <div className="grid grid-cols-2">
                          <ul className="pl-[15px]">
                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/nonprofits`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                Non-Profit
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/healthcare`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                Healthcare
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/educations`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                Educations
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/info-tech`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                Info-Tech
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/government`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                Government
                              </a>
                            </li>
                          </ul>

                          <ul className="pl-[15px]">
                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/retail`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                Retail
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/finance`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                Finance
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/marketing`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                Marketing
                              </a>
                            </li>

                            <li className="mb-[15px] relative customArrow">
                              <a
                                href={`${process.env.NEXT_PUBLIC_URL}/insurance`}
                                className="relative px-2 text-[15px] text-[#333] hover:text-[#eb5454]"
                              >
                                {/* <div class="absolute left-0 top-[14px] w-0 h-0 border-t-4 border-r-8 border-b-4 border-transparent border-secondary rotate-180 top-[4px] left-[-12px]" style={{ borderRightColor: "#EB5454" }}></div> */}
                                Insurance
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <button
                  className="text-[#000] hover:text-[#eb5454] text-[16px] py-[9px] px-[10px] transition ease-in-out"
                  onClick={() =>
                    (window.location.href = `${process.env.NEXT_PUBLIC_URL}/contact-us`)
                  }
                >
                  Contact Us
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 hidden">
                  {/* Submenu items for About */}
                  <div className="py-1">
                    <a
                      href={`${process.env.NEXT_PUBLIC_URL}startup`}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      About Page
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <button
                  className="text-[#000] hover:text-[#eb5454] text-[16px] py-[9px] px-[10px]"
                  onClick={() =>
                    (window.location.href = `${process.env.NEXT_PUBLIC_URL}/login`)
                  }
                  // onClick={(e) => e.preventDefault()}
                >
                  Sign In
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() =>
                    (window.location.href = `${process.env.NEXT_PUBLIC_URL}/signup`)
                  }
                  className="bg-[#EB5454] text-[#fff] text-[16px] py-[9px] px-[30px] rounded-[8px] border-1 border-solid border-[#f00] transition ease-in-out"
                  // onClick={(e) => e.preventDefault()}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

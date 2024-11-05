"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import ScannerSection from "@/app/pageComponents/Others/ScannerSection";
import ToolsTabs from "@/app/pageComponents/Tools/ToolsTabs";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import ModalEbook from "../components/Modal/downloadEbook";
import SubscribeNewsLetter from "@/app/pageComponents/Others/Subscribe";
import CalendlyBadge from "@/externalLibraries/CalendlyBadge";
import Head from "next/head";
import HeaderNavigation from "@/components/Layout/Header/HeaderNavigation";
import FooterContent from "@/components/Layout/Footer/FooterContent";

const metadata: Metadata = {
  title: {
    template: "yourDMARC | Secure Email with DMARC, SPF & DKIM Tools",
    default: "yourDMARC | Secure Email with DMARC, SPF & DKIM Tools",
  },
  description:
    "Your DMARC is a web-based platform offering tools to improve email compliance, protect domains, and enhance brand reputation",
};

export default function HomePage() {
  let router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal open/close
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const head = document.querySelector("head");
    const cssLink = document.createElement("link");
    cssLink.href = "https://assets.calendly.com/assets/external/widget.css";
    cssLink.rel = "stylesheet";
    head?.appendChild(cssLink);
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: "https://calendly.com/hello-dmarc/your-dmarc-demo",
          text: "Schedule time with me",
          color: "#0069ff",
          textColor: "#ffffff",
          branding: undefined,
        });
      }
    };
    head?.appendChild(script);
    return () => {
      head?.removeChild(cssLink);
      head?.removeChild(script);
    };
  }, []);
  const scriptNewData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yourdmarc.com/",
      },
    ],
  };
  const scriptNewData_1 = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "yourDMARC",
    image: "https://www.yourdmarc.com/assets/images/logo-final-blue.svg",
    "@id": "",
    url: "https://www.yourdmarc.com/",
    telephone: "073474 47407",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "24-3400 Boul Losch St-Hubert, QC J3Y 5T6, Montréal, Canada.",
      addressLocality: "Montréal",
      addressRegion: "QC",
      postalCode: "J3Y 5T6",
      addressCountry: "CA",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://www.facebook.com/yourDMARC/",
      "https://www.instagram.com/your.dmarc/",
      "https://www.youtube.com/@yourDMARC",
      "https://www.linkedin.com/company/yourdmarc/",
    ],
  };
  const [email, setEmail] = useState("");
  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Email submitted to:", email);
  };
  return (
    <>
      <Head>
        <meta name="robots" content="index, nofollow" />
      </Head>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData) }}
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData_1) }}
      />
      <div className="header animate__fadeInUp">
        <HeaderNavigation />
        <div className="hero-section mainBanner pb-5" id="scanSection">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="mainBanner__Content ">
                  <h3 className="mt-5">
                    ELIMINATE EMAIL FRAUD AND STRENGTHEN YOUR BRAND TRUST
                  </h3>
                  <img
                    className="vector1"
                    src="/assets/images/Vector-1.png"
                    alt="design of a mail envelope"
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                  <img
                    className="vector2"
                    src="/assets/images/Vector-2.png"
                    alt="design of a mail envelope"
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                  <img
                    className="vector3"
                    src="/assets/images/Vector-3.png"
                    alt="design of a mail envelope"
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                  <img
                    className="vector4"
                    src="/assets/images/Vector-4.png"
                    alt="design of a mail envelope"
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                  <img
                    className="vector5"
                    src="/assets/images/Vector-5.png"
                    alt="design of a mail envelope"
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                  <img
                    className="vector6"
                    src="/assets/images/Vector-6.png"
                    alt="design of a mail envelope"
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                  <p className="mb-3">
                    Email fraud often occurs due to a flaw that lets criminals
                    spoof sender addresses. YOUR DMARC addresses this with
                    DMARC, helping protect your brand&apos;s reputation and
                    ensure trustworthiness. <strong>Best DMARC service </strong>
                    for <strong>email authentication SPF DKIM DMARC </strong>
                    compliance.
                  </p>
                  <a
                    className="btn whiteBtn"
                    href="/signup"
                    title="Get Started"
                  >
                    Get Started
                  </a>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="mainBanner__Img">
                  <img
                    src="/assets/images/headerImage2.svg"
                    alt=" A man examines a graph while a woman sits with a laptop nearby."
                    className="img-fluid"
                    width="auto"
                    height="auto"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense>
        <ScannerSection />
        <ToolsTabs />
      </Suspense>
      <div className="compliancebook">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 margin discoverContent">
              <div className="homeEbook">
                <h4>Discover Our Free Email Compliance eBook</h4>
                <p>
                  Get essential insights into DMARC protocols and best practices
                  for securing your email infrastructure with our easy-to-read
                  guide. This eBook breaks down DMARC protocols, industry best
                  practices, and tips for building a strong email security
                  foundation. Take control of your inbox and prevent security
                  issues effectively. Download your free copy today!
                </p>
                <button
                  title="Download EBook"
                  className="btn"
                  onClick={handleModalOpen}
                >
                  Download Ebook
                </button>
                <p className="mt-3">
                  Subscribe to our notification service for alerts on new eBook
                  releases. Plus, you&apos;ll get industry updates delivered
                  straight to your inbox, ensuring you&apos;re always ahead of
                  the curve. Sign up today and keep your email knowledge arsenal
                  fully stocked!
                </p>
                <div className="w-100">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group gap-3">
                      <input
                        type="text"
                        className="form-control rounded-end"
                        placeholder="Enter your email address"
                        name="domain"
                        value={email}
                        onChange={handleChange}
                      />
                      <button
                        className="btn main-button-dark m-0 ml-2"
                        type="submit"
                        title="Subscribe Email"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 discoverImage">
              <div>
                <img
                  src="/assets/images/magzineImg.webp"
                  alt="Your DMARC EBook"
                  className="img-fluid"
                  title="EBook"
                  loading="eager"
                  fetchPriority="high"
                  width="auto"
                  height="auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="advantageSection">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 margin">
              <div className="advantageSection__Img">
                <img
                  src="/assets/images/reportingImage2.webp"
                  width="auto"
                  height="auto"
                  alt="A man and woman stand by a panel, discussing. The woman holds a laptop. Nearby, a plant, speech bubble, chart, clock, and gears are visible."
                  title="DMARC Reporters"
                  loading="lazy"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="advantageSection__Content ps-5">
                <h3>Take Advantage of Our Smart DMARC Reporting</h3>
                <p>
                  <strong>Understanding DMARC reports</strong> are essential for
                  achieving DMARC compliance, and making the most of them should
                  be a priority. The effectiveness of your DMARC reporting
                  largely depends on the solution you choose.
                </p>
                <p>
                  YOUR DMARC offers advanced reporting tools that provide a
                  comprehensive view of your email domain infrastructure. Our
                  platform lets you explore specific source configurations and
                  understand your domain&apos;s security and deliverability all
                  in one place.
                </p>
                <p>
                  Our smart DMARC report analysis simplifies interpreting your
                  reports with clear, concise summaries of your email
                  domain&apos;s performance.
                </p>
                <p>
                  Enhance your email security with YOUR DMARC&apos;s intelligent
                  DMARC reporting service.
                </p>
                <Link
                  href="/signup"
                  className="btn"
                  title="Start DMARC Reporting"
                >
                  Start YOUR DMARC Reporting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chargeSection">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="chargeSectionInner">
                <div className="row">
                  <div className="col-xl-8">
                    <h3>Take Charge</h3>
                    <p>
                      Verify and authorize legitimate sources to send emails on
                      your behalf. Use observation mode to monitor and adjust
                      before enforcing your policy. Instruct ISPs to discard or
                      filter emails that fail the
                      <strong>SPF DKIM DMARC check.</strong>
                    </p>
                  </div>
                  <div className="col-xl-4 text-end">
                    <a
                      href="/signup"
                      className="btn whiteBtn"
                      title="Get Started"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="commandSection">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="innerSection">
                    <span className="imageBorder">
                      <img
                        src="/assets/images/domainPro.svg"
                        alt="a red lock icon"
                        width="auto"
                        height="auto"
                        loading="lazy"
                      />
                    </span>
                    <h5>Domain Protection</h5>
                    <p>
                      Prevent email-based fraud by blocking spoofed emails from
                      reaching recipients.
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="innerSection">
                    <span className="imageBorder">
                      <img
                        src="/assets/images/emailArrival.svg"
                        alt="a secure mail icon"
                        width="auto"
                        height="auto"
                        loading="lazy"
                      />
                    </span>
                    <h5>Email Arrival</h5>
                    <p>Enhance deliverability rates for legitimate emails.</p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="innerSection">
                    <span className="imageBorder">
                      <img
                        src="/assets/images/brandIntegrity.svg"
                        alt="a red flag icon"
                        width="auto"
                        height="auto"
                        loading="lazy"
                      />
                    </span>
                    <h5>Brand Integrity Safeguard</h5>
                    <p>
                      Stop unauthorized parties from misusing your email domain.
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="innerSection">
                    <span className="imageBorder">
                      <img
                        src="/assets/images/infiniteSpf.svg"
                        alt="Keyboard icon"
                        width="auto"
                        height="auto"
                        loading="lazy"
                      />
                    </span>
                    <h5>Infinite SPF</h5>
                    <p>
                      Optimize your SPF record by using macros to hide sending
                      sources and overcome the 10-record limit.
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="innerSection">
                    <span className="imageBorder">
                      <img
                        src="/assets/images/setup.svg"
                        alt="Guided setup illustration for managing DMARC, DKIM, and SPF policies"
                        width="auto"
                        height="auto"
                        loading="lazy"
                      />
                    </span>
                    <h5>Guided Setup</h5>
                    <p>
                      Easily manage DMARC, DKIM, and SPF policies from a
                      user-friendly console—no DNS expertise needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="seizeContent">
                <h3>Seize Control of Your Email Reputation</h3>
                <p>
                  DMARC is an email authentication protocol that helps protect
                  your domain from unauthorized use, such as email spoofing.
                  YOUR DMARC simplifies the DMARC setup process, offering
                  instant insights into email flows for better domain control.
                </p>
                <img
                  title="YOUR DMARC"
                  src="/assets/images/compliantSources.webp"
                  width="auto"
                  height="auto"
                  alt="A table titled 'Top 5 Compliant Sources'"
                  loading="lazy"
                  className="w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="threatProtectSection">
        <div className="container">
          <h3 className="text-center">
            Against What Types of Threats Does DMARC Provide Protection?
          </h3>
          <p className="mb-4">
            DMARC (Domain-based Message Authentication, Reporting & Conformance)
            helps secure your email system by ensuring that your messages are
            protected by SPF (Sender Policy Framework) and/or DKIM (DomainKeys
            Identified Mail). It also provides instructions for handling emails
            that fail these authentication checks, such as marking them as spam
            or rejecting them.
          </p>

          <p>
            Without DMARC, malicious actors can exploit your domain by sending
            emails that appear to come from you, but actually originate from
            them. They do this by manipulating the &quot;From&quot; address in
            the email header, which can mislead recipients and potentially steal
            personally identifiable information.
          </p>
        </div>
      </div>
      <div className="visibiltySection">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 imageSection">
              <img
                src="/assets/images/dmarCFailures.svg"
                alt="Screenshot of DMARC failures"
                title="YOUR DMARC Get Visibility"
                width="auto"
                height="auto"
                loading="lazy"
              />
            </div>
            <div className="col-xl-6 col-lg-6 contentSection">
              <div className="contentInner">
                <h4>Get Visibility</h4>
                <p>
                  Gain insight into the sources and email flows of messages sent
                  from your domain. Identify legitimate senders, such as email
                  marketing, CRM, and support services, while uncovering any
                  unauthorized use of your brand.
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-xl-6 col-lg-6 contentSection order">
              <div>
                <h4>Increase Security</h4>
                <p>
                  Protect your business partners, employees, and customers from
                  fraudulent emails by preventing cybercriminals from spoofing
                  or impersonating your sending domains. Use YOUR DMARC&apos;s
                  hosted SPF with macros to hide your sending sources and
                  minimize your attack surface.
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 imageSection">
              <div className="contentInner2">
                <img
                  src="/assets/images/maps.webp"
                  alt="Screenshot of two graphs. Bar graph, line graph."
                  title="YOUR DMARC Increase Security"
                  width="auto"
                  height="auto"
                  loading="lazy"
                  className="w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="magzineSection">
        <div className="magzineHeader">
          <h2>
            Featured In <span>Cyber Defense Magazine</span>
          </h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="magzineSection__Content top">
                <p>
                  We are thrilled to announce that our blog has been published
                  in <strong>Cyber Defense Magazine</strong>, a leading
                  publication in our industry. Cyber Defense Magazine, is
                  <span>
                    {" "}
                    the world&lsquo;s premier source for IT Security
                    information, providing expert insights and comprehensive
                    coverage of the latest cybersecurity trends and threats.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4">
              <div className="magzineSection__Img">
                <img
                  src="assets/images/magazineImg1.webp"
                  alt="Cyber Defence Magazine"
                  width="auto"
                  height="auto"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="magzineSection__Img">
                <img
                  src="assets/images/magazineImg2.webp"
                  alt="Cyber Defence Magazine"
                  width="auto"
                  height="auto"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="magzineSection__Img">
                <img
                  src="assets/images/magazineImg3.webp"
                  alt="Cyber Defence Magazine"
                  width="auto"
                  height="auto"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="magzineSection__Content text-center">
                <p>
                  Featured in this renowned magazine is our blog titled,
                  <strong>
                    &ldquo;GDPR & CCPA: A CIO&lsquo;s Essential Guide to Email
                    Compliance&ldquo;
                  </strong>
                </p>
                <a
                  onClick={() => router.push("/")}
                  className="btn"
                  href="https://www.cyberdefensemagazine.com/newsletters/july-2024/files/downloads/CDM-CYBER-DEFENSE-eMAGAZINE-July-2024.pdf"
                  target="_blank"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cyberdefence home">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="startupfeatures" title="Schedule a Demo">
                <span className="imageBorder">
                  <img
                    src="/assets/images/demo.svg"
                    alt="Demo scheduling icon"
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                </span>
                <h5>Schedule a Demo</h5>
                <p>
                  Learn more about YOUR DMARC by booking a demo with our sales
                  representatives.
                </p>
                <CalendlyBadge />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="startupfeatures" title="Domain Analysis">
                <span className="imageBorder">
                  <img
                    src="/assets/images/iconDomain.svg"
                    alt="Web icon"
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                </span>
                <h5>Domain Analysis</h5>
                <p>
                  Verify if your email server is correctly configured to block
                  Business Email Compromise (BEC) and other common threats using
                  our <strong>DMARC email security</strong> tools.
                </p>
                <button
                  className="btn"
                  onClick={() => router.push("/#scanSection")}
                >
                  Scan Domain
                </button>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="startupfeatures" title="Get in Touch">
                <span className="imageBorder">
                  <img
                    src="/assets/images/contact2.svg"
                    alt="Contact icon"
                    width="auto"
                    height="auto"
                    loading="lazy"
                  />
                </span>
                <h5>Get in Touch</h5>
                <p>
                  Contact YOUR DMARC email security experts via phone or email
                  for personalized assistance.
                </p>
                <button
                  className="btn"
                  onClick={() => router.push("/contact-us")}
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubscribeNewsLetter />
      <ModalEbook
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleClose={handleModalClose}
      />
      <FooterContent url="home" />
    </>
  );
}

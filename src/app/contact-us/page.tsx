import dynamic from "next/dynamic";
import React from "react";
import { Box } from "@mui/material";
import Head from "next/head";

const ContactUsContent = dynamic(
  () => import("../pageComponents/Others/ContactUsContent"),
  { ssr: false }
);
const FooterContent = dynamic(
  () => import("@/components/Layout/Footer/FooterContent"),
  { ssr: false }
);
const HeaderNew = dynamic(
  () => import("@/components/Layout/Header/HeaderNew"),
  {
    ssr: false,
  }
);

const ContactUs = () => {
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact-us",
        item: "https://yourdmarc.com/contact-us",
      },
    ],
  };
  const scriptNewData_2 = {
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

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData_2) }}
        />
      </Head>

      <Box>
        <HeaderNew />
        <ContactUsContent />
        <FooterContent />
      </Box>
    </>
  );
};

export default ContactUs;

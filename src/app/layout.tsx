import "@/app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { baselightTheme } from "@/theme/DefaultColors";
import React, { Suspense } from "react";
import { NextAuthSessionProvider } from "@/lib/NextAuthSessionProvider";
import { ToastifyContainer } from "@/components/ToastifyContainer";
import PageAnimatePresence from "@/theme/Animate/PageAnimatePresence";
import { _ENV_VARIABLES } from "@/constants/envVariables";

const ProgressBar = dynamic(() => import("@/components/ProgressBar"), {
  suspense: true,
  ssr: false,
});

const NEXT_PUBLIC_URL = _ENV_VARIABLES.NEXT_PUBLIC_URL;
export const metadata: Metadata = {
  title: {
    default: "yourDMARC | Secure Email with DMARC, SPF & DKIM Tools",
    template: "%s | YourDMARC",
  },
  description:
    "Your DMARC is a web-based platform offering tools to improve email compliance, protect domains, and enhance brand reputation",
  icons: {
    icon: { url: "/assets/images/roundedfav2.png" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/images/magzineImg.svg"
          as="image"
        ></link>
        <meta name="robots" content="index, follow"></meta>
        <meta
          property="og:title"
          content="YOUR DMARC: Strengthen Email Security and Protect Your Brand"
        />
        <meta property="og:site_name" content="YourDMARC" />
        <meta property="og:url" content={NEXT_PUBLIC_URL} />
        <meta
          property="og:description"
          content="Eliminate email fraud and safeguard your brand with YOUR DMARC. Our advanced DMARC, SPF, and DKIM tools provide comprehensive email authentication, protect your domain from spoofing, and enhance email deliverability. Get smart reporting, guided setups, and stay ahead of email threats with our all-in-one solution for businesses of all sizes. Strengthen your brand trust and reputation today."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${NEXT_PUBLIC_URL}/assets/images/logo-final-blue.svg`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                        (function(w,d,s,l,i){
                            w[l]=w[l]||[];
                            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                            var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                            j.async=true;
                            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                            f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-WXLBX2DC');
                    `,
          }}
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NextAuthSessionProvider>
          <ThemeProvider theme={baselightTheme}>
            <PageAnimatePresence>
              <CssBaseline />
              <ProgressBar />
              <ToastifyContainer />
              {/* <Suspense fallback={<MainLoader />}>{children}</Suspense> */}
              {children}
            </PageAnimatePresence>
          </ThemeProvider>
        </NextAuthSessionProvider>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WXLBX2DC"
            height="0"
            width="0"
            // style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="https://js.hs-scripts.com/3333379.js"
        ></script>
        <script
          type="text/javascript"
          async
          defer
          src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        ></script>
      </body>

      <Script
        src="/assets/js/widget.min.js"
        strategy="lazyOnload"
        async
      ></Script>
      <Script
        src="/assets/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
        async
      ></Script>
      <Script src="/assets/js/wow.min.js" strategy="lazyOnload" async></Script>
    </html>
  );
}

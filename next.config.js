/ @type {import('next').NextConfig} */;
const isDev = process.env.NEXT_PUBLIC_CURRENT_ENV === "development";

/**************************************************   STAGING   *************************************************/

const NEXT_PUBLIC_CSP_HEADER_STAGING = `default-src 'self' https://demo.yourdmarc.com;
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.yourdomain.com https://js.stripe.com https://www.google.com https://*.js.hs-scripts.com https://cdnjs.cloudflare.com https://www.googletagmanager.com https://snap.licdn.com https://js.hs-scripts.com https://js.hscollectedforms.net https://js.usemessages.com https://js.hs-analytics.net https://js.hs-banner.com https://connect.facebook.net https://js.hsadspixel.net https://www.googleadservices.com https://assets.calendly.com https://vercel.live https://www.gstatic.com;
style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://assets.calendly.com;
img-src 'self' https: webpack: * data: blob:;
connect-src 'self' ws://127.0.0.1:37245/ ws://127.0.0.1:43113 https://t2.gstatic.com https://fr7hxbope2lxn7awuhhiexl4p40azovd.lambda-url.us-east-2.on.aws/ wss://demo.yourdmarc.com https://api.openai.com/v1/chat/completions  http://heesolution.ca/favicon.ico https://t2.gstatic.com https://api.hubspot.com/livechat-public https://vercel.live https://5aplol2la5kj5ajq54suqnmhti0jkfkk.lambda-url.us-east-2.on.aws https://5qp8odko88.execute-api.us-east-2.amazonaws.com https://www.googletagmanager.com https://www.google-analytics.com https://demo.yourdmarc.com https://*.yourdomain.com https://api.stripe.com https://px.ads.linkedin.com https://api.hubspot.com https://api.hubapi.com https://forms.hscollectedforms.net https://strapiblog.softuvo.click https://www.google.com;
font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
frame-src 'self' https://www.googletagmanager.com https://js.stripe.com https://td.doubleclick.net https://app.hubspot.com https://www.youtube.com https://www.facebook.com https://www.google.com;
object-src 'none';
frame-ancestors 'none';
upgrade-insecure-requests;`;

/**************************************************   END   **************************************************/

/**************************************************   Production   **************************************************/

const NEXT_PUBLIC_CSP_HEADER_PRODUCTION = `default-src 'self' https://pro.yourdmarc.com https://trusted.cdn.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.yourdomain.com https://www.google.com https://*.js.hs-scripts.com https://cdnjs.cloudflare.com https://js.stripe.com https://www.googletagmanager.com https://snap.licdn.com https://js.hs-scripts.com https://js.hscollectedforms.net https://js.usemessages.com https://js.hs-analytics.net https://js.hs-banner.com https://connect.facebook.net https://js.hsadspixel.net https://www.googleadservices.com https://assets.calendly.com https://vercel.live https://www.gstatic.com https://trustedscript.com;
    style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://assets.calendly.com https://trustedstyle.com;
    img-src 'self' webpack: * data: blob: https: https://trustedimages.com;
    connect-src 'self' https://v7671mohe3.execute-api.us-east-2.amazonaws.com/prod/dmarc-lookup https://pwsjeel7rjcpur4lxlpfzprjj40lpejn.lambda-url.us-east-2.on.aws/ https://pdylmnigrzd3mzbtc4ljw25ecy0rdfjx.lambda-url.us-east-2.on.aws/ https://v7671mohe3.execute-api.us-east-2.amazonaws.com/prod/tls-rpt-lookup https://v7671mohe3.execute-api.us-east-2.amazonaws.com/prod/mta-sts-lookup https://v7671mohe3.execute-api.us-east-2.amazonaws.com/prod/bimi-lookup https://v7671mohe3.execute-api.us-east-2.amazonaws.com/prod/spf-lookup https://v7671mohe3.execute-api.us-east-2.amazonaws.com https://api.stripe.com ws://127.0.0.1:37245/ wss://pro.yourdmarc.com https://vercel.live https://api.openai.com/v1/chat/completions https://www.googletagmanager.com https://www.google-analytics.com https://pro.yourdmarc.com https://*.yourdomain.com https://px.ads.linkedin.com https://api.hubspot.com https://api.hubapi.com https://forms.hscollectedforms.net https://strapiblog.softuvo.click https://www.google.com https://api.trusted.com;
    font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com https://trustedfonts.com;
    frame-src 'self' https://www.googletagmanager.com https://js.stripe.com https://td.doubleclick.net https://app.hubspot.com https://www.youtube.com https://www.facebook.com https://www.google.com https://trustedframes.com;
    object-src 'none';
    frame-ancestors 'none';
    upgrade-insecure-requests;`;

/**************************************************   END   **************************************************/

const csp = isDev
  ? NEXT_PUBLIC_CSP_HEADER_STAGING
  : NEXT_PUBLIC_CSP_HEADER_PRODUCTION;

const nextConfig = {
  reactStrictMode: !isDev,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  typescript: {
    // ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "20.64.146.90",
        port: "1337",
        pathname: "/uploads/",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/",
      },
      {
        protocol: "https",
        hostname: "strapiblog.softuvo.click",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // {
          //   key: "Content-Security-Policy",
          //   value: csp.replace(/\n/g, ""),
          // },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap.xml",
      },
    ];
  },
};

module.exports = nextConfig;
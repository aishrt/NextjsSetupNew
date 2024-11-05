import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import Head from "next/head";
import AnimatePage from "@/theme/Animate/AnimatePage";
import { ANIMATION_TYPE } from "@/constants/animationType";
import SourceLoginDashboardPage from "@/app/pageComponents/Auth/auth-credentials-login-form";

export const metadata: Metadata = {
  title: {
    template: "Your DMARC Login Portal: Secure Access Management",
    default: "Your DMARC Login Portal: Secure Access Management",
  },
  description:
    "Securely access your Your DMARC account with ease. Log in to manage email security and protect your organization against threats. Sign in now!",
};
const Login = () => {
  const scriptNewData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.yourdmarc.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Login",
        item: "https://www.yourdmarc.com/login",
      },
    ],
  };

  return (
    <>
      <AnimatePage name={ANIMATION_TYPE.animate}>
        <Head>
          <meta name="robots" content="index, follow" />
        </Head>

        <div className="login-outer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 imageArea">
                <span className="vec1">
                  <img
                    src="/assets/images/vec1.svg"
                    alt="White icon of an envelope with a shield"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vec2">
                  <img
                    src="/assets/images/vec2.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vec3">
                  <img
                    src="/assets/images/vec2.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vec4">
                  <img
                    src="/assets/images/vec2.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vec5">
                  <img
                    src="/assets/images/vec2.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vec6">
                  <img
                    src="/assets/images/vec2.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vec7">
                  <img
                    src="/assets/images/vec1.svg"
                    alt="White icon of an envelope with a shield"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vec8 lock">
                  <img
                    src="/assets/images/vec3.svg"
                    alt="White icon of an envelope with a shield"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vec9">
                  <img
                    src="/assets/images/vec1.svg"
                    alt="White icon of an envelope with a shield"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <div className="imageSection">
                  <Link href="/">
                    <img
                      src="/assets/images/logo-white-blue.svg"
                      alt="yourDMARC's logo in white"
                      className="loginImage pointer"
                      loading="lazy"
                      width="auto"
                      height="auto"
                    />
                  </Link>
                  <h2>Welcome to YOUR DMARC</h2>

                  <p>
                    Securely access your YOUR DMARC dashboard to manage and
                    enhance your email compliance. Enter your credentials below
                    to sign in and get started.
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 formArea">
                <span className="vecp1">
                  <img
                    src="/assets/images/vecp1.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vecp2">
                  <img
                    src="/assets/images/vecp1.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vecp3">
                  <img
                    src="/assets/images/vecp1.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vecp4">
                  <img
                    src="/assets/images/vecp1.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vecp5">
                  <img
                    src="/assets/images/vecp1.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vecp6">
                  <img
                    src="/assets/images/vecp1.svg"
                    alt="White envelope with a lock"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>
                <span className="vecp7">
                  <img
                    src="/assets/images/vecp2.svg"
                    alt="White icon of an envelope with a shield"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </span>

                <div className="logo">
                  <img
                    src="/assets/images/logo-blue.png"
                    alt="yourDMARC's logo in blue"
                    className="loginImage"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </div>

                <div className="formInner">
                  <h3>Sign In</h3>
                  <SourceLoginDashboardPage />
                </div>

                <p>
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign Up</Link> here
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatePage>
    </>
  );
};
export default Login;

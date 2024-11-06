import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import Head from "next/head";
import { AuthCredentialsSignupForm } from "@/app/pageComponents/Auth/auth-credentials-signup-form";

export const metadata: Metadata = {
  title: {
    template: "Sign Up for Your DMARC: Streamline Email Security Today",
    default: "Sign Up for Your DMARC: Streamline Email Security Today",
  },
  description:
    "Sign up with Your DMARC for robust emailz security solutions. Protect your infrastructure from threats with our comprehensive suite of tools. Join today!",
};
const SignUp = () => {
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
        name: "Signup",
        item: "https://www.yourdmarc.com/signup",
      },
    ],
  };

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptNewData) }}
      />

      <div className="login-outer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 imageArea">
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
                <Link href="/" style={{ cursor: "pointer" }}>
                  <img
                    src="/assets/images/logo-white-blue.svg"
                    alt="yourDMARC's logo in white"
                    className="loginImage"
                    loading="lazy"
                    width="auto"
                    height="auto"
                  />
                </Link>
                <h2>Join YOUR DMARC</h2>
                <p>
                  Get started with YOUR DMARC today! Sign up now to access
                  powerful tools and services to enhance your email compliance.
                  Simply fill out the form below to create your account and
                  start optimizing your email security.
                </p>
              </div>
            </div>

            <div className="col-xl-6 formArea">
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
              <div className="formInner">
                <h3>Sign Up</h3>
                <AuthCredentialsSignupForm />
                <p>
                  Already have an account? <Link href="/login">Sign In</Link>
                  here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;

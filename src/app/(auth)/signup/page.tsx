import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import Head from "next/head";
import { AuthCredentialsSignupForm } from "@/app/pageComponents/Auth/auth-credentials-signup-form";
import { _IMG } from "@/constants/images";
import Image from "next/image";

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
                <Image
layout="intrinsic"
                  src={_IMG.vec1}
                  alt="White icon of an envelope with a shield"
                  loading="lazy"
                />
              </span>
              <span className="vec2">
                <Image
layout="intrinsic"
                  src={_IMG.vec2}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vec3">
                <Image
layout="intrinsic"
                  src={_IMG.vec2}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vec4">
                <Image
layout="intrinsic"
                  src={_IMG.vec2}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vec5">
                <Image
layout="intrinsic"
                  src={_IMG.vec2}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vec6">
                <Image
layout="intrinsic"
                  src={_IMG.vec2}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vec7">
                <Image
layout="intrinsic"
                  src={_IMG.vec1}
                  alt="White icon of an envelope with a shield"
                  loading="lazy"
                />
              </span>
              <span className="vec8 lock">
                <Image
layout="intrinsic"
                  src={_IMG.vec3}
                  alt="White icon of an envelope with a shield"
                  loading="lazy"
                />
              </span>
              <span className="vec9">
                <Image
layout="intrinsic"
                  src={_IMG.vec1}
                  alt="White icon of an envelope with a shield"
                  loading="lazy"
                />
              </span>

              <div className="imageSection">
                <Link href="/" style={{ cursor: "pointer" }}>
                  <Image
layout="intrinsic"
                    src={_IMG.logo_white_blue}
                    alt="yourDMARC's logo in white"
                    className="loginImage"
                    loading="lazy"
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
                <Image
layout="intrinsic"
                  src={_IMG.vecp1}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vecp2">
                <Image
layout="intrinsic"
                  src={_IMG.vecp1}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vecp3">
                <Image
layout="intrinsic"
                  src={_IMG.vecp1}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vecp4">
                <Image
layout="intrinsic"
                  src={_IMG.vecp1}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vecp5">
                <Image
layout="intrinsic"
                  src={_IMG.vecp1}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vecp6">
                <Image
layout="intrinsic"
                  src={_IMG.vecp1}
                  alt="White envelope with a lock"
                  loading="lazy"
                />
              </span>
              <span className="vecp7">
                <Image
layout="intrinsic"
                  src={_IMG.vecp2}
                  alt="White icon of an envelope with a shield"
                  loading="lazy"
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

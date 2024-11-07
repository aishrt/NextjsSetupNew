import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import Head from "next/head";
import AnimatePage from "@/theme/Animate/AnimatePage";
import { ANIMATION_TYPE } from "@/constants/animationType";
import SourceLoginDashboardPage from "@/app/pageComponents/Auth/auth-credentials-login-form";
import Image from "next/image";
import { _IMG } from "@/constants/images";

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
                  <Link href="/">
                    <Image
layout="intrinsic"
                      src={_IMG.logo_white_blue}
                      alt="yourDMARC's logo in white"
                      className="loginImage pointer"
                      loading="lazy"
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

                <div className="logo">
                  <Image
layout="intrinsic"
                    src={_IMG.logo_blue}
                    alt="yourDMARC's logo in blue"
                    className="loginImage"
                    loading="lazy"
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

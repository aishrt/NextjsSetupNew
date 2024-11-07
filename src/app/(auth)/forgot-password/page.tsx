import React from "react";
import { Metadata } from "next";
import AuthForgotPassword from "@/app/pageComponents/Auth/auth-forgot-password";
import { _IMG } from "@/constants/images";
import Image from "next/image";
export const metadata: Metadata = {
  title: {
    template: "Your DMARC Password Recovery: Reset Your Account Access",
    default: "Your DMARC Password Recovery: Reset Your Account Access",
  },
  description:
    "Forgot Your DMARC Password? Easily Recover Account Access. Follow Simple Steps to Regain Control. Reset Your Password Now for Secure Access!",
};

const ForgotPassword = () => {
  return (
    <>
      <div className="login-outer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 imageArea">
              <span className="vec1">
                <Image
layout="intrinsic"
                  src={_IMG.vec1}
                  loading="lazy"
                  alt="White icon of an envelope with a shield"
                />
              </span>
              <span className="vec2">
                <Image
layout="intrinsic"
                  src={_IMG.vec2}
                  loading="lazy"
                  alt="White envelope with a lock"
                />
              </span>
              <span className="vec3">
                <Image
layout="intrinsic"
                  src={_IMG.vec2}
                  loading="lazy"
                  alt="White envelope with a lock"
                />
              </span>
              <span className="vec4">
                <Image
layout="intrinsic"
                  src={_IMG.vec2}
                  loading="lazy"
                  alt="White envelope with a lock"
                />
              </span>
              <span className="vec5">
                <Image
layout="intrinsic"
                  src={_IMG.vec2}
                  loading="lazy"
                  alt="White envelope with a lock"
                />
              </span>
              <span className="vec6">
                <Image
layout="intrinsic"
                  src={_IMG.vec2}
                  loading="lazy"
                  alt="White envelope with a lock"
                />
              </span>
              <span className="vec7">
                <Image
layout="intrinsic"
                  src={_IMG.vec1}
                  loading="lazy"
                  alt="White icon of an envelope with a shield"
                />
              </span>
              <span className="vec8 lock">
                <Image
layout="intrinsic"
                  src={_IMG.vec3}
                  loading="lazy"
                  alt="White icon of an envelope with a shield"
                />
              </span>
              <span className="vec9">
                <Image
layout="intrinsic"
                  src={_IMG.vec1}
                  loading="lazy"
                  alt="White icon of an envelope with a shield"
                />
              </span>

              <div className="imageSection">
                <a href="/">
                  <Image
layout="intrinsic"
                    alt=""
                    src={_IMG.black_shadow}
                    className="loginImage"
                    loading="lazy"
                  />
                </a>
                <h1 style={{ fontSize: "45px" }}>Retrieve Your Password?</h1>
                <p>
                  Enter your email address to receive a password reset link.
                  After submitting your email, check your inbox for
                  instructions. If you don&apos;t see the email, check your spam
                  or junk folder.
                </p>
                <p>
                  <i>
                    For security, choose a strong, unique password you haven’t
                    used before. If you don&apos;t receive the reset email or
                    need further assistance, contact our support team at
                    [support email] or [support phone number]
                  </i>
                </p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 formArea">
              <span className="vecp1">
                <Image
layout="intrinsic" src={_IMG.vecp1} alt="" loading="lazy" />
              </span>
              <span className="vecp2">
                <Image
layout="intrinsic" src={_IMG.vecp1} alt="" loading="lazy" />
              </span>
              <span className="vecp3">
                <Image
layout="intrinsic" src={_IMG.vecp1} alt="" loading="lazy" />
              </span>
              <span className="vecp4">
                <Image
layout="intrinsic" src={_IMG.vecp1} alt="" loading="lazy" />
              </span>
              <span className="vecp5">
                <Image
layout="intrinsic" src={_IMG.vecp1} alt="" loading="lazy" />
              </span>
              <span className="vecp6">
                <Image
layout="intrinsic" src={_IMG.vecp1} alt="" loading="lazy" />
              </span>
              <span className="vecp7">
                <Image
layout="intrinsic" src={_IMG.vecp2} alt="" loading="lazy" />
              </span>
              <div className="logo">
                <Image
layout="intrinsic"
                  src={_IMG.logo_blue}
                  alt=""
                  className="loginImage"
                  loading="lazy"
                />
              </div>

              <div className="formInner">
                <h3 className="forgotPassword">Forgot Password?</h3>
                <p className="topText">
                  Enter your email address to receive a password reset link.
                </p>
                <AuthForgotPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;

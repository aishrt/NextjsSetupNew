import React from "react";
import { Metadata } from "next";
import AuthForgotPassword from "@/app/pageComponents/Auth/auth-forgot-password";
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
      {/* <HeaderNew />
      <br /> */}
      <div className="login-outer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 imageArea">
              <span className="vec1"><img src="/assets/images/vec1.svg" loading="lazy" alt="White icon of an envelope with a shield" /></span>
              <span className="vec2"><img src="/assets/images/vec2.svg" loading="lazy" alt="White envelope with a lock" /></span>
              <span className="vec3"><img src="/assets/images/vec2.svg" loading="lazy" alt="White envelope with a lock" /></span>
              <span className="vec4"><img src="/assets/images/vec2.svg" loading="lazy" alt="White envelope with a lock" /></span>
              <span className="vec5"><img src="/assets/images/vec2.svg" loading="lazy" alt="White envelope with a lock" /></span>
              <span className="vec6"><img src="/assets/images/vec2.svg" loading="lazy" alt="White envelope with a lock" /></span>
              <span className="vec7"><img src="/assets/images/vec1.svg" loading="lazy" alt="White icon of an envelope with a shield" /></span>
              <span className="vec8 lock"><img src="/assets/images/vec3.svg" loading="lazy" alt="White icon of an envelope with a shield" /></span>
              <span className="vec9"><img src="/assets/images/vec1.svg" loading="lazy" alt="White icon of an envelope with a shield" /></span>

              <div className="imageSection">
                <a href="/"><img src="/assets/images/black_shadow.png" alt="" className="loginImage" loading="lazy" /></a>
                <h1 style={{fontSize:"45px"}}>Retrieve Your Password?</h1>
                <p>Enter your email address to receive a password reset link. After submitting your email, check your inbox for instructions. If you don&apos;t see the email, check your spam or junk folder.</p>
                <p><i>For security, choose a strong, unique password you haven’t used before. If you don&apos;t receive the reset email or need further assistance, contact our support team at [support email] or [support phone number]</i></p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 formArea">
              <span className="vecp1"><img src="/assets/images/vecp1.svg" alt="" loading="lazy" /></span>
              <span className="vecp2"><img src="/assets/images/vecp1.svg" alt="" loading="lazy" /></span>
              <span className="vecp3"><img src="/assets/images/vecp1.svg" alt="" loading="lazy" /></span>
              <span className="vecp4"><img src="/assets/images/vecp1.svg" alt="" loading="lazy" /></span>
              <span className="vecp5"><img src="/assets/images/vecp1.svg" alt="" loading="lazy" /></span>
              <span className="vecp6"><img src="/assets/images/vecp1.svg" alt="" loading="lazy" /></span>
              <span className="vecp7"><img src="/assets/images/vecp2.svg" alt="" loading="lazy" /></span>
              <div className="logo">
                <img src="/assets/images/logo-blue.png" alt="" className="loginImage" loading="lazy" />
              </div>

              <div className="formInner">
                <h3 className="forgotPassword">Forgot Password?</h3>
                <p className="topText">Enter your email address to receive a password reset link.</p>
                <AuthForgotPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <br /> */}
      {/* <FooterContent /> */}
    </>
  );
};
export default ForgotPassword;

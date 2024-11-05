import { AuthResetPasswordForm } from "@/app/pageComponents/Auth/auth-reset-password-form";
import React from "react";

type Props = {
  params: {
    resetToken: string;
  };
};
const ResetPassword = ({ params }: Props) => {
  const resetToken = params.resetToken;
  return (
    <>
      <div className="login-outer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 imageArea">
              <span className="vec1">
                <img src="/assets/images/vec1.svg" alt="" loading="lazy" />
              </span>
              <span className="vec2">
                <img src="/assets/images/vec2.svg" alt="" loading="lazy" />
              </span>
              <span className="vec3">
                <img src="/assets/images/vec2.svg" alt="" loading="lazy" />
              </span>
              <span className="vec4">
                <img src="/assets/images/vec2.svg" alt="" loading="lazy" />
              </span>
              <span className="vec5">
                <img src="/assets/images/vec2.svg" alt="" loading="lazy" />
              </span>
              <span className="vec6">
                <img src="/assets/images/vec2.svg" alt="" loading="lazy" />
              </span>
              <span className="vec7">
                <img src="/assets/images/vec1.svg" alt="" loading="lazy" />
              </span>
              <span className="vec8 lock">
                <img src="/assets/images/vec3.svg" alt="" loading="lazy" />
              </span>
              <span className="vec9">
                <img src="/assets/images/vec1.svg" alt="" loading="lazy" />
              </span>

              <div className="imageSection">
                <img
                  src="/assets/images/logo-white-blue.svg"
                  alt=""
                  className="loginImage"
                  loading="lazy"
                />
                <h2>Forgot Your Password?</h2>
                <p>
                  For security, choose a strong, unique password you
                  haven&lsquo;t used before. If you don&lsquo;t receive the
                  reset email or need further assistance, contact our support
                  team at
                </p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 formArea">
              <span className="vecp1">
                <img src="/assets/images/vecp1.svg" alt="" loading="lazy" />
              </span>
              <span className="vecp2">
                <img src="/assets/images/vecp1.svg" alt="" loading="lazy" />
              </span>
              <span className="vecp3">
                <img src="/assets/images/vecp1.svg" alt="" loading="lazy" />
              </span>
              <span className="vecp4">
                <img src="/assets/images/vecp1.svg" alt="" loading="lazy" />
              </span>
              <span className="vecp5">
                <img src="/assets/images/vecp1.svg" alt="" loading="lazy" />
              </span>
              <span className="vecp6">
                <img src="/assets/images/vecp1.svg" alt="" loading="lazy" />
              </span>
              <span className="vecp7">
                <img src="/assets/images/vecp2.svg" alt="" loading="lazy" />
              </span>

              <div className="logo">
                <img
                  src="/assets/images/logo-blue.png"
                  alt=""
                  className="loginImage"
                  loading="lazy"
                />
              </div>

              <div className="formInner">
                <h3 className="forgotPassword">Reset Password</h3>
                <p className="topText">Please create a new password.</p>
                <AuthResetPasswordForm resetToken={resetToken} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;

import { AuthResetPasswordForm } from "@/app/pageComponents/Auth/auth-reset-password-form";
import { _IMG } from "@/constants/images";
import Image from "next/image";
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
                <Image
layout="intrinsic" src={_IMG.vec1} alt="" loading="lazy" />
              </span>
              <span className="vec2">
                <Image
layout="intrinsic" src={_IMG.vec2} alt="" loading="lazy" />
              </span>
              <span className="vec3">
                <Image
layout="intrinsic" src={_IMG.vec2} alt="" loading="lazy" />
              </span>
              <span className="vec4">
                <Image
layout="intrinsic" src={_IMG.vec2} alt="" loading="lazy" />
              </span>
              <span className="vec5">
                <Image
layout="intrinsic" src={_IMG.vec2} alt="" loading="lazy" />
              </span>
              <span className="vec6">
                <Image
layout="intrinsic" src={_IMG.vec2} alt="" loading="lazy" />
              </span>
              <span className="vec7">
                <Image
layout="intrinsic" src={_IMG.vec1} alt="" loading="lazy" />
              </span>
              <span className="vec8 lock">
                <Image
layout="intrinsic" src={_IMG.vec3} alt="" loading="lazy" />
              </span>
              <span className="vec9">
                <Image
layout="intrinsic" src={_IMG.vec1} alt="" loading="lazy" />
              </span>

              <div className="imageSection">
                <Image
layout="intrinsic"
                  src={_IMG.logo_white_blue}
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

import React from "react";
import { postFetcher } from "@/@core/apiFetcher";
import FooterContent from "@/components/Layout/Footer/FooterContent";
import { API_ROUTES } from "@/@core/apiRoutes";
import RedirectTimerCompo from "@/app/pageComponents/Auth/RedirectTimerCompo";
import HeaderNew from "@/components/Layout/Header/HeaderNew";
import Image from "next/image";
import { _IMG } from "@/constants/images";

type Props = {
  params: {
    userId: string;
  };
};

export default async function Page({ params }: Props) {
  const userId = params.userId;
  const verifyEmail = await postFetcher(API_ROUTES.VERIFY_ACCOUNT, {
    user_id: userId,
  });

  return (
    <>
      <HeaderNew />
      <br />
      <div className="login-outer addDomain">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="login-main"></div>
            </div>
            <div className="col-xl-6 mx-auto">
              {verifyEmail.status ? (
                <div className="verifyEmail success mb-4">
                  <Image
layout="intrinsic" alt={``} src={_IMG.check_mark} loading="lazy" />
                  <h4>Great news! </h4>
                  <p>
                    Your email has been <span>successfully verified</span>.
                    You&apos;re now all set to enjoy the full benefits of
                    <strong>YOUR DMARC</strong>.
                  </p>
                  <h5>Welcome aboard!</h5>
                  <RedirectTimerCompo redirectTo={`/login?newUser=${true}`} />
                </div>
              ) : (
                <div className="verifyEmail error mb-4">
                  <Image
layout="intrinsic" alt={``} src={_IMG.close} loading="lazy" />
                  <h4>Uh-oh! </h4>
                  <p>
                    We encountered a <span>verification error</span>. Please
                    ensure the accuracy of your information and try again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
      <FooterContent />
    </>
  );
}

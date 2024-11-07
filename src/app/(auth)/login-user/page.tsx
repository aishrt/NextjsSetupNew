"use client";
import React, { Suspense, useEffect, useMemo } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import CircularSpinner from "@/components/Loaders/CircularSpinner";
import Loader from "@/app/pageComponents/BlogComponent/Loader";
import { API_ROUTES } from "@/@core/apiRoutes";
import Image from "next/image";
import { _IMG } from "@/constants/images";

const Login = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <LoginComponent />
      </Suspense>
    </>
  );
};

const LoginComponent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("user-token");

  async function autoLogin(storedEmail: any) {
    if (storedEmail && !session) {
      (async () => {
        const res = await signIn("credentials", {
          redirect: false,
          email: storedEmail,
          user_name: storedUserName,
          user_password: storedUserPassword,
        });

        if (res?.error) {
          toast.error(res.error);
          router.push("/login");
        } else {
          if (res?.url) router.push(res.url);
          toast.success("Logged in user!");
        }
      })();
    }
  }

  async function verifyToken(token: any) {
    const apiUrl = `${API_ROUTES.VERIFY_JWT}`;

    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();

    if (result.decoded) {
      const emailValue = result.decoded?.email;
      if (emailValue && !session) {
        autoLogin(emailValue);
      }
    } else {
      console.error("Verification failed:", result.error);
      toast.error("Invalid user token detected");
      router.push("/login");
    }
  }

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    verifyToken(token);
  }, []);
  const storedUserName = process.env.NEXT_PUBLIC_API_USER_NAME;
  const storedUserPassword = process.env.NEXT_PUBLIC_API_PASSWORD;
  useEffect(() => {
    if (session) {
      if (session.user.is_onboarded && session.user.is_domain === "verified") {
        router.push("/dashboard/dashboard");
      } else if (session.user.is_domain === "not_verified") {
        router.push("/dashboard/domain");
      } else {
        router.push("/dashboard/add-domain");
      }
    }
  }, [session, router]);

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="login-outer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 imageArea">
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
                  Securely access user&apos;s YOUR DMARC dashboard to view their
                  email compliance. Click on Get started to access user profile.
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 formArea">
              <div className="formInner d-flex align-items-center justify-content-center">
                <span className="d-block mb-5">
                  <CircularSpinner />
                </span>
                <h5 className="mt-5">
                  We are authenticating user please wait for a while{" "}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

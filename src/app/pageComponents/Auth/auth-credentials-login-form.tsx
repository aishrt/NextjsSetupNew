"use client";
import { signIn, getCsrfToken } from "next-auth/react";
import { Formik, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Suspense, useEffect, useRef, useState } from "react";
import SigninWithGoogleCompo from "@/app/pageComponents/Auth/SigninWithGoogleCompo";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useStore } from "@/utils/store";
import Loader from "@/app/pageComponents/BlogComponent/Loader";
import { Button } from "@mui/material";

const SourceLoginDashboardPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AuthCredentialsLoginForm />
    </Suspense>
  );
};

interface AuthCredentialsLoginFormProps {
  csrfToken?: string;
}

interface FormValues {
  email: string;
  password: string;
  tenantKey: string;
}

const AuthCredentialsLoginForm = ({
  csrfToken,
}: AuthCredentialsLoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const search = searchParams.get("newUser");
  const [redirectionUrl, setRedirectionUrl] = useState("" as any);

  const { setIsDomain } = useStore();

  useEffect(() => {
    if (session) {
      {
        session?.user?.is_onboarded === true &&
        session?.user?.is_domain == "verified"
          ? router.push("/dashboard/dashboard")
          : session?.user?.is_domain == "not_verified"
          ? router.push("/dashboard/domain")
          : router.push("/dashboard/add-domain");
      }
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      setIsDomain(session?.user?.is_domain);
    }
  }, [session]);

  const formikRef =
    useRef<FormikProps<{ email: string; password: string }>>(null);

  useEffect(() => {
    formikRef.current?.resetForm();
  }, []);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Formik
        initialValues={{ email: "", password: "", tenantKey: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, "Must be 30 characters or less")
            .email("Invalid email address")
            .required("Please enter your email"),
          password: Yup.string().required("Please enter your password"),
        })}
        onSubmit={async (values: FormValues, { setSubmitting }) => {
          const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl:
              search !== null
                ? "/welcome"
                : session?.user?.is_onboarded === true &&
                  session?.user?.is_domain == "verified"
                ? "/dashboard/dashboard"
                : session?.user?.is_domain == "not_verified"
                ? "/dashboard/domain"
                : "/dashboard/add-domain",
          });
          setRedirectionUrl(res?.url);
          // if (res?.url) router.push(res.url);
          setSubmitting(false);
          if (res?.error) {
            toast.error(res.error);
          } else {
            toast.success("Welcome back! You are now logged in.");
          }
        }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <div className="googleBtn">
                <SigninWithGoogleCompo btnTitle={`Sign In with Google`} />
                <p>
                  <span>Or Sign In with email</span>
                </p>
              </div>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  autoComplete="new-email"
                  aria-label="enter your email"
                  aria-required="true"
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      formik.handleSubmit();
                    }
                  }}
                />
                <div className="error">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  autoComplete="new-password"
                  aria-label="enter your password"
                  aria-required="true"
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      formik.handleSubmit();
                    }
                  }}
                />
                <Link rel="canonical" href="/forgot-password">
                  Forgot Password?
                </Link>
                <div className="error">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="form-group text-center mt-5">
                <Button
                  type="submit"
                  className="btn btnLogin"
                  disabled={formik.isSubmitting}
                >
                  Sign In
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </Suspense>
  );
};

export default SourceLoginDashboardPage;

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

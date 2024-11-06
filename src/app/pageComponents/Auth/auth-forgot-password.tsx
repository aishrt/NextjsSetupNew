"use client";
import { getCsrfToken } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { CtxOrReq } from "next-auth/client/_utils";
import { postFetcher } from "@/@core/apiFetcher";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { API_ROUTES } from "@/@core/apiRoutes";

const AuthForgotPassword = ({ csrfToken }: { csrfToken?: string }) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: "", password: "", tenantKey: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .max(30, "Must be 30 characters or less")
          .email("Invalid email address")
          .required("Please enter your email"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await postFetcher(API_ROUTES.FORGOT_PASSWORD_LINK, {
          email: values.email,
        });

        if (!res?.status) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
          router.push("/login");
        }
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <div className="form-group">
            <label
              htmlFor="email"
              className="uppercase text-sm text-gray-600 font-bold"
            >
              Email Address
            </label>
            <Field
              name="email"
              aria-label="enter your email"
              aria-required="true"
              type="text"
              className="form-control"
              placeholder="Enter Your Email Address"
            />

            <div className="error">
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="form-group text-center mt-5">
            <Button
              type="submit"
              className="btn btnLogin"
              disabled={formik.isSubmitting}
            >
              Send Email
            </Button>

            <a href="/login" className="text-center my-3">
              Back to Sign In
            </a>
          </div>
        </form>
      )}
    </Formik>
  );
};
export default AuthForgotPassword;
export async function getServerSideProps(context: CtxOrReq | undefined) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

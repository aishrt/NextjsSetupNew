"use client";
import { getCsrfToken } from "next-auth/react";
import { Formik, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { CtxOrReq } from "next-auth/client/_utils";
import { postFetcher } from "@/@core/apiFetcher";
import { toast } from "react-toastify";
import { isEmpty } from "@/utils/isEmpty";
import { createContact } from "@/app/api/auth/[...nextauth]/brevo";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import SigninWithGoogleCompo from "./SigninWithGoogleCompo";

export const AuthCredentialsSignupForm = ({
  csrfToken,
}: {
  csrfToken?: string;
}) => {
  const router = useRouter();

  const formikRef =
    useRef<
      FormikProps<{ email: string; password: string; confirm_password: string }>
    >(null);

  useEffect(() => {
    formikRef.current?.resetForm();
  }, []);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirm_password: "",
        tenantKey: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .max(30, "Must be 30 characters or less")
          .email("Invalid email address")
          .required("Please enter your email"),
        password: Yup.string()
          .required("Please enter your password")
          .matches(
            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_]).{6,}$/,
            "Password must contain at least one number, one alphabet character, and one symbol"
          ),
        confirm_password: Yup.string()
          .oneOf([Yup.ref("password"), ""], "Passwords must match")
          .required("Please enter confirm password"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const res: any = await postFetcher("/api/v1/account/signup", {
          email: values.email,
          password: values.password,
        });
        if (!res.status) {
          const msg: false | any[] =
            !isEmpty(res.data) &&
            Object.keys(res.data).map(
              (v) => !isEmpty(res?.data?.[v]) && res?.data?.[v].join(", ")
            );
          const finalMessage =
            !isEmpty(msg) && msg && typeof msg === "object"
              ? msg?.join(", ")
              : res.message;
          toast.error(finalMessage);
        } else {
          toast.success(res.message);
          const brevoRes = await createContact(values.email);
          router.push("/login");
        }
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="signup_form_class"
          id="signup_form_id"
        >
          <div className="googleBtn">
            <SigninWithGoogleCompo btnTitle={`Sign Up with Google`} />
            <p>
              <span>Or Sign Up with email</span>
            </p>
          </div>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="form-group">
            <label
              htmlFor="email"
              className="uppercase text-sm text-gray-600 font-bold"
            >
              Email
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
          <div className="form-group">
            <label
              htmlFor="password"
              className="uppercase text-sm text-gray-600 font-bold"
            >
              Password
            </label>
            <Field
              name="password"
              aria-label="enter your password"
              aria-required="true"
              type="password"
              className="form-control"
              placeholder="Enter Password"
            />

            <div className="error">
              <ErrorMessage name="password" />
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor="password"
              className="uppercase text-sm text-gray-600 font-bold"
            >
              Confirm Password
            </label>
            <Field
              name="confirm_password"
              aria-label="enter your password"
              aria-required="true"
              type="password"
              className="form-control"
              placeholder="Enter Confirm Password"
            />

            <div className="error">
              <ErrorMessage name="confirm_password" />
            </div>
          </div>
          <div className="form-group text-center mt-5">
            <Button
              type="submit"
              className="btn btnLogin"
              disabled={formik.isSubmitting}
            >
              Sign Up
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
export async function getServerSideProps(context: CtxOrReq | undefined) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

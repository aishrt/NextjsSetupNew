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

export const AuthResetPasswordForm = ({
  csrfToken,
  resetToken,
}: {
  csrfToken?: string;
  resetToken: string;
}) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ password: "", confirm_password: "", tenantKey: "" }}
      validationSchema={Yup.object({
        password: Yup.string().required("Please enter your password"),
        confirm_password: Yup.string()
          .oneOf([Yup.ref("password"), ""], "Passwords must match")
          .required("Please enter confirm password"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const res: any = await postFetcher(API_ROUTES.FORGOT_PASSWORD, {
          reset_token: resetToken,
          new_password: values.password,
        });
        if (!res.status) {
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
            {/* <span>
              <img alt={``} src="/assets/images/lockIcon.svg" width="auto" />
            </span> */}

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
              Reset Password
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
export async function getServerSideProps(context: CtxOrReq | undefined) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

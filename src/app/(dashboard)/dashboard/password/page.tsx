"use client";
import AdminDetail from "@/app/pageComponents/Dashboard/AdminDetails";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import getCurrentUser from "@/lib/session";
import { isEmpty } from "@/utils/isEmpty";
import { toast } from "react-toastify";
import { postFetcher } from "@/@core/apiFetcher";
import { isTokenExpired } from "@/@core/apiFetcher";
import { signOut } from "next-auth/react";
import { API_ROUTES } from "@/@core/apiRoutes";
interface FormData {
  old_password: string;
  new_password: string;
}

const PasswordSetup = () => {

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    weekly_digest_report: false,
  });

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    // let url = "/api/v1/account/get-profile";
    let url = API_ROUTES.VIEW_PROFILE;
    const users = await getCurrentUser();
    const isTokenValid = await isTokenExpired(users.token);
    if (!isTokenValid) {
      signOut({ callbackUrl: "/" });
      return;
    }
    let headers: any = {
      "Content-Type": "application/json",
    };
    if (!isEmpty(users) && !isEmpty(users.token)) {
      headers["Authorization"] = `Bearer ${users.token}`;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
      {
        method: "GET",
        headers,
        next: {
          revalidate: 0,
        },
      }
    );
    let resData = await res.json();
    resData.data.preview = resData.data.profile_image
      ? process.env.NEXT_PUBLIC_BACKEND_API_URL + resData.data.profile_image
      : "/assets/images/profile.png";
    setProfileData(resData.data);
    setProfileData(resData.data);
  };
  const ChangePasswordSchema = Yup.object().shape({
    old_password: Yup.string().required("Current password is required"),
    new_password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[\W_]+/, "Password must contain at least one symbol"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Please repeat your password"),
  });

  const handleSubmit = async (
    values: FormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const res: any = await postFetcher(API_ROUTES.RESET_PASSWORD, {
        old_password: values.old_password,
        new_password: values.new_password,
      });
      if (res.code === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message || "An unexpected error occurred");
      }
    } catch (error) {
      console.error("Failed to change password", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="graphSection">
      <div className="dashboardTopCard">
        <div className="password">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 m-3">
                <h3 className="fw-bolder">Change Password</h3>
              </div>
              <div className="col-xxl-3">
                <AdminDetail profileData={profileData} />
              </div>
              <div className="col-xxl-9">
                <div className="card">
   

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-semibold"></h4>
                    <button
                      className="btn pinkButtonLight editButton"
                      title="Edit Profile"
                    >
                      <i className="fa-solid fa-pen me-2"></i>Edit
                    </button>
                  </div>
                  <div className="card-body">
                    <Formik
                      initialValues={{
                        old_password: "",
                        new_password: "",
                        repeatPassword: "",
                      }}
                      validationSchema={ChangePasswordSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className="row">
                            <div className="col-xl-6 mb-3">
                              <label htmlFor="old_password">
                                Current Password
                              </label>
                              <Field
                                type="password"
                                name="old_password"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="old_password"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-xl-6 mb-3">
                              <label htmlFor="new_password">New Password</label>
                              <Field
                                type="password"
                                name="new_password"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="new_password"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="col-xl-7">
                              <p>
                                Your new password must be at least 8 characters
                                and contain an uppercase letter and a symbol.
                              </p>
                            </div>
                            <div className="col-xl-6 mb-3">
                              <label htmlFor="repeatPassword">
                                Confirm Password
                              </label>
                              <Field
                                type="password"
                                name="repeatPassword"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="repeatPassword"
                                component="div"
                                className="error"
                              />
                            </div>
                          </div>
                          <div className="mt-5 text-end">
                            <button
                              type="submit"
                              className="btn pinkButton"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting..." : "Save Changes"}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetup;

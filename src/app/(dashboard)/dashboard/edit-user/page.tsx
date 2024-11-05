"use client";
import { useState, useEffect, Suspense } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { getFetcher, putFetcher } from "@/@core/apiFetcher";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/app/pageComponents/BlogComponent/Loader";
import { useStore } from "@/utils/store";
import { API_ROUTES } from "@/@core/apiRoutes";
import MainLoader from "@/components/Loaders/MainLoader";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  password: string;
  repeatPassword: string;
  weekly_domain_report: boolean;
  weekly_dmarc_report: boolean;
  weekly_digest_report: boolean;
  alert: boolean;
  is_active: boolean;
}
const SourceEditPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <EditUser />
    </Suspense>
  );
};

const EditUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { digestReportVal, dmarcReportVal, domainReportVal, alertVal } =
    useStore();

  const id: any = searchParams.get("id");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getFetcher(`${API_ROUTES.GET_USER}/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const initialValues: User = {
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    password: "",
    repeatPassword: "",
    weekly_domain_report: false,
    weekly_dmarc_report: false,
    weekly_digest_report: false,
    alert: false,
    is_active: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .max(30, "Must be 30 characters or less")
      .email("Invalid email address")
      .required("Please enter your email"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    role: Yup.string().required("Administrator role is required"),
  });

  const handleSubmit = async (values: User, { setSubmitting }: any) => {
    try {
      const newObj = {
        email: values?.email,
        is_active: values?.is_active,
        first_name: values?.first_name,
        last_name: values?.last_name,
        weekly_domain_report: values?.weekly_domain_report,
        weekly_dmarc_report: values?.weekly_dmarc_report,
        weekly_digest_report: values?.weekly_digest_report,
        alert: values?.alert,
        role: values?.role,
        password: "",
      };
      const res = await putFetcher(`${API_ROUTES.UPDATE_USER}/${id}/`, newObj);
      if (res.code === 200) {
        toast.success(res.message);
        router.push("/dashboard/users");
      } else {
        toast.error(res.message || "An unexpected error occurred");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <MainLoader />;
  }
  console.log(user, "=====user=====");
  return (
    <div className="graphSection mt-5 userDetail">
      <div className="addUser">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <Formik
                initialValues={user}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, isSubmitting, setFieldValue, errors }) => (
                  <Form>
                    <div className="col-xl-12">
                      <div className="card">
                        <div className="row">
                          <div className="col-xl-12">
                            <div className="user-upper-form">
                              <div className="row">
                                <div className="col-xl-4">
                                  <div className="form-group">
                                    <label
                                      htmlFor="username"
                                      className="form-label"
                                    >
                                      Email
                                    </label>
                                    <Field
                                      type="text"
                                      name="email"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4">
                                  <div className="form-group">
                                    <label
                                      htmlFor="Firstname"
                                      className="form-label"
                                    >
                                      First Name
                                    </label>
                                    <Field
                                      type="text"
                                      name="first_name"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="first_name"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4">
                                  <div className="form-group">
                                    <label
                                      htmlFor="Lastname"
                                      className="form-label"
                                    >
                                      Last Name
                                    </label>
                                    <Field
                                      type="text"
                                      name="last_name"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="last_name"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="row">
                              <div className="col-xl-12">
                                <hr />
                              </div>
                            </div>
                            <div className="user-upper-form">
                              <h5 className="mt-0 mb-4">Security</h5>
                              <div className="row">
                                <label htmlFor="role" className="roleUser mb-2">
                                  Roles
                                </label>
                                <div className="col-xl-4">
                                  <div className="form-group">
                                    <div className="form-check">
                                      <label
                                        className="form-check-label"
                                        htmlFor="adminRole"
                                      >
                                        Administrator
                                      </label>
                                      <Field
                                        type="radio"
                                        id="adminRole"
                                        name="role"
                                        onClick={() => {
                                          setFieldValue("role", 2);
                                        }}
                                        value="2"
                                        checked={values.role == "2"}
                                        // value="administrator"
                                        className="form-check-input"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-4">
                                  <div className="form-check">
                                    <label
                                      className="form-check-label"
                                      htmlFor="memberRole"
                                    >
                                      Member
                                    </label>
                                    <Field
                                      type="radio"
                                      id="memberRole"
                                      name="role"
                                      onClick={() => setFieldValue("role", 3)}
                                      checked={values.role == "3"}
                                      value="3"
                                      className="form-check-input"
                                    />
                                    <ErrorMessage
                                      name="roles"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                </div>

                                <div className="col-xl-4">
                                  <div className="reportSection">
                                    <div className="form-check form-switch">
                                      <Field
                                        type="checkbox"
                                        id="isActive"
                                        name="is_active"
                                        className="form-check-input"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="isActive"
                                      >
                                        User Status
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-5">
                                <div className="col-xl-4">
                                  <div className="form-group">
                                    <label
                                      htmlFor="Password"
                                      className="form-label"
                                    >
                                      Password
                                    </label>
                                    <Field
                                      type="password"
                                      name="password"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="password"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4">
                                  <div className="form-group">
                                    <label
                                      htmlFor="Password"
                                      className="form-label"
                                    >
                                      Confirm Password
                                    </label>
                                    <Field
                                      Profile
                                      Data
                                      type="text"
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
                                <p>
                                  Your new password must be at least 8
                                  characters and contain an uppercase letter and
                                  a symbol.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="row">
                              <div className="col-xl-12">
                                <hr />
                              </div>
                              <div className="col-xl-12">
                                <div className="user-upper-form">
                                  <h5 className="mt-0 mb-4">Reports</h5>
                                  <div className="row">
                                    <div className="col-xl-6">
                                      <div className="saveSection">
                                        <div className="reportSection">
                                          <div className="form-check form-switch">
                                            <Field
                                              type="checkbox"
                                              id="weeklyDoaminReport"
                                              name="weekly_domain_report"
                                              className="form-check-input"
                                              disabled={!domainReportVal}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="weeklyDoaminReport"
                                            >
                                              Weekly Domain report
                                            </label>
                                            <p>
                                              Receive weekly digest report for
                                              all configured domains.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-xl-6">
                                      <div className="saveSection">
                                        <div className="reportSection">
                                          <div className="form-check form-switch">
                                            <Field
                                              type="checkbox"
                                              id="weeklyDmarcReport"
                                              name="weekly_dmarc_report"
                                              className="form-check-input"
                                              disabled={!dmarcReportVal}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="weeklyDmarcReport"
                                            >
                                              Weekly Dmarc report
                                            </label>
                                            <p>
                                              Receive weekly Dmarc report for
                                              all configured domains.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-xl-6">
                                      <div className="saveSection">
                                        <div className="reportSection">
                                          <div className="form-check form-switch">
                                            <Field
                                              type="checkbox"
                                              id="weeklyDigestReport"
                                              name="weekly_digest_report"
                                              className="form-check-input"
                                              disabled={!digestReportVal}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="weeklyDigestReport"
                                            >
                                              Weekly Digest report
                                            </label>
                                            <p>
                                              Receive weekly digest report for
                                              all configured domains.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-xl-6">
                                      <div className="saveSection">
                                        <div className="reportSection">
                                          <div className="form-check form-switch">
                                            <Field
                                              type="checkbox"
                                              id="alert"
                                              name="alert"
                                              className="form-check-input"
                                              disabled={!alertVal}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="alert"
                                            >
                                              Alerts
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xl-12 saveButton">
                                <button
                                  type="submit"
                                  className="btn mainButton"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? "Submitting..." : "Save"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceEditPage;

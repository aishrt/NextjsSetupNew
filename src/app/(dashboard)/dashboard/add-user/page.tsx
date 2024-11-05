"use client";
import { postFetcher } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
import { useStore } from "@/utils/store";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import SelectAsync from "@/components/Form/SelectAsync";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import MainLoader from "@/components/Loaders/MainLoader";
import UpgradePlanComponent from "@/app/pageComponents/Others/UpgradePlanComponent";
import { Formik, Field, ErrorMessage, Form, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface FormData {
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
  domain_list: any;
}
const AddUser = () => {
  const router = useRouter();
  const initialValues: FormData = {
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    password: "",
    repeatPassword: "",
    weekly_digest_report: false,
    weekly_dmarc_report: false,
    weekly_domain_report: false,
    alert: false,
    is_active: false,
    domain_list: [],
  };

  const formikRef =
    useRef<
      FormikProps<{ email: string; password: string; confirm_password: string }>
    >(null);

  useEffect(() => {
    formikRef.current?.resetForm();
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .max(30, "Must be 30 characters or less")
      .email("Invalid email address")
      .required("Please enter your email"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    role: Yup.string().required("Administrator role is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    domain_list: Yup.array()
      .of(Yup.object())
      // .min(1, "At least one domain is required")
      .when("role", {
        is: "member",
        then: (schema) => schema.min(1, "Domain is required").required(),
        otherwise: (schema) => schema.notRequired(),
      }),
  });
  const handleSubmit = async (values: FormData, { setSubmitting }: any) => {
    try {
      const dataToSubmit: any = {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
        weekly_digest_report: values?.weekly_digest_report,
        weekly_dmarc_report: values?.weekly_dmarc_report,
        weekly_domain_report: values?.weekly_domain_report,
        alert: values?.alert,
        role:
          values?.role === "administrator"
            ? 2
            : values.role === "member"
            ? 3
            : 0,
        is_active: values.is_active,
      };
      if (values.role === "member") {
        const domainIds = values.domain_list.map((domain: any) => domain.id);
        if (domainIds.length > 0) {
          dataToSubmit.domain_permission = domainIds;
        }
      }
      const res: any = await postFetcher(API_ROUTES.ADD_USER, dataToSubmit);
      if (res.code === 200) {
        toast.success(res.message);
        router.push("/dashboard/users");
      } else {
        toast.error(res.message || "An unexpected error occurred");
      }
    } catch (error) {
      console.error("Failed to Add user", error);
    } finally {
      setSubmitting(false);
    }
  };

  const [isLoading, setLoading] = useState(true as boolean);
  const [userLeft, setuserLeft] = useState("" as any);

  const {
    digestReportVal,
    dmarcReportVal,
    domainReportVal,
    alertVal,
    licenseValidation,
  } = useStore();

  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleCloseUpgradePlan = () => {
    setShowUpgrade(false);
  };

  return (
    <div className="graphSection">
      <LicenseWarningsCompo
        onSetIsLoading={(value: any) => setLoading(value)}
        onSetLicenseData={(resData: any) => {
          if (resData) {
            setuserLeft(resData.data.users.limit - resData.data.users.usage);
          }
        }}
      />
      {showUpgrade && (
        <UpgradePlanComponent
          initialOpenModal={showUpgrade}
          onClose={handleCloseUpgradePlan}
        />
      )}
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="dashboardTopCard">
          <div className="addUser">
            <div className="container-fluid">
              <div className="row">
                <Formik
                  initialValues={{
                    email: "",
                    first_name: "",
                    last_name: "",
                    role: "",
                    password: "",
                    repeatPassword: "",
                    weekly_digest_report: digestReportVal
                      ? digestReportVal
                      : false,
                    weekly_dmarc_report: dmarcReportVal
                      ? dmarcReportVal
                      : false,
                    weekly_domain_report: domainReportVal
                      ? domainReportVal
                      : false,
                    alert: alertVal ? alertVal : false,
                    is_active: false,
                    domain_list: [],
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                      <div className="col-xl-12">
                        <div className="card">
                          <div className="card-header">
                            <h3 className="text-start">Add User</h3>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-12">
                                <div className="row">
                                  <div className="col-xl-4">
                                    <label
                                      htmlFor="first_name"
                                      className="form-label"
                                    >
                                      FIRST NAME
                                    </label>
                                    <Field
                                      type="text"
                                      name="first_name"
                                      className="form-control"
                                      placeholder="John"
                                    />
                                    <ErrorMessage
                                      name="first_name"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                  <div className="col-xl-4">
                                    <label
                                      htmlFor="last_name"
                                      className="form-label"
                                    >
                                      LAST NAME
                                    </label>
                                    <Field
                                      type="text"
                                      name="last_name"
                                      className="form-control"
                                      placeholder="Wick"
                                    />
                                    <ErrorMessage
                                      name="last_name"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                  <div className="col-xl-4">
                                    <label
                                      htmlFor="username"
                                      className="form-label"
                                    >
                                      EMAIL
                                    </label>
                                    <Field
                                      type="text"
                                      name="email"
                                      className="form-control"
                                      placeholder="johnwick@example.com"
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <h5>Security</h5>
                                    <hr />
                                  </div>
                                  <div className="col-xl-6">
                                    <label
                                      htmlFor="role"
                                      className="roleUser mb-2"
                                    >
                                      Roles
                                    </label>
                                    <div className="row">
                                      <div className="col-xl-4">
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
                                            value="administrator"
                                            className="form-check-input"
                                          />
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
                                            value="member"
                                            className="form-check-input"
                                          />
                                          <ErrorMessage
                                            name="role"
                                            component="div"
                                            className="error"
                                          />
                                        </div>
                                      </div>
                                      {values?.role == "member" && (
                                        <div className="col-xl-4">
                                          <SelectAsync
                                            searchType={`domainListing`}
                                            placeholder="Select Domains"
                                            className="multiSelectHeight"
                                            required
                                            onChange={(selectedDomains: any) =>
                                              setFieldValue(
                                                "domain_list",
                                                selectedDomains
                                              )
                                            }
                                            isMulti
                                          />
                                          <ErrorMessage
                                            name="domain_list"
                                            component="div"
                                            className="error"
                                          />
                                        </div>
                                      )}

                                      <div className="col-xl-4 ">
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
                                      <label
                                        htmlFor="Password"
                                        className="form-label"
                                      >
                                        PASSWORD
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
                                    <div className="col-xl-4">
                                      <label
                                        htmlFor="Password"
                                        className="form-label"
                                      >
                                        CONFIRM PASSWORD
                                      </label>
                                      <Field
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
                                    <p className="mt-2">
                                      <i
                                        style={{
                                          color: "#282828",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Your new password must be at least 8
                                        characters and contain an uppercase
                                        letter and a symbol.
                                      </i>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <hr />
                              </div>
                              <div className="col-xl-12">
                                <div className="user-upper-form">
                                  <h5 className="mt-0 mb-4">
                                    Reports notifications
                                    <InformationTooltip
                                      name="add_user_reports_notifications"
                                      position="right"
                                    />
                                  </h5>
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

                              <div className="col-xl-6 saveButton mt-5">
                                {licenseValidation.usersLimitCrossed ? (
                                  <button
                                    className=" saveBUttonui"
                                    type="button"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      setShowUpgrade(true);
                                    }}
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    className=" saveBUttonui"
                                    disabled={isSubmitting}
                                  >
                                    Save
                                  </button>
                                )}
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
      )}
    </div>
  );
};
export default AddUser;

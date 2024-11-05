"use client";
import { getFetcherWithAuth, postFetcher } from "@/@core/apiFetcher";
import { Formik,Form, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { isEmpty } from "@/utils/isEmpty";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/@core/apiRoutes";
import { TextField } from "@mui/material";
import SendEmailLoader from "@/components/ui/Loaders/SendEmailLoader";
import CheckBoxInput from "@/components/checkBoxInput";

interface FormData {
  mail_from: string;
  mail_to: string;
  sender_name: string;
  subject: string;
  content: string;
  host_name: string;
  port: string;
  auth_type: string;
  user_name: string;
  password: string;
  save_as: string;
}
const SendEmalTool = () => {
  const [isSendLoading, setSendLoading] = useState(false as boolean);
  const [isLoading, setLoading] = useState(false as boolean);
  const [chips, setChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [mailToError, setMailToError] = useState(false);
  const [smtpData, setSMTPData] = useState([] as any);
  const router = useRouter();

  const formikRef = useRef<FormikProps<FormData>>(null);

  const getSmtplListing = async () => {
    setLoading(true);
    getFetcherWithAuth(API_ROUTES.SMTP_DETAIL)
      .then((resData: any) => {
        if (!isEmpty(resData)) {
          setSMTPData(resData?.data);
        }
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getSmtplListing();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const saveAs = event.target.value;
    const smtp = smtpData.find((item: any) => item.save_as === saveAs);

    if (smtp && formikRef.current) {
      formikRef.current.setValues({
        ...formikRef.current.values,
        host_name: smtp.host_name,
        port: smtp.port,
        auth_type: smtp.auth_type,
        user_name: smtp.user_name,
        password: smtp.password,
        save_as: smtp.save_as,
      });
    }
  };

  const validationSchema = Yup.object().shape({
    mail_from: Yup.string()
      .max(30, "Must be 30 characters or less")
      .email("Invalid email address")
      .required("Please enter your email"),
    sender_name: Yup.string().required("Sender Name is required"),
    subject: Yup.string().required("Subject is required"),
    content: Yup.string().required("Body content is required"),
    host_name: Yup.string().required("Hostname is required"),
    port: Yup.string().required("Port is required"),
    auth_type: Yup.string().required("Authentication type is required"),
    user_name: Yup.string().required("User Name is required"),
    save_as: Yup.string().required("Save as name is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  useEffect(() => {
    if (isEmpty(chips)) {
      setMailToError(false);
    }
  }, [chips]);

  const handleSubmit = async (values: FormData, { setSubmitting }: any) => {
    setSendLoading(true);
    if (isEmpty(chips)) {
      setMailToError(true);
      setSendLoading(false);

      return;
    }
    try {
      const res: any = await postFetcher(API_ROUTES.SEND_EMAIL, {
        mail_to: chips,
        mail_from: values.mail_from,
        sender_name: values.sender_name,
        subject: values.subject,
        content: values.content,
        host_name: values.host_name,
        port: values.port,
        auth_type: values.auth_type,
        user_name: values.user_name,
        password: values.password,
        save_as: values.save_as,
      });
      if (res.code === 200) {
        toast.success(res.message);
        router.push("/dashboard/sendEmailListing");
        setSendLoading(false);
      } else {
        toast.error(res.message || "An unexpected error occurred");
      }
    } catch (error) {
      setSendLoading(false);
    } finally {
      setSendLoading(false);
    }
  };

  if (isSendLoading) {
    return (
      <div className="graphSection">
        <div className="dashboardTopCard">
          <div className="addUser">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="text-start">
                        Sending mail
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <SendEmailLoader />;
  }

  return (
    <div className="graphSection">
      <div className="dashboardTopCard">
        <div className="addUser">
          <div className="container-fluid">
            <div className="row">
              <Formik
                innerRef={formikRef}
                initialValues={{
                  mail_from: "",
                  mail_to: "",
                  sender_name: "",
                  subject: "",
                  content: "",
                  host_name: "",
                  port: "",
                  auth_type: "",
                  user_name: "",
                  password: "",
                  save_as: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  isSubmitting,
                  values,
                  handleChange,
                  handleBlur,
                  errors,
                  touched,
                }) => (
                  <Form>
                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="text-start">Send Email</h3>
                        </div>

                        <div className="card-body">
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="row">
                                <div className="col-xl-4">
                                  <label
                                    htmlFor="mail_from"
                                    className="form-label"
                                  >
                                    Mail Send From
                                  </label>
                                  <TextField
                                    type="email"
                                    name="mail_from"
                                    placeholder="johnwick@example.com"
                                    fullWidth
                                    value={values.mail_from}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                      touched.mail_from && !!errors.mail_from
                                    }
                                    helperText={
                                      touched.mail_from && errors.mail_from
                                    }
                                  />
                                </div>

                                <div className="col-xl-4">
                                  <label
                                    htmlFor="sender_name"
                                    className="form-label"
                                  >
                                    Mail Send From Name
                                  </label>
                                  <TextField
                                    type="text"
                                    name="sender_name"
                                    placeholder="John"
                                    fullWidth
                                    value={values.sender_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                      touched.sender_name &&
                                      !!errors.sender_name
                                    }
                                    helperText={
                                      touched.sender_name && errors.sender_name
                                    }
                                  />
                                </div>

                                <div className="col-xl-4">
                                  <CheckBoxInput
                                    label="Email Sent To"
                                    placeholder="Enter receiver's email"
                                    inputValue={inputValue}
                                    setInputValue={setInputValue}
                                    chips={chips}
                                    setChips={setChips}
                                    required={false}
                                    type="email"
                                  />
                                  {mailToError && (
                                    <p className="error">
                                      Please enter the receiver&apos;s email
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-12 mt-4">
                              <div className="row">
                                <div className="col-xl-5">
                                  <label
                                    htmlFor="subject"
                                    className="form-label"
                                  >
                                    Subject
                                  </label>
                                  <TextField
                                    type="text"
                                    name="subject"
                                    placeholder="Provide Subject"
                                    fullWidth
                                    value={values.subject}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.subject && !!errors.subject}
                                    helperText={
                                      touched.subject && errors.subject
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-12 mt-4">
                              <div className="row">
                                <div className="col-xl-11">
                                  <label
                                    htmlFor="content"
                                    className="form-label"
                                  >
                                    Body
                                  </label>
                                  <TextField
                                    name="content"
                                    placeholder="Place your email body here"
                                    multiline
                                    rows={6}
                                    fullWidth
                                    value={values.content}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.content && !!errors.content}
                                    helperText={
                                      touched.content && errors.content
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-12">
                              <div className="row">
                                <div className="col-xl-12 mt-3">
                                  <h5>SMTP Details</h5>
                                  <hr />
                                </div>

                                <div className="col-xl-12">
                                  {!isEmpty(smtpData) && (
                                    <div
                                      style={{ padding: "20px 0px 0" }}
                                      className="text-start mb-5"
                                    >
                                      <Grid container columnSpacing={1}>
                                        <Grid item lg={2} md={2} sm={2}>
                                          <FormControl fullWidth>
                                            <InputLabel
                                              id="smtp-select-label"
                                              sx={{
                                                background: "#fff",
                                                color: "#000",
                                              }}
                                            >
                                              Select SMTP Details
                                            </InputLabel>
                                            <Select
                                              labelId="smtp-select-label"
                                              id="smtp-select"
                                              value={values.save_as}
                                              onChange={handleChange}
                                            >
                                              {smtpData.map((item: any) => (
                                                <MenuItem
                                                  key={item.save_as}
                                                  value={item.save_as}
                                                >
                                                  {item.save_as}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  )}
                                  <div className="row">
                                    <div className="col-xl-4">
                                      <label
                                        htmlFor="host_name"
                                        className="form-label"
                                      >
                                        SMTP Hostname
                                      </label>
                                      <TextField
                                        type="text"
                                        name="host_name"
                                        placeholder="google.com"
                                        fullWidth
                                        value={values.host_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                          touched.host_name &&
                                          !!errors.host_name
                                        }
                                        helperText={
                                          touched.host_name && errors.host_name
                                        }
                                      />
                                    </div>
                                    <div className="col-xl-4">
                                      <label
                                        htmlFor="port"
                                        className="form-label"
                                      >
                                        Port
                                      </label>
                                      <TextField
                                        type="number"
                                        name="port"
                                        placeholder="30"
                                        fullWidth
                                        value={values.port}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.port && !!errors.port}
                                        helperText={touched.port && errors.port}
                                      />
                                    </div>
                                    <div className="col-xl-4">
                                      <label
                                        htmlFor="auth_type"
                                        className="form-label"
                                      >
                                        Authentication
                                      </label>

                                      <Select
                                        fullWidth
                                        labelId="auth_type-label"
                                        name="auth_type"
                                        value={
                                          values.auth_type.length > 0
                                            ? values.auth_type
                                            : "-"
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                          touched.auth_type &&
                                          !!errors.auth_type
                                        }
                                        sx={{
                                          color:
                                            values.auth_type !== ""
                                              ? "black"
                                              : "#9ba0a7",
                                        }}
                                        placeholder="auth"
                                      >
                                        <MenuItem hidden value="-">
                                          Select Authentication
                                        </MenuItem>

                                        <MenuItem value="none">None</MenuItem>
                                        <MenuItem value="TLS">TLS</MenuItem>
                                        <MenuItem value="SSL">SSL</MenuItem>
                                      </Select>
                                      {touched.auth_type &&
                                        errors.auth_type && (
                                          <div className="error">
                                            {errors.auth_type}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>

                                <div className="col-xl-12 mt-4">
                                  <div className="row">
                                    <div className="col-xl-4">
                                      <label
                                        htmlFor="user_name"
                                        className="form-label"
                                      >
                                        Username
                                      </label>
                                      <TextField
                                        type="text"
                                        name="user_name"
                                        placeholder="john cena"
                                        fullWidth
                                        value={values.user_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                          touched.user_name &&
                                          !!errors.user_name
                                        }
                                        helperText={
                                          touched.user_name && errors.user_name
                                        }
                                      />
                                    </div>
                                    <div className="col-xl-4">
                                      <label
                                        htmlFor="password"
                                        className="form-label"
                                      >
                                        Password
                                      </label>
                                      <TextField
                                        type="password"
                                        name="password"
                                        fullWidth
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                          touched.password && !!errors.password
                                        }
                                        helperText={
                                          touched.password && errors.password
                                        }
                                      />
                                    </div>
                                    <div className="col-xl-4">
                                      <label
                                        htmlFor="save_as"
                                        className="form-label"
                                      >
                                        Save As
                                      </label>
                                      <TextField
                                        type="text"
                                        name="save_as"
                                        placeholder="Enter SMTP Detail Name"
                                        fullWidth
                                        value={values.save_as}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                          touched.save_as && !!errors.save_as
                                        }
                                        helperText={
                                          touched.save_as && errors.save_as
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="col-xl-12 saveButton mt-5"
                              style={{ marginBottom: "30px" }}
                            >
                              <button
                                type="submit"
                                className="saveBUttonui"
                                disabled={isSubmitting}
                              >
                                Send
                              </button>
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
export default SendEmalTool;

"use client";

import { postFetcher, putFormFetcher } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Formik, Field, ErrorMessage, Form, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MainLoader from "@/components/Loaders/MainLoader";

interface FormData {
  source_name: string;
  spf_type: string;
  spf_value: string;
  notes: string;
}

const HostSPFForm = ({
  setOpenAdd,
  setRefetchData,
  initialValueProps,
  policy_published_domain,
}: {
  setOpenAdd: any;
  setRefetchData: any;
  initialValueProps?: any;
  policy_published_domain: any;
}) => {
  const [isLoading, setLoading] = useState(false as boolean);
  const router = useRouter();
  let initialValuesData: FormData = {
    source_name: "",
    spf_type: "",
    spf_value: "",
    notes: "",
  };

  if (initialValueProps) {
    initialValuesData = {
      source_name: initialValueProps?.source_name,
      spf_type: initialValueProps?.spf_type,
      spf_value: initialValueProps?.spf_value,
      notes: initialValueProps?.notes,
    };
  }

  const formikRef = useRef<
    FormikProps<{
      source_name: string;
      spf_type: string;
      spf_value: string;
      notes: string;
    }>
  >(null);

  useEffect(() => {
    formikRef.current?.resetForm();
  }, []);

  const validationSchema = Yup.object().shape({
    source_name: Yup.string().required("Name is required"),
    spf_type: Yup.string().required("Spf type is required"),
    // spf_value: Yup.string().required("Spf value is required"),
    // notes: Yup.string().required("Notes is required")
  });

  const handleSubmit = async (values: FormData, { setSubmitting }: any) => {
    try {
      setLoading(true);

      let res: any;

      const formData = new FormData();
      formData.append("policy_published_domain", policy_published_domain);
      formData.append("source_name", values?.source_name),
        formData.append("spf_type", values.spf_type),
        formData.append("spf_value", values?.spf_value),
        formData.append("notes", values?.notes);

      if (!initialValueProps) {
        res = await postFetcher(API_ROUTES.HOST_SPF_LIST, {
          policy_published_domain: policy_published_domain,
          source_name: values.source_name,
          spf_type: values.spf_type,
          spf_value: values.spf_value,
          notes: values.notes,
        });
      } else {
        res = await putFormFetcher(
          `${API_ROUTES.UPDATE_SPF_LIST}/${initialValueProps?.id}`,
          formData
        );
      }

      if (res.code === 200) {
        toast.success(res.message);
        router.push("/dashboard/hostSpf");
        setOpenAdd(false);
        setRefetchData(res?.data);
      } else {
        toast.error(res.message || "An unexpected error occurred");
      }
    } catch (error) {
      console.error("Failed to Add ", error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <>
      <div className="row">
        <Formik
          initialValues={initialValuesData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values, touched, errors }) => (
            <Form>
              <div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-12">
                      <label
                        htmlFor="source_name"
                        className="form-label component_lable"
                      >
                        Source name
                      </label>
                      <Field
                        type="text"
                        name="source_name"
                        className="form-control"
                        placeholder="Spf Name"
                      />
                      <ErrorMessage
                        name="source_name"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="col-xl-12">
                      <label
                        htmlFor="spf_type"
                        className="form-label component_lable"
                      >
                        SPf Part Type
                      </label>
                      <FormControl fullWidth>
                        <Select
                          label="Domain"
                          value={values.spf_type}
                          onChange={(e: any) => {
                            setFieldValue("spf_type", e.target.value);
                          }}
                          className="domain-filter"
                          displayEmpty
                        >
                          <MenuItem value="">Select SPF Type</MenuItem>
                          <MenuItem value="include">include</MenuItem>
                          <MenuItem value="ip4">ip4</MenuItem>
                          <MenuItem value="a">a</MenuItem>
                          <MenuItem value="mx">mx</MenuItem>
                          <MenuItem value="redirect">redirect</MenuItem>
                          <MenuItem value="1p6">1p6</MenuItem>
                          <MenuItem value="exists">exists</MenuItem>
                        </Select>
                      </FormControl>

                      {touched.spf_type && errors.spf_type && (
                        <div className="error">{errors.spf_type}</div>
                      )}
                    </div>
                    <div className="col-xl-12">
                      <label
                        htmlFor="spf_value"
                        className="form-label component_lable"
                      >
                        SPf Part Value
                      </label>
                      <Field
                        type="text"
                        name="spf_value"
                        className="form-control"
                        placeholder="eg : 123.0.1.321 or example.com"
                      />
                      <ErrorMessage
                        name="spf_value"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="col-xl-12">
                      <label
                        htmlFor="notes"
                        className="form-label component_lable"
                      >
                        Notes
                      </label>
                      <Field
                        component="textarea"
                        name="notes"
                        className="form-control"
                        placeholder="Note's text here"
                      />
                      <ErrorMessage
                        name="notes"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="col-xl-12 mt-5">
                      <div className="row">
                        <div className="col-xl-6"></div>
                        <div className="col-xl-3">
                          <button
                            type="button"
                            className=" saveBUttonui"
                            onClick={() => setOpenAdd(false)}
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="col-xl-3 saveButton ">
                          <button
                            type="submit"
                            className=" saveBUttonui"
                            disabled={isSubmitting}
                          >
                            Save
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
    </>
  );
};
export default HostSPFForm;

"use client";

import React, { useState } from "react";
import countries from "../../../public/assets/countries.json";
import { postFetcher } from "@/@core/apiFetcher";
import { toast } from "react-toastify";
import { API_ROUTES } from "@/@core/apiRoutes";

interface Form {
  first_name: "string";
  last_name: "string";
  work_email: "string";
  company_name: "string";
  country: "string";
  phone_number: "string";
  // is_msp: boolean,
  // number_of_employees: number,
  product_interest: "string";
  how_heard_about_us: "string";
  additional_comments: "string";
}

const TalkToDmarc: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    work_email: "",
    company_name: "",
    country: "Select",
    phone_number: "",
    // is_msp: false, // defaulted to false to show an unchecked checkbox
    // number_of_employees: '',
    product_interest: "Select",
    how_heard_about_us: "",
    additional_comments: "",
  });
  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  function phoneNumberHandler(e: any) {
    if (e.target.value.length <= 15) {
      setForm({
        ...form,
        phone_number: e.target.value.replace(phoneNumberRegrex, ""),
      });
    }
  }

  const resetForm = () => {
    setForm({
      first_name: "",
      last_name: "",
      work_email: "",
      company_name: "",
      country: "",
      phone_number: "",
      // is_msp: false, // defaulted to false to show an unchecked checkbox
      // number_of_employees: '',
      product_interest: "",
      how_heard_about_us: "",
      additional_comments: "",
    });
  };
  const onContactHandler = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const data: any = {
        first_name: form.first_name,
        last_name: form.last_name,
        work_email: form.work_email,
        company_name: form.company_name,
        country: form.country,
        phone_number: form.phone_number,
        product_interest: form.product_interest,
      };

      // Conditionally add how_heard_about_us if it is not empty
      if (form.how_heard_about_us) {
        data.how_heard_about_us = form.how_heard_about_us;
      }
      if (form.additional_comments) {
        data.additional_comments = form.additional_comments;
      }

      const res: any = await postFetcher(API_ROUTES.CONTACT_US, data);
      if (res.code === 200) {
        resetForm();
        toast.success("Your query has been submitted.");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(res.message || "An unexpected error occurred");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to Add user", error);
    } finally {
      setIsLoading(false);
      // setEmail('')
    }
  };

  const phoneNumberRegrex = /[^0-9]/g;
  return (
    <div className="nonprofitform">
      <h3 className="text-center mb-4">Get in touch with us!</h3>
      <form onSubmit={onContactHandler}>
        <div className="row">
          <div className="col-lg-6 my-2">
            <div className="">
              <label htmlFor="exampleInputEmail1" className="form-label">
                First Name <span>*</span>
              </label>
              <input
                onChange={onChangeHandler}
                required
                value={form?.first_name}
                name="first_name"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="col-lg-6 my-2">
            <div className="">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Last Name <span>*</span>
              </label>
              <input
                value={form?.last_name}
                onChange={onChangeHandler}
                required
                name="last_name"
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="col-lg-6 my-2">
            <div className="">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Work Email <span>*</span>
              </label>
              <input
                value={form?.work_email}
                onChange={onChangeHandler}
                name="work_email"
                required
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Work Email"
              />
            </div>
          </div>
          <div className="col-lg-6 my-2">
            <div className="">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Company Name <span>*</span>
              </label>
              <input
                value={form?.company_name}
                onChange={onChangeHandler}
                required
                name="company_name"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Type your Company Name"
              />
            </div>
          </div>
          <div className="col-lg-6 my-2">
            <div className="">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Country <span>*</span>
              </label>
              <select
                value={form.country}
                onChange={(e) => {
                  setForm((prev) => {
                    prev.country = e.target.value;
                    return { ...prev };
                  });
                }}
                required
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Select</option>
                {countries.map((item, index) => {
                  return (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-lg-6 my-2">
            <div className="">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Phone Number <span>*</span>
              </label>
              <input
                value={form.phone_number}
                onChange={phoneNumberHandler}
                name="phone_number"
                required
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Phone Number"
              />
            </div>
          </div>
          {/* <div className="col-lg-6 my-2">
                        <label
                            htmlFor="exampleInputEmail1"
                            className="form-label msplabel"
                        >   
                            Are you an MSP?<span>*</span>
                        </label>
                        <div className="form-check form-check-inline mspcontainer">
                            <input
                                checked={!form.is_msp}
                                onClick={(e: any) => {
                                    if (e.target.value == "option1") {
                                        setForm((prev) => {
                                            prev.is_msp = false
                                            return { ...prev }
                                        })
                                    }
                                    else {
                                        setForm((prev) => {
                                            prev.is_msp = true
                                            return { ...prev }
                                        })
                                    }
                                    ("e--->", e.target.value)
                                }}
                                required
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                            />
                            <label
                                className="form-check-label mspoptions"
                                htmlFor="inlineRadio1"
                            >
                                No
                            </label>
                        </div>
                        <div className="form-check form-check-inline mspcontainer">
                            <input
                                checked={form.is_msp}
                                onClick={(e: any) => {
                                    if (e.target.value == "option2") {
                                        setForm((prev) => {
                                            prev.is_msp = true
                                            return { ...prev }
                                        })
                                    }
                                    else {
                                        setForm((prev) => {
                                            prev.is_msp = false
                                            return { ...prev }
                                        })
                                    }
                                }}
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                            />
                            <label
                                className="form-check-label mspoptions"
                                htmlFor="inlineRadio2"
                            >
                                Yes
                            </label>
                        </div>
                    </div> */}
          {/* <div className="col-lg-6 my-2">
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Number of Employees <span>*</span>
                            </label>
                            <input
                                value={form?.number_of_employees}
                                onChange={onChangeHandler}
                                required
                                name="number_of_employees"
                                type="number"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Type number of employees"
                            />
                            <select
                                required
                                onChange={(e) => {
                                    setForm((prev) => {
                                        prev.number_of_employees = (e.target.value)
                                        return { ...prev }
                                    })
                                }}
                                className="form-select"
                                aria-label="Default select example"
                            >
                                <option selected>Select</option>
                                {['Self-employed', "1-10", '11-50', '51-200', '501-1000', '1001-5000', '5000-10000', '10,000+'].map((item, index) => {
                                    return <option value={item} key={index}>{item}</option>
                                })}
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div> */}
          <div className="col-lg-6 my-2">
            <div className="">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Product Interest <span>*</span>
              </label>
              <select
                value={form.product_interest}
                onChange={(e) => {
                  setForm((prev) => {
                    prev.product_interest = e.target.value;
                    return { ...prev };
                  });
                }}
                required
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Select</option>
                {[
                  "Startups",
                  "Solution for SMB`s",
                  "Dmarc Enterprise",
                  "Other Segment",
                ].map((item: any, index: any) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
                {/* <option value="2">Two</option>
                                <option value="3">Three</option> */}
              </select>
            </div>
          </div>
          <div className="col-lg-6 my-2">
            <div className="">
              <label htmlFor="exampleInputEmail1" className="form-label">
                How did you hear about us
              </label>

              <input
                value={form?.how_heard_about_us}
                onChange={onChangeHandler}
                name="how_heard_about_us"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="How did you hear about us"
              />
            </div>
          </div>
          <div className="col-lg-12 my-2">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Additional Comments
              </label>
              <textarea
                value={form?.additional_comments}
                onChange={onChangeHandler}
                name="additional_comments"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Message"
              />
            </div>
          </div>

          <div className="col-lg-12">
            <button className="btn">
              {isLoading ? "Please wait ..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default TalkToDmarc;

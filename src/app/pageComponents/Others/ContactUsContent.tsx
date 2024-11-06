"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import countries from "../../../../public/assets/countries.json";
import { postFetcher } from "@/@core/apiFetcher";
import VideoPlayer from "@/components/View/Videoplayer";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
  topic: Yup.string().required("Topic is required"),
  hear_about_us: Yup.string(),
  message: Yup.string(),
});

const ContactUsContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsLoading(true);

    if (!values.country) {
      toast.error("Please select country.");
      setIsLoading(false);
      return;
    }

    if (!values.topic) {
      toast.error("Please select topic.");
      setIsLoading(false);
      return;
    }

    try {
      const res: any = await postFetcher("/api/contact-us/", values);
      if (res.code === 200) {
        resetForm();
        toast.success("Your query has been submitted.");
      } else {
        toast.error(res.message || "An unexpected error occurred");
      }
    } catch (error) {
      console.error("Failed to submit form", error);
      toast.error("Failed to submit form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contactSection">
      <Container maxWidth="xl">
        <Grid item container spacing={3} className="contactvideosection">
          <Grid item xs={12} md={5} className="videoplaybtn">
            <h2 className="text-center">
              Need help getting started with yourDMARC?
            </h2>
            <h3>
              Watch this quick video to learn how to sign up and secure your
              domain in just a few easy steps. We&apos;ve made the process
              simple so you can protect your email quickly and effortlessly.
            </h3>
            <VideoPlayer video_name="getting-Started.mp4" />
            <div className="text-center">
              <a href="/signup" className="blink-soft">
                Secure Your Domain Now!
              </a>
            </div>
          </Grid>

          <Grid item xs={12} md={5} className="contactform">
            <Typography
              variant="h4"
              gutterBottom
              style={{ textAlign: "center", fontWeight: 700 }}
            >
              Get In Touch
            </Typography>

            <Formik
              initialValues={{
                name: "",
                email: "",
                country: "",
                topic: "",
                hear_about_us: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  <Grid item container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <label htmlFor="first_name" className="form-label">
                        Name<sup>*</sup>
                      </label>
                      <TextField
                        fullWidth
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <label htmlFor="first_name" className="form-label">
                        Company/Organisation Name<sup>*</sup>
                      </label>
                      <TextField
                        fullWidth
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <label htmlFor="topic" className="form-label">
                        Choose Topic<sup>*</sup>
                      </label>
                      <FormControl
                        fullWidth
                        error={touched.topic && Boolean(errors.topic)}
                      >
                        <Select
                          name="topic"
                          value={values.topic}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="contactselect"
                        >
                          <MenuItem value="">
                            <em>Select Topic</em>
                          </MenuItem>
                          <MenuItem value="DMARC Record">DMARC Record</MenuItem>
                          <MenuItem value="SPF Record">SPF Record</MenuItem>
                          <MenuItem value="DKIM Record">DKIM Record</MenuItem>
                          <MenuItem value="BIMI Record">BIMI Record</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                        <FormHelperText>
                          {touched.topic && errors.topic}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <label htmlFor="first_name" className="form-label">
                        Country<sup>*</sup>
                      </label>
                      <FormControl
                        fullWidth
                        error={touched.country && Boolean(errors.country)}
                      >
                        <Select
                          name="country"
                          value={values.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="contactselect"
                        >
                          <MenuItem value="">
                            <em>Select</em>
                          </MenuItem>
                          {countries.map((item, index) => (
                            <MenuItem key={index} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {touched.country && errors.country}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <label htmlFor="first_name" className="form-label">
                        Work Email<sup>*</sup>
                      </label>
                      <TextField
                        fullWidth
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <TextField
                        fullWidth
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rows={4}
                      />
                    </Grid>

                    <Grid item xs={12} textAlign="center">
                      <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        startIcon={isLoading && <CircularProgress size={20} />}
                      >
                        {isLoading ? "Sending..." : "Send"}
                      </Button>
                      <p className="submitterm">
                        By completing the Get In Touch form, you’ll receive
                        updates and expert insights from yourDMARC. For details
                        on how we manage your information, please see our
                        <a href="/privacy-policy">Privacy Policy.</a>
                      </p>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default ContactUsContent;

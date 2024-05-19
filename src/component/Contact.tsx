import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Define the validation schema
const validationSchema = Yup.object({
  yourName: Yup.string().required("Name is required"),
  yourEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  yourService: Yup.string().required("Service is required"),
  yourMessage: Yup.string().min(10),
});

const Contact = ({ restBase }: { restBase: string }) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    touched,
    isSubmitting,
    status,
  } = useFormik({
    initialValues: {
      yourName: "",
      yourEmail: "",
      yourService: "",
      yourMessage: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      const data = new FormData();
      data.append("yourName", values.yourName);
      data.append("yourEmail", values.yourEmail);
      data.append("yourService", values.yourService);
      data.append("yourMessage", values.yourMessage);

      try {
        const response = await fetch(
          `https://riteshmaharjan.com/webtech/wp-json/contact-form-7/v1/contact-forms/30/feedback`,
          {
            method: "POST",
            body: data,
          }
        );

        const result = await response.json();
        if (result.status === "mail_sent") {
          setStatus("Form submitted successfully!");
          resetForm();
        } else {
          setStatus("Failed to submit the form.");
        }
      } catch (error) {
        setStatus("An error occurred. Please try again later.");
      }

      setSubmitting(false);
    },
  });

  return (
    <div className="max-width flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="yourName">Your name</label>
          <input
            type="text"
            name="yourName"
            id="yourName"
            autoComplete="name"
            value={values.yourName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.yourName && errors.yourName ? (
            <div className="error">{errors.yourName}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="yourEmail">Your email</label>
          <input
            type="email"
            name="yourEmail"
            id="yourEmail"
            autoComplete="email"
            value={values.yourEmail}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.yourEmail && errors.yourEmail ? (
            <div className="error">{errors.yourEmail}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="yourService">Select a service</label>
          <select
            name="yourService"
            id="yourService"
            value={values.yourService}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="" label="Select a service" />
            <option value="Web Development" label="Web Development" />
            <option value="SEO" label="SEO" />
            <option value="Logo Design" label="Logo Design" />
            <option value="UI/UX Design" label="UI/UX Design" />
          </select>
          {touched.yourService && errors.yourService ? (
            <div className="error">{errors.yourService}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="yourMessage">Your message</label>
          <textarea
            name="yourMessage"
            id="yourMessage"
            value={values.yourMessage}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.yourMessage && errors.yourMessage ? (
            <div className="error">{errors.yourMessage}</div>
          ) : null}
        </div>

        <div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
};

export default Contact;

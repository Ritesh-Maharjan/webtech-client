import React, { forwardRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Icon, _api } from "@iconify/react/dist/iconify.js";
import formatPhoneNumber from "../helperfunc";

interface ContactData {
  contactforminfo: string;
  phonenumber: number;
  email: string;
  facebook: string;
  instagram: string;
}

// Define the validation schema
const validationSchema = Yup.object({
  yourName: Yup.string().required("Name is required"),
  yourEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  yourService: Yup.string().required("Service is required"),
  yourMessage: Yup.string().required("Message is requried").min(10),
});

const Contact = forwardRef<HTMLDivElement, { restBase: string }>(
  ({ restBase }, ref) => {
    const [acfData, setAcfData] = useState<ContactData>();
    useEffect(() => {
      const fetchContactData = async () => {
        try {
          const response = await fetch(`${restBase}pages/30`);
          const data = await response.json();
          setAcfData(data.acf);
        } catch (err) {
          console.log(err);
        }
      };

      fetchContactData();
    }, []);

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
        data.append("_wpcf7_unit_tag", "42");

        try {
          const response = await fetch(
            `https://riteshmaharjan.com/webtech/wp-json/contact-form-7/v1/contact-forms/42/feedback`,
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
      <section
        ref={ref}
        id="contact"
        className="max-width overflow-auto h-fit lg:h-screen pb-32 lg:pb-0"
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 justify-between my-5 md:my-12">
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <div className="flex flex-col gap-2 lg:px-4">
            <h3 className="font-bold">Our Social Media</h3>
            <div className="flex gap-4">
              <a className="h-6" href={acfData?.instagram} target="_blank">
                <Icon icon="skill-icons:instagram" height={"100%"} />
              </a>
              <a className="h-6" href={acfData?.facebook} target="_blank">
                <Icon icon="logos:facebook" height={"100%"} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-32 mt-14 lg:mt-0 lg:px-10 lg:h-[70vh] lg:items-center">
          <div className="flex-1 flex gap-10 flex-col">
            <p>{acfData?.contactforminfo}</p>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
              <span className="flex gap-2 items-center">
                <Icon icon="iconoir:mail" height={"30px"} />
                {acfData?.email}
              </span>
              <span className="flex gap-2 items-center">
                <Icon icon="solar:phone-outline" height={"25px"} />
                {acfData?.phonenumber &&
                  formatPhoneNumber(acfData?.phonenumber)}
              </span>
            </div>
          </div>

          <form
            className="flex-1 flex gap-8 pr-10 flex-col h-fit"
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl lg:text-2xl font-bold">
              Lets Work Together
            </h3>
            <div>
              <label className="sr-only" htmlFor="yourName">
                Your Name
              </label>
              <input
                className="focus:outline-none bg-transparent border-b-2 w-full"
                type="text"
                name="yourName"
                id="yourName"
                placeholder="Your Name"
                autoComplete="name"
                value={values.yourName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.yourName && errors.yourName ? (
                <div className="text-red-400 my-2">{errors.yourName}</div>
              ) : null}
            </div>

            <div>
              <label className="sr-only" htmlFor="yourEmail">
                Your Email
              </label>
              <input
                className="focus:outline-none bg-transparent border-b-2 w-full"
                type="email"
                name="yourEmail"
                id="yourEmail"
                placeholder="Your Email"
                autoComplete="email"
                value={values.yourEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.yourEmail && errors.yourEmail ? (
                <div className="text-red-400 my-2">{errors.yourEmail}</div>
              ) : null}
            </div>

            <div>
              <label className="sr-only" htmlFor="yourService">
                Select a service
              </label>
              <select
                className="focus:outline-none bg-black border-b-2 w-full"
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
                <div className="text-red-400 my-2">{errors.yourService}</div>
              ) : null}
            </div>

            <div>
              <label className="sr-only" htmlFor="yourMessage">
                Your Message
              </label>
              <textarea
                className="focus:outline-none bg-transparent border-b-2 w-full h-7"
                name="yourMessage"
                id="yourMessage"
                value={values.yourMessage}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your Message"
              />
              {touched.yourMessage && errors.yourMessage ? (
                <div className="text-red-400 my-2">{errors.yourMessage}</div>
              ) : null}
            </div>

            <div>
              <button
                className="bg-yellow-500 py-1 px-2"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
            {status && <p>{status}</p>}
          </form>
        </div>
      </section>
    );
  }
);

export default Contact;

import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { FaUserAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ImageFallback from "./components/ImageFallback";
import React, { useRef, useState } from "react";
//import  useState from "react"
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = ({ data }) => {
  const [selected, setSelected] = React.useState(new Set(["Instagram"]));
  const [sendButtonHovered, setSendButtonHovered] = useState(false);
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const { frontmatter } = data;
  const { title, paragrph, form_action, phone, mail, location } = frontmatter;
  const form = useRef();
  var GoogleCapcha = false;
  //Show Alert of successfull/ or failed
  const AlertSuccess = () => {
    Swal.fire({
      title: "<h3 style='color:#0e0e0e'>" + "Sweet!" + "</h3>",
      icon: "success",
      text: "Thank you for reaching out to us! Our Auto Review Booster team will be in touch with you shortly.",
      imageUrl: "./images/ThanksMessage.gif",
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: "Custom image",
      timer: 8000,
      iconposition: "buttom",
    });
  };

  const AlertFail = () => {
    Swal.fire({
      icon: "error",
      title: "<h3 style='color:#0e0e0e'>" + "Oops..." + "</h3>",
      text: "Something went wrong!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
  };

  const AlertGooglerecapcha = () => {
    Swal.fire({
      title:
        "<h3 style='color:#0e0e0e'>" +
        "Please click the " +
        " <span style='color:#ef4444'><br/>  I'm not a robot checkbox" +
        "</span> <br/> " +
        "to submit the form." +
        "</h3>",
      icon: "warning",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };
  //Google Recapcha
  const onChange = () => {
    GoogleCapcha = true;
  };
  const sendEmail = (e) => {
    if (GoogleCapcha) {
      e.preventDefault();
      // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_CE_Emailjs_SERVICE_ID,
          process.env.NEXT_PUBLIC_CE_Emailjs_TEMPLATE_ID,
          form.current,
          process.env.NEXT_PUBLIC_CE_Emailjs_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
            AlertSuccess();
            // reset the form after submit
            e.target.reset();
          },
          (error) => {
            AlertFail();
            console.log(error.text);
          }
        );
    } else {
      AlertGooglerecapcha();
      e.preventDefault();
    }
  };
  return (
    <section className="section lg:mt-16">
      <div className="container">
        <div className="row relative pb-16">
          <ImageFallback
            className="-z-[1] object-cover object-top"
            src={"/images/map.svg"}
            fill="true"
            alt="map bg"
            priority={true}
          />
          <div className="lg:col-6">
            {markdownify(
              title,
              "h1",
              "h1 my-10 lg:my-11 lg:pt-11 text-center lg:text-left lg:text-[64px]"
            )}
            <p>{paragrph}</p>
          </div>
          <div className="contact-form-wrapper rounded border border-border p-6 lg:col-6 dark:border-darkmode-border">
            <h2>
              Send Us A
              <span className="text-red ml-1.5 inline-flex  items-center text-red-500">
                Message
                <BsArrowRightShort />
              </span>
            </h2>
            <form
              className="contact-form mt-12"
              ref={form}
              onSubmit={sendEmail}
            >
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="name">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>Your Name</div>
                    <div>
                      <small className="font-secondary text-sm text-red-500">
                        *
                      </small>
                    </div>
                  </div>
                </label>
                <input
                  className="form-input w-full"
                  name="from_name"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="email">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>

                    <div>Phone</div>
                    <div>
                      <small className="font-secondary text-sm text-red-500">
                        *
                      </small>
                    </div>
                  </div>
                </label>
                <input
                  className="form-input w-full"
                  name="from_phone"
                  type="number"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="email">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>Email Address</div>
                    <div>
                      <small className="font-secondary text-sm text-red-500">
                        *
                      </small>
                    </div>
                  </div>
                </label>
                <input
                  className="form-input w-full"
                  name="from_email"
                  type="email"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="name">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>Business Name (if applicable, please provide):</div>
                  </div>
                </label>
                <input
                  className="form-input w-full"
                  name="from_BusinessName"
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="name">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      Business Address (if applicable, please provide):{" "}
                    </div>
                  </div>
                </label>
                <input
                  className="form-input w-full"
                  name="from_Address"
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="message">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>
                    </div>
                    <div>How can we assist you? </div>
                    <div>
                      <small className="font-secondary text-sm text-red-500">
                        *
                      </small>
                    </div>
                  </div>
                </label>
                <textarea
                  name="message"
                  className="form-textarea w-full"
                  placeholder=""
                  required
                  rows="7"
                />
              </div>
              <div className="mb-6 hover:cursor-pointer">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_CE_GOOGLECAPCHA_SITEKEY}
                  onChange={onChange}
                />
              </div>

              <input
                onMouseEnter={() => setSendButtonHovered(true)}
                onMouseLeave={() => setSendButtonHovered(false)}
                style={{
                  background: sendButtonHovered ? "#be232f" : "#7f1d1d",
                }}
                className="btn btn-primary"
                type="submit"
                value="Send Your Email ➤"
              />
            </form>
            {/*
             */}
          </div>
        </div>
        <div className="row">
          {phone && (
            <div className="md:col-6 lg:col-4">
              <Link
                href={`tel:${phone}`}
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-red-600 dark:border-darkmode-border"
              >
                <FaUserAlt />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {phone}
                </p>
              </Link>
            </div>
          )}
          {mail && (
            <div className="md:col-6 lg:col-4">
              <Link
                href={`mailto:${mail}`}
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-red-600 dark:border-darkmode-border"
              >
                <FaEnvelope />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {mail}
                </p>
              </Link>
            </div>
          )}
          {location && (
            <div className="md:col-6 lg:col-4">
              <span
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-red-600 dark:border-darkmode-border"
              >
                <FaMapMarkerAlt />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {location}
                </p>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;

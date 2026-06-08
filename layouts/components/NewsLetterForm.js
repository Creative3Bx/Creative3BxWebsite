import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { sendContactEmail } from "../../layouts/sendEmail";

function CustomForm({ status, message, onValidated }) {
  // onValidated is kept for Mailchimp
  const [email, setEmail] = useState("");
  const [localStatus, setLocalStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || email.indexOf("@") === -1) {
      setErrorMessage("Please enter a valid email address.");
      setLocalStatus("error");
      return;
    }

    setLocalStatus("sending");
    setErrorMessage("");

    try {
      const result = await sendContactEmail({
        from_email: email,
        source: "newsletter",
      });

      if (result.success) {
        setLocalStatus("success");
        resetForm();
        // Maintain compatibility with parent wrappers (like Mailchimp)
        onValidated && onValidated({ EMAIL: email });
      } else {
        setErrorMessage(result.error || "An unknown error occurred.");
        setLocalStatus("error");
      }
    } catch (err) {
      setErrorMessage("Could not connect to the server. Please try again.");
      setLocalStatus("error");
    }
  };

  // Prioritize local status for immediate feedback, but fall back to prop status
  const displayStatus = localStatus || status;
  // Use the message from Mailchimp if it's an error and we don't have a local one
  const displayMessage =
    errorMessage ||
    (typeof message === "string" ? message.replace(/<[^>]*>?/gm, "") : "");

  return (
    <>
      <form action="#" className="py-6" onSubmit={handleSubmit}>
        <fieldset className="relative">
          <input
            className="newsletter-input form-input h-12 w-full rounded-3xl border-none bg-theme-light px-5 py-3 pr-12 text-dark placeholder:text-xs dark:bg-darkmode-theme-dark "
            type="text"
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope
            className="absolute right-5 top-1/2 -translate-y-1/2 text-xl transition duration-75"
            style={{ zIndex: "-1" }}
          />
        </fieldset>
        <button className="d-block  btn btn-primary mt-4 w-full" type="submit">
          Subscribe
        </button>
      </form>
      {displayStatus === "sending" && (
        <div className="mt-4 text-red-700">sending...</div>
      )}
      {displayStatus === "error" && (
        <div className="mt-4 text-red-700">
          {displayMessage || "An error occurred. Please try again."}
        </div>
      )}
      {displayStatus === "success" && (
        <div className="mt-4 text-red-600">Subscribed !</div>
      )}
    </>
  );
}

export default CustomForm;

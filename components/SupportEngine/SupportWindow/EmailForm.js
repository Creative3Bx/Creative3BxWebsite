import React, { useState, useRef } from "react";
import { styles } from "../styles";
import stylesStartBtn from "../../../styles/genralstyles.module.css";

// we must install npm install @ant-design/icons

import { LoadingOutlined } from "@ant-design/icons";
import Avatar from "../Avatar";
import { sendContactEmail } from "../../../layouts/sendEmail";

const EmailForm = (props) => {
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const form = useRef();

  const sendSupportNotification = async (statusSource) => {
    const payload = {
      from_name: firstName,
      from_email: email,
      from_phone: phone,
      message:
        statusSource === "live_chat_failure"
          ? "Initial Support Contact - Chatwoot Identification Failed."
          : "User started a live chat session via Support Window.",
      source: statusSource,
    };

    // Silent backup call
    await sendContactEmail(payload);
  };

  function validateEmail(email) {
    const providerPattern =
      /@(gmail|yahoo|hotmail|aol|icloud|zoho|protonmail|mail|gmx|yandex)\./;
    const tldPattern =
      /\.(com|net|org|edu|gov|mil|co|io|me|info|[a-z]{2}\.[a-z]{2}|[a-z]{2,})$/i;
    return providerPattern.test(email) && tldPattern.test(email);
  }

  async function handleSubmit(event) {
    if (event) event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setEmailError("");

    try {
      if (window.$chatwoot) {
        // 1. Identify user in Chatwoot
        window.$chatwoot.setUser(email, {
          email: email,
          name: firstName,
          phone_number: phone,
        });
        // 2. Open Chatwoot Widget
        window.$chatwoot.toggle("open");
        // 3. Send Success Notification Email
        await sendSupportNotification("live_chat_success");
        // 4. Signal parent to close our custom EmailForm window
        if (props.onComplete) props.onComplete();
      }
    } catch (e) {
      setEmailError(
        "Could not connect to live chat. Your message has been sent to our support team via email instead."
      );
      // Send a backup notification email only on error. This is our "log".
      await sendSupportNotification("live_chat_failure");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        ...styles.emailFormWindow,
        ...{
          height: props.visible ? "100%" : "0px",
          opacity: props.visible ? "1" : "0",
        },
      }}
    >
      <div style={{ height: "0px" }}>
        <div style={styles.stripe} />
      </div>

      <div
        className="transition-5"
        style={{
          ...styles.loadingDiv,
          ...{ zIndex: loading ? "10" : "-1", opacity: loading ? "0.33" : "0" },
        }}
      />
      <LoadingOutlined
        className="transition-5"
        style={{
          ...styles.loadingIcon,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "1" : "0",
            fontSize: "82px",
            top: "calc(50% - 41px)",
            left: "calc(50% - 41px)",
          },
        }}
      />
      {/* lets build the form inside the chatWindow */}
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar
          isWindowVisible={props.visible}
          avatar={props.avatar}
          style={{
            position: "relative",
            left: "calc(50% - 44px)",
            top: "10%",
          }}
        />
        <div style={styles.topText}>
          Welcome 👋
          <br /> How can we help you ?
        </div>

        <form
          ref={form}
          onSubmit={(e) => handleSubmit(e)}
          style={{ position: "relative", width: "100%", top: "16%" }}
        >
          <input
            style={styles.emailInput}
            onChange={(e) => setfirstName(e.target.value.toLowerCase())}
            placeholder="Your Name"
            type="text"
            name="from_name"
            required
          />
          <input
            style={styles.emailInput}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            placeholder="Your Email"
            type="email"
            name="from_email"
            required
          />
          <input
            style={styles.emailInput}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number (Optional)"
            type="text"
            name="from_phone"
          />

          {emailError && <div style={styles.errorEmailForm}>{emailError}</div>}

          <div
            style={
              emailError
                ? { ...styles.bottomText, marginTop: "-15px" }
                : styles.bottomText
            }
          >
            Enter details to get started
          </div>

          <button
            type="button"
            style={
              emailError
                ? { ...styles.submitButton, marginTop: "-40px" }
                : styles.submitButton
            }
            className={stylesStartBtn.startButton}
            onClick={(e) => {
              if (form.current.reportValidity()) {
                handleSubmit(e);
              }
            }}
          >
            <span className={stylesStartBtn.startText}>send message</span>
            <span className={stylesStartBtn.startIcon}>
              <svg
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                data-icon="paper-plane"
                width="20px"
                aria-hidden="true"
              >
                <path
                  d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;

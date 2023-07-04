import React, { useState, useRef } from "react";
import { styles } from "../styles";
import stylesStartBtn from "../../../styles/genralstyles.module.css";

// we must install npm install @ant-design/icons

import { LoadingOutlined } from "@ant-design/icons";
import Avatar from "../Avatar";
import axios from "axios";
import emailjs from "@emailjs/browser"; // npm install @emailjs/browser

const EmailForm = (props) => {
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_CE_Emailjs_SERVICE_ID,
      process.env.NEXT_PUBLIC_CE_Emailjs_TEMPLATE_ID,
      form.current,
      process.env.NEXT_PUBLIC_CE_Emailjs_PUBLIC_KEY
    );
  };
  function getOrCreateUser(callback) {
    axios
      .put(
        "https://api.chatengine.io/users/",
        { username: email, email: email, secret: email, first_name: firstName },
        { headers: { "Private-Key": process.env.NEXT_PUBLIC_CE_PRIVATE_KEY } }
      )
      .then((r) => callback(r.data))
      .catch((e) => console.log("Get or create user error", e));
  }

  function getOrCreateChat(callback) {
    //  const message='Welcome to chat support , how can we help you today?'
    axios
      .put(
        "https://api.chatengine.io/chats/",
        { usernames: [email, "Rami Tech Support"], is_direct_chat: true },
        {
          headers: {
            "Project-ID": process.env.NEXT_PUBLIC_CE_PROJECT_ID,
            "User-Name": email,
            "User-Secret": email,
          },
        }
      )
      .then((r) => callback(r.data))
      .catch((e) => console.log("Get or create chat error", e));
  }
  function validateEmail(email) {
    const providerPattern =
      /@(gmail|yahoo|hotmail|aol|icloud|zoho|protonmail|mail|gmx|yandex)\./;
    const tldPattern =
      /\.(com|net|org|edu|gov|mil|co|io|me|info|[a-z]{2}\.[a-z]{2}|[a-z]{2,})$/i;
    return providerPattern.test(email) && tldPattern.test(email);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setLoading(true);
      //sendEmail();
    }

    //Now we need to call API function calls whenw e get a new email entered in chat box
    getOrCreateUser((user) => {
      props.setUser && props.setUser(user);
      getOrCreateChat((chat) => {
        setLoading(false);
        props.setChat && props.setChat(chat);
      });
    });
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
          style={{ position: "relative", width: "100%", top: "19.75%" }}
        >
          <input
            style={styles.emailInput}
            onChange={(e) => setfirstName(e.target.value.toLowerCase())}
            placeholder="Your Name"
            type="text"
            required
          />
          <input
            style={styles.emailInput}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            placeholder="Your Email"
            type="email"
            required
          />
          <br />
          {emailError && <div style={styles.errorEmailForm}>{emailError}</div>}
          <div
            className="rounded-md bg-gray-100 px-6 py-4 text-lg shadow-md md:px-8 md:py-6 md:text-base lg:px-10 lg:py-8 lg:text-lg "
            style={
              emailError
                ? { ...styles.bottomText, marginTop: "-20px" }
                : styles.bottomText
            }
          >
            <p class="text-center leading-normal md:leading-snug">
              Enter your name and email to get started
            </p>
          </div>
          <button
            type="button"
            style={
              emailError
                ? { ...styles.submitButton, marginTop: "-50px" }
                : styles.submitButton
            }
            className={stylesStartBtn.startButton}
            onClick={(e) => {
              if (form.current.reportValidity()) {
                handleSubmit(e);
                //sendEmail();
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
         
          {/* <input tyle={styles.bottomText} type="button" value="X" /> */}
        </form>
      </div>
    </div>
  );
};

export default EmailForm;

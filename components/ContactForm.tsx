"use client";

import { FormEvent, useState } from "react";
import "react-phone-number-input/style.css";
import Input from "react-phone-number-input/input";
import { isValidPhoneNumber, Value } from "react-phone-number-input";
import Toast from "components/Toast";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState<Value>();
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [overallError, setOverallError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");
  const SUBMIT_ENDPOINT = "send-mail";

  const OVERALL_DATA_ERROR =
    "Please enter a message and one way to contact you";
  const SUCESS_MESSAGE =
    "Your message was sent. Thanks for your interest! I'll contact you asap.";
  const FAILURE_MESSAGE =
    "Our server had a problem sending your message. Please contact me directly at <a href='mailto:teamtedtile@comcast.net'> teamtedtile@comcast.net </a>. Sorry for the inconvenience.";

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!isValidEmail(event.currentTarget.value)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError(null);
    }
    setEmail(event.currentTarget.value);
  };
  const handlePhoneBlur = (event: React.FormEvent<HTMLInputElement>) => {
    if (!telephone || !isValidPhoneNumber(telephone)) {
      setPhoneError("Phone is invalid");
    } else {
      setPhoneError(null);
    }
  };

  const closeToast = () => {
    setToastMessage("");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validPhone = telephone && isValidPhoneNumber(telephone);
    const validEmail = email && isValidEmail(email);

    if (!validPhone && !validEmail) {
      setOverallError(OVERALL_DATA_ERROR);
      return;
    }
    if (!message) {
      setOverallError(OVERALL_DATA_ERROR);
      return;
    }

    const response = await fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        email,
        telephone,
        message,
      }),
    }).catch((e) => {
      setToastMessage(FAILURE_MESSAGE);
      return null;
    });

    if (!response?.ok) {
      setToastMessage(FAILURE_MESSAGE);
      return;
    }

    const data = await response.json();

    if (data.success) {
      setToastMessage(SUCESS_MESSAGE);
    } else {
      setToastMessage(FAILURE_MESSAGE);
    }
  };

  return (
    <>
      <form id="contactForm" noValidate onSubmit={onSubmit}>
        <input
          name="email"
          className="optional-group"
          placeholder="Email address"
          onChange={handleEmailChange}
        />
        {emailError && <p>{emailError}</p>}
        <Input
          country={"US"}
          international={false}
          placeholder="Enter phone number"
          value={telephone}
          onChange={setTelephone}
          onBlur={handlePhoneBlur}
          maxLength={16}
        />
        {phoneError && <p>{phoneError}</p>}
        <textarea
          name="message"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">SEND</button>
        {overallError && <p>{overallError}</p>}
      </form>
      <Toast message={toastMessage} handleButtonClick={closeToast} />
    </>
  );
}

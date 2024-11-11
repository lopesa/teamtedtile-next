"use client";

import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import Toast from "components/Toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "styles/Contact.module.scss";
import Script from "next/script";

type Inputs = {
  email: string;
  phone: string;
  clientMessage: string;
};

export default function Contact() {
  const [overallError, setOverallError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");
  const SUBMIT_ENDPOINT = "send-mail";
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const OVERALL_DATA_ERROR =
    "Please enter a message and at least one way to contact you";
  const SUCESS_MESSAGE =
    "Your message was sent. Thanks for your interest! I'll contact you asap.";
  const FAILURE_MESSAGE =
    "Our server had a problem sending your message. Please contact me directly at <a href='mailto:teamtedtile@comcast.net'> teamtedtile@comcast.net </a>. Sorry for the inconvenience.";

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const closeToast = () => {
    setToastMessage("");
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const validPhone = data.phone && isValidPhoneNumber(data.phone);
    const validEmail = data.email && isValidEmail(data.email);

    if (!validPhone && !validEmail) {
      setOverallError(OVERALL_DATA_ERROR);
      return;
    }
    if (!data.clientMessage) {
      setOverallError(OVERALL_DATA_ERROR);
      return;
    }

    const response = await fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        telephone: data.phone,
        message: data.clientMessage,
        // @ts-ignore
        // clientID: gaGlobal?.vid ?? "",
      }),
    }).catch((e) => {
      setToastMessage(FAILURE_MESSAGE);
      return null;
    });

    if (!response?.ok) {
      setToastMessage(FAILURE_MESSAGE);
      return;
    }

    const responseData = await response.json();

    if (responseData.success) {
      setToastMessage(SUCESS_MESSAGE);
    } else {
      setToastMessage(FAILURE_MESSAGE);
    }
  };

  return (
    <>
      <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          className="optional-group"
          placeholder="Email"
          defaultValue=""
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          data-cy="email-input"
        />
        {errors.email && (
          <p className={styles.error}>{`${errors.email.message}`}</p>
        )}

        <Controller
          name="phone"
          control={control}
          rules={{
            validate: (value) => value && isValidPhoneNumber(value),
          }}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              value={value}
              onChange={onChange}
              country="US"
              id="phone"
              placeholder="Phone"
              data-cy="phone-input"
            />
          )}
        />
        {errors["phone"] && <p className={styles.error}>Invalid Phone</p>}

        <input
          placeholder="Message"
          defaultValue=""
          {...register("clientMessage", { required: true })}
          data-cy="message-input"
        />

        <input
          type="submit"
          className={`${styles["submit-button"]} ${isValid && styles.valid}`}
          data-cy="submit-button"
        />

        {overallError && <p className={styles.error}>{overallError}</p>}
      </form>
      <Toast message={toastMessage} handleButtonClick={closeToast} />
    </>
  );
}

import HomeSplash from "components/homeSplash";
import Overlay from "components/overlay";
import OverlayImageHeader from "components/OverlayImageHeader";
import { FormEvent, useState } from "react";
import styles from "styles/Contact.module.scss";
import "react-phone-number-input/style.css";
import Input from "react-phone-number-input/input";
import { isValidPhoneNumber, Value } from "react-phone-number-input";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState<Value>();
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [overallError, setOverallError] = useState<string | null>(null);
  const SUBMIT_ENDPOINT = "api/send-mail";
  const OVERALL_DATA_ERROR =
    "Please enter a message and one way to contact you";
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

    debugger;

    const response = await fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        email,
        telephone,
        message,
      }),
    }).catch((e) => {
      // console.error(e);
      return null;
    });

    if (!response?.ok) {
      // setOverallError("Something went wrong. Please try again later.");
      // failure toast
      return;
    }

    const data = await response.json();
    if (data === "success") {
      // success toast
    } else {
      // failure toast
    }
  };
  return (
    <>
      <Overlay>
        <OverlayImageHeader
          backgroundImage="/images/IMG_0032FLAT-WEB-crop.jpg"
          backgroundPosition="50% 55%"
          backgroundSize="120%"
          copyright="Ruth Hyndman Design"
          title="contact"
        />
        <div className={`overlay-body ${styles.contactContainer}`}>
          <p>
            Team Ted Tile is always interested in hearing from you. Drop me a
            note today!
          </p>
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
              maxlength={16}
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
          <div className={styles.toastHolder}>
            <div className={styles.toast}>
              <p></p>
              <div className={styles.buttonRow}>
                <div className={styles.button}>&times;</div>
              </div>
            </div>
          </div>
        </div>
      </Overlay>
      <HomeSplash />
    </>
  );
}

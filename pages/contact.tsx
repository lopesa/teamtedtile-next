import HomeSplash from "components/homeSplash";
import Overlay from "components/overlay";
import OverlayImageHeader from "components/OverlayImageHeader";
import { FormEvent, useState } from "react";
import styles from "styles/Contact.module.scss";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
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
              type="email"
              name="email"
              className="optional-group"
              placeholder="Email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="telephone"
              name="telephone"
              className="optional-group"
              placeholder="Telephone Number"
              onChange={(e) => setTelephone(e.target.value)}
            />
            <textarea
              name="message"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">SEND</button>
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

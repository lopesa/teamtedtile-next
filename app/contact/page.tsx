import HomeSplash from "components/homeSplash";
import Overlay from "components/overlay";
import OverlayImageHeader from "components/OverlayImageHeader";
import styles from "styles/Contact.module.scss";
import "react-phone-number-input/style.css";
import { Metadata } from "next";
import ContactForm from "@components/ContactForm";

export const metadata: Metadata = {
  title: "Team Ted Tile -- Contact ",
  description: "Contact Team Ted Tile",
};

export default function Contact() {
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
          <ContactForm />
        </div>
      </Overlay>
      <HomeSplash />
    </>
  );
}

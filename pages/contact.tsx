import HomeSplash from "components/homeSplash";
import Overlay from "components/overlay";
import OverlayImageHeader from "components/OverlayImageHeader";

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
      </Overlay>
      <HomeSplash />
    </>
  );
}

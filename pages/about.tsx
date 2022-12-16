import HomeSplash from "../components/homeSplash";
import Overlay from "../components/overlay";
import OverlayImageHeader from "../components/OverlayImageHeader";
import styles from "../styles/about.module.scss";

export default function About() {
  return (
    <>
      <Overlay>
        <OverlayImageHeader
          backgroundImage="/images/ted_calvert_at_work.jpg"
          backgroundPosition="initial 40%"
          backgroundSize="cover"
          copyright="Ruth Hyndman Design"
          title="about"
        />
      </Overlay>
      <HomeSplash />
    </>
  );
}

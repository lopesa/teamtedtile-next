import { useEffect, useState } from "react";
import styles from "./homeSplash.module.scss";
import Image from "next/image";
import TILES_DOWN_ARROW from "../public/images/homesplash-tiles-downarrow.svg";

// interface Props {
// }

// function WorkItem({ item, alignment, onClick }: Props) {
function HomeSplash() {
  // const [smallScreen, setSmallScreen] = useState(false)

  // useEffect(() => {
  //     // do once on load
  // }, [])
  return (
    <section className={styles.homeSplashContainer}>
      <div className={styles.topRow}>
        <div className={styles.one}>
          <h1>Team Ted Tile</h1>
          <div className={styles.container}>
            {/* <a href="gallery" data-navigo> */}
            <a href="gallery">
              <div className={styles.downArrow}></div>
            </a>
            <h4>Professional Tile Installer</h4>
          </div>
          <p>Bay Area, California since before 2000</p>
        </div>
        <div className={styles.two}>
          <div className="copyright">Photo &copy; Ruth Hyndman Design</div>
          <div className={styles.overlay}></div>
          <div className={styles.text}>
            <p>Bay Area, California</p>
            <p>since before 2000</p>
          </div>
        </div>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.one}>
          <div className="copyright">Photo &copy; Ruth Hyndman Design</div>
        </div>
        <div className={styles.two}>
          <div className="copyright">Photo &copy; Ruth Hyndman Design</div>
          <div className={styles.overlay}></div>
        </div>
      </div>
      <div className={styles.phoneBottomRow}>
        <div className={styles.one}>
          <div className="copyright">Photo &copy; Ruth Hyndman Design</div>
        </div>
        <div className={styles.two}>
          <div className="copyright">Photo &copy; Ruth Hyndman Design</div>
        </div>
      </div>
    </section>
  );
}

export default HomeSplash;

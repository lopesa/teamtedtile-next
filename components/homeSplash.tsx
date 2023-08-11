import styles from "styles/homeSplash.module.scss";
import Link from "next/link";

function HomeSplash() {
  return (
    <section className={styles.homeSplashContainer}>
      <div className={styles.topRow}>
        <div className={styles.one}>
          <h1>Team Ted Tile</h1>
          <div className={styles.container}>
            <Link href="/gallery" prefetch={false}>
              <div className={styles.downArrow}></div>
            </Link>
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

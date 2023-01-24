import styles from "styles/BusinessCard.module.scss";
import Image from "next/image";
import TTT_Logo from "public/images/ttt_logo.png";
function BusinessCard() {
  return (
    <div className={styles.businessCard}>
      <div className={styles.cardContainer}>
        <div className={styles.imageHolder}>
          <Image src={TTT_Logo} alt="Team Ted Tile Logo" fill={true} />
        </div>
        <div className={styles.copy}>
          <div className={`${styles.ital} ${styles.large}`}>
            <div className={styles.head}>
              Bay&nbsp;Area,&nbsp;California
              <br />
              Since&nbsp;before&nbsp;2000
            </div>
            <p className={styles.small}>license #814515</p>
          </div>
          <div className={styles.bold}>
            <p>
              James&nbsp;<span>&ldquo;Ted&rdquo;</span>&nbsp;Calvert
            </p>
            <p>Pacifica, CA</p>
            <p className={styles.small}>
              <a id="mailLink" href="mailto:teamtedtile@comcast.net">
                teamtedtile@comcast.net
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;

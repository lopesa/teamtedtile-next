import Link from "next/link";
import styles from "../styles/menu.module.scss";

function Menu() {
  return (
    <div className={styles.menuContainer}>
      <Link className={styles.category} href="/gallery">
        Gallery
      </Link>
      <Link className={styles.category} href="/about">
        About
      </Link>
      <Link className={styles.category} href="/contact">
        Contact
      </Link>
      <div className={styles.social}>
        <a>
          <div className={styles.facebook}></div>
        </a>
        <a>
          <div className={styles.twitter}></div>
        </a>
      </div>
    </div>
  );
}

export default Menu;

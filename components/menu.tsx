import Link from "next/link";
import styles from "../styles/menu.module.scss";
import ActiveLink from "./activeLink";

export default function Menu() {
  return (
    <nav className={styles.menuContainer}>
      <ul>
        <li>
          <ActiveLink
            activeClassName={styles.active}
            className={styles.category}
            href="/gallery"
          >
            Gallery
          </ActiveLink>
        </li>
        <li>
          <ActiveLink
            activeClassName={styles.active}
            className={styles.category}
            href="/about"
          >
            About
          </ActiveLink>
        </li>
        <li>
          <ActiveLink
            activeClassName={styles.active}
            className={styles.category}
            href="/contact"
          >
            Contact
          </ActiveLink>
        </li>
      </ul>
      <div className={styles.social}>
        <a>
          <div className={styles.facebook}></div>
        </a>
        <a>
          <div className={styles.twitter}></div>
        </a>
      </div>
    </nav>
  );
}

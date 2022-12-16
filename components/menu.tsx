import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from "../styles/menu.module.scss";
import ActiveLink from "./activeLink";

type MenuProps = {
  backgroundColor?: string;
};

export default function Menu({
  backgroundColor,
}: PropsWithChildren<MenuProps>) {
  return (
    <nav
      className={styles.menuContainer}
      style={{ backgroundColor: backgroundColor }}
    >
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

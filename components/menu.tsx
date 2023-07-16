"use client";

import { PropsWithChildren, useState } from "react";
import styles from "styles/menu.module.scss";
import ActiveLink from "./activeLink";
import PageScrollSpy from "./PageScrollSpy";

type MenuProps = {
  backgroundColor?: string;
  position?: "fixed" | "sticky";
  triggerElementRef?: React.RefObject<HTMLElement>;
};

export default function Menu({
  backgroundColor,
  position,
  triggerElementRef,
}: PropsWithChildren<MenuProps>) {
  const [menuScrolledPast, setMenuScrolledPast] = useState(false);
  return (
    <>
      <nav
        className={`${styles.menuContainer} ${
          menuScrolledPast ? styles.scrolled : ""
        }`}
        style={{ backgroundColor: backgroundColor, position: position }}
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
        {/* <div className={styles.social}>
          <a>
            <div className={styles.facebook}></div>
          </a>
          <a>
            <div className={styles.twitter}></div>
          </a>
        </div> */}
      </nav>
      {triggerElementRef && (
        <PageScrollSpy
          triggerElementRef={triggerElementRef}
          scrollEvent={(closeToBottom) => {
            if (closeToBottom) {
              setMenuScrolledPast(true);
            } else {
              setMenuScrolledPast(false);
            }
          }}
        />
      )}
    </>
  );
}

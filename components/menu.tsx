"use client";

import { PropsWithChildren, useRef, useState } from "react";
import styles from "styles/menu.module.scss";
import ActiveLink from "./activeLink";
import PageScrollSpy from "./PageScrollSpy";
import TTT_Logo from "public/images/ttt_logo.png";
import Image from "next/image";
import Link from "next/link";

type MenuProps = {
  backgroundColor?: string;
  position?: "fixed" | "sticky";
  showLogo?: boolean;
};

export default function Menu({
  backgroundColor,
  position,
  showLogo,
}: PropsWithChildren<MenuProps>) {
  const [menuScrolledPast, setMenuScrolledPast] = useState(false);
  const menuTriggerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <nav
        className={`${styles.menuContainer} ${
          menuScrolledPast ? styles.scrolled : ""
        }`}
        style={{ backgroundColor: backgroundColor, position: position }}
        data-cy="menu-container"
      >
        <ul>
          {showLogo && (
            <Link href="/">
              <li className={styles.logoContainer} data-cy="logo">
                <Image
                  src={TTT_Logo}
                  alt="Team Ted Tile Logo"
                  fill={true}
                  sizes="26px"
                />
              </li>
            </Link>
          )}
          <li>
            <ActiveLink
              activeClassName={styles.active}
              className={styles.category}
              doNotPrefetch={true}
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
      <div ref={menuTriggerRef} style={{ position: "fixed", top: "40vh" }} />
      {menuTriggerRef && (
        <PageScrollSpy
          triggerElementRef={menuTriggerRef}
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

import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from "styles/overlay.module.scss";
import Menu from "./menu";

export default function Overlay(props: PropsWithChildren) {
  return (
    <div className={styles.overlay}>
      <div className={styles.innerOverlay}>
        <Menu backgroundColor="white" />
        <Link href="/" className={styles.close}>
          &times;
        </Link>
        {props.children}
      </div>
    </div>
  );
}

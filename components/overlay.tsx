"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from "styles/overlay.module.scss";
import Menu from "./menu";
import { useRouter } from "next/navigation";

export default function Overlay(props: PropsWithChildren) {
  const router = useRouter();
  return (
    <div
      className={styles.overlay}
      onClick={() => {
        router.push("/");
      }}
    >
      <div
        className={styles.innerOverlay}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Menu backgroundColor="white" position="sticky" />
        <Link href="/" className={styles.close}>
          &times;
        </Link>
        {props.children}
      </div>
    </div>
  );
}

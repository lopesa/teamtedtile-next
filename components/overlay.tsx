"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from "styles/overlay.module.scss";
import Menu from "./menu";
import { useRouter } from "next/navigation";
import KeyActions from "@components/KeyActions";

export default function Overlay(props: PropsWithChildren) {
  const router = useRouter();
  const onEscapeKey = () => {
    // this doesn't also work for the gallery router because it's a different
    // router, I think. Look again when I can upgrade all to 13
    router.push("/");
  };

  return (
    <>
      <KeyActions onEsc={onEscapeKey} />
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
    </>
  );
}

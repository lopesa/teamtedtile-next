import Link from "next/link";
import styles from "../styles/overlay.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function Overlay(props: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.innerOverlay}>
        <Link href="/" className={styles.close}>
          &times;
        </Link>
        {props.children}
      </div>
    </div>
  );
}

import { PropsWithChildren } from "react";
import styles from "../styles/OverlayImageHeader.module.scss";

type OverlayImageProps = {
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  copyright?: string;
  title: string;
};

export default function OverlayImageHeader({
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  copyright,
  title,
}: PropsWithChildren<OverlayImageProps>) {
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: backgroundPosition,
        backgroundSize: backgroundSize,
      }}
    >
      {copyright && <div className="copyright">Photo &copy; {copyright}</div>}
      <div className={styles.title}>{title}</div>
    </div>
  );
}

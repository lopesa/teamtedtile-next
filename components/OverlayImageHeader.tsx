import { PropsWithChildren } from "react";
import styles from "styles/OverlayImageHeader.module.scss";

interface OverlayImageProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  copyright?: string;
  title: string;
}

export default function OverlayImageHeader({
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  copyright,
  title,
  ...props
}: PropsWithChildren<OverlayImageProps>) {
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: backgroundPosition,
        backgroundSize: backgroundSize,
        ...props.style,
      }}
    >
      {copyright && <div className="copyright">Photo &copy; {copyright}</div>}
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}

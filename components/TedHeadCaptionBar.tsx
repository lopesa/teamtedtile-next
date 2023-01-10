import styles from "styles/TedHeadCaptionBar.module.scss";
import Image from "next/image";
import tedHeadImg from "public/images/ted_calvert_icon.png";
import { useRef, MouseEvent, useState } from "react";
import { removeListener } from "process";

interface TedHeadCaptionBarProps {
  tedHeadText: string;
}

function TedHeadCaptionBar({ tedHeadText }: TedHeadCaptionBarProps) {
  const tedHeadOverallBar = useRef<HTMLDivElement>(null);
  const tedHeadImgContainer = useRef<HTMLDivElement>(null);
  const tedHeadTextDiv = useRef<HTMLDivElement>(null);
  const [captionOpened, setCaptionedOpened] = useState(false);
  const SPEED = 150;

  const shakeTeadHead = () => {
    tedHeadTextDiv.current?.classList.add(styles.active);

    tedHeadImgContainer.current?.classList.add(styles.active);
    tedHeadImgContainer.current?.classList.add(styles.animateLeft);

    const shakeTimeout = setTimeout(() => {
      tedHeadImgContainer.current?.classList.remove(styles.animateLeft);
      tedHeadImgContainer.current?.classList.add(styles.animateRight);
      clearTimeout(shakeTimeout);
    }, SPEED / 2);

    const resetTimeout = setTimeout(() => {
      tedHeadImgContainer.current?.classList.remove(styles.animateRight);
      clearTimeout(resetTimeout);
    }, SPEED * 2.2);
  };

  const handleMouseOver = (e: MouseEvent) => {
    tedHeadOverallBar.current?.classList.add(styles.active);
  };

  const handleMouseOut = (e: MouseEvent) => {
    if (captionOpened) {
      return;
    }
    tedHeadOverallBar.current?.classList.remove(styles.active);
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setCaptionedOpened(true);
    shakeTeadHead();
  };

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!tedHeadTextDiv.current) {
      return;
    }
    const transitionEndListener = (tedHeadTextDiv.current.ontransitionend =
      () => {
        tedHeadOverallBar.current?.classList.remove(styles.active);
        tedHeadImgContainer.current?.classList.remove(styles.active);

        setCaptionedOpened(false);

        removeListener("transitionend", transitionEndListener);
      });
    tedHeadTextDiv.current?.classList.remove(styles.active);
  };

  return (
    <div ref={tedHeadOverallBar} className={styles.tedHeadTextCaption}>
      <div
        ref={tedHeadImgContainer}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
        className={styles.tedHead}
      >
        <Image src={tedHeadImg} alt="Ted's head" />
      </div>
      <div className={styles.tedHeadTextHolder}>
        <div ref={tedHeadTextDiv} className={styles.tedHeadText}>
          {tedHeadText}
          <span onClick={handleClose}>&times;</span>
        </div>
      </div>
    </div>
  );
}

export default TedHeadCaptionBar;

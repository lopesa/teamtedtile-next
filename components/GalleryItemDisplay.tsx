"use client";
import { IGalleryItem } from "interfaces/gallery";
import Overlay from "./overlay";
import styles from "styles/GalleryItem.module.scss";
import { RefObject, useEffect, useRef, useState } from "react";
import {
  getApiUrlBase,
  getGalleryUrlStringFromTitle,
} from "utils/GeneralUtils";
import StrapiImage from "./StrapiImage";
import { useRouter, usePathname } from "next/navigation";
import useEscGoesToRoute from "hooks/useEscGoesToRoute";

interface GalleryItemDisplayProps {
  galleryItem: IGalleryItem["attributes"];
}

const GalleryItemDisplay = ({ galleryItem }: GalleryItemDisplayProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [imagesContainerWidth, setImagesContainerWidth] = useState(0);
  const [imagesContainerTranslateX, setImagesContainerTranslateX] = useState(0);

  const BASE_GALLERY_TRANSITION = "transform 0.5s ease-in-out";
  const [baseGalleryTransition, setBaseGalleryTransition] = useState("none");

  //   const [isPopState, setIsPopState] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const getSameImagesState = (
    galleryItem: IGalleryItem["attributes"] | null
  ) => {
    const urlPath = galleryItem?.image?.data?.attributes?.url;
    const url = urlPath ? `${getApiUrlBase()}${urlPath}` : "";
    return {
      leftImageSrc: url,
      centerImageSrc: url,
      rightImageSrc: url,
    };
  };

  const getFinalImagesState = (
    galleryItem: IGalleryItem["attributes"] | null | undefined
  ) => {
    return {
      leftImageSrc: galleryItem?.previous?.image?.url
        ? `${getApiUrlBase()}${galleryItem?.previous?.image.url}`
        : "",
      centerImageSrc: galleryItem?.image?.data?.attributes?.url
        ? `${getApiUrlBase()}${galleryItem?.image?.data?.attributes?.url}`
        : "",
      rightImageSrc: galleryItem?.next?.image?.url
        ? `${getApiUrlBase()}${galleryItem?.next?.image?.url}`
        : "",
    };
  };

  const [images, setImages] = useState(getSameImagesState(galleryItem));

  const getNextOrPreviousUrl = (direction: "left" | "right") => {
    if (
      !galleryItem ||
      (direction === "left" && !galleryItem.previous) ||
      (direction === "right" && !galleryItem.next)
    ) {
      return;
    }

    const galleryItemUrl = getGalleryUrlStringFromTitle(
      direction === "left"
        ? galleryItem.previous!.title
        : galleryItem.next!.title
    );
    return `/gallery/${galleryItemUrl}`;
  };

  const doSlideAnimationThenChangeRoutes = async (
    direction: "left" | "right",
    elRef?: RefObject<HTMLDivElement>
  ) => {
    const goToUrl = getNextOrPreviousUrl(direction);
    if (!goToUrl) {
      return;
    }
    const transitionEndFunction = () => {
      elRef?.current?.removeEventListener(
        "transitionend",
        transitionEndFunction
      );
      router.push(goToUrl);
    };
    elRef?.current?.addEventListener("transitionend", transitionEndFunction);
    setImagesContainerTranslateX(direction === "left" ? 0 : -2 * width);
  };

  useEffect(() => {
    const prefetchAdjacentSlides = () => {
      // prefetch previous and next pages @TODO, move these??
      if (galleryItem.previous?.title) {
        router.prefetch(
          `/gallery/${getGalleryUrlStringFromTitle(galleryItem.previous.title)}`
        );
      }
      if (galleryItem.next?.title) {
        router.prefetch(
          `/gallery/${getGalleryUrlStringFromTitle(galleryItem.next.title)}`
        );
      }
    };
    prefetchAdjacentSlides();
  }, [galleryItem, router]);

  useEscGoesToRoute("/gallery");

  /**
   * on route change of initial instantiation, set the height/width of the frame
   * on further route changes, set the transition to none to start the sequence
   * of...
   * setBaseGalleryTransition("none") -> setImages(getSameImagesState
   *   (galleryItem)) -> setImagesContainerTranslateX(-width);
   */
  useEffect(() => {
    if (frameRef.current !== null) {
      setHeight(frameRef.current.offsetHeight);
      setWidth(frameRef.current.offsetWidth);
    }
    setBaseGalleryTransition("none");
    //   }, [router.asPath]);
  }, [pathname]);

  // listens to width and sets initial slide width on instantiation
  useEffect(() => {
    setImagesContainerWidth(3 * width);
  }, [width]);

  // prepare slide to reset position
  useEffect(() => {
    if (baseGalleryTransition === "none") {
      galleryItem && setImages(getSameImagesState(galleryItem));
    }
    //   }, [baseGalleryTransition, galleryItem, isPopState]);
  }, [baseGalleryTransition, galleryItem]);

  //   useEffect(() => {
  //     const handleRouteChangeComplete = () => {
  //       if (isPopState) {
  //         router.reload();
  //       }
  //       setIsPopState(false);
  //     };
  //     router.events.on("routeChangeComplete", handleRouteChangeComplete);

  //     router.beforePopState(() => {
  //       setIsPopState(true);
  //       return true;
  //     });

  //     return () => {
  //       router.events.off("routeChangeComplete", handleRouteChangeComplete);
  //     };
  //   }, [router, isPopState]);

  useEffect(() => {
    if (!images) {
      return;
    }
    if (images.rightImageSrc === images.centerImageSrc) {
      if (imagesContainerTranslateX !== -width) {
        setImagesContainerTranslateX(-width);
        return;
      }
      if (
        imagesContainerTranslateX === -width &&
        slideRef.current?.clientWidth !== 0
      ) {
        galleryItem && setImages(getFinalImagesState(galleryItem));
      }
    }

    if (
      images.rightImageSrc !== images.centerImageSrc &&
      imagesContainerTranslateX === -width
    ) {
      setBaseGalleryTransition(BASE_GALLERY_TRANSITION);
    }
  }, [
    images,
    imagesContainerTranslateX,
    galleryItem,
    width,
    baseGalleryTransition,
  ]);

  return (
    <Overlay>
      {galleryItem && (
        <>
          {galleryItem.previous && (
            <a
              onClick={(e) => {
                e.preventDefault();
                doSlideAnimationThenChangeRoutes("left", slideRef);
              }}
            >
              <div className={`${styles.arrow} ${styles.left}`}>
                <div className={`${styles.innerArrow} ${styles.left}`}></div>
              </div>
            </a>
          )}
          <div ref={frameRef} className={styles.imageFrame}>
            <div
              ref={slideRef}
              className={styles.imagesContainer}
              style={{
                width: `${imagesContainerWidth}px`,
                transform: `translateX(${imagesContainerTranslateX}px)`,
                transition: baseGalleryTransition,
              }}
            >
              <StrapiImage
                src={images?.leftImageSrc || ""}
                alt=""
                width={width}
                height={height}
                style={{ objectFit: "contain" }}
                priority
                isSlide={true}
              />
              <StrapiImage
                src={images?.centerImageSrc || ""}
                alt=""
                width={width}
                height={height}
                style={{ objectFit: "contain" }}
                priority
                isSlide={true}
              />
              <StrapiImage
                src={images?.rightImageSrc || ""}
                alt=""
                width={width}
                height={height}
                style={{ objectFit: "contain" }}
                priority
                isSlide={true}
              />
            </div>
          </div>

          {galleryItem.next && (
            <a
              onClick={(e) => {
                e.preventDefault();
                doSlideAnimationThenChangeRoutes("right", slideRef);
              }}
            >
              <div className={`${styles.arrow} ${styles.right}`}>
                <div className={`${styles.innerArrow} ${styles.right}`}></div>
              </div>
            </a>
          )}
        </>
      )}
    </Overlay>
  );
};

export default GalleryItemDisplay;

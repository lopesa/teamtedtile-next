"use client";
import Image from "next/image";
import { IGalleryItem } from "interfaces/gallery";
import createJustifiedLayout from "justified-layout";
import styles from "styles/ScrollGallery.module.scss";
import tedHeadImg from "public/images/ted_calvert_icon.png";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useState, forwardRef, Ref } from "react";
import { BREAKPOINTS } from "enums/Breakpoints";
import ScrollGalleryImage from "./ScrollGalleryimage";
import { getGalleryUrlStringFromTitle } from "utils/GeneralUtils";
import Link from "next/link";

enum GALLERY_WIDTHS {
  MOBILE = 325,
  MOBILE_LARGE = 380,
  TABLET_SMALL = 600,
  TABLET = 768,
  DESKTOP = 1060,
  DESKTOP_LARGE = 1200,
}

interface ScrollGalleryProps {
  images: IGalleryItem[];
  notFound: boolean;
  onLayoutSetMethods?: ((...args: any) => void)[];
}

// for info on the strange declaration syntax see below
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
const ScrollGallery = ({
  images,
  notFound,
  onLayoutSetMethods,
}: ScrollGalleryProps) => {
  const [initialLayoutSet, setInitialLayoutSet] = useState(false);
  const [layoutSetMethodsExectuted, setLayoutSetMethodsExectuted] =
    useState(false);
  const getImagesAspectRatios = (images: IGalleryItem[]) => {
    return images.map((image) => {
      return (
        image.attributes.image.data.attributes.width /
        image.attributes.image.data.attributes.height
      );
    });
  };

  const getGalleryWidth = (windowWidth: number) => {
    if (windowWidth > BREAKPOINTS.XLARGE) {
      return GALLERY_WIDTHS.DESKTOP_LARGE;
    } else if (windowWidth > BREAKPOINTS.LARGE) {
      return GALLERY_WIDTHS.DESKTOP;
    } else if (windowWidth > BREAKPOINTS.MEDIUM) {
      return GALLERY_WIDTHS.TABLET;
    } else if (windowWidth > BREAKPOINTS.SMALL) {
      return GALLERY_WIDTHS.TABLET_SMALL;
    } else if (windowWidth > BREAKPOINTS.XSMALL) {
      return GALLERY_WIDTHS.MOBILE_LARGE;
    } else {
      return GALLERY_WIDTHS.MOBILE;
    }
  };
  const windowSize = useWindowSize();
  const [galleryWidth, setGalleryWidth] = useState(
    getGalleryWidth(windowSize.innerWidth)
  );
  const [galleryLayoutInfo, setGalleryLayoutInfo] = useState<
    | undefined
    | {
        imageContainerWidth: number;
        layoutGeometry: ReturnType<typeof createJustifiedLayout>;
      }
  >(undefined);

  useEffect(() => {
    setGalleryWidth(getGalleryWidth(windowSize.innerWidth));
  }, [windowSize]);

  useEffect(() => {
    setGalleryLayoutInfo({
      imageContainerWidth: galleryWidth,
      layoutGeometry: createJustifiedLayout(getImagesAspectRatios(images), {
        containerWidth: galleryWidth,
      }),
    });
    if (!initialLayoutSet) {
      setInitialLayoutSet(true);
    }
  }, [images, galleryWidth, initialLayoutSet]);

  useEffect(() => {
    if (!initialLayoutSet) {
      return;
    }
    if (layoutSetMethodsExectuted) {
      return;
    }
    onLayoutSetMethods?.forEach((method) => method());
    setLayoutSetMethodsExectuted(true);
  }, [
    galleryWidth,
    initialLayoutSet,
    onLayoutSetMethods,
    layoutSetMethodsExectuted,
  ]);

  return (
    <section className={styles.scrollGalleryContainer}>
      {notFound && <h1>Images Not Found</h1>}
      {!notFound && galleryLayoutInfo && (
        <div
          style={{
            height: `${galleryLayoutInfo?.layoutGeometry.containerHeight}px`,
            width: `${galleryLayoutInfo?.imageContainerWidth}px`,
          }}
          className={styles.scrollGalleryImagesContainer}
        >
          <h1>Gallery</h1>
          <div className={styles.galleryHeader}>
            <div className={styles.headerTedsHead}>
              <Image src={tedHeadImg} alt="Ted's head" />
            </div>
            <h4>
              <span>First things first!!!</span> Every tile shown, in every
              image below installed by <span>Team&nbsp;Ted&nbsp;Tile.</span>{" "}
            </h4>
          </div>
          {galleryLayoutInfo?.layoutGeometry.boxes.length &&
            galleryLayoutInfo?.layoutGeometry.boxes.map((box, index) => (
              <Link
                href={`gallery/${getGalleryUrlStringFromTitle(
                  images[index].attributes.title
                )}`}
                key={index}
                style={{
                  transform: `translate(${box.left}px, ${box.top}px)`,
                  width: `${box.width}px`,
                  height: `${box.height}px`,
                  position: "absolute",
                }}
              >
                <ScrollGalleryImage image={images[index]} />
              </Link>
            ))}
        </div>
      )}
    </section>
  );
};

export default ScrollGallery;

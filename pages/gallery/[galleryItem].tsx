import { useRouter } from "next/router";
import { IGalleryItem, IGalleryItemsResponse } from "interfaces/gallery";
import {
  getApiUrlBase,
  getGalleryUrlStringFromTitle,
  getGalleryTitleFromUrlString,
} from "utils/GeneralUtils";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "styles/GalleryItem.module.scss";
import Head from "next/head";
import HomeSplash from "components/homeSplash";
import Overlay from "components/overlay";
import { useEffect, useRef, useState } from "react";
import StrapiImage from "components/StrapiImage";
import {
  AnimatePresence,
  PanInfo,
  motion,
  useMotionValue,
} from "framer-motion";
import useWindowSize from "hooks/useWindowSize";
import KeyActions from "@components/KeyActions";
import { getImageData } from "utils/APIUtils";
// import PageHead from "components/PageHead";

interface props {
  galleryItem: IGalleryItem["attributes"] | null;
}

export default function GalleryItem({ galleryItem }: props) {
  const router = useRouter();
  const [routeChangeInProgress, setRouteChangeInProgress] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [slideChangeDirection, setSlideChangeDirection] = useState<
    "left" | "right" | "none"
  >("none");

  const [imagesContainerWidth, setImagesContainerWidth] = useState(0);
  const windowSize = useWindowSize();

  const [images, setImages] = useState(getImageData(galleryItem));

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

  // const getGalleryMeta = () => {
  //   return `gallery -- ${getGalleryTitleFromUrlString(router.asPath)?.slice(
  //     9
  //   )}`;
  // };

  /**
   * ---------------- DRAGGING ----------------
   */
  const onDrag = (e: MouseEvent, info: PanInfo) => {
    // const { point, delta, offset, velocity } = info;
    if (routeChangeInProgress) {
      return;
    }
    const { delta } = info;
    x.set(x.get() + delta.x);
  };

  const onDragEnd = (e: MouseEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const OFFSET_THRESHOLD = 100;
    const VELOCITY_THRESHOLD = 75;

    console.log("velocity.x", velocity.x);

    if (
      Math.abs(offset.x) < OFFSET_THRESHOLD &&
      Math.abs(velocity.x) < VELOCITY_THRESHOLD
    ) {
      x.jump(-width);
      return;
    }
    if (offset.x > 0) {
      setSlideChangeDirection("left");
    } else {
      setSlideChangeDirection("right");
    }
  };

  /**
   * ---------------- KEY ACTION DEFS ----------------
   */
  const onEscapeKey = () => {
    router.push("/gallery");
  };
  const onRightArrowKey = () => {
    if (routeChangeInProgress) {
      return;
    }
    setSlideChangeDirection("right");
  };
  const onLeftArrowKey = () => {
    if (routeChangeInProgress) {
      return;
    }
    setSlideChangeDirection("left");
  };

  /**
   * ---------------- EFFECTS ----------------
   */

  /**
   * listens to routechanges and windowSize
   * this is essentially "init"
   */
  useEffect(() => {
    if (frameRef.current !== null) {
      setHeight(frameRef.current.offsetHeight);
      setWidth(frameRef.current.offsetWidth);
      x.set(-frameRef.current.offsetWidth);
    }
  }, [router.asPath, windowSize]);

  /**
   * listens to width and sets initial slide width on instantiation
   * also sets the MotionValue (Framer Motion) x to the initial position
   * not to be confused with the "initial" prop of the motion.div el
   * without that initial val set also, the value isn't set quickly enough
   * to avoid a flash of the initial position
   */
  useEffect(() => {
    setImagesContainerWidth(3 * width);
  }, [width]);

  /**
   * for slides after the inital one, have to reset these values
   * note: they are intially set to the same values on
   * component instantiation
   */
  useEffect(() => {
    setImages(getImageData(galleryItem));
    setSlideChangeDirection("none");
  }, [galleryItem]);

  /**
   * this is the mechanism for changing routes
   * other places change the route by calling setSlideChangeDirection
   * this listens for that change and then changes the route
   */
  useEffect(() => {
    if (slideChangeDirection === "none" || routeChangeInProgress) {
      return;
    }
    const goToUrl = getNextOrPreviousUrl(slideChangeDirection);
    if (!goToUrl) {
      return;
    }
    setRouteChangeInProgress(true);
    const id = setTimeout(() => {
      setRouteChangeInProgress(false);
      clearTimeout(id);
    }, 750);
    router.push(goToUrl);
  }, [slideChangeDirection]);

  return (
    <>
      {/* <PageHead metaContent={getGalleryMeta()} /> */}
      <KeyActions
        onLeft={onLeftArrowKey}
        onRight={onRightArrowKey}
        onEsc={onEscapeKey}
      />
      <main>
        <Overlay>
          {galleryItem && (
            <>
              {galleryItem.previous && (
                <a
                  onClick={(e) => {
                    if (routeChangeInProgress) {
                      return;
                    }
                    e.preventDefault();
                    setSlideChangeDirection("left");
                  }}
                >
                  <div className={`${styles.arrow} ${styles.left}`}>
                    <div
                      className={`${styles.innerArrow} ${styles.left}`}
                    ></div>
                  </div>
                </a>
              )}
              <AnimatePresence mode="wait">
                <div
                  ref={frameRef}
                  className={styles.imageFrame}
                  key={router.asPath}
                >
                  {width && (
                    <motion.div
                      ref={slideRef}
                      key="constant"
                      style={{
                        width: `${imagesContainerWidth}px`,
                        height: "100%",
                        display: "flex",
                        x,
                      }}
                      initial={{ x: x.get() }}
                      exit={{
                        x: `${
                          slideChangeDirection === "left"
                            ? 0
                            : `${-2 * width}px`
                        }`,
                        transition: { duration: 0.3 },
                      }}
                      drag="x"
                      onDrag={onDrag}
                      onDragEnd={onDragEnd}
                    >
                      <StrapiImage
                        src={images?.leftImageSrc || ""}
                        alt=""
                        width={width}
                        height={height}
                        style={{ objectFit: "contain" }}
                        priority
                        isSlide
                      />
                      <StrapiImage
                        src={images?.centerImageSrc || ""}
                        alt=""
                        width={width}
                        height={height}
                        style={{ objectFit: "contain" }}
                        priority
                        isSlide
                      />
                      <StrapiImage
                        src={images?.rightImageSrc || ""}
                        alt=""
                        width={width}
                        height={height}
                        style={{ objectFit: "contain" }}
                        priority
                        isSlide
                      />
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>

              {galleryItem.next && (
                <a
                  onClick={(e) => {
                    if (routeChangeInProgress) {
                      return;
                    }
                    e.preventDefault();
                    setSlideChangeDirection("right");
                  }}
                >
                  <div className={`${styles.arrow} ${styles.right}`}>
                    <div
                      className={`${styles.innerArrow} ${styles.right}`}
                    ></div>
                  </div>
                </a>
              )}
            </>
          )}
        </Overlay>
        <HomeSplash />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: { galleryItem: IGalleryItem["attributes"] | null };
}> => {
  // want the url to be the title but the api call wants to be made with the id
  // Next won't allow more than the url param
  // can make the api call with the title, it is unique can do this with strapi filtering
  // will use this, seems inefficient but not omportant for this project
  // const res = await fetch(`http://localhost:1337/api/posts?filters[slug][$eq]${slug}`);
  // https://stackoverflow.com/questions/70815626/next-js-isr-pass-additional-data-to-getstaticprops-from-getstaticpaths
  // otherwise the solution is manual cache management:
  // https://github.com/vercel/examples/tree/main/solutions/reuse-responses
  // https://github.com/vercel/next.js/discussions/11272#discussioncomment-2257876
  const res = await fetch(
    `${getApiUrlBase()}/api/gallery-images?filters[title][$eq]=${getGalleryTitleFromUrlString(
      context.params?.galleryItem
    )}`
  ).catch((e) => {});
  if (res && res.ok) {
    const json = await res.json();
    return { props: { galleryItem: json.data[0].attributes } };
  } else {
    return { props: { galleryItem: null } };
  }
};

// example from Next docs:
// https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
export const getStaticPaths: GetStaticPaths = async () => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  // Call an external API endpoint to get posts (galleryItems)
  let galleryItems: IGalleryItemsResponse | undefined;
  const res = await fetch(`${getApiUrlBase()}/api/gallery-images`).catch(
    (e) => {}
  );
  if (res && res.ok) {
    galleryItems = await res.json();
  }

  // Get the paths we want to prerender based on posts (galleryItems)
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  // { fallback: false } means other routes should 404
  return galleryItems
    ? {
        paths: galleryItems.data.map((item) => ({
          params: {
            galleryItem: getGalleryUrlStringFromTitle(item.attributes.title),
          },
        })),
        fallback: false,
      }
    : { paths: [], fallback: false };
};

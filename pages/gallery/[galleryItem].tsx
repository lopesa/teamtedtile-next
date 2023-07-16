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
import { RefObject, useEffect, useRef, useState } from "react";
import useEscGoesToRoute from "hooks/useEscGoesToRoute";
import StrapiImage from "components/StrapiImage";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
// import PageHead from "components/PageHead";

interface props {
  galleryItem: IGalleryItem["attributes"] | null;
}

export default function GalleryItem({ galleryItem }: props) {
  const router = useRouter();

  const frameRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [slideChangeDirection, setSlideChangeDirection] = useState<
    "left" | "right" | "none"
  >("none");

  const [imagesContainerWidth, setImagesContainerWidth] = useState(0);
  const [imagesContainerTranslateX, setImagesContainerTranslateX] = useState(0);

  const BASE_GALLERY_TRANSITION = "transform 0.5s ease-in-out";
  const [baseGalleryTransition, setBaseGalleryTransition] = useState("none");

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

  // const [images, setImages] = useState(getSameImagesState(galleryItem));
  const [images, setImages] = useState(getFinalImagesState(galleryItem));

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

    router.push(goToUrl);

    // const transitionEndFunction = () => {
    //   elRef?.current?.removeEventListener(
    //     "transitionend",
    //     transitionEndFunction
    //   );
    //   router.push(goToUrl);
    // };
    // elRef?.current?.addEventListener("transitionend", transitionEndFunction);
    // setImagesContainerTranslateX(direction === "left" ? 0 : -2 * width);
  };

  useEscGoesToRoute("/gallery");

  // on route change of initial instantiation, set the height/width of the frame
  // on further route changes, set the transition to none to start the sequence of
  // setBaseGalleryTransition("none") -> setImages(getSameImagesState(galleryItem)) -> setImagesContainerTranslateX(-width);
  useEffect(() => {
    if (frameRef.current !== null) {
      setHeight(frameRef.current.offsetHeight);
      setWidth(frameRef.current.offsetWidth);
    }
  }, [router.asPath]);

  // listens to width and sets initial slide width on instantiation
  useEffect(() => {
    setImagesContainerWidth(3 * width);
  }, [width]);

  useEffect(() => {
    // debugger;
    setImages(getFinalImagesState(galleryItem));
    setSlideChangeDirection("none");
  }, [galleryItem]);

  useEffect(() => {
    if (slideChangeDirection === "none") {
      return;
    }
    const goToUrl = getNextOrPreviousUrl(slideChangeDirection);
    if (!goToUrl) {
      return;
    }
    router.push(goToUrl);
  }, [slideChangeDirection]);

  // prepare slide to reset position
  // useEffect(() => {
  //   if (baseGalleryTransition === "none") {
  //     galleryItem && setImages(getSameImagesState(galleryItem));
  //   }
  // }, [baseGalleryTransition, galleryItem]);

  // useEffect(() => {
  //   if (!images) {
  //     return;
  //   }
  //   if (images.rightImageSrc === images.centerImageSrc) {
  //     if (imagesContainerTranslateX !== -width) {
  //       setImagesContainerTranslateX(-width);
  //       return;
  //     }
  //     if (
  //       imagesContainerTranslateX === -width &&
  //       slideRef.current?.clientWidth !== 0
  //     ) {
  //       galleryItem && setImages(getFinalImagesState(galleryItem));
  //     }
  //   }

  //   if (
  //     images.rightImageSrc !== images.centerImageSrc &&
  //     imagesContainerTranslateX === -width
  //   ) {
  //     setBaseGalleryTransition(BASE_GALLERY_TRANSITION);
  //   }
  // }, [
  //   images,
  //   imagesContainerTranslateX,
  //   galleryItem,
  //   width,
  //   baseGalleryTransition,
  // ]);

  // const getGalleryMeta = () => {
  //   return `gallery -- ${getGalleryTitleFromUrlString(router.asPath)?.slice(
  //     9
  //   )}`;
  // };
  return (
    <>
      {/* <PageHead metaContent={getGalleryMeta()} /> */}
      <AnimatePresence mode="wait">
        <main key={router.asPath}>
          <Overlay>
            {/* <AnimatePresence mode="wait" initial={false}> */}
            {/* <AnimatePresence mode="wait"> */}
            {galleryItem && (
              <>
                {galleryItem.previous && (
                  <a
                    onClick={(e) => {
                      // e.preventDefault();
                      setSlideChangeDirection("left");
                      // doSlideAnimationThenChangeRoutes("left", slideRef);
                    }}
                  >
                    <div className={`${styles.arrow} ${styles.left}`}>
                      <div
                        className={`${styles.innerArrow} ${styles.left}`}
                      ></div>
                    </div>
                  </a>
                  // <Link href={getNextOrPreviousUrl("left") || ""}>
                  //   <div className={`${styles.arrow} ${styles.left}`}>
                  //     <div
                  //       className={`${styles.innerArrow} ${styles.left}`}
                  //     ></div>
                  //   </div>
                  // </Link>
                )}
                <div ref={frameRef} className={styles.imageFrame}>
                  {/* <AnimatePresence mode="wait" initial={false}> */}
                  {width && (
                    <motion.div
                      ref={slideRef}
                      // key={router.asPath}
                      key="constant"
                      exit={{
                        // opacity: 0,
                        // transition: { duration: 5 },
                        x: `${
                          slideChangeDirection === "left"
                            ? 0
                            : `${-2 * width}px`

                          // slideChangeDirection === "left"
                          //   ? `${-2 * width}px`
                          //   : 0
                          // slideChangeDirection === "left" ? "-100px" : 0
                          // slideChangeDirection === "left" ? 0 : -2 * width
                        }`,
                      }}
                      // initial={{ translateX: `-150px` }}
                      initial={{ x: `${-width}px` }}
                      style={{
                        width: `${imagesContainerWidth}px`,
                        height: "100%",
                        display: "flex",
                        // translateX: `${-width}px`,
                      }}
                    >
                      {/* <div
                  ref={slideRef}
                  className={styles.imagesContainer}
                  style={{
                    width: `${imagesContainerWidth}px`,
                    transform: `translateX(${imagesContainerTranslateX}px)`,
                    transition: baseGalleryTransition,
                  }}
                > */}
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
                  {/* </AnimatePresence> */}
                  {/* </div> */}
                </div>

                {galleryItem.next && (
                  <a
                    onClick={(e) => {
                      // e.preventDefault();
                      setSlideChangeDirection("right");
                      // doSlideAnimationThenChangeRoutes("right", slideRef);
                    }}
                  >
                    <div className={`${styles.arrow} ${styles.right}`}>
                      <div
                        className={`${styles.innerArrow} ${styles.right}`}
                      ></div>
                    </div>
                  </a>

                  // <Link href={getNextOrPreviousUrl("right") || ""}>
                  //   <div className={`${styles.arrow} ${styles.right}`}>
                  //     <div
                  //       className={`${styles.innerArrow} ${styles.right}`}
                  //     ></div>
                  //   </div>
                  // </Link>
                )}
              </>
            )}
            {/* </AnimatePresence> */}
          </Overlay>
          <HomeSplash />
        </main>
      </AnimatePresence>
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

import { useRouter } from "next/router";
import Link from "next/link";
import { IGalleryItem, IGalleryItemsResponse } from "interfaces/gallery";
import {
  getApiUrlBase,
  getGalleryUrlStringFromTitle,
  getGalleryTitleFromUrlString,
} from "utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import styles from "styles/GalleryItem.module.scss";
import Head from "next/head";
import HomeSplash from "components/homeSplash";
import { motion, AnimatePresence } from "framer-motion";
import ScrollGallery from "components/ScrollGallery";
import Overlay from "components/overlay";
import { useCallback, useEffect, useRef, useState } from "react";

interface props {
  galleryItem: IGalleryItem["attributes"] | null;
}

export default function GalleryItem({ galleryItem }: props) {
  // const router = useRouter();
  const [slideDirection, setSlideDirection] = useState<
    "left" | "right" | undefined
  >(undefined);
  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const getImagesContainerWidth = useCallback(() => 3 * width, [width]);
  const getImagesContainerTranslateX = useCallback(() => width, [width]);
  const [imagesContainerWidth, setImagesContainerWidth] = useState(
    getImagesContainerWidth()
  );
  const [imagesContainerTranslateX, setImagesContainerTranslateX] = useState(
    getImagesContainerTranslateX()
  );

  useEffect(() => {
    if (ref.current !== null) {
      setHeight(ref.current.offsetHeight);
      setWidth(ref.current.offsetWidth);
    }
    // 👇️ if you need access to parent
    // of the element on which you set the ref
    // console.log(ref.current.parentElement);
    // console.log(ref.current.parentElement.offsetHeight);
    // console.log(ref.current.parentElement.offsetWidth);
  }, []);

  useEffect(() => {
    setImagesContainerWidth(getImagesContainerWidth());
    setImagesContainerTranslateX(getImagesContainerTranslateX());
  }, [getImagesContainerTranslateX, getImagesContainerWidth, width]);

  return (
    <>
      <Head>
        <title>Team Ted Tile -- Home</title>
        <meta name="description" content="Team Ted Tile -- Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Overlay>
          {galleryItem && (
            <>
              {galleryItem.previous && (
                <Link
                  onClick={() => setSlideDirection("left")}
                  href={`/gallery/${getGalleryUrlStringFromTitle(
                    galleryItem.previous.title
                  )}`}
                >
                  <div className={`${styles.arrow} ${styles.left}`}>
                    <div
                      className={`${styles.innerArrow} ${styles.left}`}
                    ></div>
                  </div>
                </Link>
              )}
              {/** @TODO: You are trying to animate translateX from "1000" to "0". 1000 is not an animatable value -
               * to enable this animation set 1000 to a value animatable to 0 via the `style` property. */}
              {/* <AnimatePresence>
                <motion.div
                  key={galleryItem.title}
                  initial={{
                    translateX: `${
                      !slideDirection
                        ? "0"
                        : slideDirection === "left"
                        ? "-"
                        : ""
                    }1000px`,
                  }}
                  animate={{ translateX: "0" }}
                  exit={{
                    translateX: `${
                      slideDirection === "left" ? " " : "-"
                    }1000px`,
                  }}
                  className={styles.imageContainer}
                > */}
              <div ref={ref} className={styles.imageFrame}>
                <div
                  className={styles.imagesContainer}
                  style={{
                    width: `${imagesContainerWidth}px`,
                    transform: `translateX(-${imagesContainerTranslateX}px)`,
                  }}
                >
                  {galleryItem.previous && (
                    <Image
                      src={`${getApiUrlBase()}${
                        galleryItem.previous.image.url
                      }`}
                      alt=""
                      width={width}
                      height={height}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                  <Image
                    src={`${getApiUrlBase()}${
                      galleryItem.image.data.attributes.url
                    }`}
                    alt=""
                    width={width}
                    height={height}
                    style={{ objectFit: "contain" }}
                  />
                  {galleryItem.next && (
                    <Image
                      src={`${getApiUrlBase()}${galleryItem.next.image.url}`}
                      alt=""
                      width={width}
                      height={height}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>
              </div>
              {/* </motion.div>
              </AnimatePresence> */}

              {galleryItem.next && (
                <Link
                  onClick={() => setSlideDirection("right")}
                  href={`/gallery/${getGalleryUrlStringFromTitle(
                    galleryItem.next.title
                  )}`}
                >
                  <div className={`${styles.arrow} ${styles.right}`}>
                    <div
                      className={`${styles.innerArrow} ${styles.right}`}
                    ></div>
                  </div>
                </Link>
              )}
            </>
          )}
        </Overlay>
        <HomeSplash />
        {/* <ScrollGallery images={images} notFound={notFound} /> */}
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
    debugger;
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

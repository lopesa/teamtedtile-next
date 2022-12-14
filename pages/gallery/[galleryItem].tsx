import { useRouter } from "next/router";
import Link from "next/link";
import { IGalleryItem, IGalleryItemsResponse } from "../../interfaces/gallery";
import {
  getApiUrlBase,
  getGalleryUrlStringFromTitle,
  getGalleryTitleFromUrlString,
} from "../../utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import styles from "../../styles/galleryItem.module.scss";
import Head from "next/head";
import HomeSplash from "../../components/homeSplash";
import ScrollGallery from "../../components/scrollGallery";

interface props {
  galleryItem: IGalleryItem["attributes"] | null;
}

export default function GalleryItem({ galleryItem }: props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Team Ted Tile -- Home</title>
        <meta name="description" content="Team Ted Tile -- Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.overlay}>
          <div className={styles.innerOverlay}>
            {/* <h1>gallery item: {galleryItem?.title}</h1> */}
            {galleryItem && (
              <Image
                src={`${getApiUrlBase()}${
                  galleryItem.image.data.attributes.url
                }`}
                alt=""
                fill={true}
                style={{ objectFit: "contain" }}
              />
            )}
            <div className={styles.navTemp}>
              {galleryItem?.previous && (
                <Link
                  href={`/gallery/${getGalleryUrlStringFromTitle(
                    galleryItem.previous
                  )}`}
                >
                  prev
                </Link>
              )}
              {galleryItem?.next && (
                <Link
                  href={`/gallery/${getGalleryUrlStringFromTitle(
                    galleryItem.next
                  )}`}
                >
                  next
                </Link>
              )}
            </div>
          </div>
        </div>
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

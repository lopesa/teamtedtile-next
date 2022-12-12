import { useRouter } from "next/router";
import Link from "next/link";
import { GalleryImage, GalleryImagesResponse } from "../../interfaces/gallery";
import { getApiUrlBase, getGalleryUrlStringFromTitle } from "../../utils";
import { GetStaticPaths, GetStaticProps } from "next";

interface props {
  image?: GalleryImage;
}

export default function GalleryItem({ image }: props) {
  const router = useRouter();
  //   const galleryItem = router.query.galleryItem as string;

  return (
    <>
      {/* <h1>gallery item: {galleryItem}</h1> */}
      <h1>gallery item: {image?.attributes.title}</h1>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: { image?: GalleryImage };
}> => {
  debugger;

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
    `${getApiUrlBase()}/api/gallery-images/${context.params?.galleryItem}` // fails
    // `${getApiUrlBase()}/api/gallery-images/${context.params?.id}`
    // `${getApiUrlBase()}/api/gallery-images/1`
  ).catch((e) => {});
  if (res && res.ok) {
    const json = await res.json();
    return { props: { image: json.data } };
  } else {
    return { props: { image: undefined } };
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

  // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  let galleryItems: GalleryImagesResponse | undefined;
  const res = await fetch(
    `${getApiUrlBase()}/api/gallery-images?populate=*`
  ).catch((e) => {});
  if (res && res.ok) {
    galleryItems = await res.json();
  }

  // Get the paths we want to prerender based on posts
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

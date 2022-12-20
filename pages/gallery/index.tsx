import { GetStaticProps } from "next";
import Head from "next/head";
import HomeSplash from "components/homeSplash";
import Menu from "components/menu";
import ScrollGallery from "components/ScrollGallery";
import { IGalleryItemsResponse, IGalleryItem } from "interfaces/gallery";
import { getApiUrlBase } from "utils";

/**
 * this page and the index are duped code mostly but I am seeing that
 * it's not wise to refactor out the getStaticProps call to a common place
 * think about just factoring out the core of it later
 */

export default function HomeGallery({
  images,
  notFound,
}: {
  images: IGalleryItem[];
  notFound: boolean;
}) {
  return (
    <>
      <Head>
        <title>Team Ted Tile -- Home</title>
        <meta name="description" content="Team Ted Tile -- Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      <main>
        <HomeSplash />
        <ScrollGallery images={images} notFound={notFound} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { images: IGalleryItem[]; notFound: boolean };
}> => {
  // https://developer.mozilla.org/en-US/docs/Web/API/fetch
  const res = await fetch(
    `${getApiUrlBase()}/api/gallery-images?populate=*`
  ).catch((e) => {});
  if (res && res.ok) {
    const json: IGalleryItemsResponse = await res.json();
    return { props: { images: json.data, notFound: false } };
  } else {
    return { props: { images: [], notFound: true } };
  }
};

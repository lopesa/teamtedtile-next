import { GetStaticProps } from "next";
import Head from "next/head";
import HomeSplash from "components/homeSplash";
import Menu from "components/menu";
import ScrollGallery from "components/ScrollGallery";
import { IGalleryItemsResponse, IGalleryItem } from "interfaces/gallery";
import { getApiUrlBase } from "utils";
import { RefObject, useRef, useState } from "react";
import BusinessCard from "components/BusinessCard";

/**
 * this page and the index are duped code mostly but I am seeing that
 * it's not wise to refactor out the getStaticProps call to a common place
 * think about just factoring out the core of it later
 */

interface HomeGalleryProps {
  images: IGalleryItem[];
  notFound: boolean;
}

export default function HomeGallery({ images, notFound }: HomeGalleryProps) {
  const scrollGalleryRef = useRef<HTMLElement>(null);
  const scrollGalleryRefIntoView = (
    scrollGalleryRefPass: RefObject<HTMLElement>
  ) => {
    scrollGalleryRefPass?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [menuScrolledPast, setMenuScrolledPast] = useState(false);
  return (
    <>
      <Head>
        <title>Team Ted Tile -- Home</title>
        <meta name="description" content="Team Ted Tile -- Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu menuScrolledPast={menuScrolledPast} />
      <main>
        <HomeSplash setIsScrolledPastHomeSplash={setMenuScrolledPast} />
        <ScrollGallery
          ref={scrollGalleryRef}
          images={images}
          notFound={notFound}
          onLayoutSetMethods={[
            scrollGalleryRefIntoView.bind(HomeGallery, scrollGalleryRef),
          ]}
        />
        <BusinessCard />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: HomeGalleryProps;
}> => {
  // https://developer.mozilla.org/en-US/docs/Web/API/fetch
  const res = await fetch(`${getApiUrlBase()}/api/gallery-images`).catch(
    (e) => {}
  );
  if (res && res.ok) {
    const json: IGalleryItemsResponse = await res.json();
    return { props: { images: json.data, notFound: false } };
  } else {
    return { props: { images: [], notFound: true } };
  }
};

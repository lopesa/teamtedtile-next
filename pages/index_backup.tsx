import { GetStaticProps } from "next";
import PageHead from "components/PageHead";
import HomeSplash from "components/homeSplash";
import { IGalleryItemsResponse, IGalleryItem } from "interfaces/gallery";
import { getApiUrlBase } from "utils";
import Menu from "components/menu";
import ScrollGallery from "components/ScrollGallery";
import { useState } from "react";
import BusinessCard from "components/BusinessCard";

/**
 * this page and the gallery are duped code (getStaticProps) but I am seeing that
 * it's not wise to refactor out the getStaticProps call to a common place
 * think about just factoring out the core of it later somehow
 */

export default function Home({
  images,
  notFound,
}: {
  images: IGalleryItem[];
  notFound: boolean;
}) {
  const [menuScrolledPast, setMenuScrolledPast] = useState(false);
  return (
    <>
      <PageHead metaContent="Home" />

      <Menu menuScrolledPast={menuScrolledPast} />
      <main>
        <HomeSplash setIsScrolledPastHomeSplash={setMenuScrolledPast} />
        <ScrollGallery images={images} notFound={notFound} />
        <BusinessCard />
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

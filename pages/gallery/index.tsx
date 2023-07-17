import { GetStaticProps } from "next";
import HomeSplash from "components/homeSplash";
import Menu from "components/menu";
import ScrollGallery from "components/ScrollGallery";
import { IGalleryItemsResponse, IGalleryItem } from "interfaces/gallery";
import { getApiUrlBase } from "utils/GeneralUtils";
import { RefObject, useEffect, useRef, useState } from "react";
import BusinessCard from "components/BusinessCard";
// import PageHead from "components/PageHead";

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
  const scrollGalleryRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLDivElement>(null);
  const scrollGalleryRefIntoView = () => {
    if (!scrollGalleryRef?.current) {
      return;
    }
    scrollGalleryRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* <PageHead metaContent="Gallery" /> */}

      <Menu triggerElementRef={menuTriggerRef} position="fixed" />
      <div ref={menuTriggerRef} style={{ position: "fixed", top: "40vh" }} />
      <main>
        <HomeSplash />
        <div
          ref={scrollGalleryRef}
          style={{
            position: "absolute",
            bottom: 0,
          }}
        />
        <ScrollGallery
          images={images}
          notFound={notFound}
          onLayoutSetMethods={[scrollGalleryRefIntoView]}
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

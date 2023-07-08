import { Metadata } from "next";
import ScrollGallery from "components/ScrollGallery";
import { RefObject, useRef, useState } from "react";
import BusinessCard from "components/BusinessCard";
import { getGalleryImages } from "utils/APIUtils";

/**
 * this page and the index are duped code mostly but I am seeing that
 * it's not wise to refactor out the getStaticProps call to a common place
 * think about just factoring out the core of it later
 */

export const metadata: Metadata = {
  title: "Team Ted Tile -- Gallery ",
  description: "Welcome to TTT",
};

export default async function HomeGallery() {
  const imagesCall = await getGalleryImages();
  const { images, notFound } = imagesCall.props;
  //   const scrollGalleryRef = useRef<HTMLElement>(null);
  //   const scrollGalleryRefIntoView = (
  //     scrollGalleryRefPass: RefObject<HTMLElement>
  //   ) => {
  //     scrollGalleryRefPass?.current?.scrollIntoView({ behavior: "smooth" });
  //   };
  return (
    <>
      <main>
        <ScrollGallery
          //   ref={scrollGalleryRef}
          images={images}
          notFound={notFound}
          //   onLayoutSetMethods={[
          //     scrollGalleryRefIntoView.bind(HomeGallery, scrollGalleryRef),
          //   ]}
        />
        <BusinessCard />
      </main>
    </>
  );
}

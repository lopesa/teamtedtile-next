import HomeSplash from "components/homeSplash";
import { IGalleryItemsResponse, IGalleryItem } from "interfaces/gallery";
import { getApiUrlBase } from "utils";
import Menu from "components/menu";
import ScrollGallery from "components/ScrollGallery";
// import { useState } from "react";
import BusinessCard from "components/BusinessCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Ted Tile -- Home ",
  description: "Welcome to TTT",
};

const getImages = async (): Promise<{
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

export default async function Home() {
  //   const [menuScrolledPast, setMenuScrolledPast] = useState(false);
  const imagesCall = await getImages();
  const { images, notFound } = imagesCall.props;
  return (
    <main>
      <HomeSplash />
      <ScrollGallery images={images} notFound={notFound} />
      <BusinessCard />
    </main>
  );
}

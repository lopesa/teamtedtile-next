import { IGalleryItemsResponse, IGalleryItem } from "interfaces/gallery";
import { getApiUrlBase } from "utils";
import ScrollGallery from "components/ScrollGallery";
import BusinessCard from "components/BusinessCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Ted Tile -- Home ",
  description: "Welcome to TTT",
};

const getImages = async (): Promise<{
  props: { images: IGalleryItem[]; notFound: boolean };
}> => {
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
  const imagesCall = await getImages();
  const { images, notFound } = imagesCall.props;
  return (
    <>
      <main>
        <ScrollGallery images={images} notFound={notFound} />
        <BusinessCard />
      </main>
    </>
  );
}

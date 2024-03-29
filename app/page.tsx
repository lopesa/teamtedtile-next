import ScrollGallery from "components/ScrollGallery";
import BusinessCard from "components/BusinessCard";
import { Metadata } from "next";
import { getGalleryImages } from "utils/APIUtils";
import HomeSplash from "@components/homeSplash";
import Menu from "@components/menu";

export const metadata: Metadata = {
  title: "Team Ted Tile -- Home ",
  description: "Welcome to TTT",
};

export default async function Home() {
  const imagesCall = await getGalleryImages();
  const { images, notFound } = imagesCall.props;
  return (
    <>
      <main>
        <Menu position="fixed" showLogo={true} />
        <HomeSplash />
        <ScrollGallery images={images} notFound={notFound} />
        <BusinessCard />
      </main>
    </>
  );
}

import { IGalleryItem, IGalleryItemsResponse } from "interfaces/gallery";
import {
  getApiUrlBase,
  getGalleryUrlStringFromTitle,
  getGalleryTitleFromUrlString,
} from "utils/GeneralUtils";
import { Metadata } from "next";
import GalleryItemDisplay from "@components/GalleryItemDisplay";

export const metadata: Metadata = {
  title: "Team Ted Tile -- Gallery",
  description: "Welcome to TTT",
};

export async function generateStaticParams() {
  let galleryItems: IGalleryItemsResponse | undefined;
  const res = await fetch(`${getApiUrlBase()}/api/gallery-images`).catch(
    (e) => {}
  );
  if (res && res.ok) {
    galleryItems = await res.json();
  }

  return galleryItems
    ? galleryItems.data.map((item) => {
        return {
          title: getGalleryUrlStringFromTitle(item.attributes.title),
        };
      })
    : [];
}

const getGalleryItemDataFromUrlSlug = async (
  urlSlug: string
): Promise<IGalleryItem["attributes"]> => {
  const res = await fetch(
    `${getApiUrlBase()}/api/gallery-images?filters[title][$eq]=${getGalleryTitleFromUrlString(
      urlSlug
    )}`
  ).catch((e) => {
    throw e;
  });
  if (res && res.ok) {
    const json = await res.json();
    return json.data[0].attributes;
  }
  throw new Error("Gallery item not found");
};

export default async function GalleryItem({
  params,
}: {
  params: { title: string };
}) {
  const galleryItem = await getGalleryItemDataFromUrlSlug(params.title).catch(
    (e) => {
      console.log(e);
    }
  );

  return (
    <>
      {galleryItem && (
        <GalleryItemDisplay galleryItem={galleryItem}></GalleryItemDisplay>
      )}
    </>
  );
}

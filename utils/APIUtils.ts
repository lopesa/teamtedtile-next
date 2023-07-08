import { IGalleryItemsResponse, IGalleryItem } from "interfaces/gallery";
import { getApiUrlBase } from "utils/GeneralUtils";

export const getGalleryImages = async (): Promise<{
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

import Image from "next/image";
import { IGalleryItem } from "../interfaces/gallery";
import Link from "next/link";
import { getGalleryUrlStringFromTitle, getApiUrlBase } from "../utils";

export default function ScrollGallery({
  images,
  notFound,
}: {
  images: IGalleryItem[];
  notFound: boolean;
}) {
  return (
    <section>
      {notFound && <h1>Images Not Found</h1>}
      {!notFound && (
        <ul>
          <li>
            {images.length &&
              images.map((image: IGalleryItem, index: number) => (
                <Link
                  href={`gallery/${getGalleryUrlStringFromTitle(
                    image.attributes.title
                  )}`}
                  key={index}
                >
                  <Image
                    src={`${getApiUrlBase()}${
                      image.attributes.image.data.attributes.url
                    }`}
                    alt=""
                    width={image.attributes.image.data.attributes.width}
                    height={image.attributes.image.data.attributes.height}
                  />
                </Link>
              ))}
          </li>
        </ul>
      )}
    </section>
  );
}

import Image from "next/image";
import { GalleryImage } from "../interfaces/gallery";
import Link from "next/link";
import { getGalleryUrlStringFromTitle } from "../utils";

const API_URL_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1337"
    : "https://api.teamtedtile.com";

export default function ScrollGallery({
  images,
  notFound,
}: {
  images: GalleryImage[];
  notFound: boolean;
}) {
  return (
    <main>
      {notFound && <h1>Images Not Found</h1>}
      {!notFound && (
        <ul>
          <li>
            {images.length &&
              images.map((image: GalleryImage, index: number) => (
                <Link
                  href={`gallery/${getGalleryUrlStringFromTitle(
                    image.attributes.title
                  )}`}
                  key={index}
                >
                  <Image
                    src={`${API_URL_BASE}${image.attributes.image.data.attributes.url}`}
                    alt=""
                    width={image.attributes.image.data.attributes.width}
                    height={image.attributes.image.data.attributes.height}
                  />
                </Link>
              ))}
          </li>
        </ul>
      )}
    </main>
  );
}

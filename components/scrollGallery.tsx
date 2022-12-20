import Image from "next/image";
import { IGalleryItem } from "interfaces/gallery";
import Link from "next/link";
import { getGalleryUrlStringFromTitle, getApiUrlBase } from "utils";
import createJustifiedLayout from "justified-layout";
import styles from "styles/ScrollGallery.module.scss";

export default function ScrollGallery({
  images,
  notFound,
}: {
  images: IGalleryItem[];
  notFound: boolean;
}) {
  const getImagesAspectRatios = (images: IGalleryItem[]) => {
    return images.map((image) => {
      return (
        image.attributes.image.data.attributes.width /
        image.attributes.image.data.attributes.height
      );
    });
  };
  const imageContainerWidth = 1060;
  const layoutGeometry = createJustifiedLayout(getImagesAspectRatios(images), {
    containerWidth: imageContainerWidth,
    // fullWidthBreakoutRowCadence: 2,
  });
  return (
    <section className={styles.scrollGalleryContainer}>
      {notFound && <h1>Images Not Found</h1>}
      {!notFound && (
        <div
          style={{
            height: `${layoutGeometry.containerHeight}`,
            width: `${imageContainerWidth}px`,
          }}
          className={styles.scrollGalleryImagesContainer}
        >
          {layoutGeometry.boxes.length &&
            layoutGeometry.boxes.map((box, index) => (
              <div
                key={index}
                style={{
                  transform: `translate(${box.left}px, ${box.top}px)`,
                  width: `${box.width}px`,
                  height: `${box.height}px`,
                  position: "absolute",
                }}
              >
                <Link
                  href={`gallery/${getGalleryUrlStringFromTitle(
                    images[index].attributes.title
                  )}`}
                >
                  <Image
                    src={`${getApiUrlBase()}${
                      images[index].attributes.image.data.attributes.url
                    }`}
                    alt={`${images[index].attributes.image.data.attributes.alternativeText}`}
                    fill={true}
                  />
                </Link>
              </div>
            ))}
        </div>
      )}

      {/**
       * leave the followign for now, delete later probably. that is the more
       * straightforward way to layout the images, not using the Flickr thing (justified-layout)
       */}
      {/* {!notFound && (
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
      )} */}
    </section>
  );
}

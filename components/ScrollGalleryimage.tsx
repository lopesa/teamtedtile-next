import { IGalleryItem } from "interfaces/gallery";
import Link from "next/link";
import { getApiUrlBase, getGalleryUrlStringFromTitle } from "utils";
import Image from "next/image";
import styles from "styles/ScrollGalleryImage.module.scss";
import tedHeadImg from "public/images/ted_calvert_icon.png";

interface ScrollGalleryImageProps {
  image: IGalleryItem;
}

const ScrollGalleryImage = ({ image }: ScrollGalleryImageProps) => {
  return (
    <Link
      href={`gallery/${getGalleryUrlStringFromTitle(image.attributes.title)}`}
    >
      <Image
        src={`${getApiUrlBase()}${image.attributes.image.data.attributes.url}`}
        alt={`${image.attributes.image.data.attributes.alternativeText}`}
        fill={true}
      />
      {image.attributes.copyright && (
        <div className="copyright">{image.attributes.copyright}</div>
      )}
      {image.attributes.tedheadText && (
        <div className={styles.tedheadTextCaption}>
          <div className={styles.tedHead}>
            <Image src={tedHeadImg} alt="Ted's head" />
          </div>
          <div className={styles.tedheadTextHolder}>
            <div className={styles.tedHeadText}>
              {image.attributes.tedheadText}
              <span>&times;</span>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ScrollGalleryImage;

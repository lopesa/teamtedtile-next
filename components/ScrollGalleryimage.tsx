import { IGalleryItem } from "interfaces/gallery";
import Link from "next/link";
import { getApiUrlBase, getGalleryUrlStringFromTitle } from "utils";
import Image from "next/image";
import styles from "styles/ScrollGalleryImage.module.scss";
import tedHeadImg from "public/images/ted_calvert_icon.png";
import StrapiImage from "./StrapiImage";

interface ScrollGalleryImageProps {
  image: IGalleryItem;
}

const ScrollGalleryImage = ({ image }: ScrollGalleryImageProps) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <StrapiImage
        src={`${getApiUrlBase()}${image.attributes.image.data.attributes.url}`}
        alt={`${image.attributes.image.data.attributes.alternativeText}`}
        fill={true}
        sizes="(max-width: 1100px) 100vw, 600px"
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
    </div>
  );
};

export default ScrollGalleryImage;

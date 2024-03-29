import { IGalleryItem } from "interfaces/gallery";
import { getApiUrlBase } from "utils/GeneralUtils";
import styles from "styles/ScrollGalleryImage.module.scss";
import StrapiImage from "./StrapiImage";
import TedHeadCaptionBar from "./TedHeadCaptionBar";

interface ScrollGalleryImageProps {
  image: IGalleryItem;
}

const ScrollGalleryImage = ({ image }: ScrollGalleryImageProps) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.scrollGalleryImageContainer}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <StrapiImage
        src={`${getApiUrlBase()}${image.attributes.image.data.attributes.url}`}
        alt={`${image.attributes.image.data.attributes.alternativeText}`}
        fill={true}
        sizes="(max-width: 1100px) 100vw, 600px"
      />
      {image.attributes.copyright && (
        <div className="copyright">
          Photo &copy; {image.attributes.copyright}
        </div>
      )}
      {image.attributes.tedHeadTextRich && (
        <TedHeadCaptionBar tedHeadText={image.attributes.tedHeadTextRich} />
      )}
    </div>
  );
};

export default ScrollGalleryImage;

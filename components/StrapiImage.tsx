import Image from "next/image";
import { useState } from "react";

interface StrapiProps {
  src: string;
  width: number;
  quality?: number;
}

interface NextImageProps {}

// these values are mirrored in the Strapi backend
// located @ /plugins.ts
const widthTranslations = {
  500: "small_",
  750: "medium_",
  1000: "large_",
  2000: "xlarge_",
  4000: "xxlarge_",
};

const getWidthTranslation = (width: number) => {
  if (width <= 500) {
    return widthTranslations[500];
  } else if (width > 500 && width <= 750) {
    return widthTranslations[750];
  } else if (width > 750 && width <= 1000) {
    return widthTranslations[1000];
  } else if (width > 1000 && width <= 2000) {
    return widthTranslations[2000];
  } else {
    return widthTranslations[4000];
  }
};

const sizedImageLoader = ({ src, width }: StrapiProps) => {
  let index = src.search(/uploads/) + 8;
  const url = `${src.substring(0, index)}${getWidthTranslation(
    width
  )}${src.substring(index)}`;
  return url;
  // DEAFAULT === return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const backupLoader = (props: StrapiProps | undefined) => {
  return props?.src || "";
};

// @TODO: any
const StrapiImage = ({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  style,
  priority,
  isSlide = false,
  onLoad,
}: any) => {
  const [useSizedImage, setUseSizedImage] = useState(true);
  const [useBaseImage, setUseBaseImage] = useState(false);
  const handleError = () => {
    setUseSizedImage(false);
    setUseBaseImage(true);
  };
  return (
    <>
      {useSizedImage && (
        <Image
          loader={!isSlide ? sizedImageLoader : undefined}
          loading={isSlide ? "eager" : "lazy"}
          src={src}
          onError={handleError}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          sizes={sizes}
          style={style}
          priority={priority}
          onLoad={onLoad}
        />
      )}
      {useBaseImage && (
        <Image
          loader={backupLoader}
          loading={isSlide ? "eager" : "lazy"}
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          sizes={sizes}
          style={style}
          priority={priority}
          onLoad={onLoad}
        />
      )}
    </>
  );
};

export default StrapiImage;

/**
 * I implemeted the following idea and it is not a good solution.
 * the HEAD calls to check if the large images exist seem to be more
 * expensive than the calls to the non existent images themselves. The
 * cost is very low so for now I will go with this current front end solution.
 * Even the Strapi side solution feels weak as we would be upsizing images.
 * But for the record the file to affect in strapi for that solution would be
 * implemented @:
 * /NODE_MODULES/@STRAPI/PLUGIN-UPLOAD/SERVER/SERVICES/IMAGE-MANIPULATION.JS
 */

// const [sizedImageExists, setSizedImageExists] = useState<boolean | null>(
//   null
// );

// useEffect(() => {
//   const sizedImageUrl = sizedImageLoader({ src, width });
//   const fetchData = async () => {
//     const imageExistsCall = await fetch(sizedImageUrl, {
//       method: "HEAD",
//     }).catch((e) => {});
//     const imageExists = imageExistsCall ? imageExistsCall.ok : false;
//     setSizedImageExists(imageExists);
//   };
//   fetchData();
// }, []);

// return (
// <>
//   {sizedImageExists !== null &&
//     (sizedImageExists ? (
//       <Image
//         loader={!isSlide ? sizedImageLoader : undefined}
//         loading={isSlide ? "eager" : "lazy"}
//         src={src}
//         onError={handleError}
//         alt={alt}
//         fill={fill}
//         width={width}
//         height={height}
//         sizes={sizes}
//         style={style}
//         priority={priority}
//       />
//     ) : (
//       <Image
//         loader={backupLoader}
//         loading={isSlide ? "eager" : "lazy"}
//         src={src}
//         alt={alt}
//         fill={fill}
//         width={width}
//         height={height}
//         sizes={sizes}
//         style={style}
//         priority={priority}
//       />
//     ))}
// </>

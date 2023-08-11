import Image from "next/image";

/**
 * strapi-plugin-local-image-sharp webp conversion.
 * see https://strapi-community.github.io/strapi-plugin-local-image-sharp/guide
 *
 * have to not use the webp (for now) on slideshow images because
 * the conversion is on demand and it messes up the fluidity of the slideshow
 */
const webpFolder = "f_webp/";

const getwebPUrlFromSrc = (src: string) => {
  let index = src.search(/uploads/) + 8;
  const url = `${src.substring(0, index)}${webpFolder}${src.substring(index)}`;
  return url;
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
  return (
    <Image
      loading={isSlide ? "eager" : "lazy"}
      src={isSlide ? src : getwebPUrlFromSrc(src)}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      style={style}
      priority={priority}
      onLoad={onLoad}
      unoptimized={isSlide}
    />
  );
};

export default StrapiImage;

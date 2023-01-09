import Image from "next/image";

interface StrapiProps {
  src: string;
  width: number;
  quality?: number;
}

interface NextImageProps {}

const widthTranlations = {
  500: "small_",
  750: "medium_",
  1000: "large_",
};

const getWidthTranslation = (width: number) => {
  if (width <= 500) {
    return widthTranlations[500];
  }
  if (width > 500 && width <= 750) {
    return widthTranlations[750];
  }
  if (width <= 1000) {
    return widthTranlations[1000];
  }
  return "";
};

const myLoader = ({ src, width }: StrapiProps) => {
  let index = src.search(/uploads/) + 8;
  const url = `${src.substring(0, index)}${getWidthTranslation(
    width
  )}${src.substring(index)}`;
  return url;
  //   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const StrapiImage = ({ src, alt, width, height, fill, sizes }: any) => {
  return (
    <Image
      loader={myLoader}
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
    />
  );
};

export default StrapiImage;

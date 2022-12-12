export const getApiUrlBase = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:1337"
    : "https://api.teamtedtile.com";
};

export const getGalleryUrlStringFromTitle = (title: string): string => {
  return title.replaceAll(/\s/g, "-");
};

export const getApiUrlBase = () => {
  // return "http://localhost:1337";
  return process.env.NODE_ENV === "development"
    ? "http://localhost:1337"
    : "https://api.teamtedtile.com";
};

export const getGalleryUrlStringFromTitle = (title: string): string => {
  return title?.replaceAll(/\s/g, "-");
};

export const getGalleryTitleFromUrlString = (
  urlString: string | string[] | undefined
): string | undefined => {
  if (typeof urlString !== "string") return undefined;
  return urlString.replaceAll(/-/g, " ");
};

import { TMDB_IMAGE_BASE_URL } from "../constants";

const getImageUrl = (path: string) => {
  if (!path) return "";
  return `${TMDB_IMAGE_BASE_URL}${path}`;
};

export default getImageUrl;

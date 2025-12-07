import { TMDB_IMAGE_BASE_URL } from "@/constants";
import type { ImageSize } from "@/types/tmdb";

/**
 * Get the full URL for a TMDB image.
 * @param path - The image path given by tmdb
 * @param size - The image size key
 * @returns Fully-qualified image URL
 */
const getImageUrl = (path: string, size: ImageSize) => {
  if (path.trim() === "") return "";
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${TMDB_IMAGE_BASE_URL}/${size}/${normalizedPath}`;
};

export default getImageUrl;

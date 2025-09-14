import { TMDB_IMAGE_BASE_URL } from "@/constants";
import type { ImageSize } from "@/types";

/**
 * Get the full URL for a TMDB image.
 * @param path - The image path given by tmdb
 * @param size - The image size key
 * @returns Fully-qualified image URL or empty string if path is invalid
 */
const getImageUrl = (path: string, size: ImageSize = "original") => {
  if (path.trim() === "") return "";
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${TMDB_IMAGE_BASE_URL}/${size}/${normalizedPath}`;
};

export default getImageUrl;

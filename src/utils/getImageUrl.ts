import { TMDB_IMAGE_BASE_URL } from "@/constants";
import type { ImageSize } from "@/types";

const getImageUrl = (
  path: string | null | undefined,
  size: ImageSize = "original",
): string => {
  if (!path || path.trim() === "") return "";
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${TMDB_IMAGE_BASE_URL}/${size}/${normalizedPath}`;
};

export default getImageUrl;

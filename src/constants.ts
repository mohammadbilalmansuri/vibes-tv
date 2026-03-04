export const TMDB_API_TOKEN = process.env.EXPO_PUBLIC_TMDB_API_TOKEN!;

export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const GENRES_CACHE_CONFIG = {
  staleTime: DAY,
  gcTime: 7 * DAY,
} as const;

export const DETAIL_CACHE_CONFIG = {
  staleTime: 12 * HOUR,
  gcTime: 7 * DAY,
} as const;

export const GENRE_DISCOVER_CACHE_CONFIG = {
  staleTime: 6 * HOUR,
  gcTime: DAY,
} as const;

export const CONTENT_LIST_CACHE_CONFIG = {
  staleTime: 4 * HOUR,
  gcTime: DAY,
} as const;

export const POPULAR_CACHE_CONFIG = {
  staleTime: 2 * HOUR,
  gcTime: 12 * HOUR,
} as const;

export const TRENDING_CACHE_CONFIG = {
  staleTime: HOUR,
  gcTime: 6 * HOUR,
} as const;

export const NOW_PLAYING_CACHE_CONFIG = {
  staleTime: 30 * MINUTE,
  gcTime: 2 * HOUR,
} as const;

export const SEARCH_CACHE_CONFIG = {
  staleTime: 5 * MINUTE,
  gcTime: 30 * MINUTE,
} as const;

export { COLORS } from "../theme";

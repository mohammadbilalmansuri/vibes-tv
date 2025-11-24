export { default as LOGO } from "../assets/logo.png";

export const TMDB_API_TOKEN = process.env.EXPO_PUBLIC_TMDB_API_TOKEN!;
export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// React Query Cache Configurations

export const GENRES_CACHE_CONFIG = {
  staleTime: 24 * 60 * 60 * 1000,
  gcTime: 7 * 24 * 60 * 60 * 1000,
};

export const TRENDING_CACHE_CONFIG = {
  staleTime: 60 * 60 * 1000,
  gcTime: 6 * 60 * 60 * 1000,
};

export const POPULAR_CACHE_CONFIG = {
  staleTime: 2 * 60 * 60 * 1000,
  gcTime: 12 * 60 * 60 * 1000,
};

export const CONTENT_LIST_CACHE_CONFIG = {
  staleTime: 4 * 60 * 60 * 1000,
  gcTime: 24 * 60 * 60 * 1000,
};

export const NOW_PLAYING_CACHE_CONFIG = {
  staleTime: 30 * 60 * 1000,
  gcTime: 2 * 60 * 60 * 1000,
};

export const DETAIL_CACHE_CONFIG = {
  staleTime: 12 * 60 * 60 * 1000,
  gcTime: 7 * 24 * 60 * 60 * 1000,
};

export const GENRE_DISCOVER_CACHE_CONFIG = {
  staleTime: 6 * 60 * 60 * 1000,
  gcTime: 24 * 60 * 60 * 1000,
};

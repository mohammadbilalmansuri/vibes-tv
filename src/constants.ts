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

// Color Palette

export const COLORS = {
  gray: {
    "50": "#f9fafb",
    "100": "#f3f4f6",
    "200": "#e5e7eb",
    "300": "#d1d5db",
    "400": "#9ca3af",
    "500": "#6b7280",
    "600": "#4b5563",
    "700": "#374151",
    "800": "#1f2937",
    "900": "#111827",
    "950": "#030712",
  },
  rose: "#f43f5e",
  yellow: "#eab308",
};

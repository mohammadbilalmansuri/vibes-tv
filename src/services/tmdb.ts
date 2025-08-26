import { TMDB_API_BASE_URL, TMDB_API_TOKEN } from "@/constants";
import { createApiClient } from "./api";

// Singleton API client for TMDB
const apiClient = createApiClient({
  baseUrl: TMDB_API_BASE_URL,
  headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
});

/** Get trending content (movies + TV) for today */
export const getTrendingAll = () => apiClient.get("/trending/all/day");

/** Movie-related TMDB requests */
export const movieRequests = {
  /** Get trending movies */
  getTrending: () => apiClient.get("/trending/movie/day"),

  /** Get popular movies */
  getPopular: () => apiClient.get("/movie/popular"),

  /** Get upcoming movies */
  getUpcoming: () => apiClient.get("/movie/upcoming"),

  /** Get movie genres */
  getGenres: () => apiClient.get("/genre/movie/list"),

  /** Discover movies by genre */
  getByGenre: (genreId: number) =>
    apiClient.get("/discover/movie", {
      params: { with_genres: genreId },
    }),

  /** Get movie details by ID */
  getDetails: (id: number) => apiClient.get(`/movie/${id}`),
};

/** TV-related TMDB requests */
export const tvRequests = {
  /** Get trending TV shows */
  getTrending: () => apiClient.get("/trending/tv/day"),

  /** Get popular TV shows */
  getPopular: () => apiClient.get("/tv/popular"),

  /** Get upcoming/on-air TV shows */
  getUpcoming: () => apiClient.get("/tv/on_the_air"),

  /** Get TV show genres */
  getGenres: () => apiClient.get("/genre/tv/list"),

  /** Discover TV shows by genre */
  getByGenre: (genreId: number) =>
    apiClient.get("/discover/tv", {
      params: { with_genres: genreId },
    }),

  /** Get TV show details by ID */
  getDetails: (id: number) => apiClient.get(`/tv/${id}`),
};

/** Search-related TMDB requests */
export const searchRequests = {
  /** Search across movies, TV shows, and people */
  multi: (query: string) =>
    apiClient.get("/search/multi", {
      params: { query },
    }),
};

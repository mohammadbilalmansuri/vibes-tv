import { TMDB_API_BASE_URL, TMDB_API_TOKEN } from "@/constants";
import { createApiClient } from "./api";

const apiClient = createApiClient({
  baseUrl: TMDB_API_BASE_URL,
  headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
});

/**
 * Fetch trending (movies + TV combined).
 *
 * @param page - Page number for pagination (default: 1)
 */
export const getTrendingAll = (page: number = 1) =>
  apiClient.get("/trending/all/day", { params: { page } });

/** Movie-related requests. */
export const movieRequests = {
  /**
   * Fetch popular movies.
   * @param page - Page number for pagination
   */
  getPopular: (page: number = 1) =>
    apiClient.get("/movie/popular", { params: { page } }),

  /**
   * Fetch upcoming movies.
   * @param page - Page number for pagination
   */
  getUpcoming: (page: number = 1) =>
    apiClient.get("/movie/upcoming", { params: { page } }),

  /**
   * Discover movies by genre.
   * @param genreId - TMDB genre ID
   * @param page - Page number for pagination
   */
  getByGenre: (genreId: number, page: number = 1) =>
    apiClient.get("/discover/movie", {
      params: { with_genres: genreId, page },
    }),

  /** Fetch list of movie genres. */
  getGenres: () => apiClient.get("/genre/movie/list"),

  /**
   * Fetch detailed information about a specific movie.
   * @param id - TMDB movie ID
   */
  getDetails: (id: number) => apiClient.get(`/movie/${id}`),
};

/** TV-related requests. */
export const tvRequests = {
  /**
   * Fetch popular TV shows.
   * @param page - Page number for pagination
   */
  getPopular: (page: number = 1) =>
    apiClient.get("/tv/popular", { params: { page } }),

  /**
   * Fetch upcoming TV shows.
   * @param page - Page number for pagination
   */
  getUpcoming: (page: number = 1) =>
    apiClient.get("/tv/upcoming", { params: { page } }),

  /**
   * Discover TV shows by genre.
   * @param genreId - TMDB genre ID
   * @param page - Page number for pagination
   */
  getByGenre: (genreId: number, page: number = 1) =>
    apiClient.get("/discover/tv", {
      params: { with_genres: genreId, page },
    }),

  /** Fetch list of TV genres. */
  getGenres: () => apiClient.get("/genre/tv/list"),

  /**
   * Fetch detailed information about a specific TV show.
   * @param id - TMDB TV show ID
   */
  getDetails: (id: number) => apiClient.get(`/tv/${id}`),
};

/** Search-related requests. */
export const searchRequests = {
  /**
   * Search across movies, TV, and people.
   * @param query - Search term
   * @param page - Page number for pagination
   */
  multi: (query: string, page: number = 1) =>
    apiClient.get("/search/multi", { params: { query, page } }),

  /**
   * Search only movies.
   * @param query - Search term
   * @param page - Page number for pagination
   */
  movie: (query: string, page: number = 1) =>
    apiClient.get("/search/movie", { params: { query, page } }),

  /**
   * Search only TV shows.
   * @param query - Search term
   * @param page - Page number for pagination
   */
  tv: (query: string, page: number = 1) =>
    apiClient.get("/search/tv", { params: { query, page } }),
};

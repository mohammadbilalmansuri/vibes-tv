import { TMDB_API_BASE_URL, TMDB_API_TOKEN } from "@/constants";
import {
  DiscoverMoviesResponse,
  DiscoverTVShowsResponse,
  GenresResponse,
  ImageSize,
  MovieDetailResponse,
  MultiSearchResponse,
  NowPlayingMoviesResponse,
  PopularMoviesResponse,
  PopularTVShowsResponse,
  SearchMoviesResponse,
  SearchTVShowsResponse,
  TopRatedMoviesResponse,
  TopRatedTVShowsResponse,
  TrendingMoviesResponse,
  TrendingTVResponse,
  TVSeasonDetailResponse,
  TVShowDetailResponse,
  TVShowsAiringTodayResponse,
  TVShowsOnTheAirResponse,
  UpcomingMoviesResponse,
  VideosResponse,
} from "@/types";
import { createApiClient } from "./api";

const apiClient = createApiClient({
  baseUrl: TMDB_API_BASE_URL,
  headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
});

/** Movie-related requests */
export const movieRequests = {
  /** Get trending movies of the day. */
  getTrending: (page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<TrendingMoviesResponse>("/trending/movie/day", {
      params: { page },
      ...options,
    }),

  /** Get movies currently playing in theaters. */
  getNowPlaying: (page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<NowPlayingMoviesResponse>("/movie/now_playing", {
      params: { page },
      ...options,
    }),

  /** Get a list of popular movies. */
  getPopular: (page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<PopularMoviesResponse>("/movie/popular", {
      params: { page },
      ...options,
    }),

  /** Get a list of top-rated movies. */
  getTopRated: (page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<TopRatedMoviesResponse>("/movie/top_rated", {
      params: { page },
      ...options,
    }),

  /** Get a list of upcoming movies. */
  getUpcoming: (page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<UpcomingMoviesResponse>("/movie/upcoming", {
      params: { page },
      ...options,
    }),

  /**
   * Discover movies by genre.
   * @param genreId - TMDB Genre ID
   * @param page - Page number for pagination (default = 1)
   */
  getByGenre: (genreId: number, page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<DiscoverMoviesResponse>("/discover/movie", {
      params: { with_genres: genreId, page },
      ...options,
    }),

  /** Get list of all movie genres. */
  getGenres: (options?: { signal?: AbortSignal }) =>
    apiClient.get<GenresResponse>("/genre/movie/list", options),

  /**
   * Get detailed information about a movie by ID.
   * @param id - Movie ID
   */
  getDetails: (id: number, options?: { signal?: AbortSignal }) =>
    apiClient.get<MovieDetailResponse>(`/movie/${id}`, options),

  /**
   * Get official videos (trailers, teasers, etc.) for a movie.
   * @param id - Movie ID
   */
  getVideos: (id: number, options?: { signal?: AbortSignal }) =>
    apiClient.get<VideosResponse>(`/movie/${id}/videos`, options),
};

/** TV-related requests */
export const tvRequests = {
  /** Get trending TV shows of the day. */
  getTrending: (page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<TrendingTVResponse>("/trending/tv/day", {
      params: { page },
      ...options,
    }),

  /** Get TV shows airing today. */
  getAiringToday: (page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<TVShowsAiringTodayResponse>("/tv/airing_today", {
      params: { page },
      ...options,
    }),

  /** Get TV shows currently on the air. */
  getOnTheAir: (page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<TVShowsOnTheAirResponse>("/tv/on_the_air", {
      params: { page },
      ...options,
    }),

  /** Get a list of popular TV shows. */
  getPopular: (page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<PopularTVShowsResponse>("/tv/popular", {
      params: { page },
      ...options,
    }),

  /** Get a list of top-rated TV shows. */
  getTopRated: (page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<TopRatedTVShowsResponse>("/tv/top_rated", {
      params: { page },
      ...options,
    }),

  /**
   * Discover TV shows by genre.
   * @param genreId - TMDB Genre ID
   * @param page - Page number for pagination (default = 1)
   */
  getByGenre: (genreId: number, page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<DiscoverTVShowsResponse>("/discover/tv", {
      params: { with_genres: genreId, page },
      ...options,
    }),

  /** Get list of all TV genres. */
  getGenres: (options?: { signal?: AbortSignal }) =>
    apiClient.get<GenresResponse>("/genre/tv/list", options),

  /**
   * Get detailed information about a TV show by ID.
   * @param id - TV show ID
   */
  getDetails: (id: number, options?: { signal?: AbortSignal }) =>
    apiClient.get<TVShowDetailResponse>(`/tv/${id}`, options),

  /**
   * Get details for a specific TV season.
   * @param tvId - TV show ID
   * @param seasonNumber - Season number
   */
  getSeasonDetails: (
    tvId: number,
    seasonNumber: number,
    options?: { signal?: AbortSignal }
  ) =>
    apiClient.get<TVSeasonDetailResponse>(
      `/tv/${tvId}/season/${seasonNumber}`,
      options
    ),

  /**
   * Get official videos (trailers, teasers, etc.) for a TV show.
   * @param id - TV show ID
   */
  getVideos: (id: number, options?: { signal?: AbortSignal }) =>
    apiClient.get<VideosResponse>(`/tv/${id}/videos`, options),
};

/** Search-related requests */
export const searchRequests = {
  /**
   * Search movies, TV shows, and people in one go.
   * @param query - Search keyword
   * @param page - Page number for pagination (default = 1)
   */
  multi: (query: string, page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<MultiSearchResponse>("/search/multi", {
      params: { query, page },
      ...options,
    }),

  /**
   * Search for movies by title.
   * @param query - Search keyword
   * @param page - Page number for pagination (default = 1)
   */
  movie: (query: string, page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<SearchMoviesResponse>("/search/movie", {
      params: { query, page },
      ...options,
    }),

  /**
   * Search for TV shows by title.
   * @param query - Search keyword
   * @param page - Page number for pagination (default = 1)
   */
  tv: (query: string, page = 1, options?: { signal?: AbortSignal }) =>
    apiClient.get<SearchTVShowsResponse>("/search/tv", {
      params: { query, page },
      ...options,
    }),
};

/**
 * Get the full URL for a TMDB image.
 * @param path - The image path (should start with '/')
 * @param size - The image size key
 * @returns Fully-qualified image URL
 */
export const getImageUrl = (path: string, size: ImageSize) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

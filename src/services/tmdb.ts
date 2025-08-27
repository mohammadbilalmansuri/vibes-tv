import { TMDB_API_BASE_URL, TMDB_API_TOKEN } from "@/constants";
import {
  DiscoverMoviesResponse,
  DiscoverTVShowsResponse,
  GenresResponse,
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
  getTrending: () =>
    apiClient.get<TrendingMoviesResponse>("/trending/movie/day"),

  /** Get movies currently playing in theaters. */
  getNowPlaying: () =>
    apiClient.get<NowPlayingMoviesResponse>("/movie/now_playing"),

  /** Get a list of popular movies. */
  getPopular: () => apiClient.get<PopularMoviesResponse>("/movie/popular"),

  /** Get a list of top-rated movies. */
  getTopRated: () => apiClient.get<TopRatedMoviesResponse>("/movie/top_rated"),

  /** Get a list of upcoming movies. */
  getUpcoming: () => apiClient.get<UpcomingMoviesResponse>("/movie/upcoming"),

  /**
   * Discover movies by genre.
   * @param genreId - TMDB Genre ID
   * @param page - Page number for pagination (default = 1)
   */
  getByGenre: (genreId: number, page = 1) =>
    apiClient.get<DiscoverMoviesResponse>("/discover/movie", {
      params: { with_genres: genreId, page },
    }),

  /** Get list of all movie genres. */
  getGenres: () => apiClient.get<GenresResponse>("/genre/movie/list"),

  /**
   * Get detailed information about a movie by ID.
   * @param id - Movie ID
   */
  getDetails: (id: number) =>
    apiClient.get<MovieDetailResponse>(`/movie/${id}`),

  /**
   * Get official videos (trailers, teasers, etc.) for a movie.
   * @param id - Movie ID
   */
  getVideos: (id: number) =>
    apiClient.get<VideosResponse>(`/movie/${id}/videos`),
};

/** TV-related requests */
export const tvRequests = {
  /** Get trending TV shows of the day. */
  getTrending: () => apiClient.get<TrendingTVResponse>("/trending/tv/day"),

  /** Get TV shows airing today. */
  getAiringToday: () =>
    apiClient.get<TVShowsAiringTodayResponse>("/tv/airing_today"),

  /** Get TV shows currently on the air. */
  getOnTheAir: () => apiClient.get<TVShowsOnTheAirResponse>("/tv/on_the_air"),

  /** Get a list of popular TV shows. */
  getPopular: () => apiClient.get<PopularTVShowsResponse>("/tv/popular"),

  /** Get a list of top-rated TV shows. */
  getTopRated: () => apiClient.get<TopRatedTVShowsResponse>("/tv/top_rated"),

  /**
   * Discover TV shows by genre.
   * @param genreId - TMDB Genre ID
   * @param page - Page number for pagination (default = 1)
   */
  getByGenre: (genreId: number, page = 1) =>
    apiClient.get<DiscoverTVShowsResponse>("/discover/tv", {
      params: { with_genres: genreId, page },
    }),

  /** Get list of all TV genres. */
  getGenres: () => apiClient.get<GenresResponse>("/genre/tv/list"),

  /**
   * Get detailed information about a TV show by ID.
   * @param id - TV show ID
   */
  getDetails: (id: number) => apiClient.get<TVShowDetailResponse>(`/tv/${id}`),

  /**
   * Get details for a specific TV season.
   * @param tvId - TV show ID
   * @param seasonNumber - Season number
   */
  getSeasonDetails: (tvId: number, seasonNumber: number) =>
    apiClient.get<TVSeasonDetailResponse>(`/tv/${tvId}/season/${seasonNumber}`),

  /**
   * Get official videos (trailers, teasers, etc.) for a TV show.
   * @param id - TV show ID
   */
  getVideos: (id: number) => apiClient.get<VideosResponse>(`/tv/${id}/videos`),
};

/** Search-related requests */
export const searchRequests = {
  /**
   * Search movies, TV shows, and people in one go.
   * @param query - Search keyword
   * @param page - Page number for pagination (default = 1)
   */
  multi: (query: string, page = 1) =>
    apiClient.get<MultiSearchResponse>("/search/multi", {
      params: { query, page },
    }),

  /**
   * Search for movies by title.
   * @param query - Search keyword
   * @param page - Page number for pagination (default = 1)
   */
  movie: (query: string, page = 1) =>
    apiClient.get<SearchMoviesResponse>("/search/movie", {
      params: { query, page },
    }),

  /**
   * Search for TV shows by title.
   * @param query - Search keyword
   * @param page - Page number for pagination (default = 1)
   */
  tv: (query: string, page = 1) =>
    apiClient.get<SearchTVShowsResponse>("/search/tv", {
      params: { query, page },
    }),
};

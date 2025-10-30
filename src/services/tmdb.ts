import { TMDB_API_BASE_URL, TMDB_API_TOKEN } from "@/constants";
import * as TMDBTypes from "@/types/tmdb";
import { createApiClient } from "./api";

const apiClient = createApiClient({
  baseUrl: TMDB_API_BASE_URL,
  headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
});

/** Movie-related TMDB requests */
export const movieRequests = {
  /**
   * Get trending movies of the day.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getTrending: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.TrendingMoviesResponse>("/trending/movie/day", {
      signal,
    }),

  /**
   * Get movies currently playing in theaters.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getNowPlaying: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.NowPlayingMoviesResponse>("/movie/now_playing", {
      signal,
    }),

  /**
   * Get a list of popular movies.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getPopular: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.PopularMoviesResponse>("/movie/popular", {
      signal,
    }),

  /**
   * Get a list of top-rated movies.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getTopRated: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.TopRatedMoviesResponse>("/movie/top_rated", {
      signal,
    }),

  /**
   * Get a list of upcoming movies.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getUpcoming: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.UpcomingMoviesResponse>("/movie/upcoming", {
      signal,
    }),

  /**
   * Discover movies by genre.
   * @param genreId - TMDB genre ID
   * @param page - Page number for pagination (default = 1)
   * @param signal - Abort signal to cancel the request (optional)
   */
  getByGenre: (genreId: number, page = 1, signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.DiscoverMoviesResponse>("/discover/movie", {
      params: { with_genres: genreId, page },
      signal,
    }),

  /**
   * Get list of all movie genres.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getGenres: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.GenresResponse>("/genre/movie/list", { signal }),

  /**
   * Get detailed information about a movie by ID.
   * @param id - Movie ID
   * @param signal - Abort signal to cancel the request (optional)
   */
  getDetails: (id: number, signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.MovieDetailResponse>(`/movie/${id}`, { signal }),

  /**
   * Get official videos (trailers, teasers, etc.) for a movie.
   * @param id - Movie ID
   * @param signal - Abort signal to cancel the request (optional)
   */
  getVideos: (id: number, signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.VideosResponse>(`/movie/${id}/videos`, { signal }),
};

/** TV-related requests */
export const tvRequests = {
  /**
   * Get trending TV shows of the day.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getTrending: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.TrendingTVResponse>("/trending/tv/day", { signal }),

  /**
   * Get TV shows airing today.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getAiringToday: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.TVShowsAiringTodayResponse>("/tv/airing_today", {
      signal,
    }),

  /**
   * Get TV shows currently on the air.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getOnTheAir: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.TVShowsOnTheAirResponse>("/tv/on_the_air", {
      signal,
    }),

  /**
   * Get a list of popular TV shows.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getPopular: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.PopularTVShowsResponse>("/tv/popular", { signal }),

  /**
   * Get a list of top-rated TV shows.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getTopRated: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.TopRatedTVShowsResponse>("/tv/top_rated", {
      signal,
    }),

  /**
   * Discover TV shows by genre.
   * @param genreId - TMDB genre ID
   * @param page - Page number for pagination (default = 1)
   * @param signal - Abort signal to cancel the request (optional)
   */
  getByGenre: (genreId: number, page = 1, signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.DiscoverTVShowsResponse>("/discover/tv", {
      params: { with_genres: genreId, page },
      signal,
    }),

  /**
   * Get list of all TV genres.
   * @param signal - Abort signal to cancel the request (optional)
   */
  getGenres: (signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.GenresResponse>("/genre/tv/list", { signal }),

  /**
   * Get detailed information about a TV show by ID.
   * @param id - TV show ID
   * @param signal - Abort signal to cancel the request (optional)
   */
  getDetails: (id: number, signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.TVShowDetailResponse>(`/tv/${id}`, { signal }),

  /**
   * Get details for a specific TV season.
   * @param tvId - TV show ID
   * @param seasonNumber - Season number
   * @param signal - Abort signal to cancel the request (optional)
   */
  getSeasonDetails: (
    tvId: number,
    seasonNumber: number,
    signal?: AbortSignal
  ) =>
    apiClient.get<TMDBTypes.TVSeasonDetailResponse>(
      `/tv/${tvId}/season/${seasonNumber}`,
      { signal }
    ),

  /**
   * Get official videos (trailers, teasers, etc.) for a TV show.
   * @param id - TV show ID
   * @param signal - Abort signal to cancel the request (optional)
   */
  getVideos: (id: number, signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.VideosResponse>(`/tv/${id}/videos`, { signal }),
};

/** Search-related requests */
export const searchRequests = {
  /**
   * Search movies, TV shows, and people in one go.
   * @param query - Search keyword
   * @param page - Page number for pagination (default = 1)
   * @param signal - Abort signal to cancel the request (optional)
   */
  multi: (query: string, page = 1, signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.MultiSearchResponse>("/search/multi", {
      params: { query, page },
      signal,
    }),

  /**
   * Search for movies by title.
   * @param query - Search keyword
   * @param page - Page number for pagination (default = 1)
   * @param signal - Abort signal to cancel the request (optional)
   */
  movie: (query: string, page = 1, signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.SearchMoviesResponse>("/search/movie", {
      params: { query, page },
      signal,
    }),

  /**
   * Search for TV shows by title.
   * @param query - Search keyword
   * @param page - Page number for pagination (default = 1)
   * @param signal - Abort signal to cancel the request (optional)
   */
  tv: (query: string, page = 1, signal?: AbortSignal) =>
    apiClient.get<TMDBTypes.SearchTVShowsResponse>("/search/tv", {
      params: { query, page },
      signal,
    }),
};

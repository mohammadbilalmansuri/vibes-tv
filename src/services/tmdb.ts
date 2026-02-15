import { TMDB_API_BASE_URL, TMDB_API_TOKEN } from "@/constants";
import type {
  GenresResponse,
  TVShowDetails,
  MovieDetails,
  SearchResponse,
  TrendingResponse,
  VideosResponse,
  MovieResponse,
  MovieResponseWithDates,
  TVShowResponse,
  TVSeasonDetails,
} from "@/types/tmdb";
import createApiClient from "./api";

// TMDB API client
const apiClient = createApiClient({
  baseUrl: TMDB_API_BASE_URL,
  headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
});

/**
 * Get trending content of the day.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getTrending(signal?: AbortSignal) {
  return apiClient.get<TrendingResponse>("/trending/all/day", { signal });
}

// ---------- Movies Requests ----------

/**
 * Get movies currently playing in theaters.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getNowPlayingMovies(signal?: AbortSignal) {
  return apiClient.get<MovieResponseWithDates>("/movie/now_playing", {
    signal,
  });
}

/**
 * Get a list of popular movies.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getPopularMovies(signal?: AbortSignal) {
  return apiClient.get<MovieResponse>("/movie/popular", { signal });
}

/**
 * Get a list of top-rated movies.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getTopRatedMovies(signal?: AbortSignal) {
  return apiClient.get<MovieResponse>("/movie/top_rated", { signal });
}

/**
 * Get a list of upcoming movies.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getUpcomingMovies(signal?: AbortSignal) {
  return apiClient.get<MovieResponseWithDates>("/movie/upcoming", { signal });
}

/**
 * Discover movies by genre.
 * @param genreId - TMDB genre ID
 * @param page - Page number for pagination (default = 1)
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getMoviesByGenre(
  genreId: number,
  page = 1,
  signal?: AbortSignal
) {
  return apiClient.get<MovieResponse>("/discover/movie", {
    params: { with_genres: genreId, page },
    signal,
  });
}

/**
 * Get list of all movie genres.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getMovieGenres(signal?: AbortSignal) {
  return apiClient.get<GenresResponse>("/genre/movie/list", { signal });
}

/**
 * Get detailed information about a movie by ID.
 * @param id - Movie ID
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getMovieDetails(id: number, signal?: AbortSignal) {
  return apiClient.get<MovieDetails>(`/movie/${id}`, { signal });
}

/**
 * Get official videos (trailers, teasers, etc.) for a movie.
 * @param id - Movie ID
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getMovieVideos(id: number, signal?: AbortSignal) {
  return apiClient.get<VideosResponse>(`/movie/${id}/videos`, { signal });
}

// ---------- TV Shows Requests ----------

/**
 * Get TV shows airing today.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getTVShowsAiringToday(signal?: AbortSignal) {
  return apiClient.get<TVShowResponse>("/tv/airing_today", { signal });
}

/**
 * Get TV shows currently on the air.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getTVShowsOnTheAir(signal?: AbortSignal) {
  return apiClient.get<TVShowResponse>("/tv/on_the_air", { signal });
}

/**
 * Get a list of popular TV shows.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getPopularTVShows(signal?: AbortSignal) {
  return apiClient.get<TVShowResponse>("/tv/popular", { signal });
}

/**
 * Get a list of top-rated TV shows.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getTopRatedTVShows(signal?: AbortSignal) {
  return apiClient.get<TVShowResponse>("/tv/top_rated", { signal });
}

/**
 * Discover TV shows by genre.
 * @param genreId - TMDB genre ID
 * @param page - Page number for pagination (default = 1)
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getTVShowsByGenre(
  genreId: number,
  page = 1,
  signal?: AbortSignal
) {
  return apiClient.get<TVShowResponse>("/discover/tv", {
    params: { with_genres: genreId, page },
    signal,
  });
}

/**
 * Get list of all TV genres.
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getTVGenres(signal?: AbortSignal) {
  return apiClient.get<GenresResponse>("/genre/tv/list", { signal });
}

/**
 * Get detailed information about a TV show by ID.
 * @param id - TV show ID
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getTVShowDetails(id: number, signal?: AbortSignal) {
  return apiClient.get<TVShowDetails>(`/tv/${id}`, { signal });
}

/**
 * Get details for a specific TV season.
 * @param tvId - TV show ID
 * @param seasonNumber - Season number
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getTVSeasonDetails(
  tvId: number,
  seasonNumber: number,
  signal?: AbortSignal
) {
  return apiClient.get<TVSeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`, {
    signal,
  });
}

/**
 * Get official videos (trailers, teasers, etc.) for a TV show.
 * @param id - TV show ID
 * @param signal - Abort signal to cancel the request (optional)
 */
export function getTVShowVideos(id: number, signal?: AbortSignal) {
  return apiClient.get<VideosResponse>(`/tv/${id}/videos`, { signal });
}

// ---------- Search Request ----------

/**
 * Search content by mode (multi, movie, or tv).
 *
 * @param mode - "multi" | "movie" | "tv"
 * @param query - Search keyword
 * @param page - Page number for pagination (default = 1)
 * @param signal - Abort signal to cancel the request (optional)
 */
export function searchContent(
  mode: "multi" | "movie" | "tv",
  query: string,
  page = 1,
  signal?: AbortSignal
) {
  return apiClient.get<SearchResponse>(`/search/${mode}`, {
    params: { query, page },
    signal,
  });
}

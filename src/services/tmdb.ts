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

export function getTrending(signal?: AbortSignal) {
  return apiClient.get<TrendingResponse>("/trending/all/day", { signal });
}

// Movies Requests

export function getNowPlayingMovies(signal?: AbortSignal) {
  return apiClient.get<MovieResponseWithDates>("/movie/now_playing", {
    signal,
  });
}

export function getPopularMovies(signal?: AbortSignal) {
  return apiClient.get<MovieResponse>("/movie/popular", { signal });
}

export function getTopRatedMovies(signal?: AbortSignal) {
  return apiClient.get<MovieResponse>("/movie/top_rated", { signal });
}

export function getUpcomingMovies(signal?: AbortSignal) {
  return apiClient.get<MovieResponseWithDates>("/movie/upcoming", { signal });
}

export function getMoviesByGenre(
  genreId: number,
  page = 1,
  signal?: AbortSignal,
) {
  return apiClient.get<MovieResponse>("/discover/movie", {
    params: { with_genres: genreId, page },
    signal,
  });
}

export function getMovieGenres(signal?: AbortSignal) {
  return apiClient.get<GenresResponse>("/genre/movie/list", { signal });
}

export function getMovieDetails(id: number, signal?: AbortSignal) {
  return apiClient.get<MovieDetails>(`/movie/${id}`, { signal });
}

export function getMovieVideos(id: number, signal?: AbortSignal) {
  return apiClient.get<VideosResponse>(`/movie/${id}/videos`, { signal });
}

// TV Shows Requests

export function getTVShowsAiringToday(signal?: AbortSignal) {
  return apiClient.get<TVShowResponse>("/tv/airing_today", { signal });
}

export function getTVShowsOnTheAir(signal?: AbortSignal) {
  return apiClient.get<TVShowResponse>("/tv/on_the_air", { signal });
}

export function getPopularTVShows(signal?: AbortSignal) {
  return apiClient.get<TVShowResponse>("/tv/popular", { signal });
}

export function getTopRatedTVShows(signal?: AbortSignal) {
  return apiClient.get<TVShowResponse>("/tv/top_rated", { signal });
}

export function getTVShowsByGenre(
  genreId: number,
  page = 1,
  signal?: AbortSignal,
) {
  return apiClient.get<TVShowResponse>("/discover/tv", {
    params: { with_genres: genreId, page },
    signal,
  });
}

export function getTVGenres(signal?: AbortSignal) {
  return apiClient.get<GenresResponse>("/genre/tv/list", { signal });
}

export function getTVShowDetails(id: number, signal?: AbortSignal) {
  return apiClient.get<TVShowDetails>(`/tv/${id}`, { signal });
}

export function getTVSeasonDetails(
  tvId: number,
  seasonNumber: number,
  signal?: AbortSignal,
) {
  return apiClient.get<TVSeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`, {
    signal,
  });
}

export function getTVShowVideos(id: number, signal?: AbortSignal) {
  return apiClient.get<VideosResponse>(`/tv/${id}/videos`, { signal });
}

// Search Request
export function searchContent(
  mode: "multi" | "movie" | "tv",
  query: string,
  page = 1,
  signal?: AbortSignal,
) {
  return apiClient.get<SearchResponse>(`/search/${mode}`, {
    params: { query, page },
    signal,
  });
}

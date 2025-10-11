import { TMDB_API_BASE_URL, TMDB_API_TOKEN } from "@/constants";
import {
  MediaType,
  Movie,
  MovieDetails,
  SearchResult,
  TimeWindow,
  TMDBResponse,
  TVShow,
  TVShowDetails,
} from "@/types";

// Base API configuration
const API_CONFIG = {
  headers: {
    Authorization: `Bearer ${TMDB_API_TOKEN}`,
    "Content-Type": "application/json",
  },
};

// Generic fetch function with error handling
async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${TMDB_API_BASE_URL}${endpoint}`, API_CONFIG);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Movie API functions
export const movieApi = {
  // Get latest movies (discover with recent release dates)
  getLatest: (page: number = 1) =>
    apiRequest<TMDBResponse<Movie>>(
      `discover/movie?page=${page}&sort_by=release_date.desc&primary_release_date.lte=${new Date().toISOString().split("T")[0]}`
    ),

  // Get popular movies
  getPopular: (page: number = 1) =>
    apiRequest<TMDBResponse<Movie>>(`movie/popular?page=${page}`),

  // Get upcoming movies
  getUpcoming: (page: number = 1) =>
    apiRequest<TMDBResponse<Movie>>(`movie/upcoming?page=${page}`),

  // Get trending movies
  getTrending: (timeWindow: TimeWindow = "week") =>
    apiRequest<TMDBResponse<Movie>>(`trending/movie/${timeWindow}`),

  // Get movie details
  getDetails: (id: number) => apiRequest<MovieDetails>(`movie/${id}`),

  // Search movies
  search: (query: string, page: number = 1) =>
    apiRequest<TMDBResponse<Movie>>(
      `search/movie?query=${encodeURIComponent(query)}&page=${page}`
    ),
};

// TV Show API functions
export const tvApi = {
  // Get latest TV shows (discover with recent air dates)
  getLatest: (page: number = 1) =>
    apiRequest<TMDBResponse<TVShow>>(
      `discover/tv?page=${page}&sort_by=first_air_date.desc&first_air_date.lte=${new Date().toISOString().split("T")[0]}`
    ),

  // Get popular TV shows
  getPopular: (page: number = 1) =>
    apiRequest<TMDBResponse<TVShow>>(`tv/popular?page=${page}`),

  // Get airing today
  getAiringToday: (page: number = 1) =>
    apiRequest<TMDBResponse<TVShow>>(`tv/airing_today?page=${page}`),

  // Get on the air (currently airing)
  getOnTheAir: (page: number = 1) =>
    apiRequest<TMDBResponse<TVShow>>(`tv/on_the_air?page=${page}`),

  // Get trending TV shows
  getTrending: (timeWindow: TimeWindow = "week") =>
    apiRequest<TMDBResponse<TVShow>>(`trending/tv/${timeWindow}`),

  // Get TV show details
  getDetails: (id: number) => apiRequest<TVShowDetails>(`tv/${id}`),

  // Search TV shows
  search: (query: string, page: number = 1) =>
    apiRequest<TMDBResponse<TVShow>>(
      `search/tv?query=${encodeURIComponent(query)}&page=${page}`
    ),
};

// Multi-search API (searches both movies and TV shows)
export const searchApi = {
  multi: (query: string, page: number = 1) =>
    apiRequest<TMDBResponse<SearchResult>>(
      `search/multi?query=${encodeURIComponent(query)}&page=${page}`
    ),
};

// Combined trending API
export const trendingApi = {
  getAll: (mediaType: MediaType, timeWindow: TimeWindow = "week") =>
    apiRequest<TMDBResponse<Movie | TVShow>>(
      `trending/${mediaType}/${timeWindow}`
    ),
};

// Utility functions for image URLs
export const getImageUrl = (path: string | null, size: string = "w500") => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: string = "w1280") => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

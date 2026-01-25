import { useQueries, useInfiniteQuery } from "@tanstack/react-query";
import {
  NOW_PLAYING_CACHE_CONFIG,
  CONTENT_LIST_CACHE_CONFIG,
  GENRE_DISCOVER_CACHE_CONFIG,
  DETAIL_CACHE_CONFIG,
} from "@/constants";
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getMoviesByGenre,
  getMovieDetails,
  getMovieVideos,
} from "@/services/tmdb";

/**
 * Fetches Now Playing and Upcoming movies in parallel.
 * @returns [nowPlayingMoviesResult, upcomingMoviesResult]
 */
export function useNowPlayingAndUpcomingMovies() {
  return useQueries({
    queries: [
      {
        queryKey: ["movies", "nowPlaying"],
        queryFn: ({ signal }) => getNowPlayingMovies(signal),
        ...NOW_PLAYING_CACHE_CONFIG,
      },
      {
        queryKey: ["movies", "upcoming"],
        queryFn: ({ signal }) => getUpcomingMovies(signal),
        ...CONTENT_LIST_CACHE_CONFIG,
      },
    ],
  });
}

/**
 * Fetches movies for a specific genre with infinite scrolling.
 * @param genreId - TMDB genre ID
 * @returns Infinite query result containing pages of movies for the genre
 */
export function useMoviesByGenre(genreId: number) {
  return useInfiniteQuery({
    queryKey: ["movies", "genre", genreId],
    queryFn: ({ pageParam = 1, signal }) =>
      getMoviesByGenre(genreId, pageParam, signal),
    getNextPageParam: (lastPageResponse) =>
      lastPageResponse.page < lastPageResponse.total_pages
        ? lastPageResponse.page + 1
        : undefined,
    initialPageParam: 1,
    enabled: !!genreId,
    ...GENRE_DISCOVER_CACHE_CONFIG,
  });
}

/**
 * Fetches movie details and videos in parallel.
 * @param movieId - TMDB movie ID
 * @returns [movieDetailsResult, movieVideosResult]
 */
export function useMovieDetails(movieId: number) {
  return useQueries({
    queries: [
      {
        queryKey: ["movie", "details", movieId],
        queryFn: ({ signal }) => getMovieDetails(movieId, signal),
        enabled: !!movieId,
        ...DETAIL_CACHE_CONFIG,
      },
      {
        queryKey: ["movie", "videos", movieId],
        queryFn: ({ signal }) => getMovieVideos(movieId, signal),
        enabled: !!movieId,
        ...DETAIL_CACHE_CONFIG,
      },
    ],
  });
}

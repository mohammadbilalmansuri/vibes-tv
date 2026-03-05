import { useQuery, useQueries, useInfiniteQuery } from "@tanstack/react-query";
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
} from "@/services/tmdb";

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

export function useMovieDetails(movieId: number) {
  const result = useQuery({
    queryKey: ["movie", "details", movieId],
    queryFn: ({ signal }) => getMovieDetails(movieId, signal),
    enabled: !!movieId,
    ...DETAIL_CACHE_CONFIG,
  });
  return [result] as const;
}

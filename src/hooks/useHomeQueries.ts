import { useQueries } from "@tanstack/react-query";
import {
  TRENDING_CACHE_CONFIG,
  POPULAR_CACHE_CONFIG,
  CONTENT_LIST_CACHE_CONFIG,
} from "@/constants";
import {
  getTrending,
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  getTopRatedTVShows,
} from "@/services/tmdb";

/**
 * Fetches home screen data in parallel:
 * - Trending (mixed: movies + TV shows + persons)
 * - Popular Movies
 * - Popular TV Shows
 * - Top Rated Movies
 * - Top Rated TV Shows
 *
 * @returns Array of query results in fixed order:
 * [trending, popularMovies, popularTV, topRatedMovies, topRatedTV]
 */
export default function useHomeQueries() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["trending"],
        queryFn: ({ signal }) => getTrending(signal),
        ...TRENDING_CACHE_CONFIG,
      },
      {
        queryKey: ["popular", "movies"],
        queryFn: ({ signal }) => getPopularMovies(signal),
        ...POPULAR_CACHE_CONFIG,
      },
      {
        queryKey: ["popular", "tvShows"],
        queryFn: ({ signal }) => getPopularTVShows(signal),
        ...POPULAR_CACHE_CONFIG,
      },
      {
        queryKey: ["topRated", "movies"],
        queryFn: ({ signal }) => getTopRatedMovies(signal),
        ...CONTENT_LIST_CACHE_CONFIG,
      },
      {
        queryKey: ["topRated", "tvShows"],
        queryFn: ({ signal }) => getTopRatedTVShows(signal),
        ...CONTENT_LIST_CACHE_CONFIG,
      },
    ],
  });

  return results.map((result) => ({
    ...result,
    data: result.data?.results ?? [],
  }));
}

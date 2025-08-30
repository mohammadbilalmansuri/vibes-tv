import { useQueries } from "@tanstack/react-query";

import {
  CONTENT_LIST_CACHE_CONFIG,
  NOW_PLAYING_CACHE_CONFIG,
  POPULAR_CACHE_CONFIG,
} from "@/constants";
import {
  getPopularTVShows,
  getTopRatedTVShows,
  getTVShowsAiringToday,
  getTVShowsOnTheAir,
} from "@/services/tmdb";

/**
 * Hook for fetching main TV show categories in parallel:
 * Popular, Top Rated, Airing Today, and On The Air.
 *
 * @returns Object with TV show category data, loading/error states, and refetch functions.
 */
export default function useTvShowCategories() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["tv", "popular"],
        queryFn: ({ signal }) => getPopularTVShows(signal),
        ...POPULAR_CACHE_CONFIG,
      },
      {
        queryKey: ["tv", "topRated"],
        queryFn: ({ signal }) => getTopRatedTVShows(signal),
        ...CONTENT_LIST_CACHE_CONFIG,
      },
      {
        queryKey: ["tv", "airingToday"],
        queryFn: ({ signal }) => getTVShowsAiringToday(signal),
        ...NOW_PLAYING_CACHE_CONFIG,
      },
      {
        queryKey: ["tv", "onTheAir"],
        queryFn: ({ signal }) => getTVShowsOnTheAir(signal),
        ...NOW_PLAYING_CACHE_CONFIG,
      },
    ],
  });

  const [
    popularTvShowsResult,
    topRatedTvShowsResult,
    airingTodayTvShowsResult,
    onTheAirTvShowsResult,
  ] = results;

  return {
    popularTvShows: popularTvShowsResult.data?.results ?? [],
    topRatedTvShows: topRatedTvShowsResult.data?.results ?? [],
    airingTodayTvShows: airingTodayTvShowsResult.data?.results ?? [],
    onTheAirTvShows: onTheAirTvShowsResult.data?.results ?? [],
    isLoading: results.some((r) => r.isLoading),
    errors: {
      popularTvShows: popularTvShowsResult.error ?? null,
      topRatedTvShows: topRatedTvShowsResult.error ?? null,
      airingTodayTvShows: airingTodayTvShowsResult.error ?? null,
      onTheAirTvShows: onTheAirTvShowsResult.error ?? null,
    },
    refetch: {
      all: () => Promise.all(results.map((r) => r.refetch())),
      popularTvShows: popularTvShowsResult.refetch,
      topRatedTvShows: topRatedTvShowsResult.refetch,
      airingTodayTvShows: airingTodayTvShowsResult.refetch,
      onTheAirTvShows: onTheAirTvShowsResult.refetch,
    },
  };
}

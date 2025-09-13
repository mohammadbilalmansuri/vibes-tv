import { useQuery, useQueries, useInfiniteQuery } from "@tanstack/react-query";
import {
  NOW_PLAYING_CACHE_CONFIG,
  DETAIL_CACHE_CONFIG,
  GENRE_DISCOVER_CACHE_CONFIG,
} from "@/constants";
import {
  getTVShowDetails,
  getTVShowVideos,
  getTVSeasonDetails,
  getTVShowsAiringToday,
  getTVShowsOnTheAir,
  getTVShowsByGenre,
} from "@/services/tmdb";

/**
 * Fetches Airing Today and On The Air TV shows in parallel.
 * @returns [airingTodayTvShowsResult, onTheAirTvShowsResult]
 */
export function useAiringAndOnTheAirTVShows() {
  return useQueries({
    queries: [
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
}

/**
 * Fetches TV shows for a specific genre with infinite scrolling.
 * @param genreId - TMDB genre ID
 * @returns Infinite query result containing pages of TV shows
 */
export function useTVShowsByGenre(genreId: number) {
  return useInfiniteQuery({
    queryKey: ["tv", "genre", genreId],
    queryFn: ({ pageParam = 1, signal }) =>
      getTVShowsByGenre(genreId, pageParam, signal),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!genreId,
    ...GENRE_DISCOVER_CACHE_CONFIG,
  });
}

/**
 * Fetches TV show details and videos in parallel.
 * @param tvId - TMDB TV show ID
 * @returns [tvShowDetailsResult, tvShowVideosResult]
 */
export function useTVShowDetails(tvId: number) {
  return useQueries({
    queries: [
      {
        queryKey: ["tv", "details", tvId],
        queryFn: ({ signal }) => getTVShowDetails(tvId, signal),
        enabled: !!tvId,
        ...DETAIL_CACHE_CONFIG,
      },
      {
        queryKey: ["tv", "videos", tvId],
        queryFn: ({ signal }) => getTVShowVideos(tvId, signal),
        enabled: !!tvId,
        ...DETAIL_CACHE_CONFIG,
      },
    ],
  });
}

/**
 * Fetches details of a specific TV season.
 * @param tvId - TMDB TV show ID
 * @param seasonNumber - Season number
 * @returns Object containing season details and query state
 */
export function useTVSeasonDetails(tvId: number, seasonNumber: number) {
  return useQuery({
    queryKey: ["tv", "season", tvId, seasonNumber],
    queryFn: ({ signal }) => getTVSeasonDetails(tvId, seasonNumber, signal),
    enabled: !!tvId && seasonNumber >= 0,
    ...DETAIL_CACHE_CONFIG,
  });
}

import React from "react";
import { Text } from "react-native";
import { ScreenView } from "@/components";
import { useGenres, useTvShowCategories, useTvShowsByGenre } from "@/hooks";

export default function Tv() {
  const {
    tvGenres,
    isLoading: genresLoading,
    errors: genresErrors,
  } = useGenres();
  const {
    airingTodayTvShows,
    onTheAirTvShows,
    popularTvShows,
    topRatedTvShows,
    isLoading: categoriesLoading,
    errors: categoriesErrors,
    refetch: categoriesRefetch,
  } = useTvShowCategories();

  return (
    <ScreenView inSafeArea={false}>
      <Text>Tv</Text>
    </ScreenView>
  );
}

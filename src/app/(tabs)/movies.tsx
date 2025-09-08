import React from "react";
import { Text } from "react-native";
import { ScreenView } from "@/components";
import { useGenres, useMovieCategories, useMoviesByGenre } from "@/hooks";

export default function Movies() {
  const {
    movieGenres,
    isLoading: genresLoading,
    errors: genresErrors,
  } = useGenres();
  const {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    nowPlayingMovies,
    isLoading: categoriesLoading,
    errors: categoriesErrors,
  } = useMovieCategories();

  return (
    <ScreenView inSafeArea={false}>
      <Text>Movies</Text>
    </ScreenView>
  );
}

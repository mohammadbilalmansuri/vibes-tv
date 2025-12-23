import React from "react";
import { Text } from "react-native";
import { ScreenView } from "@/components";
import { useLocalSearchParams } from "expo-router";
import { useMovieDetails } from "@/hooks";

export default function Movie() {
  const { id } = useLocalSearchParams();
  const { details, videos, isLoading, errors, refetch } = useMovieDetails(
    Number(id)
  );

  return (
    <ScreenView>
      <Text>Movie Detail for ID: {id}</Text>
    </ScreenView>
  );
}

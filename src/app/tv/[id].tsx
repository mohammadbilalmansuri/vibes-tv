import React from "react";
import { Text } from "react-native";
import { ScreenView } from "@/components";
import { useTvShowDetails } from "@/hooks";
import { useLocalSearchParams } from "expo-router";

export default function TVShow() {
  const { id } = useLocalSearchParams();
  const { details, isLoading, errors, refetch } = useTvShowDetails(Number(id));

  return (
    <ScreenView>
      <Text>TV Show Detail for ID: {id}</Text>
    </ScreenView>
  );
}

import React from "react";
import { Text } from "react-native";
import { ScreenView } from "@/components/root";
import { useLocalSearchParams } from "expo-router";

export default function TVShow() {
  const { id } = useLocalSearchParams();

  return (
    <ScreenView>
      <Text>TV Show Detail for ID: {id}</Text>
    </ScreenView>
  );
}

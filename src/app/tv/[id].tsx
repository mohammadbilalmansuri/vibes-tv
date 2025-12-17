import React from "react";
import { Text } from "react-native";
import { ScreenView } from "@/components";
import { useLocalSearchParams } from "expo-router";

export default function TVShow() {
  const { id } = useLocalSearchParams();

  return (
    <ScreenView>
      <Text className="text-white">TV Show Detail for ID: {id}</Text>
    </ScreenView>
  );
}

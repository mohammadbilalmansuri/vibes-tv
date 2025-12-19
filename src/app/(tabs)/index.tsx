import React from "react";
import { Text } from "react-native";
import { ScreenView } from "@/components";

export default function Home() {
  return (
    <ScreenView inSafeArea={false}>
      <Text>Home</Text>
    </ScreenView>
  );
}

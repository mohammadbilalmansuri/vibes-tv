import React from "react";
import { Stack } from "expo-router";
import { AppProvider } from "@/components";
import "@/global.css";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
          animationDuration: 200,
          gestureEnabled: false,
          animationTypeForReplace: "pop",
          freezeOnBlur: true,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movie/[id]" />
        <Stack.Screen name="tv/[id]" />
        <Stack.Screen name="search" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AppProvider>
  );
}

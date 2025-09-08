import React, { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { DEFAULT_COLORS } from "@/constants";
import "@/global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export default function RootLayout() {
  // Online/offline detection
  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
      return () => unsubscribe();
    });
  }, []);

  // Foreground/background detection
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (status: AppStateStatus) => {
        focusManager.setFocused(status === "active");
      }
    );
    return () => subscription.remove();
  }, []);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: DEFAULT_COLORS[950] }}
    >
      <SafeAreaProvider
        style={{ flex: 1, backgroundColor: DEFAULT_COLORS[950] }}
      >
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade_from_bottom",
              animationDuration: 200,
              gestureEnabled: false,
              animationTypeForReplace: "pop",
              freezeOnBlur: true,
              contentStyle: { backgroundColor: DEFAULT_COLORS[950] },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="movie/[id]" />
            <Stack.Screen name="tv/[id]" />
            <Stack.Screen name="search" />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

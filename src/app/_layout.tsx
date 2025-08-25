import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 2,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  // React Query focus manager integration for RN
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        focusManager.setFocused(true);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          style="light"
          backgroundColor="#030712"
          translucent={Platform.OS === "android"}
        />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#030712" }, // secondary-950
            animation: "slide_from_right",
            animationDuration: 300,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              gestureEnabled: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="movie/[id]"
            options={{
              headerShown: false,
              presentation: "modal",
              gestureEnabled: true,
              animation: "slide_from_bottom",
              animationDuration: 400,
            }}
          />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

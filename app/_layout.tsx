import { useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

// Query Client with sane mobile defaults
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
  // Online/offline detection (recommended pattern)
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar
            style="light"
            backgroundColor="var(--color-gray-900)"
            translucent={Platform.OS === "android"}
          />

          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "var(--color-gray-900)" },
              animationDuration: 300,
            }}
          >
            {/* Main Tabs */}
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, gestureEnabled: false }}
            />

            {/* Details */}
            <Stack.Screen
              name="movie/[id]"
              options={{ presentation: "modal", gestureEnabled: true }}
            />
            <Stack.Screen
              name="tv/[id]"
              options={{ presentation: "modal", gestureEnabled: true }}
            />

            {/* Search */}
            <Stack.Screen
              name="search"
              options={{ presentation: "modal", gestureEnabled: true }}
            />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

import React, { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import NetInfo from "@react-native-community/netinfo";
import * as SplashScreen from "expo-splash-screen";
import { COLORS } from "@/constants";
import { ChildProps } from "@/types";
import OfflineScreen from "./OfflineScreen";
import AppBootstrap from "./AppBootstrap";

SplashScreen.preventAutoHideAsync().catch(() => {});

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

export default function AppProvider({ children }: ChildProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        const connected = !!state.isConnected;
        setOnline(connected);
        setIsOnline(connected);
      });
      return () => unsubscribe();
    });
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (status: AppStateStatus) => focusManager.setFocused(status === "active")
    );
    return () => subscription.remove();
  }, []);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: COLORS.shark.primary }}
    >
      <SafeAreaProvider
        style={{ flex: 1, backgroundColor: COLORS.shark.primary }}
      >
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          {isOnline ? (
            <AppBootstrap>{children}</AppBootstrap>
          ) : (
            <OfflineScreen />
          )}
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

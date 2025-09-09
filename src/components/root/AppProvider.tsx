import React, { useEffect } from "react";
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
import { useNetInfo } from "@react-native-community/netinfo";
import { DEFAULT_COLORS } from "@/constants";
import OfflineScreen from "./OfflineScreen";
import { ChildProps } from "@/types";

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
  const netInfo = useNetInfo();

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
          {netInfo.isConnected === false ? <OfflineScreen /> : children}
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

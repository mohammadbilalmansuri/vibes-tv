import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { CircleAlert, RefreshCw } from "lucide-react-native";
import { COLORS } from "@/constants";
import { ChildProps } from "@/types";
import useGenres from "@/hooks/useGenres";
import ScreenView from "./ScreenView";

export default function AppBootstrap({ children }: ChildProps) {
  const [movieGenres, tvGenres] = useGenres();
  const [ready, setReady] = useState(false);

  const isLoading = movieGenres.isLoading || tvGenres.isLoading;
  const hasError = movieGenres.isError || tvGenres.isError;
  const errorMessage =
    movieGenres.error?.message || tvGenres.error?.message || "Unknown error";

  useEffect(() => {
    if (isLoading) return;
    setReady(true);
    SplashScreen.hideAsync().catch(() => {});
  }, [isLoading]);

  const handleRetry = async () => {
    if (movieGenres.isError) await movieGenres.refetch();
    if (tvGenres.isError) await tvGenres.refetch();
  };

  if (!ready) return null;

  if (hasError) {
    return (
      <ScreenView className="items-center justify-center gap-5 p-5">
        <View className="bg-shark-secondary p-4 rounded-full">
          <CircleAlert size={32} color={COLORS.rose} strokeWidth={1.5} />
        </View>
        <Text className="text-xl font-semibold text-white text-center">
          Failed to Load
        </Text>
        <Text className="text-white/60 text-center -mt-2 px-8">
          {errorMessage}
        </Text>
        <TouchableOpacity
          onPress={handleRetry}
          activeOpacity={0.7}
          className="flex-row items-center gap-2 bg-rose px-6 py-3 rounded-full mt-2"
        >
          <RefreshCw size={18} color={COLORS.white} />
          <Text className="text-white font-medium">Try Again</Text>
        </TouchableOpacity>
      </ScreenView>
    );
  }

  return <>{children}</>;
}

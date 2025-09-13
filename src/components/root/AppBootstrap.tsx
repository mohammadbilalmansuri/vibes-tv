import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

import { ChildProps } from "@/types";
import useGenres from "@/hooks/useGenres";
import { Text } from "react-native";

export default function AppBootstrap({ children }: ChildProps) {
  const [movieGenres, tvGenres] = useGenres();
  const [ready, setReady] = useState(false);

  const isLoading = movieGenres.isLoading || tvGenres.isLoading;
  const hasError = movieGenres.isError || tvGenres.isError;

  useEffect(() => {
    if (isLoading) return;
    setReady(true);
    SplashScreen.hideAsync().catch(() => {});
  }, [isLoading]);

  if (!ready) return null;

  if (hasError) return <Text>Error loading genres.</Text>;

  return <>{children}</>;
}

import React from "react";
import { View } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import cn from "@/utils/cn";

type ScreenViewProps =
  | ({ inSafeArea?: true } & SafeAreaViewProps)
  | ({ inSafeArea: false } & Omit<SafeAreaViewProps, "edges" | "mode">);

const ScreenView = ({
  children,
  inSafeArea = true,
  className = "",
  ...rest
}: ScreenViewProps) => {
  const Container = inSafeArea ? SafeAreaView : View;

  return (
    <Container className={cn("flex-1 bg-default-950", className)} {...rest}>
      {children}
    </Container>
  );
};

export default ScreenView;

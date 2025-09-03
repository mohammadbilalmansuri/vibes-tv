import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ChildProps } from "@/types";
import cn from "@/utils/cn";

interface ScreenViewProps extends ChildProps {
  className?: string;
}

const ScreenView = ({ children, className = "" }: ScreenViewProps) => {
  return (
    <SafeAreaView
      className={cn("flex-1 bg-default-950", className)}
      edges={["top", "bottom"]}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenView;

import React, { useEffect } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { COLORS } from "@/constants";
import cn from "@/utils/cn";

export type SkeletonProps = {
  className?: string;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  travel?: number;
};

const Skeleton = ({
  className = "w-full h-5 rounded-2xl",
  style,
  duration = 1000,
  travel = 300,
}: SkeletonProps) => {
  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(2, { duration, easing: Easing.linear }),
      -1,
      false
    );
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * travel }],
  }));

  return (
    <View
      className={cn("bg-shark-secondary overflow-hidden", className)}
      accessibilityRole="progressbar"
      style={style}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={[
            COLORS.shark.secondary,
            COLORS.shark.tertiary,
            COLORS.shark.secondary,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

export default Skeleton;

import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle, DimensionValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { DEFAULT_COLORS } from "@/constants";

export type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
  duration?: number;
};

const Skeleton = ({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
  duration = 1000,
}: SkeletonProps) => {
  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 300 }],
  }));

  return (
    <View
      style={[styles.container, { width, height, borderRadius }, style]}
      accessibilityRole="progressbar"
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={[
            DEFAULT_COLORS[800],
            DEFAULT_COLORS[700],
            DEFAULT_COLORS[800],
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DEFAULT_COLORS[800],
    overflow: "hidden",
  },
});

export default Skeleton;

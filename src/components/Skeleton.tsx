import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle, DimensionValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
};

const Skeleton = ({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
}: SkeletonProps) => {
  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 300 }],
  }));

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={["#e0e0e0", "#f5f5f5", "#e0e0e0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#e0e0e0", overflow: "hidden" },
});

export default Skeleton;

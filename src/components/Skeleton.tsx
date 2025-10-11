import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  className?: string;
}

export const Skeleton = ({
  width = 100,
  height = 20,
  borderRadius = 8,
  className = "",
}: SkeletonProps) => {
  const shimmerValue = useSharedValue(0);

  useEffect(() => {
    shimmerValue.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      shimmerValue.value,
      [0, 0.5, 1],
      [0.3, 0.7, 0.3]
    );

    return {
      opacity,
    };
  });

  return (
    <View
      className={`bg-secondary-700 ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    >
      <Animated.View
        className="bg-secondary-600 w-full h-full"
        style={[
          {
            borderRadius,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export const MovieCardSkeleton = () => (
  <View className="w-24 mr-4">
    <Skeleton width={96} height={144} borderRadius={12} className="mb-2" />
    <Skeleton width={76} height={12} borderRadius={4} className="mb-1" />
    <Skeleton width={58} height={10} borderRadius={4} />
  </View>
);

export const TrendingCardSkeleton = () => (
  <View className="w-48 mr-6">
    <Skeleton width={192} height={280} borderRadius={16} className="mb-3" />
    <Skeleton width={172} height={14} borderRadius={4} className="mb-2" />
    <Skeleton width={134} height={12} borderRadius={4} />
  </View>
);

export const MovieDetailSkeleton = () => (
  <View className="flex-1 bg-secondary-950">
    <Skeleton width={400} height={400} borderRadius={0} className="mb-6" />
    <View className="px-5">
      <Skeleton width={320} height={24} borderRadius={6} className="mb-3" />
      <Skeleton width={240} height={16} borderRadius={4} className="mb-4" />
      <Skeleton width={160} height={32} borderRadius={8} className="mb-6" />

      <View className="space-y-4">
        <Skeleton width={380} height={16} borderRadius={4} />
        <Skeleton width={360} height={16} borderRadius={4} />
        <Skeleton width={340} height={16} borderRadius={4} />
        <Skeleton width={350} height={16} borderRadius={4} />
      </View>
    </View>
  </View>
);

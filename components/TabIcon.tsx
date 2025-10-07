import { JSX, useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface TabIconProps {
  focused: boolean;
  icon: JSX.Element;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.1, {
        damping: 15,
        stiffness: 300,
      });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
      opacity.value = withTiming(0.6, { duration: 200 });
    }
  }, [focused]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(scale.value, [0.9, 1.1], [0, 0.15]);

    return {
      opacity: backgroundOpacity,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View className="justify-center items-center gap-1 min-w-[60px] py-2">
      <View className="relative">
        <Animated.View
          className="absolute inset-0 bg-primary-500 rounded-xl"
          style={backgroundAnimatedStyle}
        />
        <Animated.View
          className="p-3 justify-center items-center"
          style={iconAnimatedStyle}
        >
          {icon}
        </Animated.View>
      </View>

      {focused && (
        <Animated.View entering={FadeIn.duration(200)}>
          <Text
            className="text-xs font-semibold text-primary-400 text-center"
            numberOfLines={1}
          >
            {title}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

export default TabIcon;

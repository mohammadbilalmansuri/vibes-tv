import { JSX, useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
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
  const scale = useSharedValue(focused ? 1 : 0.9);
  const opacity = useSharedValue(focused ? 1 : 0.6);

  useEffect(() => {
    if (focused) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
        mass: 0.8,
      });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withSpring(0.9, {
        damping: 15,
        stiffness: 200,
        mass: 0.8,
      });
      opacity.value = withTiming(0.6, { duration: 200 });
    }
  }, [focused]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(scale.value, [0.9, 1], [0, 1]);

    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
      backgroundColor: focused ? "#0ea5e9" : "transparent",
      borderRadius: 16,
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const textOpacity = interpolate(scale.value, [0.9, 1], [0, 1]);
    return {
      opacity: textOpacity,
    };
  });

  return (
    <View className="items-center justify-center px-2">
      <Animated.View
        style={containerAnimatedStyle}
        className="flex-row items-center justify-center px-4 py-2 min-h-[44px]"
      >
        <View className="mr-1">{icon}</View>

        {focused && (
          <Animated.View style={textAnimatedStyle}>
            <Text
              className="text-xs font-semibold text-white ml-1"
              numberOfLines={1}
            >
              {title}
            </Text>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

export default TabIcon;

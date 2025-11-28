import React, { useCallback } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Home, Film, Tv, Search } from "lucide-react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.Text;

// Theme colors - easily configurable
const COLORS = {
  primary: "#1f2937", // gray-800
  secondary: "#ffffff",
  background: "#111827", // gray-900
  inactive: "#9ca3af", // gray-400
} as const;

// Icon mapping for better maintainability
const getIconComponent = (routeName: string) => {
  const iconMap = {
    index: Home,
    movies: Film,
    tv: Tv,
    search: Search,
  } as const;

  return iconMap[routeName as keyof typeof iconMap] || Home;
};

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  // Memoized press handler for performance
  const createOnPress = useCallback(
    (routeName: string, isFocused: boolean) => {
      return () => {
        // Haptic feedback for better UX
        if (Platform.OS === "ios" && !isFocused) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        const event = navigation.emit({
          type: "tabPress",
          target: state.routes.find((r) => r.name === routeName)?.key || "",
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(routeName);
        }
      };
    },
    [navigation, state.routes]
  );

  return (
    <View
      className="absolute self-center flex-row justify-center items-center bg-gray-800 rounded-full px-3 py-4 shadow-2xl elevation-lg"
      style={{ bottom: insets.bottom + 10 }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const IconComponent = getIconComponent(route.name);

        return (
          <AnimatedTouchableOpacity
            key={route.key}
            layout={LinearTransition.springify().damping(15).stiffness(150)}
            onPress={createOnPress(route.name, isFocused)}
            className={`flex-row justify-center items-center h-9 px-3 rounded-full ${
              isFocused ? "bg-white" : "bg-transparent"
            }`}
            activeOpacity={0.7}
          >
            <IconComponent
              size={20}
              color={isFocused ? COLORS.primary : COLORS.secondary}
              strokeWidth={2.5}
            />

            {isFocused && (
              <AnimatedText
                entering={FadeIn.duration(200).delay(50)}
                exiting={FadeOut.duration(150)}
                className="text-gray-800 ml-2 font-medium text-sm capitalize"
              >
                {label as string}
              </AnimatedText>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

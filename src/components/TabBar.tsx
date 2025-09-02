import React from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import cn from "@/utils/cn";
import { LucideIcon } from "lucide-react-native";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.Text;

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  insets,
}) => {
  const createOnPress = (routeName: string, isFocused: boolean) => {
    return () => {
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
  };

  return (
    <View
      className="absolute self-center flex-row justify-center items-center bg-white rounded-full p-2 elevation-lg"
      style={{ bottom: insets.bottom + 10 }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;
        const IconComponent = options.tabBarIcon as LucideIcon;

        return (
          <AnimatedTouchableOpacity
            key={route.key}
            layout={LinearTransition.springify().damping(15).stiffness(150)}
            onPress={createOnPress(route.name, isFocused)}
            className={cn(
              "flex-row justify-center items-center gap-1 py-2 px-3 rounded-full",
              { "bg-black": isFocused }
            )}
            activeOpacity={0.7}
          >
            {IconComponent && (
              <IconComponent
                size={20}
                strokeWidth={2}
                color={isFocused ? "white" : "black"}
              />
            )}

            {isFocused && (
              <AnimatedText
                entering={FadeIn.duration(200).delay(50)}
                exiting={FadeOut.duration(150)}
                className="text-white font-medium uppercase"
              >
                {label.toUpperCase()}
              </AnimatedText>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

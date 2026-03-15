import { View, TouchableOpacity, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@/utils";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  const handleTabPress = (routeName: string, isFocused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes.find((r) => r.name === routeName)?.key || "",
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View
      className="absolute bottom-0 left-0 right-0 items-center pt-2.5"
      style={{ paddingBottom: Math.max(insets.bottom, 10) }}
    >
      <View className="bg-white rounded-full flex-row justify-center items-center p-1 elevation-lg">
        {state.routes.map((route, index) => {
          const label = descriptors[route.key].options.title ?? route.name;
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handleTabPress(route.name, isFocused)}
              className={cn(
                "flex-row justify-center items-center gap-1 py-3 px-4 rounded-full",
                { "bg-rose": isFocused },
              )}
              activeOpacity={0.6}
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={label}
            >
              <Text
                className={cn(
                  "font-medium text-lg leading-none",
                  isFocused ? "text-white" : "text-shark-secondary",
                )}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;

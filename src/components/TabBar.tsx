import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import cn from "@/utils/cn";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const createOnPress = (routeName: string, isFocused: boolean) => {
    return () => {
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
      className="bg-default-500 rounded-full self-center flex-row justify-center items-center p-1 elevation-lg"
      style={{ bottom: 10 }}
    >
      {state.routes.map((route, index) => {
        const label = descriptors[route.key].options.title ?? route.name;
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={createOnPress(route.name, isFocused)}
            className={cn(
              "flex-row justify-center items-center gap-1 py-1.5 px-4 rounded-full",
              { "bg-default-950": isFocused }
            )}
            activeOpacity={0.5}
          >
            <Text
              className={cn("font-medium text-lg", {
                "text-default-50": isFocused,
              })}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

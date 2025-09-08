import React from "react";
import { Tabs } from "expo-router";
import { TabHeader, ScreenView, TabBar } from "@/components";

export default function TabsLayout() {
  return (
    <ScreenView>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          header: () => <TabHeader />,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="movies" options={{ title: "Movies" }} />
        <Tabs.Screen name="tv" options={{ title: "TV" }} />
      </Tabs>
    </ScreenView>
  );
}

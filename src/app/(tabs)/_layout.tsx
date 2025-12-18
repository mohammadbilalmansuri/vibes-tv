import React from "react";
import { Tabs } from "expo-router";
import { Header, ScreenView, TabBar } from "@/components";

export default function TabsLayout() {
  return (
    <ScreenView>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          header: () => <Header />,
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

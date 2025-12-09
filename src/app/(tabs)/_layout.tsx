import React from "react";
import { Tabs } from "expo-router";
import { TabBar } from "@/components";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="movies" options={{ title: "Movies" }} />
      <Tabs.Screen name="tv" options={{ title: "TV" }} />
    </Tabs>
  );
}

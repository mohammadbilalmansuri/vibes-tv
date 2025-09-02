import React from "react";
import { Tabs } from "expo-router";
import { TabBar } from "@/components";
import { Film, House, Tv } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ title: "House", tabBarIcon: House }}
      />
      <Tabs.Screen
        name="movies"
        options={{ title: "Movies", tabBarIcon: Film }}
      />
      <Tabs.Screen name="tv" options={{ title: "TV", tabBarIcon: Tv }} />
    </Tabs>
  );
}

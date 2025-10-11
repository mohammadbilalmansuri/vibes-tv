import { TabIcon } from "@/components";
import { Tabs } from "expo-router";
import { Calendar, Home, Search } from "lucide-react-native";
import { Platform } from "react-native";

const TABS = [
  {
    name: "index" as const,
    title: "Home",
    icon: (color: string, size: number) => <Home color={color} size={size} />,
  },
  {
    name: "search" as const,
    title: "Search",
    icon: (color: string, size: number) => <Search color={color} size={size} />,
  },
  {
    name: "upcoming" as const,
    title: "Upcoming",
    icon: (color: string, size: number) => (
      <Calendar color={color} size={size} />
    ),
  },
] as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#a1a1aa",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1a1f",
          borderTopWidth: 0,
          paddingBottom: Platform.OS === "ios" ? 20 : 15,
          paddingTop: 15,
          paddingHorizontal: 20,
          height: Platform.OS === "ios" ? 85 : 70,
          position: "absolute",
          marginHorizontal: 16,
          marginBottom: Platform.OS === "ios" ? 25 : 15,
          borderRadius: 24,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 8,
          borderWidth: 1,
          borderColor: "#27272a",
        },
        tabBarItemStyle: {
          flex: 0, // This makes tabs adaptive width instead of equal width
          marginHorizontal: 4,
          borderRadius: 16,
          paddingHorizontal: 8,
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                focused={focused}
                icon={tab.icon(focused ? "#ffffff" : color, 20)}
                title={tab.title}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

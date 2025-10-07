import { Tabs } from "expo-router";
import { Home, Search } from "lucide-react-native";
import { Platform } from "react-native";
import { TabIcon } from "../../components";

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
] as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ec4899", // primary-500
        tabBarInactiveTintColor: "#9ca3af", // secondary-400
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1f2937", // secondary-800
          borderTopWidth: 1,
          borderTopColor: "#374151", // secondary-700
          paddingBottom: Platform.OS === "ios" ? 25 : 15,
          paddingTop: 12,
          height: Platform.OS === "ios" ? 90 : 70,
          position: "absolute",
          borderRadius: 24,
          marginHorizontal: 20,
          marginBottom: Platform.OS === "ios" ? 30 : 20,
          shadowColor: "#ec4899",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 12,
          borderWidth: 1,
          borderColor: "#374151",
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 8,
          borderRadius: 16,
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
                icon={tab.icon(focused ? "#ec4899" : color, 24)}
                title={tab.title}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

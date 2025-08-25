import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar
        style="light"
        backgroundColor="#030712"
        translucent={Platform.OS === "android"}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#030712" }, // secondary-950
          animation: "slide_from_right",
          animationDuration: 300,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
            presentation: "modal",
            gestureEnabled: true,
            animation: "slide_from_bottom",
            animationDuration: 400,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

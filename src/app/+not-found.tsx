import React from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { AlertTriangle } from "lucide-react-native";
import { DEFAULT_COLORS } from "@/constants";
import { Button } from "@/components/ui";
import { ScreenView } from "@/components/root";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => router.push("/");

  return (
    <ScreenView className="flex-1 items-center justify-center gap-6 p-4">
      <AlertTriangle
        size={48}
        color={DEFAULT_COLORS.accent}
        strokeWidth={1.5}
      />
      <Text className="text-xl font-semibold text-default-50 text-center">
        Page Not Found
      </Text>
      <Text className="text-default-500 text-center -mt-3">
        The page you’re looking for doesn’t exist.
      </Text>
      <Button title="Go to Home" variant="secondary" onPress={handleGoHome} />
    </ScreenView>
  );
}

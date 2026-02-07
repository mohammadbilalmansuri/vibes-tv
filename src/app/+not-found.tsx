import React from "react";
import { Text, View } from "react-native";
import { CircleOff } from "lucide-react-native";
import { COLORS } from "@/constants";
import { BackHeader, ScreenView } from "@/components/root";

export default function NotFound() {
  return (
    <ScreenView>
      <BackHeader />
      <View className="flex-1 justify-center items-center gap-5 p-5">
        <View className="bg-shark-secondary p-4 rounded-full">
          <CircleOff size={28} color={COLORS.yellow} strokeWidth={1.5} />
        </View>
        <Text className="text-xl font-semibold text-white text-center">
          Unmatched Route
        </Text>
        <Text className="text-white/60 text-center -mt-2">
          The route you are trying to access does not exist.
        </Text>
      </View>
    </ScreenView>
  );
}

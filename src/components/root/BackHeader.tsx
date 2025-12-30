import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { DEFAULT_COLORS } from "@/constants";
import Logo from "../ui/Logo";

const BackHeader = () => {
  const router = useRouter();

  const handleBackPress = () => router.back();

  return (
    <View className="px-5 py-2 flex-row justify-between items-center bg-default-950">
      <TouchableOpacity
        onPress={handleBackPress}
        className="p-2 justify-center items-center bg-default-800 rounded-full"
        activeOpacity={0.5}
      >
        <ArrowLeft size={16} color={DEFAULT_COLORS[300]} />
      </TouchableOpacity>
      <Logo />
      <View className="w-10" />
    </View>
  );
};

export default BackHeader;

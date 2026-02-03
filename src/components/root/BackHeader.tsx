import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { COLORS } from "@/constants";
import { Logo } from "../ui";

const BackHeader = () => {
  const router = useRouter();
  const handleBackPress = () => router.back();

  return (
    <View className="px-5 py-2.5 flex-row justify-between items-center bg-shark-primary">
      <TouchableOpacity
        onPress={handleBackPress}
        className="p-2 justify-center items-center bg-shark-tertiary rounded-full"
        activeOpacity={0.6}
      >
        <ArrowLeft size={18} color={COLORS.white} />
      </TouchableOpacity>
      <Logo />
      <View className="w-10" />
    </View>
  );
};

export default BackHeader;

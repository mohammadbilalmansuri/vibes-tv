import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Search, ArrowLeft } from "lucide-react-native";
import pressWithHaptics from "@/utils/pressWithHaptics";
import Logo from "./Logo";
import { DEFAULT_COLORS } from "@/constants";

const TAB_ROUTES = ["/", "/movies", "/tv"];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isTabsScreen = TAB_ROUTES.includes(pathname);

  const handleSearchPress = async () => {
    await pressWithHaptics(() => router.push("/search"));
  };

  const handleBackPress = async () => {
    await pressWithHaptics(() => router.back());
  };

  return (
    <View className="px-5 py-3 flex-row justify-between items-center">
      {isTabsScreen ? (
        <>
          <Logo />
          <TouchableOpacity
            onPress={handleSearchPress}
            className="p-2 justify-center items-center bg-default-800 rounded-full"
            activeOpacity={0.5}
          >
            <Search size={20} color={DEFAULT_COLORS[300]} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={handleBackPress}
            className="p-2 justify-center items-center bg-default-800 rounded-full"
            activeOpacity={0.5}
          >
            <ArrowLeft size={20} color={DEFAULT_COLORS[300]} />
          </TouchableOpacity>
          <Logo />
          <View className="w-10" />
        </>
      )}
    </View>
  );
};

export default Header;

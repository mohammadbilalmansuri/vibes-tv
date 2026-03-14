import { View, Text, TouchableOpacity } from "react-native";
import { ServerCrash, RefreshCw } from "lucide-react-native";
import { COLORS } from "@/constants";
import ScreenView from "./ScreenView";

interface ServerDownScreenProps {
  onRetry?: () => void;
  message?: string;
}

export default function ServerDownScreen({
  onRetry,
  message = "Unable to connect to the server",
}: ServerDownScreenProps) {
  return (
    <ScreenView className="items-center justify-center gap-5 p-8">
      <View className="bg-shark-secondary p-5 rounded-full">
        <ServerCrash size={40} color={COLORS.yellow} strokeWidth={1.5} />
      </View>

      <View className="items-center gap-2">
        <Text className="text-2xl font-bold text-white text-center">
          Server Unavailable
        </Text>
        <Text className="text-white/60 text-center leading-6">{message}</Text>
      </View>

      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          activeOpacity={0.7}
          className="flex-row items-center gap-2 bg-white/10 px-6 py-3 rounded-full mt-4"
        >
          <RefreshCw size={18} color={COLORS.white} />
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      )}

      <Text className="text-white/40 text-sm text-center mt-4">
        This could be a temporary issue. Please check back later.
      </Text>
    </ScreenView>
  );
}

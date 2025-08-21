import cn from "@/utils/cn";
import { Image, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: any;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  return (
    <View
      className={cn("size-full justify-center items-center mt-4 rounded-full", {
        "bg-blue-500": focused,
      })}
    >
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
};

export default TabIcon;

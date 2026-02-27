import * as Haptics from "expo-haptics";

export default function pressWithHaptics(onPress: () => void | Promise<void>) {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  return onPress();
}

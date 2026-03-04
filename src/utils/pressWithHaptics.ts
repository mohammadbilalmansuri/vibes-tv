import * as Haptics from "expo-haptics";

export default function pressWithHaptics<T>(
  onPress: () => T | Promise<T>,
): T | Promise<T> {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  return onPress();
}

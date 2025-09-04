import * as Haptics from "expo-haptics";

/**
 * Runs haptic feedback (fire-and-forget) and then executes the given press handler.
 * - Works on both iOS and Android (silently fails if unsupported).
 * - Doesn't block navigation or UI updates.
 */
export default function pressWithHaptics(onPress: () => void | Promise<void>) {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  return onPress();
}

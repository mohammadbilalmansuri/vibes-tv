import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import { Link, LinkProps } from "expo-router";
import cn from "@/utils/cn";

type Variant = "primary" | "secondary";

interface BaseButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title?: string;
  variant?: Variant;
  className?: string;
  textClassName?: string;
  indicatorClassName?: string;
  loading?: boolean;
}

interface LinkButtonProps extends BaseButtonProps {
  href: LinkProps["href"];
}

interface PressableButtonProps extends BaseButtonProps {
  href?: undefined;
}

type ButtonProps = LinkButtonProps | PressableButtonProps;

const Button = ({
  title,
  variant = "primary",
  className = "",
  textClassName = "",
  indicatorClassName = "",
  children,
  href,
  disabled,
  loading,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const baseStyles =
    "flex-row items-center justify-center rounded-full gap-1 px-6 py-3";
  const variantStyles =
    variant === "primary" ? "bg-default-accent" : "bg-default-800";
  const disabledStyles = isDisabled ? "opacity-50" : "";
  const textStyles = "text-default-50 font-medium";

  const content = (
    <View className={cn(baseStyles, variantStyles, disabledStyles, className)}>
      {loading ? (
        <ActivityIndicator
          className={cn("text-default-50", indicatorClassName)}
        />
      ) : children ? (
        children
      ) : (
        <Text className={cn(textStyles, textClassName)}>{title}</Text>
      )}
    </View>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        <TouchableOpacity activeOpacity={0.5} disabled={isDisabled} {...props}>
          {content}
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.7} disabled={isDisabled} {...props}>
      {content}
    </TouchableOpacity>
  );
};

export default Button;

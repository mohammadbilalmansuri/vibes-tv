import React from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import { Link, LinkProps } from "expo-router";
import cn from "@/utils/cn";

interface BaseButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title?: string;
  variant?: "primary" | "secondary";
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
  const isDisabled = !!(disabled || loading);

  const buttonContent = (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={isDisabled}
      className={cn(
        "flex-row items-center justify-center rounded-full gap-1 p-4",
        {
          "bg-rose": variant === "primary",
          "bg-shark-tertiary": variant === "secondary",
          "opacity-60": isDisabled,
        },
        className
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator className={cn("text-white", indicatorClassName)} />
      ) : children ? (
        children
      ) : (
        <Text
          className={cn("text-white font-medium leading-none", textClassName)}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
};

export default Button;

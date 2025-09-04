import React from "react";
import { Image } from "react-native";
import { LOGO } from "@/constants";
import type { ImageProps } from "react-native";

const Logo = ({ className = "size-7", ...props }: ImageProps) => {
  return <Image source={LOGO} alt="Logo" className={className} {...props} />;
};

export default Logo;

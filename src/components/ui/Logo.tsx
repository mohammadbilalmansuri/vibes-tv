import React from "react";
import { Image, ImageProps } from "react-native";
import { LOGO } from "@/constants";

type LogoProps = ImageProps & {
  className?: string;
};

const Logo = ({ className = "size-7", ...props }: LogoProps) => {
  return <Image source={LOGO} className={className} {...props} />;
};

export default Logo;

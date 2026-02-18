import { ReactNode } from "react";
import { ContentType } from "./tmdb";

export * from "./api";
export * from "./tmdb";

export interface ChildProps {
  children: ReactNode;
}

export type ContentPressHandler = (type: ContentType, id: number) => void;

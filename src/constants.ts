import { home, search } from "./assets";

export const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
export const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
export const APPWRITE_DATABASE_ID =
  process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
export const APPWRITE_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

export const TMDB_API_TOKEN = process.env.EXPO_PUBLIC_TMDB_API_TOKEN!;
export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const TABS = [
  {
    id: "index",
    name: "Home",
    icon: home,
  },
  {
    id: "search",
    name: "Search",
    icon: search,
  },
];

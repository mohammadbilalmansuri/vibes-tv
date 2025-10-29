import { TMDBResponse } from "./common";

export type MultiSearchResponse = TMDBResponse<{
  adult: boolean;
  backdrop_path?: string | null;
  id: number;
  title?: string;
  name?: string;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path?: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}>;

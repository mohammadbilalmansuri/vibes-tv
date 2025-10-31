import {
  DateRange,
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
  TMDBResponse,
} from "./common";

export interface BaseMovie {
  adult: boolean;
  backdrop_path?: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type TrendingMoviesResponse = TMDBResponse<
  BaseMovie & { media_type: string }
>;
export type NowPlayingMoviesResponse = TMDBResponse<BaseMovie> & {
  dates: DateRange;
};
export type PopularMoviesResponse = TMDBResponse<BaseMovie>;
export type TopRatedMoviesResponse = TMDBResponse<BaseMovie>;
export type UpcomingMoviesResponse = TMDBResponse<BaseMovie> & {
  dates: DateRange;
};
export type DiscoverMoviesResponse = TMDBResponse<BaseMovie>;

export interface MovieDetailResponse {
  adult: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: unknown;
  budget: number;
  genres: Genre[];
  homepage?: string | null;
  id: number;
  imdb_id?: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline?: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

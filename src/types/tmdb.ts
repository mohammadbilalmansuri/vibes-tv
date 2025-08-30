export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface DateRange {
  maximum: string;
  minimum: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Network {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

export type ImageSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

// Movie Types

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

// TV Show Types

export interface BaseTVShow {
  backdrop_path?: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path?: string | null;
  vote_average: number;
  vote_count: number;
}

export type TrendingTVResponse = TMDBResponse<
  BaseTVShow & { adult: boolean; media_type: string }
>;
export type TVShowsAiringTodayResponse = TMDBResponse<BaseTVShow>;
export type TVShowsOnTheAirResponse = TMDBResponse<BaseTVShow>;
export type PopularTVShowsResponse = TMDBResponse<BaseTVShow>;
export type TopRatedTVShowsResponse = TMDBResponse<BaseTVShow>;
export type DiscoverTVShowsResponse = TMDBResponse<BaseTVShow>;

export interface Creator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path?: string | null;
}

export interface CrewMember {
  department: string;
  job: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
}

export interface GuestStar {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path?: string | null;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path?: string | null;
  season_number: number;
  vote_average: number;
}

export interface TVShowDetailResponse {
  adult: boolean;
  backdrop_path?: string | null;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage?: string | null;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air?: string | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path?: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline?: string | null;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path?: string | null;
  vote_average: number;
  vote_count: number;
  crew: CrewMember[];
  guest_stars: GuestStar[];
}

export interface TVSeasonDetailResponse {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path?: string | null;
  season_number: number;
  vote_average: number;
}

// Search Types

export type SearchMode = "multi" | "movie" | "tv";

export type SearchResponse = TMDBResponse<{
  adult: boolean;
  backdrop_path: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  media_type?: string;
  name?: string;
  origin_country?: string[];
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}>;

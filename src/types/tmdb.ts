// Base interfaces and utilities

interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface DateRange {
  maximum: string;
  minimum: string;
}

// Common entities

interface BaseEntity {
  id: number;
  name: string;
}

interface EntityWithLogo extends BaseEntity {
  logo_path: string | null;
  origin_country: string;
}

interface PersonBase {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export type ProductionCompany = EntityWithLogo;
export type Network = EntityWithLogo;

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export type Genre = BaseEntity;

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

export type ImageSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "w1280"
  | "original";

export type ContentType = "movie" | "tv";

// Core content interface

interface ContentCommon {
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

// Base movie and TV show types

export interface BaseMovie extends ContentCommon {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface BaseTVShow extends ContentCommon {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

interface CommonDetails {
  genres: Genre[];
  homepage?: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status?: string;
}

// Movies

export interface MovieDetails
  extends Omit<BaseMovie, "genre_ids">,
    CommonDetails {
  belongs_to_collection?: unknown;
  budget: number;
  imdb_id?: string;
  revenue: number;
  runtime?: number;
  tagline?: string;
}

// TV Shows

export interface Creator extends PersonBase {
  credit_id: string;
}

export interface SeasonBase {
  air_date?: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface Season extends SeasonBase {
  episode_count?: number;
}

export interface TVSeasonDetails extends SeasonBase {
  _id: string;
  episodes: Episode[];
}

export interface TVShowDetails
  extends Omit<BaseTVShow, "genre_ids">,
    CommonDetails {
  created_by: Creator[];
  episode_run_time: number[];
  in_production: boolean;
  languages: string[];
  last_air_date?: string;
  last_episode_to_air?: Episode;
  next_episode_to_air?: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  seasons: Season[];
  tagline?: string;
  type: string;
}

// Episodes

interface EpisodeBase {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  season_number: number;
  runtime?: number;
}

export interface CrewMember extends PersonBase {
  department: string;
  job: string;
  credit_id: string;
}

export interface GuestStar extends PersonBase {
  character: string;
  credit_id: string;
  order: number;
}

export interface Episode extends EpisodeBase {
  production_code?: string;
  show_id?: number;
  still_path?: string | null;
  crew?: CrewMember[];
  guest_stars?: GuestStar[];
}

// Search & Trending

export type SearchMode = "multi" | "movie" | "tv";

export interface SearchResult extends ContentCommon {
  adult: boolean;
  media_type: string;
  first_air_date?: string;
  name?: string;
  origin_country?: string[];
  original_name?: string;
  original_title?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
}

export interface TrendingContent extends BaseMovie {
  media_type: string;
}

// Response types

interface ResponseWithDates<T> extends TMDBResponse<T> {
  dates: DateRange;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

export type TrendingResponse = TMDBResponse<TrendingContent>;
export type SearchResponse = TMDBResponse<SearchResult>;

export type MovieResponse = TMDBResponse<BaseMovie>;
export type MovieResponseWithDates = ResponseWithDates<BaseMovie>;
export type TVShowResponse = TMDBResponse<BaseTVShow>;

export type Content = BaseMovie | BaseTVShow;
export type ContentResponse = MovieResponse | TVShowResponse;

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

// Common entities used across different types
interface BaseEntity {
  id: number;
  name: string;
}

interface EntityWithLogo extends BaseEntity {
  logo_path: string;
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
  profile_path: string;
}

// Reusable components
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
  | "original";

export type ContentType = "movie" | "tv";

// Core content interface that both movies and TV shows extend
interface ContentCommon {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
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

export type Content = BaseMovie | BaseTVShow;

// Extended detail types using utility types to reduce repetition
interface DetailCommon {
  genres: Genre[];
  homepage: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
}

export interface Movie extends Omit<BaseMovie, "genre_ids">, DetailCommon {
  belongs_to_collection: unknown;
  budget: number;
  imdb_id: string;
  revenue: number;
  runtime: number;
  tagline: string;
}

export interface Creator extends PersonBase {
  credit_id: string;
}

interface EpisodeBase {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  runtime: number;
  season_number: number;
}

export interface LastEpisodeToAir extends EpisodeBase {
  production_code: string;
  show_id: number;
  still_path: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface TVShow extends Omit<BaseTVShow, "genre_ids">, DetailCommon {
  created_by: Creator[];
  episode_run_time: number[];
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  next_episode_to_air: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  seasons: Season[];
  tagline: string;
  type: string;
}

// Person-related types with shared base
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
  production_code: string;
  show_id: number;
  still_path: string;
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
  poster_path: string;
  season_number: number;
  vote_average: number;
}

// Search types with better inheritance
export type SearchMode = "multi" | "movie" | "tv";

export interface SearchResult extends ContentCommon {
  adult: boolean;
  first_air_date?: string;
  media_type: string;
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

// Response types using generic utility pattern
interface ResponseWithDates<T> extends TMDBResponse<T> {
  dates: DateRange;
}

// Simplified response type definitions
export interface GenresResponse {
  genres: Genre[];
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

// Response types using the generic pattern
export type TrendingResponse = TMDBResponse<TrendingContent>;
export type SearchResponse = TMDBResponse<SearchResult>;

export type NowPlayingMoviesResponse = ResponseWithDates<BaseMovie>;
export type PopularMoviesResponse = TMDBResponse<BaseMovie>;
export type TopRatedMoviesResponse = TMDBResponse<BaseMovie>;
export type UpcomingMoviesResponse = ResponseWithDates<BaseMovie>;
export type DiscoverMoviesResponse = TMDBResponse<BaseMovie>;
export type MovieDetailResponse = TMDBResponse<Movie>;

export type TVShowsAiringTodayResponse = TMDBResponse<BaseTVShow>;
export type TVShowsOnTheAirResponse = TMDBResponse<BaseTVShow>;
export type PopularTVShowsResponse = TMDBResponse<BaseTVShow>;
export type TopRatedTVShowsResponse = TMDBResponse<BaseTVShow>;
export type DiscoverTVShowsResponse = TMDBResponse<BaseTVShow>;
export type TVShowDetailResponse = TMDBResponse<TVShow>;

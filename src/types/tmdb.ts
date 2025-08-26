/**
 * Represents a genre object (movie or TV).
 */
export interface Genre {
  id: number;
  name: string;
}

/**
 * Basic structure of a paginated TMDB API response.
 */
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/**
 * Represents a single movie item in lists/discovery.
 */
export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[]; // Only in list endpoints
}

/**
 * Full movie details response.
 */
export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage?: string;
  imdb_id?: string;
}

/**
 * Represents a single TV show item in lists/discovery.
 */
export interface TVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
}

/**
 * Full TV show details response.
 */
export interface TVShowDetails extends TVShow {
  genres: Genre[];
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string;
  homepage?: string;
}

/**
 * Represents a cast member.
 */
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

/**
 * Represents a crew member.
 */
export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

/**
 * Response for credits (cast + crew).
 */
export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

/**
 * Represents a video (trailer, teaser, etc.).
 */
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string; // e.g., "YouTube"
  type: string; // e.g., "Trailer"
  official: boolean;
  published_at: string;
}

/**
 * Response for videos.
 */
export interface VideoResponse {
  id: number;
  results: Video[];
}

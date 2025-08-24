import { TMDB_API_BASE_URL, TMDB_API_TOKEN } from "../constants";

interface RequestOptions extends RequestInit {
  queryParams?: Record<string, string | number | boolean>;
}

const tmdbRequest = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const url = new URL(`${TMDB_API_BASE_URL}${endpoint}`);

  if (options.queryParams) {
    Object.entries(options.queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    method: options.method ?? "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_TOKEN}`,
      ...options.headers,
    },
    body: options.body,
  });

  if (!response.ok) {
    throw new Error(
      `TMDB API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export const getMovies = async (query?: string): Promise<Movie[]> => {
  const data = await tmdbRequest<{ results: Movie[] }>(
    query ? "/search/movie" : "/discover/movie",
    query
      ? { queryParams: { query } }
      : { queryParams: { sort_by: "popularity.desc" } }
  );

  return data.results;
};

export const getMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  return tmdbRequest<MovieDetails>(`/movie/${movieId}`);
};

export interface ApiConfig {
  /** Base URL for API requests */
  baseUrl: string;

  /** Default headers (e.g. Authorization, Content-Type) */
  headers?: Record<string, string>;

  /** Number of retry attempts for failed requests (default: 2) */
  retry?: number;

  /** Lifecycle interceptors for requests, responses, and errors */
  interceptors?: {
    /** Modify request before sending */
    beforeRequest?: (options: ApiRequestOptions) => ApiRequestOptions;

    /** Modify or parse response before returning */
    afterResponse?: <T>(response: Response) => Promise<T>;

    /** Centralized error handler */
    onError?: (error: unknown) => never;
  };
}

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  body?: unknown | FormData;
  signal?: AbortSignal;
}

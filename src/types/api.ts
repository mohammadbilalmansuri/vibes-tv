export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  retry?: number;
  interceptors?: {
    beforeRequest?: (options: ApiRequestOptions) => ApiRequestOptions;
    afterResponse?: <T>(response: Response) => Promise<T>;
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

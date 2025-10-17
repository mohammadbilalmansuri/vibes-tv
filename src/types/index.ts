export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  body?: unknown;
}

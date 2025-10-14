import { ApiConfig, ApiRequestOptions } from "@/types";
import { ApiError } from "@/utils/apiError";

/**
 * Creates a typed API client for making HTTP requests.
 *
 * Features:
 * - Base URL normalization
 * - Query parameter handling
 * - JSON/FormData body support
 * - Standardized error handling with `ApiError`
 *
 * @param config - API configuration (base URL, default headers, etc.)
 * @returns An object with `request`, `get`, `post`, `put`, `patch`, and `delete` methods.
 */
export const createApiClient = (config: ApiConfig) => {
  const baseUrl = config.baseUrl.endsWith("/")
    ? config.baseUrl.slice(0, -1)
    : config.baseUrl;

  /**
   * Executes an HTTP request.
   *
   * @typeParam T - Expected response type
   * @param endpoint - API endpoint (with or without leading `/`)
   * @param options - Request options (method, headers, params, body, etc.)
   * @returns Parsed JSON response as type `T`
   * @throws {ApiError} If the response status is not OK
   */
  async function request<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<T> {
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = new URL(path, baseUrl);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const headers: Record<string, string> = {
      ...(config.headers || {}),
      ...(options.headers || {}),
    };

    if (options.body && !(options.body instanceof FormData)) {
      headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
    }

    const response = await fetch(url.toString(), {
      method: options.method || "GET",
      headers,
      body:
        options.body && options.method !== "GET"
          ? options.body instanceof FormData
            ? options.body
            : JSON.stringify(options.body)
          : undefined,
    });

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
      throw new ApiError(response.status, response.statusText, errorBody);
    }

    return (await response.json()) as T;
  }

  return {
    /**
     * Sends a GET request.
     *
     * @typeParam T - Expected response type
     * @param endpoint - API endpoint
     * @param options - Request options without `method` or `body`
     */
    get: <T>(
      endpoint: string,
      options?: Omit<ApiRequestOptions, "method" | "body">
    ) => request<T>(endpoint, { ...options, method: "GET" }),

    /**
     * Sends a POST request.
     *
     * @typeParam T - Expected response type
     * @param endpoint - API endpoint
     * @param options - Request options including `body`
     */
    post: <T>(endpoint: string, options?: Omit<ApiRequestOptions, "method">) =>
      request<T>(endpoint, { ...options, method: "POST" }),

    /**
     * Sends a PUT request.
     *
     * @typeParam T - Expected response type
     * @param endpoint - API endpoint
     * @param options - Request options including `body`
     */
    put: <T>(endpoint: string, options?: Omit<ApiRequestOptions, "method">) =>
      request<T>(endpoint, { ...options, method: "PUT" }),

    /**
     * Sends a PATCH request.
     *
     * @typeParam T - Expected response type
     * @param endpoint - API endpoint
     * @param options - Request options including `body`
     */
    patch: <T>(endpoint: string, options?: Omit<ApiRequestOptions, "method">) =>
      request<T>(endpoint, { ...options, method: "PATCH" }),

    /**
     * Sends a DELETE request.
     *
     * @typeParam T - Expected response type
     * @param endpoint - API endpoint
     * @param options - Request options without `method` or `body`
     */
    delete: <T>(
      endpoint: string,
      options?: Omit<ApiRequestOptions, "method" | "body">
    ) => request<T>(endpoint, { ...options, method: "DELETE" }),

    request,
  };
};

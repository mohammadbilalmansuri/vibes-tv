import type { ApiConfig, ApiRequestOptions } from "@/types";
import ApiError from "@/utils/apiError";

// Retry helper with exponential backoff.
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 500
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise((res) => setTimeout(res, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
}

/** Creates a typed API client for making HTTP requests. */
export default function createApiClient(config: ApiConfig) {
  const baseUrl = config.baseUrl.endsWith("/")
    ? config.baseUrl.slice(0, -1)
    : config.baseUrl;

  // Interceptors
  const beforeRequest =
    config.interceptors?.beforeRequest ??
    ((options: ApiRequestOptions) => options);

  const afterResponse =
    config.interceptors?.afterResponse ??
    (async <T>(res: Response): Promise<T> => (await res.json()) as T);

  const onError =
    config.interceptors?.onError ??
    ((err: unknown) => {
      throw err;
    });

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

    let finalOptions = beforeRequest({
      ...options,
      method: options.method || "GET",
    });

    const headers: Record<string, string> = {
      ...(config.headers || {}),
      ...(finalOptions.headers || {}),
    };

    if (finalOptions.body && !(finalOptions.body instanceof FormData)) {
      headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
    }

    const doFetch = async () => {
      const response = await fetch(url.toString(), {
        method: finalOptions.method,
        headers,
        body:
          finalOptions.body && finalOptions.method !== "GET"
            ? finalOptions.body instanceof FormData
              ? finalOptions.body
              : JSON.stringify(finalOptions.body)
            : undefined,
        signal: finalOptions.signal,
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

      return afterResponse<T>(response);
    };

    try {
      return await retryWithBackoff(doFetch, config.retry ?? 2);
    } catch (err) {
      return onError(err);
    }
  }

  return {
    get: <T>(
      endpoint: string,
      options?: Omit<ApiRequestOptions, "method" | "body">
    ) => request<T>(endpoint, { ...options, method: "GET" }),

    post: <T>(endpoint: string, options?: Omit<ApiRequestOptions, "method">) =>
      request<T>(endpoint, { ...options, method: "POST" }),

    put: <T>(endpoint: string, options?: Omit<ApiRequestOptions, "method">) =>
      request<T>(endpoint, { ...options, method: "PUT" }),

    patch: <T>(endpoint: string, options?: Omit<ApiRequestOptions, "method">) =>
      request<T>(endpoint, { ...options, method: "PATCH" }),

    delete: <T>(
      endpoint: string,
      options?: Omit<ApiRequestOptions, "method" | "body">
    ) => request<T>(endpoint, { ...options, method: "DELETE" }),

    request,
  };
}

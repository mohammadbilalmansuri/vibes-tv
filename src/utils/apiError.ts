/**
 * Custom error class for API requests.
 *
 * Provides status code, status text, and optional response body.
 * Includes helper methods for common error handling.
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";

    // Preserve stack trace (V8 engines like Node/Chrome)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  isUnauthorized() {
    return this.status === 401;
  }

  isNotFound() {
    return this.status === 404;
  }

  isServerError() {
    return this.status >= 500;
  }
}

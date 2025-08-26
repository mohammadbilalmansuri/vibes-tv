/**
 * Custom error class for API requests.
 *
 * Extends the native `Error` object and provides additional
 * information about the failed HTTP request, such as status code,
 * status text, and response body.
 */
export class ApiError extends Error {
  /**
   * @param status - The HTTP status code (e.g., 404, 500).
   * @param statusText - The HTTP status text (e.g., "Not Found", "Internal Server Error").
   * @param body - Optional response body returned by the server (JSON, text, etc.).
   */
  constructor(
    public status: number,
    public statusText: string,
    public body?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
  }
}

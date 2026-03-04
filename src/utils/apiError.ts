export default class ApiError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly body?: unknown;

  constructor(status: number, statusText: string, body?: unknown) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  isUnauthorized(): boolean {
    return this.status === 401;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isRateLimited(): boolean {
    return this.status === 429;
  }

  getUserMessage(): string {
    if (this.isNotFound()) return "The requested content was not found.";
    if (this.isUnauthorized()) return "Authentication required.";
    if (this.isRateLimited())
      return "Too many requests. Please try again later.";
    if (this.isServerError()) return "Server error. Please try again later.";
    return "Something went wrong. Please try again.";
  }
}

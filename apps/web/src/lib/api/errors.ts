import { ApiError } from "./client";

export async function safeFetch<T>(
  loader: () => Promise<T>,
  fallback: T,
  label: string,
): Promise<T> {
  try {
    return await loader();
  } catch (error) {
    if (process.env.NODE_ENV !== "production" && error instanceof ApiError) {
      console.warn(`[api:fallback] ${label}: ${error.message}`);
      return fallback;
    }
    throw error;
  }
}

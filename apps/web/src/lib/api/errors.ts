import { ApiError } from "./client";

export async function safeFetch<T>(
  loader: () => Promise<T>,
  fallback: T,
  label: string,
): Promise<T> {
  try {
    return await loader();
  } catch (error) {
    const isBuildTime =
      process.env.NODE_ENV !== "production" ||
      process.env.NEXT_PHASE === "phase-production-build";
    if (isBuildTime && error instanceof ApiError) {
      console.warn(`[api:fallback] ${label}: ${error.message}`);
      return fallback;
    }
    throw error;
  }
}

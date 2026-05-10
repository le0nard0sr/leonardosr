import "server-only";

import { cache } from "react";
import { apiRequest } from "./client";
import type {
  ContactPayload,
  ContactResponse,
  Experience,
  Profile,
  Project,
  Technology,
} from "./types";

const REVALIDATE_SECONDS = 60;

const publicGet = <T>(path: string) =>
  apiRequest<T>(path, { next: { revalidate: REVALIDATE_SECONDS } });

export const getProfile = cache(() =>
  publicGet<Profile>("/api/public/profile"),
);

export const getExperiences = cache(() =>
  publicGet<Experience[]>("/api/public/experiences"),
);

export const getTechnologies = cache(() =>
  publicGet<Technology[]>("/api/public/technologies"),
);

export const getProjects = cache(() =>
  publicGet<Project[]>("/api/public/projects"),
);

export const getProjectBySlug = cache((slug: string) =>
  publicGet<Project>(`/api/public/projects/${encodeURIComponent(slug)}`),
);

export async function submitContact(payload: ContactPayload) {
  return apiRequest<ContactResponse>("/api/public/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

import "server-only";

import { cache } from "react";
import { apiRequest } from "./client";
import type {
  ContactPayload,
  ContactResponse,
  Content,
  Experience,
  Profile,
  Project,
  Series,
  Tag,
  TagDetail,
  Technology,
} from "./types";

const REVALIDATE_LIST = 3600;
const REVALIDATE_DETAIL = 86400;

const publicGet = <T>(path: string, seconds = REVALIDATE_LIST) =>
  apiRequest<T>(path, { next: { revalidate: seconds } });

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
  publicGet<Project>(
    `/api/public/projects/${encodeURIComponent(slug)}`,
    REVALIDATE_DETAIL,
  ),
);

export const getContents = cache(
  (params?: { type?: string; tag?: string; technology?: string }) => {
    const qs = new URLSearchParams();
    if (params?.type) qs.set("type", params.type);
    if (params?.tag) qs.set("tag", params.tag);
    if (params?.technology) qs.set("technology", params.technology);
    const q = qs.toString();
    return publicGet<Content[]>(`/api/public/contents${q ? `?${q}` : ""}`);
  },
);

export const getContentBySlug = cache((slug: string) =>
  publicGet<Content>(
    `/api/public/contents/${encodeURIComponent(slug)}`,
    REVALIDATE_DETAIL,
  ),
);

export const getSeries = cache(() => publicGet<Series[]>("/api/public/series"));

export const getSeriesBySlug = cache((slug: string) =>
  publicGet<Series>(
    `/api/public/series/${encodeURIComponent(slug)}`,
    REVALIDATE_DETAIL,
  ),
);

export const getTags = cache(() => publicGet<Tag[]>("/api/public/tags"));

export const getTagBySlug = cache((slug: string) =>
  publicGet<TagDetail>(
    `/api/public/tags/${encodeURIComponent(slug)}`,
    REVALIDATE_DETAIL,
  ),
);

export async function submitContact(payload: ContactPayload) {
  return apiRequest<ContactResponse>("/api/public/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export type Profile = {
  id: number;
  displayName: string;
  professionalTitle: string;
  headline: string;
  shortBio: string;
  fullBio: string;
  locationLabel?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  twitterUrl?: string | null;
  youtubeUrl?: string | null;
  contactEmailAlias?: string | null;
  privacyEmailAlias?: string | null;
  curriculumUrl?: string | null;
  imageUrlAllowlist?: string | null;
};

export type Technology = {
  id: number;
  name: string;
  slug: string;
  category: string;
  description?: string | null;
  level?: string | null;
};

export type Experience = {
  id: number;
  role: string;
  organization: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  summary: string;
  description?: string | null;
  sortOrder: number;
  technologies: Technology[];
};

export type Project = {
  id: number;
  slug: string;
  name: string;
  summary: string;
  description: string;
  repositoryUrl?: string | null;
  demoUrl?: string | null;
  featured: boolean;
  publishedAt?: string | null;
  technologies: Technology[];
};

export type ContactPayload = {
  name?: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

export type ContactResponse = {
  id: number | null;
  status: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
};

export type Content = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  body: string;
  type:
    | "ARTICLE"
    | "VIDEO"
    | "ARTICLE_WITH_VIDEO"
    | "TUTORIAL"
    | "CASE_STUDY"
    | "TECH_NOTE"
    | "LAB"
    | "ARCHITECTURE";
  typeSpecificFields?: Record<string, unknown> | null;
  youtubeUrl?: string | null;
  youtubeVideoId?: string | null;
  videoDuration?: string | null;
  readingTime?: number | null;
  featured: boolean;
  publishedAt?: string | null;
  tags: Tag[];
  technologies: Technology[];
};

export type SeriesItem = { sortOrder: number; content: Content };

export type Series = {
  id: number;
  slug: string;
  title: string;
  description: string;
  publishedAt?: string | null;
  contents: SeriesItem[];
};

// Backend retorna { tag, contents } — sem projects neste endpoint no M4
export type TagDetail = { tag: Tag; contents: Content[] };

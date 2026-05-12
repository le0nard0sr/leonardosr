import type { Meta, StoryObj } from "@storybook/nextjs";
import { ContentCard } from "./content-card";
import type { Content } from "@/lib/api/types";

const base: Content = {
  id: 1,
  slug: "introducao-ao-react",
  title: "Introdução ao React com hooks modernos",
  summary:
    "Aprenda os fundamentos do React utilizando hooks como useState, useEffect e useContext com exemplos práticos.",
  body: "",
  type: "ARTICLE",
  featured: false,
  publishedAt: "2026-01-15",
  readingTime: 8,
  tags: [
    { id: 1, name: "React", slug: "react" },
    { id: 2, name: "Frontend", slug: "frontend" },
    { id: 3, name: "JavaScript", slug: "javascript" },
  ],
  technologies: [],
};

const meta = {
  title: "Editorial/ContentCard",
  component: ContentCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Artigo: Story = {
  args: { content: base },
};

export const Video: Story = {
  args: {
    content: {
      ...base,
      id: 2,
      type: "VIDEO",
      title: "Criando APIs REST com Spring Boot 4",
      youtubeVideoId: "dQw4w9WgXcQ",
      videoDuration: "42:17",
      readingTime: null,
      tags: [{ id: 4, name: "Spring Boot", slug: "spring-boot" }],
    },
  },
};

export const ArtigoComVideo: Story = {
  args: {
    content: {
      ...base,
      id: 3,
      type: "ARTICLE_WITH_VIDEO",
      title: "Next.js App Router na prática",
      youtubeVideoId: "dQw4w9WgXcQ",
      videoDuration: "28:05",
      readingTime: 12,
    },
  },
};

export const Lab: Story = {
  args: {
    content: {
      ...base,
      id: 4,
      slug: "cache-redis-demo",
      type: "LAB",
      title: "Demo de cache com Redis e Spring",
      tags: [{ id: 5, name: "Redis", slug: "redis" }],
    },
  },
};

export const SemTags: Story = {
  args: {
    content: { ...base, tags: [] },
  },
};

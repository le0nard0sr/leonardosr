import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProjectCard } from "./project-card";

const baseProject = {
  id: 1,
  slug: "leonardosr-com-br",
  name: "leonardosr.com.br",
  summary:
    "Site pessoal, portfólio profissional e hub de conteúdos técnicos sobre React, Next.js e Spring Boot.",
  description: "Site pessoal completo.",
  repositoryUrl: "https://github.com/le0nard0sr/leonardosr",
  demoUrl: "https://leonardosr.com.br",
  featured: false,
  publishedAt: "2026-01-01T00:00:00Z",
  technologies: [
    { id: 1, name: "Next.js", slug: "nextjs", category: "Frontend" },
    { id: 2, name: "Spring Boot", slug: "spring-boot", category: "Backend" },
    { id: 3, name: "PostgreSQL", slug: "postgresql", category: "Banco" },
    { id: 4, name: "Docker", slug: "docker", category: "Infra" },
  ],
};

const meta = {
  title: "Design System/ProjectCard",
  component: ProjectCard,
  args: { project: baseProject },
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Featured: Story = {
  args: {
    project: { ...baseProject, featured: true },
    featured: true,
  },
};

export const WithoutDate: Story = {
  args: {
    project: { ...baseProject, publishedAt: null },
  },
};

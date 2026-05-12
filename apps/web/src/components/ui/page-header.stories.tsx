import type { Meta, StoryObj } from "@storybook/nextjs";
import { PageHeader } from "./page-header";

const meta = {
  title: "Design System/PageHeader",
  component: PageHeader,
  args: {
    eyebrow: "Portfólio",
    title: "Projetos",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLede: Story = {
  args: {
    eyebrow: "Conteúdo técnico",
    title: "Artigos e tutoriais",
    lede: "Textos sobre React, Next.js, Spring Boot e arquitetura web moderna.",
  },
};

export const WithMeta: Story = {
  args: {
    eyebrow: "Sobre",
    title: "Leonardo Silva Ribeiro",
    lede: "Desenvolvedor full-stack focado em React, Next.js e Spring Boot.",
    meta: (
      <span className="text-sm text-[color:var(--fg-muted)]">
        São Paulo, Brasil
      </span>
    ),
  },
};

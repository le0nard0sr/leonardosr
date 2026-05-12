import type { Meta, StoryObj } from "@storybook/nextjs";
import { Breadcrumbs } from "./breadcrumbs";

const meta = {
  title: "Design System/Breadcrumbs",
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "início", href: "/" },
      { label: "conteúdos", href: "/conteudos" },
      { label: "arquitetura next.js e spring boot" },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [{ label: "início", href: "/" }, { label: "projetos" }],
  },
};

export const DeepPath: Story = {
  args: {
    items: [
      { label: "início", href: "/" },
      { label: "conteúdos", href: "/conteudos" },
      { label: "séries", href: "/conteudos/series" },
      { label: "java moderno com spring boot" },
    ],
  },
};

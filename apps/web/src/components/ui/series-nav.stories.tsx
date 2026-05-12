import type { Meta, StoryObj } from "@storybook/nextjs";
import { SeriesNav } from "./series-nav";
import type { Content } from "@/lib/api/types";

const makeContent = (slug: string, title: string): Content => ({
  id: 1,
  slug,
  title,
  summary: "",
  body: "",
  type: "ARTICLE",
  featured: false,
  publishedAt: "2026-01-01",
  tags: [],
  technologies: [],
});

const meta = {
  title: "Editorial/SeriesNav",
  component: SeriesNav,
  parameters: { layout: "padded" },
} satisfies Meta<typeof SeriesNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrevENext: Story = {
  args: {
    prev: makeContent("composicao", "Composição de componentes"),
    next: makeContent("custom-hooks", "Hooks customizados avançados"),
    seriesTitle: "React Design Patterns",
    seriesSlug: "react-patterns",
  },
};

export const SomentePrev: Story = {
  args: {
    prev: makeContent("composicao", "Composição de componentes"),
    next: null,
    seriesTitle: "React Design Patterns",
    seriesSlug: "react-patterns",
  },
};

export const SomenteNext: Story = {
  args: {
    prev: null,
    next: makeContent("custom-hooks", "Hooks customizados avançados"),
    seriesTitle: "React Design Patterns",
    seriesSlug: "react-patterns",
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs";
import { SeriesCard } from "./series-card";
import type { Series } from "@/lib/api/types";

const mockSeries: Series = {
  id: 1,
  slug: "react-patterns",
  title: "React Design Patterns",
  description:
    "Série completa sobre padrões de projeto em React: composição, render props, hooks customizados e muito mais.",
  publishedAt: "2026-01-01",
  contents: [
    {
      sortOrder: 1,
      content: {
        id: 1,
        slug: "composicao",
        title: "Composição de componentes",
        summary: "",
        body: "",
        type: "ARTICLE",
        featured: false,
        publishedAt: "2026-01-10",
        tags: [],
        technologies: [],
      },
    },
    {
      sortOrder: 2,
      content: {
        id: 2,
        slug: "render-props",
        title: "Render Props pattern",
        summary: "",
        body: "",
        type: "ARTICLE",
        featured: false,
        publishedAt: "2026-02-01",
        tags: [],
        technologies: [],
      },
    },
    {
      sortOrder: 3,
      content: {
        id: 3,
        slug: "custom-hooks",
        title: "Hooks customizados avançados",
        summary: "",
        body: "",
        type: "ARTICLE",
        featured: false,
        publishedAt: null,
        tags: [],
        technologies: [],
      },
    },
  ],
};

const meta = {
  title: "Editorial/SeriesCard",
  component: SeriesCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof SeriesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { series: mockSeries },
};

export const Completa: Story = {
  args: {
    series: {
      ...mockSeries,
      contents: mockSeries.contents.map((i) => ({
        ...i,
        content: { ...i.content, publishedAt: "2026-01-01" },
      })),
    },
  },
};

export const Vazia: Story = {
  args: {
    series: { ...mockSeries, contents: [] },
  },
};

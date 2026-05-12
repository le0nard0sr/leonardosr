import type { Meta, StoryObj } from "@storybook/nextjs";
import { FilterBar } from "./filter-bar";

const meta = {
  title: "Design System/FilterBar",
  component: FilterBar,
  args: {
    options: ["React", "Next.js", "Spring Boot", "TypeScript"],
    value: "Todas",
    onChange: () => {},
  },
} satisfies Meta<typeof FilterBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: {
    value: "React",
  },
};

export const CustomAllLabel: Story = {
  args: {
    allLabel: "Todos os tipos",
    options: ["Artigo", "Vídeo", "Tutorial"],
    value: "Todos os tipos",
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs";
import { SectionHeading } from "./section-heading";

const meta = {
  title: "Design System/SectionHeading",
  component: SectionHeading,
  args: {
    eyebrow: "Conteúdos",
    title: "Artigos, vídeos e estudos de caso.",
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

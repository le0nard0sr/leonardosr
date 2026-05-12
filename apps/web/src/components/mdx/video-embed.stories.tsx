import type { Meta, StoryObj } from "@storybook/nextjs";
import { VideoEmbed } from "./video-embed";

const meta = {
  title: "MDX/VideoEmbed",
  component: VideoEmbed,
  parameters: { layout: "padded" },
} satisfies Meta<typeof VideoEmbed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    videoId: "dQw4w9WgXcQ",
    title: "Introdução ao React com hooks modernos",
  },
};

export const SemTitulo: Story = {
  args: {
    videoId: "dQw4w9WgXcQ",
  },
};

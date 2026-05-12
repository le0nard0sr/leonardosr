import type { Meta, StoryObj } from "@storybook/nextjs";
import { Stat } from "./stat";

const meta = {
  title: "Design System/Stat",
  component: Stat,
  args: {
    value: "5+",
    label: "Anos de experiência",
  },
} satisfies Meta<typeof Stat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LargeNumber: Story = {
  args: {
    value: "120k",
    label: "Linhas de código",
  },
};

export const Percentage: Story = {
  args: {
    value: "98%",
    label: "Uptime médio",
  },
};

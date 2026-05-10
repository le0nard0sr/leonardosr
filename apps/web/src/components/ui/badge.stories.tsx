import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./badge";

const meta = {
  title: "Design System/Badge",
  component: Badge,
  args: {
    children: "Spring Boot",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

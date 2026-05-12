import type { Meta, StoryObj } from "@storybook/nextjs";
import { RepositoryLink } from "./repository-link";

const meta = {
  title: "MDX/RepositoryLink",
  component: RepositoryLink,
  parameters: { layout: "padded" },
} satisfies Meta<typeof RepositoryLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "https://github.com/le0nard0sr/leonardosr",
    label: "Ver código-fonte no GitHub",
  },
};

export const LabelPadrao: Story = {
  args: {
    url: "https://github.com/le0nard0sr/leonardosr",
  },
};

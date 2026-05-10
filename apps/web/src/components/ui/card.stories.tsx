import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card } from "./card";
import { SectionHeading } from "./section-heading";

const meta = {
  title: "Design System/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <SectionHeading
        eyebrow="Arquitetura"
        title="Next.js + Spring Boot"
        compact
      />
      <p style={{ color: "var(--fg-muted)", marginTop: 12 }}>
        Card inicial para blocos de conteúdo, projetos e resumos editoriais.
      </p>
    </Card>
  ),
};

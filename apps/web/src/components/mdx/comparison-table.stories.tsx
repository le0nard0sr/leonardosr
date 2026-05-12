import type { Meta, StoryObj } from "@storybook/nextjs";
import { ComparisonTable } from "./comparison-table";

const meta = {
  title: "MDX/ComparisonTable",
  component: ComparisonTable,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headers: ["Critério", "REST", "GraphQL", "gRPC"],
    rows: [
      ["Protocolo", "HTTP/1.1+", "HTTP/1.1+", "HTTP/2"],
      ["Tipagem", "Fraca", "Forte (schema)", "Forte (Protobuf)"],
      ["Over-fetching", "Comum", "Evitado", "Evitado"],
      ["Complexidade", "Baixa", "Média", "Alta"],
      ["Streaming", "Parcial", "Subscriptions", "Nativo"],
    ],
  },
};

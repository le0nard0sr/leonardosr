import type { Meta, StoryObj } from "@storybook/nextjs";
import { Toc } from "./toc";

const meta = {
  title: "Editorial/Toc",
  component: Toc,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Toc>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: "introducao", text: "Introdução", level: 2 },
      { id: "conceitos-basicos", text: "Conceitos básicos", level: 2 },
      { id: "hooks", text: "Hooks", level: 3 },
      { id: "usestate", text: "useState", level: 3 },
      { id: "useeffect", text: "useEffect", level: 3 },
      { id: "performance", text: "Performance", level: 2 },
      { id: "conclusao", text: "Conclusão", level: 2 },
    ],
  },
};

export const Curto: Story = {
  args: {
    items: [
      { id: "visao-geral", text: "Visão geral", level: 2 },
      { id: "implementacao", text: "Implementação", level: 2 },
    ],
  },
};

export const Vazio: Story = {
  args: { items: [] },
};

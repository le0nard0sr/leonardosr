import type { Meta, StoryObj } from "@storybook/nextjs";
import { Callout } from "./callout";

const meta = {
  title: "MDX/Callout",
  component: Callout,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: "info",
    title: "Nota importante",
    children:
      "Este componente é usado para destacar informações relevantes no conteúdo editorial.",
  },
};

export const Tip: Story = {
  args: {
    variant: "tip",
    title: "Dica",
    children:
      "Use o React DevTools para inspecionar a árvore de componentes em tempo real.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Atenção",
    children:
      "Esta API foi descontinuada na versão 18.3. Migre para a nova sintaxe antes do próximo release.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Perigo",
    children:
      "Nunca exponha secrets ou credenciais diretamente no código do cliente.",
  },
};

export const SemTitulo: Story = {
  args: {
    variant: "info",
    children:
      "Um callout simples sem título explícito — usa o label padrão da variante.",
  },
};

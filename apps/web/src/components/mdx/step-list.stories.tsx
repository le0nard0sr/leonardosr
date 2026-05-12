import type { Meta, StoryObj } from "@storybook/nextjs";
import { StepList } from "./step-list";

const meta = {
  title: "MDX/StepList",
  component: StepList,
  parameters: { layout: "padded" },
} satisfies Meta<typeof StepList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [
      {
        title: "Instalar dependências",
        children:
          "Execute npm install para baixar todos os pacotes necessários.",
      },
      {
        title: "Configurar variáveis de ambiente",
        children:
          "Copie .env.example para .env e preencha as variáveis obrigatórias.",
      },
      {
        title: "Iniciar o servidor de desenvolvimento",
        children: "Execute npm run dev e acesse http://localhost:3000.",
      },
    ],
  },
};

export const SemDescricao: Story = {
  args: {
    steps: [
      { title: "Instalar dependências" },
      { title: "Configurar ambiente" },
      { title: "Executar testes" },
      { title: "Fazer deploy" },
    ],
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs";
import { TechCell } from "./tech-cell";

const meta = {
  title: "Design System/TechCell",
  component: TechCell,
  args: {
    technology: {
      id: 1,
      name: "Next.js",
      slug: "nextjs",
      category: "Frontend",
      description: "Framework React para produção com SSR, SSG e App Router.",
      level: "principal",
    },
  },
} satisfies Meta<typeof TechCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Principal: Story = {};

export const Avancado: Story = {
  args: {
    technology: {
      id: 2,
      name: "Spring Boot",
      slug: "spring-boot",
      category: "Backend",
      description:
        "Framework Java para desenvolvimento de microsserviços e APIs REST.",
      level: "avançado",
    },
  },
};

export const Intermediario: Story = {
  args: {
    technology: {
      id: 3,
      name: "Docker",
      slug: "docker",
      category: "Infra",
      description: null,
      level: "intermediário",
    },
  },
};

export const SemDescricao: Story = {
  args: {
    technology: {
      id: 4,
      name: "PostgreSQL",
      slug: "postgresql",
      category: "Banco",
      description: null,
      level: "principal",
    },
  },
};

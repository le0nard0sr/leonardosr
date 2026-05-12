import type { Meta, StoryObj } from "@storybook/nextjs";
import { TimelineRow } from "./timeline-row";

const baseExperience = {
  id: 1,
  role: "Desenvolvedor Full-Stack Sênior",
  organization: "Empresa Exemplo",
  startDate: "2020-01-01",
  endDate: null,
  current: true,
  summary: "Desenvolvimento de aplicações web com React e Spring Boot.",
  description:
    "Liderança técnica de squad de 4 engenheiros, arquitetura de microsserviços, definição de padrões e mentorias.",
  sortOrder: 1,
  technologies: [
    { id: 1, name: "React", slug: "react", category: "Frontend" },
    { id: 2, name: "Spring Boot", slug: "spring-boot", category: "Backend" },
    { id: 3, name: "PostgreSQL", slug: "postgresql", category: "Banco" },
  ],
};

const meta = {
  title: "Design System/TimelineRow",
  component: TimelineRow,
  args: { experience: baseExperience },
} satisfies Meta<typeof TimelineRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Current: Story = {};

export const PastRole: Story = {
  args: {
    experience: {
      ...baseExperience,
      role: "Desenvolvedor Full-Stack Pleno",
      organization: "Outra Empresa",
      startDate: "2017-03-01",
      endDate: "2019-12-31",
      current: false,
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    experience: {
      ...baseExperience,
      description: null,
    },
  },
};

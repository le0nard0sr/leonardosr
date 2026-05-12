import type { Meta, StoryObj } from "@storybook/nextjs";
import { CodeBlock } from "./code-block";

const meta = {
  title: "MDX/CodeBlock",
  component: CodeBlock,
  parameters: { layout: "padded" },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeScript: Story = {
  args: {
    lang: "ts",
    title: "hooks/useTheme.ts",
    highlightLines: [4, 12, 13, 14],
    code: `import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) setTheme(stored);
  }, []);

  function toggle() {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  }

  return { theme, toggle };
}`,
  },
};

export const Java: Story = {
  args: {
    lang: "java",
    title: "ContentService.java",
    code: `@Service
@RequiredArgsConstructor
public class ContentService {

    private final ContentRepository repository;

    public List<ContentDto> findPublished() {
        return repository.findAllByPublishedAtIsNotNullOrderByPublishedAtDesc()
            .stream()
            .map(ContentDto::from)
            .toList();
    }
}`,
  },
};

export const Bash: Story = {
  args: {
    lang: "bash",
    code: `# Subir o ambiente local
docker compose up -d

# Rodar testes de integração
mvn -B -f apps/api/pom.xml verify -DskipITs=false`,
  },
};

export const SemTitulo: Story = {
  args: {
    lang: "json",
    code: `{
  "name": "@leonardosr/web",
  "version": "0.1.0",
  "private": true
}`,
  },
};

export const LinhasDestacadas: Story = {
  args: {
    lang: "tsx",
    title: "components/Example.tsx",
    highlightLines: [3, 6],
    code: `type ExampleProps = {
  title: string;
  active?: boolean;
};

export function Example({ title, active = false }: ExampleProps) {
  return <span aria-current={active ? "page" : undefined}>{title}</span>;
}`,
  },
};

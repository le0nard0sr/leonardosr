import type { BreadcrumbItem } from "./json-ld";

type Section =
  | "projetos"
  | "conteudos"
  | "laboratorio"
  | "arquiteturas"
  | "series"
  | "tags";

const SECTION_LABEL: Record<Section, string> = {
  projetos: "Projetos",
  conteudos: "Conteúdos",
  laboratorio: "Laboratório",
  arquiteturas: "Arquiteturas",
  series: "Séries",
  tags: "Tags",
};

const SECTION_PATH: Record<Section, string> = {
  projetos: "/projetos",
  conteudos: "/conteudos",
  laboratorio: "/laboratorio",
  arquiteturas: "/arquiteturas",
  series: "/conteudos/series",
  tags: "/tags",
};

export function buildBreadcrumbsFor(
  section: Section,
  slug: string,
  title: string,
  siteUrl = "https://leonardosr.com.br",
): BreadcrumbItem[] {
  return [
    { name: "Início", url: siteUrl },
    {
      name: SECTION_LABEL[section],
      url: `${siteUrl}${SECTION_PATH[section]}`,
    },
    { name: title },
  ];
}

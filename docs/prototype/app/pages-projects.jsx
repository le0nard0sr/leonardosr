/* global React */
// pages-projects.jsx — Projetos lista, Projeto detalhe

const { useState: usePrj, useMemo: useMemoPrj } = React;

function ProjetosPage() {
  const M = window.MOCK;
  const Link = window.Link;
  const allTechs = useMemoPrj(() => {
    const s = new Set();
    M.PROJECTS.forEach(p => p.techs.forEach(t => s.add(t)));
    return ["Todas", ...Array.from(s)];
  }, []);
  const [filter, setFilter] = usePrj("Todas");
  const projects = filter === "Todas" ? M.PROJECTS : M.PROJECTS.filter(p => p.techs.includes(filter));
  const [feat, ...rest] = projects;

  return (
    <main>
      <window.PageHeader
        eyebrow="Projetos · /projetos"
        title="Sistemas, demonstrações e estudos"
        lede="Construções em produção, demonstrações públicas e projetos pessoais. Cada projeto traz problema, solução, decisões técnicas e resultados."
        meta={<div className="mono muted">{M.PROJECTS.length} projetos · {M.PROJECTS.filter(p => p.featured).length} em destaque</div>}
      />
      <section className="container-wide">
        <div className="lsr-filter-bar lsr-filter-bar-scroll">
          {allTechs.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={"lsr-filter-chip mono" + (filter === t ? " is-active" : "")}>
              {t}
            </button>
          ))}
        </div>

        {feat && (
          <Link to={"/projetos/" + feat.slug} className="lsr-project-feature">
            <div className="lsr-project-feature-cover media-placeholder" aria-hidden="true">
              <span>cover · {feat.slug}.png</span>
            </div>
            <div className="lsr-project-feature-body">
              <div className="eyebrow">Em destaque · {feat.year}</div>
              <h2 className="lsr-project-feature-title">{feat.name}</h2>
              <p className="muted" style={{fontSize: "var(--fs-16)", marginTop: 14, maxWidth: 560}}>{feat.summary}</p>
              <div className="lsr-content-card-tags" style={{marginTop: 18}}>
                {feat.techs.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
              <div className="lsr-project-feature-results">
                {feat.results.slice(0, 3).map((r, i) => (
                  <div key={i} className="lsr-feature-result">
                    <span className="mono muted">→</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
              <span className="link-mono" style={{marginTop: 22}}>ver projeto completo <span className="arrow">→</span></span>
            </div>
          </Link>
        )}

        <div className="lsr-project-grid lsr-project-grid-3">
          {rest.map(p => <window.ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>
    </main>
  );
}

// ===== Projeto detalhe =====
function ProjetoDetailPage({ slug }) {
  const M = window.MOCK;
  const Link = window.Link;
  const p = M.PROJECTS.find(x => x.slug === slug);
  if (!p) return <window.NotFound route={"/projetos/" + slug} />;
  const related = M.CONTENTS.filter(c => c.tags.some(t => p.techs.includes(t))).slice(0, 3);

  return (
    <main>
      <div className="container-wide" style={{paddingTop: 36, paddingBottom: 12}}>
        <div className="lsr-breadcrumb mono">
          <Link to="/" className="muted">início</Link>
          <span className="muted">/</span>
          <Link to="/projetos" className="muted">projetos</Link>
          <span className="muted">/</span>
          <span>{p.slug}</span>
        </div>
      </div>
      <section className="container-wide lsr-project-hero">
        <div className="lsr-project-hero-text">
          <div className="eyebrow">Projeto · {p.year}</div>
          <h1 className="lsr-project-hero-title">{p.name}</h1>
          <p className="lsr-project-hero-summary">{p.summary}</p>
          <div className="lsr-content-card-tags" style={{marginTop: 22}}>
            {p.techs.map(t => <span key={t} className="chip chip-solid">{t}</span>)}
          </div>
          <div className="lsr-project-hero-actions">
            {p.repo && <a href="#" className="btn btn-secondary"><window.I.github /> Repositório <window.I.ext /></a>}
            <a href="#" className="btn btn-ghost">Demo ao vivo <window.I.ext /></a>
          </div>
        </div>
        <aside className="lsr-project-hero-card">
          <div className="lsr-project-hero-cover media-placeholder">
            <span>{p.slug}.png</span>
          </div>
          <ul className="lsr-mini-list" style={{marginTop: 18}}>
            <li><span className="mono muted">status</span><span className="chip chip-accent chip-dot">{p.status.toLowerCase()}</span></li>
            <li><span className="mono muted">ano</span><span>{p.year}</span></li>
            <li><span className="mono muted">papel</span><span>Tech lead</span></li>
            <li><span className="mono muted">domínio</span><span>{p.techs[0]}</span></li>
          </ul>
        </aside>
      </section>

      <hr className="hairline" />

      <section className="container lsr-project-body">
        <div className="lsr-project-body-grid">
          <div>
            <article className="lsr-project-section">
              <header><span className="mono muted">01</span><h2>Problema</h2></header>
              <p>{p.problem}</p>
            </article>
            <article className="lsr-project-section">
              <header><span className="mono muted">02</span><h2>Solução</h2></header>
              <p>{p.solution}</p>
            </article>
            <article className="lsr-project-section">
              <header><span className="mono muted">03</span><h2>Decisões técnicas</h2></header>
              <ul className="lsr-decision-list">
                <li><strong>Arquitetura</strong> — separação clara entre camada de apresentação e API, com contratos OpenAPI versionados e tipos TypeScript gerados.</li>
                <li><strong>Autenticação</strong> — cookie de sessão HttpOnly + Secure, com CSRF token explícito em rotas administrativas.</li>
                <li><strong>Cache</strong> — ISR para listagens, SSG para páginas estáticas, revalidação on-demand via webhook do admin.</li>
                <li><strong>Storage</strong> — Cloudflare R2 com adapter S3-compatível, fluxo de upload pré-assinado em duas etapas.</li>
              </ul>
            </article>
            <article className="lsr-project-section">
              <header><span className="mono muted">04</span><h2>Resultados</h2></header>
              <div className="lsr-results-grid">
                {p.results.map((r, i) => (
                  <div key={i} className="lsr-result-card">
                    <div className="mono muted">resultado · {String(i+1).padStart(2,"0")}</div>
                    <div className="lsr-result-text">{r}</div>
                  </div>
                ))}
              </div>
            </article>
          </div>
          <aside className="lsr-project-toc">
            <div className="label">Nesta página</div>
            <ul>
              <li><a href="#">01 · Problema</a></li>
              <li><a href="#">02 · Solução</a></li>
              <li><a href="#">03 · Decisões técnicas</a></li>
              <li><a href="#">04 · Resultados</a></li>
            </ul>
            <div className="label" style={{marginTop: 24}}>Links</div>
            <ul className="lsr-side-links">
              {p.repo && <li><a href="#"><window.I.github /> {p.repo} <window.I.ext /></a></li>}
              <li><a href="#"><window.I.ext /> Demo ao vivo</a></li>
            </ul>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <>
          <hr className="hairline" />
          <section className="lsr-section">
            <div className="container-wide">
              <window.SectionHeader
                eyebrow="Conteúdos relacionados"
                title="Artigos sobre este projeto"
              />
              <div className="lsr-content-grid">
                {related.map(c => <window.ContentCard key={c.slug} c={c} />)}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

window.ProjetosPage = ProjetosPage;
window.ProjetoDetailPage = ProjetoDetailPage;

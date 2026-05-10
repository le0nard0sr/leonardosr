/* global React, ReactDOM */
// components.jsx — shared layout primitives, header, footer, theme

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ===== Hash router =====
function useHashRoute() {
  const get = () => {
    const h = window.location.hash.replace(/^#/, "") || "/";
    return h.startsWith("/") ? h : "/" + h;
  };
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const onHash = () => { setRoute(get()); window.scrollTo({ top: 0, behavior: "instant" }); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function navigate(path) {
  if (!path.startsWith("/")) path = "/" + path;
  window.location.hash = path;
}

// Link that uses hash navigation
function Link({ to, className, children, onClick, ...rest }) {
  const handle = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };
  return (
    <a href={"#" + to} className={className} onClick={handle} {...rest}>{children}</a>
  );
}

// ===== Theme =====
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") || "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("lsr-theme", theme); } catch (e) {}
  }, [theme]);
  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");
  return { theme, toggle };
}

// ===== Icons (inline svg) =====
const I = {
  arrow: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrowDR: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M4 4h6v6m0-6L4 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ext: (p) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}><path d="M4.5 3h4.5v4.5M9 3L4 8M3 9h6V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  github: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...p}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>,
  linkedin: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...p}><path d="M14.8 0H1.2C.5 0 0 .5 0 1.1v13.7c0 .7.5 1.2 1.2 1.2h13.6c.7 0 1.2-.5 1.2-1.2V1.1c0-.6-.5-1.1-1.2-1.1zM4.7 13.6H2.4V6h2.4v7.6zM3.6 5C2.8 5 2.2 4.4 2.2 3.6c0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zm10 8.6h-2.4V9.9c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.7H6.2V6h2.3v1c.3-.6 1.1-1.2 2.3-1.2 2.4 0 2.9 1.6 2.9 3.7v4.1z"/></svg>,
  youtube: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...p}><path d="M15.66 4.16s-.16-1.1-.64-1.59c-.62-.65-1.31-.65-1.62-.69C11.18 1.7 8 1.7 8 1.7s-3.18 0-5.4.18c-.31.04-1 .04-1.62.69-.49.49-.64 1.59-.64 1.59S.18 5.46.18 6.76v1.22c0 1.3.16 2.6.16 2.6s.16 1.1.64 1.59c.62.65 1.43.63 1.79.7 1.3.13 5.23.17 5.23.17s3.18 0 5.4-.18c.31-.04 1-.04 1.62-.69.49-.49.64-1.59.64-1.59s.16-1.3.16-2.6V6.76c0-1.3-.16-2.6-.16-2.6zM6.5 9.5V5l4 2.25-4 2.25z"/></svg>,
  search: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  sun: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.4"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.5 2.5l1 1M10.5 10.5l1 1M2.5 11.5l1-1M10.5 3.5l1-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  moon: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M11.5 8.2A4.5 4.5 0 015.8 2.5c0-.3 0-.6.1-.9C3.6 2.4 2 4.5 2 7a5 5 0 005 5c2.5 0 4.6-1.6 5.4-3.9l-.9.1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  menu: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  close: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  check: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M3 7.5l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  play: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" {...p}><path d="M4 3v8l7-4z"/></svg>,
  doc: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M3 1h6l3 3v9H3z M9 1v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
  dot: (p) => <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" {...p}><circle cx="3" cy="3" r="3"/></svg>,
  rss: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="3" cy="11" r="1.2" fill="currentColor"/><path d="M2 7a5 5 0 015 5M2 3a9 9 0 019 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
};

window.I = I;
window.useHashRoute = useHashRoute;
window.useTheme = useTheme;
window.navigate = navigate;
window.Link = Link;

// ===== Header =====
function Header({ theme, onToggleTheme, route }) {
  const [open, setOpen] = useState(false);
  const isAdmin = route.startsWith("/admin");
  const navItems = isAdmin ? [] : [
    { to: "/", label: "Início" },
    { to: "/projetos", label: "Projetos" },
    { to: "/conteudos", label: "Conteúdos" },
    { to: "/laboratorio", label: "Laboratório" },
    { to: "/stack", label: "Stack" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
  ];
  const isActive = (to) => {
    if (to === "/") return route === "/";
    return route === to || route.startsWith(to + "/");
  };
  return (
    <header className="lsr-header">
      <div className="container-wide lsr-header-inner">
        <Link to="/" className="lsr-logo" aria-label="Início">
          <span className="lsr-logo-mark" aria-hidden="true">▮</span>
          <span className="lsr-logo-text">leonardo<span className="muted">sr</span></span>
          <span className="lsr-logo-dot mono muted">.com.br</span>
        </Link>
        {!isAdmin && (
          <nav className="lsr-nav" aria-label="principal">
            {navItems.map(item => (
              <Link key={item.to} to={item.to} className={"lsr-nav-link" + (isActive(item.to) ? " is-active" : "")}>
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        {isAdmin && (
          <div className="lsr-nav lsr-admin-crumb">
            <span className="mono muted" style={{fontSize:"var(--fs-12)", letterSpacing:".06em", textTransform:"uppercase"}}>admin</span>
            <span className="mono muted">/</span>
            <span className="mono">leonardosr.com.br</span>
          </div>
        )}
        <div className="lsr-header-actions">
          {!isAdmin && (
            <button className="lsr-icon-btn" onClick={() => navigate("/buscar")} aria-label="Buscar">
              <I.search />
            </button>
          )}
          <button className="lsr-icon-btn" onClick={onToggleTheme} aria-label="Alternar tema">
            {theme === "light" ? <I.moon /> : <I.sun />}
          </button>
          {!isAdmin && (
            <Link to="/contato" className="btn btn-primary btn-sm lsr-cta-desktop">
              Conversar
            </Link>
          )}
          {isAdmin && (
            <Link to="/" className="btn btn-secondary btn-sm">
              Sair do admin
            </Link>
          )}
          <button className="lsr-icon-btn lsr-mobile-only" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <I.close /> : <I.menu />}
          </button>
        </div>
      </div>
      {open && !isAdmin && (
        <div className="lsr-mobile-menu">
          {navItems.map(item => (
            <Link key={item.to} to={item.to} className="lsr-mobile-link" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

// ===== Footer =====
function Footer() {
  const P = window.MOCK.PROFILE;
  return (
    <footer className="lsr-footer">
      <div className="container-wide">
        <div className="lsr-footer-grid">
          <div className="lsr-footer-brand">
            <div className="lsr-logo">
              <span className="lsr-logo-mark" aria-hidden="true">▮</span>
              <span className="lsr-logo-text">leonardo<span className="muted">sr</span></span>
            </div>
            <p className="muted" style={{maxWidth: 360, marginTop: 14, fontSize: "var(--fs-14)"}}>
              {P.short}
            </p>
            <div className="lsr-footer-status mono">
              <span className="lsr-pulse" aria-hidden="true"></span>
              <span>Disponível para conversas técnicas</span>
            </div>
          </div>
          <div>
            <div className="label">Navegação</div>
            <ul className="lsr-footer-list">
              <li><Link to="/">Início</Link></li>
              <li><Link to="/projetos">Projetos</Link></li>
              <li><Link to="/conteudos">Conteúdos</Link></li>
              <li><Link to="/laboratorio">Laboratório</Link></li>
              <li><Link to="/stack">Stack</Link></li>
            </ul>
          </div>
          <div>
            <div className="label">Profissional</div>
            <ul className="lsr-footer-list">
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/experiencia">Experiência</Link></li>
              <li><Link to="/curriculo">Currículo</Link></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </div>
          <div>
            <div className="label">Encontre-me</div>
            <ul className="lsr-footer-list">
              <li><a href="#" className="lsr-social"><I.github /> GitHub <I.ext /></a></li>
              <li><a href="#" className="lsr-social"><I.linkedin /> LinkedIn <I.ext /></a></li>
              <li><a href="#" className="lsr-social"><I.youtube /> YouTube <I.ext /></a></li>
              <li><a href="#" className="lsr-social"><I.rss /> RSS <I.ext /></a></li>
            </ul>
          </div>
        </div>
        <div className="lsr-footer-bottom">
          <div className="mono lsr-footer-meta">
            <span>© 2026 Leonardo Silva Ribeiro</span>
            <span className="muted">·</span>
            <Link to="/privacidade" className="muted">Privacidade</Link>
            <span className="muted">·</span>
            <Link to="/termos" className="muted">Termos</Link>
          </div>
          <div className="mono muted lsr-footer-build">
            <span>build #</span><span>0042</span>
            <span className="muted">·</span>
            <span>commit</span> <span>a3f1c2d</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Header = Header;
window.Footer = Footer;

// ===== shared atoms =====

function ContentTypePill({ type, typeLabel }) {
  const map = {
    ARTICLE: "artigo",
    VIDEO: "vídeo",
    ARTICLE_WITH_VIDEO: "artigo + vídeo",
    TUTORIAL: "tutorial",
    CASE_STUDY: "estudo de caso",
    TECH_NOTE: "tech note",
    LAB: "lab",
    ARCHITECTURE: "arquitetura",
  };
  return <span className="lsr-type-pill mono">{map[type] || typeLabel}</span>;
}

function ContentCard({ c, dense }) {
  const P = window.MOCK.PROFILE;
  const path = (() => {
    if (c.type === "VIDEO") return "/conteudos/videos/" + c.slug;
    if (c.type === "LAB") return "/laboratorio/" + c.slug;
    if (c.type === "ARCHITECTURE") return "/arquiteturas/" + c.slug;
    return "/conteudos/" + c.slug;
  })();
  const date = new Date(c.publishedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  return (
    <Link to={path} className={"lsr-content-card" + (dense ? " is-dense" : "")}>
      <div className="lsr-content-card-meta">
        <ContentTypePill type={c.type} typeLabel={c.typeLabel} />
        <span className="mono muted">{date}</span>
        {c.readTime && <span className="mono muted">· {c.readTime} min</span>}
        {c.duration && <span className="mono muted">· {c.duration}</span>}
      </div>
      <h3 className="lsr-content-card-title">{c.title}</h3>
      {!dense && <p className="lsr-content-card-summary muted">{c.summary}</p>}
      <div className="lsr-content-card-tags">
        {c.tags.slice(0, 3).map(t => <span key={t} className="chip">{t}</span>)}
      </div>
    </Link>
  );
}

window.ContentTypePill = ContentTypePill;
window.ContentCard = ContentCard;

function ProjectCard({ p, large }) {
  return (
    <Link to={"/projetos/" + p.slug} className={"lsr-project-card" + (large ? " is-large" : "")}>
      <div className="lsr-project-card-cover media-placeholder" aria-hidden="true">
        <span>{p.slug}.png</span>
      </div>
      <div className="lsr-project-card-body">
        <div className="lsr-project-card-meta">
          <span className="mono muted">{p.year}</span>
          <span className="mono muted">·</span>
          <span className="mono muted">{p.techs[0]}</span>
        </div>
        <h3 className="lsr-project-card-title">{p.name}</h3>
        <p className="muted lsr-project-card-summary">{p.summary}</p>
        <div className="lsr-project-card-tags">
          {p.techs.slice(0, 4).map(t => <span key={t} className="chip">{t}</span>)}
        </div>
      </div>
    </Link>
  );
}

window.ProjectCard = ProjectCard;

// ===== Section header =====
function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="lsr-section-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="lsr-section-title">{title}</h2>
        {description && <p className="muted lsr-section-desc">{description}</p>}
      </div>
      {action && <div className="lsr-section-action">{action}</div>}
    </div>
  );
}

window.SectionHeader = SectionHeader;

// ===== Page wrapper =====
function PageHeader({ eyebrow, title, lede, meta, decoration }) {
  return (
    <section className="lsr-page-header">
      <div className="container-wide">
        <div className="lsr-page-header-inner">
          <div className="lsr-page-header-text">
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h1 className="lsr-page-title">{title}</h1>
            {lede && <p className="lsr-page-lede">{lede}</p>}
            {meta && <div className="lsr-page-meta">{meta}</div>}
          </div>
          {decoration && <div className="lsr-page-deco">{decoration}</div>}
        </div>
      </div>
      <hr className="hairline" style={{margin: 0}} />
    </section>
  );
}

window.PageHeader = PageHeader;

function Stat({ value, label }) {
  return (
    <div className="lsr-stat">
      <div className="lsr-stat-value">{value}</div>
      <div className="lsr-stat-label mono muted">{label}</div>
    </div>
  );
}

window.Stat = Stat;

// 404
function NotFound({ route }) {
  return (
    <main className="container" style={{padding: "120px 0", textAlign: "center"}}>
      <div className="eyebrow" style={{justifyContent:"center"}}>404 / not found</div>
      <h1 style={{fontSize: "var(--fs-48)", marginTop: 14}}>Página não encontrada</h1>
      <p className="muted" style={{marginTop: 12, fontSize: "var(--fs-16)"}}>A rota <code className="mono">{route}</code> não existe (ainda).</p>
      <div style={{marginTop: 28, display: "flex", gap: 12, justifyContent: "center"}}>
        <Link to="/" className="btn btn-primary">Voltar ao início</Link>
        <Link to="/conteudos" className="btn btn-secondary">Ver conteúdos</Link>
      </div>
    </main>
  );
}

window.NotFound = NotFound;

// ===== CommandK =====
function CommandK() {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.__openCmdK = () => setOpen(true);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else { setQ(""); setActive(0); }
  }, [open]);

  if (!open) return null;
  const M = window.MOCK;
  const s = q.toLowerCase().trim();
  const items = [];
  const pages = [
    { kind: "página", title: "Início", to: "/" },
    { kind: "página", title: "Sobre", to: "/sobre" },
    { kind: "página", title: "Experiência", to: "/experiencia" },
    { kind: "página", title: "Stack", to: "/stack" },
    { kind: "página", title: "Currículo", to: "/curriculo" },
    { kind: "página", title: "Contato", to: "/contato" },
    { kind: "página", title: "Projetos", to: "/projetos" },
    { kind: "página", title: "Conteúdos", to: "/conteudos" },
    { kind: "página", title: "Vídeos", to: "/conteudos/videos" },
    { kind: "página", title: "Séries", to: "/conteudos/series" },
    { kind: "página", title: "Laboratório", to: "/laboratorio" },
    { kind: "admin", title: "Painel admin", to: "/admin" },
  ];
  pages.forEach(p => { if (!s || p.title.toLowerCase().includes(s)) items.push(p); });
  M.CONTENTS.forEach(c => {
    if (!s || c.title.toLowerCase().includes(s)) items.push({ kind: c.typeLabel.toLowerCase(), title: c.title, to: "/conteudos/" + c.slug });
  });
  M.PROJECTS.forEach(p => {
    if (!s || p.name.toLowerCase().includes(s)) items.push({ kind: "projeto", title: p.name, to: "/projetos/" + p.slug });
  });
  const list = items.slice(0, 30);

  const go = (i) => {
    const it = list[i]; if (!it) return;
    setOpen(false);
    window.navigate(it.to);
  };
  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a+1, list.length-1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a-1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); go(active); }
  };

  return (
    <div className="lsr-cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="lsr-cmdk" onClick={(e) => e.stopPropagation()}>
        <div className="lsr-cmdk-input-row">
          {window.I.search()}
          <input ref={inputRef} className="lsr-cmdk-input" placeholder="Buscar páginas, conteúdos, projetos..." value={q} onChange={(e) => { setQ(e.target.value); setActive(0); }} onKeyDown={onKey} />
          <span className="lsr-cmdk-kbd"><kbd>Esc</kbd></span>
        </div>
        <div className="lsr-cmdk-results">
          {list.length === 0 && (<div className="lsr-cmdk-group-label">nenhum resultado</div>)}
          {list.map((it, i) => (
            <button key={i} className={"lsr-cmdk-item" + (active === i ? " is-active" : "")} onMouseEnter={() => setActive(i)} onClick={() => go(i)}>
              <span className="lsr-cmdk-item-kind">{it.kind}</span>
              <span className="lsr-cmdk-item-title">{it.title}</span>
              <span className="lsr-cmdk-item-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
window.CommandK = CommandK;

/* global React */
// pages-admin.jsx — Login, Dashboard, Lista de conteúdos, Editor MDX, Mensagens, Mídia

const { useState: useA, useEffect: useEffA, useMemo: useMemoA } = React;

function AdminShell({ children, current }) {
  const Link = window.Link;
  const items = [
    { to: "/admin", label: "Dashboard", icon: "▸" },
    { to: "/admin/conteudos", label: "Conteúdos", count: window.MOCK.CONTENTS.length },
    { to: "/admin/projetos", label: "Projetos", count: window.MOCK.PROJECTS.length },
    { to: "/admin/series", label: "Séries", count: window.MOCK.SERIES.length },
    { to: "/admin/tags", label: "Tags", count: window.MOCK.TAGS.length },
    { to: "/admin/tecnologias", label: "Tecnologias", count: window.MOCK.TECHS.length },
    { to: "/admin/experiencias", label: "Experiências", count: window.MOCK.EXPERIENCES.length },
    { to: "/admin/midias", label: "Mídias", count: 24 },
    { to: "/admin/mensagens", label: "Mensagens", count: window.MOCK.MESSAGES.length, badge: window.MOCK.MESSAGES.filter(m=>m.status==="new").length },
    { to: "/admin/perfil", label: "Perfil do site" },
    { to: "/admin/configuracoes/seo", label: "SEO" },
  ];
  return (
    <div className="lsr-admin">
      <aside className="lsr-admin-sidebar">
        <div className="lsr-admin-side-head">
          <div className="label">Admin · v1.0</div>
          <div className="lsr-admin-user">
            <div className="lsr-author-avatar" style={{width: 28, height: 28, fontSize: 11}}>{window.MOCK.PROFILE.initials}</div>
            <div>
              <div style={{fontSize: "var(--fs-13)"}}>Leonardo SR</div>
              <div className="mono muted" style={{fontSize: "var(--fs-11)"}}>ROLE_ADMIN</div>
            </div>
          </div>
        </div>
        <nav>
          {items.map(it => (
            <Link key={it.to} to={it.to} className={"lsr-admin-nav-item" + (current === it.to ? " is-active" : "")}>
              <span>{it.label}</span>
              <span className="lsr-admin-nav-meta">
                {it.badge ? <span className="lsr-admin-badge mono">{it.badge}</span> : null}
                {typeof it.count === "number" ? <span className="mono muted">{it.count}</span> : null}
              </span>
            </Link>
          ))}
        </nav>
        <div className="lsr-admin-side-foot">
          <div className="mono muted" style={{fontSize: "var(--fs-11)"}}>build 0042 · a3f1c2d</div>
          <Link to="/" className="link-mono" style={{marginTop: 8}}>← ver site público</Link>
        </div>
      </aside>
      <div className="lsr-admin-main">
        {children}
      </div>
    </div>
  );
}

function AdminLogin() {
  const [user, setUser] = useA("leonardo");
  const [pw, setPw] = useA("");
  const [err, setErr] = useA("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (pw.length < 1) { setErr("Informe a senha"); return; }
    window.navigate("/admin");
  };
  return (
    <div className="lsr-login-page">
      <div className="lsr-login-card">
        <div className="lsr-login-head">
          <div className="lsr-logo">
            <span className="lsr-logo-mark">▮</span>
            <span className="lsr-logo-text">leonardo<span className="muted">sr</span></span>
          </div>
          <div className="mono muted" style={{marginTop: 14, fontSize: "var(--fs-12)", letterSpacing: ".06em", textTransform: "uppercase"}}>painel administrativo</div>
        </div>
        <form onSubmit={onSubmit} className="lsr-login-form">
          <div className="lsr-field">
            <label className="label">Usuário</label>
            <input className="input" value={user} onChange={(e) => setUser(e.target.value)} autoFocus />
          </div>
          <div className="lsr-field">
            <label className="label">Senha</label>
            <input type="password" className="input" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
            {err && <div className="lsr-field-error mono">{err}</div>}
          </div>
          <button type="submit" className="btn btn-primary" style={{width: "100%"}}>Entrar</button>
          <div className="lsr-login-foot mono muted">
            <window.I.dot style={{color: "var(--success)"}}/>
            <span>cookie de sessão · HttpOnly · Secure · SameSite=Lax</span>
          </div>
        </form>
        <div className="lsr-login-side mono muted">
          <div>POST /api/auth/login</div>
          <div>spring-security · spring-session</div>
          <div>csrf token explícito</div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const M = window.MOCK;
  const Link = window.Link;
  const recent = M.CONTENTS.slice(0, 5);
  return (
    <AdminShell current="/admin">
      <header className="lsr-admin-page-head">
        <div>
          <div className="eyebrow">Dashboard</div>
          <h1>Olá, Leonardo</h1>
          <p className="muted">Visão geral do site, conteúdos publicados e mensagens recebidas.</p>
        </div>
        <div className="lsr-admin-page-head-actions">
          <button className="btn btn-secondary"><window.I.ext /> Ver site público</button>
          <Link to="/admin/conteudos/novo" className="btn btn-primary">Novo conteúdo <window.I.arrow /></Link>
        </div>
      </header>

      <section className="lsr-admin-stats">
        <div className="lsr-admin-stat">
          <div className="label">Conteúdos publicados</div>
          <div className="lsr-admin-stat-value">{M.CONTENTS.length}</div>
          <div className="mono muted lsr-admin-stat-delta" style={{color: "var(--success)"}}>↑ 2 este mês</div>
        </div>
        <div className="lsr-admin-stat">
          <div className="label">Projetos ativos</div>
          <div className="lsr-admin-stat-value">{M.PROJECTS.length}</div>
          <div className="mono muted lsr-admin-stat-delta">3 em destaque</div>
        </div>
        <div className="lsr-admin-stat">
          <div className="label">Mensagens novas</div>
          <div className="lsr-admin-stat-value">{M.MESSAGES.filter(m=>m.status==="new").length}</div>
          <div className="mono muted lsr-admin-stat-delta" style={{color: "var(--accent)"}}>requer resposta</div>
        </div>
        <div className="lsr-admin-stat">
          <div className="label">Build de produção</div>
          <div className="lsr-admin-stat-value mono" style={{fontSize: "var(--fs-20)"}}>a3f1c2d</div>
          <div className="mono muted lsr-admin-stat-delta">deploy há 2h · vercel</div>
        </div>
      </section>

      <section className="lsr-admin-grid">
        <article className="lsr-admin-card">
          <header className="lsr-admin-card-head">
            <h2>Atividade recente</h2>
            <Link to="/admin/conteudos" className="link-mono">ver tudo →</Link>
          </header>
          <table className="lsr-admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Atualizado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recent.map(c => (
                <tr key={c.slug}>
                  <td>{c.title}</td>
                  <td><window.ContentTypePill type={c.type} typeLabel={c.typeLabel} /></td>
                  <td><span className="chip chip-accent chip-dot mono">publicado</span></td>
                  <td className="mono muted">{new Date(c.publishedAt).toLocaleDateString("pt-BR")}</td>
                  <td><Link to={"/admin/conteudos/" + c.slug} className="link-mono">editar →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="lsr-admin-card">
          <header className="lsr-admin-card-head">
            <h2>Mensagens</h2>
            <Link to="/admin/mensagens" className="link-mono">ver tudo →</Link>
          </header>
          <ul className="lsr-msg-list">
            {M.MESSAGES.slice(0, 4).map(m => (
              <li key={m.id} className="lsr-msg-item">
                <div className={"lsr-msg-status " + (m.status === "new" ? "is-new" : "")}></div>
                <div className="lsr-msg-body">
                  <div className="lsr-msg-from">
                    <strong>{m.name}</strong>
                    <span className="mono muted">{m.email}</span>
                  </div>
                  <div className="lsr-msg-subject">{m.subject}</div>
                </div>
                <div className="mono muted lsr-msg-date">{new Date(m.date).toLocaleDateString("pt-BR")}</div>
              </li>
            ))}
          </ul>
        </article>

        <article className="lsr-admin-card">
          <header className="lsr-admin-card-head">
            <h2>Saúde do sistema</h2>
            <span className="mono muted">/actuator/health</span>
          </header>
          <ul className="lsr-health">
            <li><span className="lsr-pulse"></span><span>API Spring Boot</span><span className="mono muted">200 · 84ms</span></li>
            <li><span className="lsr-pulse"></span><span>PostgreSQL</span><span className="mono muted">conectado · 12ms</span></li>
            <li><span className="lsr-pulse"></span><span>Cloudflare R2</span><span className="mono muted">disponível</span></li>
            <li><span className="lsr-pulse"></span><span>Plausible</span><span className="mono muted">tracking ok</span></li>
            <li><span className="lsr-pulse" style={{background: "var(--warning)"}}></span><span>Sentry</span><span className="mono muted">3 erros · últimas 24h</span></li>
          </ul>
        </article>

        <article className="lsr-admin-card">
          <header className="lsr-admin-card-head">
            <h2>Próximas publicações</h2>
            <Link to="/admin/conteudos" className="link-mono">calendário →</Link>
          </header>
          <ul className="lsr-schedule">
            <li>
              <div className="lsr-schedule-date mono"><div>10</div><div className="muted">mai</div></div>
              <div>
                <div>Spring Boot — observabilidade com Micrometer</div>
                <div className="mono muted" style={{fontSize: "var(--fs-12)"}}>artigo · rascunho</div>
              </div>
            </li>
            <li>
              <div className="lsr-schedule-date mono"><div>17</div><div className="muted">mai</div></div>
              <div>
                <div>Vídeo — debug de sessão Spring Security</div>
                <div className="mono muted" style={{fontSize: "var(--fs-12)"}}>vídeo · gravação</div>
              </div>
            </li>
            <li>
              <div className="lsr-schedule-date mono"><div>24</div><div className="muted">mai</div></div>
              <div>
                <div>Lab — Server Components vs Client Components</div>
                <div className="mono muted" style={{fontSize: "var(--fs-12)"}}>lab · esboço</div>
              </div>
            </li>
          </ul>
        </article>
      </section>
    </AdminShell>
  );
}

function AdminConteudos() {
  const M = window.MOCK;
  const Link = window.Link;
  const [q, setQ] = useA("");
  const [type, setType] = useA("ALL");
  const items = useMemoA(() => {
    let xs = M.CONTENTS.slice();
    if (type !== "ALL") xs = xs.filter(c => c.type === type);
    if (q.trim()) xs = xs.filter(c => c.title.toLowerCase().includes(q.toLowerCase()));
    return xs;
  }, [q, type]);
  return (
    <AdminShell current="/admin/conteudos">
      <header className="lsr-admin-page-head">
        <div>
          <div className="eyebrow">/admin/conteudos</div>
          <h1>Conteúdos</h1>
          <p className="muted">Gerenciar artigos, vídeos, tutoriais, laboratórios e arquiteturas.</p>
        </div>
        <div className="lsr-admin-page-head-actions">
          <Link to="/admin/conteudos/novo" className="btn btn-primary">+ Novo conteúdo</Link>
        </div>
      </header>

      <div className="lsr-admin-toolbar">
        <div className="lsr-search-wrap" style={{flex: 1, maxWidth: 360}}>
          <window.I.search />
          <input className="input lsr-search-input" placeholder="Buscar por título..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="lsr-filter-bar" style={{borderBottom: 0}}>
          {[["ALL","Todos"],["ARTICLE","Artigos"],["VIDEO","Vídeos"],["LAB","Lab"],["ARCHITECTURE","Arq"],["TUTORIAL","Tut"],["CASE_STUDY","Casos"]].map(([k,l]) => (
            <button key={k} className={"lsr-filter-chip mono" + (type === k ? " is-active" : "")} onClick={() => setType(k)}>{l}</button>
          ))}
        </div>
      </div>

      <table className="lsr-admin-table is-rich">
        <thead>
          <tr>
            <th style={{width: 32}}><input type="checkbox" /></th>
            <th>Título</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Tags</th>
            <th>Atualizado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(c => (
            <tr key={c.slug}>
              <td><input type="checkbox" /></td>
              <td>
                <Link to={"/admin/conteudos/" + c.slug} className="lsr-admin-table-title">{c.title}</Link>
                <div className="mono muted" style={{fontSize: "var(--fs-12)"}}>{"/conteudos/" + c.slug}</div>
              </td>
              <td><window.ContentTypePill type={c.type} typeLabel={c.typeLabel} /></td>
              <td><span className="chip chip-accent chip-dot mono">publicado</span></td>
              <td>
                <div className="lsr-content-card-tags">
                  {c.tags.slice(0,2).map(t => <span key={t} className="chip">{t}</span>)}
                  {c.tags.length > 2 && <span className="chip">+{c.tags.length - 2}</span>}
                </div>
              </td>
              <td className="mono muted">{new Date(c.publishedAt).toLocaleDateString("pt-BR")}</td>
              <td><Link to={"/admin/conteudos/" + c.slug} className="link-mono">editar →</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminShell>
  );
}

function AdminEditor({ slug }) {
  const M = window.MOCK;
  const c = M.CONTENTS.find(x => x.slug === slug) || {
    title: "Novo conteúdo", slug: "novo-conteudo", summary: "",
    type: "ARTICLE", typeLabel: "Artigo", tags: [], techs: [], publishedAt: new Date().toISOString().slice(0,10), readTime: 0,
  };
  const isNew = !slug;
  const [title, setTitle] = useA(isNew ? "" : c.title);
  const [contentSlug, setSlug] = useA(isNew ? "" : c.slug);
  const [summary, setSummary] = useA(isNew ? "" : c.summary);
  const [body, setBody] = useA(window.MOCK.ARTICLE_BODY);
  const [type, setType] = useA(c.type);
  const [tab, setTab] = useA("editor");
  const [showPreview, setShowPreview] = useA(true);

  return (
    <AdminShell current="/admin/conteudos">
      <header className="lsr-admin-page-head lsr-editor-head">
        <div>
          <div className="lsr-breadcrumb mono">
            <window.Link to="/admin/conteudos" className="muted">conteúdos</window.Link>
            <span className="muted">/</span>
            <span>{isNew ? "novo" : c.slug}</span>
          </div>
          <h1 style={{marginTop: 6}}>{isNew ? "Novo conteúdo" : "Editar conteúdo"}</h1>
        </div>
        <div className="lsr-admin-page-head-actions">
          <span className="mono muted" style={{fontSize: "var(--fs-12)"}}><window.I.dot style={{color: "var(--success)"}}/> salvo · há 12s</span>
          <button className="btn btn-secondary">Pré-visualizar</button>
          <button className="btn btn-secondary">Salvar rascunho</button>
          <button className="btn btn-primary">Publicar <window.I.arrow /></button>
        </div>
      </header>

      <div className="lsr-editor">
        <div className="lsr-editor-main">
          <div className="lsr-editor-fields">
            <div className="lsr-field">
              <label className="label">Título</label>
              <input className="input lsr-editor-title-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex.: Camada de storage abstrata em Spring Boot" />
            </div>
            <div className="lsr-form-row">
              <div className="lsr-field">
                <label className="label">Slug</label>
                <div className="lsr-slug-input">
                  <span className="mono muted">/conteudos/</span>
                  <input className="input mono" value={contentSlug} onChange={(e) => setSlug(e.target.value)} placeholder="meu-novo-conteudo" />
                </div>
              </div>
              <div className="lsr-field">
                <label className="label">Tipo</label>
                <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="ARTICLE">Artigo</option>
                  <option value="VIDEO">Vídeo</option>
                  <option value="ARTICLE_WITH_VIDEO">Artigo + Vídeo</option>
                  <option value="TUTORIAL">Tutorial</option>
                  <option value="CASE_STUDY">Estudo de caso</option>
                  <option value="TECH_NOTE">Tech note</option>
                  <option value="LAB">Laboratório</option>
                  <option value="ARCHITECTURE">Arquitetura</option>
                </select>
              </div>
            </div>
            <div className="lsr-field">
              <label className="label">Resumo</label>
              <textarea className="textarea" style={{minHeight: 80}} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Uma frase clara que explica do que se trata..." />
            </div>
          </div>

          <div className="lsr-editor-tabs">
            <button className={"lsr-editor-tab" + (tab === "editor" ? " is-active" : "")} onClick={() => setTab("editor")}>
              MDX
            </button>
            <button className={"lsr-editor-tab" + (tab === "settings" ? " is-active" : "")} onClick={() => setTab("settings")}>
              Configurações
            </button>
            <button className={"lsr-editor-tab" + (tab === "seo" ? " is-active" : "")} onClick={() => setTab("seo")}>
              SEO
            </button>
            <div className="lsr-editor-tab-spacer"></div>
            <label className="lsr-editor-toggle mono">
              <input type="checkbox" checked={showPreview} onChange={(e) => setShowPreview(e.target.checked)} /> Preview lado a lado
            </label>
          </div>

          {tab === "editor" && (
            <div className={"lsr-editor-pane" + (showPreview ? " has-preview" : "")}>
              <div className="lsr-editor-mdx">
                <div className="lsr-editor-toolbar mono">
                  <button>H2</button><button>H3</button><button>Bold</button><button>Italic</button>
                  <button>{"<>"}</button><button>Link</button>
                  <span style={{flex: 1}}></span>
                  <button>Callout</button><button>CodeBlock</button><button>VideoEmbed</button>
                </div>
                <textarea className="lsr-editor-textarea mono" value={body} onChange={(e) => setBody(e.target.value)} />
              </div>
              {showPreview && (
                <div className="lsr-editor-preview">
                  <div className="lsr-editor-preview-head mono muted">preview · MDX compilado</div>
                  <div className="prose lsr-prose-narrow">
                    <h1 style={{fontSize: "var(--fs-30)"}}>{title || "(sem título)"}</h1>
                    <p className="muted">{summary || "(sem resumo)"}</p>
                    <hr />
                    {parseMdSafe(body).map((b, i) => renderMdSafe(b, i))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "settings" && (
            <div className="lsr-editor-pane">
              <div className="lsr-editor-mdx" style={{padding: 24}}>
                <div className="lsr-form-row">
                  <div className="lsr-field"><label className="label">Tags</label><input className="input" defaultValue={(c.tags||[]).join(", ")} /></div>
                  <div className="lsr-field"><label className="label">Tecnologias</label><input className="input" defaultValue={(c.techs||[]).join(", ")} /></div>
                </div>
                <div className="lsr-form-row">
                  <div className="lsr-field"><label className="label">Data de publicação</label><input className="input" defaultValue={c.publishedAt} /></div>
                  <div className="lsr-field"><label className="label">Tempo de leitura (min)</label><input className="input" defaultValue={c.readTime || ""} /></div>
                </div>
                <div className="lsr-field"><label className="label">Imagem de capa</label>
                  <div className="lsr-cover-picker">
                    <div className="media-placeholder" style={{height: 140, borderRadius: 8}}><span>arraste uma imagem</span></div>
                    <button className="btn btn-secondary btn-sm" style={{marginTop: 12}}>Escolher da biblioteca</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "seo" && (
            <div className="lsr-editor-pane">
              <div className="lsr-editor-mdx" style={{padding: 24}}>
                <div className="lsr-field"><label className="label">Meta title</label><input className="input" defaultValue={title} /></div>
                <div className="lsr-field"><label className="label">Meta description</label><textarea className="textarea" defaultValue={summary} style={{minHeight: 80}} /></div>
                <div className="lsr-field"><label className="label">Canonical URL</label><input className="input mono" defaultValue={"https://leonardosr.com.br/conteudos/" + (contentSlug || "novo")} /></div>
                <div className="lsr-field"><label className="label">OG Image</label>
                  <div className="lsr-og-preview media-placeholder" style={{height: 200, borderRadius: 8}}><span>og:image · gerado dinamicamente</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="lsr-editor-side">
          <div className="lsr-side-card">
            <div className="label">Estado</div>
            <ul className="lsr-mini-list">
              <li><span className="mono muted">status</span><span><span className="chip chip-accent chip-dot mono">rascunho</span></span></li>
              <li><span className="mono muted">visibilidade</span><span>público</span></li>
              <li><span className="mono muted">criado</span><span className="mono muted">{new Date().toLocaleDateString("pt-BR")}</span></li>
              <li><span className="mono muted">autor</span><span>Leonardo SR</span></li>
            </ul>
          </div>
          <div className="lsr-side-card">
            <div className="label">Validações</div>
            <ul className="lsr-validation-list">
              <li><window.I.check style={{color: "var(--success)"}}/> Slug único</li>
              <li><window.I.check style={{color: "var(--success)"}}/> Componentes na allowlist</li>
              <li><window.I.check style={{color: "var(--success)"}}/> Sem imports diretos</li>
              <li><span className="mono" style={{color: "var(--warning)"}}>!</span> Resumo &lt; 60 caracteres</li>
              <li><span className="mono" style={{color: "var(--success)"}}>✓</span> MDX compila</li>
            </ul>
          </div>
          <div className="lsr-side-card">
            <div className="label">Histórico</div>
            <ul className="lsr-history">
              <li><span className="mono muted">12s</span> auto-save</li>
              <li><span className="mono muted">2h</span> Leonardo · editou corpo</li>
              <li><span className="mono muted">ontem</span> Leonardo · publicou</li>
            </ul>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}

// minimal renderers reusing patterns from pages-content
function parseMdSafe(src) {
  return (src || "").split(/\n\n+/).slice(0, 12).map(p => {
    if (p.startsWith("## ")) return { type: "h2", text: p.slice(3).split("\n")[0] };
    if (p.startsWith("### ")) return { type: "h3", text: p.slice(4).split("\n")[0] };
    if (p.startsWith("```")) return { type: "code", text: p.replace(/```\w*\n?/, "").replace(/```$/,"") };
    if (p.startsWith("> ")) return { type: "quote", text: p.replace(/^> /gm, "") };
    return { type: "p", text: p };
  });
}
function renderMdSafe(b, i) {
  if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
  if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
  if (b.type === "quote") return <blockquote key={i}>{b.text}</blockquote>;
  if (b.type === "code") return <pre key={i}><code>{b.text}</code></pre>;
  return <p key={i}>{b.text}</p>;
}

function AdminMensagens() {
  const M = window.MOCK;
  const [sel, setSel] = useA(M.MESSAGES[0]);
  return (
    <AdminShell current="/admin/mensagens">
      <header className="lsr-admin-page-head">
        <div>
          <div className="eyebrow">/admin/mensagens</div>
          <h1>Mensagens de contato</h1>
          <p className="muted">{M.MESSAGES.filter(m=>m.status==="new").length} novas · LGPD: anonimização automática após 12 meses.</p>
        </div>
      </header>
      <div className="lsr-msg-layout">
        <div className="lsr-msg-list-pane">
          <div className="lsr-search-wrap" style={{margin: "0 16px 12px"}}>
            <window.I.search />
            <input className="input lsr-search-input" placeholder="Buscar mensagens..." />
          </div>
          {M.MESSAGES.map(m => (
            <button key={m.id} onClick={() => setSel(m)} className={"lsr-msg-row" + (sel.id === m.id ? " is-selected" : "")}>
              <div className={"lsr-msg-status " + (m.status === "new" ? "is-new" : "")}></div>
              <div style={{flex: 1, textAlign: "left"}}>
                <div className="lsr-msg-from">
                  <strong>{m.name}</strong>
                  <span className="mono muted" style={{fontSize: "var(--fs-12)"}}>{new Date(m.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="lsr-msg-subject">{m.subject}</div>
                <div className="muted" style={{fontSize: "var(--fs-12)", marginTop: 2}}>{m.email}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="lsr-msg-detail">
          <header>
            <h2>{sel.subject}</h2>
            <div className="muted" style={{marginTop: 4}}>De <strong>{sel.name}</strong> · <span className="mono">{sel.email}</span> · {new Date(sel.date).toLocaleDateString("pt-BR")}</div>
          </header>
          <div className="lsr-msg-body-text">
            <p>Olá Leonardo,</p>
            <p>Vi seu artigo sobre Postgres FTS e ficou excelente. Estamos implementando algo parecido em um portal interno e tenho uma dúvida sobre a montagem do tsvector quando o conteúdo é editado em batch.</p>
            <p>Você usa trigger no banco ou faz tudo na camada de aplicação? Estamos tendendo para a camada de aplicação por causa da auditoria, mas estou em dúvida sobre performance em massa.</p>
            <p>Abraço,<br />{sel.name.split(" ")[0]}</p>
          </div>
          <div className="lsr-msg-actions">
            <button className="btn btn-primary">Responder por e-mail</button>
            <button className="btn btn-secondary">Marcar como lido</button>
            <button className="btn btn-ghost">Anonimizar agora</button>
          </div>
          <div className="lsr-msg-meta mono muted">
            <div>IP anonimizado · 192.168.0.0/16</div>
            <div>User-Agent · Mozilla/5.0 (Macintosh)</div>
            <div>Recebida via formulário · /api/contact</div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

window.AdminLogin = AdminLogin;
window.AdminDashboard = AdminDashboard;
window.AdminConteudos = AdminConteudos;
window.AdminEditor = AdminEditor;
window.AdminMensagens = AdminMensagens;

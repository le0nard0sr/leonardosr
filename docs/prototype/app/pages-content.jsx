/* global React */
// pages-content.jsx — Conteúdos lista, Artigo, Vídeo, Série, Laboratório, Arquitetura

const { useState: useC, useEffect: useEffC, useRef: useRefC, useMemo: useMemoC } = React;

// ===== Conteúdos: lista =====
function ConteudosPage({ filter }) {
  const M = window.MOCK;
  const Link = window.Link;
  const [type, setType] = useC(filter || "ALL");
  const [tag, setTag] = useC("Todas");
  const [q, setQ] = useC("");

  const types = [
    { id: "ALL", label: "Todos" },
    { id: "ARTICLE", label: "Artigos" },
    { id: "VIDEO", label: "Vídeos" },
    { id: "SERIES", label: "Séries" },
    { id: "TUTORIAL", label: "Tutoriais" },
    { id: "CASE_STUDY", label: "Estudos de caso" },
    { id: "LAB", label: "Laboratório" },
    { id: "ARCHITECTURE", label: "Arquiteturas" },
  ];

  const filtered = useMemoC(() => {
    let xs = M.CONTENTS.slice();
    if (type === "VIDEO") xs = xs.filter(c => c.type === "VIDEO" || c.type === "ARTICLE_WITH_VIDEO");
    else if (type === "ARTICLE") xs = xs.filter(c => c.type === "ARTICLE" || c.type === "ARTICLE_WITH_VIDEO");
    else if (type !== "ALL" && type !== "SERIES") xs = xs.filter(c => c.type === type);
    if (tag !== "Todas") xs = xs.filter(c => c.tags.includes(tag));
    if (q.trim()) {
      const s = q.toLowerCase();
      xs = xs.filter(c =>
        c.title.toLowerCase().includes(s) ||
        c.summary.toLowerCase().includes(s) ||
        c.tags.some(t => t.toLowerCase().includes(s))
      );
    }
    return xs;
  }, [type, tag, q]);

  if (type === "SERIES") {
    return (
      <main>
        <window.PageHeader
          eyebrow="Conteúdos · /conteudos/series"
          title="Séries"
          lede="Coleções editoriais — artigos, vídeos e laboratórios organizados em sequência."
        />
        <section className="container-wide">
          <div className="lsr-tabs">
            {types.map(t => (
              <button key={t.id} onClick={() => setType(t.id)} className={"lsr-tab" + (type === t.id ? " is-active" : "")}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="lsr-series-grid">
            {M.SERIES.map(s => (
              <Link key={s.slug} to={"/conteudos/series/" + s.slug} className="lsr-series-card">
                <div className="lsr-series-cover media-placeholder">
                  <span>{s.coverHint}.svg</span>
                </div>
                <div className="lsr-series-body">
                  <div className="eyebrow">{s.contentSlugs.length} de {s.plannedTotal} publicados</div>
                  <h3>{s.name}</h3>
                  <p className="muted">{s.description}</p>
                  <div className="lsr-series-progress">
                    <div className="lsr-series-progress-bar">
                      <div style={{width: (s.contentSlugs.length / s.plannedTotal * 100) + "%"}}></div>
                    </div>
                    <span className="mono muted">{Math.round(s.contentSlugs.length / s.plannedTotal * 100)}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <window.PageHeader
        eyebrow="Conteúdos · /conteudos"
        title={type === "VIDEO" ? "Vídeos" : type === "ARTICLE" ? "Artigos" : "Conteúdos"}
        lede="Anotações práticas, tutoriais, estudos de caso, laboratórios e arquiteturas — organizados em uma área única."
        meta={<div className="mono muted">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</div>}
      />
      <section className="container-wide">
        <div className="lsr-tabs">
          {types.map(t => (
            <button key={t.id} onClick={() => setType(t.id)} className={"lsr-tab" + (type === t.id ? " is-active" : "")}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="lsr-content-toolbar">
          <div className="lsr-search-wrap">
            <window.I.search />
            <input className="input lsr-search-input" placeholder="Buscar em conteúdos..." value={q} onChange={(e) => setQ(e.target.value)} />
            {q && <button className="lsr-search-clear" onClick={() => setQ("")}><window.I.close /></button>}
          </div>
          <div className="lsr-tag-cloud">
            {["Todas", ...M.TAGS.slice(0, 10)].map(t => (
              <button key={t} onClick={() => setTag(t)} className={"chip" + (tag === t ? " chip-accent" : "")}>{t}</button>
            ))}
          </div>
        </div>

        {type === "VIDEO" ? (
          <div className="lsr-video-list">
            {filtered.map(c => (
              <Link key={c.slug} to={"/conteudos/" + c.slug} className="lsr-video-row">
                <div className="lsr-video-row-thumb media-placeholder">
                  <span>thumb · {c.slug}</span>
                  <div className="lsr-video-play"><window.I.play /></div>
                  <div className="lsr-video-duration mono">{c.duration}</div>
                </div>
                <div className="lsr-video-row-body">
                  <window.ContentTypePill type={c.type} typeLabel={c.typeLabel} />
                  <h3>{c.title}</h3>
                  <p className="muted">{c.summary}</p>
                  <div className="mono muted lsr-video-bar">
                    <span>{new Date(c.publishedAt).toLocaleDateString("pt-BR")}</span>
                    {c.tags.slice(0, 3).map(t => <span key={t}>· #{t.toLowerCase().replace(/\s/g,"-")}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="lsr-content-list">
            {filtered.map(c => (
              <Link key={c.slug} to={c.type === "LAB" ? "/laboratorio/" + c.slug : c.type === "ARCHITECTURE" ? "/arquiteturas/" + c.slug : "/conteudos/" + c.slug} className="lsr-content-row">
                <div className="lsr-content-row-meta">
                  <window.ContentTypePill type={c.type} typeLabel={c.typeLabel} />
                </div>
                <div className="lsr-content-row-body">
                  <h3>{c.title}</h3>
                  <p className="muted">{c.summary}</p>
                  <div className="lsr-content-row-tags">
                    {c.tags.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
                <div className="lsr-content-row-side mono muted">
                  <div>{new Date(c.publishedAt).toLocaleDateString("pt-BR")}</div>
                  {c.readTime && <div>{c.readTime} min de leitura</div>}
                  {c.duration && <div>{c.duration}</div>}
                </div>
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="lsr-empty">
            <div className="eyebrow no-line" style={{justifyContent:"center"}}>nenhum resultado</div>
            <p className="muted">Tente outra combinação de filtros ou busque por outro termo.</p>
          </div>
        )}
      </section>
    </main>
  );
}

// ===== Artigo detalhe =====
function ArtigoPage({ slug }) {
  const M = window.MOCK;
  const Link = window.Link;
  const c = M.CONTENTS.find(x => x.slug === slug);
  if (!c) return <window.NotFound route={"/conteudos/" + slug} />;
  if (c.type === "VIDEO") return <VideoPage slug={slug} />;
  if (c.type === "LAB") return <LabDetailPage slug={slug} />;
  if (c.type === "ARCHITECTURE") return <ArquiteturaDetailPage slug={slug} />;

  const [progress, setProgress] = useC(0);
  const [activeId, setActiveId] = useC("");
  useEffC(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const top = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(Math.min(100, Math.max(0, (top / max) * 100)));

      const heads = Array.from(document.querySelectorAll("#article-body h2, #article-body h3"));
      let cur = "";
      for (const h2 of heads) {
        if (h2.getBoundingClientRect().top - 120 <= 0) cur = h2.id;
      }
      setActiveId(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build TOC + render markdown-ish body
  const blocks = parseMd(M.ARTICLE_BODY);
  const toc = blocks.filter(b => b.type === "h2" || b.type === "h3").map(b => ({ id: b.id, text: b.text, level: b.type }));

  const series = c.series ? M.SERIES.find(s => s.slug === c.series) : null;
  const related = M.CONTENTS.filter(x => x.slug !== c.slug && x.tags.some(t => c.tags.includes(t))).slice(0, 3);

  return (
    <main>
      <div className="read-progress" style={{width: progress + "%"}}></div>
      <article className="lsr-article">
        <div className="container">
          <div className="lsr-article-meta">
            <Link to="/conteudos" className="link-mono">← conteúdos</Link>
            <span className="mono muted">·</span>
            <window.ContentTypePill type={c.type} typeLabel={c.typeLabel} />
            {series && <>
              <span className="mono muted">·</span>
              <Link to={"/conteudos/series/" + series.slug} className="mono link-mono">{series.name}</Link>
              <span className="mono muted">{c.seriesIndex && "/" + String(c.seriesIndex).padStart(2,"0")}</span>
            </>}
          </div>
          <h1 className="lsr-article-title">{c.title}</h1>
          <p className="lsr-article-summary">{c.summary}</p>
          <div className="lsr-article-byline">
            <div className="lsr-author">
              <div className="lsr-author-avatar">{M.PROFILE.initials}</div>
              <div>
                <div>{M.PROFILE.name}</div>
                <div className="mono muted" style={{fontSize: "var(--fs-12)"}}>{M.PROFILE.role}</div>
              </div>
            </div>
            <div className="mono muted lsr-article-byline-meta">
              <span>{new Date(c.publishedAt).toLocaleDateString("pt-BR", {day:"2-digit", month:"long", year:"numeric"})}</span>
              <span>·</span>
              <span>{c.readTime} min de leitura</span>
              {c.youtubeId && <><span>·</span><span>vídeo {c.duration}</span></>}
            </div>
          </div>
        </div>

        <div className="container-wide lsr-article-body-wrap">
          <aside className="lsr-toc">
            <div className="label">Nesta página</div>
            <ul>
              {toc.map(item => (
                <li key={item.id} className={"lsr-toc-item lsr-toc-" + item.level + (activeId === item.id ? " is-active" : "")}>
                  <a href={"#" + item.id} onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({behavior: "smooth", block: "start"}); }}>{item.text}</a>
                </li>
              ))}
            </ul>
            <div className="label" style={{marginTop: 24}}>Compartilhar</div>
            <ul className="lsr-side-links" style={{fontSize: "var(--fs-13)"}}>
              <li><a href="#">Copiar link</a></li>
              <li><a href="#"><window.I.linkedin /> LinkedIn</a></li>
              <li><a href="#">X / Twitter</a></li>
            </ul>
          </aside>

          <div className="lsr-article-body" id="article-body">
            {c.youtubeId && c.type === "ARTICLE_WITH_VIDEO" && (
              <div className="lsr-video-embed media-placeholder">
                <window.I.play />
                <div className="mono">embed · youtube · {c.duration}</div>
              </div>
            )}
            <div className="prose">
              {blocks.map((b, i) => renderMd(b, i))}
            </div>
            <div className="lsr-article-foot">
              <div className="lsr-content-card-tags">
                {c.tags.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
              <div className="lsr-article-foot-actions">
                <button className="btn btn-secondary btn-sm">Achou útil?</button>
                <button className="btn btn-ghost btn-sm">Reportar erro</button>
              </div>
            </div>
          </div>
        </div>

        {series && (
          <section className="container-wide" style={{marginTop: 64}}>
            <hr className="hairline" />
            <div className="lsr-series-strip">
              <div>
                <div className="eyebrow">Esta peça faz parte de</div>
                <h3>{series.name}</h3>
                <p className="muted" style={{maxWidth: 540}}>{series.description}</p>
              </div>
              <div className="lsr-series-strip-list">
                {series.contentSlugs.map((s, idx) => {
                  const item = M.CONTENTS.find(x => x.slug === s);
                  if (!item) return null;
                  const cur = item.slug === c.slug;
                  return (
                    <Link key={s} to={"/conteudos/" + s} className={"lsr-series-strip-item" + (cur ? " is-current" : "")}>
                      <span className="mono muted">{String(idx+1).padStart(2,"0")}</span>
                      <span>{item.title}</span>
                      {cur && <span className="mono muted">· lendo</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="container-wide" style={{marginTop: 64, paddingBottom: 80}}>
            <hr className="hairline" />
            <window.SectionHeader eyebrow="Continuar lendo" title="Conteúdos relacionados" />
            <div className="lsr-content-grid">
              {related.map(r => <window.ContentCard key={r.slug} c={r} />)}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}

// Tiny markdown-ish parser for the article body (paragraphs, headings, lists, code, blockquote)
function parseMd(src) {
  const lines = src.split("\n");
  const out = [];
  let i = 0;
  const slug = (s) => s.toLowerCase().replace(/[^\w\sáéíóúâêôãõç-]/gi, "").replace(/\s+/g,"-").replace(/^-|-$/g,"");
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) { buf.push(lines[i]); i++; }
      i++;
      out.push({ type: "code", lang, text: buf.join("\n") });
      continue;
    }
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      out.push({ type: "h2", id: slug(text), text });
      i++; continue;
    }
    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      out.push({ type: "h3", id: slug(text), text });
      i++; continue;
    }
    if (line.startsWith("> ")) {
      const buf = [line.slice(2)]; i++;
      while (i < lines.length && lines[i].startsWith("> ")) { buf.push(lines[i].slice(2)); i++; }
      out.push({ type: "quote", text: buf.join(" ") });
      continue;
    }
    if (/^[-*]\s/.test(line)) {
      const buf = []; 
      while (i < lines.length && /^[-*]\s/.test(lines[i])) { buf.push(lines[i].replace(/^[-*]\s/,"")); i++; }
      out.push({ type: "ul", items: buf });
      continue;
    }
    if (line.trim() === "") { i++; continue; }
    const buf = [line]; i++;
    while (i < lines.length && lines[i].trim() !== "" && !/^(##|###|```|>|[-*]\s)/.test(lines[i])) { buf.push(lines[i]); i++; }
    out.push({ type: "p", text: buf.join(" ") });
  }
  return out;
}

function renderInline(text, key) {
  // bold **x**, italic *x*, inline code `x`
  const parts = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0; let m; let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) parts.push(<strong key={key+"-b-"+(i++)}>{t.slice(2,-2)}</strong>);
    else if (t.startsWith("`")) parts.push(<code key={key+"-c-"+(i++)}>{t.slice(1,-1)}</code>);
    else if (t.startsWith("*")) parts.push(<em key={key+"-i-"+(i++)}>{t.slice(1,-1)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function highlightCode(code, lang) {
  // Very small token highlighter for "java", "yaml"
  let html = code;
  if (lang === "java") {
    const kws = ["public","private","class","interface","void","return","new","Override","Component","Profile","Optional","String","throws"];
    html = html.replace(/\/\/[^\n]*/g, m => `__C__${m}__/C__`);
    html = html.replace(/"([^"]*)"/g, (_, s) => `__S__"${s}"__/S__`);
    html = html.replace(/@(\w+)/g, (_, w) => `__F__@${w}__/F__`);
    kws.forEach(k => { html = html.replace(new RegExp("\\b" + k + "\\b","g"), `__K__${k}__/K__`); });
    html = html.replace(/\b(\d+)\b/g, `__N__$1__/N__`);
  } else if (lang === "yaml") {
    html = html.replace(/(^|\n)(\s*)([\w-]+):/g, (_, p, s, k) => `${p}${s}__K__${k}__/K__:`);
    html = html.replace(/"([^"]*)"/g, (_, s) => `__S__"${s}"__/S__`);
  }
  html = html.replace(/__K__/g,'<span class="tok-k">').replace(/__\/K__/g,"</span>");
  html = html.replace(/__S__/g,'<span class="tok-s">').replace(/__\/S__/g,"</span>");
  html = html.replace(/__N__/g,'<span class="tok-n">').replace(/__\/N__/g,"</span>");
  html = html.replace(/__C__/g,'<span class="tok-c">').replace(/__\/C__/g,"</span>");
  html = html.replace(/__F__/g,'<span class="tok-f">').replace(/__\/F__/g,"</span>");
  return html;
}

function renderMd(b, i) {
  if (b.type === "h2") return <h2 key={i} id={b.id}>{b.text}</h2>;
  if (b.type === "h3") return <h3 key={i} id={b.id}>{b.text}</h3>;
  if (b.type === "p") return <p key={i}>{renderInline(b.text, "p"+i)}</p>;
  if (b.type === "quote") return <blockquote key={i}>{renderInline(b.text, "q"+i)}</blockquote>;
  if (b.type === "ul") return <ul key={i}>{b.items.map((it, j) => <li key={j}>{renderInline(it, "l"+i+"-"+j)}</li>)}</ul>;
  if (b.type === "code") {
    return (
      <div key={i} className="lsr-code-block">
        <div className="lsr-code-head mono">
          <span>{b.lang || "text"}</span>
          <button className="lsr-code-copy">copiar</button>
        </div>
        <pre><code dangerouslySetInnerHTML={{__html: highlightCode(b.text, b.lang)}} /></pre>
      </div>
    );
  }
  return null;
}

// ===== Vídeo detalhe =====
function VideoPage({ slug }) {
  const M = window.MOCK;
  const Link = window.Link;
  const c = M.CONTENTS.find(x => x.slug === slug);
  if (!c) return <window.NotFound route={"/conteudos/videos/" + slug} />;
  const related = M.CONTENTS.filter(x => x.slug !== c.slug && x.tags.some(t => c.tags.includes(t))).slice(0, 4);

  return (
    <main className="lsr-video-page">
      <div className="container-wide" style={{paddingTop: 32}}>
        <div className="lsr-breadcrumb mono">
          <Link to="/conteudos" className="muted">conteúdos</Link>
          <span className="muted">/</span>
          <Link to="/conteudos/videos" className="muted">vídeos</Link>
          <span className="muted">/</span>
          <span>{c.slug}</span>
        </div>
      </div>
      <section className="container-wide lsr-video-detail-grid">
        <div>
          <div className="lsr-video-frame media-placeholder">
            <window.I.play style={{width: 32, height: 32}} />
            <div className="mono" style={{marginTop: 12}}>iframe · youtube · {c.duration}</div>
          </div>
          <div style={{marginTop: 24}}>
            <window.ContentTypePill type={c.type} typeLabel={c.typeLabel} />
            <h1 className="lsr-video-title" style={{marginTop: 12}}>{c.title}</h1>
            <p className="lsr-video-summary muted">{c.summary}</p>
            <div className="lsr-content-card-tags" style={{marginTop: 16}}>
              {c.tags.map(t => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>

          <div className="lsr-video-tabs">
            <button className="lsr-video-tab is-active">Descrição</button>
            <button className="lsr-video-tab">Capítulos</button>
            <button className="lsr-video-tab">Transcrição</button>
            <button className="lsr-video-tab">Recursos</button>
          </div>

          <div className="prose lsr-video-prose">
            <p>Walkthrough completo da arquitetura usada neste site, com foco nas decisões: separação de domínios, fluxo de dados, cache de borda e deploy. Pensado para quem está começando com Next.js + Spring Boot e quer um exemplo concreto.</p>
            <h3>Capítulos</h3>
            <ol>
              <li><span className="mono">00:00</span> — Introdução e objetivos</li>
              <li><span className="mono">02:14</span> — Topologia de domínios</li>
              <li><span className="mono">07:03</span> — Frontend Next.js + ISR</li>
              <li><span className="mono">12:48</span> — Backend Spring Boot e contrato OpenAPI</li>
              <li><span className="mono">17:30</span> — Storage com Cloudflare R2</li>
              <li><span className="mono">22:01</span> — Considerações de segurança e CSRF</li>
            </ol>
            <h3>Recursos mencionados</h3>
            <ul>
              <li><a href="#">Repositório no GitHub</a> com toda a stack.</li>
              <li><a href="#">ADR-012</a> — topologia de domínios e autenticação.</li>
              <li><a href="#">Postman collection</a> com exemplos de chamadas à API.</li>
            </ul>
          </div>
        </div>

        <aside className="lsr-video-side">
          <div className="lsr-side-card">
            <div className="label">Detalhes</div>
            <ul className="lsr-mini-list">
              <li><span className="mono muted">duração</span><span>{c.duration}</span></li>
              <li><span className="mono muted">publicado</span><span>{new Date(c.publishedAt).toLocaleDateString("pt-BR")}</span></li>
              <li><span className="mono muted">canal</span><span>@leonardosr</span></li>
              <li><span className="mono muted">views</span><span>2.4k</span></li>
            </ul>
            <a href="#" className="btn btn-secondary btn-sm" style={{width:"100%", marginTop: 14}}>
              <window.I.youtube /> Assistir no YouTube <window.I.ext />
            </a>
          </div>
          <div className="lsr-side-card">
            <div className="label">Próximos vídeos</div>
            <div className="lsr-side-list">
              {related.filter(r => r.type === "VIDEO" || r.type === "ARTICLE_WITH_VIDEO").slice(0,3).map(r => (
                <Link key={r.slug} to={"/conteudos/" + r.slug} className="lsr-side-list-item">
                  <div className="lsr-side-list-thumb media-placeholder">
                    <window.I.play />
                  </div>
                  <div>
                    <div className="lsr-side-list-title">{r.title}</div>
                    <div className="mono muted" style={{fontSize: "var(--fs-12)"}}>{r.duration}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-wide" style={{marginTop: 64, paddingBottom: 80}}>
          <hr className="hairline" />
          <window.SectionHeader eyebrow="Continuar" title="Conteúdos relacionados" />
          <div className="lsr-content-grid">
            {related.slice(0,3).map(r => <window.ContentCard key={r.slug} c={r} />)}
          </div>
        </section>
      )}
    </main>
  );
}

// ===== Série detalhe =====
function SerieDetailPage({ slug }) {
  const M = window.MOCK;
  const Link = window.Link;
  const s = M.SERIES.find(x => x.slug === slug);
  if (!s) return <window.NotFound route={"/conteudos/series/" + slug} />;
  const items = s.contentSlugs.map(sl => M.CONTENTS.find(c => c.slug === sl)).filter(Boolean);
  const pct = Math.round(s.contentSlugs.length / s.plannedTotal * 100);
  return (
    <main>
      <window.PageHeader
        eyebrow={"Série · /conteudos/series/" + s.slug}
        title={s.name}
        lede={s.description}
        meta={
          <div className="lsr-series-detail-meta">
            <div className="mono">{s.contentSlugs.length} de {s.plannedTotal} publicados</div>
            <div className="lsr-series-progress" style={{minWidth: 200}}>
              <div className="lsr-series-progress-bar"><div style={{width: pct + "%"}}></div></div>
              <span className="mono muted">{pct}%</span>
            </div>
          </div>
        }
      />
      <section className="container">
        <ol className="lsr-series-list">
          {items.map((c, idx) => (
            <li key={c.slug}>
              <Link to={"/conteudos/" + c.slug} className="lsr-series-list-item">
                <div className="lsr-series-list-num mono">{String(idx+1).padStart(2,"0")}</div>
                <div className="lsr-series-list-body">
                  <window.ContentTypePill type={c.type} typeLabel={c.typeLabel} />
                  <h3>{c.title}</h3>
                  <p className="muted">{c.summary}</p>
                </div>
                <div className="mono muted lsr-series-list-meta">
                  <div>{new Date(c.publishedAt).toLocaleDateString("pt-BR")}</div>
                  {c.readTime && <div>{c.readTime} min</div>}
                  {c.duration && <div>{c.duration}</div>}
                </div>
              </Link>
            </li>
          ))}
          {Array.from({length: s.plannedTotal - items.length}).map((_, i) => (
            <li key={"p"+i}>
              <div className="lsr-series-list-item is-planned">
                <div className="lsr-series-list-num mono">{String(items.length + i + 1).padStart(2,"0")}</div>
                <div className="lsr-series-list-body">
                  <span className="chip">planejado</span>
                  <h3 className="muted">A próxima peça da série</h3>
                  <p className="muted">Em produção. Inscreva-se no RSS para ser notificado.</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

// ===== Laboratório =====
function LaboratorioPage() {
  const M = window.MOCK;
  const Link = window.Link;
  const labs = M.CONTENTS.filter(c => c.type === "LAB");
  const [diff, setDiff] = useC("ALL");
  const filtered = diff === "ALL" ? labs : labs.filter(l => l.labFields?.difficulty_level === diff);
  return (
    <main>
      <window.PageHeader
        eyebrow="Laboratório · /laboratorio"
        title="Experimentos técnicos"
        lede="Demonstrações práticas, didáticas ou de pesquisa. Cada lab traz código-fonte e ambiente público."
        meta={<div className="mono muted">{labs.length} experimentos · {labs.filter(l=>l.labFields?.is_didactic).length} didáticos</div>}
      />
      <section className="container">
        <div className="lsr-filter-bar">
          <button onClick={() => setDiff("ALL")} className={"lsr-filter-chip mono" + (diff==="ALL"?" is-active":"")}>Todos</button>
          <button onClick={() => setDiff("BEGINNER")} className={"lsr-filter-chip mono" + (diff==="BEGINNER"?" is-active":"")}>Iniciante</button>
          <button onClick={() => setDiff("INTERMEDIATE")} className={"lsr-filter-chip mono" + (diff==="INTERMEDIATE"?" is-active":"")}>Intermediário</button>
          <button onClick={() => setDiff("ADVANCED")} className={"lsr-filter-chip mono" + (diff==="ADVANCED"?" is-active":"")}>Avançado</button>
        </div>
        <div className="lsr-lab-grid">
          {filtered.map(c => (
            <Link key={c.slug} to={"/laboratorio/" + c.slug} className="lsr-lab-card">
              <div className="lsr-lab-card-head">
                <span className="chip chip-accent chip-dot mono">{c.labFields.is_didactic ? "didático" : "produção"}</span>
                <span className="chip mono">{({BEGINNER:"iniciante", INTERMEDIATE:"intermediário", ADVANCED:"avançado"})[c.labFields.difficulty_level]}</span>
              </div>
              <h3>{c.title}</h3>
              <p className="muted">{c.summary}</p>
              <div className="lsr-content-card-tags">
                {c.tags.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
              <div className="lsr-lab-card-foot mono">
                <span className="muted">→ {c.labFields.demonstration_url}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

// ===== Lab detalhe =====
function LabDetailPage({ slug }) {
  const M = window.MOCK;
  const c = M.CONTENTS.find(x => x.slug === slug);
  if (!c || c.type !== "LAB") return <window.NotFound route={"/laboratorio/" + slug} />;
  const Link = window.Link;
  return (
    <main>
      <div className="container-wide" style={{paddingTop: 32}}>
        <div className="lsr-breadcrumb mono">
          <Link to="/laboratorio" className="muted">laboratório</Link>
          <span className="muted">/</span>
          <span>{c.slug}</span>
        </div>
      </div>
      <section className="container lsr-lab-hero">
        <div className="eyebrow">Lab · {c.labFields.is_didactic ? "didático" : "produção"}</div>
        <h1>{c.title}</h1>
        <p className="lsr-page-lede">{c.summary}</p>
        <div className="lsr-lab-meta">
          <div><div className="label">Dificuldade</div><div>{({BEGINNER:"Iniciante", INTERMEDIATE:"Intermediário", ADVANCED:"Avançado"})[c.labFields.difficulty_level]}</div></div>
          <div><div className="label">Tecnologias</div><div>{c.techs.join(" · ")}</div></div>
          <div><div className="label">Atualizado</div><div>{new Date(c.publishedAt).toLocaleDateString("pt-BR")}</div></div>
        </div>
        <div className="lsr-hero-actions" style={{marginTop: 28}}>
          <a className="btn btn-primary" href="#"><window.I.ext /> Abrir demonstração</a>
          <a className="btn btn-secondary" href="#"><window.I.github /> Código-fonte <window.I.ext /></a>
        </div>
      </section>
      <hr className="hairline" />
      <section className="container lsr-lab-demo">
        <div className="lsr-lab-frame media-placeholder">
          <span>iframe · {c.labFields.demonstration_url}</span>
        </div>
        <div className="prose lsr-prose-narrow">
          <h2>Sobre o experimento</h2>
          <p>Este laboratório explora <strong>{c.title.toLowerCase()}</strong>. O objetivo é demonstrar uma decisão técnica específica em ambiente isolado, sem o ruído de uma aplicação completa.</p>
          <h2>O que está dentro</h2>
          <ul>
            <li>Código-fonte aberto, com instruções de execução local.</li>
            <li>Ambiente público para experimentar sem instalar nada.</li>
            <li>Texto explicativo com decisões e trade-offs.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

// ===== Arquitetura detalhe =====
function ArquiteturaDetailPage({ slug }) {
  const M = window.MOCK;
  const c = M.CONTENTS.find(x => x.slug === slug);
  if (!c || c.type !== "ARCHITECTURE") return <window.NotFound route={"/arquiteturas/" + slug} />;
  const Link = window.Link;
  const a = c.archFields;
  return (
    <main>
      <div className="container-wide" style={{paddingTop: 32}}>
        <div className="lsr-breadcrumb mono">
          <Link to="/conteudos" className="muted">conteúdos</Link>
          <span className="muted">/</span>
          <span className="muted">arquiteturas</span>
          <span className="muted">/</span>
          <span>{c.slug}</span>
        </div>
      </div>
      <section className="container lsr-arch-hero">
        <div className="eyebrow">Arquitetura</div>
        <h1>{c.title}</h1>
        <p className="lsr-page-lede">{c.summary}</p>
      </section>
      <section className="container">
        <div className="lsr-arch-diagram">
          <div className="lsr-arch-diagram-head mono">
            <span>diagrama · {c.slug}.svg</span>
            <span className="muted">substituir por SVG real</span>
          </div>
          <div className="lsr-arch-blocks">
            {a.components.map((comp, i) => (
              <div key={i} className="lsr-arch-block">
                <div className="mono muted" style={{fontSize: "var(--fs-12)"}}>nó · {String(i+1).padStart(2,"0")}</div>
                <div className="lsr-arch-block-name">{comp}</div>
              </div>
            ))}
          </div>
          <div className="lsr-arch-flow mono">
            <span className="muted">fluxo →</span> {a.flow}
          </div>
        </div>
      </section>
      <section className="container lsr-arch-grid">
        <article className="lsr-arch-section">
          <h3 className="label">Vantagens</h3>
          <ul className="lsr-decision-list lsr-arch-list">
            {a.advantages.map((x, i) => <li key={i}><span className="mono" style={{color: "var(--success)"}}>+</span> {x}</li>)}
          </ul>
        </article>
        <article className="lsr-arch-section">
          <h3 className="label">Riscos</h3>
          <ul className="lsr-decision-list lsr-arch-list">
            {a.risks.map((x, i) => <li key={i}><span className="mono" style={{color: "var(--danger)"}}>!</span> {x}</li>)}
          </ul>
        </article>
        <article className="lsr-arch-section">
          <h3 className="label">Quando usar</h3>
          <p>{a.whenToUse}</p>
        </article>
      </section>
    </main>
  );
}

window.ConteudosPage = ConteudosPage;
window.ArtigoPage = ArtigoPage;
window.VideoPage = VideoPage;
window.SerieDetailPage = SerieDetailPage;
window.LaboratorioPage = LaboratorioPage;
window.LabDetailPage = LabDetailPage;
window.ArquiteturaDetailPage = ArquiteturaDetailPage;

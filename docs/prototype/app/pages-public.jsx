/* global React */
// pages-public.jsx — Home, Sobre, Experiência, Stack, Currículo, Contato, Privacidade, Termos

const { useState: usePub, useEffect: useEffPub, useMemo: useMemoPub } = React;

function HomePage() {
  const M = window.MOCK;
  const featured = M.PROJECTS.filter(p => p.featured).slice(0, 3);
  const recent = M.CONTENTS.slice(0, 4);
  const videos = M.CONTENTS.filter(c => c.type === "VIDEO" || c.type === "ARTICLE_WITH_VIDEO").slice(0, 2);
  const Link = window.Link;

  return (
    <main>
      {/* HERO */}
      <section className="lsr-hero grid-bg">
        <div className="container-wide">
          <div className="lsr-hero-grid">
            <div className="lsr-hero-text">
              <div className="eyebrow">{M.PROFILE.role} · {M.PROFILE.location}</div>
              <h1 className="lsr-hero-title">
                Soluções web modernas com<br />
                <span className="lsr-hero-accent">React</span>,{" "}
                <span className="lsr-hero-accent">Next.js</span> e{" "}
                <span className="lsr-hero-accent">Spring&nbsp;Boot</span>.
              </h1>
              <p className="lsr-hero-lede">
                Sou <strong>{M.PROFILE.name}</strong> — engenheiro de software com mais de 10 anos
                construindo portais corporativos, APIs REST e arquiteturas full-stack.
                Aqui você encontra projetos, artigos técnicos e estudos de caso.
              </p>
              <div className="lsr-hero-actions">
                <Link to="/projetos" className="btn btn-primary">
                  Ver projetos <window.I.arrow />
                </Link>
                <Link to="/conteudos" className="btn btn-secondary">
                  Conteúdos técnicos
                </Link>
                <Link to="/contato" className="btn btn-ghost">
                  Conversar →
                </Link>
              </div>
              <div className="lsr-hero-stats">
                <window.Stat value="10+" label="Anos de carreira" />
                <window.Stat value="12" label="Sistemas em produção" />
                <window.Stat value="40+" label="Conteúdos publicados" />
              </div>
            </div>
            <aside className="lsr-hero-card" aria-label="Identidade técnica">
              <div className="lsr-hero-card-head">
                <span className="mono muted">~/profile.json</span>
                <div className="lsr-hero-card-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <pre className="lsr-hero-code mono"><code>{`{
  `}<span className="tok-k">"nome"</span>{`: `}<span className="tok-s">"Leonardo Silva Ribeiro"</span>{`,
  `}<span className="tok-k">"papel"</span>{`: `}<span className="tok-s">"Engenheiro de Software"</span>{`,
  `}<span className="tok-k">"local"</span>{`: `}<span className="tok-s">"Brasília, DF"</span>{`,
  `}<span className="tok-k">"stack"</span>{`: [
    `}<span className="tok-s">"Next.js"</span>{`,
    `}<span className="tok-s">"React"</span>{`,
    `}<span className="tok-s">"Spring Boot"</span>{`,
    `}<span className="tok-s">"PostgreSQL"</span>{`
  ],
  `}<span className="tok-k">"foco"</span>{`: [
    `}<span className="tok-s">"portais corporativos"</span>{`,
    `}<span className="tok-s">"APIs REST"</span>{`,
    `}<span className="tok-s">"arquitetura"</span>{`
  ],
  `}<span className="tok-k">"disponivel"</span>{`: `}<span className="tok-n">true</span>{`
}`}</code></pre>
              <div className="lsr-hero-card-foot mono">
                <span className="lsr-pulse"></span>
                <span>uptime · 10y 4mo · 99.97%</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* PROJETOS DESTAQUE */}
      <section className="lsr-section">
        <div className="container-wide">
          <window.SectionHeader
            eyebrow="01 · Projetos em destaque"
            title="Construções recentes"
            description="Sistemas em produção e demonstrações públicas."
            action={<Link to="/projetos" className="link-mono">todos os projetos <span className="arrow">→</span></Link>}
          />
          <div className="lsr-project-grid">
            {featured.map(p => <window.ProjectCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* CONTEÚDOS RECENTES */}
      <section className="lsr-section lsr-section-tinted">
        <div className="container-wide">
          <window.SectionHeader
            eyebrow="02 · Publicados recentemente"
            title="Artigos, vídeos e estudos de caso"
            description="Anotações práticas sobre arquitetura, segurança e produtividade."
            action={<Link to="/conteudos" className="link-mono">ver todos <span className="arrow">→</span></Link>}
          />
          <div className="lsr-content-grid">
            {recent.map(c => <window.ContentCard key={c.slug} c={c} />)}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* VÍDEOS */}
      <section className="lsr-section">
        <div className="container-wide">
          <window.SectionHeader
            eyebrow="03 · YouTube"
            title="Vídeos recentes"
            action={<Link to="/conteudos/videos" className="link-mono">canal <span className="arrow">→</span></Link>}
          />
          <div className="lsr-video-grid">
            {videos.map(c => (
              <Link to={"/conteudos/" + c.slug} key={c.slug} className="lsr-video-tile">
                <div className="lsr-video-thumb media-placeholder" aria-hidden="true">
                  <span>thumb {c.slug}.jpg</span>
                  <div className="lsr-video-play"><window.I.play /></div>
                  <div className="lsr-video-duration mono">{c.duration}</div>
                </div>
                <div className="lsr-video-meta">
                  <h3>{c.title}</h3>
                  <p className="muted">{c.summary}</p>
                  <div className="mono muted lsr-video-bar">
                    {c.tags.slice(0, 3).map(t => <span key={t}>#{t.toLowerCase().replace(/\s/g, "-")}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* EXPERIÊNCIA TEASER */}
      <section className="lsr-section">
        <div className="container-wide">
          <window.SectionHeader
            eyebrow="04 · Trajetória"
            title="Experiência profissional"
            action={<Link to="/experiencia" className="link-mono">linha do tempo completa <span className="arrow">→</span></Link>}
          />
          <div className="lsr-exp-teaser">
            {M.EXPERIENCES.slice(0, 2).map((e, i) => (
              <article className="lsr-exp-card" key={i}>
                <div className="mono muted">{e.period}</div>
                <h3>{e.role}</h3>
                <div className="muted" style={{fontSize: "var(--fs-14)"}}>{e.org}</div>
                <p className="muted" style={{marginTop: 12}}>{e.summary}</p>
                <div className="lsr-content-card-tags" style={{marginTop: 16}}>
                  {e.techs.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* CTA */}
      <section className="lsr-cta-section">
        <div className="container-wide">
          <div className="lsr-cta-card">
            <div>
              <div className="eyebrow">Próximo passo</div>
              <h2 className="serif lsr-cta-title">Vamos conversar sobre o seu próximo projeto.</h2>
              <p className="muted" style={{maxWidth: 540, marginTop: 12}}>
                Aberto a oportunidades selecionadas, parcerias técnicas e mentoria.
                Resposta em até 48h em dias úteis.
              </p>
            </div>
            <div className="lsr-cta-actions">
              <Link to="/contato" className="btn btn-primary">
                Enviar mensagem <window.I.arrow />
              </Link>
              <Link to="/curriculo" className="btn btn-secondary">
                <window.I.doc /> Currículo PDF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ===== Sobre =====
function SobrePage() {
  const M = window.MOCK;
  const Link = window.Link;
  return (
    <main>
      <window.PageHeader
        eyebrow="Sobre · /sobre"
        title={<>Engenheiro de software<br/>com foco em <span className="serif" style={{fontStyle:"italic"}}>portais</span>, <span className="serif" style={{fontStyle:"italic"}}>APIs</span> e <span className="serif" style={{fontStyle:"italic"}}>arquitetura</span>.</>}
        lede={M.PROFILE.tagline}
      />
      <section className="container-prose lsr-prose-page">
        <div className="prose">
          <p>Atuo desde 2014 com desenvolvimento web, com passagens por consultoria, empresas de TI no setor público e, atualmente, em uma coordenação de desenvolvimento de um órgão federal. A maior parte do meu tempo é dedicada a construir sistemas que precisam funcionar — todos os dias, para milhares de pessoas, sem alarde.</p>
          <h2>Como eu trabalho</h2>
          <p>Prefiro decisões registradas a decisões implícitas. Por isso, em projetos que conduzo, ADRs aparecem desde o começo. Também acredito que <em>boilerplate é melhor do que abstração prematura</em>: começo simples, evoluo conforme a dor real aparece.</p>
          <p>Em frontend, busco páginas leves, semânticas e com SEO desde a fundação. Em backend, prefiro JPA bem desenhado a queries soltas; OAuth2 a JWT artesanal; logs estruturados a stack traces dispersos.</p>
          <h2>Áreas de interesse</h2>
          <ul>
            <li><strong>Portais corporativos</strong> com modernização incremental (Strangler).</li>
            <li><strong>APIs REST</strong> documentadas em OpenAPI, com contratos versionados.</li>
            <li><strong>Segurança</strong> com OAuth2, OIDC e Keycloak federando AD institucional.</li>
            <li><strong>Performance e SEO</strong> em Next.js — SSG, ISR, Core Web Vitals, structured data.</li>
            <li><strong>Acessibilidade</strong> aderente ao e-MAG e WCAG 2.1.</li>
          </ul>
          <blockquote>
            "Boa arquitetura não é a que parece elegante no diagrama — é a que sobrevive ao primeiro incidente em produção."
          </blockquote>
          <h2>Fora do trabalho</h2>
          <p>Quando não estou escrevendo código ou texto técnico, leio sobre história, jogo xadrez sem talento e ando de bicicleta pelas ciclovias de Brasília.</p>
        </div>
        <aside className="lsr-sobre-side">
          <div className="lsr-side-card">
            <div className="label">Resumo rápido</div>
            <ul className="lsr-mini-list">
              <li><span className="mono muted">papel</span><span>{M.PROFILE.role}</span></li>
              <li><span className="mono muted">local</span><span>Brasília, DF</span></li>
              <li><span className="mono muted">disponível</span><span style={{color:"var(--success)"}}>sim · oportunidades selecionadas</span></li>
              <li><span className="mono muted">stack</span><span>Next.js · Spring Boot · Postgres</span></li>
              <li><span className="mono muted">foco</span><span>portais, APIs, arquitetura</span></li>
            </ul>
          </div>
          <div className="lsr-side-card">
            <div className="label">Links profissionais</div>
            <ul className="lsr-side-links">
              <li><a href="#"><window.I.github /> github.com/leonardosr <window.I.ext /></a></li>
              <li><a href="#"><window.I.linkedin /> linkedin/in/leonardosr <window.I.ext /></a></li>
              <li><a href="#"><window.I.youtube /> youtube/@leonardosr <window.I.ext /></a></li>
            </ul>
          </div>
          <div className="lsr-side-card lsr-side-cta">
            <h4>Currículo profissional</h4>
            <p className="muted" style={{fontSize: "var(--fs-14)", marginTop: 8}}>Versão em PDF, atualizada mensalmente.</p>
            <Link to="/curriculo" className="btn btn-secondary btn-sm" style={{marginTop: 14}}>
              <window.I.doc /> Ver currículo
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}

// ===== Experiência =====
function ExperienciaPage() {
  const M = window.MOCK;
  return (
    <main>
      <window.PageHeader
        eyebrow="Experiência · /experiencia"
        title="Trajetória profissional"
        lede="Linha do tempo das passagens, papéis, projetos e tecnologias."
      />
      <section className="container">
        <div className="lsr-timeline">
          {M.EXPERIENCES.map((e, i) => (
            <article key={i} className="lsr-tl-row">
              <div className="lsr-tl-period">
                <div className="mono">{e.period}</div>
                <div className="mono muted" style={{fontSize: "var(--fs-12)"}}>{e.location}</div>
              </div>
              <div className="lsr-tl-track" aria-hidden="true">
                <div className="lsr-tl-dot"></div>
                <div className="lsr-tl-line"></div>
              </div>
              <div className="lsr-tl-body">
                <header>
                  <h3>{e.role}</h3>
                  <div className="muted" style={{fontSize: "var(--fs-15)"}}>{e.org}</div>
                </header>
                <p className="muted" style={{marginTop: 14}}>{e.summary}</p>
                <ul className="lsr-tl-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="lsr-content-card-tags">
                  {e.techs.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            </article>
          ))}
          <div className="lsr-tl-row lsr-tl-end">
            <div className="lsr-tl-period">
              <div className="mono muted">2014</div>
            </div>
            <div className="lsr-tl-track">
              <div className="lsr-tl-dot is-empty"></div>
            </div>
            <div className="lsr-tl-body lsr-tl-start">
              <span className="mono muted">início da carreira</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ===== Stack =====
function StackPage() {
  const M = window.MOCK;
  const [filter, setFilter] = usePub("Tudo");
  const cats = ["Tudo", ...M.TECH_CATEGORIES];
  const techs = filter === "Tudo" ? M.TECHS : M.TECHS.filter(t => t.cat === filter);
  const grouped = useMemoPub(() => {
    const g = {};
    techs.forEach(t => { (g[t.cat] = g[t.cat] || []).push(t); });
    return g;
  }, [techs]);

  return (
    <main>
      <window.PageHeader
        eyebrow="Stack · /stack"
        title="Stack técnica"
        lede="Tecnologias que uso ativamente em projetos profissionais e pessoais. Filtre por categoria."
      />
      <section className="container">
        <div className="lsr-filter-bar">
          {cats.map(c => (
            <button
              key={c}
              className={"lsr-filter-chip mono" + (filter === c ? " is-active" : "")}
              onClick={() => setFilter(c)}
            >{c} <span className="muted">{c === "Tudo" ? M.TECHS.length : M.TECHS.filter(t => t.cat === c).length}</span></button>
          ))}
        </div>
        <div className="lsr-stack-groups">
          {Object.keys(grouped).map(cat => (
            <section key={cat} className="lsr-stack-group">
              <header>
                <h2>{cat}</h2>
                <span className="mono muted">{grouped[cat].length}</span>
              </header>
              <div className="lsr-stack-grid">
                {grouped[cat].map(t => (
                  <div key={t.name} className="lsr-tech-cell">
                    <div className="lsr-tech-name">{t.name}</div>
                    <div className="mono muted lsr-tech-level">
                      <span className={"lsr-tech-bar lvl-" + t.level.toLowerCase()}></span>
                      {t.level}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

// ===== Currículo =====
function CurriculoPage() {
  const M = window.MOCK;
  return (
    <main>
      <window.PageHeader
        eyebrow="Currículo · /curriculo"
        title="Currículo profissional"
        lede="Versão resumida, em PDF, atualizada mensalmente. Documento canônico para recrutamento."
      />
      <section className="container">
        <div className="lsr-cv-layout">
          <div className="lsr-cv-paper">
            <div className="lsr-cv-paper-head">
              <h2 style={{fontSize: "var(--fs-24)"}}>{M.PROFILE.name}</h2>
              <div className="muted" style={{marginTop: 6}}>{M.PROFILE.role} · {M.PROFILE.location}</div>
              <div className="mono muted" style={{marginTop: 6, fontSize: "var(--fs-13)"}}>{M.PROFILE.email} · {M.PROFILE.github}</div>
            </div>
            <div className="lsr-cv-section">
              <h3 className="label">Resumo</h3>
              <p>{M.PROFILE.tagline}</p>
            </div>
            <div className="lsr-cv-section">
              <h3 className="label">Stack principal</h3>
              <p className="mono" style={{fontSize: "var(--fs-13)"}}>Next.js · React · TypeScript · Java · Spring Boot · Spring Security · PostgreSQL · OAuth2 · Keycloak · Docker · Cloudflare</p>
            </div>
            <div className="lsr-cv-section">
              <h3 className="label">Experiência</h3>
              {M.EXPERIENCES.map((e, i) => (
                <div key={i} className="lsr-cv-exp">
                  <div className="lsr-cv-exp-head">
                    <strong>{e.role}</strong>
                    <span className="mono muted">{e.period}</span>
                  </div>
                  <div className="muted" style={{fontSize: "var(--fs-14)"}}>{e.org}</div>
                  <p style={{marginTop: 6, fontSize: "var(--fs-14)"}}>{e.summary}</p>
                </div>
              ))}
            </div>
            <div className="lsr-cv-section">
              <h3 className="label">Formação</h3>
              <p><strong>Bacharelado em Sistemas de Informação</strong> · Universidade de Brasília · 2010–2013</p>
            </div>
          </div>
          <aside className="lsr-cv-side">
            <div className="lsr-side-card lsr-side-cta">
              <h4>Download</h4>
              <p className="muted" style={{fontSize: "var(--fs-14)", marginTop: 8}}>PDF · 184 KB · v2026.05</p>
              <button className="btn btn-primary" style={{width: "100%", marginTop: 14}}>
                <window.I.doc /> Baixar PDF
              </button>
              <button className="btn btn-secondary" style={{width: "100%", marginTop: 8}}>
                Versão em inglês
              </button>
            </div>
            <div className="lsr-side-card">
              <div className="label">Atualizado em</div>
              <div className="mono">2026-05-01</div>
              <div className="label" style={{marginTop: 16}}>Versão</div>
              <div className="mono">v2026.05.r1</div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

// ===== Contato =====
function ContatoPage() {
  const M = window.MOCK;
  const [form, setForm] = usePub({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = usePub({});
  const [sent, setSent] = usePub(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Informe seu nome";
    if (!form.email.trim()) errs.email = "E-mail obrigatório";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "E-mail inválido";
    if (!form.subject.trim()) errs.subject = "Informe o assunto";
    if (!form.message.trim() || form.message.length < 20) errs.message = "Mínimo de 20 caracteres";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
    }
  };
  return (
    <main>
      <window.PageHeader
        eyebrow="Contato · /contato"
        title="Vamos conversar"
        lede="Conversas sobre projetos, parcerias técnicas, palestras e mentoria. Resposta em até 48h em dias úteis."
      />
      <section className="container">
        <div className="lsr-contact-layout">
          <div className="lsr-contact-form-card">
            {!sent ? (
              <form onSubmit={onSubmit} noValidate>
                <div className="lsr-form-row">
                  <div className="lsr-field">
                    <label className="label" htmlFor="name">Nome <span style={{color: "var(--accent)"}}>*</span></label>
                    <input id="name" className="input" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Seu nome completo" />
                    {errors.name && <div className="lsr-field-error mono">{errors.name}</div>}
                  </div>
                  <div className="lsr-field">
                    <label className="label" htmlFor="email">E-mail <span style={{color: "var(--accent)"}}>*</span></label>
                    <input id="email" type="email" className="input" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="voce@empresa.com" />
                    {errors.email && <div className="lsr-field-error mono">{errors.email}</div>}
                  </div>
                </div>
                <div className="lsr-field">
                  <label className="label" htmlFor="subject">Assunto <span style={{color: "var(--accent)"}}>*</span></label>
                  <input id="subject" className="input" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} placeholder="Em poucas palavras, sobre o que é?" />
                  {errors.subject && <div className="lsr-field-error mono">{errors.subject}</div>}
                </div>
                <div className="lsr-field">
                  <label className="label" htmlFor="message">Mensagem <span style={{color: "var(--accent)"}}>*</span></label>
                  <textarea id="message" className="textarea" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder="Conte com algum detalhe sobre o projeto ou a oportunidade..." />
                  <div className="lsr-field-foot mono muted">
                    <span>{form.message.length} caracteres</span>
                    <span>min. 20</span>
                  </div>
                  {errors.message && <div className="lsr-field-error mono">{errors.message}</div>}
                </div>
                <div className="lsr-form-actions">
                  <button type="submit" className="btn btn-primary">Enviar mensagem <window.I.arrow /></button>
                  <span className="mono muted" style={{fontSize: "var(--fs-12)"}}>protegido por rate-limit · sem cookies analíticos</span>
                </div>
              </form>
            ) : (
              <div className="lsr-form-success">
                <div className="lsr-success-mark"><window.I.check /></div>
                <h3>Mensagem enviada</h3>
                <p className="muted">Recebi sua mensagem e respondo em até 48h em dias úteis. Obrigado pelo contato.</p>
                <button className="btn btn-secondary" onClick={() => { setSent(false); setForm({name:"", email:"", subject:"", message:""}); }}>Enviar outra</button>
              </div>
            )}
          </div>
          <aside className="lsr-contact-side">
            <div className="lsr-side-card">
              <div className="label">Canais diretos</div>
              <ul className="lsr-side-links">
                <li><a href={"mailto:" + M.PROFILE.email}><window.I.dot style={{color: "var(--success)"}}/> {M.PROFILE.email}</a></li>
                <li><a href="#"><window.I.linkedin /> LinkedIn <window.I.ext /></a></li>
                <li><a href="#"><window.I.github /> GitHub <window.I.ext /></a></li>
              </ul>
            </div>
            <div className="lsr-side-card">
              <div className="label">Tempo de resposta</div>
              <div className="lsr-response-stat">
                <div className="lsr-response-num">~ 14h</div>
                <div className="mono muted">média móvel · 30 dias</div>
              </div>
            </div>
            <div className="lsr-side-card">
              <div className="label">LGPD</div>
              <p className="muted" style={{fontSize: "var(--fs-13)"}}>
                Mensagens armazenadas por até 12 meses, com anonimização automática. Para exclusão antecipada, escreva para <span className="mono">{M.PROFILE.privacyEmail}</span>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

// ===== Privacidade / Termos =====
function PolicyPage({ kind }) {
  const M = window.MOCK;
  const isP = kind === "privacy";
  return (
    <main>
      <window.PageHeader
        eyebrow={(isP ? "Privacidade" : "Termos") + " · /" + (isP ? "privacidade" : "termos")}
        title={isP ? "Política de Privacidade" : "Termos de Uso"}
        lede={isP ? "Como tratamos dados pessoais coletados neste site, em conformidade com a LGPD." : "Condições gerais de uso do site leonardosr.com.br e seus conteúdos."}
        meta={<div className="mono muted">Última atualização · 2026-04-15 · v1.2</div>}
      />
      <section className="container-prose">
        <div className="prose">
          {isP ? (
            <>
              <h2>1. Dados coletados</h2>
              <p>Coletamos apenas dados necessários ao funcionamento do site: mensagens enviadas via formulário de contato (nome, e-mail, assunto, mensagem) e métricas de tráfego anônimas via Plausible Analytics, sem cookies e sem identificadores pessoais.</p>
              <h2>2. Bases legais</h2>
              <p>Mensagens de contato têm base legal em <em>consentimento</em> (envio voluntário) e <em>legítimo interesse</em> (resposta profissional). Métricas de Plausible operam em base de <em>legítimo interesse</em> dado seu caráter agregado.</p>
              <h2>3. Retenção</h2>
              <p>Mensagens são retidas por 12 meses e <strong>automaticamente anonimizadas</strong> ao final desse período (job no backend). O conteúdo da mensagem permanece, mas dados pessoais são removidos.</p>
              <h2>4. Direitos do titular</h2>
              <p>Você pode solicitar acesso, correção, portabilidade ou exclusão de seus dados pelo e-mail <span className="mono">{M.PROFILE.privacyEmail}</span>. Respondo em até 15 dias corridos.</p>
              <h2>5. Cookies</h2>
              <p>O site não usa cookies de rastreamento. Pode usar um cookie de sessão restrito ao painel administrativo, com flag <span className="mono">HttpOnly; Secure; SameSite=Lax</span>.</p>
            </>
          ) : (
            <>
              <h2>1. Aceitação</h2>
              <p>Ao acessar e usar este site, você concorda com estes termos. Se não concordar, por favor não use o site.</p>
              <h2>2. Conteúdo técnico</h2>
              <p>Os conteúdos publicados refletem opiniões pessoais e experiências profissionais e não constituem aconselhamento formal. Use por sua conta e risco.</p>
              <h2>3. Direitos autorais</h2>
              <p>Os textos e diagramas publicados estão licenciados sob CC BY 4.0, salvo indicação em contrário. Trechos de código sob licença MIT, salvo indicação em contrário.</p>
              <h2>4. Marcas de terceiros</h2>
              <p>Marcas mencionadas (React, Next.js, Spring, Java, etc.) são propriedade de seus respectivos detentores e usadas apenas para referência técnica.</p>
              <h2>5. Limitação de responsabilidade</h2>
              <p>O site é fornecido "como está", sem garantias expressas ou implícitas. O autor não se responsabiliza por danos decorrentes do uso das informações aqui publicadas.</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

window.HomePage = HomePage;
window.SobrePage = SobrePage;
window.ExperienciaPage = ExperienciaPage;
window.StackPage = StackPage;
window.CurriculoPage = CurriculoPage;
window.ContatoPage = ContatoPage;
window.PolicyPage = PolicyPage;

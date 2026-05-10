/* global React, ReactDOM */
// app.jsx — Router and entry

const { useState: useApp, useEffect: useEffApp } = React;

function useRoute() {
  const [route, setRoute] = useApp(window.location.hash.replace(/^#/, "") || "/");
  useEffApp(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

window.navigate = (to) => {
  window.location.hash = to;
  window.scrollTo({ top: 0, behavior: "instant" });
};

window.Link = function Link({ to, children, className, style, onClick, ...rest }) {
  return (
    <a
      href={"#" + to}
      className={className}
      style={style}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        window.navigate(to);
        if (onClick) onClick(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
};

function NotFound({ route }) {
  return (
    <main>
      <div className="container" style={{padding: "120px 0", textAlign: "center"}}>
        <div className="eyebrow no-line" style={{justifyContent: "center"}}>404 · página não encontrada</div>
        <h1 style={{fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 16}}>
          Não há nada aqui.
        </h1>
        <p className="muted" style={{maxWidth: 480, margin: "16px auto 0", fontSize: 16, lineHeight: 1.6}}>
          A rota <span className="mono" style={{background: "var(--bg-subtle)", padding: "1px 6px", borderRadius: 4}}>{route}</span> não existe.
          Volte para o início ou use a busca (⌘K).
        </p>
        <div style={{marginTop: 32, display: "flex", gap: 12, justifyContent: "center"}}>
          <window.Link to="/" className="btn btn-primary">Voltar para o início</window.Link>
          <window.Link to="/conteudos" className="btn btn-secondary">Ver conteúdos</window.Link>
        </div>
      </div>
    </main>
  );
}
window.NotFound = NotFound;

function App() {
  const route = useRoute();
  // Theme bootstrap
  useEffApp(() => {
    const saved = localStorage.getItem("lsr-theme");
    if (saved === "light" || saved === "dark") {
      document.documentElement.dataset.theme = saved;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.dataset.theme = "light";
    } else {
      document.documentElement.dataset.theme = "dark";
    }
  }, []);

  const isAdmin = route.startsWith("/admin");
  const isLogin = route === "/login" || route === "/admin/login";

  // Pick page
  let page;
  if (route === "/" || route === "") page = <window.HomePage />;
  else if (route === "/sobre") page = <window.SobrePage />;
  else if (route === "/experiencia") page = <window.ExperienciaPage />;
  else if (route === "/stack") page = <window.StackPage />;
  else if (route === "/curriculo") page = <window.CurriculoPage />;
  else if (route === "/contato") page = <window.ContatoPage />;
  else if (route === "/projetos") page = <window.ProjetosPage />;
  else if (route.startsWith("/projetos/")) page = <window.ProjetoDetailPage slug={route.slice("/projetos/".length)} />;
  else if (route === "/conteudos") page = <window.ConteudosPage filter="ALL" />;
  else if (route === "/conteudos/artigos") page = <window.ConteudosPage filter="ARTICLE" />;
  else if (route === "/conteudos/videos") page = <window.ConteudosPage filter="VIDEO" />;
  else if (route === "/conteudos/series") page = <window.ConteudosPage filter="SERIES" />;
  else if (route === "/conteudos/tutoriais") page = <window.ConteudosPage filter="TUTORIAL" />;
  else if (route === "/conteudos/casos") page = <window.ConteudosPage filter="CASE_STUDY" />;
  else if (route.startsWith("/conteudos/series/")) page = <window.SerieDetailPage slug={route.slice("/conteudos/series/".length)} />;
  else if (route.startsWith("/conteudos/")) page = <window.ArtigoPage slug={route.slice("/conteudos/".length)} />;
  else if (route === "/laboratorio") page = <window.LaboratorioPage />;
  else if (route.startsWith("/laboratorio/")) page = <window.LabDetailPage slug={route.slice("/laboratorio/".length)} />;
  else if (route.startsWith("/arquiteturas/")) page = <window.ArquiteturaDetailPage slug={route.slice("/arquiteturas/".length)} />;
  else if (route === "/login" || route === "/admin/login") page = <window.AdminLogin />;
  else if (route === "/admin" || route === "/admin/") page = <window.AdminDashboard />;
  else if (route === "/admin/conteudos") page = <window.AdminConteudos />;
  else if (route === "/admin/conteudos/novo") page = <window.AdminEditor />;
  else if (route.startsWith("/admin/conteudos/")) page = <window.AdminEditor slug={route.slice("/admin/conteudos/".length)} />;
  else if (route === "/admin/mensagens") page = <window.AdminMensagens />;
  else if (route.startsWith("/admin/")) page = <window.AdminDashboard />;
  else page = <NotFound route={route} />;

  if (isAdmin || isLogin) {
    return <>{page}</>;
  }
  return (
    <>
      <window.Header route={route} />
      {page}
      <window.Footer />
      <window.CommandK />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

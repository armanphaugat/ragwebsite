import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Features", "How It Works", "Tech Stack", "API", "Setup"];

const FEATURES = [
  {
    icon: "📄",
    title: "PDF Processing",
    description:
      "Upload any PDF and our pipeline extracts, chunks, and indexes it in seconds using PyPDF2 and pdfplumber — no manual parsing needed.",
    tag: "Ingestion",
    color: "#C0392B",
  },
  {
    icon: "🌐",
    title: "Web Scraping",
    description:
      "Drop a URL and we handle the rest. BeautifulSoup4 scrapes and cleans content so your knowledge base grows with the web.",
    tag: "Ingestion",
    color: "#C0392B",
  },
  {
    icon: "🧠",
    title: "Semantic Search",
    description:
      "FAISS vector store with MMR retrieval fetches the top 20 most diverse, relevant chunks — not just the closest ones.",
    tag: "Retrieval",
    color: "#1A5276",
  },
  {
    icon: "⚡",
    title: "Dual LLM Fallback",
    description:
      "Llama 3.3 70B via Groq is your primary brain. If it's ever down, Gemini 1.5 Flash catches the request automatically.",
    tag: "Generation",
    color: "#1A5276",
  },
  {
    icon: "🔒",
    title: "Isolated Knowledge Bases",
    description:
      "Each project or workspace gets its own FAISS index. Your data never bleeds into another team's context.",
    tag: "Security",
    color: "#117A65",
  },
  {
    icon: "🐳",
    title: "One-Command Deploy",
    description:
      "Docker Compose bundles the backend, bot, and frontend. Get running in under five minutes on any machine.",
    tag: "DevOps",
    color: "#117A65",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload",
    body: "Send PDFs or URLs to the /upload endpoint. Text is extracted, cleaned, and split into 400-char chunks with 60-char overlap.",
    accent: "#C0392B",
  },
  {
    step: "02",
    title: "Embed",
    body: "Every chunk is converted into a dense vector using HuggingFace's sentence-transformers/all-MiniLM-L6-v2 model.",
    accent: "#E74C3C",
  },
  {
    step: "03",
    title: "Index",
    body: "Vectors land in a FAISS index scoped to your project ID — fast, local, and completely isolated from other workspaces.",
    accent: "#1A5276",
  },
  {
    step: "04",
    title: "Answer",
    body: "Questions are embedded, top chunks retrieved via MMR, then Llama 3.3 70B synthesises a grounded, accurate answer.",
    accent: "#2874A6",
  },
];

const TECH = [
  { name: "LangChain", role: "RAG orchestration", abbr: "LC" },
  { name: "FAISS", role: "Vector database", abbr: "FS" },
  { name: "HuggingFace", role: "Embeddings", abbr: "HF" },
  { name: "Groq API", role: "LLM inference", abbr: "GQ" },
  { name: "Gemini 1.5", role: "Fallback LLM", abbr: "GM" },
  { name: "FastAPI", role: "REST backend", abbr: "FA" },
  { name: "React + Vite", role: "Web frontend", abbr: "RV" },
  { name: "Docker", role: "Containerisation", abbr: "DK" },
  { name: "BeautifulSoup4", role: "Web scraping", abbr: "BS" },
];

const ENDPOINTS = [
  {
    method: "PUT",
    path: "/upload",
    desc: "Ingest PDFs and URLs into a knowledge base",
    body: `{
  "guild_id": "my-project",
  "urls": "https://docs.example.com",
  "files": [<PDF binary>]
}`,
    response: `{
  "status": "success",
  "message": "Processed 142 chunks",
  "urls_processed": 1,
  "pdfs_processed": 1
}`,
    color: "#1A5276",
  },
  {
    method: "POST",
    path: "/query",
    desc: "Query the knowledge base and get an AI-generated answer",
    body: `{
  "question": "What are the main features?",
  "server": "my-project"
}`,
    response: `{
  "answer": "Based on the uploaded content,
  the main features are..."
}`,
    color: "#C0392B",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(28px)", left: "translateX(-28px)", right: "translateX(28px)", none: "none" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[direction],
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase().replace(/ /g, "-"))?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAF9F6", color: "#1C1C1C", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #C0392B22; }
        a { color: inherit; text-decoration: none; }
        .mono { font-family: 'Courier New', monospace; }
        .sans { font-family: 'Helvetica Neue', Arial, sans-serif; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #C0392B; color: #FAF9F6;
          padding: 12px 28px; border-radius: 4px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 600; font-size: 14px; letter-spacing: 0.5px;
          cursor: pointer; border: none;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: #A93226; transform: translateY(-1px); }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #1A5276;
          padding: 11px 27px; border-radius: 4px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 600; font-size: 14px; letter-spacing: 0.5px;
          cursor: pointer; border: 1.5px solid #1A5276;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-secondary:hover { background: #1A527612; transform: translateY(-1px); }
        .tag {
          display: inline-block;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 1.2px;
          text-transform: uppercase; padding: 3px 10px;
          border-radius: 2px;
        }
        .method-badge {
          display: inline-block; font-family: 'Courier New', monospace;
          font-size: 11px; font-weight: 700; letter-spacing: 1px;
          padding: 3px 10px; border-radius: 3px;
        }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .marquee-track { display:flex; gap:0; animation: marquee 28s linear infinite; }
        .marquee-wrap { overflow:hidden; }
        .card-hover { transition: transform 0.25s, box-shadow 0.25s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(28,28,28,0.10); }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .how-grid { grid-template-columns: 1fr 1fr !important; }
          .tech-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .ep-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-title { font-size: 42px !important; }
          .section-title { font-size: 36px !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sans" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navScrolled ? "rgba(250,249,246,0.96)" : "transparent",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        borderBottom: navScrolled ? "1px solid #E8E5DF" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "#C0392B", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#FAF9F6", fontWeight: 900, fontSize: 14, fontFamily: "Helvetica Neue, Arial, sans-serif" }}>R</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.3px", color: "#1C1C1C" }}>
              Q-ARAG
            </span>
          </div>
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#555", fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 500, letterSpacing: "0.2px" }}>
                {l}
              </button>
            ))}
          </div>
          <a href="https://github.com/armanphaugat/q-aragbaseddicordbotproject" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }}>
            View on GitHub ↗
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 120, paddingBottom: 96, paddingLeft: 24, paddingRight: 24, position: "relative", overflow: "hidden" }}>
        {/* Decorative grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#E8E5DF 1px, transparent 1px), linear-gradient(90deg, #E8E5DF 1px, transparent 1px)", backgroundSize: "60px 60px", opacity: 0.4, pointerEvents: "none" }} />
        {/* Red accent blob */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: "radial-gradient(circle, #C0392B18 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative" }}>
          <FadeIn direction="none">
            <div className="sans" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#C0392B0F", border: "1px solid #C0392B30", borderRadius: 4, padding: "6px 14px", marginBottom: 32 }}>
              <span style={{ width: 7, height: 7, background: "#C0392B", borderRadius: "50%", display: "inline-block", animation: "pulse-dot 2s infinite" }} />
              <span style={{ fontSize: 12, color: "#C0392B", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>Open Source · MIT License</span>
            </div>
          </FadeIn>

          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <FadeIn direction="left">
                <h1 className="hero-title" style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: "-2px", color: "#1C1C1C", marginBottom: 24 }}>
                  Your knowledge base,{" "}
                  <span style={{ color: "#C0392B" }}>anywhere</span>{" "}
                  you need it.
                </h1>
                <p className="sans" style={{ fontSize: 18, color: "#555", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
                  Q-ARAG is a full-stack RAG system — feed it PDFs or URLs, then query it over a REST API or any interface you build. No cloud lock-in. Runs in Docker on your own machine.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="https://github.com/armanphaugat/q-aragbaseddicordbotproject" target="_blank" rel="noreferrer" className="btn-primary">
                    Get Started →
                  </a>
                  <button onClick={() => scrollTo("How It Works")} className="btn-secondary">
                    See How It Works
                  </button>
                </div>
                <div className="sans" style={{ display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap" }}>
                  {["LangChain + FAISS", "Llama 3.3 70B", "Docker Ready"].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#777" }}>
                      <span style={{ color: "#1A5276", fontWeight: 700 }}>✓</span> {t}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Terminal mockup */}
            <FadeIn direction="right" delay={0.15}>
              <div style={{ background: "#1C1C1C", borderRadius: 8, overflow: "hidden", boxShadow: "0 24px 64px rgba(28,28,28,0.22)" }}>
                <div style={{ background: "#2C2C2C", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#E74C3C" }} />
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#F39C12" }} />
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#2ECC71" }} />
                  <span className="mono" style={{ marginLeft: 8, fontSize: 12, color: "#888" }}>q-arag · REST API</span>
                </div>
                <div style={{ padding: "24px 20px" }} className="mono">
                  <p style={{ color: "#888", fontSize: 12, marginBottom: 4 }}># Upload your documents</p>
                  <p style={{ color: "#E74C3C", fontSize: 13, marginBottom: 12 }}>$ curl -X PUT /upload \</p>
                  <p style={{ color: "#AAA", fontSize: 13, paddingLeft: 16, marginBottom: 2 }}>-F "guild_id=my-project" \</p>
                  <p style={{ color: "#AAA", fontSize: 13, paddingLeft: 16, marginBottom: 2 }}>-F "urls=https://docs.example.com" \</p>
                  <p style={{ color: "#AAA", fontSize: 13, paddingLeft: 16, marginBottom: 16 }}>-F "files=@report.pdf"</p>
                  <div style={{ borderLeft: "3px solid #C0392B", paddingLeft: 12, marginBottom: 20 }}>
                    <p style={{ color: "#2ECC71", fontSize: 12 }}>{`{ "status": "success", "message": "Processed 142 chunks" }`}</p>
                  </div>
                  <p style={{ color: "#888", fontSize: 12, marginBottom: 4 }}># Ask anything</p>
                  <p style={{ color: "#E74C3C", fontSize: 13, marginBottom: 12 }}>$ curl -X POST /query \</p>
                  <p style={{ color: "#AAA", fontSize: 13, paddingLeft: 16, marginBottom: 16 }}>{`-d '{"question":"Key findings?","server":"my-project"}'`}</p>
                  <div style={{ borderLeft: "3px solid #1A5276", paddingLeft: 12 }}>
                    <p style={{ color: "#5DADE2", fontSize: 12, lineHeight: 1.6 }}>{`{ "answer": "Based on the uploaded content, the key findings are: 1) Semantic retrieval improves accuracy by 40%..." }`}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: "#1A5276", padding: "14px 0", overflow: "hidden" }}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) =>
              ["LangChain", "FAISS Vector Search", "Llama 3.3 70B", "Gemini 1.5 Flash", "FastAPI", "Docker Compose", "HuggingFace Embeddings", "BeautifulSoup4", "PyPDF2", "MMR Retrieval", "React + Vite"].map((t, j) => (
                <span key={`${i}-${j}`} className="sans" style={{ display: "inline-block", color: "#FAF9F6", fontSize: 13, fontWeight: 600, letterSpacing: "0.5px", padding: "0 28px", borderRight: "1px solid #2874A6", whiteSpace: "nowrap" }}>
                  {t}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div className="sans" style={{ textAlign: "center", marginBottom: 64 }}>
              <span className="tag" style={{ background: "#C0392B0F", color: "#C0392B", border: "1px solid #C0392B30", marginBottom: 16, display: "inline-block" }}>Capabilities</span>
              <h2 className="section-title" style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16, fontFamily: "Georgia, serif" }}>
                Built for real workflows.
              </h2>
              <p style={{ fontSize: 17, color: "#666", maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                Every component was chosen because it works in production — not because it looks good in a diagram.
              </p>
            </div>
          </FadeIn>

          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="card-hover" style={{ background: "#FFF", border: "1px solid #E8E5DF", borderRadius: 6, padding: "32px 28px", height: "100%", borderTop: `3px solid ${f.color}` }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                  <span className="tag sans" style={{ background: f.color + "12", color: f.color, marginBottom: 12, display: "inline-block" }}>{f.tag}</span>
                  <h3 className="sans" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#1C1C1C" }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{f.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: "96px 24px", background: "#F4F2EE" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div className="sans" style={{ textAlign: "center", marginBottom: 72 }}>
              <span className="tag" style={{ background: "#1A52760F", color: "#1A5276", border: "1px solid #1A527630", marginBottom: 16, display: "inline-block" }}>The RAG Pipeline</span>
              <h2 className="section-title" style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, fontFamily: "Georgia, serif" }}>
                How It Works
              </h2>
            </div>
          </FadeIn>

          <div className="how-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
            {HOW_IT_WORKS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ position: "relative" }}>
                  <div style={{ background: "#FFF", border: "1px solid #E8E5DF", borderRadius: 6, padding: "36px 24px" }}>
                    <div className="mono" style={{ fontSize: 48, fontWeight: 900, color: s.accent + "18", lineHeight: 1, marginBottom: 16, letterSpacing: "-2px" }}>{s.step}</div>
                    <div style={{ width: 36, height: 3, background: s.accent, borderRadius: 2, marginBottom: 16 }} />
                    <h3 className="sans" style={{ fontSize: 20, fontWeight: 800, color: "#1C1C1C", marginBottom: 12 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: "#666", lineHeight: 1.75, fontFamily: "Georgia, serif" }}>{s.body}</p>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hide-mobile" style={{ position: "absolute", top: "50%", right: -14, transform: "translateY(-50%)", zIndex: 2, background: "#F4F2EE", padding: "4px 2px" }}>
                      <span className="sans" style={{ fontSize: 18, color: "#BBB" }}>→</span>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Architecture note */}
          <FadeIn delay={0.4}>
            <div style={{ marginTop: 48, background: "#1C1C1C", borderRadius: 6, padding: "28px 32px", display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{ width: 40, height: 40, background: "#C0392B", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#FFF", fontSize: 18 }}>📂</span>
              </div>
              <div>
                <p className="sans" style={{ fontSize: 13, fontWeight: 700, color: "#C0392B", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Storage Architecture</p>
                <p className="mono" style={{ fontSize: 13, color: "#AAA", lineHeight: 1.8 }}>
                  vectorstore/<span style={{ color: "#E74C3C" }}>{"{"}</span>guild_id<span style={{ color: "#E74C3C" }}>{"}"}</span>/faiss_index/ — Each knowledge base lives in its own directory, created at runtime. Add it to .gitignore and never commit it.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="tech-stack" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div className="sans" style={{ textAlign: "center", marginBottom: 64 }}>
              <span className="tag" style={{ background: "#C0392B0F", color: "#C0392B", border: "1px solid #C0392B30", marginBottom: 16, display: "inline-block" }}>Technology</span>
              <h2 className="section-title" style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, fontFamily: "Georgia, serif" }}>
                The Stack
              </h2>
              <p style={{ fontSize: 17, color: "#666", maxWidth: 480, margin: "12px auto 0", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                No proprietary cloud databases. Everything here is open, swappable, and well-documented.
              </p>
            </div>
          </FadeIn>

          <div className="tech-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {TECH.map((t, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="card-hover" style={{ background: "#FFF", border: "1px solid #E8E5DF", borderRadius: 6, padding: "24px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: i % 3 === 0 ? "#C0392B0E" : i % 3 === 1 ? "#1A52760E" : "#11776511", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="mono" style={{ fontWeight: 900, fontSize: 13, color: i % 3 === 0 ? "#C0392B" : i % 3 === 1 ? "#1A5276" : "#117765" }}>{t.abbr}</span>
                  </div>
                  <div>
                    <p className="sans" style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C", marginBottom: 2 }}>{t.name}</p>
                    <p className="sans" style={{ fontSize: 12, color: "#888", letterSpacing: "0.3px" }}>{t.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── API REFERENCE ── */}
      <section id="api" style={{ padding: "96px 24px", background: "#F4F2EE" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div className="sans" style={{ textAlign: "center", marginBottom: 64 }}>
              <span className="tag" style={{ background: "#1A52760F", color: "#1A5276", border: "1px solid #1A527630", marginBottom: 16, display: "inline-block" }}>REST API</span>
              <h2 className="section-title" style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, fontFamily: "Georgia, serif" }}>
                Two Endpoints. That's It.
              </h2>
              <p style={{ fontSize: 17, color: "#666", maxWidth: 480, margin: "12px auto 0", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                Simple enough to integrate in any language. Swagger docs auto-generated at <span className="mono" style={{ fontSize: 15 }}>/docs</span>.
              </p>
            </div>
          </FadeIn>

          {/* Tab switcher */}
          <FadeIn>
            <div style={{ display: "flex", gap: 0, marginBottom: 0, borderBottom: "none" }}>
              {ENDPOINTS.map((ep, i) => (
                <button
                  key={i}
                  onClick={() => setActiveEndpoint(i)}
                  className="sans"
                  style={{
                    padding: "12px 28px",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    border: "none",
                    borderBottom: activeEndpoint === i ? `3px solid ${ep.color}` : "3px solid transparent",
                    background: "transparent",
                    color: activeEndpoint === i ? ep.color : "#888",
                    transition: "all 0.2s",
                    letterSpacing: "0.3px",
                  }}
                >
                  <span className="method-badge" style={{ background: ep.color + "18", color: ep.color, marginRight: 8 }}>{ep.method}</span>
                  {ep.path}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="ep-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
              {/* Request */}
              <div style={{ background: "#1C1C1C", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ padding: "12px 20px", borderBottom: "1px solid #333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="sans" style={{ fontSize: 12, color: "#888", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>Request</span>
                  <span className="method-badge" style={{ background: ENDPOINTS[activeEndpoint].color + "30", color: ENDPOINTS[activeEndpoint].color }}>
                    {ENDPOINTS[activeEndpoint].method}
                  </span>
                </div>
                <div style={{ padding: "20px" }}>
                  <p className="mono" style={{ color: "#5DADE2", fontSize: 14, marginBottom: 12 }}>
                    {ENDPOINTS[activeEndpoint].path}
                  </p>
                  <p className="sans" style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Body</p>
                  <pre className="mono" style={{ fontSize: 13, color: "#DDD", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {ENDPOINTS[activeEndpoint].body}
                  </pre>
                </div>
              </div>
              {/* Response */}
              <div style={{ background: "#1C1C1C", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ padding: "12px 20px", borderBottom: "1px solid #333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="sans" style={{ fontSize: 12, color: "#888", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>Response</span>
                  <span className="method-badge" style={{ background: "#2ECC7118", color: "#2ECC71" }}>200 OK</span>
                </div>
                <div style={{ padding: "20px" }}>
                  <p className="sans" style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>JSON</p>
                  <pre className="mono" style={{ fontSize: 13, color: "#2ECC71", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {ENDPOINTS[activeEndpoint].response}
                  </pre>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SETUP ── */}
      <section id="setup" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div className="sans" style={{ textAlign: "center", marginBottom: 64 }}>
              <span className="tag" style={{ background: "#C0392B0F", color: "#C0392B", border: "1px solid #C0392B30", marginBottom: 16, display: "inline-block" }}>Quick Start</span>
              <h2 className="section-title" style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, fontFamily: "Georgia, serif" }}>
                Up in 5 minutes.
              </h2>
            </div>
          </FadeIn>

          {[
            { n: "1", title: "Clone the repo", code: "git clone https://github.com/armanphaugat/q-aragbaseddicordbotproject.git\ncd q-aragbaseddicordbotproject" },
            { n: "2", title: "Set environment variables", code: "# Create .env in root\nGROQ_API_KEY=your_groq_api_key\nGOOGLE_API_KEY=your_google_api_key" },
            { n: "3", title: "Run with Docker (recommended)", code: "docker-compose up --build" },
            { n: "4", title: "Or run manually", code: "# Backend\npip install -r requirements.txt\ncd backend && uvicorn routes:app --reload\n\n# Frontend\ncd frontend && npm install && npm run dev" },
          ].map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ display: "flex", gap: 24, marginBottom: 32, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, background: i < 3 ? "#C0392B" : "#1A5276", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 4 }}>
                  <span className="sans" style={{ color: "#FFF", fontWeight: 900, fontSize: 14 }}>{step.n}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="sans" style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C", marginBottom: 10 }}>{step.title}</p>
                  <div style={{ background: "#1C1C1C", borderRadius: 6, padding: "16px 20px" }}>
                    <pre className="mono" style={{ fontSize: 13, color: "#BBB", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{step.code}</pre>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.45}>
            <div style={{ background: "#1A52760A", border: "1px solid #1A527630", borderRadius: 6, padding: "20px 24px", marginTop: 16 }}>
              <p className="sans" style={{ fontSize: 13, color: "#1A5276", fontWeight: 700, marginBottom: 6 }}>📋 Prerequisites</p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {["Python 3.8+", "Node.js 18+", "Groq API Key", "Google API Key (Gemini fallback)", "Docker + Docker Compose"].map((p) => (
                  <span key={p} className="sans" style={{ fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "#1A5276", fontWeight: 700 }}>✓</span> {p}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "96px 24px", background: "#1C1C1C", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 320, height: 320, background: "radial-gradient(circle, #C0392B18 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 240, height: 240, background: "radial-gradient(circle, #1A527618 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <FadeIn>
            <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, color: "#FAF9F6", marginBottom: 20 }}>
              Build something with it.
            </h2>
            <p className="sans" style={{ fontSize: 17, color: "#AAA", lineHeight: 1.7, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
              Q-ARAG is a learning project and a real working tool. Fork it, extend it, plug in your own LLM — the architecture is designed to be hacked on.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://github.com/armanphaugat/q-aragbaseddicordbotproject" target="_blank" rel="noreferrer" className="btn-primary">
                Clone on GitHub →
              </a>
              <a href="https://github.com/armanphaugat/q-aragbaseddicordbotproject#readme" target="_blank" rel="noreferrer" className="btn-secondary" style={{ borderColor: "#555", color: "#CCC" }}>
                Read the Docs
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#141414", padding: "48px 24px 32px", borderTop: "1px solid #2C2C2C" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, background: "#C0392B", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="sans" style={{ color: "#FAF9F6", fontWeight: 900, fontSize: 12 }}>R</span>
                </div>
                <span className="sans" style={{ fontWeight: 800, fontSize: 16, color: "#FAF9F6", letterSpacing: "-0.3px" }}>Q-ARAG</span>
              </div>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                A RAG-based knowledge engine with a REST API. Built with LangChain, FastAPI, and FAISS.
              </p>
            </div>
            <div>
              <p className="sans" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", color: "#555", textTransform: "uppercase", marginBottom: 16 }}>Project</p>
              {[["GitHub", "https://github.com/armanphaugat/q-aragbaseddicordbotproject"], ["Documentation", "https://github.com/armanphaugat/q-aragbaseddicordbotproject#readme"], ["Issues", "https://github.com/armanphaugat/q-aragbaseddicordbotproject/issues"]].map(([label, href]) => (
                <p key={label} style={{ marginBottom: 10 }}>
                  <a href={href} target="_blank" rel="noreferrer" className="sans" style={{ fontSize: 14, color: "#888", transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = "#FAF9F6"}
                    onMouseOut={e => e.target.style.color = "#888"}>
                    {label}
                  </a>
                </p>
              ))}
            </div>
            <div>
              <p className="sans" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", color: "#555", textTransform: "uppercase", marginBottom: 16 }}>Stack</p>
              {["LangChain · FAISS", "Groq + Gemini", "FastAPI · Docker", "HuggingFace Embeddings"].map((t) => (
                <p key={t} className="sans" style={{ fontSize: 14, color: "#888", marginBottom: 10 }}>{t}</p>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #2C2C2C", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p className="sans" style={{ fontSize: 13, color: "#555" }}>
              Made with care · MIT License · Open Source
            </p>
            <p className="sans" style={{ fontSize: 13, color: "#555" }}>
              Built with LangChain, FastAPI &amp; FAISS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
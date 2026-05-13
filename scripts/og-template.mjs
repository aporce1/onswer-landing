// Builds the OG image HTML for a given locale.
// 1200×630 viewport. Self-contained: inlines fonts via <link>, all CSS inline.

const SHARED_CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:1200px;height:630px;overflow:hidden;font-family:'Inter','Segoe UI',system-ui,sans-serif;color:#0A0A0F}
  body{
    background:
      radial-gradient(900px 600px at 20% 15%, rgba(79,70,229,0.18), transparent 60%),
      radial-gradient(700px 500px at 85% 75%, rgba(124,58,237,0.20), transparent 60%),
      radial-gradient(500px 400px at 50% 110%, rgba(6,182,212,0.12), transparent 65%),
      linear-gradient(180deg, #FAFAF7 0%, #FFFFFF 60%);
    position:relative;
  }
  .frame{position:relative;width:100%;height:100%;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:flex;align-items:center;gap:14px}
  .brand-mark{width:46px;height:46px;display:grid;place-items:center;border-radius:13px;background:linear-gradient(135deg,#4F46E5,#7C3AED);box-shadow:0 18px 32px -16px rgba(124,58,237,0.55)}
  .brand-mark svg{width:24px;height:24px}
  .brand-name{font-weight:800;font-size:30px;letter-spacing:-0.01em;color:#0A0A0F}
  .pill{display:inline-flex;align-items:center;gap:9px;background:rgba(255,255,255,0.78);backdrop-filter:blur(6px);border:1px solid #E5E5EA;border-radius:9999px;padding:9px 18px;font-size:14px;font-weight:600;color:#4B5563}
  .pill .dot{width:8px;height:8px;border-radius:50%;background:#10B981;box-shadow:0 0 0 4px rgba(16,185,129,0.15)}
  .headline{font-weight:800;font-size:74px;line-height:1.04;letter-spacing:-0.02em;color:#0A0A0F;max-width:870px}
  .key{background:linear-gradient(120deg,#4F46E5,#7C3AED 55%,#06B6D4);-webkit-background-clip:text;background-clip:text;color:transparent}
  .subline{margin-top:22px;font-size:24px;line-height:1.4;color:#4B5563;max-width:860px;font-weight:500}
  .footer-row{display:flex;align-items:center;justify-content:space-between;gap:32px}
  .llm-stack{display:flex;align-items:center;gap:14px}
  .llm-pill{display:inline-flex;align-items:center;gap:9px;background:#FFFFFF;border:1px solid #E5E5EA;border-radius:14px;padding:10px 16px;font-size:15px;font-weight:600;color:#0A0A0F;box-shadow:0 8px 18px -10px rgba(15,23,42,0.10)}
  .llm-dot{width:10px;height:10px;border-radius:50%}
  .stat-strip{display:flex;align-items:center;gap:20px;color:#6B7280;font-size:14px;font-weight:500}
  .stat-strip strong{color:#0A0A0F;font-weight:700;font-size:18px}
  .url{font-family:'JetBrains Mono','Cascadia Code',monospace;font-size:15px;color:#6B7280;letter-spacing:0.02em}
  .glow-orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:0.55;z-index:0;pointer-events:none}
  .frame > *{position:relative;z-index:2}
`;

const LOGO_SVG = `
  <svg viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="11.5" stroke="white" stroke-width="2.5"/>
    <circle cx="16" cy="16" r="3.4" fill="white"/>
  </svg>
`;

const LLMS = [
  { name: 'ChatGPT',    color: '#10A37F' },
  { name: 'Claude',     color: '#D97757' },
  { name: 'Gemini',     color: '#4285F4' },
  { name: 'Perplexity', color: '#20808D' },
];

function llmPills() {
  return LLMS.map(l =>
    `<span class="llm-pill"><span class="llm-dot" style="background:${l.color}"></span>${l.name}</span>`
  ).join('');
}

const COPY = {
  en: {
    pill:     'Live audit · 8+ LLMs covered',
    headPre:  'Does AI answer with',
    headKey:  'your brand',
    headPost: 'when buyers ask?',
    subline:  'Onswer monitors 8+ AI models across 3 markets. See where you appear and exactly what to fix.',
    statsLeft:  '<strong>10+</strong> AI models',
    statsRight: '<strong>$0</strong> to start',
  },
  pt: {
    pill:     'Audit ao vivo · 8+ LLMs cobertos',
    headPre:  'A IA responde com',
    headKey:  'a sua marca',
    headPost: 'quando compradores perguntam?',
    subline:  'Onswer monitora 8+ modelos de IA em 3 mercados. Veja onde você aparece e o que corrigir.',
    statsLeft:  '<strong>10+</strong> modelos de IA',
    statsRight: '<strong>$0</strong> para começar',
  },
};

export function htmlFor(locale) {
  const c = COPY[locale] ?? COPY.en;
  return `<!doctype html><html><head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=JetBrains+Mono:wght@500&display=swap" />
    <style>${SHARED_CSS}</style>
  </head>
  <body>
    <div class="glow-orb" style="width:380px;height:380px;background:#4F46E5;top:-100px;right:-80px"></div>
    <div class="glow-orb" style="width:300px;height:300px;background:#06B6D4;bottom:-120px;left:-60px"></div>

    <div class="frame">
      <header style="display:flex;align-items:center;justify-content:space-between">
        <div class="brand">
          <span class="brand-mark">${LOGO_SVG}</span>
          <span class="brand-name">Onswer</span>
        </div>
        <div class="pill"><span class="dot"></span>${c.pill}</div>
      </header>

      <section>
        <h1 class="headline">${c.headPre} <span class="key">${c.headKey}</span> ${c.headPost}</h1>
        <p class="subline">${c.subline}</p>
      </section>

      <footer class="footer-row">
        <div class="llm-stack">${llmPills()}</div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
          <div class="stat-strip">${c.statsLeft} <span style="color:#D4D4D8">·</span> ${c.statsRight}</div>
          <div class="url">onswer.app</div>
        </div>
      </footer>
    </div>
  </body></html>`;
}

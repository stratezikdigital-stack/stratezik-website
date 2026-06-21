/** Latin @font-face rules for hero LCP — inlined in index.html; full stack loads async. */
export const CRITICAL_FONT_FACE_CSS = `
@font-face{font-family:'Fraunces';font-style:italic;font-weight:300 900;font-display:swap;src:url(/fonts/fraunces-latin-italic.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Fraunces';font-style:normal;font-weight:300 900;font-display:swap;src:url(/fonts/fraunces-latin.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Inter';font-style:normal;font-weight:300 700;font-display:swap;src:url(/fonts/inter-latin.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
`.trim()

/** Instant first-paint shell before the app CSS bundle hydrates. */
export const CRITICAL_SHELL_CSS = `
:root{--ink:#0d0c0a;--ink-700:#2a2722;--ink-500:#5a554b;--cream:#f4ede1;--oxblood:#7a1f1f}
html{background:var(--cream);scroll-behavior:auto}
body{margin:0;background:var(--cream);color:var(--ink);font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
#root{min-height:100vh}
.font-display{font-family:Fraunces,Georgia,'Times New Roman',serif;font-feature-settings:'opsz' on,'ss01'}
.font-mono{font-family:ui-monospace,monospace}
.lead{font-family:Fraunces,Georgia,serif;font-size:clamp(1.25rem,1.6vw,1.625rem);line-height:1.45;color:var(--ink-700)}
.hairline{border-top:1px solid rgba(13,12,10,.16)}
.bg-cream{background-color:var(--cream)}
.bg-ink{background-color:var(--ink)}
.text-cream{color:var(--cream)}
.text-ink{color:var(--ink)}
.text-oxblood{color:var(--oxblood)}
.text-ink-500{color:var(--ink-500)}
.text-ink-700{color:var(--ink-700)}
.pt-36{padding-top:9rem}
.relative{position:relative}
.min-h-screen{min-height:100vh}
`.trim()

export const DEFERRED_FONTS_LOADER = `
(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='/fonts/fonts.css';document.head.appendChild(l);})();
`.trim()

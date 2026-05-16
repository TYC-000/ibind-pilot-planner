/**
 * IBindCardIllustration.jsx
 * Pure SVG technical illustration — iBind Flex card top-view architecture.
 * Shows Wells 1–4, the SLF membrane contact window, and lateral flow path.
 * Colors: #1A1A1A structural, #E3007F active flow, #0099CC buffer wells.
 */
export default function IBindCardIllustration({ className = '' }) {
  return (
    <figure className={`ibind-illustration ${className}`} aria-label="iBind Flex 卡匣架構示意圖（俯視圖）">
      <svg
        viewBox="0 0 380 260"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="iBind Flex Card — Sequential Lateral Flow diagram"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          {/* Magenta glow filter for active flow path */}
          <filter id="magenta-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Animated dash for flow arrows */}
          <marker id="arrow-magenta" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#E3007F" />
          </marker>
          <marker id="arrow-cyan" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#0099CC" />
          </marker>
          <marker id="arrow-gray" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#8A8A8A" />
          </marker>
          {/* Animated dash pattern for active flow */}
          <style>{`
            .flow-active {
              stroke-dasharray: 6 3;
              animation: dash-flow 1.4s linear infinite;
            }
            @keyframes dash-flow {
              to { stroke-dashoffset: -18; }
            }
            .slf-pulse {
              animation: slf-glow 2s ease-in-out infinite alternate;
            }
            @keyframes slf-glow {
              from { opacity: 0.55; }
              to   { opacity: 1; }
            }
            @media (prefers-reduced-motion: reduce) {
              .flow-active { animation: none; }
              .slf-pulse   { animation: none; }
            }
          `}</style>
        </defs>

        {/* ── Card body ── */}
        <rect x="10" y="10" width="360" height="240" rx="14" ry="14"
          fill="#FAFAFA" stroke="#1A1A1A" strokeWidth="1.8" />

        {/* Card label */}
        <text x="190" y="30" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="9.5" fontWeight="700"
          letterSpacing="1.2" fill="#8A8A8A">
          iBIND FLEX CARD — TOP VIEW
        </text>

        {/* ── Well row ── */}
        {/* Well 1 — Primary Antibody (magenta) */}
        <circle cx="62" cy="75" r="26" fill="rgba(227,0,127,.10)" stroke="#E3007F" strokeWidth="2" />
        <circle cx="62" cy="75" r="14" fill="rgba(227,0,127,.22)" stroke="#E3007F" strokeWidth="1.5" />
        <text x="62" y="79" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="8.5" fontWeight="800" fill="#E3007F">W1</text>
        <text x="62" y="113" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="7.8" fontWeight="600" fill="#1A1A1A">一次抗體</text>

        {/* Well 2 — Blocking Buffer (cyan) */}
        <circle cx="148" cy="75" r="26" fill="rgba(0,153,204,.10)" stroke="#0099CC" strokeWidth="2" />
        <circle cx="148" cy="75" r="14" fill="rgba(0,153,204,.22)" stroke="#0099CC" strokeWidth="1.5" />
        <text x="148" y="79" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="8.5" fontWeight="800" fill="#0099CC">W2</text>
        <text x="148" y="113" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="7.8" fontWeight="600" fill="#1A1A1A">自動阻斷</text>

        {/* Well 3 — Secondary Antibody (magenta) */}
        <circle cx="234" cy="75" r="26" fill="rgba(227,0,127,.10)" stroke="#E3007F" strokeWidth="2" />
        <circle cx="234" cy="75" r="14" fill="rgba(227,0,127,.22)" stroke="#E3007F" strokeWidth="1.5" />
        <text x="234" y="79" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="8.5" fontWeight="800" fill="#E3007F">W3</text>
        <text x="234" y="113" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="7.8" fontWeight="600" fill="#1A1A1A">二次抗體</text>

        {/* Well 4 — Wash (neutral) */}
        <circle cx="320" cy="75" r="26" fill="rgba(138,138,138,.08)" stroke="#8A8A8A" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx="320" cy="75" r="14" fill="rgba(138,138,138,.14)" stroke="#8A8A8A" strokeWidth="1.2" />
        <text x="320" y="79" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="8.5" fontWeight="800" fill="#8A8A8A">W4</text>
        <text x="320" y="113" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="7.8" fontWeight="600" fill="#8A8A8A">清洗液</text>

        {/* ── SLF Membrane Contact Window ── */}
        {/* Outer glow rect */}
        <rect x="60" y="138" width="260" height="82" rx="8" ry="8"
          fill="rgba(227,0,127,.06)" stroke="#E3007F" strokeWidth="2"
          className="slf-pulse" filter="url(#magenta-glow)" />
        {/* Inner membrane zone */}
        <rect x="72" y="148" width="236" height="60" rx="5" ry="5"
          fill="rgba(227,0,127,.04)" stroke="#E3007F" strokeWidth="1" strokeDasharray="5 3" />
        {/* Hatching to indicate membrane surface */}
        {[84, 106, 128, 150, 172, 194, 216, 238, 260, 282].map(x => (
          <line key={x} x1={x} y1="150" x2={x - 10} y2="206"
            stroke="#E3007F" strokeWidth="0.7" opacity="0.25" />
        ))}
        {/* SLF label */}
        <text x="190" y="169" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="800"
          letterSpacing="0.6" fill="#E3007F" className="slf-pulse">
          SLF 轉印膜接觸窗
        </text>
        <text x="190" y="183" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="7.5" fontWeight="500" fill="#5A5A5A">
          蛋白面朝下置膜 (Protein-side DOWN)
        </text>
        {/* Lateral flow direction arrow inside window */}
        <line x1="80" y1="198" x2="290" y2="198"
          stroke="#E3007F" strokeWidth="1.5" strokeLinecap="round"
          markerEnd="url(#arrow-magenta)" className="flow-active" />
        <text x="190" y="210" textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="600"
          fill="#E3007F" letterSpacing="0.8">Sequential Lateral Flow →</text>

        {/* ── Flow connector lines ── */}
        {/* W1 → SLF (magenta) */}
        <path d="M62,101 Q62,130 82,138"
          fill="none" stroke="#E3007F" strokeWidth="1.8" strokeLinecap="round"
          markerEnd="url(#arrow-magenta)" className="flow-active" />

        {/* W2 → SLF (cyan) */}
        <path d="M148,101 Q148,125 148,138"
          fill="none" stroke="#0099CC" strokeWidth="1.8" strokeLinecap="round"
          markerEnd="url(#arrow-cyan)" className="flow-active"
          style={{ animationDelay: '0.35s' }} />

        {/* W3 → SLF (magenta) */}
        <path d="M234,101 Q234,125 234,138"
          fill="none" stroke="#E3007F" strokeWidth="1.8" strokeLinecap="round"
          markerEnd="url(#arrow-magenta)" className="flow-active"
          style={{ animationDelay: '0.7s' }} />

        {/* W4 → SLF (gray) */}
        <path d="M320,101 Q320,130 298,138"
          fill="none" stroke="#8A8A8A" strokeWidth="1.4" strokeLinecap="round"
          markerEnd="url(#arrow-gray)" strokeDasharray="4 3" />

        {/* ── Legend ── */}
        <circle cx="22" cy="240" r="4" fill="#E3007F" opacity="0.85" />
        <text x="30" y="243.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7.5" fill="#5A5A5A">抗體孔 (Active)</text>
        <circle cx="100" cy="240" r="4" fill="#0099CC" opacity="0.85" />
        <text x="108" y="243.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7.5" fill="#5A5A5A">阻斷液孔 (Buffer)</text>
        <circle cx="190" cy="240" r="4" fill="#8A8A8A" opacity="0.65" />
        <text x="198" y="243.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7.5" fill="#5A5A5A">清洗孔 (Wash)</text>
      </svg>
      <figcaption style={{
        fontSize: '.7rem', color: 'var(--text-muted)', textAlign: 'center',
        marginTop: '.4rem', letterSpacing: '.2px'
      }}>
        圖示：iBind Flex 卡匣液流架構示意（俯視）· Sequential Lateral Flow (SLF) 機制
      </figcaption>
    </figure>
  );
}

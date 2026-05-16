// SVG Icon library for iBind Flex Pilot Planner
// All icons rendered inline for zero network dependency.

export function IconMonoclonal({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      <path d="M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function IconPolyclonal({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <circle cx="12" cy="16" r="3" />
      <line x1="10.5" y1="10" x2="12" y2="13.3" />
      <line x1="13.5" y1="10" x2="12" y2="13.3" />
    </svg>
  );
}

export function IconAffinity({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12C12 12 8 9 5 7a4 4 0 0 1 7-4 4 4 0 0 1 7 4c-3 2-7 5-7 5z" />
      <path d="M5 18h14" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconCrossAdsorbed({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12C12 12 8 9 5 7a4 4 0 0 1 7-4 4 4 0 0 1 7 4c-3 2-7 5-7 5z" />
      <line x1="4" y1="18" x2="8" y2="22" stroke="currentColor" strokeWidth="1.8" />
      <line x1="8" y1="18" x2="4" y2="22" stroke="currentColor" strokeWidth="1.8" />
      <line x1="14" y1="18" x2="18" y2="22" stroke="currentColor" strokeWidth="1.8" />
      <line x1="18" y1="18" x2="14" y2="22" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function IconDilutionLow({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <rect x="7" y="12" width="10" height="7" rx="1" fill="currentColor" opacity=".3" stroke="none" />
      <path d="M7 12h10" />
    </svg>
  );
}

export function IconDilutionMed({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <rect x="7" y="8" width="10" height="11" rx="1" fill="currentColor" opacity=".3" stroke="none" />
      <path d="M7 8h10" />
    </svg>
  );
}

export function IconDilutionHigh({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <rect x="7" y="4" width="10" height="15" rx="1" fill="currentColor" opacity=".3" stroke="none" />
      <path d="M7 4h10" />
    </svg>
  );
}

export function IconAbundanceHigh({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

export function IconAbundanceLow({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
}

export function IconPhospho({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconHumanCell({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="9" ry="7" />
      <ellipse cx="12" cy="12" rx="4" ry="3" />
      <path d="M3 12h18" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconHumanTissue({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
      <path d="M8 12s1-3 4-3 4 3 4 3-1 3-4 3-4-3-4-3z" />
      <path d="M12 9v6" />
    </svg>
  );
}

export function IconNonHuman({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function IconPVDF({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 6v12M10 6v12M14 6v12M18 6v12" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconNC({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="7" cy="12" r="1.5" fill="currentColor" opacity=".5" stroke="none" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" opacity=".5" stroke="none" />
      <circle cx="17" cy="12" r="1.5" fill="currentColor" opacity=".5" stroke="none" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" opacity=".5" stroke="none" />
    </svg>
  );
}

export function IconStandardBuffer({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6l1 6H8L9 3z" />
      <path d="M8 9l-2 12h12L16 9" />
      <path d="M10 15h4" />
    </svg>
  );
}

export function IconEnhancedBuffer({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6l1 6H8L9 3z" />
      <path d="M8 9l-2 12h12L16 9" />
      <path d="M10 15h4" />
      <path d="M19 3l1 2-1 2M21 5h-2" />
      <path d="M19 13l1 2-1 2M21 15h-2" />
    </svg>
  );
}

export function IconCheck({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function IconArrowLeft({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function IconFlask({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M9 3l-5 15a2 2 0 0 0 1.9 2.6h10.2A2 2 0 0 0 20 18L15 3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

export function IconWarning({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function IconInfo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function IconDanger({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function IconSuccess({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function IconPrint({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

export function IconReset({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-3.36" />
    </svg>
  );
}

export function IconSparkle({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 16.5l-6.2 4.5 2.4-7.3L2 9.2h7.6z" />
    </svg>
  );
}

// ── Card Format Icons ────────────────────────────────────────────────────

/** Midi Card — large landscape card with 3 wide well indicators */
export function IconMidiCard({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <rect x="3.5" y="7" width="5" height="10" rx="1" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9.5" y="7" width="5" height="10" rx="1" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.2" />
      <rect x="15.5" y="7" width="5" height="10" rx="1" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.2" />
      <text x="12" y="22.5" textAnchor="middle" fontSize="3.5" fill="currentColor" stroke="none" opacity=".6">4000 µL</text>
    </svg>
  );
}

/** Mini Card — medium card with 2 medium well indicators */
export function IconMiniCard({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <rect x="5.5" y="8" width="5.5" height="8" rx="1" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.2" />
      <rect x="13" y="8" width="5.5" height="8" rx="1" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.2" />
      <text x="12" y="22.5" textAnchor="middle" fontSize="3.5" fill="currentColor" stroke="none" opacity=".6">2000 µL</text>
    </svg>
  );
}

/** Multi-Strip Card — compact card with 4 small narrow well indicators */
export function IconMultiStripCard({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <rect x="5.5" y="8.5" width="2.8" height="7" rx=".8" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9.1" y="8.5" width="2.8" height="7" rx=".8" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.2" />
      <rect x="12.7" y="8.5" width="2.8" height="7" rx=".8" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.2" />
      <rect x="16.3" y="8.5" width="2.2" height="7" rx=".8" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.2" />
      <text x="12" y="22.5" textAnchor="middle" fontSize="3.5" fill="currentColor" stroke="none" opacity=".6">1000 µL</text>
    </svg>
  );
}


/** Org chart: Founder → C1 → R1/W1/S1 → Q1 → published. */
export function AgentOrgDiagram() {
  return (
    <svg
      viewBox="0 0 760 540"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Stratezik agent organisation: Founder briefs C1 Strategy Lead, who fans out to R1 Research, W1 Content, and S1 Outbound. Their work passes through Q1 QA Gate before being approved and published."
      className="w-full h-auto"
    >
      <defs>
        <marker id="agent-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(250,248,243,0.55)" />
        </marker>
        <filter id="agent-nshadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" />
          <feOffset dx="0" dy="3" result="off" />
          <feFlood floodColor="#000" floodOpacity="0.35" />
          <feComposite in2="off" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="agent-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="16" cy="16" r="0.8" fill="rgba(250,248,243,0.05)" />
        </pattern>
        <linearGradient id="founderbg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(250,248,243,0.10)" />
          <stop offset="100%" stopColor="rgba(250,248,243,0.04)" />
        </linearGradient>
        <linearGradient id="outpill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(122,31,31,0.25)" />
          <stop offset="100%" stopColor="rgba(122,31,31,0.12)" />
        </linearGradient>
      </defs>

      <rect width="760" height="540" fill="url(#agent-grid)" />

      <g fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="600" letterSpacing="0.14em" fill="rgba(250,248,243,0.35)">
        <text x="30" y="55" textAnchor="start">
          INPUT
        </text>
        <text x="30" y="155" textAnchor="start">
          STRATEGY
        </text>
        <text x="30" y="305" textAnchor="start">
          PRODUCTION
        </text>
        <text x="30" y="425" textAnchor="start">
          GATE
        </text>
        <text x="30" y="505" textAnchor="start">
          OUTPUT
        </text>
      </g>

      <g stroke="rgba(250,248,243,0.40)" strokeWidth="1.75" fill="none" strokeLinecap="round">
        <path d="M 380 80 L 380 110" markerEnd="url(#agent-arr)" />
        <path d="M 380 200 L 380 230" />
        <path d="M 160 230 L 600 230" />
        <path d="M 160 230 L 160 265" markerEnd="url(#agent-arr)" />
        <path d="M 380 230 L 380 265" markerEnd="url(#agent-arr)" />
        <path d="M 600 230 L 600 265" markerEnd="url(#agent-arr)" />
        <path d="M 160 345 L 160 380" />
        <path d="M 380 345 L 380 380" />
        <path d="M 600 345 L 600 380" />
        <path d="M 160 380 L 600 380" />
        <path d="M 380 380 L 380 405" markerEnd="url(#agent-arr)" />
        <path d="M 380 470 L 380 495" markerEnd="url(#agent-arr)" />
      </g>

      <g filter="url(#agent-nshadow)">
        <rect x="280" y="30" width="200" height="50" rx="12" fill="url(#founderbg)" stroke="rgba(250,248,243,0.30)" strokeWidth="1.5" />
        <text x="380" y="61" textAnchor="middle" fill="#faf8f3" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="15" fontWeight="600">
          Founder / Brief
        </text>
      </g>

      <g>
        <circle cx="380" cy="155" r="42" fill="#7a1f1f" filter="url(#agent-nshadow)" />
        <text x="380" y="164" textAnchor="middle" fill="#fff" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="20" fontWeight="700">
          C1
        </text>
        <text x="380" y="217" textAnchor="middle" fill="rgba(250,248,243,0.75)" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="12" fontWeight="500">
          Strategy Lead
        </text>
      </g>

      <g>
        <circle cx="160" cy="305" r="42" fill="#7a1f1f" filter="url(#agent-nshadow)" />
        <text x="160" y="314" textAnchor="middle" fill="#fff" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="20" fontWeight="700">
          R1
        </text>
        <text x="160" y="367" textAnchor="middle" fill="rgba(250,248,243,0.75)" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="12" fontWeight="500">
          Research Analyst
        </text>
      </g>

      <g>
        <circle cx="380" cy="305" r="42" fill="#047857" filter="url(#agent-nshadow)" />
        <text x="380" y="314" textAnchor="middle" fill="#fff" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="20" fontWeight="700">
          W1
        </text>
        <text x="380" y="367" textAnchor="middle" fill="rgba(250,248,243,0.75)" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="12" fontWeight="500">
          Content Writer
        </text>
      </g>

      <g>
        <circle cx="600" cy="305" r="42" fill="#6d28d9" filter="url(#agent-nshadow)" />
        <text x="600" y="314" textAnchor="middle" fill="#fff" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="20" fontWeight="700">
          S1
        </text>
        <text x="600" y="367" textAnchor="middle" fill="rgba(250,248,243,0.75)" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="12" fontWeight="500">
          Outbound SDR
        </text>
      </g>

      <g filter="url(#agent-nshadow)">
        <rect x="320" y="405" width="120" height="65" rx="14" fill="#d97706" />
        <text x="380" y="436" textAnchor="middle" fill="#fff" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="18" fontWeight="700">
          Q1
        </text>
        <text x="380" y="456" textAnchor="middle" fill="rgba(255,255,255,0.92)" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="11" fontWeight="600" letterSpacing="0.04em">
          QA GATE
        </text>
      </g>

      <g>
        <rect x="245" y="495" width="270" height="32" rx="16" fill="url(#outpill)" stroke="rgba(250,248,243,0.18)" strokeWidth="1" />
        <text x="380" y="516" textAnchor="middle" fill="#faf8f3" fontFamily="ui-monospace, monospace" fontSize="12" fontWeight="600" letterSpacing="0.10em">
          APPROVED → PUBLISHED
        </text>
      </g>
    </svg>
  )
}

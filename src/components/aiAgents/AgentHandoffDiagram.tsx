/** File-based handoff: queue → drafts → QA → approved / revise loop. */
export function AgentHandoffDiagram() {
  return (
    <svg
      viewBox="0 0 1000 220"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Handoff flow: queue to drafts to QA to approved"
      className="w-full h-auto min-w-[640px]"
    >
      <defs>
        <marker id="handoff-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
        </marker>
      </defs>
      <g fontFamily="ui-sans-serif, system-ui, sans-serif">
        <rect x="20" y="80" width="140" height="60" rx="10" fill="#faf8f3" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="90" y="105" textAnchor="middle" fill="#0d0c0a" fontSize="14" fontWeight="700">
          content/queue/
        </text>
        <text x="90" y="125" textAnchor="middle" fill="#64748b" fontSize="11">
          ticket brief
        </text>

        <path d="M 170 110 L 215 110" stroke="#94a3b8" strokeWidth="1.5" fill="none" markerEnd="url(#handoff-arr)" />

        <rect x="225" y="80" width="160" height="60" rx="10" fill="#ecfdf5" stroke="#047857" strokeWidth="1.5" />
        <text x="305" y="100" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="700">
          W1 drafts
        </text>
        <text x="305" y="120" textAnchor="middle" fill="#047857" fontSize="11">
          writes blog + sidecar JSON
        </text>
        <text x="305" y="135" textAnchor="middle" fill="#64748b" fontSize="10">
          → content/drafts/
        </text>

        <path d="M 395 110 L 440 110" stroke="#94a3b8" strokeWidth="1.5" fill="none" markerEnd="url(#handoff-arr)" />

        <rect x="450" y="80" width="160" height="60" rx="10" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
        <text x="530" y="100" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="700">
          Q1 reviews
        </text>
        <text x="530" y="120" textAnchor="middle" fill="#d97706" fontSize="11">
          voice / claims / SEO
        </text>
        <text x="530" y="135" textAnchor="middle" fill="#64748b" fontSize="10">
          → qa/reviews/
        </text>

        <path d="M 620 110 L 665 110" stroke="#94a3b8" strokeWidth="1.5" fill="none" markerEnd="url(#handoff-arr)" />

        <rect x="675" y="40" width="160" height="60" rx="10" fill="#fdf2f2" stroke="#7a1f1f" strokeWidth="1.5" />
        <text x="755" y="60" textAnchor="middle" fill="#7a1f1f" fontSize="13" fontWeight="700">
          approve
        </text>
        <text x="755" y="80" textAnchor="middle" fill="#7a1f1f" fontSize="11">
          → content/approved/
        </text>
        <text x="755" y="95" textAnchor="middle" fill="#64748b" fontSize="10">
          founder → publish
        </text>

        <rect x="675" y="120" width="160" height="60" rx="10" fill="#fef2f2" stroke="#be123c" strokeWidth="1.5" />
        <text x="755" y="140" textAnchor="middle" fill="#881337" fontSize="13" fontWeight="700">
          revise
        </text>
        <text x="755" y="160" textAnchor="middle" fill="#be123c" fontSize="11">
          → back to W1
        </text>
        <text x="755" y="175" textAnchor="middle" fill="#64748b" fontSize="10">
          numbered fix list
        </text>

        <rect x="225" y="180" width="385" height="30" rx="8" fill="#0d0c0a" />
        <text x="418" y="200" textAnchor="middle" fill="rgba(250,248,243,0.75)" fontSize="12" fontFamily="ui-monospace, monospace">
          every action logged → audit/YYYY-MM-DD.jsonl
        </text>
      </g>
    </svg>
  )
}

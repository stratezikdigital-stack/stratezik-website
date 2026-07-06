type Props = {
  label: string | null
  className?: string
}

export function ScanQuotaHint({ label, className = '' }: Props) {
  if (!label) return null
  return <p className={`font-mono text-[11px] text-ink-500 ${className}`.trim()}>{label}</p>
}

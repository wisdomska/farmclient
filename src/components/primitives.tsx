/** SVG primitives ported from the FarmClient.dc.html builder methods. */

export function Icon({ paths, size = 18, stroke = 'currentColor', strokeWidth = 1.5 }: { paths: string | string[]; size?: number; stroke?: string; strokeWidth?: number }) {
  const list = Array.isArray(paths) ? paths : [paths]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {list.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}

export function TrendArrow({ value, size = 13 }: { value: number; size?: number }) {
  const color = value > 0 ? 'var(--success)' : value < 0 ? 'var(--error)' : 'var(--text-secondary)'
  const d = value > 0 ? ['M7 17 17 7', 'M9 7h8v8'] : value < 0 ? ['M7 7 17 17', 'M17 9v8H9'] : ['M5 12h14']
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  )
}

export function Ring({ score, size }: { score: number; size: number }) {
  const r = (size - 8) / 2
  const c = 2 * Math.PI * r
  const frac = Math.min(score / 1000, 1)
  const off = c * (1 - frac)
  const cx = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--border)" strokeWidth={6} />
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--primary)" strokeWidth={6} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} transform={`rotate(-90 ${cx} ${cx})`} />
    </svg>
  )
}

export function Spark({ data, w, h, color = 'var(--primary)', fill = false }: { data: number[]; w: number; h: number; color?: string; fill?: boolean }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const rng = max - min || 1
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 4 - ((v - min) / rng) * (h - 8)])
  const line = 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      {fill && <path d={`${line} L ${w} ${h} L 0 ${h} Z`} fill={color} opacity={0.12} stroke="none" />}
      <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const CROP_GLYPHS: Record<string, string[]> = {
  Yam: ['M12 2c-2 3-6 4-6 9a6 6 0 0 0 12 0c0-5-4-6-6-9z'],
  Tomato: ['M12 8a5 5 0 1 0 0 10 5 5 0 0 0 0-10z', 'M12 8c0-2 1-3 3-3', 'M12 8c0-2-1-3-3-3'],
  Maize: ['M12 3c3 0 5 3 5 8s-2 9-5 9-5-4-5-9 2-8 5-8z', 'M12 3v17'],
  Plantain: ['M5 14c0-5 4-9 9-9 3 0 5 2 5 5 0 5-4 9-9 9-3 0-5-2-5-5z'],
  Cassava: ['M6 4c4 2 8 8 12 16', 'M6 4c-1 3 0 6 2 8', 'M18 20c1-3 0-6-2-8'],
  Pepper: ['M14 5c2 0 3 1 3 3 0 5-4 11-9 11a4 4 0 0 1-4-4c0-1 1-2 2-2', 'M14 5c0-2 1-3 3-3'],
  Onion: ['M12 4c-3 0-6 3-6 8a6 6 0 0 0 12 0c0-5-3-8-6-8z', 'M12 4v-2'],
  Rice: ['M12 3c2 2 3 5 3 9s-1 7-3 9c-2-2-3-5-3-9s1-7 3-9z'],
  Soybean: ['M8 8a3 3 0 1 0 0 6', 'M14 10a3 3 0 1 0 0 6', 'M8 11h6'],
  Sorghum: ['M12 3v18', 'M12 7c2 0 4-1 4-3', 'M12 7c-2 0-4-1-4-3', 'M12 12c2 0 4-1 4-3', 'M12 12c-2 0-4-1-4-3'],
}

export function CropGlyph({ crop, size = 40 }: { crop: string; size?: number }) {
  return <Icon paths={CROP_GLYPHS[crop] || ['M12 2v20']} size={size} />
}

export function SunIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={4} />
      {['M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41'].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}

export function MoonIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export function StarIcon({ filled, size = 13 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'var(--primary)' : 'none'} stroke={filled ? 'var(--primary)' : 'var(--text-tertiary)'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  )
}

export function StarSolid({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  )
}

/** The FarmClient leaf logo mark. */
export function Logo({ size = 19, box = 30, radius = 8 }: { size?: number; box?: number; radius?: number }) {
  return (
    <div className="flex items-center justify-center bg-primary" style={{ width: box, height: box, borderRadius: radius }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--primary-text)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </svg>
    </div>
  )
}

import { Ring } from './primitives'
import { farmScoreTier, farmScoreTierLabel } from '../lib/farmScore'

/**
 * The single canonical FarmScore treatment: progress ring + raw 0–1000 score
 * + qualitative tier label. Every trust-score surface renders this component —
 * never a bare unlabeled number.
 */
export function FarmScore({
  score,
  size = 64,
  showLabel = true,
}: {
  score: number
  size?: number
  showLabel?: boolean
}) {
  const tierText = farmScoreTierLabel(farmScoreTier(score))
  const numSize = size >= 100 ? 24 : size >= 80 ? 22 : size >= 48 ? 16 : 10
  const showCaption = showLabel && size >= 80
  const showTier = showLabel && size >= 48
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
      title={`Trust score ${score} · ${tierText}`}
    >
      <Ring score={score} size={size} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-ink" style={{ fontSize: numSize, lineHeight: 1.2 }}>{score}</span>
        {showCaption && (
          <span className="text-ink3 tracking-[0.04em]" style={{ fontSize: 9 }}>TRUST SCORE</span>
        )}
        {showTier && (
          <span className="text-ink2" style={{ fontSize: size >= 100 ? 11 : 9 }}>{tierText}</span>
        )}
      </div>
    </div>
  )
}

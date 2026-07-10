/**
 * Canonical FarmScore scale: a raw 0–1000 score mapped to a qualitative tier.
 * Every surface that shows a trust score must go through these helpers so the
 * number, tier label and treatment are identical everywhere.
 */
export type FarmScoreTier = 'excellent' | 'good' | 'fair' | 'building'

export const FARM_SCORE_MAX = 1000

export function farmScoreTier(score: number): FarmScoreTier {
  if (score >= 850) return 'excellent'
  if (score >= 700) return 'good'
  if (score >= 500) return 'fair'
  return 'building'
}

export function farmScoreTierLabel(tier: FarmScoreTier): string {
  return {
    excellent: 'Excellent',
    good: 'Very good',
    fair: 'Fair',
    building: 'Building trust',
  }[tier]
}

/** Fallback score for the demo farmer when no live API score is available. */
export const DEMO_FARMER_SCORE = 780

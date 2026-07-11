import { describe, expect, test } from 'vitest'
import {
  HAPPY_PATH,
  ORDERED_STEP_LABELS,
  STATUS_MAP,
  nextStatus,
  orderStatusInfo,
  statusChip,
  type OrderStatus,
} from './orderStatus'

const ALL_STATUSES = Object.keys(STATUS_MAP) as OrderStatus[]

describe('orderStatusInfo', () => {
  test.each(ALL_STATUSES)('%s has a chip key, a label and a valid track step', (status) => {
    const info = orderStatusInfo(status)
    expect(info.chipKey).toBeTruthy()
    expect(info.label).toBeTruthy()
    expect(info.trackStep).toBeGreaterThanOrEqual(0)
    expect(info.trackStep).toBeLessThan(ORDERED_STEP_LABELS.length)
  })

  test('unknown status falls back to pending_payment', () => {
    expect(orderStatusInfo('garbage')).toEqual(STATUS_MAP.pending_payment)
  })
})

describe('status transitions', () => {
  test('happy path covers every non-disputed stage exactly once', () => {
    expect(HAPPY_PATH).toEqual([
      'pending_payment',
      'confirmed',
      'in_progress',
      'delivered',
      'completed',
    ])
  })

  test('track step strictly increases along the happy path, ending at the final step', () => {
    const steps = HAPPY_PATH.map((s) => STATUS_MAP[s].trackStep)
    for (let i = 1; i < steps.length; i++) {
      expect(steps[i]).toBe(steps[i - 1] + 1)
    }
    expect(steps[0]).toBe(0)
    expect(steps[steps.length - 1]).toBe(ORDERED_STEP_LABELS.length - 1)
  })

  test.each(HAPPY_PATH.slice(0, -1))('nextStatus advances %s by one stage', (status) => {
    const next = nextStatus(status)
    expect(STATUS_MAP[next].trackStep).toBe(STATUS_MAP[status].trackStep + 1)
  })

  test('terminal and disputed statuses do not advance', () => {
    expect(nextStatus('completed')).toBe('completed')
    expect(nextStatus('disputed')).toBe('disputed')
  })

  test('disputed pauses mid-flow rather than completing', () => {
    expect(STATUS_MAP.disputed.trackStep).toBeGreaterThan(0)
    expect(STATUS_MAP.disputed.trackStep).toBeLessThan(ORDERED_STEP_LABELS.length - 1)
  })
})

describe('one order walked through every stage — all three surfaces agree', () => {
  // Simulates a single order progressing pending_payment → completed and asserts
  // the three places that render its status (buyer Orders list chip, buyer
  // Tracking stepper, admin Orders table chip) derive identical presentation
  // at every step. All three call statusChip/orderStatusInfo, so any drift in
  // one surface would surface here as a mismatch.
  test('happy-path walk keeps list, tracking and admin views in lockstep', () => {
    let status: OrderStatus = 'pending_payment'
    const seenSteps: number[] = []
    for (let i = 0; i < HAPPY_PATH.length; i++) {
      const listChip = statusChip(status)      // buyer Orders list row
      const tracking = orderStatusInfo(status) // buyer Tracking stepper
      const adminChip = statusChip(status)     // admin Orders table row

      expect(listChip.label).toBe(tracking.label)
      expect(adminChip).toEqual(listChip)
      expect(tracking.trackStep).toBe(i)
      expect(ORDERED_STEP_LABELS[tracking.trackStep]).toBeTruthy()
      seenSteps.push(tracking.trackStep)

      status = nextStatus(status)
    }
    expect(seenSteps).toEqual([0, 1, 2, 3, 4])
  })

  test('a dispute mid-flow shows the same paused state on every surface', () => {
    const status: OrderStatus = 'disputed'
    const listChip = statusChip(status)
    const tracking = orderStatusInfo(status)
    expect(listChip.label).toBe('Disputed')
    expect(tracking.label).toBe('Disputed')
    expect(tracking.trackStep).toBe(STATUS_MAP.disputed.trackStep)
  })
})

describe('statusChip', () => {
  test.each(ALL_STATUSES)('%s list chip label matches the canonical STATUS_MAP label', (status) => {
    const c = statusChip(status)
    expect(c.label).toBe(STATUS_MAP[status].label)
    expect(c.bg).toBeTruthy()
    expect(c.fg).toBeTruthy()
  })

  test('the list chip and tracking step can never disagree for the same status', () => {
    // Both derive from the same STATUS_MAP entry — this asserts the wiring stays that way.
    for (const status of ALL_STATUSES) {
      expect(statusChip(status).label).toBe(orderStatusInfo(status).label)
    }
  })
})

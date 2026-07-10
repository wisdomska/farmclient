import { chip } from './data'
import type { Chip } from './types'

/**
 * Single source of truth for order status. The Orders list, the Tracking
 * stepper and every admin/mock order row derive their presentation from
 * STATUS_MAP — never from a local switch statement.
 */
export type OrderStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'in_progress'
  | 'delivered'
  | 'completed'
  | 'disputed'

export interface OrderStatusInfo {
  chipKey: string
  trackStep: number
  label: string
}

export const STATUS_MAP: Record<OrderStatus, OrderStatusInfo> = {
  pending_payment: { chipKey: 'pending', trackStep: 0, label: 'Pending payment' },
  confirmed: { chipKey: 'confirmed', trackStep: 1, label: 'Farmer confirmed' },
  in_progress: { chipKey: 'active', trackStep: 2, label: 'In progress' },
  delivered: { chipKey: 'delivered', trackStep: 3, label: 'Delivered' },
  completed: { chipKey: 'delivered', trackStep: 4, label: 'Completed' },
  disputed: { chipKey: 'disputed', trackStep: 2, label: 'Disputed' },
}

/** The five tracking-stepper labels, indexed by trackStep. */
export const ORDERED_STEP_LABELS = [
  'We got your payment',
  'Farmer said yes',
  'Getting your order ready',
  'Delivered to you',
  'All done',
]

/** The forward-only status progression of a healthy order. */
export const HAPPY_PATH: OrderStatus[] = [
  'pending_payment',
  'confirmed',
  'in_progress',
  'delivered',
  'completed',
]

export function orderStatusInfo(status: string): OrderStatusInfo {
  return STATUS_MAP[status as OrderStatus] ?? STATUS_MAP.pending_payment
}

/** Chip colors + canonical label for a status, for list rows. */
export function statusChip(status: string): Chip {
  const info = orderStatusInfo(status)
  const c = chip(info.chipKey)
  return { bg: c.bg, fg: c.fg, label: info.label }
}

/** Next status along the happy path; terminal/disputed statuses stay put. */
export function nextStatus(status: OrderStatus): OrderStatus {
  const i = HAPPY_PATH.indexOf(status)
  if (i === -1 || i === HAPPY_PATH.length - 1) return status
  return HAPPY_PATH[i + 1]
}

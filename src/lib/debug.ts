/**
 * Single gate for all dev/QA-only UI (prototype Toolbar, dev role switcher).
 * True in local dev builds, or in any build when `?debug=1` is present.
 * Nothing user-facing may depend on this in production.
 */
export const debugMode =
  import.meta.env.DEV ||
  (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug'))

import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../store'
import type { Role } from '../lib/types'

/** Each role's shell home — used when a signed-in user hits another role's routes. */
// eslint-disable-next-line react-refresh/only-export-components
export function roleHome(role: Role): string {
  switch (role) {
    case 'farmer':
      return '/farmer'
    case 'admin':
    case 'superadmin':
      return '/admin'
    default:
      return '/app'
  }
}

/**
 * Route-level auth + role gate.
 * - Unauthenticated → /sign-in, preserving the intended destination.
 * - Authenticated but wrong role → that user's own shell home (no 404 leak).
 * The role comes from the server-verified session (JWT re-verified on boot via
 * /auth/refresh) — never from a query param or ad-hoc client state.
 */
export function RequireRole({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { state } = useStore()
  const location = useLocation()

  if (state.authStatus === 'idle' || state.authStatus === 'checking') {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - var(--toolbar-h))' }}>
        <div className="fc-spin w-[40px] h-[40px] border-[3px] border-line border-t-primary rounded-full" />
      </div>
    )
  }

  if (state.authStatus !== 'authed' || !state.role) {
    const dest = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/sign-in?redirect=${dest}`} replace />
  }

  if (!roles.includes(state.role)) {
    return <Navigate to={roleHome(state.role)} replace />
  }

  return <>{children}</>
}

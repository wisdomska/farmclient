import { Outlet } from 'react-router-dom'
import { RequireRole } from '../components/RequireRole'

/**
 * Buyer shell. Each buyer screen renders its own TopBar (props vary per
 * screen), so this layout only supplies the role gate.
 */
export function BuyerLayout() {
  return (
    <RequireRole roles={['buyer']}>
      <Outlet />
    </RequireRole>
  )
}

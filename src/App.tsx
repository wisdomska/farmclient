import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useStore } from './store'
import { debugMode } from './lib/debug'
import { Toolbar } from './components/Toolbar'
import { Toast } from './components/Toast'

export default function App() {
  const { state } = useStore()
  const location = useLocation()

  // Preserve the old go()-behavior: land at the top of each new screen.
  useEffect(() => {
    try {
      window.scrollTo(0, 0)
    } catch {
      /* noop */
    }
  }, [location.pathname])

  return (
    <div
      data-theme={state.theme}
      className="min-h-screen bg-bg font-sans text-ink antialiased"
      style={{ ['--toolbar-h' as string]: debugMode ? '46px' : '0px' }}
    >
      {debugMode && <Toolbar />}
      <Outlet />
      <Toast />
    </div>
  )
}

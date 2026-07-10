import { Link } from 'react-router-dom'
import { Logo } from '../components/primitives'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-[18px]" style={{ minHeight: 'calc(100vh - var(--toolbar-h))' }}>
      <Logo size={22} box={40} radius={10} />
      <div className="text-[24px] tracking-[-0.02em] text-ink">Page not found</div>
      <div className="text-[14px] text-ink2">That page doesn't exist or has moved.</div>
      <Link
        to="/"
        className="bg-primary text-primary-ink border-none rounded-[8px] px-[20px] py-[12px] text-[14px] no-underline hover:opacity-[0.88]"
      >
        Back to FarmClient
      </Link>
    </div>
  )
}

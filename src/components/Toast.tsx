import { useFarm } from '../lib/derive'

export function Toast() {
  const { toast } = useFarm()
  if (!toast) return null
  return (
    <div className="fixed bottom-7 left-1/2 z-[200] flex max-w-[90vw] -translate-x-1/2 items-center gap-[10px] rounded-[10px] bg-ink px-[18px] py-[13px] text-[14px] text-bg">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span>{toast}</span>
    </div>
  )
}

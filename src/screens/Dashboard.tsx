import { useFarm } from '../lib/derive'
import { TrendArrow } from '../components/primitives'
import { TopBar, ListingCard } from '../components/shared'

export function Dashboard() {
  const f = useFarm()

  return (
    <div>
      <TopBar active="dashboard" showSearch showNotif />

      {/* price ticker */}
      <div className="border-b border-line overflow-hidden bg-surface">
        <div className="fc-ticker flex w-max">
          {/* first copy */}
          <div className="flex">
            {f.ticker.map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-[22px] py-[11px] border-r border-line whitespace-nowrap"
              >
                <span className="text-[13px] text-ink2">{t.crop}</span>
                <span className="text-[13px] text-ink">{t.priceStr}</span>
                <span
                  className="inline-flex items-center gap-[3px] text-[12px]"
                  style={{ color: t.color }}
                >
                  <TrendArrow value={t.trend} size={12} />
                  {t.trendStr}
                </span>
              </div>
            ))}
          </div>
          {/* second copy for seamless loop */}
          <div className="flex" aria-hidden="true">
            {f.ticker.map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-[22px] py-[11px] border-r border-line whitespace-nowrap"
              >
                <span className="text-[13px] text-ink2">{t.crop}</span>
                <span className="text-[13px] text-ink">{t.priceStr}</span>
                <span
                  className="inline-flex items-center gap-[3px] text-[12px]"
                  style={{ color: t.color }}
                >
                  <TrendArrow value={t.trend} size={12} />
                  {t.trendStr}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-[28px] pt-[32px] pb-[64px]">
        <div className="mb-2 text-[13px] text-ink2">Good morning, Kwame</div>
        <h1 className="text-[28px] tracking-[-0.02em] font-normal mt-0 mb-[28px]">
          Golden Fork Restaurant Group
        </h1>

        {/* quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-[36px]">
          {f.quickStats.map((q, i) => (
            <div
              key={i}
              className="bg-surface border border-line rounded-[8px] p-[20px]"
            >
              <div className="text-[13px] text-ink2 mb-2">{q.label}</div>
              <div className="text-[26px] tracking-[-0.02em] text-ink">{q.value}</div>
            </div>
          ))}
        </div>

        {/* recommended */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[19px] font-normal tracking-[-0.01em] m-0">
            Recommended for you
          </h2>
          <span
            onClick={f.goMarketplace}
            className="text-[13px] text-primary cursor-pointer inline-flex items-center gap-[5px]"
          >
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
        <div className="fcscroll grid grid-cols-4 gap-4 mb-[36px]">
          {f.recommended.map((l) => (
            <ListingCard key={l.id} l={l} />
          ))}
        </div>

        {/* crop filter tabs */}
        <div className="fcscroll flex gap-[10px] overflow-x-auto mb-[36px] pb-1">
          {f.cropTabs.map((c, i) => (
            <button
              key={i}
              onClick={c.onClick}
              className={[
                'rounded-full px-4 py-2 text-[13px] border transition-colors',
                c.active
                  ? 'bg-primary text-primary-ink border-primary'
                  : 'bg-transparent text-ink2 border-line',
              ].join(' ')}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* active orders */}
        <h2 className="text-[19px] font-normal tracking-[-0.01em] mt-0 mb-4">
          Active orders
        </h2>
        <div className="flex flex-col gap-3">
          {f.orders.map((o) => (
            <div
              key={o.id}
              className="flex items-center gap-5 bg-surface border border-line rounded-[8px] px-5 py-[18px]"
            >
              <span className="text-[12px] font-mono text-ink3 w-[84px]">{o.id}</span>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[12px]"
                style={{ background: o.bg, color: o.fg }}
              >
                {o.label}
              </span>
              <div className="flex-1">
                <span className="text-[14px] text-ink">{o.crop}</span>
                <span className="text-[13px] text-ink2"> · {o.qtyStr} · {o.farmer}</span>
              </div>
              <span className="text-[15px] text-ink">{o.totalStr}</span>
              <button
                onClick={f.goTracking}
                className="bg-transparent border border-line rounded-[6px] px-[14px] py-2 text-[13px] text-ink cursor-pointer hover:border-primary hover:text-primary transition-colors"
              >
                Track
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

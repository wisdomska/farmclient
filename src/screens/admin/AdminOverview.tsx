import { useFarm } from '../../lib/derive'
import { Icon, Spark } from '../../components/primitives'

export function AdminOverview() {
  const f = useFarm()

  return (
    <div>
      <div className="flex items-center justify-between mb-[26px]">
        <div>
          <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Overview</h1>
          <span className="text-[13px] text-ink2">Platform health · last 30 days</span>
        </div>
        <div className="flex items-center gap-[8px] bg-surface border border-line rounded-[8px] px-[13px] py-[9px] text-[13px] text-ink cursor-pointer">
          Jun 2026
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {f.kpis.map((k) => (
          <div key={k.label} className="bg-surface border border-line rounded-[8px] p-[20px]">
            <div className="flex items-center justify-between mb-[16px] text-ink3">
              <span><Icon paths={k.iconPaths} size={20} /></span>
              <span className="text-[11px] text-success">{k.delta}</span>
            </div>
            <div className="text-[24px] tracking-[-0.02em] text-ink mb-[4px] whitespace-nowrap">{k.value}</div>
            <div className="text-[13px] text-ink2">{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="bg-surface border border-line rounded-[8px] p-[22px]">
          <div className="flex items-center justify-between mb-[18px]">
            <span className="text-[15px] text-ink">Daily settled volume</span>
            <span className="text-[13px] text-ink2">GHS · 14 days</span>
          </div>
          <div className="w-full">
            <Spark data={f.revenue} w={640} h={150} color="var(--primary)" fill />
          </div>
        </div>

        <div className="bg-surface border border-line rounded-[8px] p-[22px]">
          <div className="text-[15px] text-ink mb-[16px]">Top crops</div>
          <div className="flex flex-col gap-[2px]">
            {f.topCrops.map((c) => (
              <div key={c.crop} className="flex items-center justify-between py-[9px] border-b border-line">
                <span className="text-[13.5px] text-ink">{c.crop}</span>
                <div className="text-right">
                  <div className="text-[13px] text-ink">{c.val}</div>
                  <div className="text-[11px] text-ink3">{c.vol}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-line rounded-[8px] p-[22px]">
        <div className="flex items-center justify-between mb-[16px]">
          <span className="text-[15px] text-ink">Disputes queue</span>
          <span className="text-[11px] bg-error-dim text-error px-[10px] py-[4px] rounded-[20px]">2 open</span>
        </div>
        <div className="flex flex-col gap-[10px]">
          {f.disputes.map((d) => (
            <div key={d.id} className="flex items-center gap-[16px] px-[14px] py-[12px] border border-line rounded-[8px]">
              <span className="text-[12px] font-mono text-ink3" style={{ width: 78 }}>{d.id}</span>
              <div className="flex-1">
                <span className="text-[13.5px] text-ink">{d.buyer}</span>
                <span className="text-[13px] text-ink2"> vs {d.farmer} · {d.reason}</span>
              </div>
              <button
                onClick={f.resolveDispute}
                className="bg-primary text-primary-ink border-none rounded-[6px] px-[14px] py-[7px] text-[12.5px] cursor-pointer font-[inherit]"
              >
                Resolve
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

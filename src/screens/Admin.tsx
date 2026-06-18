import { useFarm } from '../lib/derive'
import { Icon, Spark } from '../components/primitives'

export function Admin() {
  const f = useFarm()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 46px)' }}>
      {/* Sidebar */}
      <aside className="bg-surface border-r border-line flex flex-col px-[16px] py-[24px]">
        <div className="flex items-center gap-[9px] px-[8px] mb-[28px]">
          <div
            className="bg-primary flex items-center justify-center flex-shrink-0"
            style={{ width: 28, height: 28, borderRadius: 7 }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--primary-text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 20h10"/>
              <path d="M10 20c5.5-2.5.8-6.4 3-10"/>
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
            </svg>
          </div>
          <span className="text-[16px] tracking-[-0.02em] text-ink">FarmClient</span>
          <span className="text-[9px] tracking-[0.06em] uppercase text-ink3 border border-line rounded-[20px] px-[7px] py-[2px]">Admin</span>
        </div>

        <div className="flex flex-col gap-[2px]">
          {f.adminNav.map((n) => (
            <button
              key={n.key}
              onClick={n.onClick}
              className={`text-left px-[12px] py-[9px] rounded-[7px] text-[13.5px] border-none cursor-pointer font-[inherit] ${n.active ? 'bg-primary-dim text-primary' : 'bg-transparent text-ink2'}`}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-[10px] px-[8px] py-[10px] border-t border-line">
          <div
            className="bg-surface2 border border-line flex items-center justify-center text-[12px] text-ink2 flex-shrink-0"
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          >
            SA
          </div>
          <div>
            <div className="text-[13px] text-ink">Super Admin</div>
            <div className="text-[11px] text-ink3">Accra HQ</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="px-[32px] pt-[28px] pb-[56px] overflow-y-auto">

        {/* OVERVIEW */}
        {f.isAdminOverview && (
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
        )}

        {/* SMS BROADCAST */}
        {f.isAdminSms && (
          <div style={{ maxWidth: 760 }}>
            <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">SMS broadcast</h1>
            <span className="text-[13px] text-ink2">Send price updates and news to farmers by text</span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, marginTop: 26 }}>
              <div>
                <label className="block text-[13px] text-ink2 mb-[8px]">Message</label>
                <textarea
                  className="w-full bg-surface border border-line rounded-[8px] p-[14px] text-[14px] text-ink font-[inherit] outline-none leading-[1.6] resize-none focus:border-primary"
                  style={{ height: 130 }}
                  defaultValue="FarmClient: Yam is GHS 4.20/kg today in Bono East, up 3.2%. Dial *789# to list your harvest."
                />
                <div className="flex justify-between text-[12px] text-ink3 mt-[8px]">
                  <span>1 SMS segment · 132 / 160 chars</span>
                  <span>Sent by text message</span>
                </div>
                <button
                  onClick={f.sendBroadcast}
                  className="mt-[18px] inline-flex items-center gap-[9px] bg-primary text-primary-ink border-none rounded-[8px] px-[22px] py-[13px] text-[14px] cursor-pointer font-[inherit]"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13"/>
                    <path d="M22 2 15 22l-4-9-9-4 20-7z"/>
                  </svg>
                  Send broadcast
                </button>
              </div>

              <div>
                <label className="block text-[13px] text-ink2 mb-[8px]">Recipients</label>
                <div className="flex flex-col gap-[8px]">
                  <label className="flex items-center gap-[10px] bg-surface border border-primary rounded-[8px] px-[14px] py-[12px] text-[13.5px] text-ink cursor-pointer">
                    <span className="border border-primary flex items-center justify-center flex-shrink-0" style={{ width: 16, height: 16, borderRadius: '50%' }}>
                      <span className="bg-primary" style={{ width: 8, height: 8, borderRadius: '50%' }} />
                    </span>
                    All farmers · 2.04M
                  </label>
                  <label className="flex items-center gap-[10px] bg-surface border border-line rounded-[8px] px-[14px] py-[12px] text-[13.5px] text-ink2 cursor-pointer">
                    <span className="border border-line flex-shrink-0" style={{ width: 16, height: 16, borderRadius: '50%' }} />
                    By region
                  </label>
                  <label className="flex items-center gap-[10px] bg-surface border border-line rounded-[8px] px-[14px] py-[12px] text-[13.5px] text-ink2 cursor-pointer">
                    <span className="border border-line flex-shrink-0" style={{ width: 16, height: 16, borderRadius: '50%' }} />
                    By crop
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-[28px]">
              <div className="text-[15px] text-ink mb-[14px]">Delivery log</div>
              <div className="border border-line rounded-[8px] overflow-hidden">
                <div
                  className="bg-surface text-[12px] text-ink3 tracking-[0.04em] uppercase px-[16px] py-[12px]"
                  style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 0.8fr' }}
                >
                  <span>Recipient</span>
                  <span>Crop</span>
                  <span>Status</span>
                  <span>Time</span>
                </div>
                {f.smsLog.map((m) => (
                  <div
                    key={m.to}
                    className="border-t border-line px-[16px] py-[13px] text-[13.5px] items-center"
                    style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 0.8fr' }}
                  >
                    <span className="text-ink font-mono text-[12.5px]">{m.to}</span>
                    <span className="text-ink2">{m.crop}</span>
                    <span className="text-ink2">{m.status}</span>
                    <span className="text-ink3">{m.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {f.isAdminUsers && (
          <div>
            <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Users</h1>
            <span className="text-[13px] text-ink2">Farmers, buyers and field helpers on FarmClient</span>
            <div className="border border-line rounded-[8px] overflow-hidden mt-[22px]">
              <div
                className="bg-surface text-[12px] text-ink3 tracking-[0.04em] uppercase px-[18px] py-[12px]"
                style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1.4fr 1fr 0.9fr' }}
              >
                <span>Name</span>
                <span>Role</span>
                <span>Location</span>
                <span>Joined</span>
                <span>Status</span>
              </div>
              {f.usersRows.map((u) => (
                <div
                  key={u.name}
                  className="border-t border-line px-[18px] py-[14px] text-[13.5px] items-center"
                  style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1.4fr 1fr 0.9fr' }}
                >
                  <span className="text-ink">{u.name}</span>
                  <span className="text-ink2">{u.role}</span>
                  <span className="text-ink2">{u.loc}</span>
                  <span className="text-ink3">{u.joined}</span>
                  <span
                    className="justify-self-start text-[11px] rounded-full px-[10px] py-1"
                    style={{ background: u.bg, color: u.fg }}
                  >
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LISTINGS */}
        {f.isAdminListings && (
          <div>
            <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Listings</h1>
            <span className="text-[13px] text-ink2">Every crop on sale right now</span>
            <div className="border border-line rounded-[8px] overflow-hidden mt-[22px]">
              <div
                className="bg-surface text-[12px] text-ink3 tracking-[0.04em] uppercase px-[18px] py-[12px]"
                style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.2fr 1.2fr 0.9fr 1fr 0.8fr' }}
              >
                <span>Crop</span>
                <span>Farmer</span>
                <span>District</span>
                <span>Price/kg</span>
                <span>Available</span>
                <span>Status</span>
              </div>
              {f.adminListings.map((l) => (
                <div
                  key={l.id}
                  className="border-t border-line px-[18px] py-[12px] text-[13.5px] items-center"
                  style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.2fr 1.2fr 0.9fr 1fr 0.8fr' }}
                >
                  <div className="flex items-center gap-[10px]">
                    <div className="bg-surface2 rounded-[6px] overflow-hidden flex-shrink-0" style={{ width: 34, height: 34 }}>
                      {l.photo && (
                        <img src={l.photo} alt={l.crop} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      )}
                    </div>
                    <span className="text-ink">{l.crop}</span>
                  </div>
                  <span className="text-ink">{l.farmer}</span>
                  <span className="text-ink2">{l.district}</span>
                  <span className="text-ink">{l.priceStr}</span>
                  <span className="text-ink2">{l.qtyStr}</span>
                  <span className="justify-self-start text-[11px] rounded-full px-[10px] py-1" style={{ background: 'var(--primary-dim)', color: 'var(--primary)' }}>On sale</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {f.isAdminOrders && (
          <div>
            <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Orders</h1>
            <span className="text-[13px] text-ink2">All buyer orders and where they are now</span>
            <div className="border border-line rounded-[8px] overflow-hidden mt-[22px]">
              <div
                className="bg-surface text-[12px] text-ink3 tracking-[0.04em] uppercase px-[18px] py-[12px]"
                style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.6fr 1.2fr 1fr 1fr' }}
              >
                <span>Order</span>
                <span>Crop</span>
                <span>Buyer</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {f.ordersRows.map((o) => (
                <div
                  key={o.id}
                  className="border-t border-line px-[18px] py-[14px] text-[13.5px] items-center"
                  style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.6fr 1.2fr 1fr 1fr' }}
                >
                  <span className="text-ink3 font-mono text-[12px]">{o.id}</span>
                  <span className="text-ink">{o.crop}</span>
                  <span className="text-ink2">{o.who}</span>
                  <span className="text-ink">{o.amt}</span>
                  <span
                    className="justify-self-start text-[11px] rounded-full px-[10px] py-1"
                    style={{ background: o.bg, color: o.fg }}
                  >
                    {o.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAYMENTS */}
        {f.isAdminPayments && (
          <div>
            <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Payments</h1>
            <span className="text-[13px] text-ink2">Money paid in and out of FarmClient</span>
            <div className="border border-line rounded-[8px] overflow-hidden mt-[22px]">
              <div
                className="bg-surface text-[12px] text-ink3 tracking-[0.04em] uppercase px-[18px] py-[12px]"
                style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.4fr 1.3fr 1fr 1fr' }}
              >
                <span>Reference</span>
                <span>Type</span>
                <span>Person</span>
                <span>Amount</span>
                <span>Date</span>
              </div>
              {f.paymentsRows.map((p) => (
                <div
                  key={p.ref}
                  className="border-t border-line px-[18px] py-[14px] text-[13.5px] items-center"
                  style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.4fr 1.3fr 1fr 1fr' }}
                >
                  <span className="text-ink3 font-mono text-[12px]">{p.ref}</span>
                  <span className="text-ink">{p.type}</span>
                  <span className="text-ink2">{p.who}</span>
                  <span className="text-ink">{p.amt}</span>
                  <span className="text-ink3">{p.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {f.isAdminSettings && (
          <div style={{ maxWidth: 620 }}>
            <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Settings</h1>
            <span className="text-[13px] text-ink2">How FarmClient works behind the scenes</span>
            <div className="border border-line rounded-[8px] p-[24px] mt-[22px] flex flex-col gap-[22px]">
              <div>
                <label className="block text-[13px] text-ink2 mb-[7px]">Service fee charged to buyers</label>
                <div className="flex items-center gap-[8px]">
                  <input
                    defaultValue="1.5"
                    className="bg-surface border border-line rounded-[8px] px-[13px] py-[11px] text-[14px] text-ink font-[inherit] outline-none"
                    style={{ width: 90 }}
                  />
                  <span className="text-[14px] text-ink2">%</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-line pt-[20px]">
                <div>
                  <div className="text-[14px] text-ink">Suggest fair prices to farmers</div>
                  <div className="text-[12.5px] text-ink2 mt-[2px]">Show a suggested price when a farmer adds a crop</div>
                </div>
                <span className="bg-primary relative flex-shrink-0" style={{ width: 38, height: 22, borderRadius: 20 }}>
                  <span className="bg-primary-ink absolute" style={{ top: 2, right: 2, width: 18, height: 18, borderRadius: '50%' }} />
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-line pt-[20px]">
                <div>
                  <div className="text-[14px] text-ink">Send a text after every order</div>
                  <div className="text-[12.5px] text-ink2 mt-[2px]">Farmers and buyers get an update by SMS</div>
                </div>
                <span className="bg-primary relative flex-shrink-0" style={{ width: 38, height: 22, borderRadius: 20 }}>
                  <span className="bg-primary-ink absolute" style={{ top: 2, right: 2, width: 18, height: 18, borderRadius: '50%' }} />
                </span>
              </div>

              <div className="border-t border-line pt-[20px]">
                <label className="block text-[13px] text-ink2 mb-[7px]">Text sender name</label>
                <input
                  defaultValue="FarmClient"
                  className="bg-surface border border-line rounded-[8px] px-[13px] py-[11px] text-[14px] text-ink font-[inherit] outline-none max-w-full"
                  style={{ width: 240 }}
                />
              </div>

              <button
                onClick={f.saveSettings}
                className="self-start bg-primary text-primary-ink border-none rounded-[8px] px-[22px] py-[12px] text-[14px] cursor-pointer font-[inherit]"
              >
                Save settings
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

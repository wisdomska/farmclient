import { useFarm } from '../../lib/derive'
import { FarmScore } from '../../components/FarmScore'

export function AdminUsers() {
  const f = useFarm()

  return (
    <div>
      <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Users</h1>
      <span className="text-[13px] text-ink2">Farmers, buyers and field helpers on FarmClient</span>
      <div className="border border-line rounded-[8px] overflow-hidden mt-[22px]">
        <div
          className="bg-surface text-[12px] text-ink3 tracking-[0.04em] uppercase px-[18px] py-[12px]"
          style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1.4fr 1fr 0.7fr 0.9fr' }}
        >
          <span>Name</span>
          <span>Role</span>
          <span>Location</span>
          <span>Joined</span>
          <span>Score</span>
          <span>Status</span>
        </div>
        {f.usersRows.map((u) => (
          <div
            key={u.name}
            className="border-t border-line px-[18px] py-[14px] text-[13.5px] items-center"
            style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1.4fr 1fr 0.7fr 0.9fr' }}
          >
            <span className="text-ink">{u.name}</span>
            <span className="text-ink2">{u.role}</span>
            <span className="text-ink2">{u.loc}</span>
            <span className="text-ink3">{u.joined}</span>
            <span>
              {u.score !== null ? (
                <FarmScore score={u.score} size={30} showLabel={false} />
              ) : (
                <span className="text-ink3">—</span>
              )}
            </span>
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
  )
}

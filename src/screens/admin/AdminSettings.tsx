import { useFarm } from '../../lib/derive'

export function AdminSettings() {
  const f = useFarm()

  return (
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
  )
}

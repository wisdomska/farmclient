import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFarm } from '../lib/derive'
import { TopBar } from '../components/shared'

interface SavedNumber {
  masked: string
  provider: string
}

function providerFor(num: string): string {
  const p = num.replace(/\s/g, '').slice(0, 3)
  if (['024', '054', '055', '059'].includes(p)) return 'MTN MoMo'
  if (['020', '050'].includes(p)) return 'Telecel Cash'
  if (['026', '027', '056', '057'].includes(p)) return 'AT Money'
  return 'Mobile money'
}

export function PaymentMethods() {
  const f = useFarm()
  const navigate = useNavigate()
  const [saved, setSaved] = useState<SavedNumber[]>([{ masked: '024 •• 4567', provider: 'MTN MoMo' }])
  const [adding, setAdding] = useState(false)
  const [newNum, setNewNum] = useState('')
  const [error, setError] = useState('')

  function saveNumber() {
    const digits = newNum.replace(/\D/g, '')
    if (digits.length !== 10 || !digits.startsWith('0')) {
      setError('Enter a valid 10-digit Ghana mobile number, e.g. 024 123 4567.')
      return
    }
    const masked = `${digits.slice(0, 3)} •• ${digits.slice(6)}`
    setSaved((s) => [...s, { masked, provider: providerFor(digits) }])
    setAdding(false)
    setNewNum('')
    setError('')
    f.showToast('Number saved. You can use it at checkout.')
  }

  return (
    <div>
      <TopBar showNav={false} showAvatar={false} back={{ label: 'Settings', onClick: () => navigate('/app/settings') }} />

      <div className="max-w-[620px] mx-auto px-[28px] pt-[36px] pb-[64px]">
        <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Payment methods</h1>
        <span className="text-[13px] text-ink2">How you pay for your orders</span>

        {/* Saved numbers */}
        <div className="text-[15px] text-ink mt-[26px] mb-[14px]">Saved numbers</div>
        <div className="flex flex-col gap-[10px]">
          {saved.map((n, i) => (
            <div key={n.masked} className={`w-full flex items-center gap-[14px] bg-surface border rounded-[10px] px-[16px] py-[14px] ${i === 0 ? 'border-primary' : 'border-line'}`}>
              <span className="w-[20px] h-[20px] rounded-full border border-line flex-shrink-0 flex items-center justify-center">
                {i === 0 && <span className="w-[10px] h-[10px] rounded-full bg-primary"></span>}
              </span>
              <div className="flex-1">
                <div className="text-[14px] text-ink">{n.masked} · {n.provider}</div>
                <div className="text-[12px] text-ink3">{i === 0 ? 'Default · used for your last order' : 'Available at checkout'}</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink3">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </div>
          ))}
        </div>

        {!adding ? (
          <button
            onClick={() => setAdding(true)}
            className="mt-[12px] bg-transparent border border-line rounded-[8px] px-[16px] py-[10px] text-[13px] text-ink cursor-pointer font-[inherit] hover:border-primary hover:text-primary transition-colors"
          >
            Add another number
          </button>
        ) : (
          <div className="mt-[12px] border border-line rounded-[10px] p-[16px]">
            <label className="block text-[13px] text-ink2 mb-[7px]">Mobile money number</label>
            <input
              value={newNum}
              onChange={(e) => setNewNum(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') saveNumber() }}
              placeholder="024 123 4567"
              autoFocus
              className="w-full bg-surface border border-line rounded-[8px] px-[14px] py-[12px] text-[14px] text-ink font-[inherit] outline-none min-h-[44px] focus:border-primary"
            />
            {error && <div className="text-[13px] text-error mt-[8px]">{error}</div>}
            <div className="flex gap-[10px] mt-[12px]">
              <button
                onClick={saveNumber}
                className="bg-primary text-primary-ink border-none rounded-[8px] px-[18px] py-[10px] text-[13px] cursor-pointer font-[inherit] hover:opacity-[0.88]"
              >
                Save number
              </button>
              <button
                onClick={() => { setAdding(false); setNewNum(''); setError('') }}
                className="bg-transparent text-ink2 border border-line rounded-[8px] px-[18px] py-[10px] text-[13px] cursor-pointer font-[inherit] hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Available providers */}
        <div className="text-[15px] text-ink mt-[32px] mb-[14px]">Available providers</div>
        <div className="flex flex-col gap-[10px]">
          {f.payMethods.map((p) => (
            <div
              key={p.key}
              className="w-full flex items-center gap-[14px] bg-surface border border-line rounded-[10px] px-[16px] py-[14px]"
            >
              <div className="flex-1">
                <div className="text-[14px] text-ink">{p.name}</div>
                <div className="text-[12px] text-ink3">{p.desc}</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink3">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

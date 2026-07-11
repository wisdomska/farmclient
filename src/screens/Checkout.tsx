import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFarm } from '../lib/derive'
import { TopBar } from '../components/shared'

/** Real Ghanaian mobile prefixes per network (SRS payment-method spec). */
const NETWORK_PREFIXES: Record<string, string[]> = {
  mtn: ['024', '054', '055', '059'],
  telecel: ['020', '050'],
  at: ['026', '027', '056', '057'],
}

const PAY_TIMEOUT_MS = 45_000

export function Checkout() {
  const f = useFarm()
  const navigate = useNavigate()
  const [momo, setMomo] = useState('')
  const [fieldError, setFieldError] = useState('')
  const [payError, setPayError] = useState('')
  // Ref-based guard: state updates are async, so a fast double-tap on
  // "Confirm & Pay" could otherwise fire two payment requests.
  const submitting = useRef(false)

  const method = f.payMethods.find((p) => p.active)?.key ?? 'mtn'
  const isMomo = method !== 'bank'

  function validateMomo(): string | null {
    if (!isMomo) return null
    const digits = momo.replace(/\D/g, '')
    if (digits.length !== 10 || !digits.startsWith('0')) {
      return 'Enter a 10-digit Ghana mobile number, e.g. 024 123 4567.'
    }
    const prefixes = NETWORK_PREFIXES[method] ?? []
    if (!prefixes.includes(digits.slice(0, 3))) {
      const name = f.payMethods.find((p) => p.key === method)?.name ?? 'this network'
      return `That number is not a ${name} number — ${name} numbers start with ${prefixes.join(', ')}.`
    }
    return null
  }

  async function confirmAndPay() {
    if (submitting.current) return
    const problem = validateMomo()
    if (problem) {
      setFieldError(problem)
      return
    }
    setFieldError('')
    setPayError('')
    submitting.current = true
    try {
      const res = await Promise.race([
        f.placeOrder(f.sel.id, momo.replace(/\D/g, '')),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), PAY_TIMEOUT_MS),
        ),
      ])
      if (res) {
        navigate(`/app/orders/${res.orderId}`, {
          state: {
            listingId: f.sel.id,
            qty: f.orderQty,
            status: 'pending_payment',
            placed: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          },
        })
      } else {
        setPayError('The payment could not be started. You have not been charged — check the details and try again.')
      }
    } catch (err) {
      setPayError(
        (err as Error).message === 'timeout'
          ? 'The payment request timed out. Check your MoMo app for a pending prompt before trying again, so you are not charged twice.'
          : 'Something went wrong starting the payment. You have not been charged — please try again.',
      )
    } finally {
      submitting.current = false
    }
  }

  return (
    <div>
      <TopBar
        showNav={false}
        showAvatar={false}
        back={{ label: 'Back', onClick: () => f.goListing(f.sel.id) }}
        right={<span className="text-[13px] text-ink3">Step 2 of 3 · Payment</span>}
      />

      <div className="max-w-[980px] mx-auto px-[28px] pt-[36px] pb-[64px]">
        <h1 className="text-[28px] font-normal tracking-[-0.02em] mb-[28px]">Checkout</h1>

        <div className="grid gap-[28px] items-start md:grid-cols-[1fr_380px]">

          {/* Payment method */}
          <div>
            <div className="text-[15px] text-ink mb-[14px]">Payment method</div>

            <div className="flex flex-col gap-[10px] mb-[28px]">
              {f.payMethods.map((p) => (
                <button
                  key={p.key}
                  onClick={p.onClick}
                  className={`w-full flex items-center gap-[14px] bg-surface border rounded-[10px] px-[16px] py-[14px] text-left cursor-pointer transition-colors duration-150 ${p.active ? 'border-primary' : 'border-line'}`}
                >
                  <span className="w-[20px] h-[20px] rounded-full border border-line flex-shrink-0 flex items-center justify-center">
                    {p.active && (
                      <span className="w-[10px] h-[10px] rounded-full bg-primary"></span>
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="text-[14px] text-ink">{p.name}</div>
                    <div className="text-[12px] text-ink3">{p.desc}</div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink3">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </button>
              ))}
            </div>

            {isMomo && (
              <div className="mb-[20px]">
                <label htmlFor="fc-momo" className="block text-[13px] text-ink2 mb-[7px]">Mobile money number</label>
                <input
                  id="fc-momo"
                  inputMode="tel"
                  value={momo}
                  onChange={(e) => { setMomo(e.target.value); if (fieldError) setFieldError('') }}
                  placeholder="024 123 4567"
                  aria-invalid={!!fieldError}
                  className={`w-full bg-surface border rounded-[8px] px-[14px] py-[12px] text-[14px] text-ink font-[inherit] outline-none min-h-[44px] focus:border-primary ${fieldError ? 'border-error' : 'border-line'}`}
                />
                {fieldError && <div className="text-[13px] text-error mt-[8px] leading-[1.5]">{fieldError}</div>}
              </div>
            )}

            <div className="flex gap-[11px] bg-primary-dim rounded-[8px] p-[16px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary flex-shrink-0 mt-[1px]"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M12 18h.01" />
              </svg>
              <span className="text-[13px] text-ink leading-[1.55]">
                You will get a payment request on your phone. Approve it, and your money is kept safe until your food arrives.
              </span>
            </div>
          </div>

          {/* Order summary */}
          <div className="border border-line rounded-[12px] p-[24px]">
            <div className="text-[15px] text-ink mb-[18px]">Order summary</div>

            <div className="flex gap-[12px] items-center pb-[18px] border-b border-line mb-[18px]">
              <div className="w-[56px] h-[56px] flex-shrink-0 rounded-[8px] overflow-hidden bg-surface2">
                {f.sel.photo && (
                  <img loading="lazy" decoding="async"
                    src={f.sel.photo}
                    alt={f.sel.crop}
                    className="w-full h-full object-cover block"
                  />
                )}
              </div>
              <div>
                <div className="text-[14px] text-ink">{f.sel.crop} · {f.orderQty} kg</div>
                <div className="text-[12px] text-ink2">{f.sel.farmer} · {f.sel.district}</div>
              </div>
            </div>

            <div className="flex flex-col gap-[11px] mb-[18px] text-[14px]">
              <div className="flex justify-between">
                <span className="text-ink2">Crops ({f.orderQty} kg)</span>
                <span className="text-ink">{f.subtotalStr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink2">Service fee (1.5%)</span>
                <span className="text-ink">{f.feeStr}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline border-t border-line pt-[16px] mb-[20px]">
              <span className="text-[15px] text-ink">Total</span>
              <span className="text-[24px] text-ink">{f.totalStr}</span>
            </div>

            {payError && (
              <div className="flex flex-col gap-[10px] bg-error-dim border border-error rounded-[8px] p-[14px] mb-[16px]">
                <span className="text-[13px] text-ink leading-[1.55]">{payError}</span>
                <button
                  onClick={() => void confirmAndPay()}
                  className="self-start bg-transparent text-ink border border-line rounded-[6px] px-[14px] py-[8px] text-[13px] cursor-pointer font-[inherit] hover:border-ink3"
                >
                  Try again
                </button>
              </div>
            )}

            <button
              onClick={() => void confirmAndPay()}
              disabled={f.paying}
              className="w-full bg-primary text-primary-ink border-none rounded-[8px] py-[15px] text-[15px] cursor-pointer font-[inherit] min-h-[44px] transition-opacity duration-150 hover:opacity-[0.88] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Confirm &amp; Pay
            </button>
            <div className="flex items-center justify-center gap-[6px] text-[12px] text-ink3 mt-[12px]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Held in escrow — the farmer is only paid after you confirm delivery
            </div>
          </div>
        </div>
      </div>

      {/* Paying modal */}
      {f.paying && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center">
          <div className="bg-surface border border-line rounded-[12px] p-[44px] text-center max-w-[360px]">
            <div className="fc-spin w-[48px] h-[48px] mx-auto mb-[24px] border-[3px] border-line border-t-primary rounded-full"></div>
            <div className="text-[17px] text-ink mb-[10px]">Waiting for your MoMo approval…</div>
            <div className="text-[13px] text-ink2 leading-[1.6]">
              Check your phone and approve the request for {f.totalStr}. This window closes on its own.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

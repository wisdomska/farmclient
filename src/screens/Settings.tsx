import { useNavigate } from 'react-router-dom'
import { useFarm } from '../lib/derive'
import { LanguageToggle, ThemeToggle, TopBar } from '../components/shared'

export function Settings() {
  const f = useFarm()
  const navigate = useNavigate()
  const fullName = (f.currentUser?.fullName as string | undefined) ?? 'Kwame Asante'
  const email = (f.currentUser?.email as string | undefined) ?? 'kwame@goldenfork.gh'

  return (
    <div>
      <TopBar showNav={false} showAvatar={false} back={{ label: 'Back', onClick: () => navigate('/app') }} />

      <div className="max-w-[620px] mx-auto px-[28px] pt-[36px] pb-[64px]">
        <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Settings</h1>
        <span className="text-[13px] text-ink2">Your account and how FarmClient works for you</span>

        <div className="border border-line rounded-[8px] p-[24px] mt-[22px] flex flex-col gap-[22px]">
          <div>
            <label className="block text-[13px] text-ink2 mb-[7px]">Full name</label>
            <div className="bg-surface border border-line rounded-[8px] px-[13px] py-[11px] text-[14px] text-ink">{fullName}</div>
          </div>

          <div className="border-t border-line pt-[20px]">
            <label className="block text-[13px] text-ink2 mb-[7px]">Email</label>
            <div className="bg-surface border border-line rounded-[8px] px-[13px] py-[11px] text-[14px] text-ink">{email}</div>
          </div>

          <div className="flex items-center justify-between border-t border-line pt-[20px]">
            <div>
              <div className="text-[14px] text-ink">Language</div>
              <div className="text-[12.5px] text-ink2 mt-[2px]">English or Twi</div>
            </div>
            <LanguageToggle />
          </div>

          <div className="flex items-center justify-between border-t border-line pt-[20px]">
            <div>
              <div className="text-[14px] text-ink">Appearance</div>
              <div className="text-[12.5px] text-ink2 mt-[2px]">Light or dark</div>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-between border-t border-line pt-[20px]">
            <div>
              <div className="text-[14px] text-ink">Payment methods</div>
              <div className="text-[12.5px] text-ink2 mt-[2px]">Your saved MoMo numbers</div>
            </div>
            <button
              onClick={f.goPayments}
              className="bg-transparent border border-line rounded-[6px] px-[14px] py-2 text-[13px] text-ink cursor-pointer hover:border-primary hover:text-primary transition-colors"
            >
              Manage
            </button>
          </div>

          <div className="border-t border-line pt-[20px]">
            <button
              onClick={() => {
                f.logout()
                navigate('/')
              }}
              className="bg-transparent border border-line rounded-[8px] px-[22px] py-[12px] text-[14px] text-error cursor-pointer font-[inherit] hover:border-error transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

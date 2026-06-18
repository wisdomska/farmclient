import { useFarm } from '../lib/derive'

export function Auth() {
  const f = useFarm()

  return (
    <div className="grid grid-cols-2" style={{ minHeight: 'calc(100vh - 46px)' }}>
      {/* brand panel */}
      <div className="relative overflow-hidden border-r border-line p-[56px] flex flex-col justify-between text-white">
        <img
          src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1100&q=72"
          alt="A farm field in Ghana"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(8,20,18,0.74) 0%, rgba(8,20,18,0.82) 100%)' }}
        />

        {/* logo */}
        <div className="relative flex items-center gap-[10px]">
          <div className="w-[30px] h-[30px] rounded-[8px] bg-primary flex items-center justify-center">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--primary-text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5.8-6.4 3-10" />
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
            </svg>
          </div>
          <span className="text-[19px] tracking-[-0.02em] text-white">FarmClient</span>
        </div>

        {/* tagline */}
        <div className="relative">
          <h2 className="text-[34px] leading-[1.2] tracking-[-0.02em] font-normal mt-0 mb-[18px] max-w-[420px] text-white">
            Buy fresh Ghanaian food. Pay with peace of mind.
          </h2>
          <p className="text-[15px] leading-[1.6] max-w-[380px] m-0" style={{ color: 'rgba(255,255,255,0.78)' }}>
            Your money is held safely until your food arrives. No more chasing suppliers who disappear mid-season.
          </p>
        </div>

        {/* stats */}
        <div className="relative flex gap-[32px]">
          <div>
            <div className="text-[24px] tracking-[-0.02em] text-white">2,000,000+</div>
            <div className="text-[12px]" style={{ color: 'rgba(255,255,255,0.7)' }}>Trusted farmers</div>
          </div>
          <div>
            <div className="text-[24px] tracking-[-0.02em] text-white">11 crops</div>
            <div className="text-[12px]" style={{ color: 'rgba(255,255,255,0.7)' }}>Across 16 regions</div>
          </div>
        </div>
      </div>

      {/* form panel */}
      <div className="flex items-center justify-center p-[40px]">
        <div className="w-full max-w-[380px]">
          {/* tabs */}
          <div className="inline-flex bg-surface border border-line rounded-[8px] p-[3px] mb-[28px]">
            <button
              onClick={f.setSignIn}
              className={`rounded-[6px] px-[16px] py-[7px] text-[14px] cursor-pointer border-none font-[inherit] transition-colors duration-150 ${
                f.authMode === 'signin' ? 'bg-primary text-primary-ink' : 'bg-transparent text-ink2'
              }`}
            >
              Sign in
            </button>
            <button
              onClick={f.setSignUp}
              className={`rounded-[6px] px-[16px] py-[7px] text-[14px] cursor-pointer border-none font-[inherit] transition-colors duration-150 ${
                f.authMode === 'signup' ? 'bg-primary text-primary-ink' : 'bg-transparent text-ink2'
              }`}
            >
              Sign up
            </button>
          </div>

          <h1 className="text-[26px] tracking-[-0.02em] font-normal mt-0 mb-[8px]">{f.authTitle}</h1>
          <p className="text-[14px] text-ink2 mt-0 mb-[28px]">{f.authSub}</p>

          {/* Google button */}
          <button
            onClick={f.doSignIn}
            className="w-full flex items-center justify-center gap-[10px] bg-bg text-ink border border-line rounded-[8px] p-[13px] text-[14px] cursor-pointer font-[inherit] min-h-[44px] transition-[border-color] duration-150 hover:border-ink3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
              <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 4.75 12 4.75z" />
            </svg>
            Continue with Google
          </button>

          {/* divider */}
          <div className="flex items-center gap-[14px] my-[22px]">
            <div className="flex-1 h-px bg-line" />
            <span className="text-[12px] text-ink3">or</span>
            <div className="flex-1 h-px bg-line" />
          </div>

          {/* Full name — sign up only */}
          {f.isSignUp && (
            <div className="mb-[16px]">
              <label className="block text-[13px] text-ink2 mb-[7px]">Full name</label>
              <input
                placeholder="Kwame Asante"
                className="w-full bg-surface border border-line rounded-[8px] px-[14px] py-[12px] text-[14px] text-ink font-[inherit] outline-none min-h-[44px] focus:border-primary"
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-[16px]">
            <label className="block text-[13px] text-ink2 mb-[7px]">Email</label>
            <input
              placeholder="you@goldenfork.gh"
              className="w-full bg-surface border border-line rounded-[8px] px-[14px] py-[12px] text-[14px] text-ink font-[inherit] outline-none min-h-[44px] focus:border-primary"
            />
          </div>

          {/* Password */}
          <div className="mb-[22px]">
            <label className="block text-[13px] text-ink2 mb-[7px]">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface border border-line rounded-[8px] px-[14px] py-[12px] text-[14px] text-ink font-[inherit] outline-none min-h-[44px] focus:border-primary"
            />
          </div>

          {/* primary CTA */}
          <button
            onClick={f.doSignIn}
            className="w-full bg-primary text-primary-ink border-none rounded-[8px] p-[14px] text-[15px] cursor-pointer font-[inherit] min-h-[44px] transition-opacity duration-150 hover:opacity-[0.88]"
          >
            {f.authCta}
          </button>

          {/* switch mode */}
          <p className="text-center text-[13px] text-ink2 mt-[22px] mb-0">
            <span>{f.authSwitchText}</span>
            <span
              onClick={f.toggleAuthMode}
              className="text-primary cursor-pointer ml-[5px]"
            >
              {f.authSwitchCta}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

import { useStore } from '../store'

export type Lang = 'en' | 'tw'

/** High-visibility UI strings with Akan/Twi translations. */
export const STRINGS: Record<string, { en: string; tw: string }> = {
  // Landing — eyebrow
  'landing.eyebrow': {
    en: 'A fairer market for every farmer',
    tw: 'Dwetiri a emu fata obiara ma akuafo',
  },
  // Landing — H1
  'landing.h1': {
    en: 'Fair prices for farmers. Fresh food for buyers.',
    tw: 'Fa bo pa ma akuafo. Diadwuma foforo ma atɔfo.',
  },
  // Landing — hero paragraph
  'landing.hero.para': {
    en: "FarmClient links Ghana's farmers with trusted buyers. Farmers sell their crops the easy way — even with a simple phone — and get paid the same day.",
    tw: 'FarmClient kyerɛkyerɛ Ghana akuafo ne atɔfo a wɔdi wɔn trust. Akuafo tɔn wɔn nnuaba nhyira — afei nso wɔ mfitiase fon mu — na wɔnya sika da koro no ara.',
  },
  // Landing — hero button 1
  'landing.hero.btn1': {
    en: "See what's for sale",
    tw: 'Hwɛ deɛ wɔatɔn',
  },
  // Landing — hero button 2
  'landing.hero.btn2': {
    en: "I'm a Farmer — Dial *789#",
    tw: 'Meyɛ okuafo — Frɛ *789#',
  },
  // Landing nav
  'nav.marketplace': { en: 'Marketplace', tw: 'Dwetiri' },
  'nav.howItWorks': { en: 'How it works', tw: 'Sɛdeɛ ɛyɛ adwuma' },
  'nav.forFarmers': { en: 'For farmers', tw: 'Ma akuafo' },
  'nav.ourStory': { en: 'Our story', tw: 'Yɛn asɛm' },
  'nav.signIn': { en: 'Sign in', tw: 'Hyɛ wo din' },
  'nav.seeMarket': { en: 'See the market', tw: 'Hwɛ dwetiri' },
  // Landing — how it works
  'how.heading': { en: 'Three simple steps.', tw: 'Nkɔsoɔ mmiɛnsa pere.' },
  'how.step1.title': { en: 'The farmer shows their crops', tw: 'Okuafo kyerɛ ne nnuaba' },
  'how.step2.title': { en: 'The buyer orders and pays', tw: 'Ogyefo pɛ na otua ka' },
  'how.step3.title': { en: 'The farmer gets paid', tw: 'Okuafo nya ne sika' },
  // Auth — tab labels
  'auth.tab.signin': { en: 'Sign in', tw: 'Hyɛ wo din' },
  'auth.tab.signup': { en: 'Sign up', tw: 'De wo ho to ase' },
  // Auth — field labels
  'auth.field.fullname': { en: 'Full name', tw: 'Wo din nyinaa' },
  'auth.field.email': { en: 'Email', tw: 'Imeyil' },
  'auth.field.password': { en: 'Password', tw: 'Ɔhaw nsɛm' },
  // Auth — CTA labels
  'auth.cta.signin': { en: 'Sign in', tw: 'Hyɛ wo din' },
  'auth.cta.signup': { en: 'Create account', tw: 'Yɛ akonto' },
  'auth.google': { en: 'Continue with Google', tw: 'Kɔ so wɔ Google ho' },
  'auth.or': { en: 'or', tw: 'anaa' },
  // Shared TopBar nav
  'topbar.dashboard': { en: 'Dashboard', tw: 'Tebea' },
  'topbar.marketplace': { en: 'Marketplace', tw: 'Dwetiri' },
  'topbar.orders': { en: 'Orders', tw: 'Apafoɔ' },
  // Shared listing card buttons
  'card.quickOrder': { en: 'Quick order', tw: 'Mpɛn pɛ' },
  'card.placeOrder': { en: 'Place order', tw: 'De apa to ase' },
}

/** Hook returning a translate function for the current language. */
export function useT(): (key: string) => string {
  const { state } = useStore()
  const lang: Lang = (state as { lang?: Lang }).lang ?? 'en'

  return function t(key: string): string {
    const entry = STRINGS[key]
    if (!entry) return key
    return entry[lang] ?? entry.en ?? key
  }
}

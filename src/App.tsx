import { useFarm } from './lib/derive'
import { Toolbar } from './components/Toolbar'
import { Toast } from './components/Toast'
import { Landing } from './screens/Landing'
import { Auth } from './screens/Auth'
import { Dashboard } from './screens/Dashboard'
import { Marketplace } from './screens/Marketplace'
import { ListingDetail } from './screens/ListingDetail'
import { Checkout } from './screens/Checkout'
import { Orders } from './screens/Orders'
import { Tracking } from './screens/Tracking'
import { FarmerApp } from './screens/FarmerApp'
import { Ussd } from './screens/Ussd'
import { Admin } from './screens/Admin'

export default function App() {
  const f = useFarm()
  return (
    <div data-theme={f.theme} className="min-h-screen bg-bg font-sans text-ink antialiased">
      <Toolbar />
      {f.isLanding && <Landing />}
      {f.isAuth && <Auth />}
      {f.isDashboard && <Dashboard />}
      {f.isMarketplace && <Marketplace />}
      {f.isListing && <ListingDetail />}
      {f.isCheckout && <Checkout />}
      {f.isOrders && <Orders />}
      {f.isTracking && <Tracking />}
      {f.isFarmer && <FarmerApp />}
      {f.isUssd && <Ussd />}
      {f.isAdmin && <Admin />}
      <Toast />
    </div>
  )
}

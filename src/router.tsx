import { Navigate, createBrowserRouter } from 'react-router-dom'
import App from './App'
import { BuyerLayout } from './layouts/BuyerLayout'
import { FarmerLayout } from './layouts/FarmerLayout'
import { AdminLayout } from './layouts/AdminLayout'
import { Landing } from './screens/Landing'
import { Auth } from './screens/Auth'
import { Dashboard } from './screens/Dashboard'
import { Marketplace } from './screens/Marketplace'
import { ListingDetail } from './screens/ListingDetail'
import { Checkout } from './screens/Checkout'
import { Orders } from './screens/Orders'
import { Tracking } from './screens/Tracking'
import { Settings } from './screens/Settings'
import { PaymentMethods } from './screens/PaymentMethods'
import { FarmerHome } from './screens/farmer/FarmerHome'
import { FarmerSell } from './screens/farmer/FarmerSell'
import { FarmerListings } from './screens/farmer/FarmerListings'
import { FarmerPrices } from './screens/farmer/FarmerPrices'
import { FarmerWallet } from './screens/farmer/FarmerWallet'
import { AdminOverview } from './screens/admin/AdminOverview'
import { AdminSms } from './screens/admin/AdminSms'
import { AdminUsers } from './screens/admin/AdminUsers'
import { AdminListings } from './screens/admin/AdminListings'
import { AdminOrders } from './screens/admin/AdminOrders'
import { AdminPayments } from './screens/admin/AdminPayments'
import { AdminSettings } from './screens/admin/AdminSettings'
import { NotFound } from './screens/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // ── public marketing surface ──
      { index: true, element: <Landing /> },
      { path: 'sign-in', element: <Auth /> },
      { path: 'sign-up', element: <Auth /> },
      { path: 'marketplace', element: <Marketplace /> }, // public preview; buying requires sign-in

      // ── buyer shell ──
      {
        path: 'app',
        element: <BuyerLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'marketplace', element: <Marketplace /> },
          { path: 'marketplace/:listingId', element: <ListingDetail /> },
          { path: 'checkout/:listingId', element: <Checkout /> },
          { path: 'orders', element: <Orders /> },
          { path: 'orders/:orderId', element: <Tracking /> },
          { path: 'settings', element: <Settings /> },
          { path: 'settings/payment', element: <PaymentMethods /> },
        ],
      },

      // ── farmer shell (mobile-first phone frame) ──
      {
        path: 'farmer',
        element: <FarmerLayout />,
        children: [
          { index: true, element: <FarmerHome /> },
          { path: 'sell', element: <FarmerSell /> },
          { path: 'listings', element: <FarmerListings /> },
          { path: 'prices', element: <FarmerPrices /> },
          { path: 'wallet', element: <FarmerWallet /> },
        ],
      },

      // ── admin shell (sidebar chrome) ──
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/overview" replace /> },
          { path: 'overview', element: <AdminOverview /> },
          { path: 'users', element: <AdminUsers /> },
          { path: 'listings', element: <AdminListings /> },
          { path: 'orders', element: <AdminOrders /> },
          { path: 'payments', element: <AdminPayments /> },
          { path: 'sms', element: <AdminSms /> },
          { path: 'settings', element: <AdminSettings /> },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
])

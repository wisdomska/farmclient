import { Suspense, lazy, type ComponentType, type ReactNode } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import App from './App'
import { BuyerLayout } from './layouts/BuyerLayout'
import { Landing } from './screens/Landing'
import { Auth } from './screens/Auth'
import { Dashboard } from './screens/Dashboard'
import { Marketplace } from './screens/Marketplace'
import { ListingDetail } from './screens/ListingDetail'
import { Checkout } from './screens/Checkout'
import { Orders } from './screens/Orders'
import { Tracking } from './screens/Tracking'
import { NotFound } from './screens/NotFound'

// Farmer and admin shells (and buyer settings) are code-split — a buyer on a
// budget Android phone never downloads the admin console, and vice versa.
const lazyScreen = (loader: () => Promise<Record<string, ComponentType>>, name: string) =>
  lazy(async () => ({ default: (await loader())[name] }))

const Settings = lazyScreen(() => import('./screens/Settings'), 'Settings')
const PaymentMethods = lazyScreen(() => import('./screens/PaymentMethods'), 'PaymentMethods')
const FarmerLayout = lazyScreen(() => import('./layouts/FarmerLayout'), 'FarmerLayout')
const FarmerHome = lazyScreen(() => import('./screens/farmer/FarmerHome'), 'FarmerHome')
const FarmerSell = lazyScreen(() => import('./screens/farmer/FarmerSell'), 'FarmerSell')
const FarmerListings = lazyScreen(() => import('./screens/farmer/FarmerListings'), 'FarmerListings')
const FarmerPrices = lazyScreen(() => import('./screens/farmer/FarmerPrices'), 'FarmerPrices')
const FarmerWallet = lazyScreen(() => import('./screens/farmer/FarmerWallet'), 'FarmerWallet')
const AdminLayout = lazyScreen(() => import('./layouts/AdminLayout'), 'AdminLayout')
const AdminOverview = lazyScreen(() => import('./screens/admin/AdminOverview'), 'AdminOverview')
const AdminSms = lazyScreen(() => import('./screens/admin/AdminSms'), 'AdminSms')
const AdminUsers = lazyScreen(() => import('./screens/admin/AdminUsers'), 'AdminUsers')
const AdminListings = lazyScreen(() => import('./screens/admin/AdminListings'), 'AdminListings')
const AdminOrders = lazyScreen(() => import('./screens/admin/AdminOrders'), 'AdminOrders')
const AdminPayments = lazyScreen(() => import('./screens/admin/AdminPayments'), 'AdminPayments')
const AdminSettings = lazyScreen(() => import('./screens/admin/AdminSettings'), 'AdminSettings')

// eslint-disable-next-line react-refresh/only-export-components
function Load({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - var(--toolbar-h))' }}>
          <div className="fc-spin w-[40px] h-[40px] border-[3px] border-line border-t-primary rounded-full" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

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
          { path: 'settings', element: <Load><Settings /></Load> },
          { path: 'settings/payment', element: <Load><PaymentMethods /></Load> },
        ],
      },

      // ── farmer shell (mobile-first phone frame) ──
      {
        path: 'farmer',
        element: <Load><FarmerLayout /></Load>,
        children: [
          { index: true, element: <Load><FarmerHome /></Load> },
          { path: 'sell', element: <Load><FarmerSell /></Load> },
          { path: 'listings', element: <Load><FarmerListings /></Load> },
          { path: 'prices', element: <Load><FarmerPrices /></Load> },
          { path: 'wallet', element: <Load><FarmerWallet /></Load> },
        ],
      },

      // ── admin shell (sidebar chrome) ──
      {
        path: 'admin',
        element: <Load><AdminLayout /></Load>,
        children: [
          { index: true, element: <Navigate to="/admin/overview" replace /> },
          { path: 'overview', element: <Load><AdminOverview /></Load> },
          { path: 'users', element: <Load><AdminUsers /></Load> },
          { path: 'listings', element: <Load><AdminListings /></Load> },
          { path: 'orders', element: <Load><AdminOrders /></Load> },
          { path: 'payments', element: <Load><AdminPayments /></Load> },
          { path: 'sms', element: <Load><AdminSms /></Load> },
          { path: 'settings', element: <Load><AdminSettings /></Load> },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
])

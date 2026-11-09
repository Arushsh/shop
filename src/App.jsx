import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer Storefront Pages
import UserHome from './pages/user/UserHome';
import UserShop from './pages/user/UserShop';
import UserProductDetails from './pages/user/UserProductDetails';
import UserCart from './pages/user/UserCart';
import UserWishlist from './pages/user/UserWishlist';
import UserOrders from './pages/user/UserOrders';
import UserProfile from './pages/user/UserProfile';
import UserAddresses from './pages/user/UserAddresses';
import UserReviews from './pages/user/UserReviews';

// Admin Dashboard Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminInventory from './pages/admin/AdminInventory';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminProfile from './pages/admin/AdminProfile';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Storefront Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<UserHome />} />
          <Route path="/shop" element={<UserShop />} />
          <Route path="/product/:id" element={<UserProductDetails />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/wishlist" element={<UserWishlist />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/addresses" element={<UserAddresses />} />
          <Route path="/reviews" element={<UserReviews />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

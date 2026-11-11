import { Bell, Search, ShoppingBag, Menu } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const titles = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/categories': 'Categories',
  '/admin/inventory': 'Inventory',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/analytics': 'Analytics',
  '/admin/profile': 'My Profile',
  '/admin/settings': 'Settings',
};

export default function AdminHeader({ onToggleMobileNav }) {
  const { pathname } = useLocation();
  const title = titles[pathname] || 'Admin';

  return (
    <header className="bg-white border-b border-primary/8 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Hamburger Trigger */}
        <button
          onClick={onToggleMobileNav}
          className="md:hidden p-2 rounded-xl text-primary/70 hover:text-primary hover:bg-primary/5 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-primary leading-tight">{title}</h1>
          <p className="text-[11px] sm:text-xs text-primary/40 hidden sm:block">THREADLINE — Admin Control Center</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/"
          className="btn-outline text-xs px-2.5 sm:px-3.5 py-1.5 flex items-center gap-1.5 font-bold rounded-lg border-primary/20 hover:border-primary text-primary"
        >
          <ShoppingBag size={14} className="text-accent" />
          <span className="hidden sm:inline">View Storefront</span>
          <span className="sm:hidden">Store</span>
        </Link>
        <button className="relative p-2 rounded-xl hover:bg-primary/5 text-primary/60 hover:text-primary transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-primary/10">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">AD</div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-primary">Admin</p>
            <p className="text-[10px] text-primary/40">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

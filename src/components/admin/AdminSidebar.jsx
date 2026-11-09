import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Tag, Warehouse, ShoppingBag,
  Users, BarChart3, UserCircle, Settings, LogOut, Shirt, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Tag },
  { to: '/admin/inventory', label: 'Inventory', icon: Warehouse },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/profile', label: 'Profile', icon: UserCircle },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} flex-shrink-0 bg-primary flex flex-col transition-all duration-200 relative`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="bg-accent rounded-xl p-2 flex-shrink-0">
          <Shirt size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm leading-tight">Garment House</p>
            <p className="text-white/40 text-xs">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
              ${isActive
                ? 'bg-white/15 text-white'
                : 'text-white/55 hover:bg-white/8 hover:text-white/90'
              } ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout / Switch to Store */}
      <div className="px-2 py-3 border-t border-white/10">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-accent hover:bg-white/10 hover:text-white transition-all w-full ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'View Storefront' : undefined}
        >
          <Shirt size={18} className="flex-shrink-0" />
          {!collapsed && <span>View Storefront</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-primary/10 rounded-full p-1 shadow-card text-primary/60 hover:text-primary transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}


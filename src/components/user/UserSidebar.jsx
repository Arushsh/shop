import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, ShoppingBag, Heart, Package, User, MapPin, Star,
  Shirt, LogOut, ShoppingCart, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../../store/useStore';

const nav = [
  { to: '/user', label: 'Home', icon: Home, end: true },
  { to: '/user/shop', label: 'Shop', icon: ShoppingBag },
  { to: '/user/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/user/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/user/orders', label: 'My Orders', icon: Package },
  { to: '/user/profile', label: 'Profile', icon: User },
  { to: '/user/addresses', label: 'Addresses', icon: MapPin },
  { to: '/user/reviews', label: 'My Reviews', icon: Star },
];

export default function UserSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const cart = useStore(s => s.cart);
  const wishlist = useStore(s => s.wishlist);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-primary/8">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-primary/8">
        <div className="bg-primary rounded-xl p-2">
          <Shirt size={20} className="text-accent" />
        </div>
        <div>
          <p className="text-primary font-bold text-sm leading-tight">Garment House</p>
          <p className="text-primary/40 text-xs">My Account</p>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
              ${isActive
                ? 'bg-primary text-white'
                : 'text-primary/60 hover:bg-primary/5 hover:text-primary'
              }`
            }
          >
            <div className="relative">
              <Icon size={17} className="flex-shrink-0" />
              {label === 'Cart' && cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
              {label === 'Wishlist' && wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-primary/8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-primary/60 hover:bg-primary/5 hover:text-primary transition-all w-full"
        >
          <LogOut size={17} />
          <span>Switch Role</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-card border border-primary/10"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={18} className="text-primary" /> : <Menu size={18} className="text-primary" />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-56 flex-shrink-0 h-full">
        <SidebarContent />
      </aside>
    </>
  );
}


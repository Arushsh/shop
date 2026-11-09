import { ShoppingCart, Heart, Search, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export default function UserHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cart, wishlist, userProfile } = useStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-white border-b border-primary/8 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <p className="text-xs font-semibold text-primary/40 uppercase tracking-wider">Garment Storefront</p>
          <p className="text-sm font-bold text-primary">Luxury Apparel & Bespoke Tailoring</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick link to Wishlist */}
        <button
          onClick={() => navigate('/user/wishlist')}
          className={`relative p-2 rounded-xl transition-colors ${
            pathname === '/user/wishlist'
              ? 'bg-primary text-white'
              : 'hover:bg-primary/5 text-primary/70 hover:text-primary'
          }`}
          title="Wishlist"
        >
          <Heart size={18} />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Quick link to Cart */}
        <button
          onClick={() => navigate('/user/cart')}
          className={`relative p-2 rounded-xl transition-colors ${
            pathname === '/user/cart'
              ? 'bg-primary text-white'
              : 'hover:bg-primary/5 text-primary/70 hover:text-primary'
          }`}
          title="Shopping Cart"
        >
          <ShoppingCart size={18} />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>

        {/* User Profile avatar */}
        <div
          onClick={() => navigate('/user/profile')}
          className="flex items-center gap-2 pl-3 border-l border-primary/10 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shadow-xs group-hover:scale-105 transition-transform">
            {userProfile.avatar || 'AM'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-primary group-hover:text-accent transition-colors leading-tight">
              {userProfile.name}
            </p>
            <p className="text-[10px] text-primary/40">Customer</p>
          </div>
        </div>
      </div>
    </header>
  );
}


import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Search, Heart, ShoppingBag, User, Menu, X, ChevronDown,
  Sparkles, Package, MapPin, Star, LogOut, ArrowRight, ShieldCheck
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../data/mockData';

export default function Header() {
  const navigate = useNavigate();
  const { cart, wishlist, profile } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(null); // 'categories' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search live suggestions
  const searchSuggestions = searchQuery.trim()
    ? MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.gender.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchModal(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Men', to: '/shop?gender=Men' },
    { label: 'Women', to: '/shop?gender=Women' },
    { label: 'Kids', to: '/shop?gender=Kids' },
    { label: 'New Arrivals', to: '/shop?tag=new' },
    { label: 'Best Sellers', to: '/shop?tag=bestseller' },
    { label: 'Special Offers', to: '/shop?discount=true' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-primary/10 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-atelier-dark text-white text-[11px] py-2 px-4 flex items-center justify-between font-medium tracking-wide border-b border-white/10">
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-atelier-champagne animate-pulse" />
          <span>Complimentary Express Delivery on orders above ₹2,999 · Code: <span className="px-2 py-0.5 rounded bg-atelier-champagne/20 text-atelier-champagne font-mono font-bold tracking-wider border border-atelier-champagne/30">THREADLINE10</span></span>
        </div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-atelier-champagne hover:text-atelier-dark text-white/90 transition-all text-[11px] font-bold border border-white/20 flex-shrink-0"
          title="Go to Admin Dashboard"
        >
          <ShieldCheck size={12} className="text-atelier-champagne" /> <span>Admin Dashboard</span>
        </Link>
      </div>

      {/* Main Brand & Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-primary hover:text-accent rounded-lg"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <span className="font-serif font-black text-2xl sm:text-3xl tracking-tighter text-primary group-hover:text-atelier-champagne transition-colors">
              THREADLINE
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-atelier-champagne font-semibold -mt-1">
              Atelier & Storefront
            </span>
          </Link>

          {/* Desktop Search Bar with Live Suggestions */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search bespoke shirts, linen kurtas, raw selvedge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchModal(true)}
                className="w-full bg-[#F7F7F5] border border-primary/15 rounded-full py-2.5 pl-10 pr-4 text-xs text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:bg-white transition-all"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40" />
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSearchModal && searchSuggestions.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-modal border border-primary/10 overflow-hidden z-50 p-2"
                onMouseLeave={() => setShowSearchModal(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-primary/40 tracking-wider">
                  Suggested Garments
                </div>
                {searchSuggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      setShowSearchModal(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/5 cursor-pointer transition-colors"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-10 h-12 object-cover rounded-md bg-primary/5"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-semibold text-primary truncate">{item.name}</p>
                      <p className="text-[10px] text-primary/50">{item.category} • {item.brand}</p>
                    </div>
                    <span className="text-xs font-bold text-primary">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Icons: Wishlist, Cart, Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full text-primary hover:text-accent hover:bg-primary/5 transition-colors"
              title="Saved Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full text-primary hover:text-accent hover:bg-primary/5 transition-colors"
              title="Shopping Bag"
            >
              <ShoppingBag size={20} />
              {totalCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Direct Admin Dashboard Button in Header */}
            <Link
              to="/admin"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white hover:bg-primary-700 text-xs font-bold transition-all shadow-xs border border-primary/20"
              title="Open Admin Dashboard"
            >
              <ShieldCheck size={14} className="text-accent" />
              <span>Admin</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-primary/5 text-primary transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-accent text-xs font-bold flex items-center justify-center shadow-xs">
                  {profile.avatar}
                </div>
                <span className="hidden xl:inline-block text-xs font-semibold text-primary group-hover:text-accent">
                  {profile.name.split(' ')[0]}
                </span>
                <ChevronDown size={14} className="hidden xl:block text-primary/40" />
              </button>

              {/* Profile Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-modal border border-primary/10 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2.5 border-b border-primary/8">
                    <p className="font-bold text-primary text-sm truncate">{profile.name}</p>
                    <p className="text-[11px] text-primary/50 truncate">{profile.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-accent/15 text-accent-800 text-[10px] font-semibold">
                      {profile.membership}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-primary/75 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <User size={15} /> My Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-primary/75 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Package size={15} /> My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-primary/75 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Heart size={15} /> Saved Wishlist
                    </Link>
                    <Link
                      to="/addresses"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-primary/75 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <MapPin size={15} /> Saved Addresses
                    </Link>
                    <Link
                      to="/reviews"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-primary/75 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Star size={15} /> My Reviews
                    </Link>
                    <Link
                      to="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 font-bold text-accent-700 bg-accent/10 hover:bg-accent/20 transition-colors"
                    >
                      <ShieldCheck size={15} /> Admin Dashboard
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-primary/8">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/profile');
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-primary/60 hover:text-red-600 hover:bg-red-50/50 transition-colors"
                    >
                      <LogOut size={15} /> Switch Persona / Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Primary Desktop Navigation Bar + Mega-menu trigger */}
        <nav className="hidden lg:flex items-center justify-between border-t border-primary/8 py-2.5">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs font-semibold uppercase tracking-wider py-1 border-b-2 transition-all ${
                    isActive
                      ? 'text-primary border-accent'
                      : 'text-primary/70 border-transparent hover:text-primary hover:border-primary/20'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Category Mega Menu Hover Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setShowMegaMenu('categories')}
              onMouseLeave={() => setShowMegaMenu(null)}
            >
              <button className="text-xs font-semibold uppercase tracking-wider py-1 text-primary/70 hover:text-primary flex items-center gap-1">
                <span>Collections & Categories</span>
                <ChevronDown size={13} />
              </button>

              {/* Mega Menu Dropdown */}
              {showMegaMenu === 'categories' && (
                <div className="absolute left-0 top-full pt-3 w-[720px] z-50">
                  <div className="bg-white rounded-2xl shadow-modal border border-primary/10 p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-1">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
                        By Apparel Type
                      </h4>
                      <ul className="space-y-2 text-xs">
                        {MOCK_CATEGORIES.slice(3).map((c) => (
                          <li key={c.id}>
                            <Link
                              to={`/shop?category=${encodeURIComponent(c.name)}`}
                              onClick={() => setShowMegaMenu(null)}
                              className="text-primary/80 hover:text-accent font-medium transition-colors flex items-center justify-between"
                            >
                              <span>{c.name}</span>
                              <span className="text-[10px] text-primary/40">{c.tag}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
                        Gender Portals
                      </h4>
                      <ul className="space-y-2 text-xs">
                        {['Men', 'Women', 'Kids'].map((g) => (
                          <li key={g}>
                            <Link
                              to={`/shop?gender=${g}`}
                              onClick={() => setShowMegaMenu(null)}
                              className="text-primary/80 hover:text-accent font-medium transition-colors"
                            >
                              {g}'s Luxury Ready-to-Wear
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <h4 className="text-xs font-bold uppercase tracking-wider text-accent mt-5 mb-2">
                        Fabric Curations
                      </h4>
                      <ul className="space-y-1.5 text-xs text-primary/70">
                        <li><Link to="/shop?fabric=100%25%20Giza%20Egyptian%20Cotton" onClick={() => setShowMegaMenu(null)} className="hover:text-primary">Giza Egyptian Cotton</Link></li>
                        <li><Link to="/shop?fabric=100%25%20French%20Normandy%20Linen" onClick={() => setShowMegaMenu(null)} className="hover:text-primary">French Normandy Linen</Link></li>
                        <li><Link to="/shop?fabric=Kaihara%20Selvedge" onClick={() => setShowMegaMenu(null)} className="hover:text-primary">Kaihara Selvedge Denim</Link></li>
                      </ul>
                    </div>

                    <div className="bg-[#F7F7F5] rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent-700">
                          Seasonal Edit
                        </span>
                        <h5 className="font-extrabold text-sm text-primary mt-1">
                          Autumn / Winter Sartorial
                        </h5>
                        <p className="text-[11px] text-primary/60 mt-1 leading-snug">
                          Structured merino wool double-breasted blazers and cashmere overcoats.
                        </p>
                      </div>
                      <Link
                        to="/shop?tag=new"
                        onClick={() => setShowMegaMenu(null)}
                        className="text-xs font-semibold text-accent hover:text-accent-800 flex items-center gap-1 mt-4"
                      >
                        Explore Edit <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-emerald-700 flex items-center gap-1.5">
              <ShieldCheck size={14} /> 100% Guaranteed Bespoke Fabrics
            </span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-primary/40 backdrop-blur-sm z-40">
          <div className="bg-white w-4/5 max-w-sm h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search garments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-9 text-xs"
                />
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
              </form>

              {/* Links */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase text-primary/40 tracking-wider">Navigation</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-primary hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Categories */}
              <div className="space-y-2 pt-4 border-t border-primary/8">
                <p className="text-[10px] font-bold uppercase text-primary/40 tracking-wider">Top Categories</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {MOCK_CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      to={`/shop?category=${encodeURIComponent(c.name)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-lg bg-primary/3 text-primary/80 hover:bg-primary/10"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-primary/8 text-xs text-primary/50 space-y-3">
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-white font-bold text-xs shadow-md"
              >
                <ShieldCheck size={15} className="text-accent" /> Go to Admin Dashboard
              </Link>
              <div className="text-center">
                <p className="font-semibold text-primary">THREADLINE Atelier</p>
                <p>Premium Garment Retail Experience</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


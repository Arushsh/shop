import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Shirt, ArrowRight, Sparkles, Store, ShoppingBag } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col justify-between p-6">
      {/* Brand Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-accent p-2.5 rounded-xl shadow-card">
            <Shirt size={24} />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-primary">GARMENT HOUSE</span>
            <span className="block text-[11px] font-medium text-primary/40 uppercase tracking-widest">
              Retail Intelligence & Storefront
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-primary/60">Frontend Interactive Prototype</span>
        </div>
      </header>

      {/* Main Choice Screen */}
      <main className="max-w-4xl mx-auto w-full my-auto py-12 text-center space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/25 text-accent-700 text-xs font-semibold">
            <Sparkles size={13} /> Demo Workspace Role Switcher
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Select Your Dashboard Experience
          </h1>
          <p className="text-sm sm:text-base text-primary/60 max-w-xl mx-auto">
            Experience dual-persona software designed specifically for premium garment retail. Choose a role below to explore tailored workflows.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Admin Role Card */}
          <div
            onClick={() => navigate('/admin')}
            className="group card p-8 cursor-pointer hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 relative flex flex-col justify-between border-2 border-transparent hover:border-primary/20 bg-white"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Store size={28} />
              </div>

              <div>
                <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                  Back-Office SaaS
                </span>
                <h2 className="text-2xl font-bold text-primary mt-1 flex items-center justify-between">
                  Admin Dashboard
                  <ArrowRight size={20} className="text-primary/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </h2>
                <p className="text-xs sm:text-sm text-primary/60 mt-2 leading-relaxed">
                  Enterprise retail operations: revenue analytics, live inventory stock adjustments, order fulfillment, customer metrics, and product management.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {['Live Analytics', 'Inventory Modals', 'Order Status', 'Customer Profiles'].map(t => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-primary/5 text-primary/70 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-primary/8 flex items-center justify-between">
              <span className="text-xs font-semibold text-primary group-hover:text-accent transition-colors flex items-center gap-1.5">
                <ShieldCheck size={16} /> Continue as Administrator
              </span>
              <span className="text-xs text-primary/40">Demo Mode</span>
            </div>
          </div>

          {/* User Role Card */}
          <div
            onClick={() => navigate('/user')}
            className="group card p-8 cursor-pointer hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 relative flex flex-col justify-between border-2 border-transparent hover:border-accent/20 bg-white"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <ShoppingBag size={28} />
              </div>

              <div>
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                  Customer Storefront
                </span>
                <h2 className="text-2xl font-bold text-primary mt-1 flex items-center justify-between">
                  User Dashboard
                  <ArrowRight size={20} className="text-accent group-hover:translate-x-1 transition-all" />
                </h2>
                <p className="text-xs sm:text-sm text-primary/60 mt-2 leading-relaxed">
                  Refined luxury e-commerce: curated home lookbook, multi-filter catalog, interactive garment details, live cart, wishlist, and real-time tracking timeline.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {['Size & Color Selector', 'Active Cart State', 'Saved Wishlist', 'Order Timeline'].map(t => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-accent/10 text-accent-800 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-primary/8 flex items-center justify-between">
              <span className="text-xs font-semibold text-accent-700 group-hover:text-primary transition-colors flex items-center gap-1.5">
                <UserCheck size={16} /> Continue as Customer
              </span>
              <span className="text-xs text-primary/40">Demo Mode</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center py-4 border-t border-primary/5 text-xs text-primary/40">
        Garment House • Modern Garment Retail Management Frontend Architecture
      </footer>
    </div>
  );
}


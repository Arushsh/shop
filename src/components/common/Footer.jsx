import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Check, ArrowRight, ShieldCheck, RefreshCw, Truck, Heart, Phone, Award } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-12 border-t border-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-white/10 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-white/5 text-accent flex-shrink-0">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Express Delivery</h4>
              <p className="text-[11px] text-white/60">Complimentary above ₹2,999</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-white/5 text-accent flex-shrink-0">
              <RefreshCw size={22} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">10-Day Exchanges</h4>
              <p className="text-[11px] text-white/60">Hassle-free doorstep collection</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-white/5 text-accent flex-shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Authentic Materials</h4>
              <p className="text-[11px] text-white/60">Giza cotton & Normandy linen</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-white/5 text-accent flex-shrink-0">
              <Award size={22} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Atelier Bespoke</h4>
              <p className="text-[11px] text-white/60">European artisanal tailoring</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white/5 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="max-w-md text-center md:text-left space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
              THREADLINE Private Circle
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Unlock 15% Off Your First Bespoke Order
            </h3>
            <p className="text-xs text-white/60">
              Receive seasonal lookbooks, invitation-only private archive sales, and fabric provenance updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-5 py-3 rounded-full text-xs font-medium flex items-center justify-center gap-2">
                <Check size={16} /> Welcome to the Circle! Voucher code sent to your inbox.
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter your personal email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-11 pr-4 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/15 transition-all"
                  />
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                </div>
                <button
                  type="submit"
                  className="bg-accent text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-accent-600 transition-colors flex items-center gap-1.5 flex-shrink-0 shadow-md"
                >
                  Join <ArrowRight size={14} />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-extrabold text-2xl tracking-tighter text-white">THREADLINE</span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-accent font-semibold -mt-1">
                Atelier & Storefront
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-sm text-xs">
              THREADLINE is a contemporary luxury fashion house celebrating the intersection of European tailoring, artisanal handcraft, and pure natural fibers.
            </p>
            <div className="pt-2 text-[11px] text-white/50 space-y-1">
              <p>Customer Concierge: +91 (80) 4123-8899</p>
              <p>Email: concierge@threadline.com</p>
              <p>Mon – Sat: 09:00 AM – 08:00 PM IST</p>
            </div>
          </div>

          {/* Wardrobe */}
          <div className="space-y-3">
            <h4 className="font-bold text-accent uppercase tracking-wider text-[11px]">Wardrobe</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link to="/shop?gender=Men" className="hover:text-white transition-colors">Men's Collection</Link></li>
              <li><Link to="/shop?gender=Women" className="hover:text-white transition-colors">Women's Collection</Link></li>
              <li><Link to="/shop?gender=Kids" className="hover:text-white transition-colors">Kids' Ready-to-Wear</Link></li>
              <li><Link to="/shop?category=Shirts" className="hover:text-white transition-colors">Bespoke Oxford Shirts</Link></li>
              <li><Link to="/shop?category=Ethnic%20Wear" className="hover:text-white transition-colors">Normandy Linen Kurtas</Link></li>
              <li><Link to="/shop?tag=new" className="hover:text-white transition-colors">Fresh Autumn Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-bold text-accent uppercase tracking-wider text-[11px]">Customer Care</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link to="/orders" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">Customer Portal</Link></li>
              <li><Link to="/addresses" className="hover:text-white transition-colors">Saved Addresses</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Product Reviews</Link></li>
              <li><span className="text-white/50 cursor-pointer hover:text-white">Shipping & Customs</span></li>
              <li><span className="text-white/50 cursor-pointer hover:text-white">Returns & Exchanges</span></li>
            </ul>
          </div>

          {/* Atelier House */}
          <div className="space-y-3">
            <h4 className="font-bold text-accent uppercase tracking-wider text-[11px]">The House</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link to="/admin" className="text-accent font-bold hover:text-white transition-colors flex items-center gap-1.5"><ShieldCheck size={13} /> Admin Dashboard</Link></li>
              <li><span className="text-white/50 cursor-pointer hover:text-white">About THREADLINE</span></li>
              <li><span className="text-white/50 cursor-pointer hover:text-white">Fabric Provenance</span></li>
              <li><span className="text-white/50 cursor-pointer hover:text-white">Sustainability & Wool</span></li>
              <li><span className="text-white/50 cursor-pointer hover:text-white">Atelier Master Tailors</span></li>
              <li><span className="text-white/50 cursor-pointer hover:text-white">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Card Badges */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>© {new Date().getFullYear()} THREADLINE Atelier Inc. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Visa</span>
            <span>•</span>
            <span>MasterCard</span>
            <span>•</span>
            <span>UPI</span>
            <span>•</span>
            <span>RuPay</span>
            <span>•</span>
            <span>NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


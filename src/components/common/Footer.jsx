import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, RefreshCw, Truck, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-atelier-dark text-white pt-16 sm:pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Brand Core Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/5 text-atelier-champagne flex-shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Express Delivery</h4>
              <p className="text-[11px] text-white/50">Complimentary above ₹2,999</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/5 text-atelier-champagne flex-shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">10-Day Exchanges</h4>
              <p className="text-[11px] text-white/50">Doorstep pickup assistance</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/5 text-atelier-champagne flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Authentic Materials</h4>
              <p className="text-[11px] text-white/50">Giza cotton & Normandy linen</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/5 text-atelier-champagne flex-shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Bespoke Atelier</h4>
              <p className="text-[11px] text-white/50">Precision hand-tailoring</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Identity Column (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-atelier-champagne flex items-center justify-center font-serif text-xl font-bold tracking-tighter text-atelier-champagne">
                T.
              </div>
              <div>
                <span className="block text-xl font-black tracking-tighter text-white">
                  THREADLINE
                </span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-atelier-champagne font-semibold -mt-0.5">
                  ATELIER & STOREFRONT
                </span>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm pt-1">
              Bespoke craftsmanship and contemporary luxury garment atelier. Woven with the finest natural fibers and engineered for your unique silhouette.
            </p>

            <div className="pt-2 text-xs text-white/50 space-y-1 font-mono">
              <p>Atelier: 42 Savile Row / 18 Biella Avenue</p>
              <p>Client Concierge: concierge@threadline-atelier.com</p>
              <p>Phone: +91 (0) 80 4920 1800</p>
            </div>
          </div>

          {/* Navigation Columns (8 Cols) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            {/* SHOP */}
            <div className="space-y-3">
              <h4 className="font-bold uppercase tracking-widest text-atelier-champagne text-[11px]">
                SHOP
              </h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/shop?gender=Men" className="hover:text-white transition-colors">Men</Link></li>
                <li><Link to="/shop?gender=Women" className="hover:text-white transition-colors">Women</Link></li>
                <li><Link to="/shop?gender=Kids" className="hover:text-white transition-colors">Kids</Link></li>
                <li><Link to="/shop?tag=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link to="/shop?tag=bestseller" className="hover:text-white transition-colors">Best Sellers</Link></li>
              </ul>
            </div>

            {/* CUSTOMER CARE */}
            <div className="space-y-3">
              <h4 className="font-bold uppercase tracking-widest text-atelier-champagne text-[11px]">
                CUSTOMER CARE
              </h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/orders" className="hover:text-white transition-colors">Track Order</Link></li>
                <li><Link to="/profile" className="hover:text-white transition-colors">Account Portal</Link></li>
                <li><Link to="/addresses" className="hover:text-white transition-colors">Shipping Addresses</Link></li>
                <li><Link to="/reviews" className="hover:text-white transition-colors">Client Reviews</Link></li>
                <li><span className="text-white/40 cursor-default">Doorstep Return Policy</span></li>
              </ul>
            </div>

            {/* ABOUT */}
            <div className="space-y-3">
              <h4 className="font-bold uppercase tracking-widest text-atelier-champagne text-[11px]">
                ABOUT
              </h4>
              <ul className="space-y-2 text-white/70">
                <li><span className="text-white/80 hover:text-white cursor-pointer">Our Heritage Story</span></li>
                <li><span className="text-white/80 hover:text-white cursor-pointer">Bespoke Craftsmanship</span></li>
                <li><span className="text-white/80 hover:text-white cursor-pointer">Ethical Mills & Fibers</span></li>
                <li><span className="text-white/50 cursor-pointer">Privacy Policy</span></li>
                <li><span className="text-white/50 cursor-pointer">Terms & Conditions</span></li>
              </ul>
            </div>

            {/* SOCIAL & ATELIER ACCESS */}
            <div className="space-y-3">
              <h4 className="font-bold uppercase tracking-widest text-atelier-champagne text-[11px]">
                CONNECT
              </h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white flex items-center gap-1"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight size={12} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white flex items-center gap-1"
                  >
                    <span>Pinterest</span>
                    <ArrowUpRight size={12} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={12} />
                  </a>
                </li>
                <li className="pt-2">
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-atelier-champagne hover:text-primary transition-all text-[10px] font-bold tracking-wider uppercase border border-white/10"
                  >
                    <span>Staff Portal</span>
                    <ArrowUpRight size={10} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} THREADLINE ATELIER. All Rights Reserved. Master Tailoring & Fine Apparel.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

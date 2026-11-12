import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Sparkles, Star, Check, ShieldCheck, Mail, Loader2
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import ProductCard from '../../components/user/ProductCard';
import CinematicHeroSlider from '../../components/user/CinematicHeroSlider';
import AtelierCollections from '../../components/user/AtelierCollections';
import ArtOfBespoke from '../../components/user/ArtOfBespoke';
import BrandCampaign from '../../components/user/BrandCampaign';
import { MOCK_CATEGORIES, MOCK_REVIEWS } from '../../data/mockData';

export default function UserHome() {
  const navigate = useNavigate();
  const { products } = useStore();

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [newsletterMsg, setNewsletterMsg] = useState('');

  // Slices from actual store
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestseller).slice(0, 4);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterMsg('');

    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterStatus('error');
      setNewsletterMsg('Please enter a valid personal email address.');
      return;
    }

    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterMsg('Thank you. Welcome to the THREADLINE Private Circle.');
      setNewsletterEmail('');
      setTimeout(() => {
        setNewsletterStatus('idle');
        setNewsletterMsg('');
      }, 5000);
    }, 900);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ================= PHASE 4: CINEMATIC HERO SLIDER ================= */}
      <CinematicHeroSlider />

      {/* ================= PHASE 5: THE ATELIER COLLECTIONS ================= */}
      <AtelierCollections />

      {/* ================= PHASE 6: NEW ARRIVALS (THE LATEST EDIT) ================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-primary/10 pb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-atelier-champagne">
              Seasonal Drop
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-primary tracking-tight mt-1">
              The Latest Edit
            </h2>
            <p className="text-xs sm:text-sm text-primary/60 font-sans mt-1">
              Discover pieces selected for the modern wardrobe.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1.5 group"
          >
            <span>View All Products</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= PHASE 7: THE ART OF BESPOKE ================= */}
      <ArtOfBespoke />

      {/* ================= PHASE 8: BEST SELLERS (THE SIGNATURE SELECTION) ================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-primary/10 pb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-atelier-champagne">
              Timeless Staples
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-primary tracking-tight mt-1">
              The Signature Selection
            </h2>
            <p className="text-xs sm:text-sm text-primary/60 font-sans mt-1">
              Our patrons' most celebrated bespoke garments and everyday essentials.
            </p>
          </div>
          <Link
            to="/shop?tag=bestseller"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1.5 group"
          >
            <span>Explore All Signatures</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= PHASE 9: SHOP BY CATEGORY ================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-primary/10 pb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-atelier-champagne">
              Department Portals
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-primary tracking-tight mt-1">
              Your Wardrobe. Your Expression.
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1.5 group"
          >
            <span>Explore Catalog Index</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {MOCK_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer shadow-sm hover:shadow-card-hover transition-all duration-300 bg-primary/5"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase tracking-widest text-atelier-champagne font-semibold block">
                  {cat.tag}
                </span>
                <h3 className="font-serif font-medium text-lg text-white mt-0.5 leading-tight group-hover:text-atelier-champagne transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-white/60 block mt-0.5">
                  {cat.count} Designs
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PHASE 10: BRAND CAMPAIGN ================= */}
      <BrandCampaign />

      {/* ================= PHASE 11: CUSTOMER REVIEWS ================= */}
      <section className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 border border-primary/10 shadow-sm space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary/10 pb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-atelier-champagne">
              Verified Patron Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-primary tracking-tight mt-1">
              Experiences That Speak.
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-atelier-offwhite px-5 py-3 rounded-2xl border border-primary/5">
            <div className="text-center">
              <span className="text-2xl font-black text-primary font-serif">4.8</span>
              <div className="flex text-amber-500 mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={13} fill="currentColor" />
                ))}
              </div>
            </div>
            <div className="border-l border-primary/15 pl-4 text-xs text-primary/70">
              <p className="font-bold text-primary font-sans">14,200+ Verified Reviews</p>
              <p className="text-[11px]">98% Recommend THREADLINE</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {MOCK_REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-atelier-offwhite p-6 sm:p-7 rounded-2xl space-y-4 border border-primary/5 hover:border-primary/15 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        fill={s <= rev.rating ? 'currentColor' : 'none'}
                        className={s <= rev.rating ? 'text-amber-500' : 'text-primary/20'}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-primary/40 font-mono">{rev.date}</span>
                </div>

                <h3 className="font-serif font-medium text-base text-primary leading-snug">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-primary/70 font-sans leading-relaxed line-clamp-3">
                  {rev.text}
                </p>
              </div>

              <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-atelier-dark text-atelier-champagne text-xs font-serif font-bold flex items-center justify-center">
                    {rev.customerAvatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary">{rev.customerName}</p>
                    <p className="text-[10px] text-primary/50 truncate max-w-[140px]">
                      {rev.productName}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                  <Check size={10} /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/reviews"
            className="text-xs font-bold uppercase tracking-wider text-atelier-champagne hover:text-atelier-gold underline inline-flex items-center gap-1.5"
          >
            <span>Read All Verified Patron Reviews</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ================= PHASE 12: NEWSLETTER ================= */}
      <section className="bg-atelier-dark text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-atelier-champagne">
            Privilege Circle
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight leading-tight">
            Let Elegance Find Its Way To You.
          </h2>

          <p className="text-xs sm:text-sm text-white/70 font-sans max-w-lg mx-auto leading-relaxed">
            Be the first to discover new arrivals, exclusive collections and updates from THREADLINE. Receive our seasonal lookbook and bespoke private archive invites.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your personal email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterStatus === 'loading'}
                  className="w-full bg-white/10 border border-white/20 rounded-full py-3.5 pl-11 pr-4 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-atelier-champagne transition-all"
                />
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              </div>

              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="bg-atelier-champagne hover:bg-atelier-gold text-atelier-dark px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 flex-shrink-0"
              >
                {newsletterStatus === 'loading' ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </div>

            {newsletterStatus === 'success' && (
              <p className="text-xs text-emerald-400 font-medium animate-in fade-in">
                {newsletterMsg}
              </p>
            )}

            {newsletterStatus === 'error' && (
              <p className="text-xs text-rose-400 font-medium animate-in fade-in">
                {newsletterMsg}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

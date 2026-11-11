import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, TrendingUp, Award, Layers, Star,
  ShieldCheck, Tag, Copy, Check, Clock, ChevronRight, ChevronLeft
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import ProductCard from '../../components/user/ProductCard';
import ProductShowcaseHero from '../../components/user/ProductShowcaseHero';
import { MOCK_CATEGORIES, MOCK_COLLECTIONS, MOCK_REVIEWS, MOCK_COUPONS } from '../../data/mockData';

export default function UserHome() {
  const navigate = useNavigate();
  const { products } = useStore();

  const [copiedCoupon, setCopiedCoupon] = useState('');

  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestseller).slice(0, 4);

  const copyCode = (code) => {
    navigator.clipboard?.writeText?.(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(''), 3000);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 1. HAUTE BESPOKE HERO SCROLL SHOWCASE */}
      <ProductShowcaseHero />

      {/* 2. PROMOTIONAL COUPON TICKER */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_COUPONS.map((coupon) => (
          <div
            key={coupon.code}
            className="bg-white rounded-2xl p-4 border border-primary/10 shadow-sm flex items-center justify-between gap-3 hover:border-accent/40 transition-colors"
          >
            <div className="space-y-0.5 min-w-0">
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                Special Offer
              </span>
              <p className="font-bold text-xs text-primary truncate">{coupon.label}</p>
              <p className="text-[10px] text-primary/50">On orders above ₹{coupon.min}</p>
            </div>

            <button
              onClick={() => copyCode(coupon.code)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-accent hover:text-white text-primary text-xs font-mono font-bold transition-colors flex-shrink-0"
              title="Copy Coupon Code"
            >
              {copiedCoupon === coupon.code ? (
                <>
                  <Check size={12} className="text-emerald-600" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>{coupon.code}</span>
                </>
              )}
            </button>
          </div>
        ))}
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-primary/8 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Curated Wardrobe
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1"
          >
            Explore All Categories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {MOCK_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer shadow-sm hover:shadow-card-hover transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-accent font-semibold block">
                  {cat.tag}
                </span>
                <h3 className="font-bold text-base text-white mt-0.5 leading-tight">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-white/70 block mt-0.5">
                  {cat.count} Designs Available
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NEW ARRIVALS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-primary/8 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent">
              <Sparkles size={14} /> Seasonal Drop
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              Fresh New Arrivals
            </h2>
          </div>
          <Link
            to="/shop?tag=new"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1"
          >
            View All New In <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL SPECIAL OFFERS BANNER */}
      <section className="relative rounded-3xl overflow-hidden bg-primary text-white p-8 sm:p-14 shadow-xl border border-primary/20">
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 opacity-30 sm:opacity-60 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&fit=crop"
            alt="Linen editorial"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/20 px-3 py-1 rounded-full border border-accent/30 inline-block">
            Festival & Seasonal Privileges
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            The Bespoke Wardrobe Upgrade: Save Up to 28%
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Elevate your personal lookbook with Italian milled fabrics, double-pleated trousers, and structured blazers. Apply coupon <strong>SPRING25</strong> at checkout.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/shop?discount=true')}
              className="btn-accent px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg"
            >
              Shop Promotional Edit
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              View Full Catalog
            </button>
          </div>
        </div>
      </section>

      {/* 6. TRENDING PRODUCTS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-primary/8 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent">
              <TrendingUp size={14} /> Customer Favorites
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              Trending Garments Right Now
            </h2>
          </div>
          <Link
            to="/shop?sort=popular"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1"
          >
            Explore Trending Styles <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. FEATURED COLLECTIONS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-primary/8 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent">
              <Layers size={14} /> Editorial Curations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              Featured Collections
            </h2>
          </div>
          <p className="text-xs text-primary/50">Designed around moments, climates, and dress codes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => navigate('/shop')}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  {col.season}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors leading-tight">
                  {col.name}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                  {col.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. HOMEPAGE CUSTOMER REVIEWS & TESTIMONIALS */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-primary/8 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-primary/8 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Verified Shopper Satisfaction
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              What Our Patrons Say
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-[#F7F7F5] px-4 py-2.5 rounded-2xl">
            <div className="text-center">
              <span className="text-2xl font-black text-primary">4.8</span>
              <div className="flex text-amber-500 mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} fill="currentColor" />
                ))}
              </div>
            </div>
            <div className="border-l border-primary/10 pl-4 text-xs text-primary/60">
              <p className="font-bold text-primary">14,200+ Reviews</p>
              <p className="text-[11px]">98% Recommend THREADLINE</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="card bg-[#F7F7F5] p-6 space-y-4 border border-primary/5 hover:border-primary/15 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= rev.rating ? 'currentColor' : 'none'}
                        className={s <= rev.rating ? 'text-amber-500' : 'text-primary/20'}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-primary/40 font-medium">{rev.date}</span>
                </div>

                <h4 className="font-bold text-sm text-primary leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-primary/70 leading-relaxed line-clamp-3">
                  {rev.text}
                </p>
              </div>

              <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary text-accent text-xs font-bold flex items-center justify-center">
                    {rev.customerAvatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary">{rev.customerName}</p>
                    <p className="text-[10px] text-primary/50 truncate max-w-[150px]">
                      Verified: {rev.productName}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                  <Check size={10} /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/reviews"
            className="text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-800 underline inline-flex items-center gap-1"
          >
            Read All 14,200+ Verified Customer Reviews <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* 9. BEST SELLERS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-primary/8 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent">
              <Award size={14} /> Timeless Staples
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              All-Time Best Sellers
            </h2>
          </div>
          <Link
            to="/shop?tag=bestseller"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1"
          >
            Shop All Best Sellers <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

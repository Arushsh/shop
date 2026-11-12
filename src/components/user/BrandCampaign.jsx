import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function BrandCampaign() {
  const navigate = useNavigate();

  return (
    <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-atelier-dark text-white min-h-[460px] sm:min-h-[520px] flex items-center shadow-2xl border border-white/10">
      {/* Background Editorial Image with Atmospheric Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=1600&h=900&fit=crop"
          alt="Bespoke Sartorial Campaign"
          className="w-full h-full object-cover object-center brightness-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-atelier-dark via-atelier-dark/85 to-transparent/60" />
      </div>

      {/* Content Canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16 w-full">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-atelier-champagne/20 border border-atelier-champagne/40 text-atelier-champagne text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            <Sparkles size={13} /> The Philosophy
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-[1.1]">
            Timeless in Craft. <br />
            <span className="italic font-normal text-atelier-champagne">Distinctive in Style.</span>
          </h2>

          <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed max-w-lg">
            More than clothing, an expression of individuality. Discover a thoughtful approach to modern dressing rooted in artisanal heritage, ethical long-staple fibers, and precise tailoring.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/shop')}
              className="bg-atelier-champagne hover:bg-atelier-gold text-atelier-dark font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <span>Explore The Atelier</span>
              <ArrowUpRight size={15} />
            </button>
            <button
              onClick={() => navigate('/shop?tag=new')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-md"
            >
              Seasonal Lookbook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowUpRight, ChevronLeft, ChevronRight, Play, Pause,
  Sparkles, MousePointer, ShieldCheck, CheckCircle2, Eye, Compass
} from 'lucide-react';

const SHOWCASE_SLIDES = [
  {
    id: 'slide-1',
    number: '01',
    badge: 'Atelier Sartorial 2025',
    title: 'Experience the Precision of Custom Tailoring',
    subtitle: 'Every stitch crafted to perfection for your unique silhouette. Full floating canvas and sculpted contours for lifetime elegance.',
    ctaText: 'Explore Bespoke Collection',
    ctaLink: '/shop?gender=Men',
    bgTheme: '#1A1513', // Warm charcoal espresso
    accentColor: '#C49A6C', // Warm gold
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&h=1200&fit=crop',
    lookName: 'The Diplomat Overcoat & Bespoke Charcoal 3-Piece',
    price: '₹18,999',
    fabric: 'Super 150s Biella Wool & Cashmere',
    details: [
      { label: 'Construction', value: 'Full Floating Canvas' },
      { label: 'Lapel', value: 'Hand-Rolled Peak Lapel' },
      { label: 'Buttons', value: 'Genuine Horn Buttons' }
    ]
  },
  {
    id: 'slide-2',
    number: '02',
    badge: 'Milan Runway Edition',
    title: 'Italian Wool & Handcrafted Linens',
    subtitle: 'Sourced from the historic mills of Northern Italy. Lightly structured for effortless modern mobility from boardroom to dinner.',
    ctaText: 'View Sartorial Edit',
    ctaLink: '/shop?category=Jackets',
    bgTheme: '#111C24', // Deep sapphire navy
    accentColor: '#D4AF37', // Polished gold
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1600&h=1200&fit=crop',
    lookName: 'Savile Double-Breasted Midnight Wool Blazer',
    price: '₹14,499',
    fabric: '100% Australian Merino Wool (280 GSM)',
    details: [
      { label: 'Cut', value: 'Slim Architectural' },
      { label: 'Lining', value: '100% Cupro Silk' },
      { label: 'Vents', value: 'Dual English Vents' }
    ]
  },
  {
    id: 'slide-3',
    number: '03',
    badge: 'Ceremonial & Evening',
    title: 'Modern Power & Evening Black Tie',
    subtitle: 'Crisp satin lapels, hand-finished Milanese buttonholes, and drape that commands immediate presence at any gala.',
    ctaText: 'Explore Evening Wear',
    ctaLink: '/shop?tag=new',
    bgTheme: '#16141A', // Obsidian plum
    accentColor: '#C9A96E', // Champagne gold
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&h=1200&fit=crop',
    lookName: 'Atelier Nocturne Shawl-Lapel Tuxedo',
    price: '₹22,999',
    fabric: 'Silk-Wool Barathea Weave',
    details: [
      { label: 'Facing', value: 'Duchess Satin' },
      { label: 'Waist', value: 'Silk Cummerbund Band' },
      { label: 'Finish', value: 'Nano Stain-Resistant' }
    ]
  },
  {
    id: 'slide-4',
    number: '04',
    badge: 'Heritage Collection',
    title: 'Suits Tailored for Every Occasion',
    subtitle: 'Be it a boardroom or a gala, your suit will be the talk of the event. Impeccable tailoring engineered for distinction.',
    ctaText: 'Make Appointment',
    ctaLink: '/shop?category=Shirts',
    bgTheme: '#2A1218', // Rich Burgundy Wine (matching the video's 00:00 screenshot)
    accentColor: '#E6B87D', // Warm brass
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=1600&h=1200&fit=crop',
    lookName: 'The Executive 3-Piece Burgundy Wool Suit',
    price: '₹16,799',
    fabric: 'Fine Worsted Wool & Silk Blend',
    details: [
      { label: 'Vest', value: '6-Button Low Cut Vest' },
      { label: 'Trousers', value: 'Flat Front Side Adjusters' },
      { label: 'Stitch', value: 'AMF Pick Stitching' }
    ]
  }
];

export default function ProductShowcaseHero() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showSpecsModal, setShowSpecsModal] = useState(false);

  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isWheelingRef = useRef(false);
  const autoPlayTimerRef = useRef(null);

  const total = SHOWCASE_SLIDES.length;
  const currentSlide = SHOWCASE_SLIDES[current];

  // Go next slide
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  // Go prev slide
  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying && !isHovered) {
      autoPlayTimerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => clearInterval(autoPlayTimerRef.current);
  }, [isPlaying, isHovered, nextSlide]);

  // Interactive mouse wheel scroll handler
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // Determine if vertical scroll dominates
      if (Math.abs(e.deltaY) < 18) return;

      if (isWheelingRef.current) {
        // Prevent jarring jumps during animation
        e.preventDefault();
        return;
      }

      // If scrolling down
      if (e.deltaY > 0) {
        if (current < total - 1) {
          e.preventDefault();
          isWheelingRef.current = true;
          nextSlide();
          setTimeout(() => {
            isWheelingRef.current = false;
          }, 650);
        } else {
          // At the last slide, allow normal page scroll down
          isWheelingRef.current = false;
        }
      } else {
        // Scrolling up
        if (current > 0) {
          e.preventDefault();
          isWheelingRef.current = true;
          prevSlide();
          setTimeout(() => {
            isWheelingRef.current = false;
          }, 650);
        } else {
          // At first slide, allow normal scroll up
          isWheelingRef.current = false;
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [current, total, nextSlide, prevSlide]);

  // Touch swipe support (mobile/tablet)
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;

    // Detect significant horizontal or vertical swipe inside the showcase
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) nextSlide();
      else prevSlide();
    } else if (Math.abs(deltaY) > 55) {
      if (deltaY > 0 && current < total - 1) {
        nextSlide();
      } else if (deltaY < 0 && current > 0) {
        prevSlide();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, nextSlide, prevSlide]);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 select-none group border border-primary/10"
      style={{ backgroundColor: currentSlide.bgTheme }}
      aria-label="Bespoke Garment Showcase"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] sm:min-h-[640px] lg:min-h-[680px]">
        {/* ================= LEFT EDITORIAL PANEL ================= */}
        <div
          className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white relative z-10 transition-colors duration-700"
          style={{ backgroundColor: currentSlide.bgTheme }}
        >
          {/* Top Bar: Monogram & Contact/Atelier link */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full border flex items-center justify-center font-serif text-xl font-bold tracking-tighter"
                style={{ borderColor: currentSlide.accentColor, color: currentSlide.accentColor }}
              >
                T.
              </div>
              <div>
                <span className="block text-[11px] font-extrabold uppercase tracking-[0.2em] text-white">
                  THREADLINE
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-white/50">
                  Haute Sartorial
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/shop"
                className="text-[11px] font-semibold text-white/70 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                <span>Atelier Index</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* Middle: Counter, Title, Description, and CTA */}
          <div className="py-6 sm:py-10 space-y-4 sm:space-y-6">
            {/* Slide Index Counter (e.g. 01 - 04) */}
            <div className="flex items-center gap-3">
              <span
                className="text-xs sm:text-sm font-mono font-bold tracking-widest transition-all duration-300"
                style={{ color: currentSlide.accentColor }}
              >
                {currentSlide.number} — 0{total}
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">
                {currentSlide.badge}
              </span>
            </div>

            {/* Editorial Title */}
            <h2
              key={`title-${current}`}
              className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-white leading-[1.15] animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              {currentSlide.title}
            </h2>

            {/* Subtitle / Paragraph */}
            <p
              key={`sub-${current}`}
              className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans max-w-md animate-in fade-in slide-in-from-bottom-1 duration-500 delay-75"
            >
              {currentSlide.subtitle}
            </p>

            {/* Action CTA link/button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(currentSlide.ctaLink)}
                className="group/btn inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: currentSlide.accentColor,
                  color: '#111A22'
                }}
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                />
              </button>

              <button
                onClick={() => setShowSpecsModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md transition-all"
              >
                <Eye size={14} />
                <span>Look Specs</span>
              </button>
            </div>
          </div>

          {/* Bottom Bar: Slide Controls & Interactive Scroll Hint */}
          <div className="pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            {/* Scroll Indicator Hint */}
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-white/50 font-medium tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full animate-ping bg-accent" />
              <MousePointer size={12} className="text-white/60" />
              <span>Scroll wheel or swipe to switch looks</span>
            </div>

            {/* Pagination & Arrows */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Play/Pause Autoplay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                title={isPlaying ? 'Pause Auto-rotate' : 'Play Auto-rotate'}
                aria-label={isPlaying ? 'Pause Auto-rotate' : 'Play Auto-rotate'}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              </button>

              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white text-white hover:text-primary transition-all flex items-center justify-center backdrop-blur-sm"
                aria-label="Previous Look"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {SHOWCASE_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      current === idx ? 'w-6' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    style={{
                      backgroundColor: current === idx ? currentSlide.accentColor : undefined
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white text-white hover:text-primary transition-all flex items-center justify-center backdrop-blur-sm"
                aria-label="Next Look"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT EDITORIAL VISUAL ================= */}
        <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px] lg:min-h-full overflow-hidden bg-primary/20">
          {/* Background image with smooth crossfade */}
          {SHOWCASE_SLIDES.map((slide, idx) => {
            const isActive = current === idx;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ease-out transform ${
                  isActive
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-top sm:object-center"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Subtle vignette and gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 lg:bg-gradient-to-r lg:from-black/40 lg:via-transparent lg:to-black/20" />
              </div>
            );
          })}

          {/* Floating Luxury Spec Card on image */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto z-20 max-w-sm">
            <div className="bg-black/65 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-white shadow-2xl transition-all duration-500">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15"
                  style={{ color: currentSlide.accentColor }}
                >
                  Featured Tailoring
                </span>
                <span className="text-base sm:text-lg font-extrabold text-white">
                  {currentSlide.price}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1 mb-1 font-serif">
                {currentSlide.lookName}
              </h4>

              <p className="text-[11px] text-white/70 line-clamp-1 mb-3">
                {currentSlide.fabric}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
                <span className="text-white/60 flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-400" /> Made to Measure
                </span>
                <button
                  onClick={() => navigate(currentSlide.ctaLink)}
                  className="font-bold underline underline-offset-4 hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>Shop Look</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Floating Tag Pill (Top Right) */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium">
              <Sparkles size={12} style={{ color: currentSlide.accentColor }} />
              <span>Handcrafted in Biella & Savile Row</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL: BESPOKE LOOK SPECIFICATIONS ================= */}
      {showSpecsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowSpecsModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 text-primary relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-primary/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  Atelier Specifications
                </span>
                <h3 className="text-xl font-bold font-serif text-primary mt-0.5">
                  {currentSlide.lookName}
                </h3>
              </div>
              <button
                onClick={() => setShowSpecsModal(false)}
                className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary/10 text-primary flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-primary/5">
                <span className="font-semibold text-primary/60">Reference Price</span>
                <span className="font-extrabold text-primary text-base">{currentSlide.price}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-primary/5">
                <span className="font-semibold text-primary/60">Fabric Composition</span>
                <span className="font-bold text-primary">{currentSlide.fabric}</span>
              </div>

              {currentSlide.details.map((d) => (
                <div key={d.label} className="flex justify-between items-center py-2 border-b border-primary/5">
                  <span className="font-semibold text-primary/60">{d.label}</span>
                  <span className="font-medium text-primary">{d.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#F7F7F5] p-4 rounded-2xl flex items-center gap-3">
              <Compass size={22} className="text-accent flex-shrink-0" />
              <p className="text-[11px] text-primary/70 leading-relaxed">
                Includes complimentary in-house master tailor adjustments and lifetime garment press servicing.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setShowSpecsModal(false);
                  navigate(currentSlide.ctaLink);
                }}
                className="flex-1 bg-primary hover:bg-primary-700 text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>View Matching Garments</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

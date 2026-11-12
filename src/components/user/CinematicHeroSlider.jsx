import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';
import gsap from 'gsap';

export const HERO_SLIDES = [
  {
    id: 'slide-01',
    number: '01',
    tag: 'BESPOKE',
    collection: 'Atelier Sartorial 2025',
    headline: 'Experience the Precision of Custom Tailoring',
    description: 'Every stitch crafted to perfection for your unique silhouette. Full floating canvas and sculpted contours for lifetime elegance.',
    ctaText: 'EXPLORE BESPOKE COLLECTION',
    ctaLink: '/shop?gender=Men',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&h=1200&fit=crop',
    imageAlt: 'Sophisticated gentleman in bespoke tailored coat and charcoal suit in European stone setting',
    craftBadge: 'Full Floating Canvas • Hand-Finished Lapel',
    bgTone: '#171311',
  },
  {
    id: 'slide-02',
    number: '02',
    tag: 'HERITAGE',
    collection: 'Heritage Craftsmanship',
    headline: 'Tradition Woven Into Every Thread',
    description: 'Discover exceptional fabrics and timeless craftsmanship, designed for those who appreciate the art of dressing well.',
    ctaText: 'DISCOVER OUR CRAFT',
    ctaLink: '/shop?category=Shirts',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1600&h=1200&fit=crop',
    imageAlt: 'Close-up of bespoke tailoring, fine wool fabrics, and atelier artisan craftsmanship',
    craftBadge: 'Italian Biella Mills • 100% Normandy Linen',
    bgTone: '#151719',
  },
  {
    id: 'slide-03',
    number: '03',
    tag: 'CONTEMPORARY',
    collection: 'Autumn / Winter Edit',
    headline: 'Redefining Modern Elegance',
    description: 'Contemporary silhouettes meet timeless design. Discover a new expression of personal style.',
    ctaText: 'EXPLORE NEW ARRIVALS',
    ctaLink: '/shop?tag=new',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1600&h=1200&fit=crop',
    imageAlt: 'Modern luxury fashion editorial featuring a model in contemporary double-breasted tailored suit',
    craftBadge: 'Architectural Shoulders • Cupro Silk Lining',
    bgTone: '#16191E',
  },
  {
    id: 'slide-04',
    number: '04',
    tag: 'PERSONAL STYLE',
    collection: 'Bespoke Silhouette',
    headline: 'Made for Your Distinctive Identity',
    description: 'Your style, your measurements, your expression. Experience clothing created around you.',
    ctaText: 'EXPLORE THE COLLECTION',
    ctaLink: '/shop',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=1600&h=1200&fit=crop',
    imageAlt: 'Executive 3-piece tailored suit in rich burgundy wool blend on European street',
    craftBadge: 'AMF Pick Stitching • Personalized Monogramming',
    bgTone: '#1F1418',
  },
];

export default function CinematicHeroSlider() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const imageContainerRef = useRef(null);
  const progressBarRef = useRef(null);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const wheelLockRef = useRef(false);

  const total = HERO_SLIDES.length;
  const slide = HERO_SLIDES[current];

  // GSAP Transition Coordinator
  const runSlideTransition = useCallback(
    (nextIndex, direction = 1) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        setCurrent(nextIndex);
        setIsAnimating(false);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      // 1. Text Exit Animation
      tl.to([headlineRef.current, descRef.current, ctaRef.current], {
        y: direction > 0 ? -16 : 16,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
      });

      // 2. Change state halfway
      tl.call(() => {
        setCurrent(nextIndex);
      });

      // 3. New Slide Entrance
      tl.fromTo(
        [badgeRef.current, headlineRef.current, descRef.current, ctaRef.current],
        {
          y: direction > 0 ? 25 : -25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );

      // 4. Image reveal animation
      if (imageContainerRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          {
            scale: 1.05,
            opacity: 0.7,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.7'
        );
      }

      // 5. Progress bar pulse
      if (progressBarRef.current) {
        const progressPct = ((nextIndex + 1) / total) * 100;
        gsap.to(progressBarRef.current, {
          width: `${progressPct}%`,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    },
    [isAnimating, total]
  );

  const nextSlide = useCallback(() => {
    const nextIdx = (current + 1) % total;
    runSlideTransition(nextIdx, 1);
  }, [current, total, runSlideTransition]);

  const prevSlide = useCallback(() => {
    const prevIdx = (current === 0 ? total - 1 : current - 1);
    runSlideTransition(prevIdx, -1);
  }, [current, total, runSlideTransition]);

  const goToSlide = (idx) => {
    if (idx === current || isAnimating) return;
    runSlideTransition(idx, idx > current ? 1 : -1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) nextSlide();
      else prevSlide();
    }
  };

  // Scroll wheel navigation over hero with cooldown
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 20) return;
      if (wheelLockRef.current) return;

      if (e.deltaY > 0 && current < total - 1) {
        e.preventDefault();
        wheelLockRef.current = true;
        nextSlide();
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 750);
      } else if (e.deltaY < 0 && current > 0) {
        e.preventDefault();
        wheelLockRef.current = true;
        prevSlide();
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 750);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [current, total, nextSlide, prevSlide]);

  return (
    <section
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Cinematic Atelier Hero Showcase"
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-colors duration-700 border border-primary/15"
      style={{ backgroundColor: slide.bgTone }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] sm:min-h-[640px] lg:min-h-[680px]">
        {/* ================= LEFT EDITORIAL PANEL (~40% on Desktop) ================= */}
        <div
          ref={leftPanelRef}
          className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white relative z-10"
        >
          {/* Header Row: THREADLINE Emblem & Atelier Index Link */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-atelier-champagne flex items-center justify-center font-serif text-lg sm:text-xl font-bold tracking-tighter"
                style={{ color: '#C9A16E' }}
              >
                T.
              </div>
              <div>
                <span className="block text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-white">
                  THREADLINE
                </span>
                <span className="block text-[9px] uppercase tracking-[0.18em] text-atelier-champagne font-medium">
                  ATELIER SARTORIAL
                </span>
              </div>
            </div>

            <Link
              to="/shop"
              className="text-[10px] sm:text-xs font-semibold text-white/70 hover:text-atelier-champagne transition-colors uppercase tracking-wider flex items-center gap-1 group"
            >
              <span>Atelier Index</span>
              <ArrowUpRight
                size={13}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>

          {/* Middle Body: Slide Counter, Headline, Prose & CTA */}
          <div className="py-8 sm:py-10 space-y-5">
            {/* Slide Number & Collection Indicator */}
            <div ref={badgeRef} className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-atelier-champagne">
                {slide.number} / 0{total}
              </span>
              <div className="h-[1px] w-10 bg-white/20" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/60 font-semibold">
                {slide.collection}
              </span>
            </div>

            {/* Oversized Serif Headline */}
            <h1
              ref={headlineRef}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.12]"
            >
              {slide.headline}
            </h1>

            {/* Editorial Description */}
            <p
              ref={descRef}
              className="text-xs sm:text-sm text-white/75 font-sans leading-relaxed max-w-md"
            >
              {slide.description}
            </p>

            {/* Champagne CTA Button */}
            <div ref={ctaRef} className="pt-3 flex items-center gap-4">
              <button
                onClick={() => navigate(slide.ctaLink)}
                className="group/cta inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 text-[#171311] bg-atelier-champagne hover:bg-atelier-gold"
              >
                <span>{slide.ctaText}</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Bottom Row: Navigation Arrows, Progress Indicator & Indicators */}
          <div className="pt-5 border-t border-white/10 space-y-4">
            {/* Continuous Progress Bar */}
            <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-atelier-champagne transition-all duration-300"
                style={{ width: `${((current + 1) / total) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              {/* Slide Pill Numbers */}
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx)}
                    className={`text-xs font-mono px-2 py-1 rounded transition-all ${
                      current === idx
                        ? 'text-atelier-champagne font-bold bg-white/10'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white text-white hover:text-primary transition-all flex items-center justify-center disabled:opacity-50"
                  aria-label="Previous Look"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white text-white hover:text-primary transition-all flex items-center justify-center disabled:opacity-50"
                  aria-label="Next Look"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT EDITORIAL VISUAL (~60% on Desktop) ================= */}
        <div
          ref={imageContainerRef}
          className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] lg:min-h-full overflow-hidden bg-black/40"
        >
          {/* Main Fashion Model Image */}
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.imageAlt}
            className="w-full h-full object-cover object-top sm:object-center transition-opacity duration-700"
            loading="eager"
          />

          {/* Vignette Overlay for Depth & Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 lg:bg-gradient-to-r lg:from-black/50 lg:via-transparent lg:to-black/20" />

          {/* Floating Craftsmanship Badge */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto z-20 max-w-sm">
            <div className="bg-black/75 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-white shadow-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck size={14} className="text-atelier-champagne" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-atelier-champagne">
                  Bespoke Standard
                </span>
              </div>
              <p className="text-xs sm:text-sm font-serif font-medium text-white/90">
                {slide.craftBadge}
              </p>
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                <span>Handcrafted Precision</span>
                <span className="font-semibold text-atelier-champagne">{slide.tag}</span>
              </div>
            </div>
          </div>

          {/* Top-Right Atelier Stamp */}
          <div className="absolute top-6 right-6 z-20 hidden sm:block">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium">
              <Sparkles size={12} className="text-atelier-champagne" />
              <span>THREADLINE Private Atelier</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

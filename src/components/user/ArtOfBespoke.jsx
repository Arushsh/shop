import { Scissors, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'FABRIC SELECTION',
    detail: 'Rare Egyptian long-staple cottons, pure Normandy flax, and super 150s Merino wools curated directly from historic Italian and English mills.',
    icon: Scissors,
  },
  {
    number: '02',
    title: 'PRECISION MEASUREMENTS',
    detail: 'Over 24 anatomical posture points mapped to account for unique slope, chest breadth, and arm balance for a sculpted silhouette.',
    icon: Ruler,
  },
  {
    number: '03',
    title: 'MASTERFUL CONSTRUCTION',
    detail: 'Natural horsehair floating canvas and hand-stitched collar roll that mold effortlessly to your frame with each wear.',
    icon: Sparkles,
  },
  {
    number: '04',
    title: 'FINAL FINISHING',
    detail: 'Silk Milanese lapel buttonholes, genuine horn and mother-of-pearl closures, finished with private atelier hand-inspection.',
    icon: CheckCircle2,
  },
];

export default function ArtOfBespoke() {
  return (
    <section className="bg-atelier-dark text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl overflow-hidden relative">
      {/* Background Subtle Editorial Watermark */}
      <div className="absolute right-4 bottom-0 opacity-5 pointer-events-none select-none font-serif text-[180px] sm:text-[240px] leading-none text-white">
        TL
      </div>

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-atelier-champagne">
            Craftsmanship Story
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight leading-tight">
            The Art Is In The Detail.
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed pt-1">
            Exceptional tailoring begins with an understanding of the individual. From selecting the finest fabrics to the final finishing stitch, every detail has a purpose.
          </p>
        </div>

        {/* 4 Process Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-atelier-champagne/40 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-serif font-bold text-atelier-champagne">
                    {step.number}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-atelier-champagne group-hover:bg-atelier-champagne group-hover:text-primary transition-all">
                    <Icon size={16} />
                  </div>
                </div>

                <h3 className="font-serif text-lg font-medium text-white tracking-wide">
                  {step.title}
                </h3>

                <p className="text-xs text-white/65 leading-relaxed font-sans">
                  {step.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

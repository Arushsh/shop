import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const COLLECTIONS = [
  {
    id: 'bespoke-shirts',
    name: 'BESPOKE SHIRTS',
    subtitle: 'Italian Giza Egyptian Cotton',
    desc: 'Woven with split-yoke ergonomics and mother-of-pearl buttons for effortless distinction.',
    link: '/shop?category=Shirts',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=1200&h=900&fit=crop',
    aspect: 'md:col-span-7',
  },
  {
    id: 'linen-kurtas',
    name: 'LINEN KURTAS',
    subtitle: 'Pre-Washed French Normandy Flax',
    desc: 'Breezy silhouettes sculpted for festive celebrations and coastal gatherings.',
    link: '/shop?category=Ethnic%20Wear',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=900&fit=crop',
    aspect: 'md:col-span-5',
  },
  {
    id: 'premium-suiting',
    name: 'PREMIUM SUITING',
    subtitle: 'Super 150s Merino Wool & Cashmere',
    desc: 'Architectural shoulders and full floating chest canvassing that drape naturally to your physique.',
    link: '/shop?category=Jackets',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1200&h=900&fit=crop',
    aspect: 'md:col-span-5',
  },
  {
    id: 'raw-silk-occasion',
    name: 'RAW SILK & OCCASION WEAR',
    subtitle: 'Hand-Woven Matka Silk & Brocades',
    desc: 'Ceremonial evening silhouettes detailed with bespoke hand-embroidery.',
    link: '/shop?gender=Women',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&h=900&fit=crop',
    aspect: 'md:col-span-7',
  },
];

export default function AtelierCollections() {
  return (
    <section className="space-y-8 sm:space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-primary/10 pb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-atelier-champagne">
            Curated For The Distinguished
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-primary tracking-tight mt-1">
            The Atelier Collections
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-primary/60 max-w-md font-sans leading-relaxed">
          Explore the art of dressing well through our carefully curated collections. Handcrafted in limited seasonal batches.
        </p>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
        {COLLECTIONS.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className={`${item.aspect} group relative block overflow-hidden bg-primary/5 min-h-[360px] sm:min-h-[440px]`}
          >
            {/* Background Editorial Image with Smooth Hover Zoom */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity group-hover:from-black/90" />

            {/* Overlay Content */}
            <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-white z-10">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono tracking-widest text-atelier-champagne uppercase px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                  {item.subtitle}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-atelier-champagne group-hover:text-primary transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-atelier-champagne transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-md leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-atelier-champagne group-hover:underline">
                    Explore Collection <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}


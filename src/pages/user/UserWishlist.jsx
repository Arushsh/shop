import { useNavigate, Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight, Star, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';
import EmptyState from '../../components/common/EmptyState';

export default function UserWishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleMoveToCart = (product) => {
    const size = product.sizes?.[0] || 'M';
    const color = product.colors?.[0]?.name || 'Standard';
    addToCart(product, size, color, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="py-16">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Curate your personal collection of tailored garments by clicking the heart icon on any design."
          action={
            <Link to="/shop" className="btn-primary text-xs px-6 py-3 rounded-full uppercase tracking-wider font-bold">
              Explore Atelier Collection <ArrowRight size={14} />
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="border-b border-primary/8 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Private Lookbook
          </span>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">
            Saved Wishlist
          </h1>
          <p className="text-xs text-primary/50 mt-1">
            You have <span className="font-bold text-primary">{wishlist.length}</span> curated pieces saved
          </p>
        </div>

        <button
          onClick={() => {
            wishlist.forEach((p) => {
              const size = p.sizes?.[0] || 'M';
              const color = p.colors?.[0]?.name || 'Standard';
              addToCart(p, size, color, 1);
            });
            navigate('/cart');
          }}
          className="btn-outline text-xs px-5 py-2.5 rounded-full font-bold uppercase tracking-wider"
        >
          Move All to Bag
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group card p-0 overflow-hidden bg-white rounded-2xl border border-primary/10 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] bg-[#EFEFED] overflow-hidden">
              <img
                src={product.images?.[0] || product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              />

              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-primary hover:text-red-600 shadow-md backdrop-blur-sm transition-all"
                title="Remove item"
              >
                <Trash2 size={15} />
              </button>

              {product.totalStock <= 5 && (
                <span className="absolute bottom-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Low Stock
                </span>
              )}
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  {product.brand}
                </span>
                <h3
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="font-bold text-sm text-primary line-clamp-1 hover:text-accent cursor-pointer transition-colors mt-0.5"
                >
                  {product.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-1">
                  <Star size={12} fill="currentColor" />
                  <span>{product.rating}</span>
                  <span className="text-primary/40 font-normal">({product.reviewsCount})</span>
                </div>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-extrabold text-base text-primary">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-primary/40 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleMoveToCart(product)}
                className="btn-primary w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl justify-center shadow-xs"
              >
                <ShoppingBag size={14} /> Move to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

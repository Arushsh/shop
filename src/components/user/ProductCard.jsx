import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function ProductCard({ product, showQuickAdd = true }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const [addedNotice, setAddedNotice] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isWishlisted = wishlist.some(p => p.id === product.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[0]?.name || 'Standard';
    addToCart(product, defaultSize, defaultColor, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const currentImage = product.images?.[activeImageIndex] || product.image || product.images?.[0];

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-primary/5 hover:border-primary/15 shadow-sm hover:shadow-card-hover transition-all duration-300 cursor-pointer"
    >
      {/* Editorial Image Canvas */}
      <div
        className="relative aspect-[3/4] bg-[#EFEFED] overflow-hidden"
        onMouseEnter={() => product.images?.length > 1 && setActiveImageIndex(1)}
        onMouseLeave={() => setActiveImageIndex(0)}
      >
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&fit=crop';
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              New Arrival
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-accent text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm z-10 ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/85 text-primary/70 hover:bg-white hover:text-red-500'
          }`}
          title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Size chips on bottom hover preview */}
        {product.sizes?.length > 0 && (
          <div className="absolute bottom-12 left-2 right-2 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            {product.sizes.slice(0, 5).map((s) => (
              <span
                key={s}
                className="bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-primary px-1.5 py-0.5 rounded shadow-xs"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Quick Add To Cart Trigger */}
        {showQuickAdd && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
            {addedNotice ? (
              <div className="w-full py-2.5 bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-md">
                <Check size={14} /> Added to Bag
              </div>
            ) : (
              <button
                onClick={handleQuickAdd}
                className="w-full py-2.5 bg-primary/90 hover:bg-primary text-white text-xs font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg backdrop-blur-sm"
              >
                <ShoppingBag size={14} /> Quick Add ({product.sizes?.[0] || 'M'})
              </button>
            )}
          </div>
        )}
      </div>

      {/* Product Details Body */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
        <div>
          <div className="flex items-center justify-between text-[11px] text-primary/40 font-medium">
            <span>{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star size={12} fill="currentColor" />
              <span>{product.rating}</span>
              <span className="text-primary/30 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-semibold text-sm text-primary group-hover:text-accent transition-colors line-clamp-1 mt-0.5">
            {product.name}
          </h3>
        </div>

        {/* Color swatches */}
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-1.5 py-1">
            {product.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-primary/20 shadow-xs"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-primary/40 font-medium">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price & Discount */}
        <div className="flex items-baseline gap-2 pt-1 border-t border-primary/5">
          <span className="font-extrabold text-base text-primary">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-primary/40 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discount > 0 && (
            <span className="text-[11px] font-bold text-emerald-700 ml-auto bg-emerald-50 px-2 py-0.5 rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star, Heart, ShoppingBag, ArrowLeft, Check, ShieldCheck,
  Truck, RefreshCw, AlertCircle, Share2, Maximize2, X, Plus, Minus,
  Ruler, ThumbsUp, Camera, HelpCircle, ChevronRight, Sparkles
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import ProductCard from '../../components/user/ProductCard';
import Modal from '../../components/common/Modal';

export default function UserProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    wishlist,
    toggleWishlist,
    reviews,
    addReview,
    recentlyViewed,
    addRecentlyViewed,
  } = useStore();

  const product = products.find((p) => p.id === id) || products[0];

  // Gallery state
  const [selectedImg, setSelectedImg] = useState(product?.images?.[0] || '');
  const [fullscreenImg, setFullscreenImg] = useState(null);

  // Selection states
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || { name: 'White', hex: '#FFF' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'specifications' | 'care' | 'reviews'

  // Modals & Tools
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [addedAlert, setAddedAlert] = useState(false);

  // Review submission
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewPhotoUrl, setReviewPhotoUrl] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Review filters
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | '5star' | 'photos' | 'verified'
  const [helpfulMap, setHelpfulMap] = useState({});

  useEffect(() => {
    if (product) {
      setSelectedImg(product.images?.[0] || product.image);
      setSelectedSize(product.sizes?.[0] || 'M');
      setSelectedColor(product.colors?.[0] || { name: 'White', hex: '#FFF' });
      setQuantity(1);
      addRecentlyViewed(product);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, product]);

  if (!product) return null;

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor.name || selectedColor, quantity);
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor.name || selectedColor, quantity);
    navigate('/cart');
  };

  const checkPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus('Available: Express Courier Delivery in 2 business days (BlueDart)');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian Postal PIN Code');
    }
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!reviewTitle || !reviewText) return;
    addReview({
      productId: product.id,
      productName: product.name,
      rating: reviewRating,
      title: reviewTitle,
      text: reviewText,
      photos: reviewPhotoUrl ? [reviewPhotoUrl] : [],
    });
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setShowReviewModal(false);
      setReviewTitle('');
      setReviewText('');
      setReviewPhotoUrl('');
    }, 1500);
  };

  const productReviews = reviews.filter((r) => r.productId === product.id || r.productId === 'TL-101');

  const filteredReviews = productReviews.filter((r) => {
    if (reviewFilter === '5star') return r.rating === 5;
    if (reviewFilter === 'photos') return r.photos && r.photos.length > 0;
    if (reviewFilter === 'verified') return r.verified;
    return true;
  });

  const ratingDist = [
    { star: 5, pct: 75, count: 106 },
    { star: 4, pct: 18, count: 26 },
    { star: 3, pct: 5, count: 7 },
    { star: 2, pct: 1, count: 2 },
    { star: 1, pct: 1, count: 1 },
  ];

  const similarProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="space-y-12 pb-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-primary/50 font-medium">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-primary">{product.category}</Link>
        <span>/</span>
        <span className="text-primary font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Interactive Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col-reverse md:flex-row gap-4 items-start">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2.5 overflow-x-auto w-full md:w-20 flex-shrink-0 pb-1">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-[#EFEFED] ${
                    selectedImg === img ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image with Zoom & Fullscreen Action */}
            <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-[#EFEFED] border border-primary/10 group cursor-crosshair">
              <img
                src={selectedImg}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&fit=crop';
                }}
              />

              <button
                onClick={() => setFullscreenImg(selectedImg)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-primary shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                title="Fullscreen Preview"
              >
                <Maximize2 size={16} />
              </button>

              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-accent text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {product.discount}% Seasonal Privilege
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Info & Commerce Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header */}
          <div className="space-y-1.5 border-b border-primary/8 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                {product.brand}
              </span>
              <span className="text-xs text-primary/40 font-mono">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                <Star size={13} fill="#F59E0B" className="text-amber-500" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-primary/50 underline cursor-pointer hover:text-primary">
                {product.reviewsCount} customer reviews
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Check size={13} /> Verified Authentic
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-white border border-primary/10 shadow-sm flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-primary/40 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Color Selector */}
          {product.colors?.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-primary uppercase text-[11px] tracking-wider">
                  Colorway: <span className="text-accent">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    className={`w-9 h-9 rounded-full p-0.5 border-2 transition-all flex items-center justify-center ${
                      selectedColor.name === c.name ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-primary/20 hover:border-primary/50'
                    }`}
                    title={c.name}
                  >
                    <span className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector + Size Guide Link */}
          {product.sizes?.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-primary uppercase text-[11px] tracking-wider">
                  Select Size
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                >
                  <Ruler size={13} /> Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white border-primary/15 text-primary hover:border-primary/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Availability Indicator */}
          <div className="flex items-center gap-2 text-xs">
            {product.totalStock <= 10 ? (
              <span className="text-amber-700 font-semibold flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full">
                <AlertCircle size={14} /> Only {product.totalStock} units available at the atelier
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full">
                <Check size={14} /> In Stock & Ready to Dispatch within 24 Hours
              </span>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-primary/20 rounded-2xl bg-white px-2">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-primary hover:bg-primary/5 disabled:opacity-30 rounded-lg"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 font-bold text-xs text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-primary hover:bg-primary/5 rounded-lg"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl justify-center shadow-lg"
              >
                <ShoppingBag size={16} /> Add to Shopping Bag
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-primary/20 text-primary hover:bg-primary/5'
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Direct Buy Now */}
            <button
              onClick={handleBuyNow}
              className="btn-accent w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-2xl justify-center shadow-md"
            >
              Express Buy Now
            </button>
          </div>

          {/* Toast Notification */}
          {addedAlert && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold">
                <Check size={14} /> Added {quantity} × {product.name} ({selectedSize}) to Bag!
              </span>
              <Link to="/cart" className="font-bold underline text-emerald-950">
                View Bag
              </Link>
            </div>
          )}

          {/* Pincode Delivery Check */}
          <div className="card p-4 space-y-2.5">
            <label className="text-xs font-bold uppercase text-primary/70 tracking-wider flex items-center gap-1.5">
              <Truck size={14} className="text-accent" /> Check Doorstep Delivery
            </label>
            <form onSubmit={checkPincode} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit PIN code (e.g. 560001)"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="input text-xs"
              />
              <button type="submit" className="btn-outline px-4 text-xs font-bold whitespace-nowrap">
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className={`text-[11px] font-medium ${pincodeStatus.startsWith('Available') ? 'text-emerald-700' : 'text-red-500'}`}>
                {pincodeStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* TABS: Description, Specifications, Care, Reviews */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-primary/10 shadow-sm space-y-6">
        {/* Tab Headers */}
        <div className="flex border-b border-primary/10 gap-6 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'description', label: 'Product Description' },
            { id: 'specifications', label: 'Specifications & Fit' },
            { id: 'care', label: 'Care & Provenance' },
            { id: 'reviews', label: `Reviews (${productReviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'border-accent text-primary' : 'border-transparent text-primary/40 hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'description' && (
          <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-primary/75 leading-relaxed">
            <p>{product.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#F7F7F5] space-y-1">
                <h4 className="font-bold text-primary text-xs">Milled Fiber Provenance</h4>
                <p className="text-xs text-primary/60">Sourced directly from verified mills with ethical environmental standards.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F7F7F5] space-y-1">
                <h4 className="font-bold text-primary text-xs">Tailoring Architecture</h4>
                <p className="text-xs text-primary/60">Reinforced points of tension, hand-pressed collar bands, and luxury button closures.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Specifications */}
        {activeTab === 'specifications' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-primary/10"><span className="text-primary/40 block">Fabric</span><strong className="text-primary">{product.fabric}</strong></div>
            <div className="p-3.5 rounded-xl border border-primary/10"><span className="text-primary/40 block">Silhouette Fit</span><strong className="text-primary">{product.fit}</strong></div>
            <div className="p-3.5 rounded-xl border border-primary/10"><span className="text-primary/40 block">Sleeve Length</span><strong className="text-primary">{product.sleeve}</strong></div>
            <div className="p-3.5 rounded-xl border border-primary/10"><span className="text-primary/40 block">Collar / Neck</span><strong className="text-primary">{product.neck}</strong></div>
            <div className="p-3.5 rounded-xl border border-primary/10"><span className="text-primary/40 block">Weave Pattern</span><strong className="text-primary">{product.pattern}</strong></div>
            <div className="p-3.5 rounded-xl border border-primary/10"><span className="text-primary/40 block">Target Gender</span><strong className="text-primary">{product.gender}</strong></div>
            <div className="p-3.5 rounded-xl border border-primary/10"><span className="text-primary/40 block">Brand Curation</span><strong className="text-primary">{product.brand}</strong></div>
            <div className="p-3.5 rounded-xl border border-primary/10"><span className="text-primary/40 block">Atelier SKU</span><strong className="text-primary">{product.sku}</strong></div>
            <div className="p-3.5 rounded-xl border border-primary/10"><span className="text-primary/40 block">Origin</span><strong className="text-primary">Master Craftsmen Atelier, India</strong></div>
          </div>
        )}

        {/* Tab 3: Care Instructions */}
        {activeTab === 'care' && (
          <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-primary/75 leading-relaxed">
            <p className="font-semibold text-primary">Garment Preservation Guidelines:</p>
            <p>{product.care}</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-primary/60">
              <li>Always separate light and dark apparel prior to laundering.</li>
              <li>Use pH-neutral delicate detergents to preserve organic fiber resilience.</li>
              <li>Avoid high-heat tumble drying; reshape and dry flat in shaded breeze.</li>
            </ul>
          </div>
        )}

        {/* Tab 4: Reviews Section */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Rating Summary + Rating Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#F7F7F5] items-center">
              <div className="text-center space-y-1 border-b md:border-b-0 md:border-r border-primary/10 pb-4 md:pb-0">
                <span className="text-4xl font-black text-primary">{product.rating}</span>
                <div className="flex justify-center text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs text-primary/50">Based on {product.reviewsCount} customer experiences</p>
              </div>

              {/* Distribution bars */}
              <div className="space-y-1.5 md:col-span-2 max-w-md">
                {ratingDist.map((item) => (
                  <div key={item.star} className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-primary/60 font-medium">{item.star} Stars</span>
                    <div className="flex-1 bg-primary/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                    <span className="w-8 text-right text-primary/50 text-[11px]">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter buttons & Write Review Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/8 pb-4">
              <div className="flex items-center gap-2 text-xs">
                {['all', '5star', 'photos', 'verified'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setReviewFilter(f)}
                    className={`px-3 py-1.5 rounded-full capitalize font-semibold transition-all ${
                      reviewFilter === f ? 'bg-primary text-white' : 'bg-primary/5 text-primary/70 hover:bg-primary/10'
                    }`}
                  >
                    {f === 'all' ? 'All Reviews' : f === '5star' ? '5★ Only' : f === 'photos' ? 'With Photos' : 'Verified Purchases'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowReviewModal(true)}
                className="btn-accent px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Plus size={14} /> Write Product Review
              </button>
            </div>

            {/* Individual Reviews List */}
            <div className="space-y-4">
              {filteredReviews.length === 0 ? (
                <p className="text-xs text-primary/40 py-6 text-center italic">No reviews match your filter selection.</p>
              ) : (
                filteredReviews.map((r) => (
                  <div key={r.id} className="p-5 rounded-2xl bg-[#F7F7F5] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-accent font-bold text-xs flex items-center justify-center">
                          {r.customerAvatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-primary">{r.customerName}</span>
                            {r.verified && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                                <Check size={10} /> Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-primary/40">{r.date}</span>
                        </div>
                      </div>

                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            fill={star <= r.rating ? 'currentColor' : 'none'}
                            className={star <= r.rating ? 'text-amber-500' : 'text-primary/20'}
                          />
                        ))}
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-primary">{r.title}</h4>
                    <p className="text-xs text-primary/70 leading-relaxed">{r.text}</p>

                    {r.photos?.length > 0 && (
                      <div className="flex gap-2 pt-1">
                        {r.photos.map((p, idx) => (
                          <img
                            key={idx}
                            src={p}
                            alt="Customer upload"
                            onClick={() => setFullscreenImg(p)}
                            className="w-16 h-16 rounded-xl object-cover cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between text-[11px] text-primary/40 border-t border-primary/5">
                      <span>Was this review helpful?</span>
                      <button
                        onClick={() => setHelpfulMap((prev) => ({ ...prev, [r.id]: (prev[r.id] || 0) + 1 }))}
                        className="flex items-center gap-1.5 hover:text-primary transition-colors font-semibold"
                      >
                        <ThumbsUp size={12} /> Yes ({r.helpfulCount + (helpfulMap[r.id] || 0)})
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </section>

      {/* RELATED & SIMILAR GARMENTS */}
      {similarProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-primary/10">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Complete the Look
              </span>
              <h2 className="text-2xl font-extrabold text-primary tracking-tight">
                Customers Also Viewed
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* SIZE GUIDE MODAL */}
      {showSizeGuide && (
        <Modal title="THREADLINE Sizing Guide (Inches & CM)" onClose={() => setShowSizeGuide(false)} size="lg">
          <div className="space-y-4 text-xs">
            <p className="text-primary/60">
              Measurements reflect true garment specifications tailored to standard European/Indian sizing proportions.
            </p>
            <div className="overflow-x-auto border border-primary/10 rounded-xl">
              <table className="w-full text-left">
                <thead className="bg-primary/5 border-b border-primary/10">
                  <tr>
                    <th className="p-3 font-bold text-primary">Size Tag</th>
                    <th className="p-3 font-bold text-primary">Chest (in)</th>
                    <th className="p-3 font-bold text-primary">Shoulder (in)</th>
                    <th className="p-3 font-bold text-primary">Garment Length (in)</th>
                    <th className="p-3 font-bold text-primary">Waist (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  <tr><td className="p-3 font-bold">38 (S)</td><td className="p-3">38 - 39</td><td className="p-3">17.5</td><td className="p-3">29.0</td><td className="p-3">30 - 31</td></tr>
                  <tr><td className="p-3 font-bold">40 (M)</td><td className="p-3">40 - 41</td><td className="p-3">18.0</td><td className="p-3">29.5</td><td className="p-3">32 - 33</td></tr>
                  <tr><td className="p-3 font-bold">42 (L)</td><td className="p-3">42 - 43</td><td className="p-3">18.7</td><td className="p-3">30.0</td><td className="p-3">34 - 35</td></tr>
                  <tr><td className="p-3 font-bold">44 (XL)</td><td className="p-3">44 - 45</td><td className="p-3">19.5</td><td className="p-3">30.5</td><td className="p-3">36 - 37</td></tr>
                  <tr><td className="p-3 font-bold">46 (XXL)</td><td className="p-3">46 - 47</td><td className="p-3">20.2</td><td className="p-3">31.0</td><td className="p-3">38 - 40</td></tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setShowSizeGuide(false)} className="btn-outline text-xs">Close</button>
            </div>
          </div>
        </Modal>
      )}

      {/* FULLSCREEN IMAGE MODAL */}
      {fullscreenImg && (
        <div
          className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setFullscreenImg(null)}
        >
          <button
            onClick={() => setFullscreenImg(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white hover:text-primary transition-all"
          >
            <X size={20} />
          </button>
          <img
            src={fullscreenImg}
            alt="Fullscreen view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* SUBMIT REVIEW MODAL */}
      {showReviewModal && (
        <Modal title={`Review — ${product.name}`} onClose={() => setShowReviewModal(false)} size="md">
          {reviewSuccess ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <h3 className="font-bold text-primary">Feedback Submitted!</h3>
              <p className="text-xs text-primary/60">Thank you for sharing your experience with the community.</p>
            </div>
          ) : (
            <form onSubmit={submitReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-primary/70 mb-1">Star Rating</label>
                <div className="flex items-center gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={22}
                        fill={star <= reviewRating ? '#F59E0B' : 'none'}
                        className={star <= reviewRating ? 'text-amber-500' : 'text-primary/20'}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-primary">{reviewRating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-primary/70 mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exceptional fit, soft weave"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="input text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-primary/70 mb-1">Detailed Review *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details regarding drape, sizing accuracy, and fabric resilience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="input text-xs resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-primary/70 mb-1">Optional Photo URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={reviewPhotoUrl}
                  onChange={(e) => setReviewPhotoUrl(e.target.value)}
                  className="input text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-primary/8">
                <button type="button" onClick={() => setShowReviewModal(false)} className="btn-outline text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}

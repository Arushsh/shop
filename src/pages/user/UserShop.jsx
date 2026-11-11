import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Filter, SlidersHorizontal, RotateCcw, Grid, List, Search,
  X, Check, Star, ChevronDown, ArrowUpDown, Package
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import ProductCard from '../../components/user/ProductCard';
import EmptyState from '../../components/common/EmptyState';
import { MOCK_CATEGORIES } from '../../data/mockData';

const BRANDS = ['THREADLINE Atelier', 'THREADLINE Heritage', 'THREADLINE Studio', 'THREADLINE Urban'];
const GENDERS = ['All', 'Men', 'Women', 'Kids', 'Unisex'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40', '42', '44', '46'];
const COLORS = ['White', 'Navy', 'Black', 'Khaki', 'Olive', 'Blue', 'Ochre', 'Maroon', 'Camel'];
const FABRICS = ['Egyptian Cotton', 'Normandy Linen', 'Merino Wool', 'Mulberry Silk', 'Selvedge Denim', 'Cotton Twill'];

export default function UserShop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products } = useStore();

  // URL query synched states
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || 'All');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState(searchParams.get('fabric') || 'All');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [onlyDiscounted, setOnlyDiscounted] = useState(searchParams.get('discount') === 'true');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [tagFilter, setTagFilter] = useState(searchParams.get('tag') || 'All');
  const [sortBy, setSortBy] = useState('recommended');

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  // Sync when searchParams changes
  useEffect(() => {
    if (searchParams.get('search')) setSearch(searchParams.get('search'));
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('gender')) setSelectedGender(searchParams.get('gender'));
    if (searchParams.get('tag')) setTagFilter(searchParams.get('tag'));
    if (searchParams.get('discount') === 'true') setOnlyDiscounted(true);
  }, [searchParams]);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        const q = search.toLowerCase().trim();
        const matchesSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q);

        // Category
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;

        // Gender
        const matchesGender = selectedGender === 'All' || p.gender === selectedGender || p.gender === 'Unisex';

        // Brand
        const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;

        // Size
        const matchesSize =
          selectedSize === 'All' || p.sizes?.some((s) => s.includes(selectedSize));

        // Color
        const matchesColor =
          selectedColor === 'All' ||
          p.colors?.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()));

        // Fabric
        const matchesFabric =
          selectedFabric === 'All' || p.fabric.toLowerCase().includes(selectedFabric.toLowerCase());

        // Price
        const matchesPrice = p.price <= maxPrice;

        // Rating
        const matchesRating = p.rating >= minRating;

        // Discount
        const matchesDiscount = !onlyDiscounted || p.discount > 0;

        // Stock
        const matchesStock = !onlyInStock || p.totalStock > 0;

        // Tag
        const matchesTag =
          tagFilter === 'All' ||
          (tagFilter === 'new' && p.isNew) ||
          (tagFilter === 'bestseller' && p.isBestseller);

        return (
          matchesSearch &&
          matchesCat &&
          matchesGender &&
          matchesBrand &&
          matchesSize &&
          matchesColor &&
          matchesFabric &&
          matchesPrice &&
          matchesRating &&
          matchesDiscount &&
          matchesStock &&
          matchesTag
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'highest-rated') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
        return 0; // recommended
      });
  }, [
    products,
    search,
    selectedCategory,
    selectedGender,
    selectedBrand,
    selectedSize,
    selectedColor,
    selectedFabric,
    maxPrice,
    minRating,
    onlyDiscounted,
    onlyInStock,
    tagFilter,
    sortBy,
  ]);

  const activeChips = [];
  if (search) activeChips.push({ label: `Search: "${search}"`, clear: () => setSearch('') });
  if (selectedCategory !== 'All') activeChips.push({ label: `Category: ${selectedCategory}`, clear: () => setSelectedCategory('All') });
  if (selectedGender !== 'All') activeChips.push({ label: `Gender: ${selectedGender}`, clear: () => setSelectedGender('All') });
  if (selectedBrand !== 'All') activeChips.push({ label: `Brand: ${selectedBrand}`, clear: () => setSelectedBrand('All') });
  if (selectedSize !== 'All') activeChips.push({ label: `Size: ${selectedSize}`, clear: () => setSelectedSize('All') });
  if (selectedColor !== 'All') activeChips.push({ label: `Color: ${selectedColor}`, clear: () => setSelectedColor('All') });
  if (selectedFabric !== 'All') activeChips.push({ label: `Fabric: ${selectedFabric}`, clear: () => setSelectedFabric('All') });
  if (minRating > 0) activeChips.push({ label: `${minRating}★ & Above`, clear: () => setMinRating(0) });
  if (onlyDiscounted) activeChips.push({ label: 'Discounted Only', clear: () => setOnlyDiscounted(false) });
  if (onlyInStock) activeChips.push({ label: 'In Stock Only', clear: () => setOnlyInStock(false) });
  if (tagFilter !== 'All') activeChips.push({ label: `Tag: ${tagFilter}`, clear: () => setTagFilter('All') });

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedBrand('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setSelectedFabric('All');
    setMaxPrice(15000);
    setMinRating(0);
    setOnlyDiscounted(false);
    setOnlyInStock(false);
    setTagFilter('All');
    setSearchParams({});
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="space-y-8 pb-20">
      {/* Title & Toolbar */}
      <div className="border-b border-primary/8 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Atelier Catalog
          </span>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">
            Ready-to-Wear Garments
          </h1>
          <p className="text-xs text-primary/50 mt-1">
            Displaying <span className="font-bold text-primary">{filteredProducts.length}</span> luxury apparel designs
          </p>
        </div>

        {/* View Controls & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden btn-outline text-xs px-4 py-2.5 flex items-center gap-2"
          >
            <Filter size={14} /> Filter ({activeChips.length})
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-primary/10 text-xs">
            <span className="text-primary/50">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-primary focus:outline-none cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest Arrivals</option>
              <option value="popular">Popularity & Reviews</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="highest-rated">Highest Rated</option>
            </select>
          </div>

          {/* Grid / List Mode */}
          <div className="hidden sm:flex items-center bg-white rounded-xl border border-primary/10 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-primary/60 hover:text-primary'}`}
              title="Grid View"
            >
              <Grid size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-primary/60 hover:text-primary'}`}
              title="List View"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-primary/50">Applied:</span>
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-medium text-primary"
            >
              <span>{chip.label}</span>
              <button onClick={chip.clear} className="hover:text-red-500">
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs text-accent font-bold hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Mobile Filter Backdrop */}
        {mobileFilterOpen && (
          <div
            className="fixed inset-0 bg-primary/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
        )}

        {/* FILTERS SIDEBAR */}
        <aside
          className={`bg-white rounded-3xl p-6 border border-primary/10 shadow-sm space-y-6 lg:sticky lg:top-28 ${
            mobileFilterOpen ? 'fixed inset-x-4 inset-y-6 z-50 overflow-y-auto block shadow-2xl max-w-md mx-auto' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-primary/8">
            <h3 className="font-extrabold text-sm text-primary flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-accent" /> Refine Catalog
            </h3>
            {activeChips.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-accent font-semibold hover:underline flex items-center gap-1"
              >
                <RotateCcw size={12} /> Reset
              </button>
            )}
            {mobileFilterOpen && (
              <button onClick={() => setMobileFilterOpen(false)} className="lg:hidden p-1 text-primary">
                <X size={18} />
              </button>
            )}
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-primary/70 mb-2">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {GENDERS.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`py-2 px-3 rounded-xl border text-left font-medium transition-all ${
                    selectedGender === g
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'border-primary/15 text-primary/70 hover:border-primary/30'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-primary/70 mb-2">
              Category
            </label>
            <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors flex justify-between ${
                  selectedCategory === 'All' ? 'bg-primary text-white font-bold' : 'text-primary/70 hover:bg-primary/5'
                }`}
              >
                <span>All Categories</span>
                <span>{products.length}</span>
              </button>
              {MOCK_CATEGORIES.map((c) => {
                const count = products.filter(p => p.category === c.name).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.name)}
                    className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors flex justify-between ${
                      selectedCategory === c.name
                        ? 'bg-primary text-white font-bold'
                        : 'text-primary/70 hover:bg-primary/5'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold text-primary/70 uppercase text-[11px] tracking-wider">
                Max Price
              </span>
              <span className="font-extrabold text-primary">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-primary/40 mt-1">
              <span>₹1,000</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-primary/70 mb-2">
              Brand Atelier
            </label>
            <div className="space-y-1">
              {['All', ...BRANDS].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors truncate ${
                    selectedBrand === b ? 'bg-primary text-white font-bold' : 'text-primary/70 hover:bg-primary/5'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-primary/70 mb-2">
              Size
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSize('All')}
                className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-all ${
                  selectedSize === 'All'
                    ? 'bg-primary text-white border-primary'
                    : 'border-primary/15 text-primary/70 hover:border-primary/30'
                }`}
              >
                All
              </button>
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-all ${
                    selectedSize === s
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'border-primary/15 text-primary/70 hover:border-primary/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-primary/70 mb-2">
              Color Palette
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['All', ...COLORS].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-all ${
                    selectedColor === c
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'border-primary/15 text-primary/70 hover:border-primary/30'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Curation Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-primary/70 mb-2">
              Fabric Weave
            </label>
            <div className="space-y-1">
              {['All', ...FABRICS].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFabric(f)}
                  className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors truncate ${
                    selectedFabric === f ? 'bg-primary text-white font-bold' : 'text-primary/70 hover:bg-primary/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-primary/70 mb-2">
              Customer Rating
            </label>
            <div className="space-y-1 text-xs">
              {[4, 4.5, 4.8].map((star) => (
                <button
                  key={star}
                  onClick={() => setMinRating(minRating === star ? 0 : star)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all ${
                    minRating === star ? 'border-primary bg-primary/5 font-bold text-primary' : 'border-primary/10 text-primary/70'
                  }`}
                >
                  <span className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star size={12} fill="currentColor" /> {star}★ & Above
                  </span>
                  {minRating === star && <Check size={12} />}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles: Discount & In Stock */}
          <div className="pt-2 border-t border-primary/8 space-y-2 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-primary">On Sale / Discounted</span>
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
                className="rounded text-accent focus:ring-accent"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-primary">In Stock Ready to Ship</span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-accent focus:ring-accent"
              />
            </label>
          </div>
        </aside>

        {/* PRODUCTS LISTING AREA */}
        <div className="lg:col-span-3 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-primary/10 text-center">
              <EmptyState
                icon={Package}
                title="No Garments Match Your Filters"
                description="Try loosening your fabric, size, or price selections to discover more designs."
                action={
                  <button onClick={clearAllFilters} className="btn-primary text-xs px-6 py-2.5 rounded-full">
                    Reset All Filters
                  </button>
                }
              />
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {visibleProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="card p-4 sm:p-5 flex flex-col sm:flex-row gap-5 hover:shadow-card-hover transition-all cursor-pointer group"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full sm:w-36 h-48 sm:h-48 object-cover rounded-xl bg-primary/5 flex-shrink-0 group-hover:scale-102 transition-transform"
                  />
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-accent">
                          {p.brand} • {p.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                          <Star size={13} fill="currentColor" /> {p.rating}
                          <span className="text-primary/40 font-normal">({p.reviewsCount} reviews)</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-base text-primary group-hover:text-accent transition-colors mt-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-primary/60 mt-1 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-primary/5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-extrabold text-primary">₹{p.price.toLocaleString('en-IN')}</span>
                        {p.originalPrice > p.price && (
                          <span className="text-xs text-primary/40 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                        {p.discount > 0 && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {p.discount}% OFF
                          </span>
                        )}
                      </div>

                      <div className="ml-auto text-xs font-semibold text-primary/60">
                        Fabric: {p.fabric}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Pagination Button */}
          {visibleCount < filteredProducts.length && (
            <div className="text-center pt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="btn-outline px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                Load More Garments ({filteredProducts.length - visibleCount} Remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

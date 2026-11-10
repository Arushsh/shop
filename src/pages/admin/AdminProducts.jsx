import { useState } from 'react';
import { Plus, Edit2, Trash2, Grid, List, Search, Filter } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';

const SIZES_SHIRT = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS_ALL = ['White', 'Black', 'Navy', 'Khaki', 'Olive', 'Grey', 'Maroon', 'Beige', 'Charcoal', 'Light Blue'];
const CATEGORIES = ['Shirts', 'Pants', 'Blazers', 'Kurtas', 'T-Shirts', 'Jackets', 'Activewear', 'Ethnic Wear', 'Sweatshirts', 'Women', 'Kids', 'Jeans', 'Trousers'];
const STATUSES = ['active', 'low-stock', 'out-of-stock'];

const blank = () => ({
  id: '', name: '', category: 'Shirts', price: '', originalPrice: '', sku: '',
  sizes: [], colors: [], totalStock: 0, status: 'active',
  image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=400&fit=crop',
  images: [], description: '', rating: 4.5, reviews: 0, tags: [], trending: false,
});

function ProductForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({ ...blank(), ...initial, image: initial.image || initial.images?.[0] || blank().image });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggle = (k, v) => set(k, (form[k] || []).includes(v) ? form[k].filter(x => x !== v) : [...(form[k] || []), v]);

  const handleSave = () => {
    if (!form.name || !form.price) return alert('Name and price required');
    onSave({
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice) || Number(form.price),
      totalStock: Number(form.totalStock) || 0,
      images: form.images?.length > 0 ? form.images : [form.image],
      stock: {},
    });
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-primary/60 mb-1">Product Name *</label>
          <input className="input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Premium Oxford Shirt" />
        </div>
        <div>
          <label className="block text-xs font-medium text-primary/60 mb-1">Category</label>
          <select className="input" value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-primary/60 mb-1">SKU</label>
          <input className="input" value={form.sku} onChange={e => set('sku', e.target.value)} placeholder="e.g. SHT-OXF-001" />
        </div>
        <div>
          <label className="block text-xs font-medium text-primary/60 mb-1">Price (₹) *</label>
          <input className="input" type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="2499" />
        </div>
        <div>
          <label className="block text-xs font-medium text-primary/60 mb-1">Original Price (₹)</label>
          <input className="input" type="number" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="3299" />
        </div>
        <div>
          <label className="block text-xs font-medium text-primary/60 mb-1">Total Stock</label>
          <input className="input" type="number" value={form.totalStock} onChange={e => set('totalStock', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-medium text-primary/60 mb-1">Status</label>
          <select className="input" value={form.status} onChange={e => set('status', e.target.value)}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-primary/60 mb-2">Sizes</label>
        <div className="flex flex-wrap gap-2">
          {SIZES_SHIRT.map(s => (
            <button key={s} type="button"
              onClick={() => toggle('sizes', s)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${(form.sizes || []).includes(s) ? 'bg-primary text-white border-primary' : 'border-primary/15 text-primary/60 hover:border-primary/30'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-primary/60 mb-2">Colors</label>
        <div className="flex flex-wrap gap-2">
          {COLORS_ALL.map(c => (
            <button key={c} type="button"
              onClick={() => toggle('colors', c)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${(form.colors || []).map(x => typeof x === 'object' ? x.name : x).includes(c) ? 'bg-primary text-white border-primary' : 'border-primary/15 text-primary/60 hover:border-primary/30'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-primary/60 mb-1">Image URL</label>
        <input className="input" value={form.image} onChange={e => set('image', e.target.value)} />
      </div>

      <div>
        <label className="block text-xs font-medium text-primary/60 mb-1">Description</label>
        <textarea className="input resize-none" rows={3} value={form.description} onChange={e => set('description', e.target.value)} />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button className="btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={handleSave}>Save Product</button>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const { products = [], addProduct, updateProduct, deleteProduct } = useStore();
  const [view, setView] = useState('table');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modal, setModal] = useState(null); // null | 'add' | {product}
  const [confirmDelete, setConfirmDelete] = useState(null);

  const categories = ['All', ...CATEGORIES];

  const filtered = (products || []).filter(p => {
    const pName = p.name || '';
    const pSku = p.sku || '';
    const pStatus = p.status || (p.totalStock === 0 ? 'out-of-stock' : p.totalStock <= 10 ? 'low-stock' : 'active');
    const matchSearch = pName.toLowerCase().includes(search.toLowerCase()) || pSku.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || pStatus === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const handleSave = (data) => {
    if (data.id) {
      if (updateProduct) updateProduct(data.id, data);
    } else {
      if (addProduct) addProduct({ ...data, id: `P${Date.now()}` });
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search products or SKU..." className="w-64" />
        <select className="input w-40" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="input w-36" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="ml-auto flex items-center gap-2">
          <button className={`p-2 rounded-lg border transition-all ${view === 'table' ? 'border-primary bg-primary text-white' : 'border-primary/15 text-primary/60 hover:border-primary/30'}`} onClick={() => setView('table')}><List size={16} /></button>
          <button className={`p-2 rounded-lg border transition-all ${view === 'grid' ? 'border-primary bg-primary text-white' : 'border-primary/15 text-primary/60 hover:border-primary/30'}`} onClick={() => setView('grid')}><Grid size={16} /></button>
          <button className="btn-primary" onClick={() => setModal('add')}><Plus size={16} /> Add Product</button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Package} title="No products found" description="Try adjusting your search or filters." />
      ) : view === 'table' ? (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary/3 border-b border-primary/8">
                <tr>
                  {['Product', 'Category', 'SKU', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-primary/50 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {filtered.map(p => {
                  const pImg = p.image || p.images?.[0] || 'https://via.placeholder.com/40';
                  const pStatus = p.status || (p.totalStock === 0 ? 'out-of-stock' : p.totalStock <= 10 ? 'low-stock' : 'active');
                  const pSizes = (p.sizes || []).map(s => typeof s === 'object' ? s.name : s).join(', ');

                  return (
                    <tr key={p.id} className="hover:bg-primary/2 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={pImg} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" onError={e => { e.target.src = 'https://via.placeholder.com/40'; }} />
                          <div>
                            <p className="font-medium text-primary text-sm">{p.name}</p>
                            <p className="text-xs text-primary/40">{pSizes}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-primary/70">{p.category}</td>
                      <td className="px-4 py-3 font-mono text-xs text-primary/50">{p.sku}</td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-semibold text-primary">₹{(p.price || 0).toLocaleString('en-IN')}</span>
                          {p.originalPrice > p.price && (
                            <span className="text-xs text-primary/35 line-through ml-1">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-primary/70">{p.totalStock ?? 0}</td>
                      <td className="px-4 py-3"><Badge status={pStatus} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 hover:bg-primary/5 rounded-lg text-primary/50 hover:text-primary transition-colors" onClick={() => setModal(p)}><Edit2 size={14} /></button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg text-primary/50 hover:text-red-600 transition-colors" onClick={() => setConfirmDelete(p)}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => {
            const pImg = p.image || p.images?.[0] || 'https://via.placeholder.com/200';
            const pStatus = p.status || (p.totalStock === 0 ? 'out-of-stock' : p.totalStock <= 10 ? 'low-stock' : 'active');

            return (
              <div key={p.id} className="card p-0 overflow-hidden group">
                <div className="relative">
                  <img src={pImg} alt={p.name} className="w-full h-48 object-cover" onError={e => { e.target.src = 'https://via.placeholder.com/200'; }} />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white rounded-lg text-primary hover:bg-accent hover:text-white transition-colors" onClick={() => setModal(p)}><Edit2 size={14} /></button>
                    <button className="p-2 bg-white rounded-lg text-primary hover:bg-red-500 hover:text-white transition-colors" onClick={() => setConfirmDelete(p)}><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm text-primary truncate">{p.name}</p>
                  <p className="text-xs text-primary/40">{p.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary text-sm">₹{(p.price || 0).toLocaleString('en-IN')}</span>
                    <Badge status={pStatus} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal !== null && (
        <Modal
          title={modal === 'add' ? 'Add Product' : `Edit — ${modal.name}`}
          onClose={() => setModal(null)}
          size="lg"
        >
          <ProductForm initial={modal === 'add' ? {} : modal} onSave={handleSave} onClose={() => setModal(null)} />
        </Modal>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <Modal title="Delete Product?" onClose={() => setConfirmDelete(null)} size="sm">
          <p className="text-sm text-primary/70 mb-6">Are you sure you want to delete <strong>{confirmDelete.name}</strong>? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button className="btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors" onClick={() => { if (deleteProduct) deleteProduct(confirmDelete.id); setConfirmDelete(null); }}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

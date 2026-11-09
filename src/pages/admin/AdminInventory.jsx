import { useState } from 'react';
import { Package, AlertTriangle, XCircle, Minus, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Badge from '../../components/common/Badge';

export default function AdminInventory() {
  const { products, updateProduct } = useStore();
  const [filter, setFilter] = useState('all');
  const [adjusting, setAdjusting] = useState(null); // productId
  const [delta, setDelta] = useState(0);

  const totalStock = products.reduce((s, p) => s + p.totalStock, 0);
  const lowStock = products.filter(p => p.status === 'low-stock');
  const outOfStock = products.filter(p => p.status === 'out-of-stock');

  const filtered = products.filter(p => {
    if (filter === 'low') return p.status === 'low-stock';
    if (filter === 'out') return p.status === 'out-of-stock';
    if (filter === 'active') return p.status === 'active';
    return true;
  });

  const applyAdjust = (product) => {
    const newStock = Math.max(0, product.totalStock + delta);
    let newStatus = 'active';
    if (newStock === 0) newStatus = 'out-of-stock';
    else if (newStock <= 10) newStatus = 'low-stock';
    updateProduct(product.id, { totalStock: newStock, status: newStatus });
    setAdjusting(null);
    setDelta(0);
  };

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-xl"><Package size={22} className="text-primary" /></div>
          <div><p className="text-xs text-primary/50 uppercase tracking-wide">Total Stock</p><p className="text-2xl font-bold text-primary">{totalStock.toLocaleString()}</p></div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-xl"><Package size={22} className="text-emerald-600" /></div>
          <div><p className="text-xs text-primary/50 uppercase tracking-wide">Active</p><p className="text-2xl font-bold text-primary">{products.filter(p => p.status === 'active').length}</p></div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-xl"><AlertTriangle size={22} className="text-amber-600" /></div>
          <div><p className="text-xs text-primary/50 uppercase tracking-wide">Low Stock</p><p className="text-2xl font-bold text-primary">{lowStock.length}</p></div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="bg-red-50 p-3 rounded-xl"><XCircle size={22} className="text-red-500" /></div>
          <div><p className="text-xs text-primary/50 uppercase tracking-wide">Out of Stock</p><p className="text-2xl font-bold text-primary">{outOfStock.length}</p></div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {[['all', 'All Products'], ['active', 'Active'], ['low', 'Low Stock'], ['out', 'Out of Stock']].map(([v, l]) => (
          <button key={v}
            onClick={() => setFilter(v)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === v ? 'bg-primary text-white' : 'bg-white border border-primary/15 text-primary/60 hover:border-primary/30'}`}>
            {l}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary/3 border-b border-primary/8">
              <tr>
                {['Product', 'Category', 'SKU', 'Sizes', 'Colors', 'Total Stock', 'Status', 'Adjust'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-primary/50 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filtered.map(p => (
                <tr key={p.id} className={`hover:bg-primary/2 transition-colors ${p.status === 'out-of-stock' ? 'bg-red-50/50' : p.status === 'low-stock' ? 'bg-amber-50/50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover" onError={e => { e.target.src = 'https://via.placeholder.com/36'; }} />
                      <span className="font-medium text-primary">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-primary/60">{p.category}</td>
                  <td className="px-4 py-3 font-mono text-xs text-primary/50">{p.sku}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.sizes.slice(0, 3).map(s => (
                        <span key={s} className="px-1.5 py-0.5 bg-primary/5 text-primary/60 text-xs rounded">{s}</span>
                      ))}
                      {p.sizes.length > 3 && <span className="px-1.5 py-0.5 bg-primary/5 text-primary/40 text-xs rounded">+{p.sizes.length - 3}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.colors.slice(0, 2).map(c => (
                        <span key={c} className="px-1.5 py-0.5 bg-primary/5 text-primary/60 text-xs rounded">{c}</span>
                      ))}
                      {p.colors.length > 2 && <span className="px-1.5 py-0.5 text-primary/40 text-xs">+{p.colors.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {adjusting === p.id ? (
                      <div className="flex items-center gap-1">
                        <button className="p-1 rounded bg-primary/10 hover:bg-primary/20" onClick={() => setDelta(d => d - 1)}><Minus size={12} /></button>
                        <span className={`text-sm font-semibold w-12 text-center ${delta > 0 ? 'text-emerald-600' : delta < 0 ? 'text-red-600' : 'text-primary'}`}>
                          {p.totalStock + delta}
                        </span>
                        <button className="p-1 rounded bg-primary/10 hover:bg-primary/20" onClick={() => setDelta(d => d + 1)}><Plus size={12} /></button>
                      </div>
                    ) : (
                      <span className={`font-semibold ${p.totalStock === 0 ? 'text-red-600' : p.totalStock <= 10 ? 'text-amber-600' : 'text-primary'}`}>
                        {p.totalStock}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3"><Badge status={p.status} /></td>
                  <td className="px-4 py-3">
                    {adjusting === p.id ? (
                      <div className="flex gap-1.5">
                        <button className="text-xs bg-emerald-600 text-white px-2.5 py-1 rounded-lg hover:bg-emerald-700" onClick={() => applyAdjust(p)}>Apply</button>
                        <button className="text-xs border border-primary/15 text-primary/60 px-2.5 py-1 rounded-lg hover:bg-primary/5" onClick={() => { setAdjusting(null); setDelta(0); }}>Cancel</button>
                      </div>
                    ) : (
                      <button className="text-xs border border-primary/15 text-primary/60 px-2.5 py-1 rounded-lg hover:bg-primary/5 hover:border-primary/30" onClick={() => { setAdjusting(p.id); setDelta(0); }}>Adjust</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


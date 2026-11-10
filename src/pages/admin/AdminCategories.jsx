import { useState } from 'react';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';

function CategoryForm({ initial = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    description: initial.description || '',
    image: initial.image || 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&h=200&fit=crop',
  });

  const handleSave = () => {
    if (!form.name) return alert('Category name required');
    onSave(form);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-primary/60 mb-1">Category Name *</label>
        <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Shirts" />
      </div>
      <div>
        <label className="block text-xs font-medium text-primary/60 mb-1">Description</label>
        <input className="input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description" />
      </div>
      <div>
        <label className="block text-xs font-medium text-primary/60 mb-1">Image URL</label>
        <input className="input" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
        {form.image && <img src={form.image} alt="preview" className="mt-2 h-28 w-full object-cover rounded-lg" onError={e => { e.target.style.display = 'none'; }} />}
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button className="btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={handleSave}>Save Category</button>
      </div>
    </div>
  );
}

export default function AdminCategories() {
  const { categories = [], addCategory, updateCategory, deleteCategory, products = [] } = useStore();
  const [modal, setModal] = useState(null); // null | 'add' | {category}
  const [confirmDelete, setConfirmDelete] = useState(null);

  const getCount = (name) => (products || []).filter(p => (p.category || '').toLowerCase() === (name || '').toLowerCase()).length;

  const handleSave = (data) => {
    if (modal === 'add') {
      if (addCategory) addCategory({ ...data, id: `C${Date.now()}`, productCount: 0 });
    } else if (modal && modal.id) {
      if (updateCategory) updateCategory(modal.id, data);
    }
  };

  const list = categories || [];

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button className="btn-primary" onClick={() => setModal('add')}><Plus size={16} /> Add Category</button>
      </div>

      {list.length === 0 ? (
        <EmptyState icon={Tag} title="No categories yet" description="Add your first product category." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map(cat => (
            <div key={cat.id || cat.name} className="card p-0 overflow-hidden group">
              <div className="relative h-36">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" onError={e => { e.target.src = 'https://via.placeholder.com/300x200'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-semibold text-sm">{cat.name}</p>
                  <p className="text-white/70 text-xs">{getCount(cat.name)} products</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                  <button className="p-1.5 bg-white/90 rounded-lg text-primary hover:bg-accent hover:text-white transition-colors" onClick={() => setModal(cat)}><Edit2 size={12} /></button>
                  <button className="p-1.5 bg-white/90 rounded-lg text-primary hover:bg-red-500 hover:text-white transition-colors" onClick={() => setConfirmDelete(cat)}><Trash2 size={12} /></button>
                </div>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-primary/50">{cat.description || 'No description'}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal !== null && (
        <Modal title={modal === 'add' ? 'Add Category' : `Edit — ${modal.name}`} onClose={() => setModal(null)} size="sm">
          <CategoryForm initial={modal === 'add' ? {} : modal} onSave={handleSave} onClose={() => setModal(null)} />
        </Modal>
      )}

      {confirmDelete && (
        <Modal title="Delete Category?" onClose={() => setConfirmDelete(null)} size="sm">
          <p className="text-sm text-primary/70 mb-6">Delete <strong>{confirmDelete.name}</strong>? Products in this category won't be removed.</p>
          <div className="flex justify-end gap-3">
            <button className="btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors" onClick={() => { if (deleteCategory) deleteCategory(confirmDelete.id); setConfirmDelete(null); }}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, CheckCircle, Home, Briefcase } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Modal from '../../components/common/Modal';

function AddressForm({ initial = {}, onSave, onClose }) {
  const [form, setForm] = useState({
    type: initial.type || 'Home',
    name: initial.name || '',
    phone: initial.phone || '',
    line1: initial.line1 || '',
    line2: initial.line2 || '',
    city: initial.city || '',
    state: initial.state || '',
    pincode: initial.pincode || '',
    isDefault: initial.isDefault || false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.line1 || !form.city || !form.pincode) {
      alert('Please fill out all required address fields.');
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block font-bold text-primary/70 mb-1">Address Type</label>
          <div className="flex gap-2">
            {['Home', 'Office', 'Other'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm({ ...form, type: t })}
                className={`flex-1 py-2 rounded-xl font-bold border transition-all ${
                  form.type === t ? 'bg-primary text-white border-primary shadow-xs' : 'border-primary/15 text-primary/70 hover:border-primary/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-bold text-primary/70 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input text-xs"
          />
        </div>

        <div>
          <label className="block font-bold text-primary/70 mb-1">Phone Number *</label>
          <input
            type="text"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input text-xs"
          />
        </div>

        <div className="col-span-2">
          <label className="block font-bold text-primary/70 mb-1">Address Line 1 (Flat, House, Building) *</label>
          <input
            type="text"
            required
            value={form.line1}
            onChange={(e) => setForm({ ...form, line1: e.target.value })}
            className="input text-xs"
          />
        </div>

        <div className="col-span-2">
          <label className="block font-bold text-primary/70 mb-1">Address Line 2 (Area, Landmark)</label>
          <input
            type="text"
            value={form.line2}
            onChange={(e) => setForm({ ...form, line2: e.target.value })}
            className="input text-xs"
          />
        </div>

        <div>
          <label className="block font-bold text-primary/70 mb-1">City *</label>
          <input
            type="text"
            required
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="input text-xs"
          />
        </div>

        <div>
          <label className="block font-bold text-primary/70 mb-1">State *</label>
          <input
            type="text"
            required
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            className="input text-xs"
          />
        </div>

        <div>
          <label className="block font-bold text-primary/70 mb-1">PIN / Postal Code *</label>
          <input
            type="text"
            required
            maxLength={6}
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            className="input text-xs"
          />
        </div>

        <div className="flex items-center gap-2 pt-4">
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-primary">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              className="rounded text-accent focus:ring-accent"
            />
            Make this default shipping address
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-3 border-t border-primary/8">
        <button type="button" onClick={onClose} className="btn-outline text-xs px-4 py-2">
          Cancel
        </button>
        <button type="submit" className="btn-primary text-xs px-6 py-2 font-bold uppercase tracking-wider">
          Save Address
        </button>
      </div>
    </form>
  );
}

export default function UserAddresses() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useStore();
  const [modal, setModal] = useState(null); // 'add' | {addr}

  const handleSave = (data) => {
    if (modal === 'add') {
      addAddress(data);
    } else {
      updateAddress(modal.id, data);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="border-b border-primary/8 pb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Fulfillment Logistics
          </span>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">
            Saved Shipping Addresses
          </h1>
          <p className="text-xs text-primary/50 mt-1">
            Choose where your tailored orders, lookbooks, and returns are delivered
          </p>
        </div>

        <button
          onClick={() => setModal('add')}
          className="btn-primary text-xs px-5 py-2.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-4 shadow-sm ${
              addr.isDefault ? 'border-primary ring-2 ring-primary/20' : 'border-primary/10 hover:border-primary/30'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-primary/5 text-primary">
                    {addr.type === 'Office' ? <Briefcase size={15} /> : <Home size={15} />}
                  </span>
                  <span className="font-extrabold text-sm text-primary">{addr.type}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle size={10} /> Default
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setModal(addr)}
                    className="p-1.5 hover:bg-primary/5 rounded-lg text-primary/60 hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-primary/40 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="text-xs text-primary/80 space-y-1">
                <p className="font-bold text-sm text-primary">{addr.name}</p>
                <p>{addr.line1}</p>
                {addr.line2 && <p>{addr.line2}</p>}
                <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                <p className="text-primary/50 pt-1">Phone: {addr.phone}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-primary/8 flex justify-between items-center text-xs">
              {!addr.isDefault ? (
                <button
                  onClick={() => setDefaultAddress(addr.id)}
                  className="text-xs font-bold text-accent hover:underline"
                >
                  Set as Default Address
                </button>
              ) : (
                <span className="text-[11px] text-primary/40 font-medium">Primary Destination</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {modal !== null && (
        <Modal
          title={modal === 'add' ? 'Add Delivery Destination' : `Edit ${modal.type} Address`}
          onClose={() => setModal(null)}
          size="md"
        >
          <AddressForm
            initial={modal === 'add' ? {} : modal}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
    </div>
  );
}

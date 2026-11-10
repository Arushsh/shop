import { useState } from 'react';
import { Eye, Mail, Phone, MapPin, Calendar, ShoppingBag } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import SearchBar from '../../components/common/SearchBar';
import { customers as defaultCustomers } from '../../data/customers';

export default function AdminCustomers() {
  const { customers = defaultCustomers, orders = [] } = useStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const customerList = (customers && customers.length > 0) ? customers : defaultCustomers;

  const filtered = customerList.filter(c => {
    const cName = c.name || '';
    const cEmail = c.email || '';
    const cPhone = c.phone || '';
    const cCity = c.city || '';
    const matchSearch =
      cName.toLowerCase().includes(search.toLowerCase()) ||
      cEmail.toLowerCase().includes(search.toLowerCase()) ||
      cPhone.includes(search) ||
      cCity.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || (c.status || 'active') === statusFilter;
    return matchSearch && matchStatus;
  });

  const getCustomerOrders = (customerEmail) => {
    return (orders || []).filter(o => (o.email || '').toLowerCase() === (customerEmail || '').toLowerCase());
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search customer, email, city..."
            className="w-72"
          />
          <select
            className="input w-36"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <p className="text-xs text-primary/50">
          Showing <span className="font-semibold text-primary">{filtered.length}</span> customers
        </p>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary/3 border-b border-primary/8">
              <tr>
                {['Customer', 'Contact', 'City', 'Total Orders', 'Total Spent', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-primary/50 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-primary/2 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {c.avatar || 'CU'}
                      </div>
                      <div>
                        <p className="font-medium text-primary">{c.name}</p>
                        <p className="text-xs text-primary/40 font-mono">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-primary/70">{c.email}</p>
                    <p className="text-xs text-primary/40">{c.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-primary/70">{c.city}</td>
                  <td className="px-4 py-3 font-medium text-primary">{c.totalOrders || 1}</td>
                  <td className="px-4 py-3 font-semibold text-primary">₹{(c.totalSpend || 0).toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3"><Badge status={c.status || 'active'} /></td>
                  <td className="px-4 py-3">
                    <button
                      className="p-1.5 hover:bg-primary/5 rounded-lg text-primary/50 hover:text-primary transition-colors"
                      onClick={() => setSelected(c)}
                      title="View Customer Details"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-primary/40 text-sm">No customers matched your filter</div>
          )}
        </div>
      </div>

      {/* Customer details modal */}
      {selected && (
        <Modal title={`Customer Profile — ${selected.name}`} onClose={() => setSelected(null)} size="md">
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5">
              <div className="w-14 h-14 rounded-full bg-accent text-white font-bold text-lg flex items-center justify-center">
                {selected.avatar || 'CU'}
              </div>
              <div>
                <h3 className="font-bold text-primary text-base">{selected.name}</h3>
                <p className="text-xs text-primary/50 font-mono">ID: {selected.id}</p>
                <div className="mt-1"><Badge status={selected.status || 'active'} /></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="card p-3">
                <span className="text-xs text-primary/40 flex items-center gap-1.5"><Mail size={13} /> Email</span>
                <p className="font-medium text-primary mt-1 truncate">{selected.email}</p>
              </div>
              <div className="card p-3">
                <span className="text-xs text-primary/40 flex items-center gap-1.5"><Phone size={13} /> Phone</span>
                <p className="font-medium text-primary mt-1">{selected.phone}</p>
              </div>
              <div className="card p-3">
                <span className="text-xs text-primary/40 flex items-center gap-1.5"><MapPin size={13} /> Location</span>
                <p className="font-medium text-primary mt-1">{selected.city}</p>
              </div>
              <div className="card p-3">
                <span className="text-xs text-primary/40 flex items-center gap-1.5"><Calendar size={13} /> Member Since</span>
                <p className="font-medium text-primary mt-1">{selected.joinDate || '2024-01-01'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-primary/10 rounded-xl">
                <p className="text-xs text-primary/50">Total Orders Placed</p>
                <p className="text-xl font-bold text-primary mt-0.5">{selected.totalOrders || 1}</p>
              </div>
              <div className="p-3 bg-white border border-primary/10 rounded-xl">
                <p className="text-xs text-primary/50">Lifetime Spending</p>
                <p className="text-xl font-bold text-accent mt-0.5">₹{(selected.totalSpend || 0).toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase text-primary/50 mb-2 flex items-center gap-1.5">
                <ShoppingBag size={14} /> Associated Orders
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {getCustomerOrders(selected.email).length === 0 ? (
                  <p className="text-xs text-primary/40 italic">No direct order history found.</p>
                ) : (
                  getCustomerOrders(selected.email).map(order => (
                    <div key={order.id} className="flex justify-between items-center p-2.5 rounded-lg bg-primary/3 text-xs">
                      <div>
                        <span className="font-mono font-medium text-primary">{order.id}</span>
                        <p className="text-primary/40">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary">₹{(order.amount || 0).toLocaleString('en-IN')}</span>
                        <Badge status={order.status || 'delivered'} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button className="btn-outline text-xs" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

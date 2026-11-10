import { useState } from 'react';
import { useStore } from '../../store/useStore';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import SearchBar from '../../components/common/SearchBar';
import { Eye, ChevronDown } from 'lucide-react';

const STATUSES = ['pending', 'processing', 'shipped', 'delivered'];

export default function AdminOrders() {
  const { orders = [], updateOrderStatus } = useStore();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [changingStatus, setChangingStatus] = useState(null);

  const orderList = orders || [];

  const filtered = orderList.filter(o => {
    const custName = o.customer || o.shippingAddress?.name || '';
    const orderId = o.id || '';
    const st = (o.status || '').toLowerCase();
    const matchFilter = filter === 'all' || st === filter.toLowerCase();
    const matchSearch = orderId.toLowerCase().includes(search.toLowerCase()) ||
      custName.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    all: orderList.length,
    pending: orderList.filter(o => (o.status || '').toLowerCase() === 'pending').length,
    processing: orderList.filter(o => (o.status || '').toLowerCase() === 'processing').length,
    shipped: orderList.filter(o => (o.status || '').toLowerCase() === 'shipped' || (o.status || '').toLowerCase() === 'in transit').length,
    delivered: orderList.filter(o => (o.status || '').toLowerCase() === 'delivered').length,
  };

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {[['all', 'All'], ...STATUSES.map(s => [s, s.charAt(0).toUpperCase() + s.slice(1)])].map(([v, l]) => (
          <button key={v}
            onClick={() => setFilter(v)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === v ? 'bg-primary text-white' : 'bg-white border border-primary/15 text-primary/60 hover:border-primary/30'}`}>
            {l} <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${filter === v ? 'bg-white/20 text-white' : 'bg-primary/8 text-primary/50'}`}>{counts[v] || 0}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search order ID or customer..." className="w-72" />
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary/3 border-b border-primary/8">
              <tr>
                {['Order ID', 'Customer', 'Date', 'Items', 'Amount', 'Payment', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-primary/50 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filtered.map(o => {
                const customerName = o.customer || o.shippingAddress?.name || 'Customer';
                const customerEmail = o.email || 'customer@threadline.com';
                const itemsCount = (o.items || []).length;
                const status = (o.status || 'delivered').toLowerCase();
                const payment = o.payment || (o.paymentMethod ? 'Paid' : 'Pending');

                return (
                  <tr key={o.id} className="hover:bg-primary/2 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-primary/70 font-medium">{o.id}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-primary">{customerName}</p>
                        <p className="text-xs text-primary/40">{customerEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-primary/60 text-xs">{o.date}</td>
                    <td className="px-4 py-3 text-primary/60">{itemsCount} item{itemsCount > 1 ? 's' : ''}</td>
                    <td className="px-4 py-3 font-semibold text-primary">₹{(o.amount || 0).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3"><Badge status={payment} /></td>
                    <td className="px-4 py-3">
                      {changingStatus === o.id ? (
                        <div className="flex items-center gap-1">
                          <select
                            className="input py-1 text-xs w-32"
                            defaultValue={status}
                            onChange={e => {
                              if (updateOrderStatus) updateOrderStatus(o.id, e.target.value);
                              setChangingStatus(null);
                            }}
                          >
                            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                          </select>
                          <button className="text-primary/40 hover:text-primary text-xs" onClick={() => setChangingStatus(null)}>✕</button>
                        </div>
                      ) : (
                        <button className="flex items-center gap-1 group" onClick={() => setChangingStatus(o.id)}>
                          <Badge status={status} />
                          <ChevronDown size={12} className="text-primary/30 group-hover:text-primary transition-colors" />
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 hover:bg-primary/5 rounded-lg text-primary/50 hover:text-primary transition-colors" onClick={() => setSelected(o)}>
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-primary/40 text-sm">No orders found</div>
          )}
        </div>
      </div>

      {/* Order detail modal */}
      {selected && (
        <Modal title={`Order ${selected.id}`} onClose={() => setSelected(null)} size="lg">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-primary/50">Customer</span><span className="font-medium text-primary">{selected.customer || selected.shippingAddress?.name || 'Customer'}</span></div>
                <div className="flex justify-between"><span className="text-primary/50">Email</span><span className="text-primary/70">{selected.email || 'customer@threadline.com'}</span></div>
                <div className="flex justify-between"><span className="text-primary/50">Phone</span><span className="text-primary/70">{selected.phone || selected.shippingAddress?.phone || '+91 98765 43210'}</span></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-primary/50">Date</span><span className="font-medium text-primary">{selected.date}</span></div>
                <div className="flex justify-between"><span className="text-primary/50">Payment</span><Badge status={selected.payment || 'Paid'} /></div>
                <div className="flex justify-between"><span className="text-primary/50">Method</span><span className="text-primary/70">{selected.paymentMethod || 'UPI / Card'}</span></div>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-primary/50 mb-1 uppercase tracking-wide">Delivery Address</p>
              <p className="text-sm text-primary/70">{selected.address || selected.shippingAddress?.address || '14, MG Road, Bangalore'}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-primary/50 mb-3 uppercase tracking-wide">Order Items</p>
              <div className="space-y-3">
                {(selected.items || []).map((item, i) => {
                  const prodName = typeof item.product === 'object' ? item.product.name : item.product;
                  const itemColor = typeof item.color === 'object' ? item.color.name : item.color;
                  return (
                    <div key={i} className="flex justify-between items-center py-2.5 border-b border-primary/5 last:border-0">
                      <div>
                        <p className="font-medium text-sm text-primary">{prodName}</p>
                        <p className="text-xs text-primary/40">Size: {item.size} · Color: {itemColor} · Qty: {item.qty}</p>
                      </div>
                      <span className="font-semibold text-primary">₹{((item.price || 0) * (item.qty || 1)).toLocaleString('en-IN')}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-primary/3 rounded-xl p-4 flex justify-between items-center">
              <span className="font-semibold text-primary">Total Amount</span>
              <span className="text-xl font-bold text-primary">₹{(selected.amount || 0).toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary/50">Status:</span>
                <select
                  className="input py-1 text-sm w-36"
                  value={(selected.status || 'delivered').toLowerCase()}
                  onChange={e => {
                    if (updateOrderStatus) updateOrderStatus(selected.id, e.target.value);
                    setSelected(o => ({ ...o, status: e.target.value }));
                  }}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <button className="btn-outline" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

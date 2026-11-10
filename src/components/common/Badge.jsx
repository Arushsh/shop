export default function Badge({ status = 'active' }) {
  if (!status) return null;
  const s = String(status).toLowerCase();
  const map = {
    active: 'badge-green',
    delivered: 'badge-green',
    shipped: 'badge-blue',
    'in transit': 'badge-blue',
    processing: 'badge-yellow',
    pending: 'badge-yellow',
    'low-stock': 'badge-yellow',
    'out-of-stock': 'badge-red',
    inactive: 'badge-gray',
    paid: 'badge-green',
  };
  const labels = {
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock',
    'in transit': 'In Transit',
    paid: 'Paid',
    pending: 'Pending',
    active: 'Active',
    delivered: 'Delivered',
    shipped: 'Shipped',
    processing: 'Processing',
    inactive: 'Inactive',
  };
  return (
    <span className={map[s] || 'badge-gray'}>
      {labels[s] || String(status).charAt(0).toUpperCase() + String(status).slice(1)}
    </span>
  );
}

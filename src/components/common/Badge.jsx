export default function Badge({ status }) {
  const map = {
    active: 'badge-green',
    delivered: 'badge-green',
    shipped: 'badge-blue',
    processing: 'badge-yellow',
    pending: 'badge-yellow',
    'low-stock': 'badge-yellow',
    'out-of-stock': 'badge-red',
    inactive: 'badge-gray',
    Paid: 'badge-green',
    Pending: 'badge-yellow',
  };
  const labels = {
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock',
  };
  return (
    <span className={map[status] || 'badge-gray'}>
      {labels[status] || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}


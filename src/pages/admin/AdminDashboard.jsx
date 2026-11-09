import { DollarSign, ShoppingBag, Package, Users, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import { revenueData, weeklyData, topProducts, activities, stats } from '../../data/analytics';
import { useStore } from '../../store/useStore';

const fmt = n => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString('en-IN')}`;

export default function AdminDashboard() {
  const orders = useStore(s => s.orders);
  const recent = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={DollarSign} label="Total Revenue" value={fmt(stats.totalRevenue)}
          sub={<span className="text-emerald-600 flex items-center gap-1"><TrendingUp size={11} /> +{stats.revenueGrowth}% this month</span>}
          iconBg="bg-accent/10" iconColor="text-accent" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats.totalOrders.toLocaleString()}
          sub={<span className="text-emerald-600 flex items-center gap-1"><TrendingUp size={11} /> +{stats.ordersGrowth}%</span>}
          iconBg="bg-primary/10" iconColor="text-primary" />
        <StatCard icon={Package} label="Products" value={stats.totalProducts}
          sub={`${stats.newProducts} new this month`}
          iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard icon={Users} label="Customers" value={stats.totalCustomers}
          sub={<span className="text-emerald-600 flex items-center gap-1"><TrendingUp size={11} /> +{stats.customersGrowth}%</span>}
          iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard icon={AlertTriangle} label="Low Stock" value={stats.lowStockItems}
          sub="Items need attention"
          iconBg="bg-amber-50" iconColor="text-amber-600" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-primary">Revenue Overview</h2>
              <p className="text-xs text-primary/40 mt-0.5">Monthly revenue vs target</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#172B3A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#172B3A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tgt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C49A6C" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#C49A6C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#172B3A10" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#172B3A70' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#172B3A70' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v, n) => [`₹${v.toLocaleString('en-IN')}`, n === 'revenue' ? 'Revenue' : 'Target']} contentStyle={{ borderRadius: 8, border: '1px solid #172B3A10', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#172B3A" strokeWidth={2} fill="url(#rev)" name="revenue" />
              <Area type="monotone" dataKey="target" stroke="#C49A6C" strokeWidth={1.5} fill="url(#tgt)" strokeDasharray="4 4" name="target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly sales */}
        <div className="card">
          <h2 className="font-semibold text-primary mb-1">Weekly Sales</h2>
          <p className="text-xs text-primary/40 mb-5">Orders per day this week</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#172B3A10" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#172B3A70' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#172B3A70' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [v, 'Orders']} contentStyle={{ borderRadius: 8, border: '1px solid #172B3A10', fontSize: 12 }} />
              <Bar dataKey="orders" fill="#C49A6C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent orders */}
        <div className="card lg:col-span-2">
          <h2 className="font-semibold text-primary mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-3 text-xs font-medium text-primary/40 uppercase tracking-wide">Order ID</th>
                  <th className="pb-3 text-xs font-medium text-primary/40 uppercase tracking-wide">Customer</th>
                  <th className="pb-3 text-xs font-medium text-primary/40 uppercase tracking-wide">Amount</th>
                  <th className="pb-3 text-xs font-medium text-primary/40 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {recent.map(o => (
                  <tr key={o.id}>
                    <td className="py-3 font-mono text-xs text-primary/70">{o.id}</td>
                    <td className="py-3 font-medium text-primary">{o.customer}</td>
                    <td className="py-3 text-primary/70">₹{o.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3"><Badge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top products + Activities */}
        <div className="space-y-4">
          <div className="card">
            <h2 className="font-semibold text-primary mb-4">Top Products</h2>
            <div className="space-y-3">
              {topProducts.slice(0, 4).map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-primary/30 w-5">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-primary truncate">{p.name}</p>
                    <p className="text-xs text-primary/40">{p.sold} sold</p>
                  </div>
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">
                    <TrendingUp size={10} /> {p.growth}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-semibold text-primary mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {activities.slice(0, 4).map(a => (
                <div key={a.id} className="flex gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.type === 'stock' ? 'bg-amber-400' : a.type === 'order' ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                  <div>
                    <p className="text-xs text-primary/80 leading-tight">{a.text}</p>
                    <p className="text-xs text-primary/35 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


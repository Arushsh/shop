import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, ShoppingBag, DollarSign, PackageCheck, Layers } from 'lucide-react';
import { revenueData, categoryPerformance, topProducts, orderStats, stats } from '../../data/analytics';
import StatCard from '../../components/common/StatCard';

const fmt = n => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString('en-IN')}`;

export default function AdminAnalytics() {
  const [timeframe, setTimeframe] = useState('year');

  const orderDistribution = [
    { name: 'Delivered', count: orderStats.delivered, color: '#10B981' },
    { name: 'Shipped', count: orderStats.shipped, color: '#3B82F6' },
    { name: 'Processing', count: orderStats.processing, color: '#F59E0B' },
    { name: 'Pending', count: orderStats.pending, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Overview KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={DollarSign}
          label="Gross Revenue"
          value={fmt(stats.totalRevenue)}
          sub={<span className="text-emerald-600 flex items-center gap-1"><TrendingUp size={12} /> +18.5% YoY</span>}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          icon={ShoppingBag}
          label="Total Volume"
          value={stats.totalOrders}
          sub="1,247 lifetime orders"
          iconBg="bg-accent/15"
          iconColor="text-accent"
        />
        <StatCard
          icon={PackageCheck}
          label="Fulfillment Rate"
          value="95.4%"
          sub="973 orders completed"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          icon={Layers}
          label="Avg. Order Value"
          value={`₹${Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString('en-IN')}`}
          sub="Across all channels"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
      </div>

      {/* Main Charts: Revenue + Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Sales & Revenue Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-primary">Monthly Sales & Revenue Growth</h2>
              <p className="text-xs text-primary/40">Comparison between realized monthly revenue and volume</p>
            </div>
            <div className="flex gap-1.5 bg-primary/5 p-1 rounded-lg text-xs">
              {['month', 'quarter', 'year'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 rounded-md font-medium transition-all capitalize ${timeframe === t ? 'bg-white shadow text-primary' : 'text-primary/50 hover:text-primary'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#172B3A" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#172B3A" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C49A6C" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#C49A6C" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#172B3A10" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#172B3A70' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: '#172B3A70' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(val, name) => [`₹${val.toLocaleString('en-IN')}`, name === 'revenue' ? 'Actual Revenue' : 'Projected Target']}
                contentStyle={{ borderRadius: 8, border: '1px solid #172B3A10', fontSize: 12 }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#172B3A" strokeWidth={2.5} fill="url(#revenueGrad)" name="revenue" />
              <Area type="monotone" dataKey="target" stroke="#C49A6C" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#targetGrad)" name="target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Share Donut */}
        <div className="card flex flex-col">
          <h2 className="font-semibold text-primary">Category Share</h2>
          <p className="text-xs text-primary/40 mb-2">Revenue percentage by apparel segment</p>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryPerformance.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name, props) => [`${val}% (₹${props.payload.revenue.toLocaleString('en-IN')})`, props.payload.name]}
                  contentStyle={{ borderRadius: 8, border: '1px solid #172B3A10', fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-primary/5">
            {categoryPerformance.slice(0, 4).map(c => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-xs text-primary/70 truncate">{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row: Best Selling Products & Order Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Best-Selling Products Leaderboard */}
        <div className="card lg:col-span-2">
          <h2 className="font-semibold text-primary mb-1">Best-Selling Garments</h2>
          <p className="text-xs text-primary/40 mb-4">Top ranked garments by sales quantity and aggregate turnover</p>
          <div className="space-y-3">
            {topProducts.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-primary/2 hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-primary truncate">{item.name}</p>
                    <p className="text-xs text-primary/40">{item.sold} units sold</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-sm text-primary">₹{item.revenue.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-emerald-600 font-medium">+{item.growth}% MoM</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Statistics Breakdown */}
        <div className="card flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-primary mb-1">Order Pipeline Status</h2>
            <p className="text-xs text-primary/40 mb-5">Lifecycle progress of current store orders</p>
            <div className="space-y-4">
              {orderDistribution.map(stat => {
                const percent = Math.round((stat.count / stats.totalOrders) * 100);
                return (
                  <div key={stat.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-primary/70">{stat.name}</span>
                      <span className="text-primary font-bold">{stat.count} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-primary/5 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${percent}%`, backgroundColor: stat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
            <p className="text-xs text-accent-700 font-medium">Analytics Engine Insight</p>
            <p className="text-xs text-primary/70 mt-1">
              Shirts segment leads revenue by 32%. Order fulfillment speed is at an optimal 95.4% delivery success rate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


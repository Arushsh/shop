export default function StatCard({ icon: Icon, label, value, sub, iconBg = 'bg-primary/10', iconColor = 'text-primary' }) {
  return (
    <div className="card flex items-start gap-4">
      <div className={`${iconBg} ${iconColor} p-3 rounded-xl flex-shrink-0`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-primary/50 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-primary mt-0.5">{value}</p>
        {sub && <p className="text-xs text-primary/50 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}


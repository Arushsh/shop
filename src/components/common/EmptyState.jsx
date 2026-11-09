export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-primary/5 p-5 rounded-2xl mb-4">
        <Icon size={40} className="text-primary/30" />
      </div>
      <h3 className="text-base font-semibold text-primary/70">{title}</h3>
      {description && <p className="text-sm text-primary/40 mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}


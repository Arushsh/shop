export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-8 h-8 border-2 border-primary/20 border-t-accent rounded-full animate-spin" />
      <p className="text-sm text-primary/50">{text}</p>
    </div>
  );
}


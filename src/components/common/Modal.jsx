import { X } from 'lucide-react';

export default function Modal({ title, onClose, children, size = 'md' }) {
  const sizes = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
      <div
        className={`relative bg-white rounded-2xl shadow-modal w-full ${sizes[size]} max-h-[90vh] flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-primary/8">
          <h2 className="text-base font-semibold text-primary">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-primary/5 text-primary/50 hover:text-primary transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </div>
    </div>
  );
}


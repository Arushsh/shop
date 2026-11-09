import { useState } from 'react';
import { Star, Plus, Edit2, Trash2, Check, MessageSquare } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Modal from '../../components/common/Modal';

export default function UserReviews() {
  const { reviews, addReview, updateReview, deleteReview, products } = useStore();

  const [modalMode, setModalMode] = useState(null); // 'create' | {review}
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openCreateModal = () => {
    setSelectedProductId(products[0]?.id || '');
    setRating(5);
    setTitle('');
    setBody('');
    setPhotoUrl('');
    setModalMode('create');
  };

  const openEditModal = (r) => {
    setSelectedProductId(r.productId);
    setRating(r.rating);
    setTitle(r.title);
    setBody(r.text || r.body);
    setPhotoUrl(r.photos?.[0] || '');
    setModalMode(r);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return;

    const prod = products.find((p) => p.id === selectedProductId) || products[0];

    if (modalMode === 'create') {
      addReview({
        productId: prod.id,
        productName: prod.name,
        rating,
        title,
        text: body,
        photos: photoUrl ? [photoUrl] : [],
      });
    } else {
      updateReview(modalMode.id, {
        rating,
        title,
        text: body,
        photos: photoUrl ? [photoUrl] : [],
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalMode(null);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="border-b border-primary/8 pb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Garment Feedback
          </span>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">
            My Product Ratings & Reviews
          </h1>
          <p className="text-xs text-primary/50 mt-1">
            Browse and refine your feedback on fit, luxury fabrics, and tailoring
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-primary text-xs px-5 py-2.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Write New Review
        </button>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => {
          const associatedProd = products.find((p) => p.id === r.productId);
          return (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-6 border border-primary/10 shadow-sm space-y-4 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-start justify-between gap-4 border-b border-primary/8 pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={associatedProd?.images?.[0] || r.productImage || 'https://via.placeholder.com/80'}
                    alt={r.productName}
                    className="w-14 h-18 object-cover rounded-xl bg-primary/5 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-primary">{r.productName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            fill={star <= r.rating ? 'currentColor' : 'none'}
                            className={star <= r.rating ? 'text-amber-500' : 'text-primary/20'}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-primary/40">• {r.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(r)}
                    className="p-2 rounded-xl border border-primary/15 text-primary/60 hover:text-primary hover:bg-primary/5 transition-colors"
                    title="Edit Review"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteReview(r.id)}
                    className="p-2 rounded-xl border border-primary/15 text-primary/40 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <h4 className="font-extrabold text-primary text-sm">"{r.title}"</h4>
                <p className="text-primary/75 leading-relaxed">{r.text || r.body}</p>
              </div>

              {r.photos?.length > 0 && (
                <div className="flex gap-2 pt-1">
                  {r.photos.map((p, idx) => (
                    <img key={idx} src={p} alt="Attached" className="w-16 h-16 rounded-xl object-cover" />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {modalMode && (
        <Modal
          title={modalMode === 'create' ? 'Write a Garment Review' : `Edit Review`}
          onClose={() => setModalMode(null)}
          size="md"
        >
          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <h3 className="font-bold text-primary">Review Updated Successfully!</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-primary/70 mb-1">Select Garment</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="input text-xs"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-primary/70 mb-1">Star Rating</label>
                <div className="flex items-center gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={22}
                        fill={star <= rating ? '#F59E0B' : 'none'}
                        className={star <= rating ? 'text-amber-500' : 'text-primary/20'}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-primary">{rating} / 5</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-primary/70 mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luxurious fabric, true to size"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-primary/70 mb-1">Detailed Review *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Elaborate on comfort, button quality, and daily wear..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="input text-xs resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-primary/70 mb-1">Photo Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-primary/8">
                <button type="button" onClick={() => setModalMode(null)} className="btn-outline text-xs px-4 py-2">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs px-6 py-2 font-bold uppercase tracking-wider">
                  Save Review
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}

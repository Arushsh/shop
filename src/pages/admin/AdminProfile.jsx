import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { User, Mail, Phone, Building, ShieldCheck, Check } from 'lucide-react';

const defaultProfile = {
  name: 'Administrator',
  email: 'admin@threadline.com',
  phone: '+91 (80) 4123-8899',
  role: 'Master Administrator',
  avatar: 'AD',
  store: 'THREADLINE Atelier',
};

export default function AdminProfile() {
  const { adminProfile, updateAdminProfile } = useStore();
  const [formData, setFormData] = useState({ ...defaultProfile, ...adminProfile });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateAdminProfile) updateAdminProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Overview Card */}
      <div className="card p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-primary text-accent text-2xl font-bold flex items-center justify-center flex-shrink-0 shadow-inner">
          {formData.avatar || 'AD'}
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold text-primary">{formData.name}</h2>
            <span className="badge-blue text-xs flex items-center gap-1">
              <ShieldCheck size={12} /> {formData.role}
            </span>
          </div>
          <p className="text-xs text-primary/50 mt-1">{formData.email} • {formData.store}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="text-xs px-2.5 py-1 rounded-md bg-primary/5 text-primary/70">Master Privileges</span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700">Active Status</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="card p-6">
        <div className="border-b border-primary/8 pb-4 mb-5">
          <h3 className="font-semibold text-primary">Administrator Information</h3>
          <p className="text-xs text-primary/40">Manage your administrative credentials and personal contact info</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-primary/60 mb-1 flex items-center gap-1.5">
                <User size={13} /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-primary/60 mb-1 flex items-center gap-1.5">
                <Mail size={13} /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-primary/60 mb-1 flex items-center gap-1.5">
                <Phone size={13} /> Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-primary/60 mb-1 flex items-center gap-1.5">
                <Building size={13} /> Retail Store Name
              </label>
              <input
                type="text"
                name="store"
                value={formData.store || ''}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-primary/60 mb-1">Administrative Role</label>
              <input
                type="text"
                name="role"
                value={formData.role || ''}
                onChange={handleChange}
                className="input bg-primary/2"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-primary/60 mb-1">Avatar Initials</label>
              <input
                type="text"
                name="avatar"
                maxLength={3}
                value={formData.avatar || 'AD'}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-primary/8">
            {saved ? (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                <Check size={14} /> Profile details saved successfully!
              </span>
            ) : <div />}
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

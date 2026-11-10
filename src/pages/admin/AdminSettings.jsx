import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Store, Bell, Palette, Check } from 'lucide-react';

const defaultSettings = {
  storeName: 'THREADLINE Atelier',
  storeEmail: 'concierge@threadline.com',
  storePhone: '+91 (80) 4123-8899',
  currency: 'INR',
  theme: 'light',
  emailNotifications: true,
  orderAlerts: true,
  stockAlerts: true,
  marketingEmails: false,
};

export default function AdminSettings() {
  const { settings, updateSettings } = useStore();
  const [form, setForm] = useState({ ...defaultSettings, ...settings });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (updateSettings) updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Store Information */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-primary/8">
            <Store size={18} className="text-accent" />
            <div>
              <h2 className="font-semibold text-primary">Store Display Information</h2>
              <p className="text-xs text-primary/40">General public-facing store branding details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-primary/60 mb-1">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={form.storeName || ''}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-primary/60 mb-1">Support Email</label>
              <input
                type="email"
                name="storeEmail"
                value={form.storeEmail || ''}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-primary/60 mb-1">Support Phone</label>
              <input
                type="text"
                name="storePhone"
                value={form.storePhone || ''}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-primary/60 mb-1">Base Currency</label>
              <select
                name="currency"
                value={form.currency || 'INR'}
                onChange={handleChange}
                className="input"
              >
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>
          </div>
        </div>

        {/* Theme Preferences */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-primary/8">
            <Palette size={18} className="text-accent" />
            <div>
              <h2 className="font-semibold text-primary">Visual Design & Theme Preferences</h2>
              <p className="text-xs text-primary/40">Theme styling configured for high aesthetic contrast</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-primary/60 mb-2">Color Mode</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'light', label: 'Light Clean (Default)', desc: 'Ivory background (#F7F7F5) with deep navy' },
                  { id: 'dark', label: 'SaaS Dark (Upcoming)', desc: 'High-contrast dark mode for night management' },
                  { id: 'system', label: 'System Automatic', desc: 'Syncs with host operating system settings' },
                ].map(item => (
                  <label
                    key={item.id}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${form.theme === item.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-primary/10 hover:border-primary/30'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary">{item.label}</span>
                      <input
                        type="radio"
                        name="theme"
                        value={item.id}
                        checked={form.theme === item.id}
                        onChange={handleChange}
                        className="text-primary focus:ring-accent"
                      />
                    </div>
                    <span className="text-[11px] text-primary/50 mt-1">{item.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-primary/2">
              <div>
                <p className="text-xs font-medium text-primary">Accent Palette</p>
                <p className="text-[11px] text-primary/40">Default luxury warm amber gold (#C49A6C)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#C49A6C] border border-white shadow-sm inline-block" />
                <span className="text-xs font-mono text-primary/60">#C49A6C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-primary/8">
            <Bell size={18} className="text-accent" />
            <div>
              <h2 className="font-semibold text-primary">Notification Preferences</h2>
              <p className="text-xs text-primary/40">Configure administrative system notifications and alerts</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { id: 'orderAlerts', title: 'New Order Alerts', desc: 'Notify immediately when customer places a fresh order' },
              { id: 'stockAlerts', title: 'Low Stock Triggers', desc: 'Push alert when inventory units drop below threshold (< 10)' },
              { id: 'emailNotifications', title: 'Daily Digest Email', desc: 'Send daily summary of gross sales and fulfillment status' },
              { id: 'marketingEmails', title: 'Product Marketing Newsletter', desc: 'Receive internal tips and seasonal garment promotions' },
            ].map(pref => (
              <label key={pref.id} className="flex items-start justify-between p-3 rounded-xl hover:bg-primary/2 cursor-pointer transition-colors">
                <div>
                  <p className="text-xs font-medium text-primary">{pref.title}</p>
                  <p className="text-[11px] text-primary/40">{pref.desc}</p>
                </div>
                <input
                  type="checkbox"
                  name={pref.id}
                  checked={Boolean(form[pref.id])}
                  onChange={handleChange}
                  className="rounded border-primary/20 text-accent focus:ring-accent h-4 w-4 mt-1"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between">
          {saved ? (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
              <Check size={14} /> Store settings updated successfully!
            </span>
          ) : <div />}
          <button type="submit" className="btn-primary">
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}

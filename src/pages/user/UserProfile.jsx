import { useState } from 'react';
import { User, Mail, Phone, Calendar, ShieldCheck, Check, Key, Award, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function UserProfile() {
  const { profile, updateProfile } = useStore();

  const [form, setForm] = useState({ ...profile });
  const [profileSaved, setProfileSaved] = useState(false);

  // Change password local state
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });
  const [passwordMsg, setPasswordMsg] = useState('');

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPass.length < 8) {
      setPasswordMsg('Error: New password must be at least 8 characters long.');
      return;
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      setPasswordMsg('Error: Password confirmation does not match.');
      return;
    }
    setPasswordMsg('Success: Password updated successfully.');
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setPasswordMsg(''), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="border-b border-primary/8 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          Patron Membership
        </span>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          My Account Profile
        </h1>
        <p className="text-xs text-primary/50 mt-1">
          Manage your personal atelier identity, size preferences, and security credentials
        </p>
      </div>

      {/* Hero Patron Card */}
      <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl border border-primary-700">
        <div className="w-20 h-20 rounded-2xl bg-accent text-white font-extrabold text-2xl flex items-center justify-center shadow-lg flex-shrink-0">
          {profile.avatar}
        </div>
        <div className="text-center sm:text-left flex-1 space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <span className="bg-accent/20 border border-accent/40 text-accent text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              {profile.membership}
            </span>
          </div>
          <p className="text-xs text-white/60">{profile.email} • {profile.phone}</p>
          <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start text-xs">
            <span className="bg-white/10 px-3 py-1 rounded-full text-white/80">
              Loyalty Points: <strong className="text-accent">{profile.loyaltyPoints} Pts</strong>
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full flex items-center gap-1 font-medium">
              <ShieldCheck size={13} /> Verified Shopper
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Edit Personal Information + Change Password */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Profile Info Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/10 shadow-sm space-y-5">
          <div className="border-b border-primary/8 pb-3">
            <h3 className="font-extrabold text-primary text-base">Personal Information</h3>
            <p className="text-xs text-primary/40">Used for courier dispatches and bespoke communication</p>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-primary/70 mb-1 flex items-center gap-1.5">
                <User size={13} /> Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-primary/70 mb-1 flex items-center gap-1.5">
                <Mail size={13} /> Email Address *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-primary/70 mb-1 flex items-center gap-1.5">
                <Phone size={13} /> Mobile Number
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-primary/70 mb-1 flex items-center gap-1.5">
                  <Calendar size={13} /> Date of Birth
                </label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="input text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-primary/70 mb-1">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="input text-xs"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-primary/8 flex items-center justify-between">
              {profileSaved ? (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <Check size={14} /> Profile details saved!
                </span>
              ) : <div />}
              <button type="submit" className="btn-primary text-xs px-6 py-2.5 font-bold uppercase tracking-wider">
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Change Password UI */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/10 shadow-sm space-y-5">
          <div className="border-b border-primary/8 pb-3">
            <h3 className="font-extrabold text-primary text-base flex items-center gap-2">
              <Key size={16} className="text-accent" /> Security Credentials
            </h3>
            <p className="text-xs text-primary/40">Update your account login password</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-primary/70 mb-1">Current Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-primary/70 mb-1">New Password (8+ characters)</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passwordForm.newPass}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                className="input text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-primary/70 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                className="input text-xs"
              />
            </div>

            {passwordMsg && (
              <p className={`text-[11px] font-bold ${passwordMsg.startsWith('Success') ? 'text-emerald-700' : 'text-red-500'}`}>
                {passwordMsg}
              </p>
            )}

            <div className="pt-3 border-t border-primary/8 flex justify-end">
              <button type="submit" className="btn-outline text-xs px-6 py-2.5 font-bold uppercase tracking-wider">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

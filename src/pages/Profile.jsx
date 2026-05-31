import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  BellRing,
  X,
  Monitor,
  Smartphone,
  Laptop,
  LogOut,
  Edit3,
} from 'lucide-react';

const sessionData = [
  { device: 'Mac Studio - Chrome v118', location: 'San Francisco, CA (192.168.1.42)', last: 'Active now', current: true },
  { device: 'iPhone 15 Pro - Wance Mobile App', location: 'San Francisco, CA', last: '2 hours ago', current: false },
  { device: 'MacBook Pro - Safari', location: 'New York, NY', last: 'Oct 24, 2023 - 10:14 AM', current: false },
];

const notificationPrefs = [
  { icon: UserPlus, label: 'New Client Signups', email: true, push: false },
  { icon: BellRing, label: 'Low Balance Alerts', email: true, push: true },
  { icon: Monitor, label: 'System Maintenance', email: true, push: true },
];

export default function Profile() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [prefs, setPrefs] = useState(notificationPrefs);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const navigate = useNavigate();

  const notify = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      notify('Profile saved successfully');
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const togglePref = (idx, field) => {
    setPrefs((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: !p[field] } : p))
    );
  };

  return (
    <div className="px-4 md:px-page-padding-x py-6 md:py-8 max-w-container-max mx-auto w-full">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-on-surface text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
          {toastMsg}
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 md:mb-10">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">My Profile</h1>
        <p className="font-body-md text-on-surface-variant text-sm md:text-base">
          Manage your account settings, security, and notification preferences.
        </p>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 gap-6 md:gap-gap-lg">
        {/* Personal Information */}
        <section className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
          <div className="px-4 md:px-6 py-3 md:py-4 border-b border-outline-variant bg-surface-container-low">
            <h2 className="font-headline-sm text-headline-sm">Personal Information</h2>
          </div>
          <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
              <div className="relative group shrink-0 mx-auto md:mx-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-3xl md:text-4xl font-black shadow-sm border-2 border-white">
                  AV
                </div>
                <button
                  onClick={() => notify('Edit avatar clicked')}
                  className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 md:p-2 rounded-lg shadow-lg hover:bg-primary-container transition-transform active:scale-95"
                >
                  <Edit3 size={14} className="md:w-[18px] md:h-[18px]" />
                </button>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-6 w-full">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5 text-xs">Full Name</label>
                  <input className="w-full h-10 md:h-11 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" type="text" defaultValue="Alex Vance" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5 text-xs">Role</label>
                  <input className="w-full h-10 md:h-11 px-4 bg-surface-container-low border border-outline-variant rounded-lg text-body-md text-sm text-on-surface-variant opacity-70" disabled type="text" defaultValue="Super Admin" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5 text-xs">Email Address</label>
                  <input className="w-full h-10 md:h-11 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" type="email" defaultValue="alex@wance.admin" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5 text-xs">Phone Number</label>
                  <input className="w-full h-10 md:h-11 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" type="tel" defaultValue="+1 (555) 000-1234" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-gap-lg">
          {/* Security & Password */}
          <section className="bg-white rounded-xl border border-outline-variant flex flex-col shadow-sm">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-outline-variant bg-surface-container-low">
              <h2 className="font-headline-sm text-headline-sm">Security & Password</h2>
            </div>
            <div className="p-4 md:p-6 space-y-4 md:space-y-6 flex-1">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5 text-xs">New Password</label>
                <input className="w-full h-10 md:h-11 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" type="password" placeholder="••••••••••••" />
              </div>
              <div className="pb-4 md:pb-6 border-b border-outline-variant">
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5 text-xs">Confirm New Password</label>
                <input className="w-full h-10 md:h-11 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" type="password" placeholder="••••••••••••" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-body-strong text-body-strong text-sm">Two-factor Authentication (2FA)</p>
                  <p className="font-caption text-caption text-on-surface-variant">Secure your account with an additional layer of protection.</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={twoFA} onChange={() => setTwoFA(!twoFA)} className="sr-only peer" />
                    <div className="w-10 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                  <span className="font-label-md text-label-md text-status-active text-xs">{twoFA ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="bg-white rounded-xl border border-outline-variant flex flex-col shadow-sm">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-outline-variant bg-surface-container-low">
              <h2 className="font-headline-sm text-headline-sm">Notification Preferences</h2>
            </div>
            <div className="p-4 md:p-6 flex-1">
              <p className="font-body-md text-on-surface-variant mb-4 text-sm">Choose how you want to be informed about system activity.</p>
              <div className="space-y-3 md:space-y-4">
                {prefs.map((pref, idx) => {
                  const Icon = pref.icon;
                  return (
                    <div key={pref.label} className="flex items-center justify-between p-2 md:p-3 rounded-lg hover:bg-surface transition-colors border border-transparent hover:border-outline-variant/30 gap-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Icon size={18} className="text-on-surface-variant shrink-0" />
                        <span className="font-body-md text-body-md text-sm">{pref.label}</span>
                      </div>
                      <div className="flex gap-3 md:gap-4 shrink-0">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" checked={pref.email} onChange={() => togglePref(idx, 'email')} className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary" />
                          <span className="font-label-md text-label-md text-xs">Email</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" checked={pref.push} onChange={() => togglePref(idx, 'push')} className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary" />
                          <span className="font-label-md text-label-md text-xs">Push</span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Active Sessions */}
        <section className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
          <div className="px-4 md:px-6 py-3 md:py-4 border-b border-outline-variant bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="font-headline-sm text-headline-sm">Active Sessions</h2>
            <button onClick={() => notify('Logged out from all other devices')} className="text-primary font-label-md text-label-md hover:underline text-xs">
              Log out from all other devices
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-high border-b border-outline-variant">
                <tr>
                  <th className="px-4 md:px-6 h-[36px] md:h-[40px] font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-[10px] md:text-xs">Device & Browser</th>
                  <th className="px-4 md:px-6 h-[36px] md:h-[40px] font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-[10px] md:text-xs hidden sm:table-cell">Location</th>
                  <th className="px-4 md:px-6 h-[36px] md:h-[40px] font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-[10px] md:text-xs">Last Active</th>
                  <th className="px-4 md:px-6 h-[36px] md:h-[40px] font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-[10px] md:text-xs text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {sessionData.map((s, i) => (
                  <tr key={i} className="hover:bg-surface/50 h-[44px] md:h-table-row-height transition-colors">
                    <td className="px-4 md:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2 md:gap-3">
                        {i === 0 ? <Monitor size={16} className="text-on-surface-variant" /> : i === 1 ? <Smartphone size={16} className="text-on-surface-variant" /> : <Laptop size={16} className="text-on-surface-variant" />}
                        <span className="font-body-md text-body-md text-sm">{s.device}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 whitespace-nowrap font-body-md text-body-md text-sm hidden sm:table-cell">{s.location}</td>
                    <td className="px-4 md:px-6 whitespace-nowrap font-body-md text-body-md text-sm">{s.last}</td>
                    <td className="px-4 md:px-6 whitespace-nowrap text-right">
                      {s.current ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-active-bg text-status-active font-body-strong text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-active"></span> Current Session
                        </span>
                      ) : (
                        <button onClick={() => notify(`Session ${s.device} revoked`)} className="text-on-surface-variant hover:text-error transition-colors p-1 rounded">
                          <X size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 md:pb-12">
          <button onClick={() => { notify('Logged out'); navigate('/login'); }} className="flex items-center gap-2 px-5 md:px-6 h-10 md:h-12 text-error font-body-strong text-body-strong border border-error/20 hover:bg-error/5 rounded-lg transition-colors text-sm">
            <LogOut size={16} />
            Log Out of Account
          </button>
          <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
            <button onClick={() => notify('Changes discarded')} className="flex-1 sm:flex-none px-5 md:px-6 h-10 md:h-12 text-on-surface-variant font-body-strong text-body-strong hover:bg-surface-container-low rounded-lg transition-colors text-sm">
              Discard Changes
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex-1 sm:flex-none px-6 md:px-8 h-10 md:h-12 text-white font-body-strong text-body-strong rounded-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2 ${
                saved ? 'bg-status-active' : 'bg-primary hover:bg-primary-container'
              }`}
            >
              {saving ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

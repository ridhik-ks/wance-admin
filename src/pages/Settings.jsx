import { useState } from 'react';
import {
  SlidersHorizontal,
  Receipt,
  BellRing,
  Users,
  MoreVertical,
  UserPlus,
  Edit,
  CheckCircle,
  X,
} from 'lucide-react';
import { teamMembers, planConfigs, notificationSettings } from '../data/mockData';
import InviteTeamModal from '../components/modals/InviteTeamModal';
import EditSubscriptionModal from '../components/modals/EditSubscriptionModal';

const settingTabs = [
  { id: 'general', label: 'General', icon: SlidersHorizontal },
  { id: 'plans', label: 'Plans', icon: Receipt },
  { id: 'notifications', label: 'Notifications', icon: BellRing },
  { id: 'team', label: 'Team Members', icon: Users },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('team');
  const [toggles, setToggles] = useState(
    notificationSettings.reduce((acc, n) => ({ ...acc, [n.title]: n.checked }), {})
  );
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editPlanModalOpen, setEditPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const notify = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleSwitch = (title) => {
    setToggles((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-on-surface text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
          {toastMsg}
        </div>
      )}

      {/* Internal Settings Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-outline-variant/30 flex flex-row md:flex-col pt-4 md:pt-6 overflow-x-auto md:overflow-x-visible no-scrollbar">
        <div className="px-4 md:px-6 mb-0 md:mb-4 min-w-fit">
          <p className="text-[11px] font-bold text-outline uppercase tracking-[0.1em] mb-2 md:mb-4 hidden md:block">Configuration</p>
          <nav className="flex md:flex-col gap-1 md:gap-1">
            {settingTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-3 py-2 rounded-lg flex items-center gap-3 text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary-fixed text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="hidden md:block px-6 mt-auto p-6 border-t border-outline-variant/20">
          <div className="bg-surface-container-low rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">Health</span>
              <span className="text-[10px] font-bold text-status-active">99.9%</span>
            </div>
            <div className="w-full bg-outline-variant/30 h-1 rounded-full overflow-hidden">
              <div className="bg-status-active h-full w-[99.9%]"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-surface-bright">
        <div className="max-w-5xl mx-auto py-6 md:py-8 px-4 md:px-8">
          {/* TEAM MEMBERS SECTION */}
          {activeTab === 'team' && (
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-3">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-on-surface">Team Access Control</h2>
                  <p className="text-sm text-on-surface-variant mt-1">Manage administrative roles and platform permissions.</p>
                </div>
                <button
                  onClick={() => setInviteModalOpen(true)}
                  className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm w-fit"
                >
                  <UserPlus size={18} />
                  Invite member
                </button>
              </div>
              <div className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low/50 border-b border-outline-variant/30">
                      <tr>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-[11px] font-bold text-outline uppercase tracking-wider">Member</th>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-[11px] font-bold text-outline uppercase tracking-wider hidden sm:table-cell">Access Role</th>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-[11px] font-bold text-outline uppercase tracking-wider text-center">Status</th>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-[11px] font-bold text-outline uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {teamMembers.map((member) => (
                        <tr key={member.name} className="hover:bg-surface-container-low/30 transition-colors">
                          <td className="px-4 md:px-6 py-3 md:py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-sm font-bold ${member.color}`}>
                                {member.initials}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-on-surface">{member.name}</span>
                                <span className="text-[11px] text-outline hidden sm:block">{member.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-3 md:py-4 hidden sm:table-cell">
                            <span className="text-sm text-on-surface-variant">{member.role}</span>
                          </td>
                          <td className="px-4 md:px-6 py-3 md:py-4">
                            <div className="flex justify-center">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                member.status === 'Active' ? 'bg-status-active-bg text-status-active' :
                                member.status === 'Pending' ? 'bg-surface-container text-outline' :
                                'bg-status-suspended-bg text-status-suspended'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  member.status === 'Active' ? 'bg-status-active' :
                                  member.status === 'Pending' ? 'bg-outline' :
                                  'bg-status-suspended'
                                }`}></span>
                                {member.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                            <button onClick={() => notify(`Options for ${member.name}`)} className="p-1.5 hover:bg-surface-container-low rounded-lg text-outline transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* PLAN MANAGEMENT SECTION */}
          {activeTab === 'plans' && (
            <section>
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold text-on-surface">Subscription Tiers</h2>
                <p className="text-sm text-on-surface-variant mt-1">Configure pricing and usage limits for customer plans.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {planConfigs.map((plan) => (
                  <div key={plan.name} className={`bg-white rounded-xl border ${plan.border} p-5 md:p-6 flex flex-col gap-4 hover:shadow-md transition-shadow`}>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${plan.color} ${plan.text}`}>{plan.name}</span>
                      <button onClick={() => { setSelectedPlan(plan); setEditPlanModalOpen(true); }} className="text-outline hover:text-primary transition-colors"><Edit size={16} /></button>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl md:text-2xl font-bold text-on-surface">{plan.price}</span>
                        <span className="text-xs text-outline">{plan.period}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1">{plan.limit}</p>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-outline-variant/10">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-on-surface-variant">
                          <CheckCircle size={14} className={plan.dark ? 'text-primary-container' : 'text-primary'} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* NOTIFICATION PREFERENCES SECTION */}
          {activeTab === 'notifications' && (
            <section>
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold text-on-surface">Administrative Alerts</h2>
                <p className="text-sm text-on-surface-variant mt-1">Control which events trigger automated notifications.</p>
              </div>
              <div className="bg-white border border-outline-variant/30 rounded-xl divide-y divide-outline-variant/20 shadow-sm">
                {notificationSettings.map((n) => (
                  <div key={n.title} className="p-4 md:p-5 flex items-center justify-between gap-4">
                    <div className="flex gap-3 md:gap-4 items-center">
                      <div className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg shrink-0 ${n.color}`}>
                        {n.icon === 'userPlus' && <UserPlus size={18} />}
                        {n.icon === 'warning' && <BellRing size={18} />}
                        {n.icon === 'cancel' && <X size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{n.title}</p>
                        <p className="text-[11px] text-on-surface-variant">{n.description}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={toggles[n.title]}
                        onChange={() => toggleSwitch(n.title)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-outline-variant/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* GENERAL SETTINGS SECTION */}
          {activeTab === 'general' && (
            <section>
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold text-on-surface">Platform Details</h2>
                <p className="text-sm text-on-surface-variant mt-1">Fundamental metadata for the Wance administrative suite.</p>
              </div>
              <div className="bg-white border border-outline-variant/30 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-outline uppercase tracking-wider">Platform Name</label>
                    <input className="w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all" type="text" defaultValue="Wance Operations Portal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-outline uppercase tracking-wider">Primary Support Contact</label>
                    <input className="w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all" type="email" defaultValue="ops@wance.admin" />
                  </div>
                </div>
                <div className="pt-6 flex justify-end gap-3 border-t border-outline-variant/10">
                  <button onClick={() => notify('Changes discarded')} className="px-5 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors">Cancel</button>
                  <button onClick={() => notify('Settings saved successfully')} className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 shadow-sm transition-all">Apply Changes</button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      <InviteTeamModal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} />
      <EditSubscriptionModal
        key={selectedPlan?.name || 'empty'}
        isOpen={editPlanModalOpen}
        onClose={() => setEditPlanModalOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
}

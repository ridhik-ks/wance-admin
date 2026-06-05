import { useState } from 'react';
import {
  CalendarDays,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Bolt,
  Rocket,
  Layers,
  Building2,
  X,
  Plus,
} from 'lucide-react';
import { subscriptions, planSummary } from '../data/mockData';
import CreateSubscriptionModal from '../components/modals/CreateSubscriptionModal';

const filterTabs = ['All', 'Active', 'Trial', 'Past Due', 'Cancelled'];

const planIconMap = {
  bolt: <Bolt size={20} />,
  rocket: <Rocket size={20} />,
  layers: <Layers size={20} />,
  shield: <Building2 size={20} />,
};

const planHoverBorder = {
  Starter: 'hover:border-primary/40',
  Growth: 'hover:border-status-trial/40',
  Professional: 'hover:border-secondary/40',
  Enterprise: 'hover:border-plan-enterprise/40',
};

export default function Subscriptions() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const notify = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const filteredSubs = activeFilter === 'All'
    ? subscriptions
    : subscriptions.filter((s) => s.status === activeFilter);

  return (
    <div className="px-4 md:px-page-padding-x py-6 md:py-8 space-y-6 md:space-y-gap-lg max-w-container-max mx-auto w-full">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-on-surface text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
          {toastMsg}
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Subscriptions</h2>
          <p className="text-on-surface-variant font-body-md text-body-md mt-1">Manage billing and plan usage across your portfolio.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => notify('Date picker opened')}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface font-label-md transition-colors hover:bg-surface-container text-sm"
          >
            <CalendarDays size={18} />
            <span>October 2023</span>
            <span className="text-[18px]">▼</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 md:px-5 py-2 bg-primary text-white rounded-lg font-label-md hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center gap-2 text-sm shadow-sm shadow-primary/25"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Subscription</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Simplified Plan Summary Bento */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-gap-sm">
        {planSummary.map((plan) => (
          <div key={plan.name} className={`bg-white p-4 md:p-6 rounded-xl border border-outline-variant space-y-3 transition-colors ${planHoverBorder[plan.name] || 'hover:border-primary/40'}`}>
            <div className="flex justify-between items-start">
              <p className="font-label-md text-on-surface-variant tracking-wider uppercase text-[11px]">{plan.name}</p>
              <span className="text-outline">{planIconMap[plan.icon]}</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-stat-value text-stat-value text-on-surface text-lg md:text-2xl">
                {plan.users} <span className="text-caption text-on-surface-variant font-normal">users</span>
              </h3>
              <p className="text-caption font-body-strong text-on-surface-variant tabular-nums">{plan.mrr} MRR</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Content */}
      <div className="space-y-4">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1 border-b border-outline-variant w-full sm:w-auto overflow-x-auto no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 md:px-4 py-2 border-b-2 transition-colors whitespace-nowrap text-sm ${
                  activeFilter === tab
                    ? 'border-primary text-body-strong text-primary'
                    : 'border-transparent text-body-md text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => notify('Filters opened')}
              className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg text-body-md hover:bg-surface-container-low transition-colors text-sm"
            >
              <span className="text-[18px]">☰</span>
              Filters
            </button>
            <button
              onClick={() => notify('Export downloaded')}
              className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg text-body-md hover:bg-surface-container-low transition-colors text-sm"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Streamlined Table */}
        <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant h-10 md:h-12">
                  <th className="px-4 md:px-6 font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-[11px]">Shop Name</th>
                  <th className="px-3 md:px-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-[11px]">Plan</th>
                  <th className="px-3 md:px-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-[11px] hidden sm:table-cell">Billing</th>
                  <th className="px-3 md:px-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-[11px]">Status</th>
                  <th className="px-3 md:px-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-[11px] text-right">Amount</th>
                  <th className="px-3 md:px-4 font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-[11px] text-right hidden md:table-cell">Renewal</th>
                  <th className="px-4 md:px-6 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {filteredSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-surface-container-low transition-colors group h-[56px] md:h-table-row-height cursor-pointer" onClick={() => setDrawerOpen(true)}>
                    <td className="px-4 md:px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center font-bold text-xs md:text-sm ${sub.status === 'Past Due' ? 'bg-secondary/5 text-secondary' : sub.status === 'Trial' ? 'bg-status-trial/5 text-status-trial' : sub.status === 'Cancelled' ? 'bg-error/5 text-error' : 'bg-primary/5 text-primary'}`}>
                          {sub.initials}
                        </div>
                        <div>
                          <p className="font-body-strong text-on-surface leading-tight text-sm">{sub.shop}</p>
                          <p className="text-caption text-on-surface-variant">#{sub.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-4">
                      <span className="text-body-md text-on-surface text-sm">{sub.plan}</span>
                    </td>
                    <td className="px-3 md:px-4 hidden sm:table-cell">
                      <span className="text-body-md text-on-surface-variant text-sm">{sub.billing}</span>
                    </td>
                    <td className="px-3 md:px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        sub.status === 'Active' ? 'bg-status-active-bg text-status-active' :
                        sub.status === 'Trial' ? 'bg-status-trial-bg text-status-trial' :
                        sub.status === 'Past Due' ? 'bg-status-suspended-bg text-status-suspended' :
                        'bg-status-churned-bg text-status-churned'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-3 md:px-4 text-right tabular-nums font-body-strong text-sm">₹ {sub.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="px-3 md:px-4 text-right hidden md:table-cell">
                      <p className={`font-body-md leading-tight tabular-nums text-xs md:text-sm ${sub.urgent ? 'text-error' : 'text-on-surface'}`}>
                        {sub.nextRenewal}
                      </p>
                      <p className={`text-caption text-[10px] md:text-xs ${sub.urgent ? 'text-error' : 'text-on-surface-variant'}`}>{sub.daysLeft}</p>
                    </td>
                    <td className="px-4 md:px-6 text-right">
                      <button className="p-1 hover:bg-surface-container rounded-md transition-colors opacity-0 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical size={18} className="text-on-surface-variant" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-4 md:px-6 py-3 md:py-4 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-caption text-on-surface-variant">Page 1 of 525</p>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-30" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg bg-primary text-white font-body-strong text-xs">1</button>
              <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container-low transition-colors text-xs">2</button>
              <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container-low transition-colors text-xs">3</button>
              <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Subscription Modal */}
      <CreateSubscriptionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={(msg) => notify(msg)}
      />

      {/* Client Detail Drawer */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={() => setDrawerOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 md:p-6 flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Details</h3>
              <p className="text-caption text-on-surface-variant uppercase tracking-widest mt-0.5">SUB-9821-XP</p>
            </div>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors" onClick={() => setDrawerOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/5 flex items-center justify-center text-primary text-xl font-bold">K</div>
              <div>
                <h4 className="font-headline-sm text-headline-sm">Kirana Plus Store</h4>
                <p className="text-caption text-on-surface-variant">Joined Jan 12, 2022</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">Plan</p>
                <p className="font-body-strong text-on-surface text-sm">Enterprise (Annual)</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">Renewal</p>
                <p className="font-body-strong text-on-surface text-sm">Oct 12, 2024</p>
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">Resources</h5>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-body-md text-sm">
                    <span className="text-on-surface-variant">API Usage</span>
                    <span className="font-body-strong tabular-nums">85.0%</span>
                  </div>
                  <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-body-md text-sm">
                    <span className="text-on-surface-variant">POS Slots</span>
                    <span className="font-body-strong tabular-nums">42 / 50</span>
                  </div>
                  <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-status-active" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-outline-variant space-y-3">
              <button onClick={() => notify('Edit subscription opened')} className="w-full py-2.5 bg-on-surface text-surface rounded-lg font-label-md hover:bg-on-surface/90 transition-colors text-sm">
                Edit Subscription
              </button>
              <button onClick={() => notify('Account suspended')} className="w-full py-2.5 text-error font-label-md hover:bg-error/5 rounded-lg transition-colors border border-transparent text-sm">
                Suspend Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

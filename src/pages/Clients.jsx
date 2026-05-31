import { useState } from 'react';
import { Filter, Plus, ChevronRight, ChevronLeft, TrendingUp, Wallet, MessageSquare, UserX, X, Edit, Ban, CheckCircle } from 'lucide-react';
import { clients, clientStats } from '../data/mockData';
import UpdateBusinessModal from '../components/modals/UpdateBusinessModal';
import SuspendAccountModal from '../components/modals/SuspendAccountModal';
import AddClientModal from '../components/modals/AddClientModal';

const tabs = [
  { label: 'All', count: '1,284' },
  { label: 'Active', count: '1,102' },
  { label: 'Trial', count: '64' },
  { label: 'Suspended', count: '89' },
  { label: 'Churned', count: '29' },
];

const planBadgeClasses = {
  Starter: 'px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border border-outline-variant bg-surface-container-low text-on-surface-variant',
  Growth: 'px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border border-outline-variant bg-surface-container-low text-on-surface-variant',
  Pro: 'px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border border-outline-variant bg-surface-container-low text-on-surface-variant',
  Enterprise: 'px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-plan-enterprise text-white',
};

const statusBadgeClasses = {
  Active: 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-status-active-bg text-status-active',
  Trial: 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-status-trial-bg text-status-trial',
  Suspended: 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-status-suspended-bg text-status-suspended',
  Churned: 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-status-churned-bg text-status-churned',
};

const statusDotClasses = {
  Active: 'bg-status-active',
  Trial: 'bg-status-trial',
  Suspended: 'bg-status-suspended',
  Churned: 'bg-status-churned',
};

export default function Clients() {
  const [activeTab, setActiveTab] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [topupOpen, setTopupOpen] = useState(false);
  const [topupSuccess, setTopupSuccess] = useState(false);
  const [topupAmount, setTopupAmount] = useState('500');
  const [topupMethod, setTopupMethod] = useState('upi');
  const [topupNote, setTopupNote] = useState('');
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [addClientModalOpen, setAddClientModalOpen] = useState(false);

  const notify = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const openDrawer = (client) => {
    setSelectedClient(client);
    setDrawerOpen(true);
  };

  const openTopup = () => {
    setTopupOpen(true);
    setTopupSuccess(false);
    setTopupAmount('500');
    setTopupMethod('upi');
    setTopupNote('');
  };

  const closeTopup = () => {
    setTopupOpen(false);
    setTimeout(() => setTopupSuccess(false), 300);
  };

  const submitTopup = () => {
    setTopupSuccess(true);
  };

  const filteredClients = activeTab === 'All'
    ? clients
    : clients.filter((c) => c.status === activeTab);

  const statIconMap = {
    trending: <TrendingUp size={20} />,
    wallet: <Wallet size={20} />,
    chat: <MessageSquare size={20} />,
    userOff: <UserX size={20} />,
  };

  return (
    <div className="p-4 md:p-8 max-w-[1440px] mx-auto w-full">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-on-surface text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
          {toastMsg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Clients</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage and monitor all shop registrations across the platform.</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => notify('Filters opened')}
            className="flex items-center gap-2 px-3 md:px-4 py-2 border border-outline-variant rounded-lg text-body-strong font-body-strong hover:bg-white transition-colors bg-white shadow-sm text-sm"
          >
            <Filter size={18} />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button
            onClick={() => setAddClientModalOpen(true)}
            className="flex items-center gap-2 px-4 md:px-5 py-2 bg-primary text-white rounded-lg text-body-strong font-body-strong hover:bg-primary/90 transition-all shadow-md text-sm"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New Client</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        {/* Status Tabs */}
        <div className="flex border-b border-outline-variant px-4 md:px-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-3 md:px-4 py-3 md:py-4 text-body-strong border-b-2 transition-colors whitespace-nowrap text-sm ${
                activeTab === tab.label
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}{' '}
              <span className={`ml-1 text-[10px] md:text-[11px] px-1.5 py-0.5 rounded-full font-medium tnum ${activeTab === tab.label ? 'bg-primary/10' : 'bg-surface-container-low'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/40">
                <th className="pl-4 md:pl-8 pr-3 md:pr-4 py-3 md:py-4 font-label-md text-label-md text-outline uppercase tracking-wider text-[10px] md:text-xs">Shop &amp; Owner</th>
                <th className="px-3 md:px-4 py-3 md:py-4 font-label-md text-label-md text-outline uppercase tracking-wider text-[10px] md:text-xs">Plan</th>
                <th className="px-3 md:px-4 py-3 md:py-4 font-label-md text-label-md text-outline uppercase tracking-wider text-[10px] md:text-xs">Status</th>
                <th className="px-3 md:px-4 py-3 md:py-4 font-label-md text-label-md text-outline uppercase tracking-wider text-[10px] md:text-xs text-right">Balance</th>
                <th className="px-3 md:px-4 py-3 md:py-4 font-label-md text-label-md text-outline uppercase tracking-wider text-[10px] md:text-xs text-right hidden md:table-cell">Registered</th>
                <th className="pl-3 md:pl-4 pr-4 md:pr-8 py-3 md:py-4 font-label-md text-label-md text-outline uppercase tracking-wider text-[10px] md:text-xs text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className={`cursor-pointer transition-colors group ${client.suspended || client.churned ? 'opacity-80' : ''}`}
                  onClick={() => openDrawer(client)}
                >
                  <td className="pl-4 md:pl-8 pr-3 md:pr-4 py-4 md:py-5">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`w-9 h-9 md:w-11 md:h-11 rounded-lg border flex items-center justify-center font-bold text-xs ${client.color}`}>
                        {client.initials}
                      </div>
                      <div>
                        <p className="font-body-strong text-body-strong text-on-surface text-sm md:text-base">{client.shop}</p>
                        <p className="font-caption text-caption text-on-surface-variant hidden md:block">{client.owner}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-4 py-4 md:py-5">
                    <span className={planBadgeClasses[client.plan] || planBadgeClasses.Starter}>{client.plan}</span>
                  </td>
                  <td className="px-3 md:px-4 py-4 md:py-5">
                    <span className={statusBadgeClasses[client.status]}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDotClasses[client.status]}`}></span>{' '}
                      <span className="hidden sm:inline">{client.status}</span>
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-4 md:py-5 text-right">
                    {client.lowBalance ? (
                      <div className="flex flex-col items-end">
                        <span className="tnum font-body-strong text-error text-sm">₹{client.balance.toFixed(2)}</span>
                        <span className="text-[10px] text-error font-medium">Low</span>
                      </div>
                    ) : (
                      <span className="tnum font-body-strong text-on-surface text-sm">
                        ₹{client.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </td>
                  <td className="px-3 md:px-4 py-4 md:py-5 text-right tnum font-body-md text-on-surface-variant hidden md:table-cell">{client.registered}</td>
                  <td className="pl-3 md:pl-4 pr-4 md:pr-8 py-4 md:py-5 text-right">
                    <button className="p-2 hover:bg-surface-container-high rounded transition-colors text-outline" onClick={(e) => e.stopPropagation()}>
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row justify-between items-center gap-3 bg-white border-t border-outline-variant/40">
          <p className="text-body-md text-on-surface-variant text-sm">
            Showing <span className="font-semibold text-on-surface">1-25</span> of <span className="font-semibold text-on-surface">1,284</span>
          </p>
          <div className="flex items-center gap-2">
            <button className="p-1.5 border border-outline-variant rounded-md hover:bg-surface-container-low disabled:opacity-30 transition-colors" disabled>
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-md bg-primary text-white font-bold text-caption shadow-sm">1</button>
              <button className="w-8 h-8 rounded-md hover:bg-surface-container-low text-on-surface-variant font-medium text-caption">2</button>
              <button className="w-8 h-8 rounded-md hover:bg-surface-container-low text-on-surface-variant font-medium text-caption">3</button>
            </div>
            <button className="p-1.5 border border-outline-variant rounded-md hover:bg-surface-container-low transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-6 md:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {clientStats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 md:p-5 rounded-xl border border-outline-variant shadow-sm">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {statIconMap[stat.icon]}
              </div>
              <span className="text-label-md font-semibold text-on-surface-variant text-xs md:text-sm">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-stat-value text-stat-value text-on-surface text-lg md:text-2xl">{stat.value}</h3>
              {stat.change && (
                <span className="text-status-active text-[11px] font-bold">{stat.change}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Client Drawer */}
      <div className={`fixed inset-0 z-[60] ${drawerOpen ? '' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setDrawerOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 md:p-6 border-b border-outline-variant flex justify-between items-center bg-white sticky top-0 z-10">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Client Details</h3>
            <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors" onClick={() => setDrawerOpen(false)}>
              <X size={20} />
            </button>
          </div>
          {selectedClient && (
            <>
              <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="flex flex-col items-center text-center mb-6 md:mb-8">
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center text-[24px] md:text-[32px] font-black shadow-lg mb-4 ${selectedClient.color}`}>
                    {selectedClient.initials}
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface">{selectedClient.shop}</h4>
                  <p className="text-body-md text-on-surface-variant mt-1">{selectedClient.phone}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-status-active-bg text-status-active text-[11px] font-bold border border-status-active/20">
                      {selectedClient.status.toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-plan-pro/40 text-on-surface-variant border border-outline-variant uppercase">
                      {selectedClient.plan} Plan
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
                  <div className="p-3 md:p-4 bg-surface-container-low rounded-xl border border-outline-variant/40">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Top-up Balance</p>
                    <p className="text-headline-sm text-on-surface tnum">₹{selectedClient.balance.toFixed(2)}</p>
                  </div>
                  <div className="p-3 md:p-4 bg-surface-container-low rounded-xl border border-outline-variant/40">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Total Messages</p>
                    <p className="text-headline-sm text-on-surface tnum">{selectedClient.messages.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <section>
                    <h5 className="text-[12px] font-bold text-outline uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                      <span className="w-1 h-4 bg-primary rounded-full"></span>
                      Business Info
                    </h5>
                    <div className="space-y-3 md:space-y-4 px-1">
                      <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
                        <span className="text-body-md text-on-surface-variant text-sm">Owner</span>
                        <span className="text-body-md font-semibold text-on-surface text-sm">{selectedClient.owner}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
                        <span className="text-body-md text-on-surface-variant text-sm">Mobile</span>
                        <span className="text-body-md font-semibold text-on-surface tnum text-sm">{selectedClient.phone}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
                        <span className="text-body-md text-on-surface-variant text-sm">Registered</span>
                        <span className="text-body-md font-semibold text-on-surface text-sm">{selectedClient.registered}</span>
                      </div>
                    </div>
                  </section>
                  <section>
                    <h5 className="text-[12px] font-bold text-outline uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                      <span className="w-1 h-4 bg-primary rounded-full"></span>
                      Quick Actions
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      <button onClick={openTopup} className="w-full text-left p-3 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors flex items-center gap-3">
                        <Wallet size={18} className="text-outline" />
                        <span className="text-body-md font-medium text-sm">Add Top-up Balance</span>
                      </button>
                      <button onClick={() => setUpdateModalOpen(true)} className="w-full text-left p-3 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors flex items-center gap-3">
                        <Edit size={18} className="text-outline" />
                        <span className="text-body-md font-medium text-sm">Update Business Details</span>
                      </button>
                      <button onClick={() => setSuspendModalOpen(true)} className="w-full text-left p-3 rounded-lg border border-outline-variant hover:bg-error/5 text-error transition-colors flex items-center gap-3">
                        <Ban size={18} />
                        <span className="text-body-md font-medium text-sm">Suspend Account</span>
                      </button>
                    </div>
                  </section>
                </div>
              </div>
              <div className="p-4 md:p-6 border-t border-outline-variant bg-white flex gap-3 sticky bottom-0">
                <button onClick={() => notify('Edit client opened')} className="flex-1 px-4 py-2 border border-outline-variant rounded-lg text-body-strong font-body-strong hover:bg-surface-container-low transition-colors text-sm">
                  Edit
                </button>
                <button onClick={() => notify('Analytics opened')} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-body-strong font-body-strong hover:bg-primary/90 transition-all shadow-sm text-sm">
                  View Analytics
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Top-up Dialog */}
      {topupOpen && selectedClient && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300"
          onClick={(e) => { if (e.target === e.currentTarget) closeTopup(); }}
        >
          <div className="bg-surface-container-lowest w-full max-w-[480px] rounded-2xl shadow-2xl overflow-hidden border border-outline-variant animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            {/* Dialog Header */}
            <div className="px-4 md:px-6 py-4 md:py-5 border-b border-outline-variant bg-surface flex items-center justify-between sticky top-0">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Add Top-up</h3>
                <p className="text-caption font-caption text-on-surface-variant">Inject funds directly into a client&apos;s wallet.</p>
              </div>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors" onClick={closeTopup}>
                <X size={20} />
              </button>
            </div>

            {!topupSuccess ? (
              <>
                {/* Dialog Body */}
                <form className="p-4 md:p-6 space-y-4 md:space-y-5" onSubmit={(e) => { e.preventDefault(); submitTopup(); }}>
                  {/* Client Search/Selector */}
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-xs">Select Client</label>
                    <div className="relative">
                      <div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border border-primary ring-1 ring-primary">
                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-primary font-bold text-sm ${selectedClient.color}`}>{selectedClient.initials}</div>
                        <div className="flex-1">
                          <p className="font-body-strong text-body-strong text-sm">{selectedClient.shop}</p>
                          <p className="text-caption text-on-surface-variant">Current Balance: <span className="font-semibold text-on-surface">₹{selectedClient.balance.toFixed(2)}</span></p>
                        </div>
                        <CheckCircle size={18} className="text-primary md:w-5 md:h-5" />
                      </div>
                    </div>
                  </div>
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-xs" htmlFor="topup-amount">Top-up Amount</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body-strong text-on-surface-variant">₹</span>
                      <input
                        className="w-full pl-8 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-stat-value text-on-surface text-sm md:text-base"
                        id="topup-amount"
                        placeholder="0.00"
                        type="number"
                        value={topupAmount}
                        onChange={(e) => setTopupAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Payment Method */}
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-xs" htmlFor="topup-method">Payment Method</label>
                    <select
                      className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-body-md appearance-none text-sm md:text-base"
                      id="topup-method"
                      value={topupMethod}
                      onChange={(e) => setTopupMethod(e.target.value)}
                    >
                      <option value="cash">Cash Payment</option>
                      <option value="upi">UPI / QR Scan</option>
                      <option value="bank">Bank Transfer</option>
                      <option value="check">Cheque</option>
                    </select>
                  </div>
                  {/* Internal Note */}
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-xs" htmlFor="topup-note">Internal Note (Optional)</label>
                    <textarea
                      className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-body-md text-sm md:text-base"
                      id="topup-note"
                      placeholder="Reason for top-up..."
                      rows={2}
                      value={topupNote}
                      onChange={(e) => setTopupNote(e.target.value)}
                    />
                  </div>
                </form>
                {/* Dialog Footer */}
                <div className="px-4 md:px-6 py-4 md:py-5 bg-surface border-t border-outline-variant flex gap-3">
                  <button
                    className="flex-1 px-4 py-2.5 rounded-lg border border-outline-variant font-body-strong text-on-surface hover:bg-surface-container-high transition-colors text-sm"
                    onClick={closeTopup}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-[1.5] px-4 py-2.5 rounded-lg bg-primary text-white font-body-strong shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 text-sm"
                    onClick={submitTopup}
                  >
                    Confirm Top-up
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Success Message */}
                <div className="p-6 md:p-8 text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-status-active-bg text-status-active rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="fill-status-active text-white md:w-10 md:h-10" />
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Top-up Successful</h4>
                  <div className="bg-surface-container p-4 rounded-xl text-on-surface-variant font-body-md border border-outline-variant/50 text-sm">
                    ₹{topupAmount || '500'} will be added to <span className="font-bold text-on-surface">{selectedClient.shop}</span>. <br />
                    New balance: <span className="text-status-active font-bold">₹{(selectedClient.balance + parseInt(topupAmount || 0)).toFixed(2)}</span>
                  </div>
                </div>
                {/* Success Footer */}
                <div className="px-4 md:px-6 py-4 md:py-5 bg-surface border-t border-outline-variant">
                  <button
                    className="w-full px-4 py-2.5 rounded-lg bg-primary text-white font-body-strong shadow-lg shadow-primary/20 hover:bg-primary-container transition-all text-sm"
                    onClick={closeTopup}
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <UpdateBusinessModal
        key={selectedClient?.id || selectedClient?.shop || 'empty'}
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        client={selectedClient}
      />
      <SuspendAccountModal
        isOpen={suspendModalOpen}
        onClose={() => setSuspendModalOpen(false)}
        clientName={selectedClient?.shop || ''}
      />
      <AddClientModal
        isOpen={addClientModalOpen}
        onClose={() => setAddClientModalOpen(false)}
      />
    </div>
  );
}

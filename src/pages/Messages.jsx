import { useState } from 'react';
import {
  TrendingUp,
  Download,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Calendar,
  BarChart3,
  X,
  ArrowUpRight,
  PhoneIncoming,
  Filter,
} from 'lucide-react';
import { messageStats, messageClients } from '../data/mockData';

export default function Messages() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [chartPeriod, setChartPeriod] = useState('Weekly');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const notify = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const statIconMap = {
    chat: <MessageCircle size={20} className="text-primary" />,
    calendar: <Calendar size={20} className="text-secondary" />,
    analytics: <BarChart3 size={20} className="text-tertiary" />,
  };

  const statusBadgeClasses = {
    Active: 'inline-flex items-center gap-2 bg-status-active-bg px-2.5 py-1 rounded-full border border-status-active/20',
    'Low Credit': 'inline-flex items-center gap-2 bg-status-suspended-bg px-2.5 py-1 rounded-full border border-status-suspended/20',
    Inactive: 'inline-flex items-center gap-2 bg-status-churned-bg px-2.5 py-1 rounded-full border border-status-churned/20',
  };

  const statusDotClasses = {
    Active: 'bg-status-active',
    'Low Credit': 'bg-status-suspended',
    Inactive: 'bg-status-churned',
  };

  const statusTextClasses = {
    Active: 'text-status-active',
    'Low Credit': 'text-status-suspended',
    Inactive: 'text-status-churned',
  };

  const planBadgeClasses = {
    Enterprise: 'bg-plan-enterprise text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase',
    Growth: 'bg-plan-growth/50 text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase border border-outline-variant/20',
    Pro: 'bg-plan-pro/50 text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase border border-outline-variant/20',
    Starter: 'bg-plan-starter/50 text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase border border-outline-variant/20',
  };

  return (
    <div className="px-4 md:px-page-padding-x flex-1 max-w-[1440px] mx-auto w-full py-6 md:py-8 space-y-6 md:space-y-gap-lg">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-on-surface text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
          {toastMsg}
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Messages</h2>
          <p className="text-on-surface-variant mt-1 text-sm md:text-base">Monitor message activity across all Wance clients.</p>
        </div>
        <div className="flex items-center bg-surface-container-low rounded-lg p-1 gap-1 border border-outline-variant/30 w-fit">
          {['Last 30 Days', 'Last 90 Days', 'Custom Range'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-2 md:px-3 py-1.5 rounded-md text-label-md font-label-md transition-colors text-sm ${
                timeRange === r
                  ? 'bg-white shadow-sm text-on-surface'
                  : 'hover:bg-white/50 text-on-surface-variant'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-gap-md">
        {messageStats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 md:p-6 rounded-xl border border-outline-variant/50 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-on-surface-variant text-label-md font-label-md uppercase tracking-wider text-xs">{stat.label}</p>
              <h3 className="font-stat-value text-stat-value mt-2 tnum text-lg md:text-2xl">{stat.value}</h3>
              <p className="text-status-active text-caption font-label-md mt-2 flex items-center gap-1">
                <TrendingUp size={14} />
                {stat.change}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/30">
              {statIconMap[stat.icon]}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Messages Over Time Chart */}
      <div className="bg-white rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-headline-sm text-headline-sm">Messages Over Time</h4>
            <p className="text-caption text-on-surface-variant">Aggregate message volume across the network</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-caption font-label-md">Inbound</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-fixed-dim"></span>
                <span className="text-caption font-label-md">Outbound</span>
              </div>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant/30">
              {['Daily', 'Weekly', 'Monthly'].map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={`px-2 md:px-3 py-1 text-label-md font-label-md rounded transition-all text-xs md:text-sm ${
                    chartPeriod === p ? 'bg-white shadow-sm' : 'hover:bg-white/50 text-on-surface-variant'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-4 md:px-6 pb-6 md:pb-8 h-[220px] md:h-[280px] relative flex items-end">
          <div className="absolute inset-x-4 md:inset-x-6 top-4 bottom-6 md:bottom-8 border-b border-outline-variant/20">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0051df" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0051df" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,150 Q150,120 300,180 T600,80 T900,140 T1200,60 V220 H0 Z" fill="url(#chartGradient)" />
              <path d="M0,150 Q150,120 300,180 T600,80 T900,140 T1200,60" fill="none" stroke="#0051df" strokeLinecap="round" strokeWidth="2" />
            </svg>
            <div className="absolute -bottom-8 inset-x-0 flex justify-between text-caption text-on-surface-variant font-label-md opacity-70 text-[10px] md:text-xs">
              <span>Week 1</span><span className="hidden sm:inline">Week 2</span><span>Week 3</span><span className="hidden sm:inline">Week 4</span><span>Week 5</span><span className="hidden sm:inline">Week 6</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Client Breakdown Table */}
      <div className="bg-white rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden">
        <div className="px-4 md:px-6 py-4 md:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <h4 className="font-headline-sm text-headline-sm">Client Breakdown</h4>
            <span className="bg-surface-container-low text-on-surface-variant text-caption px-2.5 py-0.5 rounded-full font-label-md border border-outline-variant/30">482 Clients</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-surface-container-low border border-outline-variant/30 rounded-lg pl-8 pr-6 py-2 text-body-md focus:ring-1 focus:ring-primary outline-none cursor-pointer text-sm"
              >
                <option>All Statuses</option>
                <option>Active Only</option>
                <option>Suspended</option>
              </select>
            </div>
            <button
              onClick={() => notify('Export downloaded')}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-label-md font-label-md"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="h-10 md:h-12 bg-surface-container-low/30 border-b border-outline-variant/20">
                <th className="px-4 md:px-6 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-xs">Shop Name</th>
                <th className="px-3 md:px-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-xs text-center">Plan</th>
                <th className="px-3 md:px-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-xs text-right">Messages</th>
                <th className="px-3 md:px-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-xs text-right hidden sm:table-cell">All-Time</th>
                <th className="px-3 md:px-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-xs text-right hidden md:table-cell">Ad-hoc Spent</th>
                <th className="px-3 md:px-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-xs hidden md:table-cell">Last Sync</th>
                <th className="px-4 md:px-6 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-[10px] md:text-xs text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {messageClients.map((client) => (
                <tr key={client.id} className="h-[60px] md:h-[72px] hover:bg-surface-container-low/20 transition-colors cursor-pointer" onClick={() => setDrawerOpen(true)}>
                  <td className="px-4 md:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary font-bold text-[10px] md:text-xs border border-outline-variant/20">{client.initials}</div>
                      <div>
                        <p className="font-body-strong text-body-strong text-sm">{client.shop}</p>
                        <p className="text-caption text-on-surface-variant">{client.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-4 text-center">
                    <span className={planBadgeClasses[client.plan]}>{client.plan}</span>
                  </td>
                  <td className="px-3 md:px-4 text-right tnum font-body-strong text-sm">{client.msgPeriod}</td>
                  <td className="px-3 md:px-4 text-right tnum font-body-md text-on-surface-variant hidden sm:table-cell">{client.msgAllTime}</td>
                  <td className="px-3 md:px-4 text-right tnum font-body-md hidden md:table-cell">{client.topUpSpent}</td>
                  <td className="px-3 md:px-4 text-body-md hidden md:table-cell">{client.lastActivity}</td>
                  <td className="px-4 md:px-6 text-right">
                    <div className={statusBadgeClasses[client.status]}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDotClasses[client.status]}`}></span>
                      <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-tight ${statusTextClasses[client.status]}`}>{client.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 md:p-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-container-low/10">
          <p className="text-caption text-on-surface-variant font-label-md">Showing 1 to 5 of 482 clients</p>
          <div className="flex items-center gap-1.5">
            <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-on-surface-variant disabled:opacity-30" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg bg-primary text-white text-label-md font-label-md shadow-sm shadow-primary/20 text-xs">1</button>
            <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-label-md font-label-md transition-colors text-xs">2</button>
            <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-label-md font-label-md transition-colors text-xs">3</button>
            <span className="px-1 text-on-surface-variant opacity-50">...</span>
            <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-label-md font-label-md transition-colors text-xs">97</button>
            <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={() => setDrawerOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full sm:w-[500px] bg-white shadow-2xl pointer-events-auto transform transition-transform duration-300 border-l border-outline-variant/30 flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 md:p-6 border-b border-outline-variant/20 flex items-center justify-between">
            <div>
              <h5 className="font-headline-md text-headline-md">LuxeModa Store</h5>
              <p className="text-body-md text-on-surface-variant">Client Statistics &amp; Feed</p>
            </div>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors" onClick={() => setDrawerOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-surface-container-low/40 p-4 md:p-5 rounded-xl border border-outline-variant/20">
                <p className="text-caption font-label-md text-on-surface-variant uppercase tracking-wider">Current Month</p>
                <p className="font-stat-value text-[20px] md:text-[24px] mt-1">24,512</p>
              </div>
              <div className="bg-surface-container-low/40 p-4 md:p-5 rounded-xl border border-outline-variant/20">
                <p className="text-caption font-label-md text-on-surface-variant uppercase tracking-wider">Success Rate</p>
                <p className="font-stat-value text-[20px] md:text-[24px] mt-1 text-status-active">99.8%</p>
              </div>
            </div>
            <section>
              <h6 className="font-body-strong text-body-strong mb-4 md:mb-5 text-xs uppercase tracking-[0.1em] text-on-surface-variant">Recent Activity Stream</h6>
              <div className="space-y-4 md:space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant/30">
                <div className="flex gap-4 items-start relative bg-white">
                  <div className="w-8 h-8 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center shrink-0 z-10">
                    <ArrowUpRight size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-body-md font-body-strong text-sm">Shipping update sent</p>
                    <p className="text-caption text-on-surface-variant">To +1 (555) 012-3456 • Automated</p>
                  </div>
                  <span className="text-status-active font-label-md text-[10px] uppercase">Delivered</span>
                </div>
                <div className="flex gap-4 items-start relative bg-white">
                  <div className="w-8 h-8 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center shrink-0 z-10">
                    <PhoneIncoming size={16} className="text-tertiary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-body-md font-body-strong text-sm">Inbound query received</p>
                    <p className="text-caption text-on-surface-variant">Order #882 help request • Manual</p>
                  </div>
                  <span className="text-primary font-label-md text-[10px] uppercase">Awaiting</span>
                </div>
              </div>
            </section>
            <section className="p-4 md:p-6 bg-sidebar-bg rounded-xl text-white">
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <h6 className="font-headline-sm text-headline-sm">Plan Details</h6>
                <span className="bg-white/10 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border border-white/10 tracking-wider">Priority Support</span>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between text-body-md opacity-70 text-sm">
                  <span>Renewal Date</span>
                  <span className="font-body-strong text-white opacity-100">Oct 24, 2024</span>
                </div>
                <div className="flex justify-between text-body-md opacity-70 text-sm">
                  <span>Base Allowance</span>
                  <span className="font-body-strong text-white opacity-100">50,000 / mo</span>
                </div>
                <div className="flex justify-between text-body-md opacity-70 text-sm">
                  <span>Excess Rate</span>
                  <span className="font-body-strong text-white opacity-100">$0.005 / msg</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

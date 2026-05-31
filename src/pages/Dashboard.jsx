import { useState } from 'react';
import { CalendarDays, TrendingUp, MoreVertical } from 'lucide-react';
import PlanBadge from '../components/PlanBadge';
import { dashboardStats, recentClients, topClients, planDistribution } from '../data/mockData';

export default function Dashboard() {
  const [chartTab, setChartTab] = useState('Messages');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const notify = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="px-4 md:px-page-padding-x py-6 md:py-gap-lg max-w-container-max mx-auto w-full">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-on-surface text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 mb-6 md:mb-10">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Platform Overview</h2>
          <p className="text-on-surface-variant font-body-md mt-1.5 opacity-80">Real-time usage metrics and client growth insights.</p>
        </div>
        <button
          onClick={() => notify('Date picker opened')}
          className="flex items-center gap-2 md:gap-3 bg-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl border border-outline-variant shadow-sm hover:border-outline transition-colors cursor-pointer w-fit"
        >
          <CalendarDays size={18} className="text-on-surface-variant" />
          <span className="text-label-md text-on-surface font-semibold">Last 30 days</span>
          <span className="text-on-surface-variant text-sm">▼</span>
        </button>
      </div>

      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-gap-sm mb-6 md:mb-gap-lg">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 md:p-7 rounded-xl md:rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300">
            <p className="text-on-surface-variant font-label-md uppercase tracking-wider opacity-70 mb-2 md:mb-3 text-[10px] md:text-xs">{stat.label}</p>
            <div className="flex flex-col">
              <span className="font-stat-value text-stat-value text-on-surface text-lg md:text-2xl lg:text-[28px]">{stat.value}</span>
              {stat.change && (
                <span className={`text-[11px] md:text-[13px] font-bold mt-1 flex items-center gap-1 ${stat.changeType === 'positive' ? 'text-status-active' : 'text-on-surface-variant opacity-60'}`}>
                  {stat.changeType === 'positive' && <TrendingUp size={14} />}
                  {stat.change}
                </span>
              )}
              {!stat.change && stat.changeType === 'neutral' && (
                <span className="text-on-surface-variant text-[11px] md:text-[13px] font-medium mt-1 opacity-60">{stat.change || 'Stable performance'}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-gap-md mb-6 md:mb-gap-lg">
        {/* Usage Activity Bar Chart */}
        <div className="lg:col-span-2 bg-white p-4 md:p-8 rounded-xl md:rounded-2xl border border-outline-variant shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-10 gap-3">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Usage Activity</h3>
              <p className="text-caption text-on-surface-variant mt-1 opacity-70">Daily message traffic overview</p>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-xl w-fit">
              {['Messages', 'Top-ups'].map((t) => (
                <button
                  key={t}
                  onClick={() => setChartTab(t)}
                  className={`px-3 md:px-4 py-1.5 rounded-lg font-body-strong shadow-sm text-[12px] md:text-[13px] transition-colors ${
                    chartTab === t ? 'bg-white text-primary' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[200px] md:h-[300px] w-full relative flex items-end justify-between px-2">
            {[60, 45, 75, 65, 90, 80, 95, 55].map((h, i) => (
              <div
                key={i}
                className={`w-6 md:w-10 transition-all rounded-t-lg group relative ${i === 6 ? 'bg-primary' : 'bg-primary/10 hover:bg-primary'}`}
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {(h * 20000).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 md:mt-6 px-2 text-on-surface-variant/60 font-label-md text-[11px] md:text-xs">
            <span>Sep 01</span>
            <span className="hidden sm:inline">Sep 07</span>
            <span>Sep 14</span>
            <span className="hidden sm:inline">Sep 21</span>
            <span>Today</span>
          </div>
        </div>

        {/* Plan Distribution Donut */}
        <div className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl border border-outline-variant shadow-sm flex flex-col">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Plan Distribution</h3>
          <p className="text-caption text-on-surface-variant mb-4 md:mb-8 opacity-70">Client tier breakdown</p>
          <div className="flex-1 flex flex-col justify-center items-center relative min-h-[180px] md:min-h-0">
            <svg className="w-36 h-36 md:w-52 md:h-52 -rotate-90">
              <circle cx="50%" cy="50%" fill="transparent" r="40%" stroke="currentColor" strokeWidth="16" className="text-surface-container" />
              <circle cx="50%" cy="50%" fill="transparent" r="40%" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="61" strokeLinecap="round" strokeWidth="18" className="text-primary" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline-lg text-headline-lg text-on-surface leading-none text-xl md:text-2xl">1,284</span>
              <span className="text-caption text-on-surface-variant mt-1 font-medium">Total Seats</span>
            </div>
          </div>
          <div className="mt-4 md:mt-10 space-y-2 md:space-y-4">
            {planDistribution.map((plan) => (
              <div key={plan.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${plan.color}`} />
                  <span className="text-body-md text-on-surface font-medium text-sm md:text-base">{plan.label}</span>
                </div>
                <span className="text-body-strong text-sm md:text-base">{plan.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Table and List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-gap-md">
        {/* Recent Registrations Table */}
        <div className="lg:col-span-2 bg-white rounded-xl md:rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Clients</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/30 text-on-surface-variant/70 font-label-md uppercase tracking-wider text-[11px] h-[40px] md:h-[50px]">
                <tr>
                  <th className="px-4 md:px-8 font-semibold">Client</th>
                  <th className="px-3 md:px-6 font-semibold">Plan</th>
                  <th className="px-3 md:px-6 font-semibold text-center">Status</th>
                  <th className="px-3 md:px-6 font-semibold hidden sm:table-cell">Joined</th>
                  <th className="px-4 md:px-8 font-semibold text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {recentClients.slice(0, 3).map((client) => (
                  <tr key={client.id} className="h-[48px] md:h-table-row-height hover:bg-surface-container-low/20 transition-colors">
                    <td className="px-4 md:px-8 py-3 md:py-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center font-bold text-[10px] md:text-xs ${client.color}`}>
                          {client.initials}
                        </div>
                        <div>
                          <p className="text-on-surface font-body-strong leading-none mb-1 text-sm md:text-base">{client.name}</p>
                          <p className="text-caption text-on-surface-variant opacity-60 hidden sm:block">{client.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-6">
                      <PlanBadge plan={client.plan} />
                    </td>
                    <td className="px-3 md:px-6">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${client.status === 'Active' ? 'bg-status-active' : client.status === 'Trial' ? 'bg-status-trial' : 'bg-status-suspended'}`} />
                        <span className="text-[12px] md:text-[13px] font-medium text-on-surface">{client.status}</span>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 text-on-surface-variant/80 text-[12px] md:text-[13px] hidden sm:table-cell">{client.joined}</td>
                    <td className="px-4 md:px-8 text-right">
                      <button
                        onClick={() => notify(`Options for ${client.name}`)}
                        className="text-on-surface-variant/40 hover:text-on-surface transition-colors"
                      >
                        <MoreVertical size={16} className="md:w-[18px] md:h-[18px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 md:px-8 py-3 md:py-4 border-t border-outline-variant/30 bg-surface-container-low/10">
            <p className="text-caption text-on-surface-variant/60 text-center">Showing 3 of 1,284 total clients</p>
          </div>
        </div>

        {/* Top Clients Ranked List */}
        <div className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl border border-outline-variant shadow-sm flex flex-col">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Usage Leaders</h3>
          <p className="text-caption text-on-surface-variant mb-6 md:mb-10 opacity-70">Top clients by message volume</p>
          <div className="flex-1 space-y-6 md:space-y-10">
            {topClients.slice(0, 4).map((client) => (
              <div key={client.name} className="group">
                <div className="flex justify-between items-center mb-2 md:mb-3">
                  <span className="text-body-strong text-on-surface group-hover:text-primary transition-colors text-sm md:text-base">{client.name}</span>
                  <span className="text-[12px] md:text-[13px] font-bold text-primary">{client.msgs} msgs</span>
                </div>
                <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${client.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Spacer */}
      <div className="h-10 md:h-20" />
    </div>
  );
}

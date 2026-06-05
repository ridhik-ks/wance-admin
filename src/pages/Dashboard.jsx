import { useState, useEffect } from 'react';
import { CalendarDays, TrendingUp, MoreVertical } from 'lucide-react';
import PlanBadge from '../components/PlanBadge';
import { dashboardStats, recentClients, topClients, planDistribution } from '../data/mockData';

const DONUT_R = 35;
const DONUT_C = 2 * Math.PI * DONUT_R; // ≈ 219.91

const DONUT_COLORS = ['#6366F1', '#0051DF', '#0EA5E9', '#0F1C3A'];

const BAR_DATASETS = {
  Messages: [
    { h: 60, value: '1.20M msgs' },
    { h: 45, value: '0.90M msgs' },
    { h: 75, value: '1.50M msgs' },
    { h: 65, value: '1.30M msgs' },
    { h: 90, value: '1.80M msgs' },
    { h: 80, value: '1.60M msgs' },
    { h: 95, value: '1.90M msgs', active: true },
    { h: 55, value: '1.10M msgs' },
  ],
  'Top-ups': [
    { h: 40, value: '₹8,000' },
    { h: 65, value: '₹13,000' },
    { h: 50, value: '₹10,000' },
    { h: 80, value: '₹16,000' },
    { h: 45, value: '₹9,000' },
    { h: 70, value: '₹14,000' },
    { h: 85, value: '₹17,000', active: true },
    { h: 60, value: '₹12,000' },
  ],
};

export default function Dashboard() {
  const [chartTab, setChartTab] = useState('Messages');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [animated, setAnimated] = useState(false);

  // Initial mount animation
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Re-animate bars when tab switches
  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 40);
    return () => clearTimeout(t);
  }, [chartTab]);

  const notify = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const bars = BAR_DATASETS[chartTab];
  const total = planDistribution.reduce((s, p) => s + p.value, 0);

  // Compute donut segments with cumulative offsets
  let cumArc = 0;
  const donutSegments = planDistribution.map((plan, i) => {
    const arc = (plan.value / total) * DONUT_C;
    const seg = { ...plan, arc, offset: cumArc, color: DONUT_COLORS[i] };
    cumArc += arc;
    return seg;
  });

  return (
    <div className="px-4 md:px-page-padding-x py-6 md:py-gap-lg max-w-container-max mx-auto w-full">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-on-surface text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-fade-in-up">
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
        {dashboardStats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white p-4 md:p-7 rounded-xl md:rounded-2xl border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            style={{
              opacity: animated ? 1 : 0,
              transform: animated ? 'translateY(0)' : 'translateY(14px)',
              transition: `opacity 0.45s ease-out ${i * 0.06}s, transform 0.45s ease-out ${i * 0.06}s, box-shadow 0.2s, translateY 0.2s`,
            }}
          >
            <p className="text-on-surface-variant font-label-md uppercase tracking-wider opacity-70 mb-2 md:mb-3 text-[10px] md:text-xs">{stat.label}</p>
            <div className="flex flex-col">
              <span className="font-stat-value text-on-surface text-lg md:text-2xl lg:text-[28px] leading-tight">{stat.value}</span>
              {stat.change && stat.changeType === 'positive' && (
                <span className="text-[11px] md:text-[13px] font-bold mt-1 flex items-center gap-1 text-status-active">
                  <TrendingUp size={13} />
                  {stat.change}
                </span>
              )}
              {stat.changeType === 'neutral' && (
                <span className="text-on-surface-variant text-[11px] md:text-[13px] font-medium mt-1 opacity-60">{stat.change || 'Stable'}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-gap-md mb-6 md:mb-gap-lg">

        {/* Usage Activity Bar Chart */}
        <div className="lg:col-span-2 bg-white p-4 md:p-8 rounded-xl md:rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 md:mb-8 gap-3">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Usage Activity</h3>
              <p className="text-caption text-on-surface-variant mt-1 opacity-70">Daily message traffic overview</p>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-xl w-fit border border-outline-variant/30">
              {['Messages', 'Top-ups'].map((t) => (
                <button
                  key={t}
                  onClick={() => setChartTab(t)}
                  className={`px-3 md:px-4 py-1.5 rounded-lg font-body-strong text-[12px] md:text-[13px] transition-all duration-200 ${
                    chartTab === t ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Chart area */}
          <div className="relative h-[200px] md:h-[280px]">
            {/* Horizontal gridlines */}
            {[25, 50, 75].map((pct) => (
              <div
                key={pct}
                className="absolute inset-x-0 border-t border-dashed border-outline-variant/25 pointer-events-none"
                style={{ bottom: `${pct}%` }}
              />
            ))}

            {/* Bars */}
            <div className="absolute inset-0 flex items-end gap-1.5 md:gap-2.5">
              {bars.map((bar, i) => (
                <div key={i} className="flex-1 h-full flex flex-col items-center justify-end group relative">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <div className="bg-on-surface text-white text-[10px] font-semibold py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap">
                      {bar.value}
                    </div>
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2"
                      style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid #191c1e' }}
                    />
                  </div>

                  {/* Bar body */}
                  <div
                    className={`w-full rounded-t-md md:rounded-t-xl transition-none ${bar.active ? 'animate-pulse-glow' : ''}`}
                    style={{
                      height: animated ? `${bar.h}%` : '0%',
                      transition: animated
                        ? `height 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.07}s`
                        : 'none',
                      background: bar.active
                        ? 'linear-gradient(to top, #0051df, #2f6bff)'
                        : 'rgba(0,81,223,0.09)',
                    }}
                    onMouseEnter={(e) => { if (!bar.active) e.currentTarget.style.background = 'rgba(0,81,223,0.22)'; }}
                    onMouseLeave={(e) => { if (!bar.active) e.currentTarget.style.background = 'rgba(0,81,223,0.09)'; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-4 md:mt-5 text-on-surface-variant/55 font-label-md text-[10px] md:text-xs">
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
          <p className="text-caption text-on-surface-variant mb-4 md:mb-6 opacity-70">Client tier breakdown</p>

          <div className="flex-1 flex flex-col justify-center items-center relative min-h-[180px] md:min-h-0">
            <svg viewBox="0 0 100 100" className="w-36 h-36 md:w-52 md:h-52 -rotate-90">
              {/* Background track */}
              <circle cx="50" cy="50" r={DONUT_R} fill="none" stroke="#f2f3f6" strokeWidth="10" />
              {/* Animated segments */}
              {donutSegments.map((seg, i) => (
                <circle
                  key={seg.label}
                  cx="50" cy="50" r={DONUT_R}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="10"
                  strokeLinecap="butt"
                  strokeDasharray={animated ? `${seg.arc - 1.8} ${DONUT_C}` : `0 ${DONUT_C}`}
                  strokeDashoffset={-seg.offset}
                  style={{
                    transition: animated
                      ? `stroke-dasharray 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15 + 0.25}s`
                      : 'none',
                  }}
                />
              ))}
            </svg>

            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span
                className="font-headline-lg text-on-surface leading-none text-xl md:text-2xl"
                style={{ opacity: animated ? 1 : 0, transition: 'opacity 0.4s ease-out 0.8s' }}
              >
                1,284
              </span>
              <span className="text-caption text-on-surface-variant mt-1 font-medium text-[11px] md:text-xs">Total Seats</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 md:mt-8 space-y-2.5 md:space-y-3.5">
            {donutSegments.map((seg, i) => (
              <div
                key={seg.label}
                className="flex items-center justify-between"
                style={{
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateX(0)' : 'translateX(-8px)',
                  transition: animated
                    ? `opacity 0.4s ease-out ${i * 0.1 + 0.6}s, transform 0.4s ease-out ${i * 0.1 + 0.6}s`
                    : 'none',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-on-surface font-medium text-sm md:text-base">{seg.label}</span>
                </div>
                <span className="font-semibold text-on-surface text-sm md:text-base tnum">{seg.value}</span>
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
                {recentClients.slice(0, 3).map((client, i) => (
                  <tr
                    key={client.id}
                    className="h-[48px] md:h-table-row-height hover:bg-surface-container-low/20 transition-colors"
                    style={{
                      opacity: animated ? 1 : 0,
                      transition: animated ? `opacity 0.4s ease-out ${i * 0.1 + 0.35}s` : 'none',
                    }}
                  >
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

        {/* Usage Leaders */}
        <div className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl border border-outline-variant shadow-sm flex flex-col">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Usage Leaders</h3>
          <p className="text-caption text-on-surface-variant mb-6 md:mb-8 opacity-70">Top clients by message volume</p>
          <div className="flex-1 space-y-5 md:space-y-8">
            {topClients.slice(0, 4).map((client, i) => (
              <div key={client.name} className="group">
                <div className="flex justify-between items-center mb-2 md:mb-2.5">
                  <span className="text-body-strong text-on-surface group-hover:text-primary transition-colors text-sm md:text-base">{client.name}</span>
                  <span className="text-[12px] md:text-[13px] font-bold text-primary tnum">{client.msgs} msgs</span>
                </div>
                <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: animated ? `${client.pct}%` : '0%',
                      transition: animated
                        ? `width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1 + 0.45}s`
                        : 'none',
                      background: 'linear-gradient(to right, #0051df, #2f6bff)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-10 md:h-20" />
    </div>
  );
}

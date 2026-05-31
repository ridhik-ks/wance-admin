const statusMap = {
  Active: { dot: 'bg-status-active', text: 'text-status-active', bg: 'bg-status-active-bg' },
  Trial: { dot: 'bg-status-trial', text: 'text-status-trial', bg: 'bg-status-trial-bg' },
  Suspended: { dot: 'bg-status-suspended', text: 'text-status-suspended', bg: 'bg-status-suspended-bg' },
  Churned: { dot: 'bg-status-churned', text: 'text-status-churned', bg: 'bg-status-churned-bg' },
  'Past Due': { dot: 'bg-status-suspended', text: 'text-status-suspended', bg: 'bg-status-suspended-bg' },
  Cancelled: { dot: 'bg-status-churned', text: 'text-status-churned', bg: 'bg-status-churned-bg' },
  'Low Credit': { dot: 'bg-status-suspended', text: 'text-status-suspended', bg: 'bg-status-suspended-bg' },
  Inactive: { dot: 'bg-status-churned', text: 'text-status-churned', bg: 'bg-status-churned-bg' },
  Deactivated: { dot: 'bg-status-suspended', text: 'text-status-suspended', bg: 'bg-status-suspended-bg' },
  Pending: { dot: 'bg-outline', text: 'text-outline', bg: 'bg-surface-container' },
};

export default function StatusPill({ status }) {
  const style = statusMap[status] || statusMap['Pending'];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold ${style.bg} ${style.text}`}
    >
      <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
      {status}
    </span>
  );
}

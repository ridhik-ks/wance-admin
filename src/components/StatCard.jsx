export default function StatCard({ label, value, change, changeType, icon }) {
  const changeColor =
    changeType === 'positive'
      ? 'text-status-active'
      : changeType === 'negative'
      ? 'text-error'
      : 'text-on-surface-variant';

  return (
    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant hover:shadow-sm transition-shadow flex flex-col justify-between h-32">
      <div className="flex items-center justify-between">
        <span className="text-on-surface-variant font-label-md uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <span className={`${changeColor}`}>
            {/* Icon placeholder - can be passed as a component if needed */}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-stat-value text-stat-value text-on-surface">{value}</span>
        {change && (
          <span className={`font-label-md ${changeColor}`}>{change}</span>
        )}
      </div>
    </div>
  );
}

const planMap = {
  Starter: { bg: 'bg-plan-starter', text: 'text-on-secondary-fixed-variant', border: true },
  Growth: { bg: 'bg-plan-growth', text: 'text-on-tertiary-fixed-variant', border: true },
  Pro: { bg: 'bg-plan-pro', text: 'text-on-secondary-fixed-variant', border: true },
  Enterprise: { bg: 'bg-plan-enterprise', text: 'text-white', border: false },
};

export default function PlanBadge({ plan }) {
  const style = planMap[plan] || planMap['Starter'];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${style.bg} ${style.text} ${
        style.border ? 'border border-outline-variant/30' : ''
      }`}
    >
      {plan}
    </span>
  );
}

export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-gap-lg">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{title}</h2>
        {subtitle && (
          <p className="text-on-surface-variant font-body-md mt-1">{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

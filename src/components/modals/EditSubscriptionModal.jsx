import { useState, useEffect, useCallback } from "react";
import { X, Globe, Lock, AlertTriangle, Save } from "lucide-react";

export default function EditSubscriptionModal({ isOpen, onClose, plan }) {
  const [planName, setPlanName] = useState(plan?.name ?? "Growth");
  const [visibility, setVisibility] = useState(plan?.visibility ?? "public");
  const [monthlyRate, setMonthlyRate] = useState(plan?.monthlyRate ?? "12,499");
  const [annualRate, setAnnualRate] = useState(plan?.annualRate ?? "1,24,999");
  const [activeProjects, setActiveProjects] = useState(plan?.activeProjects ?? 25);
  const [monthlyMessageLimit, setMonthlyMessageLimit] = useState(plan?.monthlyMessageLimit ?? 5000);
  const [supportTier, setSupportTier] = useState(plan?.supportTier ?? "Priority (24h)");

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-inverse-surface/30 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-surface-container-lowest w-full max-w-[640px] max-h-[921px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Edit Subscription Plan
            </h3>
            <p className="font-caption text-caption text-on-surface-variant">
              Modify core metrics and pricing for the &apos;{planName}&apos; plan tier.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-gap-lg min-h-0">
          {/* Plan Basic Info */}
          <section className="space-y-4">
            <div className="grid grid-cols-2 gap-md">
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Visibility
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setVisibility("public")}
                    className={`flex-1 py-2 px-3 rounded border font-body-strong flex items-center justify-center gap-2 transition-all ${
                      visibility === "public"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <Globe size={16} />
                    Public
                  </button>
                  <button
                    onClick={() => setVisibility("internal")}
                    className={`flex-1 py-2 px-3 rounded border font-body-strong flex items-center justify-center gap-2 transition-all ${
                      visibility === "internal"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <Lock size={16} />
                    Internal
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Structure */}
          <section className="space-y-4">
            <h4 className="font-body-strong text-body-strong text-on-surface uppercase tracking-wider text-[11px]">
              Pricing Structure
            </h4>
            <div className="grid grid-cols-2 gap-md">
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Monthly Rate (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md">
                    ₹
                  </span>
                  <input
                    type="text"
                    value={monthlyRate}
                    onChange={(e) => setMonthlyRate(e.target.value)}
                    className="pl-7 w-full bg-surface-container-low border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none text-right"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Annual Rate (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md">
                    ₹
                  </span>
                  <input
                    type="text"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    className="pl-7 w-full bg-surface-container-low border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none text-right"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Feature Limits */}
          <section className="space-y-4">
            <h4 className="font-body-strong text-body-strong text-on-surface uppercase tracking-wider text-[11px]">
              Feature Utilization Limits
            </h4>
            <div className="space-y-3 bg-surface-container-low p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-body-strong text-body-strong">Active Projects</p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    Max concurrent client projects
                  </p>
                </div>
                <input
                  type="number"
                  value={activeProjects}
                  onChange={(e) => setActiveProjects(e.target.value)}
                  className="w-20 bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 font-body-md text-right"
                />
              </div>
              <div className="border-t border-outline-variant/30"></div>
              <div className="flex items-center justify-between py-1">
                <div className="space-y-0.5">
                  <p className="font-body-strong text-body-strong">Monthly Message Limit</p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    Outbound notifications &amp; SMS
                  </p>
                </div>
                <input
                  type="number"
                  value={monthlyMessageLimit}
                  onChange={(e) => setMonthlyMessageLimit(e.target.value)}
                  className="w-24 bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 font-body-md text-right"
                />
              </div>
              <div className="border-t border-outline-variant/30"></div>
              <div className="flex items-center justify-between pt-1">
                <div className="space-y-0.5">
                  <p className="font-body-strong text-body-strong">Support Tier</p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    SLA Response commitment
                  </p>
                </div>
                <select
                  value={supportTier}
                  onChange={(e) => setSupportTier(e.target.value)}
                  className="bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 font-body-md"
                >
                  <option>Standard (48h)</option>
                  <option>Priority (24h)</option>
                  <option>Express (4h)</option>
                  <option>Dedicated Account Mgr</option>
                </select>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="p-4 border border-error-container bg-error-container/10 rounded-lg space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-error mt-0.5 shrink-0" />
              <div>
                <h4 className="font-body-strong text-body-strong text-error">Danger Zone</h4>
                <p className="font-caption text-caption text-on-surface-variant">
                  Deactivating this plan will prevent new subscriptions. Existing users will remain
                  on the plan until their next billing cycle.
                </p>
              </div>
            </div>
            <button className="w-full py-2 px-4 border border-error text-error font-body-strong rounded hover:bg-error hover:text-white transition-all text-sm">
              Deactivate Plan
            </button>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-container-low flex justify-end gap-3 shrink-0">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-on-surface-variant font-body-strong hover:bg-surface-container-high rounded transition-colors"
          >
            Discard Changes
          </button>
          <button className="px-6 py-2 bg-primary-container text-on-primary font-body-strong rounded shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

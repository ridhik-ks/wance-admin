import { useState, useEffect, useCallback } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Info,
  Printer,
  Share2,
  Send,
  ChevronDown,
} from "lucide-react";

const plans = [
  {
    key: "starter",
    label: "Starter",
    priceMonthly: "₹4,999",
    priceAnnual: "₹4,249",
    description: "Up to 5 active projects, standard support.",
    bgClass: "bg-plan-starter",
  },
  {
    key: "growth",
    label: "Growth",
    priceMonthly: "₹12,499",
    priceAnnual: "₹10,624",
    description: "Unlimited projects, priority response.",
    bgClass: "bg-plan-growth",
  },
  {
    key: "pro",
    label: "Pro",
    priceMonthly: "₹24,999",
    priceAnnual: "₹21,249",
    description: "Advanced analytics, 24/7 account manager.",
    bgClass: "bg-plan-pro",
  },
  {
    key: "enterprise",
    label: "Enterprise",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    description: "Dedicated infrastructure and SLA.",
    bgClass: "bg-plan-enterprise text-white",
  },
];

const countryOptions = [
  { code: "+1", label: "+1 (US)" },
  { code: "+44", label: "+44 (UK)" },
  { code: "+91", label: "+91 (IN)" },
  { code: "+234", label: "+234 (NG)" },
];

const categoryOptions = [
  "Fashion & Apparel",
  "Electronics",
  "Food & Beverage",
  "Health & Beauty",
  "Home Decor",
];

export default function AddClientModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 state
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [whatsapp, setWhatsapp] = useState("");
  const [category, setCategory] = useState("");

  // Step 2 state
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [billing, setBilling] = useState("monthly");
  const [topUp, setTopUp] = useState(10000);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setShopName("");
    setOwnerName("");
    setCountryCode("+91");
    setWhatsapp("");
    setCategory("");
    setSelectedPlan("growth");
    setBilling("monthly");
    setTopUp(10000);
  }, []);

  const handleClose = useCallback(() => {
    onClose?.();
    setTimeout(reset, 300);
  }, [onClose, reset]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (currentStep === 3) return; // disable escape on success screen
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, currentStep, handleClose]);

  if (!isOpen) return null;

  const stepLabels = [
    { num: 1, text: "Business Profile" },
    { num: 2, text: "Plan & Credits" },
    { num: 3, text: "Success" },
  ];

  const activePlanObj = plans.find((p) => p.key === selectedPlan) || plans[1];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(15, 28, 58, 0.4)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (currentStep !== 3) handleClose();
        }
      }}
    >
      <div className="bg-white w-full max-w-[640px] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Decorative top bar for step 3 */}
        {currentStep === 3 && <div className="h-1.5 w-full bg-primary" />}

        {/* Header */}
        <div className="px-8 pt-8 pb-4 shrink-0">
          <div className="flex items-center justify-between mb-6">
            {currentStep === 3 ? (
              <div /> // success screen centers content, keep header minimal
            ) : (
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Add New Client
                </h3>
                {currentStep === 2 && (
                  <p className="text-on-surface-variant font-body-md mt-1">
                    Configure service tier and billing parameters
                  </p>
                )}
              </div>
            )}
            {currentStep !== 3 && (
              <button
                onClick={handleClose}
                className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Progress Indicator */}
          {currentStep !== 3 && (
            <div className="flex items-center gap-2 mb-2">
              {stepLabels.map((s) => {
                const isActive = currentStep === s.num;
                const isFilled = currentStep > s.num;
                return (
                  <div key={s.num} className="flex-1 flex flex-col gap-2">
                    <div
                      className={`h-1.5 w-full rounded-full ${
                        isFilled || isActive
                          ? "bg-primary"
                          : "bg-surface-container-highest"
                      }`}
                    />
                    <span
                      className={`font-label-md text-label-md ${
                        isActive
                          ? "text-primary"
                          : isFilled
                          ? "text-primary"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {isActive ? `Step ${s.num}: ${s.text}` : `Step ${s.num}`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-8 pb-8 overflow-y-auto scrollbar-hide">
          {currentStep === 1 && (
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Shop Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="shop_name"
                  className="font-body-strong text-body-strong text-on-surface block"
                >
                  Shop Name
                </label>
                <input
                  id="shop_name"
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. Modern Retail Co."
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md placeholder:text-outline focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                />
              </div>

              {/* Owner Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="owner_name"
                  className="font-body-strong text-body-strong text-on-surface block"
                >
                  Owner Full Name
                </label>
                <input
                  id="owner_name"
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md placeholder:text-outline focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                />
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-1.5">
                <label
                  htmlFor="whatsapp"
                  className="font-body-strong text-body-strong text-on-surface block"
                >
                  Primary WhatsApp Number
                </label>
                <div className="flex gap-2">
                  <div className="relative w-28">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full bg-white border border-outline-variant rounded-lg px-3 py-2.5 font-body-md appearance-none focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                    >
                      {countryOptions.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                    />
                  </div>
                  <input
                    id="whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="812 345 6789"
                    className="flex-1 bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md placeholder:text-outline focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Business Category */}
              <div className="space-y-1.5">
                <label
                  htmlFor="category"
                  className="font-body-strong text-body-strong text-on-surface block"
                >
                  Business Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md appearance-none focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                  />
                </div>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              {/* Plan Selection */}
              <div>
                <div className="flex items-end justify-between mb-4">
                  <label className="font-body-strong text-on-surface">
                    Select Subscription Plan
                  </label>
                  {/* Billing Toggle */}
                  <div className="flex bg-surface-container-high p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setBilling("monthly")}
                      className={`px-3 py-1 text-label-md rounded-md transition-all ${
                        billing === "monthly"
                          ? "bg-white shadow-sm text-primary font-bold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBilling("annual")}
                      className={`px-3 py-1 text-label-md rounded-md transition-all ${
                        billing === "annual"
                          ? "bg-white shadow-sm text-primary font-bold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      Annual{" "}
                      <span className="text-status-active font-bold ml-1">
                        -15%
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {plans.map((plan) => {
                    const isActive = selectedPlan === plan.key;
                    return (
                      <div
                        key={plan.key}
                        onClick={() => setSelectedPlan(plan.key)}
                        className={`border p-4 rounded-lg cursor-pointer hover:border-primary transition-all group ${
                          isActive
                            ? "border-primary ring-1 ring-primary"
                            : "border-outline-variant"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span
                            className={`${plan.bgClass} text-label-md px-2 py-0.5 rounded font-bold uppercase tracking-wider`}
                          >
                            {plan.label}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isActive
                                ? "border-primary bg-primary"
                                : "border-outline-variant"
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full bg-white transition-opacity ${
                                isActive ? "opacity-100" : "opacity-0"
                              }`}
                            />
                          </div>
                        </div>
                        <div className="font-stat-value text-stat-value mb-1">
                          {billing === "monthly"
                            ? plan.priceMonthly
                            : plan.priceAnnual}
                          {plan.key !== "enterprise" && (
                            <span className="text-label-md font-normal text-on-surface-variant">
                              /mo
                            </span>
                          )}
                        </div>
                        <p className="text-caption text-on-surface-variant">
                          {plan.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top-up Balance */}
              <div className="space-y-4">
                <label
                  htmlFor="topup"
                  className="font-body-strong text-on-surface block"
                >
                  Initial Top-up Balance
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body-strong text-on-surface-variant">
                    ₹
                  </span>
                  <input
                    id="topup"
                    type="number"
                    value={topUp}
                    onChange={(e) => setTopUp(Number(e.target.value))}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md"
                  />
                </div>
                <div className="flex gap-2">
                  {[5000, 10000, 50000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUp(amt)}
                      className="px-3 py-1.5 rounded-full border border-outline-variant text-caption hover:bg-surface-container-high transition-colors"
                    >
                      + ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Alert */}
              <div className="p-4 bg-status-active-bg rounded-lg border border-status-active/20 flex gap-3">
                <Info size={18} className="text-status-active shrink-0 mt-0.5" />
                <p className="text-caption text-on-surface-variant">
                  Selected credits will be added to the wallet immediately upon
                  client activation. The 15% annual discount will be applied to
                  the next billing cycle.
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col items-center text-center">
              {/* Success Icon */}
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-status-active-bg text-status-active">
                <CheckCircle size={48} strokeWidth={1.5} />
              </div>

              {/* Title & Subtext */}
              <h1 className="font-headline-lg text-on-surface mb-2">
                Client Created Successfully!
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-[420px]">
                {shopName
                  ? `'${shopName}'`
                  : "The client"}{" "}
                has been added to the platform and their account is now active.
              </p>

              {/* Summary Card */}
              <div className="w-full mt-8 bg-surface-container-low rounded-lg p-4 text-left border border-outline-variant">
                <h2 className="font-label-md text-on-surface-variant uppercase tracking-widest mb-4">
                  Key Information Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-on-surface-variant">
                      Subscription Plan
                    </span>
                    <span className="bg-plan-pro text-on-secondary-container px-3 py-1 rounded font-body-strong text-xs uppercase tracking-wider border border-outline-variant">
                      {activePlanObj.label} Plan (
                      {billing === "monthly" ? "Monthly" : "Annual"})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-on-surface-variant">
                      Initial Balance
                    </span>
                    <span className="font-stat-value text-headline-sm text-on-surface">
                      ₹{topUp.toLocaleString("en-IN")}.00
                    </span>
                  </div>
                  <div className="pt-3 border-t border-outline-variant flex items-start gap-3">
                    <Info size={16} className="text-primary mt-0.5 shrink-0" />
                    <p className="font-caption text-on-surface-variant">
                      Login credentials have been sent to the owner&apos;s email
                      address and should arrive within minutes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full mt-8 flex flex-col gap-3">
                <button className="w-full h-12 bg-primary hover:bg-primary-container text-white font-body-strong rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]">
                  Go to Client Details
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={handleClose}
                  className="w-full h-12 bg-transparent hover:bg-surface-container-high text-on-surface font-body-strong rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border border-outline-variant active:scale-[0.98]"
                >
                  Return to Clients List
                </button>
              </div>

              {/* Utility Footer */}
              <div className="mt-8 pt-6 border-t border-outline-variant w-full flex items-center justify-center gap-6">
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md">
                  <Printer size={18} />
                  Print Confirmation
                </button>
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md">
                  <Share2 size={18} />
                  Share Details
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {currentStep !== 3 && (
          <div className="px-8 py-6 bg-surface-container-low border-t border-outline-variant flex items-center justify-between shrink-0">
            {currentStep === 1 && (
              <>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 font-body-strong text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-2.5 font-body-strong bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  Next
                  <ArrowRight size={18} />
                </button>
              </>
            )}
            {currentStep === 2 && (
              <>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 px-6 py-2.5 font-body-strong text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all active:opacity-80"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white font-body-strong rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:opacity-80"
                >
                  Next Step
                  <Send size={18} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

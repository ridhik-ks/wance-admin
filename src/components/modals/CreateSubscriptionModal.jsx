import { useState, useEffect, useRef } from 'react';
import { X, Search, CheckCircle2, CalendarDays, Tag, Loader2 } from 'lucide-react';
import { clients } from '../../data/mockData';

const PLANS = [
  { name: 'Starter',    monthly: 29,  desc: 'Core administrative tools for boutique shops.' },
  { name: 'Growth',     monthly: 79,  desc: 'Advanced analytics and multi-channel support.' },
  { name: 'Pro',        monthly: 149, desc: 'High-volume optimization and VIP priority.', popular: true },
  { name: 'Enterprise', monthly: 499, desc: 'Unlimited scaling and dedicated infrastructure.' },
];

export default function CreateSubscriptionModal({ isOpen, onClose, onSuccess }) {
  const [searchQuery,     setSearchQuery]     = useState('');
  const [selectedClient,  setSelectedClient]  = useState(null);
  const [showDropdown,    setShowDropdown]     = useState(false);
  const [selectedPlan,    setSelectedPlan]     = useState('Pro');
  const [billing,         setBilling]          = useState('Monthly');
  const [effectiveDate,   setEffectiveDate]    = useState('');
  const [promoCode,       setPromoCode]        = useState('');
  const [loading,         setLoading]          = useState(false);
  const [noClientError,   setNoClientError]    = useState(false);

  const searchRef = useRef(null);

  // Escape key to close
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedClient(null);
      setShowDropdown(false);
      setSelectedPlan('Pro');
      setBilling('Monthly');
      setEffectiveDate('');
      setPromoCode('');
      setLoading(false);
      setNoClientError(false);
    }
  }, [isOpen]);

  const filteredClients = clients.filter((c) =>
    c.shop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPlan = PLANS.find((p) => p.name === selectedPlan);
  const price = billing === 'Annual'
    ? Math.round(currentPlan.monthly * 0.8)
    : currentPlan.monthly;

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setSearchQuery(client.shop);
    setShowDropdown(false);
    setNoClientError(false);
  };

  const handleCreate = async () => {
    if (!selectedClient) {
      setNoClientError(true);
      searchRef.current?.focus();
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1300));
    setLoading(false);
    onClose();
    onSuccess?.(`Subscription created for ${selectedClient.shop}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-sidebar-bg/30 backdrop-blur-[6px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-outline-variant overflow-hidden flex flex-col animate-fade-in-up max-h-[92vh]">

        {/* Header */}
        <div className="px-6 md:px-8 py-5 md:py-6 border-b border-outline-variant flex items-start justify-between gap-4 flex-shrink-0">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Create New Subscription</h2>
            <p className="text-on-surface-variant text-body-md mt-0.5">Provision a new service tier for a partner client.</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant hover:text-on-surface flex-shrink-0 mt-0.5"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-7">

          {/* 1. Select Client */}
          <div className="space-y-3">
            <label className="font-body-strong text-on-surface block">Select Client</label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedClient(null);
                  setShowDropdown(true);
                  setNoClientError(false);
                }}
                onFocus={() => { if (!selectedClient) setShowDropdown(true); }}
                placeholder="Search by shop name..."
                className={`w-full pl-10 pr-4 py-2.5 bg-surface-container-low border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-body-md outline-none ${
                  noClientError ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                }`}
              />

              {/* Dropdown results */}
              {showDropdown && searchQuery && filteredClients.length > 0 && (
                <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-outline-variant rounded-xl shadow-xl z-10 overflow-hidden">
                  {filteredClients.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectClient(c)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors text-left"
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${c.color}`}>
                        {c.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body-strong text-on-surface text-sm truncate">{c.shop}</p>
                        <p className="text-caption text-on-surface-variant truncate">{c.shop.toLowerCase().replace(/\s+/g, '-')}.shop.wance.io</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected client card */}
            {selectedClient && (
              <div className="flex items-center gap-3 p-3 border border-outline-variant rounded-xl bg-surface-container-low/40">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${selectedClient.color}`}>
                  {selectedClient.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body-strong text-on-surface text-sm">{selectedClient.shop}</p>
                  <p className="text-caption text-on-surface-variant">{selectedClient.shop.toLowerCase().replace(/\s+/g, '-')}.shop.wance.io</p>
                </div>
                <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
              </div>
            )}

            {noClientError && (
              <p className="text-error text-caption mt-1">Please select a client before proceeding.</p>
            )}
          </div>

          {/* 2. Plan Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <label className="font-body-strong text-on-surface">Available Plans</label>
              {/* Monthly / Annual toggle */}
              <div className="flex items-center bg-surface-container-high p-1 rounded-full gap-0.5">
                {['Monthly', 'Annual'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBilling(b)}
                    className={`px-4 py-1 rounded-full text-caption font-bold transition-all ${
                      billing === b
                        ? 'bg-white shadow-sm text-on-surface'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {b === 'Annual' ? (
                      <span>Annual <span className="text-primary">-20%</span></span>
                    ) : b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.name;
                const displayPrice = billing === 'Annual' ? Math.round(plan.monthly * 0.8) : plan.monthly;
                return (
                  <label
                    key={plan.name}
                    className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary'
                        : 'border-outline-variant hover:border-primary/40'
                    }`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.name}
                      checked={isSelected}
                      onChange={() => setSelectedPlan(plan.name)}
                      className="absolute top-4 right-4 text-primary focus:ring-primary accent-primary"
                    />
                    <div className="space-y-1 pr-5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-label-md font-bold uppercase tracking-wider ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {plan.name}
                        </span>
                        {plan.popular && (
                          <span className="bg-primary text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-headline-md font-bold tnum text-on-surface">${displayPrice}</span>
                        <span className="text-caption text-on-surface-variant">/mo</span>
                      </div>
                      <p className="text-caption text-on-surface-variant leading-relaxed">{plan.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 3. Effective Date & Promo Code */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="font-body-strong text-on-surface block text-sm">Effective Date</label>
              <div className="relative">
                <CalendarDays size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-body-md outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-body-strong text-on-surface block text-sm">Promo Code</label>
              <div className="relative">
                <Tag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code..."
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-body-md outline-none"
                />
              </div>
            </div>
          </div>

          {/* 4. Summary Panel */}
          <div className="bg-surface-container-low rounded-xl p-5 md:p-6 space-y-3 border border-outline-variant/50">
            <div className="flex justify-between items-center text-body-md">
              <span className="text-on-surface-variant">Subscription Subtotal</span>
              <span className="font-body-strong tnum">${price}.00</span>
            </div>
            <div className="flex justify-between items-center text-body-md">
              <span className="text-on-surface-variant">Tax (VAT 0%)</span>
              <span className="font-body-strong tnum">$0.00</span>
            </div>
            {promoCode && (
              <div className="flex justify-between items-center text-body-md">
                <span className="text-status-active">Promo ({promoCode.toUpperCase()})</span>
                <span className="font-body-strong text-status-active tnum">– $0.00</span>
              </div>
            )}
            <div className="pt-3 border-t border-outline-variant flex justify-between items-center">
              <span className="font-body-strong text-on-surface">Total Due Today</span>
              <span className="font-headline-md text-primary tnum">${price}.00</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 md:px-8 py-5 md:py-6 bg-surface-container/40 border-t border-outline-variant flex items-center justify-end gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl font-body-strong text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={loading}
            className="px-7 py-2.5 rounded-xl bg-primary text-white font-body-strong shadow-lg shadow-primary/25 hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating…
              </>
            ) : (
              'Create Subscription'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

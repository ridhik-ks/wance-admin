import { useState } from 'react';
import {
  Plus,
  TrendingUp,
  X,
  CheckCircle,
  Wallet,
  Filter,
  Download,
} from 'lucide-react';

export default function TopUps() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [amount, setAmount] = useState('500');
  const [method, setMethod] = useState('upi');
  const [note, setNote] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const notify = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const openDialog = () => {
    setDialogOpen(true);
    setDialogSuccess(false);
    setAmount('500');
    setMethod('upi');
    setNote('');
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setTimeout(() => setDialogSuccess(false), 300);
  };

  const submitTopup = () => {
    setDialogSuccess(true);
  };

  return (
    <div className="flex-1 px-4 md:px-page-padding-x py-6 md:py-8 space-y-6 md:space-y-gap-lg max-w-container-max mx-auto w-full">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-on-surface text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
          {toastMsg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 md:mb-0">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Top-ups Management</h1>
          <p className="text-on-surface-variant font-body-md mt-1 text-sm md:text-base">Monitor and manage client wallet balances.</p>
        </div>
        <button
          onClick={openDialog}
          className="bg-primary text-white px-5 md:px-6 py-2.5 rounded-lg font-body-strong flex items-center gap-2 shadow-sm hover:bg-primary/90 transition-all text-sm"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Top-up</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-gap-sm">
        <div className="bg-white p-4 md:p-5 rounded-xl border border-outline-variant shadow-sm">
          <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider text-[10px] md:text-xs">Total Volume</p>
          <p className="font-stat-value text-stat-value text-on-surface mt-1 text-lg md:text-2xl">₹4,28,500</p>
          <p className="text-status-active text-caption font-caption mt-2 flex items-center gap-1 text-[11px]">
            <TrendingUp size={14} /> +12.5% this month
          </p>
        </div>
        <div className="bg-white p-4 md:p-5 rounded-xl border border-outline-variant shadow-sm">
          <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider text-[10px] md:text-xs">Active Clients</p>
          <p className="font-stat-value text-stat-value text-on-surface mt-1 text-lg md:text-2xl">1,248</p>
          <p className="text-on-surface-variant text-caption font-caption mt-2 text-[11px]">Total registered stores</p>
        </div>
        <div className="bg-white p-4 md:p-5 rounded-xl border border-outline-variant shadow-sm">
          <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider text-[10px] md:text-xs">Pending Approvals</p>
          <p className="font-stat-value text-stat-value text-on-surface mt-1 text-lg md:text-2xl">12</p>
          <p className="text-status-suspended text-caption font-caption mt-2 text-[11px]">Requires verification</p>
        </div>
        <div className="bg-white p-4 md:p-5 rounded-xl border border-outline-variant shadow-sm">
          <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider text-[10px] md:text-xs">Failed Top-ups</p>
          <p className="font-stat-value text-stat-value text-on-surface mt-1 text-lg md:text-2xl">04</p>
          <p className="text-status-churned text-caption font-caption mt-2 text-[11px]">Payment gateway issues</p>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <h2 className="font-headline-sm text-headline-sm text-sm md:text-base">Recent Transactions</h2>
          <div className="flex gap-2">
            <button onClick={() => notify('Filter applied')} className="px-2 md:px-3 py-1.5 border border-outline-variant rounded-lg text-label-md font-label-md flex items-center gap-2 hover:bg-white transition-colors text-xs md:text-sm">
              <Filter size={14} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button onClick={() => notify('Export downloaded')} className="px-2 md:px-3 py-1.5 border border-outline-variant rounded-lg text-label-md font-label-md flex items-center gap-2 hover:bg-white transition-colors text-xs md:text-sm">
              <Download size={14} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant h-[36px] md:h-[40px]">
              <tr>
                <th className="px-4 md:px-6 text-label-md font-label-md uppercase text-on-surface-variant text-[10px] md:text-xs">Transaction ID</th>
                <th className="px-4 md:px-6 text-label-md font-label-md uppercase text-on-surface-variant text-[10px] md:text-xs">Client</th>
                <th className="px-4 md:px-6 text-label-md font-label-md uppercase text-on-surface-variant text-[10px] md:text-xs hidden sm:table-cell">Date</th>
                <th className="px-4 md:px-6 text-label-md font-label-md uppercase text-on-surface-variant text-[10px] md:text-xs hidden md:table-cell">Method</th>
                <th className="px-4 md:px-6 text-label-md font-label-md uppercase text-on-surface-variant text-[10px] md:text-xs text-right">Amount</th>
                <th className="px-4 md:px-6 text-label-md font-label-md uppercase text-on-surface-variant text-[10px] md:text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              <tr className="h-[44px] md:h-[48px] hover:bg-surface-container-low transition-colors group">
                <td className="px-4 md:px-6 font-mono text-caption text-on-surface-variant text-[11px] md:text-xs">#TXN-88210</td>
                <td className="px-4 md:px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-[8px] md:text-[10px] font-bold">MS</div>
                    <span className="font-body-strong text-sm">Mahfuzul Store</span>
                  </div>
                </td>
                <td className="px-4 md:px-6 text-body-md text-on-surface-variant text-sm hidden sm:table-cell">Oct 24, 14:20</td>
                <td className="px-4 md:px-6 text-body-md text-on-surface-variant text-sm hidden md:table-cell">UPI (GPay)</td>
                <td className="px-4 md:px-6 text-right font-body-strong text-sm">₹120.00</td>
                <td className="px-4 md:px-6">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-active-bg text-status-active font-label-md text-[10px] md:text-[11px] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-active"></span> Completed
                  </span>
                </td>
              </tr>
              <tr className="h-[44px] md:h-[48px] hover:bg-surface-container-low transition-colors group">
                <td className="px-4 md:px-6 font-mono text-caption text-on-surface-variant text-[11px] md:text-xs">#TXN-88209</td>
                <td className="px-4 md:px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center text-[8px] md:text-[10px] font-bold">AK</div>
                    <span className="font-body-strong text-sm">Ahmed Kirana</span>
                  </div>
                </td>
                <td className="px-4 md:px-6 text-body-md text-on-surface-variant text-sm hidden sm:table-cell">Oct 24, 12:45</td>
                <td className="px-4 md:px-6 text-body-md text-on-surface-variant text-sm hidden md:table-cell">Net Banking</td>
                <td className="px-4 md:px-6 text-right font-body-strong text-sm">₹2,500.00</td>
                <td className="px-4 md:px-6">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-active-bg text-status-active font-label-md text-[10px] md:text-[11px] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-active"></span> Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog Overlay */}
      {dialogOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300"
          onClick={(e) => { if (e.target === e.currentTarget) closeDialog(); }}
        >
          <div className="bg-surface-container-lowest w-full max-w-[480px] rounded-2xl shadow-2xl overflow-hidden border border-outline-variant animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            {/* Dialog Header */}
            <div className="px-4 md:px-6 py-4 md:py-5 border-b border-outline-variant bg-surface flex items-center justify-between sticky top-0">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Add Top-up</h3>
                <p className="text-caption font-caption text-on-surface-variant">Inject funds directly into a client&apos;s wallet.</p>
              </div>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors" onClick={closeDialog}>
                <X size={20} />
              </button>
            </div>

            {!dialogSuccess ? (
              <>
                {/* Dialog Body */}
                <form className="p-4 md:p-6 space-y-4 md:space-y-5" onSubmit={(e) => { e.preventDefault(); submitTopup(); }}>
                  {/* Client Search/Selector */}
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-xs">Select Client</label>
                    <div className="relative">
                      <div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border border-primary ring-1 ring-primary">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-sm">MS</div>
                        <div className="flex-1">
                          <p className="font-body-strong text-body-strong text-sm">Mahfuzul Store</p>
                          <p className="text-caption text-on-surface-variant">Current Balance: <span className="font-semibold text-on-surface">₹120.00</span></p>
                        </div>
                        <CheckCircle size={18} className="text-primary md:w-5 md:h-5" />
                      </div>
                    </div>
                  </div>
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-xs" htmlFor="amount">Top-up Amount</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body-strong text-on-surface-variant">₹</span>
                      <input
                        className="w-full pl-8 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-stat-value text-on-surface text-sm md:text-base"
                        id="amount"
                        placeholder="0.00"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Payment Method */}
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-xs" htmlFor="method">Payment Method</label>
                    <select
                      className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-body-md appearance-none text-sm md:text-base"
                      id="method"
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                    >
                      <option value="cash">Cash Payment</option>
                      <option value="upi">UPI / QR Scan</option>
                      <option value="bank">Bank Transfer</option>
                      <option value="check">Cheque</option>
                    </select>
                  </div>
                  {/* Internal Note */}
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-xs" htmlFor="note">Internal Note (Optional)</label>
                    <textarea
                      className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-body-md text-sm md:text-base"
                      id="note"
                      placeholder="Reason for top-up..."
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </form>
                {/* Dialog Footer */}
                <div className="px-4 md:px-6 py-4 md:py-5 bg-surface border-t border-outline-variant flex gap-3">
                  <button
                    className="flex-1 px-4 py-2.5 rounded-lg border border-outline-variant font-body-strong text-on-surface hover:bg-surface-container-high transition-colors text-sm"
                    onClick={closeDialog}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-[1.5] px-4 py-2.5 rounded-lg bg-primary text-white font-body-strong shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 text-sm"
                    onClick={submitTopup}
                  >
                    Confirm Top-up
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Success Message */}
                <div className="p-6 md:p-8 text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-status-active-bg text-status-active rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="fill-status-active text-white md:w-10 md:h-10" />
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Top-up Successful</h4>
                  <div className="bg-surface-container p-4 rounded-xl text-on-surface-variant font-body-md border border-outline-variant/50 text-sm">
                    ₹{amount || '500'} will be added to <span className="font-bold text-on-surface">Mahfuzul Store</span>. <br />
                    New balance: <span className="text-status-active font-bold">₹{620 + (parseInt(amount || 0) - 500)}.00</span>
                  </div>
                </div>
                {/* Success Footer */}
                <div className="px-4 md:px-6 py-4 md:py-5 bg-surface border-t border-outline-variant">
                  <button
                    className="w-full px-4 py-2.5 rounded-lg bg-primary text-white font-body-strong shadow-lg shadow-primary/20 hover:bg-primary-container transition-all text-sm"
                    onClick={closeDialog}
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

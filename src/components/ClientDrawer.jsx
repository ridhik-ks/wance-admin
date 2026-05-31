import { X, Phone, Mail, MapPin, Calendar, CheckCircle } from 'lucide-react';
import PlanBadge from './PlanBadge';
import StatusPill from './StatusPill';

export default function ClientDrawer({ isOpen, onClose, client }) {
  if (!client) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`absolute top-0 right-0 h-full w-[520px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-outline-variant flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Client Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
          >
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary-container text-white flex items-center justify-center text-headline-lg font-black shadow-lg">
              {client.initials || 'CL'}
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface">
                {client.name || client.shop}
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <PlanBadge plan={client.plan} />
                <StatusPill status={client.status} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
              <p className="text-[11px] font-bold text-outline uppercase tracking-wider mb-1">
                Top-up Balance
              </p>
              <p className="text-headline-sm text-on-surface tnum">
                ₹{client.balance?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '0.00'}
              </p>
            </div>
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
              <p className="text-[11px] font-bold text-outline uppercase tracking-wider mb-1">
                Messages Used
              </p>
              <p className="text-headline-sm text-on-surface tnum">
                {client.messages?.toLocaleString() || '0'} / 20k
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h5 className="font-body-strong text-body-strong text-on-surface mb-4 border-b border-outline-variant pb-2">
                Business Information
              </h5>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-body-md text-on-surface-variant">Owner</span>
                  <span className="text-body-md font-medium text-on-surface">
                    {client.owner || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body-md text-on-surface-variant">Phone</span>
                  <span className="text-body-md font-medium text-on-surface">
                    {client.phone || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body-md text-on-surface-variant">Email</span>
                  <span className="text-body-md font-medium text-on-surface">
                    {client.email || 'contact@' + (client.shop || 'client').toLowerCase().replace(/\s+/g, '') + '.shop'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body-md text-on-surface-variant">Registered On</span>
                  <span className="text-body-md font-medium text-on-surface">
                    {client.joined || client.registered || 'N/A'}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="p-6 border-t border-outline-variant bg-surface-container-lowest flex gap-3">
          <button className="flex-1 px-4 py-2 border border-outline-variant rounded-lg text-body-strong font-body-strong hover:bg-surface-container-low transition-colors">
            Edit Client
          </button>
          <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-body-strong font-body-strong hover:bg-primary/90 transition-all">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Wallet,
  MessageSquare,
  Settings,
  X,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/clients', label: 'Clients', icon: Users },
  { path: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { path: '/top-ups', label: 'Top-ups', icon: Wallet },
  { path: '/messages', label: 'Messages', icon: MessageSquare },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ onClose, mobile }) {
  const navigate = useNavigate();

  return (
    <aside className={`flex flex-col h-screen bg-sidebar-bg overflow-hidden z-50 ${mobile ? 'w-sidebar-width' : 'w-sidebar-width sticky left-0 top-0'}`}>
      <div className="px-6 py-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-headline-lg font-black text-white">Wance Admin</h1>
          <p className="text-label-md text-sidebar-text mt-1">Super Admin</p>
        </div>
        {mobile && (
          <button
            onClick={onClose}
            className="md:hidden p-2 text-sidebar-text hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `px-4 py-3 flex items-center gap-3 transition-colors font-body-md text-body-md ${
                  isActive
                    ? 'bg-primary-container/20 text-white border-l-4 border-primary'
                    : 'text-sidebar-text hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <button
        onClick={() => { navigate('/profile'); onClose?.(); }}
        className="p-6 border-t border-white/5 w-full text-left hover:bg-white/5 transition-colors shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-body-strong truncate">Super Admin</p>
            <p className="text-sidebar-text text-caption truncate">admin@wance.io</p>
          </div>
        </div>
      </button>
    </aside>
  );
}

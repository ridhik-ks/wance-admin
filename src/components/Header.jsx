import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center px-4 md:px-page-padding-x w-full bg-surface h-header-height border-b border-outline-variant">
      <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full max-w-[400px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="text"
            placeholder="Search clients, transactions, or logs..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm md:text-base"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4 ml-2">
        <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors relative shrink-0">
          <Bell size={18} className="md:w-5 md:h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
        </button>
        <div className="hidden sm:block h-8 w-[1px] bg-outline-variant mx-2"></div>
        <button
          onClick={() => navigate('/profile')}
          className="hidden sm:flex items-center gap-2 hover:bg-surface-container-low px-2 md:px-3 py-1.5 rounded-lg transition-colors"
        >
          <span className="font-body-strong text-on-surface text-sm md:text-base">Profile</span>
          <ChevronDown size={16} className="text-on-surface-variant" />
        </button>
      </div>
    </header>
  );
}

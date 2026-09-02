import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { 
  CloudArrowUpIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { Leaf } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen = false }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const menuItems = [
    { id: 'upload', label: t('dashboard.sidebar.upload'), icon: CloudArrowUpIcon },
    { id: 'history', label: t('dashboard.sidebar.history'), icon: DocumentTextIcon },
    { id: 'analytics', label: t('dashboard.sidebar.analytics'), icon: ChartBarIcon },
    { id: 'profile', label: t('dashboard.sidebar.profile'), icon: UserIcon },
    { id: 'contact', label: t('dashboard.sidebar.contact'), icon: PhoneIcon },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col border-r border-emerald-950/10 bg-[#12382d]/[.97] text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 md:sticky md:top-0 md:z-20 md:h-screen md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Logo */}
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-green-500 shadow-lg shadow-emerald-950/30">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">{t('app.title')}</h1>
            <p className="text-xs font-medium uppercase tracking-[.2em] text-emerald-200/70">AI plant care</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mx-4 mt-4 rounded-2xl border border-white/10 bg-white/[.07] p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300/20 ring-1 ring-emerald-200/20">
            <UserIcon className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="max-w-[9.5rem] truncate text-xs text-emerald-100/60">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 pt-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[.22em] text-emerald-100/40">Workspace</p>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`group flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-emerald-300 text-emerald-950 shadow-lg shadow-black/10'
                    : 'text-emerald-50/70 hover:bg-white/[.08] hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Language Selector */}
      <div className="border-t border-white/10 p-4 text-emerald-50">
        <LanguageSelector />
      </div>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-rose-200/80 transition-colors hover:bg-rose-400/10 hover:text-rose-100"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span className="font-medium">{t('dashboard.sidebar.logout')}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

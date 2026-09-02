import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Chatbot from './Chatbot';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell min-h-screen">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-xl border border-emerald-900/10 bg-white/90 p-3 text-emerald-900 shadow-lg backdrop-blur md:hidden"
        aria-label="Open navigation"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      {sidebarOpen && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-emerald-950/30 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="flex min-h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSidebarOpen(false); }} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <MainContent activeTab={activeTab} />
      </div>
      <Chatbot />
    </div>
  );
};

export default Dashboard;

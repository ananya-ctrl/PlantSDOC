import React from 'react';
import UploadSection from './UploadSection';
import HistorySection from './HistorySection';
import AnalyticsSection from './AnalyticsSection';
import ProfileSection from './ProfileSection';
import ContactSection from './ContactSection';

interface MainContentProps {
  activeTab: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return <UploadSection />;
      case 'history':
        return <HistorySection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'profile':
        return <ProfileSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <UploadSection />;
    }
  };

  return (
    <main className="min-w-0 flex-1 px-4 pb-24 pt-20 sm:px-6 md:px-8 md:py-8 lg:px-12">
      <div key={activeTab} className="page-enter">
        {renderContent()}
      </div>
    </main>
  );
};

export default MainContent;


import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { ServicePage } from './components/ServicePage';
import { CursorProximity } from './components/CursorProximity';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const Content: React.FC = () => {
  const [view, setView] = useState('home');
  const [serviceId, setServiceId] = useState('web');
  const { language } = useLanguage();

  // Apply Georgian font class to body when language changes
  useEffect(() => {
    if (language === 'ka') {
      document.body.classList.add('font-georgian');
    } else {
      document.body.classList.remove('font-georgian');
    }
  }, [language]);

  const handleNavigate = (page: string, id?: string) => {
    setView(page);
    if (id) setServiceId(id);
  };

  return (
    <div className="relative selection:bg-yellow-500 selection:text-slate-900">
      <CursorProximity />
      
      {view === 'home' ? (
        <Home onNavigate={handleNavigate} />
      ) : (
        <ServicePage serviceId={serviceId} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Content />
    </LanguageProvider>
  );
};

export default App;

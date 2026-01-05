import React from 'react';
import { Logo } from './Logo';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <Logo className="w-10 h-10" />
          <p className="text-sm md:text-base text-slate-500 max-w-sm text-center md:text-left">
            {t('footer.brandDesc')}
          </p>
        </div>
        
        {/* Social Icons */}
        <div className="flex gap-4">
            <SocialIcon icon={<Instagram size={20} />} />
            <SocialIcon icon={<Facebook size={20} />} />
            <SocialIcon icon={<Linkedin size={20} />} />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-600">
        <p>{t('nav.copyright')}</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">{t('nav.contactLink')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('nav.privacyLink')}</a>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all">
    {icon}
  </a>
);
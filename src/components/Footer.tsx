import React from 'react';
import { Logo } from './Logo';
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

        {/* Contact Info */}
        <a
          href="mailto:TimeVault.Service@gmail.com"
          className="hover:text-white transition-colors text-lg font-medium"
        >
          {t('nav.contactLink')}: TimeVault.Service@gmail.com
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 flex justify-center text-sm font-medium text-slate-600">
        <p>{t('nav.copyright')}</p>
      </div>
    </footer>
  );
};
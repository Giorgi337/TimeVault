import React from 'react';
import { BeamButton } from './BeamButton';
import { useLanguage } from '../contexts/LanguageContext';

export const CTA: React.FC = () => {
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`${isGeorgian ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'} font-black text-white mb-8 ${isGeorgian ? 'leading-[1.6]' : 'leading-tight'}`}>
          {t('footer.strategyTitle')} <br/>
          <span className="text-blue-600">{t('footer.strategyHighlight')}</span>
        </h2>
        <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
          {t('footer.strategyDesc')}
        </p>
        <div className="flex flex-col items-center gap-4">
          <BeamButton variant="secondary" className="px-10 py-5 text-xl">
            {t('footer.ctaButton')}
          </BeamButton>
          <p className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mt-4">
            {t('footer.ctaSub')}
          </p>
        </div>
      </div>
    </section>
  );
};
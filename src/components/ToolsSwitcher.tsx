import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Cpu, Megaphone, Palette, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

import webImg from '../assets/web-development.png';
import autoImg from '../assets/automation-dashboard.jpg';

const images = {
  web: webImg,
  auto: autoImg,
  content: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
};

interface ToolsSwitcherProps {
  onNavigate?: (page: string, id?: string) => void;
}

export const ToolsSwitcher: React.FC<ToolsSwitcherProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('web');
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  const categories = [
    { id: 'web', label: t('tools.buttons.web'), icon: Globe },
    { id: 'content', label: t('tools.buttons.content'), icon: Megaphone },
    { id: 'auto', label: t('tools.buttons.auto'), icon: Cpu }
  ];

  return (
    <section id="services" className="min-h-screen pt-12 pb-4 lg:pt-16 lg:pb-4 flex flex-col justify-center bg-white text-slate-900 scroll-mt-0">
      <div className="max-w-7xl mx-auto px-6 text-center w-full flex-1 flex flex-col justify-center">
        <h2 className={`${isGeorgian ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-black mb-6 tracking-tight ${isGeorgian ? 'leading-[1.4]' : 'leading-tight'}`}>
          {t('tools.headline')} <span className="text-blue-600">{t('tools.headlineHighlight')}</span>
        </h2>

        {/* Tab List */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 p-1 bg-slate-100 rounded-full w-fit mx-auto shadow-inner border border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`
                flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold transition-all duration-300 text-sm
                ${activeTab === cat.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'}
              `}
            >
              <cat.icon size={14} className={activeTab === cat.id ? 'animate-pulse' : ''} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="relative min-h-[450px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center text-left"
            >
              {/* Text Side */}
              <div className="flex flex-col justify-center space-y-4 h-full order-2 lg:order-1">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-full text-xs uppercase tracking-widest mb-3">
                    {t('tools.featured')}
                  </span>
                  <h3 className={`${isGeorgian ? 'text-lg md:text-xl lg:text-2xl' : 'text-2xl md:text-3xl lg:text-4xl'} font-black text-slate-900 tracking-tight leading-tight`}>
                    {t(`tools.content.${activeTab}.title`)}
                  </h3>
                </div>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium max-w-xl">
                  {t(`tools.content.${activeTab}.description`)}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate && onNavigate('service', activeTab)}
                    className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 group text-base shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1"
                  >
                    {t(`tools.content.${activeTab}.exploreLabel`)}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl border-4 border-slate-100 aspect-video lg:aspect-[4/3] max-h-[500px] w-full order-1 lg:order-2">
                <motion.img
                  src={images[activeTab as keyof typeof images]}
                  alt={activeTab}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section >
  );
};
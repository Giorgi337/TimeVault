
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { BeamButton } from './BeamButton';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  onNavigate?: (page: string, id?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.methodology'), href: '#methodology' },
    { label: t('nav.whyAi'), href: '#why-ai' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ka' : 'en');
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md py-2 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1440px] mx-auto px-8 flex items-center h-20">
        
        {/* Logo Section - Left Aligned */}
        <div 
          className="flex-1 flex items-center cursor-pointer" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (onNavigate) onNavigate('home');
          }}
        >
          <Logo className="w-12 h-12" />
        </div>

        {/* Links Section - Centered */}
        <div className="hidden lg:flex items-center justify-center gap-10 flex-[2]">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-slate-100 hover:text-white transition-colors font-semibold text-lg whitespace-nowrap cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Buttons Section - Right Aligned */}
        <div className="hidden md:flex items-center justify-end gap-6 flex-1 md:mr-8 lg:mr-0">
          
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-slate-300 hover:text-white font-bold transition-colors border border-slate-700 rounded-full px-4 py-2 hover:border-slate-500 hover:bg-slate-800"
          >
            <Globe size={18} />
            <span className="text-sm uppercase">{language === 'en' ? 'EN' : 'GE'}</span>
          </button>

          <BeamButton variant="primary" className="px-8 py-3.5 text-lg whitespace-nowrap">
            {t('nav.cta')}
          </BeamButton>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4 ml-auto">
             <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-slate-300 hover:text-white font-bold"
            >
                <Globe size={20} />
                <span className="text-sm uppercase">{language === 'en' ? 'EN' : 'GE'}</span>
            </button>
            <button 
                className="p-2 text-slate-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 lg:hidden p-8 space-y-6 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-2xl font-bold text-white hover:text-blue-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-5 pt-8 border-t border-slate-800">
            <BeamButton variant="primary" className="w-full text-xl py-5">{t('nav.ctaMobile')}</BeamButton>
          </div>
        </div>
      )}
    </nav>
  );
};

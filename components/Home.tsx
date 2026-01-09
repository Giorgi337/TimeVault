import methodologyImg from '../assets/methodology-visual.png';
import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { ToolsSwitcher } from './ToolsSwitcher';
import { TemplateShowcase } from './TemplateShowcase';
import { Footer } from './Footer';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  onNavigate: (page: string, id?: string) => void;
}

const TiltCard = ({ children }: { children?: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate percentage from center (-0.5 to 0.5)
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative transition-all duration-200 ease-out will-change-transform cursor-pointer group"
    >
      {/* Gloss/Reflection Effect */}
      <motion.div
        className="absolute inset-0 rounded-[40px] z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([xVal, yVal]) => `radial-gradient(circle at ${50 + (xVal as number) * 150}% ${50 + (yVal as number) * 150}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
          ),
          mixBlendMode: 'overlay',
          transform: 'translateZ(80px)'
        }}
      />

      {children}
    </motion.div>
  );
};

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main>
        <Hero />
        <ToolsSwitcher onNavigate={onNavigate} />

        {/* Changed border-y to border-b to remove the line between this section and the previous white section */}
        <section id="methodology" className="min-h-screen flex items-center bg-slate-900 overflow-hidden relative scroll-mt-0">
          <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Image/Rocket Section on Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1 max-w-lg mx-auto lg:max-w-none"
              style={{ perspective: 1200 }}
            >
              <TiltCard>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-1 rounded-[40px] shadow-[0_0_100px_rgba(37,99,235,0.2)] [transform-style:preserve-3d]">
                  <div className="bg-slate-950 rounded-[39px] overflow-hidden aspect-square flex items-center justify-center relative [transform-style:preserve-3d]">
                    <div className="absolute inset-0 bg-slate-950"></div>
                    <img
                      src={methodologyImg}
                      alt="Methodology Presentation"
                      className="w-full h-full object-cover relative z-10"
                      style={{ transform: "translateZ(40px)" }}
                    />
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Text Content Section on Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                {t('home.methodology.badge')}
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                {isGeorgian ? (
                  <>ინოვაცია <span className="text-blue-500">რისკის გარეშე</span></>
                ) : (
                  <>{t('home.methodology.title')} <span className="text-blue-500">{t('home.methodology.titleHighlight')}</span></>
                )}
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-slate-400 font-medium">
                  {t('home.methodology.subtitle')}
                </p>
                <p className="text-lg text-slate-500 leading-relaxed">
                  {t('home.methodology.description')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <TemplateShowcase onNavigate={onNavigate} />
        <Footer />
      </main>
    </>
  );
};
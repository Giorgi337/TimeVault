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
        
        {/* Collaborative Ecosystem Section */}
        {/* Changed border-y to border-b to remove the line between this section and the previous white section */}
        <section id="methodology" className="py-32 bg-slate-900 overflow-hidden relative border-b border-slate-800 scroll-mt-24">
            <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* Image/Rocket Section on Left */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    className="relative order-2 lg:order-1"
                    style={{ perspective: 1200 }}
                >
                    <TiltCard>
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-1 rounded-[40px] shadow-[0_0_100px_rgba(37,99,235,0.2)] [transform-style:preserve-3d]">
                            <div className="bg-slate-950 rounded-[39px] p-8 lg:p-12 overflow-hidden aspect-square flex items-center justify-center relative [transform-style:preserve-3d]">
                                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/vault/800')] bg-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
                                <div className="relative z-10 text-center" style={{ transform: "translateZ(60px)" }}>
                                    <motion.div 
                                        animate={{ y: [0, -20, 0] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                        className="text-8xl lg:text-9xl mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                                    >
                                        🚀
                                    </motion.div>
                                    <div className="text-3xl lg:text-4xl font-black text-white tracking-tighter drop-shadow-xl">{t('home.rocket.ready')}</div>
                                </div>
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Text Content Section on Right */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12 order-1 lg:order-2"
                >
                    <h2 className={`${isGeorgian ? 'text-2xl md:text-3xl lg:text-4xl leading-[1.6]' : 'text-5xl md:text-7xl lg:text-8xl leading-tight'} font-black text-white tracking-tight`}>
                        {t('home.ecosystem.titleLine1')} <br />
                        <span className="text-blue-500">{t('home.ecosystem.titleLine2')}</span>
                    </h2>
                    
                    <div className="space-y-8">
                        <h3 className={`${isGeorgian ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'} text-blue-400 font-bold leading-tight`}>{t('home.ecosystem.subtitle')}</h3>
                        <p className={`${isGeorgian ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} text-slate-400 leading-relaxed font-medium`}>
                            {t('home.ecosystem.desc')}
                        </p>
                    </div>
                </motion.div>
                
            </div>
        </section>

        <TemplateShowcase />
      </main>
      <Footer />
    </>
  );
};
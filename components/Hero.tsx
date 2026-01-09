import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BeamButton } from './BeamButton';
import { Clock, TrendingUp, Megaphone, Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const isGeorgian = language === 'ka';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  // Increased opacity fade-out range from 0.5 to 0.8 to keep content visible longer during scroll
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const handleExploreClick = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const HERO_STATS = [
    { icon: <Clock />, label: t('hero.stats.saveHours'), color: "text-yellow-500", glow: "rgba(234, 179, 8, 0.15)", delay: 0, speed: -250 },
    { icon: <TrendingUp />, label: t('hero.stats.increaseRoi'), color: "text-yellow-400", glow: "rgba(234, 179, 8, 0.15)", delay: 0, speed: -120 },
    { icon: <Megaphone />, label: t('hero.stats.boostAwareness'), color: "text-yellow-500", glow: "rgba(234, 179, 8, 0.2)", delay: 0, speed: -450 },
    { icon: <Rocket />, label: t('hero.stats.pullAway'), color: "text-yellow-400", glow: "rgba(234, 179, 8, 0.15)", delay: 0, speed: -180 },
  ];

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex flex-col items-center justify-center pt-20 pb-20 md:pt-28 md:pb-24 overflow-hidden bg-slate-950">

      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-yellow-500/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Massive Background Text */}
      <motion.div
        style={{ y: bgTextY }}
        // Adjusted bottom position to make text sit at the bottom edge
        className="absolute bottom-[-3%] left-0 w-full flex justify-center items-end pointer-events-none select-none z-0 overflow-visible"
      >
        <h2
          className="text-[18vw] md:text-[15vw] font-black leading-none tracking-[-0.05em] text-blue-500/[0.05] uppercase whitespace-nowrap transition-opacity text-center w-full"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          TIMEVAULT
        </h2>
      </motion.div>

      <motion.div
        style={{ y, opacity, scale }}
        // Tablet adjustments:
        // 1. md:max-w-2xl (was 3xl) to narrow text block and prevent overlap with side icons
        // 2. md:-mt-24 (was md:mt-0) to pull text up significantly to visual center/upper-middle on tablet
        className="relative z-20 text-center px-4 md:px-12 max-w-5xl md:max-w-2xl lg:max-w-4xl flex flex-col items-center mt-8 md:-mt-24 md:landscape:-mt-24 lg:mt-12"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          // Increased font sizes as requested: text-5xl/7xl/8xl (was 4xl/6xl/7xl)
          className={`${isGeorgian ? 'text-lg md:text-3xl lg:text-4xl' : 'text-3xl md:text-4xl lg:text-5xl'} leading-tight ${isGeorgian ? 'tracking-normal' : 'tracking-tighter'} font-black mb-6 md:mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]`}
        >
          {t('hero.titleLine1')} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-500 pb-2 pr-2 inline-block">
            {t('hero.titleLine2')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className={`text-base md:text-lg max-w-2xl text-slate-300 mb-8 md:mb-10 mx-auto font-medium drop-shadow-lg`}
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          className="flex items-center justify-center w-full"
        >
          <BeamButton
            variant="secondary"
            className="px-8 py-4 text-base w-full sm:w-auto shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)] transition-all min-w-[180px]"
            onClick={handleExploreClick}
          >
            {t('hero.cta')}
          </BeamButton>
        </motion.div>

        {/* Responsive Symmetrical Grid for Mobile */}
        <div className="md:hidden grid grid-cols-2 gap-3 mt-12 w-full max-w-sm px-2">
          {HERO_STATS.map((stat, idx) => (
            <StatChip
              key={idx}
              icon={stat.icon}
              label={stat.label}
              color={stat.color}
              delay={0}
              glowColor={stat.glow}
            />
          ))}
        </div>
      </motion.div>

      {/* Desktop/Tablet Floating Assets - Customized positions for Tablet to prevent overlap */}
      <div className="absolute inset-0 pointer-events-none z-30 hidden md:block">
        <FloatingAsset
          icon={<Clock className="text-yellow-500" />}
          label={t('hero.stats.saveHours')}
          delay={0}
          // Tablet Landscape: Adjusted to be closer to center (18% top, 10% left) from corner
          className={`top-[25%] left-[10%] md:top-[12%] md:left-[2%] md:landscape:top-[18%] md:landscape:left-[6%] lg:top-[15%] ${isGeorgian ? 'lg:left-[14%]' : 'lg:left-[18%]'}`}
          progress={scrollYProgress}
          speed={-250}
          glowColor="rgba(234, 179, 8, 0.15)"
        />
        <FloatingAsset
          icon={<TrendingUp className="text-yellow-400" />}
          label={t('hero.stats.increaseRoi')}
          delay={0}
          // Tablet Landscape: Adjusted to be closer to center (18% top, 10% right) from corner
          className={`top-[20%] right-[15%] md:top-[10%] md:right-[4%] md:landscape:top-[18%] md:landscape:right-[10%] lg:top-[12%] lg:right-[22%]`}
          progress={scrollYProgress}
          speed={-120}
          glowColor="rgba(234, 179, 8, 0.15)"
        />
        <FloatingAsset
          icon={<Megaphone className="text-yellow-500" />}
          label={t('hero.stats.boostAwareness')}
          delay={0}
          // Tablet Landscape: Adjusted to be closer to center (20% bottom, 10% left) from corner
          className={`bottom-[35%] left-[18%] md:bottom-[30%] md:left-[4%] md:landscape:bottom-[30%] md:landscape:left-[10%] lg:bottom-[30%] lg:left-[20%]`}
          progress={scrollYProgress}
          speed={-450}
          glowColor="rgba(234, 179, 8, 0.2)"
        />
        <FloatingAsset
          icon={<Rocket className="text-yellow-400" />}
          label={t('hero.stats.pullAway')}
          delay={0}
          // Tablet Landscape: Adjusted to be closer to center (20% bottom, 10% right) from corner
          className={`bottom-[25%] right-[15%] md:bottom-[25%] md:right-[4%] md:landscape:bottom-[25%] md:landscape:right-[10%] lg:bottom-[25%] lg:right-[18%]`}
          progress={scrollYProgress}
          speed={-180}
          glowColor="rgba(234, 179, 8, 0.15)"
        />
      </div>

    </section>
  );
};

const StatChip: React.FC<{
  icon: React.ReactNode,
  label: string,
  color: string,
  delay: number,
  glowColor: string,
}> = ({ icon, label, color, delay, glowColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 3, ease: "easeOut", delay: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center justify-center gap-2 bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group"
      style={{ boxShadow: `0 10px 30px ${glowColor}` }}
    >
      <motion.div
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute inset-0 bg-white ${color.replace('text-', 'bg-')}`}
      />
      <div className={`p-2 bg-white/5 rounded-lg ${color} relative z-10`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-wider text-slate-100 text-center leading-tight relative z-10`}>{label}</span>
    </motion.div>
  );
};

const FloatingAsset: React.FC<{
  icon: React.ReactNode,
  label: string,
  className: string,
  delay: number,
  progress: any,
  speed: number,
  glowColor?: string,
}> = ({ icon, label, className, delay, progress, speed, glowColor = "transparent" }) => {
  const y = useTransform(progress, [0, 1], [0, speed]);

  return (
    <motion.div
      style={{ y }}
      className={`absolute ${className} z-10 pointer-events-none`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          opacity: { duration: 3, ease: "easeOut", delay },
          scale: { duration: 3, ease: "easeOut", delay }
        }}
        style={{ boxShadow: `0 0 30px ${glowColor}` }}
        // Reduced padding (p-4 -> p-3) and rounded-2xl. Increased slightly to p-3.5 for larger font.
        className="flex items-center gap-1.5 bg-slate-900/95 backdrop-blur-2xl p-3 rounded-xl border border-white/30 shadow-2xl hover:border-white/50 hover:bg-slate-800 transition-colors duration-300 group cursor-default pointer-events-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Reduced icon container padding (p-2 -> p-1.5) and icon size (20 -> 16 -> 18) */}
        <div className="p-2 bg-white/10 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-inner">
          {React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}
        </div>
        {/* Reduced text size (text-[13px] -> text-xs -> text-sm) */}
        <span className={`text-xs font-extrabold whitespace-nowrap text-slate-50 group-hover:text-yellow-400 transition-colors tracking-tight`}>{label}</span>
      </motion.div>
    </motion.div>
  );
};
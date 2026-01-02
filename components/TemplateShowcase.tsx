import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeamButton } from './BeamButton';
import { AlertCircle, ArrowRight, RefreshCcw, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const TemplateShowcase: React.FC = () => {
    const [status, setStatus] = useState<'intro' | 'playing' | 'reveal'>('intro');
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const { t, language } = useLanguage();
    const isGeorgian = language === 'ka';

    const questions = [
        {
            id: 1,
            question: t('showcase.playing.q1'),
            images: [
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800"
            ]
        },
        {
            id: 2,
            question: t('showcase.playing.q2'),
            images: [
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
            ]
        },
        {
            id: 3,
            question: t('showcase.playing.q3'),
            images: [
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
            ]
        }
    ];

    const handleNext = () => {
        // Add a small delay after selection to simulate processing
        setTimeout(() => {
            setSelectedImage(null);
            if (currentQIndex < questions.length - 1) {
                setCurrentQIndex(prev => prev + 1);
            } else {
                setStatus('reveal');
            }
        }, 400);
    };

    const handleSelect = (imgIndex: number) => {
        setSelectedImage(imgIndex);
        handleNext();
    };

    const handleRestart = () => {
        setSelectedImage(null);
        setCurrentQIndex(0);
        setStatus('playing');
    };

    return (
        <section id="why-ai" className="py-12 md:py-16 bg-slate-50 scroll-mt-24 flex items-center justify-center relative">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-blue-200 blur-[100px] rounded-full mix-blend-multiply"></div>
                <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-yellow-200 blur-[100px] rounded-full mix-blend-multiply"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
                <AnimatePresence mode="wait">
                    
                    {/* STATE: INTRO */}
                    {status === 'intro' && (
                        <motion.div 
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center max-w-3xl mx-auto py-12"
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-slate-200 text-slate-600 text-sm font-bold uppercase tracking-widest mb-6">
                                {t('showcase.tag')}
                            </span>
                            <h2 className={`${isGeorgian ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-5xl md:text-7xl'} font-black text-slate-900 mb-8 tracking-tight ${isGeorgian ? 'leading-[1.6]' : 'leading-tight'}`}>
                                {t('showcase.titleLine1')} <br /> 
                                <span className="text-blue-600">{t('showcase.titleLine2')}</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                                {t('showcase.desc')}
                            </p>
                            <button 
                                onClick={() => setStatus('playing')}
                                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-slate-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 hover:bg-slate-800 text-xl"
                            >
                                {t('showcase.cta')}
                                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}

                    {/* STATE: PLAYING */}
                    {status === 'playing' && (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="w-full py-8"
                        >
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h3 className={`${isGeorgian ? 'text-2xl' : 'text-3xl'} font-black text-slate-900`}>{questions[currentQIndex].question}</h3>
                                    <p className="text-slate-500 mt-2">{t('showcase.playing.instruction')}</p>
                                </div>
                                <div className="text-2xl font-bold text-slate-300">
                                    0{currentQIndex + 1}<span className="text-slate-200">/03</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {questions[currentQIndex].images.map((img, idx) => (
                                    <motion.div 
                                        key={`${currentQIndex}-${idx}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => handleSelect(idx)}
                                        className={`
                                            aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer relative group border-4 transition-all duration-300
                                            ${selectedImage === idx ? 'border-blue-600 scale-[0.98]' : 'border-transparent hover:border-slate-200 hover:shadow-xl'}
                                        `}
                                    >
                                        <img src={img} alt="Quiz Option" className="w-full h-full object-cover" />
                                        
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                                            <div className="bg-white/90 backdrop-blur text-slate-900 px-6 py-3 rounded-full font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                {t('showcase.playing.hover')}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STATE: REVEAL */}
                    {status === 'reveal' && (
                        <motion.div
                            key="reveal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative"
                        >
                            {/* Left Box: Results */}
                            <div className="relative">
                                {/* Background Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-yellow-400 rounded-[2.5rem] opacity-20 blur-xl"></div>
                                
                                <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl relative border border-slate-100 overflow-hidden text-center">
                                     {/* Subtle inner texture */}
                                     <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-yellow-500 to-blue-500"></div>
                                     
                                     <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest">
                                        <AlertCircle size={14} />
                                        {t('showcase.results.tag')}
                                    </div>

                                    <div className="mb-6 scale-90 md:scale-100 origin-center">
                                        <div className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter mb-2 leading-none">
                                            100%
                                        </div>
                                        <div className="text-slate-900 font-bold text-sm md:text-base uppercase tracking-widest">
                                            {t('showcase.results.accuracy')}
                                        </div>
                                    </div>

                                    <div className="relative bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl transform transition-transform duration-500">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-slate-900 p-1.5 rounded-full border-4 border-white">
                                            <Check size={24} strokeWidth={4} />
                                        </div>
                                        <p className="pt-4 text-xl md:text-2xl leading-tight font-bold text-white">
                                            {t('showcase.results.messagePart1')} <span className="text-yellow-400">{t('showcase.results.messageHighlight')}</span>{t('showcase.results.messagePart2')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Copy */}
                            <div className="space-y-6 relative">
                                <h2 className={`${isGeorgian ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'} font-black text-slate-900 ${isGeorgian ? 'leading-[1.6]' : 'leading-[1.1]'}`}>
                                    {t('showcase.results.rightSideTitle1')} <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">
                                        {t('showcase.results.rightSideTitle2')}
                                    </span>
                                </h2>
                                
                                <div className="space-y-4 text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                                    <p>
                                        {t('showcase.results.rightSideP1')}
                                    </p>
                                    <p className="text-slate-800">
                                        {t('showcase.results.rightSideP2')}
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <BeamButton 
                                        variant="premium" 
                                        className="px-8 py-4 text-lg w-full md:w-auto justify-center"
                                        onClick={handleRestart}
                                    >
                                        <div className="flex items-center gap-3">
                                            <RefreshCcw size={20} />
                                            {t('showcase.results.restart')}
                                        </div>
                                    </BeamButton>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </section>
    );
};
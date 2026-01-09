import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BeamButton } from './BeamButton';
import { BookingModal } from './BookingModal';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServicePageProps {
    serviceId: string;
    onNavigate: (page: string, id?: string) => void;
}

import webImg from '../assets/web-development.png';
import autoImg from '../assets/automation-dashboard.jpg';

const images: Record<string, string> = {
    web: webImg,
    auto: autoImg,
    content: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
};

export const ServicePage: React.FC<ServicePageProps> = ({ serviceId, onNavigate }) => {
    const [isBookingOpen, setBookingOpen] = useState(false);
    const { t, language } = useLanguage();
    const isGeorgian = language === 'ka';

    // Retrieve the specific service object from the translations
    const serviceData = t(`servicePage.services.${serviceId}`);
    const fallbackData = t(`servicePage.services.web`);

    // Use fallback if ID not found (should generally not happen if keys match)
    const data = serviceData || fallbackData;
    const image = images[serviceId] || images['web'];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [serviceId]);

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-slate-950 pb-12">
                <Navbar onNavigate={onNavigate} />
                {/* Increased padding-top to pt-28 (mobile) and pt-36 (desktop) to ensure content clears the fixed Navbar */}
                <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-24 text-center md:text-left">
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => onNavigate('home')}
                        className="relative z-20 flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        {t('servicePage.backHome')}
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">{data.title}</span>
                        <h1 className={`${isGeorgian ? 'text-3xl md:text-5xl' : 'text-4xl md:text-6xl'} font-black text-white max-w-4xl ${isGeorgian ? 'leading-[1.6]' : 'leading-tight'}`}>{data.subtitle}</h1>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-3xl overflow-hidden shadow-2xl mb-16 border-4 border-white"
                >
                    <img src={image} alt={data.title} className="w-full h-[400px] md:h-[600px] object-cover" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
                    <div className="md:col-span-2 space-y-12">
                        <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-medium">
                            {data.description && Array.isArray(data.description) && data.description.map((para: string, i: number) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('servicePage.keyCapabilities')}</h3>
                            <div className="grid gap-6">
                                {data.features && Array.isArray(data.features) && data.features.map((feat: any, i: number) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                            <Check size={16} strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{feat.title}</h4>
                                            <p className="text-slate-600 text-sm">{feat.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-900 text-white p-8 rounded-3xl sticky top-24 shadow-2xl shadow-blue-900/20">
                            <h3 className="text-2xl font-bold mb-6">{t('servicePage.whyChoose')}</h3>
                            <ul className="space-y-4 mb-8">
                                {data.benefits && Array.isArray(data.benefits) && data.benefits.map((benefit: string, i: number) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                            <BeamButton onClick={() => setBookingOpen(true)} variant="secondary" className="w-full justify-center">
                                {t('servicePage.schedule')}
                            </BeamButton>
                            <p className="mt-4 text-center text-xs text-slate-500 uppercase tracking-wider font-bold">{t('servicePage.riskFree')}</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <BookingModal isOpen={isBookingOpen} onClose={() => setBookingOpen(false)} />
        </div>
    );
};
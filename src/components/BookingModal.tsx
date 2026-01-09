import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[110]"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
                        onClick={onClose}
                    >
                        <div
                            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden h-[85vh] flex flex-col pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >

                            {/* Header / Close Button */}
                            <div className="absolute top-4 right-4 z-10">
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-slate-100/50 hover:bg-slate-200 text-slate-500 hover:text-red-500 rounded-full transition-colors backdrop-blur-sm"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Iframe Content */}
                            <div className="flex-1 w-full h-full min-h-[600px] overflow-hidden bg-white">
                                <iframe
                                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1DPbZyN6cJ4gKb0DMumHCZ0CybKQMMS7bVXdRBFA-3oi38FocVpsr1914USGI_02fTtG-ZH6-F?gv=true"
                                    style={{ border: 0 }}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    title="Schedule Appointment"
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

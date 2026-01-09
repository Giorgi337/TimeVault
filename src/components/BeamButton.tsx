
import React from 'react';

interface BeamButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'premium';
  className?: string;
  onClick?: () => void;
}

export const BeamButton: React.FC<BeamButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick 
}) => {
  const baseStyles = "relative px-8 py-3 rounded-full font-bold transition-all duration-300 overflow-hidden group active:scale-95";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]",
    secondary: "bg-yellow-500 text-slate-950 hover:bg-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]",
    outline: "border-2 border-slate-700 text-white hover:border-blue-500 hover:text-blue-400",
    premium: "bg-slate-900 text-white hover:bg-slate-800 shadow-xl border border-slate-800"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {/* Beam Effect */}
      <span className="absolute inset-0 w-full h-full scale-0 group-hover:scale-150 transition-transform duration-700 ease-out bg-white/10 rounded-full"></span>
      
      {/* Moving Border Beam (Simulated) */}
      <span className="absolute top-0 left-[-100%] w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent group-hover:left-[100%] transition-all duration-1000 ease-in-out"></span>
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Bottom Glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </button>
  );
};

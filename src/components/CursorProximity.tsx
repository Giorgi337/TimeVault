
import React, { useState, useEffect } from 'react';

export const CursorProximity: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-[9999] w-[350px] h-[350px] rounded-full mix-blend-screen"
      style={{
        background: `radial-gradient(circle at center, rgba(14, 165, 233, 0.12) 0%, transparent 70%)`,
        left: position.x - 175,
        top: position.y - 175,
        transition: 'transform 0.12s ease-out'
      }}
    />
  );
};

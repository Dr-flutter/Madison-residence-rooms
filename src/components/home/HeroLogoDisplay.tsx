import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface HeroLogoDisplayProps {
  className?: string;
}

const HeroLogoDisplay = ({ className }: HeroLogoDisplayProps) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isAnimated) {
      const interval = setInterval(() => {
        setHoverState(prev => !prev);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isAnimated]);
  
  return (
    <div className={cn(
      "relative w-full h-full flex items-center justify-center overflow-hidden",
      className
    )}>
      {/* Animated rings */}
      <div className={cn(
        "absolute w-[150%] h-[150%] border-2 border-burgundy/10 rounded-full transition-all duration-[3s] opacity-0",
        isAnimated && "opacity-100 animate-[spin_20s_linear_infinite]"
      )} />
      
      <div className={cn(
        "absolute w-[120%] h-[120%] border border-white/5 rounded-full transition-all duration-[2s] opacity-0",
        isAnimated && "opacity-100 animate-[spin_15s_linear_reverse_infinite]"
      )} />
      
      {/* Pulse effect */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-burgundy/5 opacity-0 scale-90 transition-all duration-[1.5s]",
        isAnimated && "animate-[pulse_8s_ease-in-out_infinite]",
        hoverState && "opacity-30"
      )} />
      
      {/* Logo container */}
      <div className={cn(
        "relative z-10 w-full h-full flex items-center justify-center p-6 transform transition-all duration-700",
        isAnimated ? "opacity-100 scale-100" : "opacity-0 scale-90",
        hoverState && "scale-105"
      )}>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Highlight effect */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r from-white/10 via-burgundy/5 to-transparent rounded-full opacity-0 transition-opacity duration-700",
            isAnimated && "opacity-100"
          )} />
          
          <img 
            src="/src/assets/image.png"
            alt="Résidence Madison Logo"
            className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
          />
          
          {/* Subtle rotating highlight */}
          <div className={cn(
            "absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full opacity-0",
            isAnimated && "opacity-100 animate-[spin_10s_linear_infinite]"
          )} />
        </div>
      </div>
      
      {/* Sparkling effect */}
      {isAnimated && Array.from({ length: 5 }).map((_, i) => (
        <div 
          key={i}
          className={cn(
            "absolute w-1 h-1 bg-white rounded-full opacity-0",
            `animate-[ping_${2 + i}s_ease-in-out_${i * 0.7}s_infinite]`
          )}
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${15 + Math.random() * 70}%`,
          }}
        />
      ))}
    </div>
  );
};

export default HeroLogoDisplay;


import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LogoDisplayProps {
  className?: string;
  showBackground?: boolean;
}

const LogoDisplay = ({ className, showBackground = true }: LogoDisplayProps) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center overflow-hidden transition-all duration-500",
        isAnimated ? "opacity-100" : "opacity-0",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showBackground && (
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy-950/10 via-burgundy-900/5 to-black/0 rounded-lg" />
      )}
      
      <div 
        className={cn(
          "relative z-10 transform transition-all duration-500 flex items-center justify-center p-4",
          isHovered && "scale-105"
        )}
      >
        <div className={cn(
          "absolute inset-0 rounded-full opacity-0 bg-white/5",
          isAnimated && "animate-ping opacity-100"
        )} />
        
        <img 
          src="/src/assets/image.png" 
          alt="Résidence Madison Logo" 
          className={cn(
            "max-h-full max-w-full object-contain transition-all duration-500 transform",
            isHovered ? "drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]" : "drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]"
          )}
        />
      </div>

      {/* Decorative elements */}
      <div className={cn(
        "absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-burgundy/20 transition-all duration-500",
        isHovered && "scale-110"
      )} />
      <div className={cn(
        "absolute -top-6 -left-6 w-16 h-16 rounded-full border border-burgundy/10 transition-all duration-500",
        isHovered && "scale-110"
      )} />
    </div>
  );
};

export default LogoDisplay;

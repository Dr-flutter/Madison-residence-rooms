
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import LogoDisplay from '../LogoDisplay';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen min-h-[600px] bg-gray-900 overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-3000"
        style={{ 
          backgroundImage: "url('/images/hero-bg.jpg')",
          filter: "brightness(0.65)",
          transform: isLoaded ? "scale(1.02)" : "scale(1)",
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          <span className={`text-burgundy-100 text-sm sm:text-base font-medium tracking-wider uppercase mb-4 block transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Bienvenue à Kribi
          </span>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight transform transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            La<br />
            <span className="text-burgundy-100">Résidence Madison</span>
          </h1>
          
          <p className={`text-white/90 text-lg md:text-xl mb-8 max-w-xl transform transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Un havre de paix situé à quelques pas de l'océan Atlantique à Kribi. 
            Profitez de chambres confortables et d'un service exceptionnel pour un séjour inoubliable.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link to="/chambres">
              <Button size="lg" className="bg-burgundy hover:bg-burgundy-800 group">
                Découvrir nos chambres
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/reservation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Réserver maintenant
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Logo Display */}
        <div className={`absolute bottom-32 sm:bottom-auto sm:top-40 right-10 hidden sm:block transform transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="absolute -inset-6">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-burgundy/20 via-white/5 to-transparent blur-lg opacity-50"></div>
            </div>
            <div className="relative h-40 w-40 lg:h-48 lg:w-48">
              <LogoDisplay showBackground={false} className="h-full w-full" />
            </div>
          </div>
        </div>

        {/* Floating decoration */}
        <div className={`absolute bottom-10 right-10 hidden lg:block w-96 h-96 border-2 border-burgundy/20 rounded-full transform transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-burgundy/30 rounded-full" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transform transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-white/70 text-sm mb-2">Scroll</span>
        <div className="w-0.5 h-8 bg-white/30 animate-pulse" />
      </div>
    </div>
  );
};

export default Hero;

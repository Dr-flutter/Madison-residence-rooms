
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Room } from '@/types';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/helpers';

interface FeaturedRoomsProps {
  rooms: Room[];
}

const FeaturedRooms = ({ rooms }: FeaturedRoomsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Get only the featured rooms (max 6)
  const featuredRooms = rooms
    .filter(room => room.featured)
    .slice(0, 6);
  
  const goToPrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? featuredRooms.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === featuredRooms.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // If no featured rooms, don't render the section
  if (featuredRooms.length === 0) {
    return null;
  }
  
  return (
    <section ref={sectionRef} className="relative py-20 bg-white overflow-hidden">
      <div className={`container mx-auto px-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <span className="text-burgundy uppercase font-medium tracking-wider text-sm">Nos chambres</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Découvrez nos meilleures chambres</h2>
          </div>
          <Link to="/chambres" className="mt-4 md:mt-0 group flex items-center text-burgundy font-medium">
            Voir toutes nos chambres
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => {
            const delay = 100 * (index % 3);
            
            return (
              <div 
                key={room.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden card-hover transition-all duration-700 delay-${delay} transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <Link to={`/chambres/${room.id}`} className="block relative aspect-[4/3] overflow-hidden group">
                  <img 
                    src={room.images[0]} 
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                      Découvrir
                    </Button>
                  </div>
                  
                  {room.promo && (
                    <span className="absolute top-4 right-4 bg-burgundy text-white text-xs font-bold px-2 py-1 rounded">
                      PROMO
                    </span>
                  )}
                </Link>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{room.name}</h3>
                    <div className="text-right">
                      <span className="text-burgundy font-bold">{formatPrice(room.price)}</span>
                      <span className="block text-xs text-gray-500">par nuit</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {room.shortDescription || room.description.substring(0, 100)}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        +{room.amenities.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <Link to={`/chambres/${room.id}`} className="text-burgundy font-medium text-sm flex items-center hover:underline">
                    En savoir plus
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-burgundy/5 rounded-full"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-burgundy/5 rounded-full"></div>
    </section>
  );
};

export default FeaturedRooms;

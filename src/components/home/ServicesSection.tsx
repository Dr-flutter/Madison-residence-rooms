
import { useRef, useState, useEffect } from 'react';
import { Bed, Utensils, Map, Car, Wifi, ShieldCheck, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { Service } from '@/types';
import { Link } from 'react-router-dom';

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Map service icons to Lucide components
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'bed': return <Bed className="h-10 w-10 text-burgundy" />;
      case 'utensils': return <Utensils className="h-10 w-10 text-burgundy" />;
      case 'map': return <Map className="h-10 w-10 text-burgundy" />;
      case 'car': return <Car className="h-10 w-10 text-burgundy" />;
      case 'wifi': return <Wifi className="h-10 w-10 text-burgundy" />;
      case 'parking': return <ShieldCheck className="h-10 w-10 text-burgundy" />;
      case 'bell': return <Clock className="h-10 w-10 text-burgundy" />;
      default: return <Bed className="h-10 w-10 text-burgundy" />;
    }
  };

  // Filter featured services for the home page
  const featuredServices = services.filter(service => service.featured);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-burgundy/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-burgundy/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <span className="text-burgundy uppercase font-medium tracking-wider text-sm">Nos services</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Découvrez nos prestations</h2>
          </div>
          <Link to="/services" className="mt-4 md:mt-0 group flex items-center text-burgundy font-medium">
            Tous nos services
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => {
            const delay = 100 * (index % 3);
            
            return (
              <div 
                key={service.id}
                className={`bg-white rounded-xl shadow-sm p-6 border border-gray-50 hover:shadow-lg transition-all duration-500 delay-${delay} transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="bg-burgundy/10 rounded-full p-4 inline-flex mb-5">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to="/services" className="text-burgundy font-medium text-sm flex items-center hover:underline">
                  En savoir plus
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

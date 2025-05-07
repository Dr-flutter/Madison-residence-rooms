
import { useRef, useState, useEffect } from 'react';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LocationSection = () => {
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

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <span className="text-burgundy uppercase font-medium tracking-wider text-sm">Nous trouver</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Notre Emplacement</h2>
            <p className="text-gray-600 max-w-xl mt-4">
              Idéalement située à Kribi, la Résidence Madison vous offre un accès facile aux plus beaux attraits de la région.
            </p>
          </div>
          
          <Link to="/contact" className="mt-6 md:mt-0">
            <Button className="bg-burgundy hover:bg-burgundy-800">
              Nous contacter
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className={`lg:col-span-2 rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <iframe 
              title="Résidence Madison Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15923.969218806211!2d9.896184099999999!3d2.9365807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10590511bdee65d1%3A0xf2158703e7c74440!2sKribi%2C%20Cameroun!5e0!3m2!1sfr!2sfr!4v1651930645781!5m2!1sfr!2sfr"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="w-full h-full"
            />
          </div>
          
          {/* Contact Info */}
          <div className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold mb-8 text-burgundy border-b border-gray-100 pb-4">Comment nous trouver</h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-burgundy/10 rounded-full p-3 mr-4">
                  <MapPin className="h-6 w-6 text-burgundy" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Adresse</h4>
                  <p className="text-gray-600">
                    Résidence Madison, Kribi Plage<br />
                    À 500 m du campement des pêcheurs<br />
                    Kribi, Région du Sud, Cameroun
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-burgundy/10 rounded-full p-3 mr-4">
                  <Phone className="h-6 w-6 text-burgundy" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Téléphone</h4>
                  <p className="text-gray-600">
                    <a href="tel:+237690000000" className="hover:text-burgundy transition-colors">
                      +237 6 90 00 00 00
                    </a>
                  </p>
                  <p className="text-gray-600 mt-1">
                    WhatsApp: 
                    <a href="https://wa.me/237690000000" className="hover:text-burgundy transition-colors ml-1" target="_blank" rel="noopener noreferrer">
                      +237 6 90 00 00 00
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-burgundy/10 rounded-full p-3 mr-4">
                  <Mail className="h-6 w-6 text-burgundy" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-600">
                    <a href="mailto:contact@residencemadison.com" className="hover:text-burgundy transition-colors">
                      contact@residencemadison.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">À proximité</h4>
                <ul className="space-y-2">
                  {[
                    { name: 'Plage de Kribi', distance: '2 min à pied' },
                    { name: 'Port de pêche', distance: '10 min à pied' },
                    { name: 'Chutes de la Lobé', distance: '15 min en voiture' },
                    { name: 'Centre-ville de Kribi', distance: '5 min en voiture' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-burgundy mr-1" />
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-500 text-sm ml-auto">{item.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;


import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-burgundy-900 to-burgundy-800 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-60 h-60 rounded-full border-4 border-white"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border-4 border-white"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-4 border-white"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
          Une expérience unique vous attend à<br />la Résidence Madison
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
          Réservez dès maintenant et profitez d'un séjour exceptionnel à Kribi avec une vue imprenable sur l'océan Atlantique.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Link to="/reservation" className="w-full">
            <Button size="lg" className="w-full bg-white text-burgundy hover:bg-burgundy-50 group">
              Réserver maintenant
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/contact" className="w-full">
            <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10">
              Contactez-nous
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;


import Layout from '@/components/Layout';
import { servicesData } from '@/data/mockData';
import { Bed, Utensils, Map, Car, Wifi, ShieldCheck, Clock } from 'lucide-react';

const Services = () => {
  // Map service icons to Lucide components
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'bed': return <Bed className="h-12 w-12 text-burgundy" />;
      case 'utensils': return <Utensils className="h-12 w-12 text-burgundy" />;
      case 'map': return <Map className="h-12 w-12 text-burgundy" />;
      case 'car': return <Car className="h-12 w-12 text-burgundy" />;
      case 'wifi': return <Wifi className="h-12 w-12 text-burgundy" />;
      case 'parking': return <ShieldCheck className="h-12 w-12 text-burgundy" />;
      case 'bell': return <Clock className="h-12 w-12 text-burgundy" />;
      default: return <Bed className="h-12 w-12 text-burgundy" />;
    }
  };

  return (
    <Layout>
      <section className="bg-gray-50 py-10 pt-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chez Résidence Madison, nous offrons un ensemble de services pour rendre votre séjour à Kribi agréable et mémorable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-6">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Services supplémentaires sur demande</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-burgundy">Excursions</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Visite des chutes de la Lobé</li>
                  <li>Balades en pirogue</li>
                  <li>Pêche en haute mer</li>
                  <li>Visite du port de pêche</li>
                  <li>Visite des villages pygmées</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3 text-burgundy">Restauration</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Petit-déjeuner continental (inclus)</li>
                  <li>Repas traditionnels camerounais</li>
                  <li>Fruits de mer frais</li>
                  <li>Service en chambre</li>
                  <li>Dîner romantique sur commande</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3 text-burgundy">Transport</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Navette aéroport Douala ↔ Kribi</li>
                  <li>Location de véhicules</li>
                  <li>Service de taxi privé</li>
                  <li>Transport vers les sites touristiques</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <p className="text-center text-gray-600">
                Pour réserver ces services ou pour plus d'informations, veuillez contacter notre réception au 
                <a href="tel:+237690000000" className="text-burgundy hover:underline mx-1">+237 6 90 00 00 00</a> 
                ou par email à 
                <a href="mailto:contact@residencemadison.com" className="text-burgundy hover:underline mx-1">contact@residencemadison.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;

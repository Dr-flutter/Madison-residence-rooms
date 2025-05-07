
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 pt-24 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-burgundy mb-4">À propos de nous</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez l'histoire et les valeurs de la Résidence Madison, votre havre de paix à Kribi.
          </p>
        </motion.div>

        <Tabs defaultValue="history" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">Notre Histoire</TabsTrigger>
            <TabsTrigger value="values">Nos Valeurs</TabsTrigger>
            <TabsTrigger value="team">Notre Équipe</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-burgundy mb-4">Notre parcours depuis 2017</h2>
                    <p className="mb-4 text-gray-700">
                      Fondée en 2017 par Madame Jeanne Ndam, la Résidence Madison est née d'un rêve : 
                      offrir aux voyageurs un lieu où l'authenticité camerounaise rencontre le confort moderne.
                    </p>
                    <p className="mb-4 text-gray-700">
                      Ce qui a commencé comme une petite maison d'hôtes s'est transformé au fil des années 
                      en une résidence reconnue, tout en préservant l'atmosphère chaleureuse et familiale qui fait notre signature.
                    </p>
                    <p className="text-gray-700">
                      Chaque pierre, chaque détail de décoration raconte une histoire, celle d'un établissement 
                      qui grandit avec sa clientèle et qui s'adapte constamment pour offrir le meilleur de l'hospitalité camerounaise.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
                      alt="Paysage de Kribi" 
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="values" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
                      alt="Valeurs de la Résidence Madison" 
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <h2 className="text-2xl font-semibold text-burgundy mb-4">Nos valeurs fondamentales</h2>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-burgundy rounded-full p-1 mr-3 mt-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <h3 className="font-medium">Authenticité</h3>
                          <p className="text-gray-700">Nous célébrons et partageons la culture camerounaise dans chaque aspect de votre séjour.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-burgundy rounded-full p-1 mr-3 mt-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <h3 className="font-medium">Excellence</h3>
                          <p className="text-gray-700">Nous visons l'excellence dans chaque détail, du service à la propreté.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-burgundy rounded-full p-1 mr-3 mt-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <h3 className="font-medium">Hospitalité</h3>
                          <p className="text-gray-700">Nous croyons que chaque client mérite de se sentir comme chez lui, dans un environnement chaleureux.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-burgundy rounded-full p-1 mr-3 mt-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <h3 className="font-medium">Développement durable</h3>
                          <p className="text-gray-700">Nous nous engageons à préserver la beauté naturelle de Kribi pour les générations futures.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-burgundy mb-6 text-center">L'équipe qui vous accueille</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 border-4 border-burgundy">
                      <img 
                        src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
                        alt="Jeanne Ndam" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">Jeanne Ndam</h3>
                    <p className="text-burgundy">Fondatrice & Directrice</p>
                    <p className="text-gray-700 mt-2">
                      Passionnée d'hospitalité depuis plus de 20 ans, Jeanne a créé la Résidence Madison 
                      pour partager son amour de Kribi avec le monde.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 border-4 border-burgundy">
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                        alt="Sophie Mbarga" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">Sophie Mbarga</h3>
                    <p className="text-burgundy">Responsable Accueil</p>
                    <p className="text-gray-700 mt-2">
                      Avec son sourire chaleureux et sa connaissance parfaite de la région, 
                      Sophie rend chaque séjour mémorable.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 border-4 border-burgundy">
                      <img 
                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                        alt="Paul Etoga" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">Paul Etoga</h3>
                    <p className="text-burgundy">Chef Cuisinier</p>
                    <p className="text-gray-700 mt-2">
                      Maître des saveurs locales, Paul transforme les produits frais de Kribi 
                      en expériences gastronomiques uniques.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-burgundy mb-6 text-center">Notre engagement envers vous</h2>
              <p className="text-gray-700 text-center max-w-2xl mx-auto">
                À la Résidence Madison, nous nous engageons à faire de votre séjour à Kribi une expérience inoubliable. 
                Du moment où vous réservez jusqu'à votre départ, chaque membre de notre équipe est dévoué à votre confort et votre satisfaction.
                Nous sommes fiers de notre héritage camerounais et impatients de vous le faire découvrir.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;

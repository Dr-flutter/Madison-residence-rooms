
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const ReservationConfirmed = () => {
  return (
    <Layout>
      <div className="bg-gray-50 py-16 pt-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Réservation Confirmée !</h1>
            
            <div className="mb-6 text-gray-600">
              <p className="mb-2">
                Merci d'avoir choisi la Résidence Madison pour votre séjour à Kribi.
              </p>
              <p>
                Votre demande de réservation a été reçue avec succès. Un email de confirmation vous a été envoyé avec tous les détails.
              </p>
            </div>
            
            <div className="border-t border-b py-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-500">Numéro de réservation</p>
                  <p className="font-semibold">RES-{Math.floor(1000000 + Math.random() * 9000000)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <p className="font-semibold text-amber-600">En attente de paiement</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Prochaines étapes :</h3>
              <ul className="text-left space-y-2 max-w-lg mx-auto">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-burgundy flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-gray-600">
                    Vous recevrez sous peu un SMS et un email avec les instructions pour compléter le paiement de l'acompte.
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-burgundy flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-gray-600">
                    Une fois l'acompte reçu, votre réservation sera définitivement confirmée.
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-burgundy flex-shrink-0 mt-0.5 mr-2" />
                  <span className="text-gray-600">
                    Pour toute question, n'hésitez pas à nous contacter par téléphone au +237 6 90 00 00 00 ou par email à contact@residencemadison.com.
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/">
                <Button className="bg-burgundy hover:bg-burgundy-800">
                  Retour à l'accueil
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-burgundy text-burgundy hover:bg-burgundy/10">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReservationConfirmed;

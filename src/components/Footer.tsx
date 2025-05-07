
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-burgundy rounded-xl p-8 shadow-xl mb-12 transform -translate-y-24">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-2">Restez informés</h3>
              <p className="text-white/80">
                Abonnez-vous à notre newsletter pour recevoir nos offres spéciales
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email"
                  placeholder="Votre adresse email"
                  className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[250px]"
                />
                <Button className="bg-white text-burgundy hover:bg-burgundy-50">
                  S'abonner
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-[-50px]">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-burgundy-200">Résidence Madison</h3>
            <p className="text-gray-400 mb-6">
              Un havre de paix situé à quelques pas de l'océan Atlantique à Kribi. Profitez d'un séjour inoubliable dans notre établissement.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/residencemadisonkribi" target="_blank" rel="noopener noreferrer" 
                 className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-burgundy-200 hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-burgundy-200 hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-burgundy-200 hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-burgundy-200">Liens Rapides</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Accueil
              </Link></li>
              <li><Link to="/chambres" className="text-gray-400 hover:text-white transition-colors">Nos Chambres</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/galerie" className="text-gray-400 hover:text-white transition-colors">Galerie</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/reservation" className="text-gray-400 hover:text-white transition-colors">Réservation</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-burgundy-200">Informations Légales</h3>
            <ul className="space-y-3">
              <li><Link to="/mentions-legales" className="text-gray-400 hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link to="/politique-confidentialite" className="text-gray-400 hover:text-white transition-colors">Politique de confidentialité</Link></li>
              <li><Link to="/cgv" className="text-gray-400 hover:text-white transition-colors">Conditions générales</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Gestion des cookies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-burgundy-200">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-burgundy-200 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Kribi Plage, à 500m du campement des pêcheurs, Kribi, Cameroun</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-burgundy-200 mr-3 flex-shrink-0" />
                <a href="tel:+237690000000" className="text-gray-400 hover:text-white transition-colors">+237 6 90 00 00 00</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-burgundy-200 mr-3 flex-shrink-0" />
                <a href="mailto:contact@residencemadison.com" className="text-gray-400 hover:text-white transition-colors">contact@residencemadison.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Résidence Madison. Tous droits réservés. | Conçu avec ❤️ pour Kribi
            </p>
            <div className="flex space-x-4">
              <Link to="/mentions-legales" className="text-gray-500 text-sm hover:text-burgundy-200">Mentions légales</Link>
              <Link to="/politique-confidentialite" className="text-gray-500 text-sm hover:text-burgundy-200">Confidentialité</Link>
              <Link to="/cookies" className="text-gray-500 text-sm hover:text-burgundy-200">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

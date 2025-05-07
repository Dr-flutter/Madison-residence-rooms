
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message envoyé !",
        description: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <section className="bg-gray-50 py-10 pt-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Besoin d'informations? Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Nos Coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-burgundy/10 rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-burgundy" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
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
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <p className="mb-1">
                      <a 
                        href="tel:+237690000000" 
                        className="text-gray-600 hover:text-burgundy transition-colors"
                      >
                        +237 6 90 00 00 00
                      </a>
                    </p>
                    <p>
                      WhatsApp: 
                      <a 
                        href="https://wa.me/237690000000" 
                        className="text-gray-600 hover:text-burgundy transition-colors ml-1"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
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
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a 
                      href="mailto:contact@residencemadison.com"
                      className="text-gray-600 hover:text-burgundy transition-colors"
                    >
                      contact@residencemadison.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-burgundy/10 rounded-full p-3 mr-4">
                    <Clock className="h-6 w-6 text-burgundy" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Heures d'ouverture</h3>
                    <p className="text-gray-600">
                      Réception: 24h/24, 7j/7<br />
                      Petit-déjeuner: 07:00 - 10:00<br />
                      Restaurant: 12:00 - 22:00
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-8 h-64 rounded-lg overflow-hidden">
                <iframe 
                  title="Résidence Madison Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15923.969218806211!2d9.896184099999999!3d2.9365807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10590511bdee65d1%3A0xf2158703e7c74440!2sKribi%2C%20Cameroun!5e0!3m2!1sfr!2sfr!4v1651930645781!5m2!1sfr!2sfr"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                />
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Téléphone (optionnel)</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 6XX XX XX XX"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Comment pouvons-nous vous aider ?"
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-burgundy hover:bg-burgundy-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer le message
                    </span>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  En soumettant ce formulaire, vous acceptez notre <a href="/politique-confidentialite" className="text-burgundy hover:underline">politique de confidentialité</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

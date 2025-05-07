
import { useState } from 'react';
import { Save, Shield, FileLock, AlertTriangle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const RGPD = () => {
  const { toast } = useToast();
  
  // Cookie Settings
  const [enableCookieBanner, setEnableCookieBanner] = useState(true);
  const [requireCookieConsent, setRequireCookieConsent] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  
  // Policy texts
  const [privacyPolicy, setPrivacyPolicy] = useState(`## Politique de confidentialité

La protection de vos données personnelles est une priorité pour nous. Cette politique de confidentialité vous explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services.

### Informations que nous collectons

Nous collectons les informations suivantes :
- Informations d'identification (nom, prénom, email, téléphone)
- Informations de réservation (dates, préférences, numéro de chambre)
- Informations de paiement (nous ne stockons pas les données de carte bancaire)
- Informations de navigation sur notre site

### Utilisation de vos informations

Nous utilisons vos données pour :
- Gérer votre réservation et votre séjour
- Vous contacter concernant votre réservation
- Améliorer nos services
- Respecter nos obligations légales

### Vos droits

Conformément au RGPD, vous disposez des droits suivants :
- Droit d'accès à vos données
- Droit de rectification
- Droit à l'effacement
- Droit à la limitation du traitement
- Droit à la portabilité
- Droit d'opposition

Pour exercer ces droits, veuillez nous contacter à l'adresse email : rgpd@madisonhotel.cm

Cette politique de confidentialité a été mise à jour le 01/05/2024.`);

  const [cookiePolicy, setCookiePolicy] = useState(`## Politique de cookies

Notre site web utilise des cookies pour améliorer votre expérience en ligne.

### Qu'est-ce qu'un cookie ?

Un cookie est un petit fichier texte placé sur votre appareil qui permet à notre site web de vous reconnaître et de mémoriser vos préférences lors de votre prochaine visite.

### Types de cookies que nous utilisons

- Cookies essentiels : nécessaires au fonctionnement du site
- Cookies de préférence : mémorisent vos préférences
- Cookies d'analyse : nous permettent d'améliorer notre site
- Cookies marketing : utilisés pour la publicité ciblée

### Contrôle des cookies

Vous pouvez contrôler et supprimer les cookies via les paramètres de votre navigateur. Cependant, la suppression de certains cookies peut affecter votre expérience sur notre site.`);

  const [termsOfService, setTermsOfService] = useState(`## Conditions générales d'utilisation

En accédant à ce site web, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables, et vous acceptez que vous êtes responsable du respect des lois locales applicables.

### Réservations

Toute réservation effectuée via notre site est soumise à notre politique de réservation. Nous nous réservons le droit de refuser une réservation à notre seule discrétion.

### Contenu

Le contenu de ce site est fourni à titre informatif uniquement. Les prix et disponibilités peuvent changer sans préavis.

### Limitation de responsabilité

Nous ne serons pas tenus responsables des dommages directs, indirects, accessoires ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser notre site web.

### Modifications des conditions

Nous nous réservons le droit de modifier ces conditions à tout moment. Il est de votre responsabilité de consulter régulièrement ces conditions.

Ces conditions ont été mises à jour le 01/05/2024.`);

  // Data deletion requests
  const dataDeletionRequests = [
    {
      id: 'DR-001',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      requestDate: '2024-04-15',
      status: 'pending'
    },
    {
      id: 'DR-002',
      name: 'Marie Lefèvre',
      email: 'marie.lefevre@example.com',
      requestDate: '2024-04-10',
      status: 'completed'
    },
    {
      id: 'DR-003',
      name: 'Thomas Martin',
      email: 'thomas.martin@example.com',
      requestDate: '2024-04-05',
      status: 'pending'
    }
  ];
  
  const handleSaveSettings = (tab: string) => {
    toast({
      title: "Paramètres RGPD enregistrés",
      description: `Les paramètres ${tab} ont été mis à jour avec succès.`
    });
  };

  const handleProcessRequest = (id: string) => {
    toast({
      title: "Demande traitée",
      description: `La demande de suppression ${id} a été traitée avec succès.`
    });
  };
  
  return (
    <AdminLayout title="Gestion RGPD">
      <div className="space-y-6">
        {/* Info Card */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Conformité RGPD
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Le Règlement Général sur la Protection des Données (RGPD) exige que vous informiez vos utilisateurs sur la façon dont vous collectez et traitez leurs données personnelles. Assurez-vous que votre politique de confidentialité est à jour et facilement accessible.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Tabs defaultValue="cookies">
            <TabsList className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <TabsTrigger value="cookies">Cookies</TabsTrigger>
              <TabsTrigger value="policies">Politiques</TabsTrigger>
              <TabsTrigger value="requests">Demandes de suppression</TabsTrigger>
            </TabsList>
            
            {/* Cookie Settings */}
            <TabsContent value="cookies" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cookie-banner">
                      Bannière de cookies
                    </Label>
                    <p className="text-sm text-gray-500">
                      Afficher une bannière informant les utilisateurs sur l'utilisation des cookies
                    </p>
                  </div>
                  <Switch 
                    id="cookie-banner"
                    checked={enableCookieBanner} 
                    onCheckedChange={setEnableCookieBanner} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cookie-consent">
                      Consentement aux cookies
                    </Label>
                    <p className="text-sm text-gray-500">
                      Exiger le consentement explicite des utilisateurs avant d'utiliser des cookies non essentiels
                    </p>
                  </div>
                  <Switch 
                    id="cookie-consent"
                    checked={requireCookieConsent} 
                    onCheckedChange={setRequireCookieConsent} 
                  />
                </div>
                
                <hr className="my-4" />
                
                <h3 className="text-lg font-medium">Types de cookies</h3>
                
                <div className="space-y-4 pl-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="cookies-essential">
                        Cookies essentiels
                      </Label>
                      <p className="text-sm text-gray-500">
                        Nécessaires au fonctionnement du site (toujours activés)
                      </p>
                    </div>
                    <Switch 
                      id="cookies-essential"
                      checked={true} 
                      disabled={true}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="cookies-analytics">
                        Cookies d'analyse
                      </Label>
                      <p className="text-sm text-gray-500">
                        Suivent l'utilisation du site pour améliorer les performances
                      </p>
                    </div>
                    <Switch 
                      id="cookies-analytics"
                      checked={analyticsEnabled} 
                      onCheckedChange={setAnalyticsEnabled} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="cookies-marketing">
                        Cookies marketing
                      </Label>
                      <p className="text-sm text-gray-500">
                        Utilisés pour la publicité ciblée et le remarketing
                      </p>
                    </div>
                    <Switch 
                      id="cookies-marketing"
                      checked={marketingEnabled} 
                      onCheckedChange={setMarketingEnabled} 
                    />
                  </div>
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings('de cookies')}>
                <Save size={16} className="mr-2" />
                Enregistrer
              </Button>
            </TabsContent>
            
            {/* Policy Settings */}
            <TabsContent value="policies" className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="privacy-policy">
                  <AccordionTrigger className="flex gap-2">
                    <Shield className="h-5 w-5" />
                    <span>Politique de confidentialité</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <p className="text-sm text-gray-500">
                        Modifiez votre politique de confidentialité. Ce texte sera affiché sur la page RGPD de votre site.
                      </p>
                      <Textarea 
                        rows={15}
                        value={privacyPolicy} 
                        onChange={(e) => setPrivacyPolicy(e.target.value)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cookie-policy">
                  <AccordionTrigger className="flex gap-2">
                    <FileLock className="h-5 w-5" />
                    <span>Politique de cookies</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <p className="text-sm text-gray-500">
                        Modifiez votre politique de cookies. Ce texte sera affiché dans la bannière de cookies et sur la page RGPD.
                      </p>
                      <Textarea 
                        rows={10}
                        value={cookiePolicy} 
                        onChange={(e) => setCookiePolicy(e.target.value)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="terms-of-service">
                  <AccordionTrigger className="flex gap-2">
                    <FileLock className="h-5 w-5" />
                    <span>Conditions générales d'utilisation</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <p className="text-sm text-gray-500">
                        Modifiez vos conditions générales d'utilisation. Ce texte sera affiché sur la page CGU de votre site.
                      </p>
                      <Textarea 
                        rows={10}
                        value={termsOfService} 
                        onChange={(e) => setTermsOfService(e.target.value)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Button onClick={() => handleSaveSettings('de politiques')}>
                <Save size={16} className="mr-2" />
                Enregistrer les politiques
              </Button>
            </TabsContent>
            
            {/* Data Deletion Requests */}
            <TabsContent value="requests" className="space-y-6">
              <div className="rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left bg-gray-50 border-b">
                        <th className="py-3 px-4 font-medium">ID</th>
                        <th className="py-3 px-4 font-medium">Nom</th>
                        <th className="py-3 px-4 font-medium">Email</th>
                        <th className="py-3 px-4 font-medium">Date</th>
                        <th className="py-3 px-4 font-medium">Statut</th>
                        <th className="py-3 px-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataDeletionRequests.map((request) => (
                        <tr key={request.id} className="border-b last:border-0">
                          <td className="py-3 px-4 font-medium">{request.id}</td>
                          <td className="py-3 px-4">{request.name}</td>
                          <td className="py-3 px-4">{request.email}</td>
                          <td className="py-3 px-4">{request.requestDate}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              request.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {request.status === 'completed' ? 'Traité' : 'En attente'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {request.status === 'pending' && (
                              <Button 
                                size="sm"
                                onClick={() => handleProcessRequest(request.id)}
                              >
                                Traiter
                              </Button>
                            )}
                            {request.status === 'completed' && (
                              <span className="text-gray-500 text-sm">Terminé</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      
                      {dataDeletionRequests.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-4 text-center text-gray-500">
                            Aucune demande de suppression de données.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Guide de traitement</h3>
                <p className="text-sm text-gray-500">
                  Conformément au RGPD, vous devez traiter les demandes de suppression de données dans un délai d'un mois. Voici les étapes à suivre :
                </p>
                <ol className="list-decimal list-inside text-sm text-gray-500 space-y-1 pl-4">
                  <li>Vérifier l'identité du demandeur</li>
                  <li>Localiser toutes les données personnelles du demandeur</li>
                  <li>Supprimer les données de vos systèmes</li>
                  <li>Informer les sous-traitants pour qu'ils suppriment également les données</li>
                  <li>Documenter la suppression</li>
                  <li>Confirmer la suppression au demandeur</li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RGPD;

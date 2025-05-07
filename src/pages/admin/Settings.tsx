
import { useState } from 'react';
import { Save, Hotel, Map, Phone, Mail, Globe, MessageSquare, Facebook, Instagram, Twitter } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const { toast } = useToast();
  
  // Hotel information
  const [hotelName, setHotelName] = useState('Madison Hôtel Douala');
  const [slogan, setSlogan] = useState('Votre oasis de luxe au cœur de Douala');
  const [description, setDescription] = useState('Madison Hôtel vous accueille dans un cadre luxueux et élégant, offrant un service 5 étoiles pour tous vos séjours d\'affaires ou de loisirs à Douala.');
  
  // Contact information
  const [address, setAddress] = useState('123 Rue des Palmiers, Douala, Cameroun');
  const [phone, setPhone] = useState('+237 233 42 56 89');
  const [email, setEmail] = useState('contact@madisonhotel.cm');
  const [website, setWebsite] = useState('www.madisonhotel.cm');
  
  // Social media
  const [facebook, setFacebook] = useState('madisonhoteldouala');
  const [instagram, setInstagram] = useState('madisonhotel_douala');
  const [twitter, setTwitter] = useState('MadisonDLA');
  
  // Booking settings
  const [checkInTime, setCheckInTime] = useState('14:00');
  const [checkOutTime, setCheckOutTime] = useState('12:00');
  const [maxBookingDays, setMaxBookingDays] = useState('30');
  const [minBookingAdvance, setMinBookingAdvance] = useState('1');
  
  // Email notifications
  const [newBookingNotification, setNewBookingNotification] = useState(true);
  const [newContactFormNotification, setNewContactFormNotification] = useState(true);
  const [sendGuestConfirmation, setSendGuestConfirmation] = useState(true);
  const [sendReminderEmails, setSendReminderEmails] = useState(true);
  
  const handleSaveSettings = (tab: string) => {
    toast({
      title: "Paramètres enregistrés",
      description: `Les paramètres ${tab} ont été mis à jour avec succès.`
    });
  };
  
  return (
    <AdminLayout title="Paramètres">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <Tabs defaultValue="general">
          <TabsList className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hotel-name">Nom de l'hôtel</Label>
                  <div className="relative">
                    <Hotel className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input 
                      id="hotel-name"
                      className="pl-10" 
                      value={hotelName} 
                      onChange={(e) => setHotelName(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slogan">Slogan</Label>
                  <Input 
                    id="slogan"
                    value={slogan} 
                    onChange={(e) => setSlogan(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  rows={4} 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
              </div>
            </div>
            
            <Button onClick={() => handleSaveSettings('généraux')}>
              <Save size={16} className="mr-2" />
              Enregistrer
            </Button>
          </TabsContent>
          
          {/* Contact Settings */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <div className="relative">
                  <Map className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Textarea 
                    id="address"
                    className="pl-10" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input 
                      id="phone"
                      className="pl-10" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input 
                      id="email"
                      className="pl-10" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Site web</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input 
                    id="website"
                    className="pl-10" 
                    value={website} 
                    onChange={(e) => setWebsite(e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Réseaux sociaux</h3>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input 
                      id="facebook"
                      className="pl-10" 
                      value={facebook} 
                      onChange={(e) => setFacebook(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input 
                      id="instagram"
                      className="pl-10" 
                      value={instagram} 
                      onChange={(e) => setInstagram(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input 
                      id="twitter"
                      className="pl-10" 
                      value={twitter} 
                      onChange={(e) => setTwitter(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Button onClick={() => handleSaveSettings('de contact')}>
              <Save size={16} className="mr-2" />
              Enregistrer
            </Button>
          </TabsContent>
          
          {/* Booking Settings */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="check-in-time">Heure d'arrivée (check-in)</Label>
                <Input 
                  id="check-in-time"
                  type="time" 
                  value={checkInTime} 
                  onChange={(e) => setCheckInTime(e.target.value)} 
                />
                <p className="text-xs text-gray-500">Heure à partir de laquelle les clients peuvent s'enregistrer</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="check-out-time">Heure de départ (check-out)</Label>
                <Input 
                  id="check-out-time"
                  type="time" 
                  value={checkOutTime} 
                  onChange={(e) => setCheckOutTime(e.target.value)} 
                />
                <p className="text-xs text-gray-500">Heure à laquelle les clients doivent quitter la chambre</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-booking-days">Durée maximale de séjour (jours)</Label>
                <Input 
                  id="max-booking-days"
                  type="number" 
                  min="1" 
                  value={maxBookingDays} 
                  onChange={(e) => setMaxBookingDays(e.target.value)} 
                />
                <p className="text-xs text-gray-500">Nombre maximum de jours qu'un client peut réserver</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="min-booking-advance">Délai minimal de réservation (jours)</Label>
                <Input 
                  id="min-booking-advance"
                  type="number" 
                  min="0" 
                  value={minBookingAdvance} 
                  onChange={(e) => setMinBookingAdvance(e.target.value)} 
                />
                <p className="text-xs text-gray-500">Nombre minimum de jours à l'avance pour réserver</p>
              </div>
            </div>
            
            <Button onClick={() => handleSaveSettings('de réservation')}>
              <Save size={16} className="mr-2" />
              Enregistrer
            </Button>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-booking-notification">Nouvelles réservations</Label>
                  <p className="text-sm text-gray-500">
                    Recevoir un e-mail lors d'une nouvelle réservation
                  </p>
                </div>
                <Switch 
                  id="new-booking-notification"
                  checked={newBookingNotification} 
                  onCheckedChange={setNewBookingNotification} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-contact-form-notification">Formulaire de contact</Label>
                  <p className="text-sm text-gray-500">
                    Recevoir un e-mail quand un formulaire de contact est soumis
                  </p>
                </div>
                <Switch 
                  id="new-contact-form-notification"
                  checked={newContactFormNotification} 
                  onCheckedChange={setNewContactFormNotification} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="send-guest-confirmation">Confirmation aux clients</Label>
                  <p className="text-sm text-gray-500">
                    Envoyer un e-mail de confirmation aux clients après réservation
                  </p>
                </div>
                <Switch 
                  id="send-guest-confirmation"
                  checked={sendGuestConfirmation} 
                  onCheckedChange={setSendGuestConfirmation} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="send-reminder-emails">Rappels de réservation</Label>
                  <p className="text-sm text-gray-500">
                    Envoyer un rappel aux clients avant leur arrivée
                  </p>
                </div>
                <Switch 
                  id="send-reminder-emails"
                  checked={sendReminderEmails} 
                  onCheckedChange={setSendReminderEmails} 
                />
              </div>
            </div>
            
            <Button onClick={() => handleSaveSettings('de notification')}>
              <Save size={16} className="mr-2" />
              Enregistrer
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;

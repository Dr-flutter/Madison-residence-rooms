import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, CreditCard, User, Mail, Phone, MessageSquare } from 'lucide-react';

import { Room, PaymentMethod } from '@/types';
import { calculateBookingPrice, formatPrice } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ReservationFormProps {
  rooms: Room[];
}

// Get settings from localStorage (default values if not found)
const getSettings = () => {
  const defaultSettings = {
    contact: {
      whatsapp: '+237 690 19 84 84'
    }
  };
  
  const savedSettings = localStorage.getItem('hotelSettings');
  if (!savedSettings) return defaultSettings;
  
  try {
    return JSON.parse(savedSettings);
  } catch (error) {
    return defaultSettings;
  }
};

const ReservationForm = ({ rooms }: ReservationFormProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const settings = getSettings();
  const whatsappNumber = settings.contact?.whatsapp || '+237 690 19 84 84';
  
  // Parse URL parameters
  const roomId = searchParams.get('room');
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  const guestsParam = searchParams.get('guests');
  
  // State
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    checkInParam ? new Date(checkInParam) : undefined
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    checkOutParam ? new Date(checkOutParam) : undefined
  );
  const [guests, setGuests] = useState<number>(
    guestsParam ? parseInt(guestsParam) : 1
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [reservationMethod, setReservationMethod] = useState<'online' | 'whatsapp'>('online');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mobile_money');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Refs for popovers
  const checkInPopoverRef = useRef<HTMLButtonElement>(null);
  const checkOutPopoverRef = useRef<HTMLButtonElement>(null);
  
  // State to control popover open/close
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  
  // Set the initial selected room based on URL parameter
  useEffect(() => {
    if (roomId) {
      const room = rooms.find(r => r.id === roomId);
      if (room) {
        setSelectedRoom(room);
      }
    }
  }, [roomId, rooms]);
  
  // Update the total price when room, checkIn, or checkOut changes
  useEffect(() => {
    if (selectedRoom && checkIn && checkOut) {
      const price = calculateBookingPrice(selectedRoom.price, checkIn, checkOut);
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [selectedRoom, checkIn, checkOut]);
  
  const handleRoomChange = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setSelectedRoom(room);
      // Update guests if needed
      if (guests > room.capacity) {
        setGuests(room.capacity);
      }
    }
  };

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date);
    
    // If check-out date is not set or is before the new check-in date,
    // automatically set check-out date to the day after check-in
    if (!checkOut || (date && checkOut && checkOut <= date)) {
      const nextDay = date ? new Date(date.getTime()) : new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay);
    }
    
    // Close check-in popover and open check-out popover after a short delay
    setCheckInOpen(false);
    setTimeout(() => {
      setCheckOutOpen(true);
    }, 100);
  };

  const handleWhatsAppRedirect = () => {
    if (!selectedRoom || !checkIn || !checkOut) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une chambre et les dates de séjour.",
        variant: "destructive",
      });
      return;
    }

    if (!name || !phone) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir au minimum votre nom et numéro de téléphone.",
        variant: "destructive",
      });
      return;
    }

    // Format dates
    const checkInFormatted = format(checkIn, "dd/MM/yyyy");
    const checkOutFormatted = format(checkOut, "dd/MM/yyyy");

    // Create WhatsApp message
    const message = encodeURIComponent(
      `Je souhaite effectuer une réservation à MADISON HOTEL:\n\n` +
      `- Nom: ${name}\n` +
      `- Téléphone: ${phone}\n` +
      `- Email: ${email || 'Non fourni'}\n` +
      `- Chambre: ${selectedRoom.name}\n` +
      `- Arrivée: ${checkInFormatted}\n` +
      `- Départ: ${checkOutFormatted}\n` +
      `- Personnes: ${guests}\n` +
      `- Demandes spéciales: ${specialRequests || 'Aucune'}`
    );

    // Format WhatsApp number (remove spaces and ensure it starts with +)
    const formattedNumber = whatsappNumber.replace(/\s/g, '');
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, '_blank');

    toast({
      title: "Redirection vers WhatsApp",
      description: "Vous allez être redirigé vers WhatsApp pour finaliser votre réservation.",
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom || !checkIn || !checkOut) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une chambre et les dates de séjour.",
        variant: "destructive",
      });
      return;
    }
    
    if (!name || !email || !phone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    if (reservationMethod === 'whatsapp') {
      handleWhatsAppRedirect();
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Réservation confirmée !",
        description: "Votre demande de réservation a été envoyée avec succès. Vous recevrez bientôt une confirmation par email.",
      });
      
      // Redirect to confirmation page (would be created next)
      navigate('/reservation-confirmee');
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const today = new Date();
  
  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Formulaire de Réservation</h2>
        
        {/* Room Selection */}
        <div className="mb-8 pb-6 border-b">
          <h3 className="text-lg font-semibold mb-4">1. Sélectionnez votre hébergement</h3>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="room">Type de chambre</Label>
              <Select
                value={selectedRoom?.id}
                onValueChange={handleRoomChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une chambre" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name} - {formatPrice(room.price)}/nuit
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Check-in Date */}
              <div>
                <Label htmlFor="check-in">Date d'arrivée</Label>
                <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      ref={checkInPopoverRef}
                      variant="outline"
                      id="check-in"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? (
                        format(checkIn, "PPP", { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={handleCheckInSelect}
                      disabled={(date) => date < today}
                      initialFocus
                      locale={fr}
                      footer={
                        <div className="p-2 text-sm text-center text-muted-foreground">
                          Sélectionnez votre date d'arrivée
                        </div>
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Check-out Date */}
              <div>
                <Label htmlFor="check-out">Date de départ</Label>
                <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      ref={checkOutPopoverRef}
                      variant="outline"
                      id="check-out"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOut && "text-muted-foreground"
                      )}
                      disabled={!checkIn}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? (
                        format(checkOut, "PPP", { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={(date) => {
                        setCheckOut(date);
                        setCheckOutOpen(false);
                      }}
                      disabled={(date) => {
                        // Disable dates before check-in date and the check-in date itself
                        if (!checkIn) return true;
                        return date <= checkIn;
                      }}
                      initialFocus
                      locale={fr}
                      footer={
                        <div className="p-2 text-sm text-center text-muted-foreground">
                          {checkIn && (
                            <div>
                              Séjour minimum: 1 nuit
                              {checkIn && checkOut && (
                                <div className="font-medium text-primary mt-1">
                                  {differenceInDays(checkOut, checkIn)} nuit{differenceInDays(checkOut, checkIn) > 1 ? 's' : ''}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Number of Guests */}
            <div>
              <Label htmlFor="guests">Nombre de personnes</Label>
              <Select
                value={guests.toString()}
                onValueChange={(value) => setGuests(parseInt(value))}
                disabled={!selectedRoom}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {selectedRoom ? Array.from({ length: selectedRoom.capacity }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num === 1 ? `${num} personne` : `${num} personnes`}
                    </SelectItem>
                  )) : (
                    <SelectItem value="1">1 personne</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Personal Information */}
        <div className="mb-8 pb-6 border-b">
          <h3 className="text-lg font-semibold mb-4">2. Informations personnelles</h3>
          
          <div className="space-y-6">
            <div>
            <Label htmlFor="name">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="name"
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez votre nom complet"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required={reservationMethod === 'online'}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="phone"
                    className="pl-10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 6XX XX XX XX"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="special-requests">Requêtes spéciales (optionnel)</Label>
              <Textarea
                id="special-requests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Demandes particulières, allergies, heure d'arrivée prévue..."
                rows={3}
              />
            </div>
          </div>
        </div>
        
        {/* Reservation Method */}
        <div className="mb-8 pb-6 border-b">
          <h3 className="text-lg font-semibold mb-4">3. Mode de réservation</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label 
                  className={`flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                    reservationMethod === 'online' ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <input 
                    type="radio" 
                    name="reservation-method" 
                    value="online"
                    checked={reservationMethod === 'online'} 
                    onChange={() => setReservationMethod('online')} 
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Réservation en ligne</div>
                    <div className="text-sm text-gray-500">Réservez et payez un acompte en ligne</div>
                  </div>
                </label>
              </div>
              
              <div>
                <label 
                  className={`flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                    reservationMethod === 'whatsapp' ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <input 
                    type="radio" 
                    name="reservation-method" 
                    value="whatsapp"
                    checked={reservationMethod === 'whatsapp'} 
                    onChange={() => setReservationMethod('whatsapp')} 
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Réservation par WhatsApp</div>
                    <div className="text-sm text-gray-500">Contactez-nous directement via WhatsApp</div>
                  </div>
                </label>
              </div>
            </div>
            
            {reservationMethod === 'whatsapp' && (
              <Alert className="bg-green-50 border-green-200">
                <MessageSquare className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Réservation par WhatsApp</AlertTitle>
                <AlertDescription className="text-green-700">
                  En cliquant sur "Confirmer la réservation", vous serez redirigé vers WhatsApp pour finaliser votre 
                  réservation avec notre équipe. Votre message sera automatiquement pré-rempli avec les détails de votre réservation.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        
        {/* Payment Information (only show for online reservation) */}
        {reservationMethod === 'online' && (
        <div className="mb-8 pb-6 border-b">
          <h3 className="text-lg font-semibold mb-4">4. Mode de paiement</h3>
          
          <div className="space-y-4">
            <p className="text-sm">
              Un acompte de 100 000 FCFA minimum est requis pour confirmer votre réservation.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    name="payment-method" 
                    value="mobile_money"
                    checked={paymentMethod === 'mobile_money'} 
                    onChange={() => setPaymentMethod('mobile_money')} 
                    className="mr-3"
                    disabled
                  />
                  Mobile Money
                </label>
              </div>
              
              <div>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    name="payment-method" 
                    value="orange_money"
                    checked={paymentMethod === 'orange_money'} 
                    onChange={() => setPaymentMethod('orange_money')} 
                    className="mr-3"
                    disabled
                  />
                  Orange Money
                </label>
              </div>
              
              <div>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    name="payment-method" 
                    value="paypal"
                    checked={paymentMethod === 'paypal'} 
                    onChange={() => setPaymentMethod('paypal')} 
                    className="mr-3"
                    disabled
                  />
                  PayPal
                </label>
              </div>
            </div>
            
            <Alert variant="destructive" className="bg-amber-50 border-amber-200">
              <CreditCard className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Système de paiement en cours de développement</AlertTitle>
              <AlertDescription className="text-amber-700">
                Notre système de paiement en ligne est actuellement en maintenance. Veuillez utiliser l'option WhatsApp pour finaliser votre réservation.
              </AlertDescription>
            </Alert>
          </div>
        </div>
        )}
        
        {/* Summary and Submit */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{reservationMethod === 'online' ? '5' : '4'}. Récapitulatif</h3>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-6">
            {selectedRoom && (
              <div className="flex justify-between">
                <span className="font-medium">Hébergement:</span>
                <span>{selectedRoom.name}</span>
              </div>
            )}
            
            {checkIn && checkOut && (
              <>
                <div className="flex justify-between">
                  <span className="font-medium">Arrivée:</span>
                  <span>{format(checkIn, "PPP", { locale: fr })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Départ:</span>
                  <span>{format(checkOut, "PPP", { locale: fr })}</span>
                </div>
              </>
            )}
            
            <div className="flex justify-between">
              <span className="font-medium">Nombre de personnes:</span>
              <span>{guests} {guests === 1 ? 'personne' : 'personnes'}</span>
            </div>
            
            <div className="pt-3 border-t flex justify-between font-bold">
              <span>Total du séjour:</span>
              <span className="text-burgundy">{formatPrice(totalPrice)}</span>
            </div>
            {reservationMethod === 'online' && (
              <div className="flex justify-between text-sm">
                <span>Acompte à verser:</span>
                <span>{formatPrice(100000)}</span>
              </div>
            )}
            {reservationMethod === 'whatsapp' && (
              <div className="flex justify-between text-sm">
                <span>Mode de réservation:</span>
                <span className="flex items-center">
                  <MessageSquare size={14} className="mr-1" />
                  WhatsApp
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-3" required title="Accept terms and conditions" />
              <Label htmlFor="terms" className="text-sm">
                J'accepte les <Link className="text-burgundy hover:underline" to="/cgv">conditions générales</Link> et la <Link className="text-burgundy hover:underline" to="/politique-confidentialite">politique de confidentialité</Link>.
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-burgundy hover:bg-burgundy-800"
              disabled={isSubmitting || !selectedRoom || !checkIn || !checkOut || !name || !phone || (reservationMethod === 'online' && !email)}
            >
              {isSubmitting ? 'Traitement en cours...' : 
                reservationMethod === 'whatsapp' ? 'Continuer sur WhatsApp' : 'Confirmer la réservation'}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              {reservationMethod === 'online' ? 
                'Votre réservation sera confirmée après vérification de la disponibilité et réception de l\'acompte.' :
                'Un membre de notre équipe vous contactera pour finaliser votre réservation.'}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
  

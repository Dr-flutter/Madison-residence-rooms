
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Room } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { formatPrice, calculateBookingPrice, daysBetween } from '@/utils/helpers';

interface BookingFormProps {
  room: Room;
  initialCheckIn?: Date;
  initialCheckOut?: Date;
}

const BookingForm = ({ room, initialCheckIn, initialCheckOut }: BookingFormProps) => {
  const navigate = useNavigate();
  
  const [checkIn, setCheckIn] = useState<Date | undefined>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<Date | undefined>(initialCheckOut);
  const [guests, setGuests] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(room.price);
  const [nights, setNights] = useState<number>(1);

  // Update the number of nights and total price when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const nightsCount = Math.max(1, daysBetween(checkIn, checkOut));
      setNights(nightsCount);
      setTotalPrice(room.price * nightsCount);
    } else {
      setNights(1);
      setTotalPrice(room.price);
    }
  }, [checkIn, checkOut, room.price]);

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date);
    // If check-out date is before the new check-in date, reset it
    if (date && checkOut && date >= checkOut) {
      setCheckOut(undefined);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOut(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the full reservation page with pre-filled data
    const params = new URLSearchParams();
    params.append('room', room.id);
    if (checkIn) params.append('checkIn', checkIn.toISOString());
    if (checkOut) params.append('checkOut', checkOut.toISOString());
    params.append('guests', guests.toString());
    
    navigate(`/reservation?${params.toString()}`);
  };

  const today = new Date();
  const guestOptions = Array.from({ length: room.capacity }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
      <h3 className="text-xl font-bold mb-6 pb-3 border-b">Réserver cette chambre</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Check-in Date */}
        <div>
          <Label htmlFor="check-in" className="mb-2 block">Date d'arrivée</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
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
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Check-out Date */}
        <div>
          <Label htmlFor="check-out" className="mb-2 block">Date de départ</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
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
                onSelect={handleCheckOutSelect}
                disabled={(date) => date <= (checkIn || today)}
                initialFocus
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Number of Guests */}
        <div>
          <Label htmlFor="guests" className="mb-2 block">Nombre de personnes</Label>
          <Select 
            defaultValue={guests.toString()}
            onValueChange={(value) => setGuests(parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {guestOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option === 1 ? `${option} personne` : `${option} personnes`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Summary */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span>{formatPrice(room.price)} x {nights} {nights === 1 ? 'nuit' : 'nuits'}</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="pt-2 border-t flex justify-between font-bold">
            <span>Total</span>
            <span className="text-burgundy">{formatPrice(totalPrice)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Un acompte de 100 000 FCFA minimum est requis pour confirmer votre réservation.
          </p>
        </div>
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-burgundy hover:bg-burgundy-800"
          disabled={!checkIn || !checkOut}
        >
          Réserver maintenant
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;

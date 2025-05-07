
import { Link } from 'react-router-dom';
import { Room } from '@/types';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/helpers';
import { User, Bed, Check } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Room Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={room.images[0]} 
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-burgundy text-white text-xs font-semibold px-2 py-1 rounded-md">
          {room.type === 'standard' ? 'Chambre Standard' : 
           room.type === 'vip' ? 'Chambre VIP' :
           room.type === 'suite' ? 'Suite' :
           room.type === 'luxe' ? 'Appartement Luxe' : 'Duplex Paysagé'}
        </div>
      </div>
      
      {/* Room Info */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
        
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>Capacité: {room.capacity}</span>
          </div>
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>
              {room.type === 'standard' ? 'Standard' : 
               room.type === 'vip' ? 'VIP' :
               room.type === 'suite' ? 'Suite' :
               room.type === 'luxe' ? 'Appartement' : 'Duplex'}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {room.description}
        </p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Équipements:</h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-gray-600">
            {room.amenities.slice(0, 4).map((amenity, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-3 w-3 text-burgundy mr-1" />
                <span>{amenity}</span>
              </div>
            ))}
            {room.amenities.length > 4 && (
              <div className="text-xs text-gray-500">+{room.amenities.length - 4} autres</div>
            )}
          </div>
        </div>
        
        <div className="border-t pt-4 flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">À partir de</span>
            <div className="text-burgundy font-bold">{formatPrice(room.price)}</div>
            <span className="text-xs text-gray-500">par nuit</span>
          </div>
          
          <div className="space-x-2">
            <Link to={`/chambres/${room.id}`}>
              <Button variant="outline" size="sm" className="border-burgundy text-burgundy hover:bg-burgundy/10">
                Détails
              </Button>
            </Link>
            <Link to={`/reservation?room=${room.id}`}>
              <Button size="sm" className="bg-burgundy hover:bg-burgundy-800">
                Réserver
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

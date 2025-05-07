
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ChevronLeft } from 'lucide-react';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import RoomGallery from '@/components/rooms/RoomGallery';
import BookingForm from '@/components/reservation/BookingForm';

import { roomsData, roomTypes } from '@/data/mockData';
import { Room } from '@/types';
import { formatPrice } from '@/utils/helpers';
import { useIsMobile } from '@/hooks/use-mobile';

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (id) {
      const foundRoom = roomsData.find(room => room.id === id);
      if (foundRoom) {
        setRoom(foundRoom);
      }
    }
  }, [id]);
  
  if (!room) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 pt-24 mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Chambre non trouvée</h2>
          <p className="mb-8">La chambre que vous recherchez n'existe pas ou a été supprimée.</p>
          <Link to="/chambres">
            <Button className="bg-burgundy hover:bg-burgundy-800">
              Voir toutes nos chambres
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 pt-15 mt-16">
        {/* Back button */}
        <Link to="/chambres" className="inline-flex items-center text-burgundy hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Retour aux chambres
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Room details */}
          <div className="lg:col-span-2">
            {/* Room Gallery */}
            <RoomGallery images={room.images} name={room.name} />
            
            <div className="mt-6">
              {/* Room header */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="inline-block bg-burgundy text-white text-sm font-medium py-1 px-3 rounded-full mb-2">
                      {roomTypes[room.type]}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold">{room.name}</h1>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Prix par nuit</div>
                    <div className="text-2xl font-bold text-burgundy">{formatPrice(room.price)}</div>
                  </div>
                </div>
              </div>
              
              {/* Room description */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-gray-700">{room.description}</p>
              </div>
              
              {/* Room amenities */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Équipements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-burgundy mr-2" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Booking form */}
          <div>
            {!isMobile ? (
              <BookingForm room={room} />
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Intéressé par cette chambre ?</h3>
                <p className="text-gray-600 mb-4">
                  À partir de <span className="text-burgundy font-bold">{formatPrice(room.price)}</span> par nuit
                </p>
                <Link to={`/reservation?room=${room.id}`}>
                  <Button className="w-full bg-burgundy hover:bg-burgundy-800">
                    Réserver maintenant
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoomDetail;

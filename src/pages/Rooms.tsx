
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import RoomCard from '@/components/rooms/RoomCard';
import { Room, RoomType } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { roomsData, roomTypes } from '@/data/mockData';
import { formatPrice } from '@/utils/helpers';
import { Hotel } from 'lucide-react';

const Rooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(roomsData);
  
  // Filter states
  const [selectedType, setSelectedType] = useState<string>(searchParams.get('type') || 'all');
  const [selectedCapacity, setSelectedCapacity] = useState<string>(searchParams.get('capacity') || 'all');
  const [priceRange, setPriceRange] = useState<string>(searchParams.get('price') || 'all');
  
  // Apply filters
  useEffect(() => {
    let filtered = [...roomsData];
    
    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(room => room.type === selectedType);
    }
    
    // Filter by capacity
    if (selectedCapacity !== 'all') {
      const capacity = parseInt(selectedCapacity);
      filtered = filtered.filter(room => room.capacity >= capacity);
    }
    
    // Filter by price
    if (priceRange !== 'all') {
      const [minPrice, maxPrice] = priceRange.split('-').map(p => parseInt(p));
      filtered = filtered.filter(room => {
        if (!maxPrice) return room.price >= minPrice;
        return room.price >= minPrice && room.price <= maxPrice;
      });
    }
    
    // Update URL query params
    const params = new URLSearchParams();
    if (selectedType !== 'all') params.append('type', selectedType);
    if (selectedCapacity !== 'all') params.append('capacity', selectedCapacity);
    if (priceRange !== 'all') params.append('price', priceRange);
    setSearchParams(params);
    
    setFilteredRooms(filtered);
  }, [selectedType, selectedCapacity, priceRange, setSearchParams]);
  
  // Reset filters
  const resetFilters = () => {
    setSelectedType('all');
    setSelectedCapacity('all');
    setPriceRange('all');
    setFilteredRooms(roomsData);
    setSearchParams({});
  };
  
  return (
    <Layout>
      <section className="bg-gray-50 py-10 pt-24 mt-16">

        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Chambres & Suites</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection d'hébergements conçus pour offrir confort et élégance durant votre séjour à Kribi.
            </p>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Type d'hébergement</label>
                <Select
                  value={selectedType}
                  onValueChange={setSelectedType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    {Object.entries(roomTypes).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Capacité</label>
                <Select
                  value={selectedCapacity}
                  onValueChange={setSelectedCapacity}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes capacités" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes capacités</SelectItem>
                    <SelectItem value="1">1+ personne</SelectItem>
                    <SelectItem value="2">2+ personnes</SelectItem>
                    <SelectItem value="3">3+ personnes</SelectItem>
                    <SelectItem value="4">4+ personnes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Prix par nuit</label>
                <Select
                  value={priceRange}
                  onValueChange={setPriceRange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les prix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les prix</SelectItem>
                    <SelectItem value="0-30000">Jusqu'à 30 000 FCFA</SelectItem>
                    <SelectItem value="30000-50000">30 000 - 50 000 FCFA</SelectItem>
                    <SelectItem value="50000-100000">50 000 - 100 000 FCFA</SelectItem>
                    <SelectItem value="100000-">Plus de 100 000 FCFA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="border-burgundy text-burgundy hover:bg-burgundy/10"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
          
          {/* Room listing */}
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <Hotel className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aucun hébergement trouvé</h3>
              <p className="text-gray-600 mb-4">
                Aucun hébergement ne correspond à vos critères. Essayez d'ajuster vos filtres.
              </p>
              <Button onClick={resetFilters} className="bg-burgundy hover:bg-burgundy-800">
                Voir tous les hébergements
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Rooms;

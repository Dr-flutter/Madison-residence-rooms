
import { useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { formatPrice } from '@/utils/helpers';
import { roomsData } from '@/data/mockData';

const Rooms = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter rooms based on search term
  const filteredRooms = roomsData.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRooms = filteredRooms.slice(startIndex, startIndex + itemsPerPage);
  
  const handleDeleteRoom = (id: string) => {
    toast({
      title: "Chambre supprimée",
      description: "La chambre a été supprimée avec succès.",
    });
  };
  
  return (
    <AdminLayout title="Gestion des Chambres">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Rechercher une chambre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button className="w-full sm:w-auto">
            <Plus size={18} className="mr-2" />
            Ajouter une chambre
          </Button>
        </div>
        
        {/* Rooms Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 font-medium">Image</th>
                <th className="pb-3 font-medium">Nom</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Capacité</th>
                <th className="pb-3 font-medium">Prix</th>
                <th className="pb-3 font-medium">Disponibilité</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRooms.length > 0 ? (
                paginatedRooms.map((room) => (
                  <tr key={room.id} className="border-b">
                    <td className="py-4">
                      <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={room.images[0]} 
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 font-medium">{room.name}</td>
                    <td className="py-4">{room.type}</td>
                    <td className="py-4">{room.capacity} personnes</td>
                    <td className="py-4">{formatPrice(room.price)}/nuit</td>
                    <td className="py-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        room.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {room.available ? 'Disponible' : 'Occupée'}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/chambres/${room.id}`}>
                            <Eye size={18} />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit size={18} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteRoom(room.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    Aucune chambre trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredRooms.length)} sur {filteredRooms.length} chambres
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Rooms;

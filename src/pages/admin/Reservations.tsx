
import { useState, useEffect } from 'react';
import { Search, Edit, Trash, Check, CalendarDays } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Booking, Room } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { formatDate, formatPrice } from '@/utils/helpers';
import { bookingsData, roomsData } from '@/data/mockData';

const ReservationsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>(bookingsData);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookingsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBookings(bookings);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      setFilteredBookings(
        bookings.filter(
          (booking) =>
            booking.customerName.toLowerCase().includes(lowerCaseQuery) ||
            booking.customerEmail.toLowerCase().includes(lowerCaseQuery) ||
            booking.id.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  }, [searchQuery, bookings]);

  const getRoomDetails = (roomId: string): Room | undefined => {
    return roomsData.find((room) => room.id === roomId);
  };

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      case 'completed':
        return 'Terminée';
      default:
        return status;
    }
  };

  const handleUpdateStatus = (bookingId: string, newStatus: Booking['status']) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    toast({
      title: "Statut mis à jour",
      description: `La réservation a été marquée comme ${getStatusText(newStatus).toLowerCase()}`,
    });
    if (currentBooking && currentBooking.id === bookingId) {
      setCurrentBooking({ ...currentBooking, status: newStatus });
    }
  };

  const handleDeleteBooking = () => {
    if (!currentBooking) return;
    
    setBookings(bookings.filter((booking) => booking.id !== currentBooking.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Réservation supprimée",
      description: "La réservation a été supprimée avec succès",
      variant: "destructive",
    });
  };
  
  const openViewDialog = (booking: Booking) => {
    setCurrentBooking(booking);
    setIsViewDialogOpen(true);
  };
  
  const openDeleteDialog = (booking: Booking) => {
    setCurrentBooking(booking);
    setIsDeleteDialogOpen(true);
  };

  const getDaysCount = (checkIn: Date, checkOut: Date): number => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <AdminLayout title="Gestion des réservations">
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Rechercher une réservation..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-green-200 text-green-600">
              Confirmées
            </Button>
            <Button variant="outline" className="border-yellow-200 text-yellow-600">
              En attente
            </Button>
            <Button variant="outline" className="border-red-200 text-red-600">
              Annulées
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Client</TableHead>
                <TableHead>Chambre</TableHead>
                <TableHead>Arrivée</TableHead>
                <TableHead>Départ</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => {
                  const room = getRoomDetails(booking.roomId);
                  
                  return (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="font-medium">{booking.customerName}</div>
                        <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                      </TableCell>
                      <TableCell>{room?.name || 'Chambre inconnue'}</TableCell>
                      <TableCell>{formatDate(booking.checkIn)}</TableCell>
                      <TableCell>{formatDate(booking.checkOut)}</TableCell>
                      <TableCell>{formatPrice(booking.totalPrice)}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openViewDialog(booking)}
                          className="h-8 w-8 p-0 inline-flex items-center justify-center"
                        >
                          <Edit size={14} />
                          <span className="sr-only">Voir</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(booking)}
                          className="h-8 w-8 p-0 inline-flex items-center justify-center text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash size={14} />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                    Aucune réservation trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* View/Edit Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
            <DialogDescription>
              Informations détaillées sur la réservation.
            </DialogDescription>
          </DialogHeader>
          {currentBooking && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Client</p>
                  <p className="font-medium">{currentBooking.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contact</p>
                  <p className="font-medium">{currentBooking.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{currentBooking.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Chambre</p>
                  <p className="font-medium">{getRoomDetails(currentBooking.roomId)?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Arrivée</p>
                  <div className="flex items-center">
                    <CalendarDays size={14} className="mr-1 text-burgundy" />
                    <p className="font-medium">{formatDate(currentBooking.checkIn)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Départ</p>
                  <div className="flex items-center">
                    <CalendarDays size={14} className="mr-1 text-burgundy" />
                    <p className="font-medium">{formatDate(currentBooking.checkOut)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Durée</p>
                  <p className="font-medium">{getDaysCount(currentBooking.checkIn, currentBooking.checkOut)} nuits</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nombre de personnes</p>
                  <p className="font-medium">{currentBooking.guests} personnes</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Montant total</p>
                  <p className="font-bold text-lg text-burgundy">{formatPrice(currentBooking.totalPrice)}</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-500">Statut du paiement</p>
                  <p className="font-medium">{currentBooking.paymentStatus === "completed" ? "Payé" : "En attente"}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Changer le statut</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={currentBooking.status === 'confirmed' ? 'default' : 'outline'}
                    className={currentBooking.status === 'confirmed' ? 'bg-green-500 hover:bg-green-600' : 'border-green-200 text-green-600 hover:bg-green-50'}
                    onClick={() => handleUpdateStatus(currentBooking.id, 'confirmed')}
                  >
                    Confirmer
                  </Button>
                  <Button
                    size="sm"
                    variant={currentBooking.status === 'pending' ? 'default' : 'outline'}
                    className={currentBooking.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : 'border-yellow-200 text-yellow-600 hover:bg-yellow-50'}
                    onClick={() => handleUpdateStatus(currentBooking.id, 'pending')}
                  >
                    En attente
                  </Button>
                  <Button
                    size="sm"
                    variant={currentBooking.status === 'completed' ? 'default' : 'outline'}
                    className={currentBooking.status === 'completed' ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}
                    onClick={() => handleUpdateStatus(currentBooking.id, 'completed')}
                  >
                    Terminée
                  </Button>
                  <Button
                    size="sm"
                    variant={currentBooking.status === 'cancelled' ? 'default' : 'outline'}
                    className={currentBooking.status === 'cancelled' ? 'bg-red-500 hover:bg-red-600' : 'border-red-200 text-red-600 hover:bg-red-50'}
                    onClick={() => handleUpdateStatus(currentBooking.id, 'cancelled')}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Booking Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer la réservation</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {currentBooking && (
            <div className="py-4">
              <p><strong>Client :</strong> {currentBooking.customerName}</p>
              <p><strong>Chambre :</strong> {getRoomDetails(currentBooking.roomId)?.name}</p>
              <p><strong>Période :</strong> Du {formatDate(currentBooking.checkIn)} au {formatDate(currentBooking.checkOut)}</p>
              <p><strong>Montant :</strong> {formatPrice(currentBooking.totalPrice)}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteBooking}
            >
              <Trash size={16} className="mr-2" />
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ReservationsPage;

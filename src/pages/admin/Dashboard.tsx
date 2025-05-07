
import {
  CalendarDays,
  CreditCard,
  DollarSign,
  Users,
  Percent,
  Clock,
  Hotel,
  CheckCircle,
} from 'lucide-react';

import AdminLayout from '@/components/admin/AdminLayout';
import StatsCard from '@/components/admin/dashboard/StatsCard';
import RevenueChart from '@/components/admin/dashboard/RevenueChart';
import { dashboardStats, bookingsData, roomsData } from '@/data/mockData';
import { formatPrice } from '@/utils/helpers';

// Get upcoming bookings (next 5 days)
const upcomingBookings = bookingsData
  .filter(booking => {
    const today = new Date();
    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(today.getDate() + 5);
    return booking.checkIn >= today && booking.checkIn <= fiveDaysLater && booking.status === 'confirmed';
  })
  .sort((a, b) => a.checkIn.getTime() - b.checkIn.getTime());

const Dashboard = () => {
  return (
    <AdminLayout title="Tableau de bord">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Revenus ce mois"
          value={formatPrice(dashboardStats.revenue.thisMonth)}
          icon={<DollarSign className="h-6 w-6" />}
          trend={{ value: 12.5, positive: true }}
        />
        <StatsCard
          title="Réservations"
          value={dashboardStats.totalBookings.toString()}
          icon={<CalendarDays className="h-6 w-6" />}
          trend={{ value: 8.2, positive: true }}
        />
        <StatsCard
          title="Taux d'occupation"
          value={`${dashboardStats.occupancyRate}%`}
          icon={<Percent className="h-6 w-6" />}
          trend={{ value: 3.1, positive: true }}
        />
        <StatsCard
          title="Clients"
          value={dashboardStats.totalCustomers.toString()}
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 5.4, positive: true }}
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Chambres les plus réservées</h3>
          <div className="space-y-4">
            {dashboardStats.popularRooms.map((roomStats) => {
              const room = roomsData.find(r => r.id === roomStats.roomId);
              if (!room) return null;
              
              return (
                <div key={roomStats.roomId} className="flex items-center p-3 rounded-lg bg-gray-50">
                  <div className="h-10 w-10 bg-burgundy/10 rounded-md flex items-center justify-center mr-3">
                    <Hotel className="h-5 w-5 text-burgundy" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium">{room.name}</h4>
                    <p className="text-xs text-gray-500">{roomStats.bookingCount} réservations</p>
                  </div>
                  <div className="text-burgundy font-medium">{formatPrice(room.price)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Upcoming Bookings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Arrivées prochaines</h3>
          <a href="/admin/reservations" className="text-sm text-burgundy hover:underline">
            Voir toutes les réservations
          </a>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Chambre</th>
                <th className="pb-3 font-medium">Arrivée</th>
                <th className="pb-3 font-medium">Départ</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium">Montant</th>
              </tr>
            </thead>
            <tbody>
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => {
                  const room = roomsData.find(r => r.id === booking.roomId);
                  
                  return (
                    <tr key={booking.id} className="border-b">
                      <td className="py-4">
                        <div className="font-medium">{booking.customerName}</div>
                        <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                      </td>
                      <td className="py-4">{room?.name || 'Chambre inconnue'}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {booking.checkIn.toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="py-4">{booking.checkOut.toLocaleDateString('fr-FR')}</td>
                      <td className="py-4">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Confirmée
                        </span>
                      </td>
                      <td className="py-4 font-medium">{formatPrice(booking.totalPrice)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    Aucune arrivée prévue pour les 5 prochains jours.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
